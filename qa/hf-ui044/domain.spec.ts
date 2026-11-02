import { test, expect, type Locator } from "@playwright/test";
import { mkdir, writeFile, appendFile } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";
import type { CaptureOptions, EvidenceCase, LayoutCase, Runtime } from "./contract";
import { createRuntime, configure, sample, recordCase, registerCases, finalizeCases, observeReload, archive, readCaseMetadata } from "./shared";
import { setupFullstackDomain, setupStarterDomain, navigateDomain, AREA_NAME, EMPTY_NAME, type DomainFixture } from "./domain-fixtures";
import { IHFR_SCIENTIFIC_QUALIFICATIONS } from "../../tests/e2e/support/frontend-ihfr-evidence";
import { IHFR_CONTRACT } from "../../src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants";
import { waitForMissionRender } from "../../tests/e2e/support/frontend-mission-evidence";
import { planReadableScroll, classifyHorizontalOverflow, selectReadingScrollOwner, measureReadingExposure, applyReadingScroll, assessReadingExposure } from "./domain-geometry";
import { selectDomainCases, collectDomainCases, withOwnedSourceBudget, classifyDomainPair } from "./domain-collection";

test.use({ trace: "off", video: "off", screenshot: "off" });
test.setTimeout(90_000);

const dimensions = [[320,900],[375,900],[390,844],[768,900],[1440,900]] as const;
type DomainLayout = Omit<LayoutCase,"id">;
const layouts: DomainLayout[] = [
  ...dimensions.flatMap(([width,height]) => ([100,200] as const).map(scale => ({ width,height,scale,inset:0 as const }))),
  ...[[667,375],[844,390]].map(([width,height]) => ({ width,height,scale:200 as const,inset:0 as const })),
];
const states = ["area-empty","area-populated","collection-record","collection-missing","collection-current"] as const;
type DomainState = typeof states[number];
const evidence = (id: string, state: string, layout: DomainLayout, extra: object = {}): EvidenceCase => ({
  id, state, ...layout, requirementIds: ["UI-02","UI-03","UI-04","UI-06","FR-036-004","SC-036-002"],
  fixture: { synthetic:true, globalRole:"USER", laboratoryRole:"OWNER", areas:2, confirmedCollections:2,
    newer:"NO_ENVIRONMENTAL_NO_DIAGNOSIS", older:"CONFIRMED_ENVIRONMENTAL_CURRENT_DIAGNOSIS", sameOccurrenceOffsets:true,
    confirmationOrder:"NEWER_THEN_OLDER", referenceScores:"PREDEFINED_DEMO_NOT_COMPUTED", ...extra },
});
const cases = states.flatMap(state => layouts.map(layout => evidence("domain-"+state+"-"+[layout.width,layout.height,layout.scale].join("-"),state,layout)));
const qualifierLayouts = [
  { width:320,height:900,scale:200 as const,inset:0 as const },
  { width:667,height:375,scale:200 as const,inset:34 as const },
  { width:844,height:390,scale:200 as const,inset:0 as const },
];
const qualifierCases = qualifierLayouts.flatMap(layout => IHFR_CONTRACT.labels.map((label,index) => evidence(
  "domain-qualifier-"+[layout.width,layout.height,layout.inset,index].join("-"), "ihfr-qualifier-"+label,
  layout, { qualifier:label, safeAreaBottom:layout.inset })));
const navigationCases = [390,1440].map(width => evidence("domain-keyboard-history-"+width,"keyboard-back-forward",{ width,height:width===390?844:900,scale:200,inset:0 }));
const reloadCase = evidence("domain-reload-390-text200","reload-observed-before-reconfiguration",{width:390,height:844,scale:200,inset:0});
const caseSet = process.env.HF_UI044_CASE_SET;
const planned = selectDomainCases([...cases,...qualifierCases,...navigationCases,reloadCase], caseSet);
const caseExecutors = new Map<string, () => Promise<void>>();
const quarantined = new Set<string>();
const ownedContextsClosed = new Set<string>();
const cleanupFailures:string[] = [];
let collectionDeadline = 0;
async function quarantine(runtime: Runtime) {
  quarantined.add(runtime.source);
  await runtime.context.close(); // Cancel page/navigation/CDP/capture work before continuation.
  ownedContextsClosed.add(runtime.source);
}
const runtimes: Runtime[] = [];
const fixtures = new Map<string,DomainFixture>();
const failures: Array<{id:string;code:string}> = [];
let setupComplete = false;

/** Check both products, without promoting pinned-reference layout defects to native defects. */
async function recordRootOverflow(runtime: Runtime, c: EvidenceCase, options: CaptureOptions) {
  const geometry = await runtime.page.evaluate(() => {
    const documentWidth = document.documentElement.scrollWidth, viewportWidth = innerWidth;
    const excessPx = Math.max(0, documentWidth - viewportWidth);
    const offenders = excessPx > 0 ? [...document.querySelectorAll("body *")]
      .filter(node => { const rect = node.getBoundingClientRect(); return rect.width > 0 && rect.right > viewportWidth; })
      .slice(0, 6).map(node => { const rect = node.getBoundingClientRect();
        return { tag: node.tagName, role: node.getAttribute("role"), left: rect.left, right: rect.right, width: rect.width }; }) : [];
    return { documentWidth, viewportWidth, excessPx, offenders };
  });
  const classification = classifyHorizontalOverflow(runtime.source, geometry.documentWidth, geometry.viewportWidth);
  const prior = (c.fixture.horizontalOverflowBySource ?? {}) as Record<string, unknown>;
  prior[runtime.source] = { ...geometry, ...classification };
  c.fixture.horizontalOverflowBySource = prior; // Carries into each synthetic sample's JSON.
  if (classification.nativeFailure) throw new Error("NATIVE_HORIZONTAL_OVERFLOW");
  if (classification.referenceNonEquivalent) {
    options.comparability = "NON_EQUIVALENT";
    options.reasons = [...new Set([...(options.reasons ?? []), "PINNED_REFERENCE_HORIZONTAL_OVERFLOW"])];
  }
}

async function boundedPair(c: EvidenceCase, prepare: (runtime:Runtime,fixture:DomainFixture,sourceOptions:CaptureOptions)=>Promise<void>, options:CaptureOptions={}) {
  const samples = [], errors:string[] = [];
  const sourceExecutions: Array<{source:string;execution:string;reason?:string}> = [];
  for (const runtime of runtimes) {
    if (quarantined.has(runtime.source) || Date.now() >= collectionDeadline) {
      const reason = quarantined.has(runtime.source) ? "OWNED_CONTEXT_QUARANTINED_AFTER_CAUSAL_FAILURE" : "COLLECTION_BUDGET_EXHAUSTED";
      sourceExecutions.push({source:runtime.source,execution:"NOT_RUN",reason});
      errors.push(runtime.source+":"+reason); continue;
    }
    const sourceOptions:CaptureOptions = {...options,reasons:[...(options.reasons??[])]};
    const sourceExecution = {source:runtime.source,execution:"FAIL"};
    sourceExecutions.push(sourceExecution);
    await appendFile(join(archive,"domain-source-starts.jsonl"),JSON.stringify({caseId:c.id,source:runtime.source,
      execution:"STARTED",sourceSha:runtime.code.sha,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT})+"\n");
    try {
      const captured = await withOwnedSourceBudget(async () => {
      const fixture = fixtures.get(runtime.source)!;
      await prepare(runtime,fixture,sourceOptions);
      await recordRootOverflow(runtime, c, sourceOptions);
      return await sample(runtime,{...c,fixture:{...c.fixture,sourceFixture:fixture}}, {
        ...sourceOptions, actualState: runtime.source==="starter" ? c.state+"-REFERENCE_DEMONSTRATION" : c.state+"-NATIVE_PRODUCT",
      });
      },Math.min(40_000,collectionDeadline-Date.now()),()=>quarantine(runtime));
      samples.push(captured); sourceExecution.execution="PASS";
    } catch (error) {
      // Never serialize arbitrary exception messages: transports may carry secrets.
      const code = error instanceof Error && /strict mode violation/i.test(error.message) ? "LOCATOR_STRICT_MODE" :
        error instanceof Error && /toBeInViewport/.test(error.message) ? "VIEWPORT_ASSERTION" :
        error instanceof Error && error.name === "TimeoutError" ? "TIMEOUT" :
        error instanceof Error && error.message === "DOMAIN_SOURCE_BUDGET_EXHAUSTED" ? "SOURCE_BUDGET_EXHAUSTED" : "CASE_ASSERTION_OR_CAPTURE_FAILED";
      const locations=error instanceof Error?[...new Set(error.stack?.match(/(?:domain(?:\.spec|-fixtures)|shared)\.ts:\d+:\d+/g)??[])]:[];
      errors.push(runtime.source+":"+code+(locations[0]?"@"+locations[0]:""));
      if(error instanceof Error && error.message === "DOMAIN_OWNED_CONTEXT_CLOSE_FAILED") cleanupFailures.push(runtime.source+":OWNED_CONTEXT_CLOSE_FAILED_AFTER_SOURCE_BUDGET");
      const qualifierIndex=IHFR_CONTRACT.labels.indexOf(c.fixture.qualifier as typeof IHFR_CONTRACT.labels[number]);
      const qualifierText=qualifierIndex<0?null:runtime.source==="fullstack"?IHFR_SCIENTIFIC_QUALIFICATIONS[qualifierIndex]:IHFR_CONTRACT.labels[qualifierIndex];
      const readGeometry=()=>runtime.page.evaluate(async ({qualifierText})=>{
        const rect=(node:Element|null)=>{if(!node)return null;const r=node.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height};};
        const content=document.getElementById("application-content")??document.getElementById("conteudo");
        const qualifier=qualifierText?[...document.querySelectorAll("span,code")].find(node=>node.textContent===qualifierText):null;
        const intersectionRatio=qualifier?await new Promise<number>(resolve=>{
          const observer=new IntersectionObserver(entries=>{const ratio=entries[0]?.intersectionRatio??0;observer.disconnect();resolve(ratio);});
          observer.observe(qualifier);
        }):null;
        const box=qualifier?.getBoundingClientRect();
        const center=box?{x:box.left+box.width/2,y:box.top+box.height/2}:null;
        const hit=center?document.elementFromPoint(center.x,center.y):null;
        return {viewport:{width:innerWidth,height:innerHeight},rootFontPx:parseFloat(getComputedStyle(document.documentElement).fontSize),
          scrollX,scrollY,active:{tag:document.activeElement?.tagName??null,rect:rect(document.activeElement)},
          content:{rect:rect(content),scrollTop:content?.scrollTop??null,clientHeight:content?.clientHeight??null},qualifier:rect(qualifier??null),
          qualifierIntersectionRatio:intersectionRatio,qualifierHit:{center,tag:hit?.tagName??null,unobstructed:!!qualifier&&!!hit&&(hit===qualifier||qualifier.contains(hit))},
          navs:[...document.querySelectorAll("nav")].filter(node=>node.getBoundingClientRect().width>0&&node.getBoundingClientRect().height>0)
            .map(node=>({label:node.getAttribute("aria-label"),rect:rect(node)}))};
      },{qualifierText}).catch(()=>({unavailable:true}));
      try {
        await withOwnedSourceBudget(async () => {
        const geometry=await readGeometry();
        await mkdir(archive,{recursive:true});
        const stem="diagnostic-"+runtime.source+"-"+c.id;
        let frame:Record<string,unknown>={status:"NOT_CAPTURED"};
        try {
          const masks=await runtime.page.locator("input,select,textarea").all();
          const png=await runtime.page.screenshot({fullPage:false,animations:"allow",mask:masks,timeout:5_000});
          await writeFile(join(archive,stem+".png"),png,{flag:"wx"});
          frame={status:"CAPTURED",file:stem+".png",pngSha256:createHash("sha256").update(png).digest("hex"),
            viewport:{width:png.readUInt32BE(16),height:png.readUInt32BE(20)},maskedInputs:masks.length};
        } catch { frame={status:"CAPTURE_FAILED_WITH_ORIGINAL_CASE_FAIL_PRESERVED"}; }
        const geometryAfterFrame=await readGeometry();
        await writeFile(join(archive,stem+".json"),JSON.stringify({
          kind:"domain-case-failure",evidenceKind:"failure-diagnostic-not-acceptance",caseId:c.id,source:runtime.source,...runtime.code,run:process.env.GITHUB_RUN_ID??null,
          attempt:process.env.GITHUB_RUN_ATTEMPT??null,code,errorClass:error instanceof Error?error.name:"NON_ERROR",locations,
          fullPage:false,animations:"allow",viewport:frame.viewport??null,pngSha256:frame.pngSha256??null,
          frame,geometry,geometryAfterFrame,requested:{width:c.width,height:c.height,textScale:c.scale,safeAreaBottom:c.inset},
          execution:"FAIL",comparability:"INSUFFICIENT_EVIDENCE",requirement:"HUMAN_DECISION_PENDING",completeness:"PARTIAL",
          note:"Technical FAIL is not proof of a native product defect. Preserve original frame and exact source without retry or corrective scroll.",
        },null,2)+"\n",{flag:"wx"});
        },6_000,()=>quarantine(runtime));
      } catch (diagnosticError) {
        errors.push(runtime.source+":DIAGNOSTIC_PERSIST_FAILED");
        if(diagnosticError instanceof Error && diagnosticError.message === "DOMAIN_OWNED_CONTEXT_CLOSE_FAILED") cleanupFailures.push(runtime.source+":OWNED_CONTEXT_CLOSE_FAILED_AFTER_DIAGNOSTIC_BUDGET");
      }
    }
  }
  const pairComplete=samples.length===2;
  if(!pairComplete) errors.push("PAIR_REQUIRES_TWO_SOURCE_SAMPLES");
  const metadata = await Promise.all(samples.map(entry=>readCaseMetadata(entry.json)));
  const fontsObserved=pairComplete&&samples.every(entry=>Object.values(entry.fonts).every(value=>
    value&&typeof value==="object"&&"observation" in value&&value.observation==="OBSERVED"));
  const result = { ...classifyDomainPair(samples.length,errors,metadata,options.comparability),
    fontsObserved,sourceExecutions,
    requirement:options.requirement??"HUMAN_DECISION_PENDING", // Technical failures alone do not attribute a native product defect.
    reasons:[...new Set([...(options.reasons??[]),...metadata.flatMap(entry=>entry.reasons??[])])], samples, errors };
  await recordCase(c,result);
  if (errors.length) failures.push({id:c.id,code:errors.join(";")});
}

test.beforeAll(async ({browser}) => {
  test.setTimeout(120_000);
  await registerCases(planned);
  await writeFile(join(archive,"domain-selection.json"),JSON.stringify({caseSet,plannedCount:planned.length,ids:planned.map(c=>c.id),
    sourceSha:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT},null,2)+"\n",{flag:"wx"});
  const fullstack = await createRuntime(browser,"fullstack"); runtimes.push(fullstack);
  const starter = await createRuntime(browser,"starter"); runtimes.push(starter);
  // Per-source deadlines below bound page/CDP work; action limits stay unchanged.
  for (const runtime of runtimes) {
    runtime.page.setDefaultTimeout(12_000);
    runtime.page.setDefaultNavigationTimeout(15_000);
  }
  fixtures.set("fullstack",await setupFullstackDomain(fullstack));
  fixtures.set("starter",await setupStarterDomain(starter));
  setupComplete=true;
  await mkdir(archive,{recursive:true});
  await writeFile(join(archive,"domain-fixture-receipt.json"),JSON.stringify({
    setup:"PASS",sourceSha:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,
    fixtures:Object.fromEntries(fixtures),logicalDataTeardown:"NOT_APPLICABLE_IMMUTABLE_SYNTHETIC_DATA_RETAINED_UNTIL_OWNED_RUNNER_DISPOSAL",
    physicalCleanup:"REQUIRES_ORCHESTRATOR_STOP_AND_GITHUB_HOSTED_RUNNER_DISPOSAL",scientificPayloadArchived:false,
  },null,2)+"\n",{flag:"wx"});
});

async function ready(runtime:Runtime,fixture:DomainFixture,state:DomainState) {
  const target=state==="area-empty"?"empty":state==="area-populated"?"area":state==="collection-current"?"older":"newer";
  await navigateDomain(runtime,fixture,target);
  if(state.startsWith("area-")) {
    await expect(runtime.page.getByRole("heading",{name:state==="area-empty"?EMPTY_NAME:AREA_NAME,exact:true}).first()).toBeVisible();
    if(state==="area-empty") {
      await expect(runtime.page.getByText(runtime.source==="fullstack"?"Esta área ainda não tem coletas confirmadas.":"Nenhuma coleta confirmada",{exact:false}).first()).toBeVisible();
    } else if(runtime.source==="fullstack") {
      const list=runtime.page.getByRole("list",{name:"Coletas ordenadas por ocorrência em campo"});
      await expect(list.getByRole("listitem")).toHaveCount(2);
      await expect(list.getByRole("listitem").first()).toContainText(fixture.newerId);
      await expect(list.getByRole("listitem").nth(1)).toContainText(fixture.olderId);
      const current=runtime.page.getByRole("complementary",{name:"Último IHFR disponível da área"});
      await expect(current).toContainText(fixture.olderId);
      await expect(current).not.toContainText(fixture.newerId);
    } else {
      await expect(runtime.page.getByRole("heading",{name:"Coletas confirmadas",exact:true})).toBeVisible();
      await expect(runtime.page.getByRole("complementary",{name:"Último IHFR disponível da área"})).toHaveCount(0);
      await expect(runtime.page.locator('a[href="'+fixture.olderPath+'"]').first()).toBeVisible();
    }
  } else {
    const diagnosis=runtime.page.getByRole("region",{name:"Diagnóstico IHFR experimental",exact:true});
    await expect(diagnosis).toBeVisible();
    if(state==="collection-record") {
      await expect(runtime.page.getByRole("heading",{name:"Registro",exact:true})).toBeVisible();
    } else if(state==="collection-missing") {
      await expect(runtime.page.getByText(runtime.source==="fullstack"?"Não há conjunto de dados ambientais confirmado para esta coleta.":"Nenhum conjunto ambiental confirmado.",{exact:true})).toBeVisible();
      await expect(runtime.page.getByRole("link",{name:runtime.source==="fullstack"?"Registrar dados ambientais":"Registrar medições",exact:true})).toBeVisible();
    } else {
      await expect(diagnosis.getByText(runtime.source==="fullstack"?/Qualidade dos dados:/:"Qualidade dos dados",{exact:runtime.source==="starter"})).toBeVisible();
    }
  }
}


async function semanticCoreExposure(runtime:Runtime,c:EvidenceCase,state:DomainState,comparison:CaptureOptions) {
  if(state!=="area-empty"&&state!=="collection-record") return;
  const target=state==="area-empty"?runtime.page.getByText(runtime.source==="fullstack"?
    "Esta área ainda não tem coletas confirmadas.":"Nenhuma coleta confirmada",{exact:false}).first():
    runtime.page.getByRole("heading",{name:"Registro",exact:true});
  const exposure=()=>target.evaluate(measureReadingExposure);
  await runtime.page.evaluate(waitForMissionRender);
  const initial=await exposure();
  const initialOccluded=initial.mainOutsideViewport||initial.availableReadingHeight===0;
  const observation:Record<string,unknown>={target:state==="area-empty"?"empty-area-message":"collection-Registro-heading",initial,
    initialRefOcclusion:runtime.source==="starter"&&initialOccluded,initialDiagnostic:null,scroll:"ONE_NATIVE_SCROLL_BEFORE_FINAL_MEASUREMENT",
    fontObservationMeaning:"CDP_GLYPHS_DO_NOT_PROVE_UNOBSCURED_TEXT_LEGIBILITY"};
  const bySource=(c.fixture.semanticScrollBySource??{}) as Record<string,unknown>;
  bySource[runtime.source]=observation;c.fixture.semanticScrollBySource=bySource;
  if(initialOccluded) {
    comparison.comparability="NON_EQUIVALENT";
    const initialReason=runtime.source==="starter"?"initialRefOcclusion:MAIN_OUTSIDE_OR_ZERO_READING_BAND":"SOURCE_INITIAL_OBSTRUCTION:MAIN_OUTSIDE_OR_ZERO_READING_BAND";
    comparison.reasons??=[];comparison.reasons.push(runtime.source+":"+initialReason);
    const diagnostic=await sample(runtime,{...c,id:c.id+"-initial-occluded",state:c.state+"-initial-occluded",
      fixture:{...c.fixture,evidenceKind:"DIAGNOSTIC_NOT_PLANNED_COVERAGE",plannedCaseId:c.id,initialExposure:initial}},
      {comparability:"NON_EQUIVALENT",actualState:c.state+"-INITIAL_OCCLUDED_NOT_READING_EVIDENCE",
        reasons:[initialReason],
        note:"DIAGNOSTIC_NOT_PLANNED_COVERAGE. Raw UNOBSERVED fonts remain UNOBSERVED; this frame does not complete the planned reading case."});
    const wrapperName="initial-obstruction-"+runtime.source+"-"+c.id+".json";
    const wrapper=Buffer.from(JSON.stringify({evidenceKind:"DIAGNOSTIC_NOT_PLANNED_COVERAGE",plannedCaseId:c.id,
      source:runtime.source,...runtime.code,run:process.env.GITHUB_RUN_ID??null,attempt:process.env.GITHUB_RUN_ATTEMPT??null,
      initialRefOcclusion:runtime.source==="starter",geometry:initial,rawFontRegions:diagnostic.fonts,
      files:{png:diagnostic.png,json:diagnostic.json,pngSha256:diagnostic.pngSha256,jsonSha256:diagnostic.jsonSha256},
      coverageContribution:false,fullPage:false,note:"Preserved initial viewport; no style/scroll mutation before this diagnostic. Hashed sample JSON is not rewritten."},null,2)+"\n");
    await writeFile(join(archive,wrapperName),wrapper,{flag:"wx"});
    observation.initialDiagnostic={evidenceKind:"DIAGNOSTIC_NOT_PLANNED_COVERAGE",wrapper:wrapperName,
      wrapperSha256:createHash("sha256").update(wrapper).digest("hex"),png:diagnostic.png,json:diagnostic.json,
      pngSha256:diagnostic.pngSha256,jsonSha256:diagnostic.jsonSha256};
    if(runtime.source==="fullstack") throw new Error("NATIVE_INITIAL_READING_BAND_OBSTRUCTED");
  }
  // Read the computed DOM owner and use only its measured scroll range. The
  // document owns desktop scrolling; auto scrollports keep ownership at range0.
  const owner=selectReadingScrollOwner(initial.scrollports);
  observation.scrollOwner=owner.scrollOwner;observation.overflowY=owner.overflowY;
  observation.source=runtime.source;observation.sourceSha=runtime.code.sha;
  observation.scrollTopInitial=owner.scrollTop;
  observation.contentMaxScrollTop=initial.scrollports.content.maxScrollTop;
  observation.documentMaxScrollTop=initial.scrollports.document.maxScrollTop;
  if (runtime.source === "fullstack" && initial.availableReadingHeight > 0) {
    const plan=planReadableScroll({targetTop:initial.target.rect.top,targetHeight:initial.target.rect.height,
      readingTop:initial.readingTop,readingBottom:initial.readingBottom,scrollTop:owner.scrollTop,maxScrollTop:owner.maxScrollTop});
    observation.scrollPlan={...plan,scrollport:owner,method:"ONE_SCROLL_IN_NATIVE_READING_BAND"};
    await target.evaluate(applyReadingScroll,{scrollOwner:owner.scrollOwner,delta:plan.delta});
  } else {
    await target.evaluate(node=>node.scrollIntoView({block:"center",behavior:"instant"}));
    observation.scrollPlan={method:"ONE_SCROLL_IN_REFERENCE_VIEWPORT",initialReadingBand:initial.availableReadingHeight,
      requestedDelta:null,clamped:null,planObservation:"NOT_APPLICABLE_REFERENCE_SCROLL_INTO_VIEW"};
  }
  await runtime.page.evaluate(waitForMissionRender);
  const post=await exposure();observation.post=post;observation.postRatio=post.target.ratio;observation.postHit=post.target.hit;
  const postOwner=selectReadingScrollOwner(post.scrollports);
  observation.scrollTopFinal=postOwner.scrollTop;
  observation.appliedDelta=postOwner.scrollTop-owner.scrollTop;
  const visibility=assessReadingExposure({targetTop:post.target.rect.top,targetBottom:post.target.rect.bottom,
    targetLeft:post.target.rect.left,targetRight:post.target.rect.right,readingTop:post.readingTop,readingBottom:post.readingBottom,
    viewportWidth:post.viewport.width,ratio:post.target.ratio,centerHit:post.target.hit.unobstructed,
    edgeHits:post.target.hitPoints.every(point=>point.unobstructed)});
  observation.visibility=visibility;
  const fitsReadingBand=visibility.fitsReadingBand;
  observation.ratio1Applicable=fitsReadingBand;
  if(runtime.source==="fullstack") {
    expect(post.availableReadingHeight,"Native semantic reading band remains positive").toBeGreaterThan(0);
    expect(post.target.hit.unobstructed,"Native semantic target center is unobscured").toBe(true);
    expect(postOwner.scrollOwner,"Native scroll owner remains stable").toBe(owner.scrollOwner);
    if(fitsReadingBand) {
      await expect(target).toBeInViewport({ratio:1});
      expect(visibility.withinReadingBand,"Whole native target fits the unobscured reading band").toBe(true);
      expect(visibility.fullyExposed,"Native target edges remain unobstructed by fixed or sticky elements").toBe(true);
    }
    else {
      expect(post.target.ratio,"Oversized native message remains visible for reading by scroll").toBeGreaterThan(0);
      observation.readingLimit="TARGET_BOX_TALLER_THAN_READING_BAND_REQUIRES_USER_SCROLL_NOT_WHOLE_BOX_IN_ONE_FRAME";
    }
  }
  if(runtime.source==="starter"&&visibility.comparability!=="COMPARABLE") {
    comparison.comparability=visibility.comparability;comparison.reasons??=[];
    comparison.reasons.push(visibility.reason!);
  }
}

for(const c of cases) {
  caseExecutors.set(c.id,async () => {
    const state=c.state as DomainState;
    const reasons=state==="area-populated"?["PINNED_STARTER_SORTS_CONFIRMATION_AND_HAS_NO_AREA_CURRENT_SUMMARY_UI02_OVERRIDES_REFERENCE"]:
      state==="collection-current"?["STARTER_PREDEFINED_DEMO_SCORE_AND_DECOMPOSITION_VS_NATIVE_COMPUTED_EXPERIMENTAL_RESULT"]:[];
    const comparison:CaptureOptions={comparability:reasons.length?"NON_EQUIVALENT":"COMPARABLE",reasons,
      requirement:"HUMAN_DECISION_PENDING",note:"Same semantic reading state/viewport/text scale; initial/post source exposure and any initialRefOcclusion are preserved in fixture/index. CDP glyph observation is not unobscured legibility or visual acceptance."};
    await boundedPair(c,async(runtime,fixture,sourceComparison)=>{
      await ready(runtime,fixture,state);
      await configure(runtime,c);
      await semanticCoreExposure(runtime,c,state,sourceComparison);
      // Capture the named semantic region, rather than an unrelated map or
      // metadata block above it. This scroll precedes all recorded geometry.
      if(state==="area-populated") await runtime.page.getByRole("heading",{name:"Coletas confirmadas",exact:true})
        .evaluate(node=>node.scrollIntoView({block:"center",behavior:"instant"}));
      if(state==="collection-current") await runtime.page.getByRole("heading",{name:"Diagnóstico IHFR experimental",exact:true})
        .evaluate(node=>node.scrollIntoView({block:"center",behavior:"instant"}));
      if(state==="collection-missing") await runtime.page.getByText(runtime.source==="fullstack"?"Não há conjunto de dados ambientais confirmado para esta coleta.":"Nenhum conjunto ambiental confirmado.",{exact:true})
        .evaluate(node=>node.scrollIntoView({block:"center",behavior:"instant"}));
      // recordRootOverflow() checks native overflow and classifies reference differences before sampling.
    },comparison);
  });
}

async function openDetails(runtime:Runtime) {
  const region=runtime.page.getByRole("region",{name:"Diagnóstico IHFR experimental",exact:true});
  for(const detail of await region.locator("details").all()) {
    if(await detail.getAttribute("open")===null) {
      await detail.locator("summary").focus(); await runtime.page.keyboard.press("Enter");
      await expect(detail).toHaveAttribute("open","");
    }
  }
  // Opening/focusing summaries queues the shell's focus-reveal rAF and resize
  // work. Drain that causal work before the one qualifier scroll/measurement.
  await runtime.page.evaluate(waitForMissionRender);
  return region;
}
async function assertHit(control:Locator) {
  await expect(control).toBeInViewport({ratio:1});
  expect(await control.evaluate(node=>{
    const box=node.getBoundingClientRect(); const hit=document.elementFromPoint(box.left+box.width/2,box.top+box.height/2);
    return !!hit&&(hit===node||node.contains(hit));
  })).toBe(true);
}
for(const c of qualifierCases) {
  caseExecutors.set(c.id,async()=>{
    const index=IHFR_CONTRACT.labels.indexOf(c.fixture.qualifier as typeof IHFR_CONTRACT.labels[number]);
    await boundedPair(c,async(runtime,fixture)=>{
      await ready(runtime,fixture,"collection-current");
      await configure(runtime,c);
      const region=await openDetails(runtime);
      const label=region.getByText(runtime.source==="fullstack"?IHFR_SCIENTIFIC_QUALIFICATIONS[index]:IHFR_CONTRACT.labels[index],{exact:true});
      await label.evaluate(node=>node.scrollIntoView({block:"center",behavior:"instant"}));
      // Preserve ratio1 for the actual A+B product interaction, including 667x375/200/inset34.
      await expect(label).toBeInViewport({ratio:1});
      // recordRootOverflow() checks native overflow and classifies reference differences before sampling.
    },{comparability:"NON_EQUIVALENT",reasons:["REFERENCE_HAS_ONE_TECHNICAL_DETAILS_DISCLOSURE_AND_PREDEFINED_SCORE_PRODUCT_HAS_APPROVED_LIMITS_AND_PROVENANCE_DISCLOSURES"],
      note:"Each qualifier is scrolled into view individually; four labels need not share one photograph. No style/scroll change occurs after the measurement."});
  });
}

for(const c of navigationCases) {
  caseExecutors.set(c.id,async()=>{
    await boundedPair(c,async(runtime,fixture)=>{
      await ready(runtime,fixture,"area-populated"); await configure(runtime,c);
      const link=runtime.page.locator('a[href="'+fixture.newerPath+'"]').first();
      await link.focus(); await expect(link).toBeFocused(); await assertHit(link);
      await link.press("Enter");
      await expect(runtime.page.getByRole("region",{name:"Diagnóstico IHFR experimental",exact:true})).toBeVisible();
      await configure(runtime,c); // New client layout is measured after navigation.
      await runtime.page.goBack();
      await expect(runtime.page).toHaveURL(new RegExp(fixture.areaPath+"/?$"));
      await runtime.page.goForward();
      await expect(runtime.page).toHaveURL(new RegExp(fixture.newerPath+"/?$"));
      await configure(runtime,c);
      const action=runtime.page.getByRole("link",{name:runtime.source==="fullstack"?"Registrar dados ambientais":"Registrar medições",exact:true});
      await action.focus(); await expect(action).toBeFocused(); await assertHit(action);
      await runtime.page.keyboard.press("Tab");
      expect(await runtime.page.evaluate(()=>document.activeElement!==document.body)).toBe(true);
    },{comparability:"COMPARABLE",note:"Keyboard native area→collection action, Back/Forward, final action focus and hit testing; source-specific labels remain native."});
  });
}

caseExecutors.set(reloadCase.id,async()=>{
  await boundedPair(reloadCase,async(runtime,fixture)=>{
    await ready(runtime,fixture,"collection-missing"); await configure(runtime,reloadCase);
    await observeReload(runtime); // Records before/after before any instrumentation reset.
    if(runtime.source==="fullstack") await expect(runtime.page.getByRole("region",{name:"Diagnóstico IHFR experimental",exact:true})).toBeVisible();
    else await expect(runtime.page.getByText("Recurso não encontrado",{exact:true})).toBeVisible();
    await configure(runtime,reloadCase);
  },{comparability:"NON_EQUIVALENT",reasons:["PINNED_REFERENCE_CREATED_FIXTURE_IS_MEMORY_ONLY_AND_LOST_AFTER_RELOAD"],
    note:"Inline font-size reset is instrumentation behavior, not browser zoom or user-preference persistence."});
});

test("domain-required-coverage-summary",async()=>{
  test.setTimeout(1_320_000); // Below existing global24min; no action timeout increase.
  expect(setupComplete).toBe(true);
  collectionDeadline=Date.now()+1_260_000; // Reserve60s for final journal/cleanup.
  await collectDomainCases(planned,async c=>{
    const execute=caseExecutors.get(c.id);
    if(!execute) throw new Error("DOMAIN_CASE_EXECUTOR_MISSING");
    await test.step(c.id,execute);
  },async c=>{
    failures.push({id:c.id,code:"COLLECTOR_UNEXPECTED_CASE_FAILURE"});
    await recordCase(c,{execution:"FAIL",comparability:"INSUFFICIENT_EVIDENCE",requirement:"HUMAN_DECISION_PENDING",
      completeness:"PARTIAL",samples:[],errors:["COLLECTOR_UNEXPECTED_CASE_FAILURE"]});
  });
  await finalizeCases();
  expect(failures,"See sanitized case ids and source-specific FAIL receipts").toEqual([]);
});

test.afterAll(async({}, workerInfo)=>{
  const receipt:{browserCleanup:string;logicalDataTeardown:string;physicalCleanup:string;failures:typeof failures}={
    browserCleanup:"PASS",logicalDataTeardown:"NOT_APPLICABLE_IMMUTABLE_SYNTHETIC_DATA_RETAINED_UNTIL_OWNED_RUNNER_DISPOSAL",
    physicalCleanup:"REQUIRES_ORCHESTRATOR_STOP_AND_HOSTED_RUNNER_DISPOSAL",failures,
  };
  for(const runtime of runtimes) {
    if(ownedContextsClosed.has(runtime.source)) continue;
    try { await withOwnedSourceBudget(async()=>{await runtime.cdp.detach();await runtime.context.close();},5_000,()=>quarantine(runtime)); }
    catch { receipt.browserCleanup="FAIL"; }
  }
  if(cleanupFailures.length) receipt.browserCleanup="FAIL";
  await mkdir(archive,{recursive:true});
  // Preserve the first receipt. After a hard worker restart a distinct worker
  // may write a distinct receipt, never overwrite the original with a false PASS.
  const receiptName = workerInfo.workerIndex === 0 ? "domain-cleanup.json" :
    "domain-cleanup-worker-" + workerInfo.workerIndex + ".json";
  await writeFile(join(archive,receiptName),JSON.stringify({ ...receipt,
    workerIndex:workerInfo.workerIndex, caseSet, cleanupFailures, quarantinedSources:[...quarantined], run:process.env.GITHUB_RUN_ID??null,
    attempt:process.env.GITHUB_RUN_ATTEMPT??null },null,2)+"\n",{flag:"wx"});
  if(receipt.browserCleanup!=="PASS") throw new Error("DOMAIN_BROWSER_CLEANUP_FAILED");
});
