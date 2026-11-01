import { test, expect, type Locator } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { CaptureOptions, EvidenceCase, LayoutCase, Runtime } from "./contract";
import { createRuntime, configure, sample, recordCase, registerCases, finalizeCases, observeReload, archive } from "./shared";
import { setupFullstackDomain, setupStarterDomain, navigateDomain, AREA_NAME, EMPTY_NAME, type DomainFixture } from "./domain-fixtures";
import { IHFR_SCIENTIFIC_QUALIFICATIONS } from "../../tests/e2e/support/frontend-ihfr-evidence";
import { IHFR_CONTRACT } from "../../src/app/api/server/ihfr-diagnosis/ihfr-diagnosis.constants";

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
const planned = [...cases,...qualifierCases,...navigationCases,reloadCase];
const runtimes: Runtime[] = [];
const fixtures = new Map<string,DomainFixture>();
const failures: Array<{id:string;code:string}> = [];
let setupComplete = false;

async function boundedPair(c: EvidenceCase, prepare: (runtime:Runtime,fixture:DomainFixture)=>Promise<void>, options:CaptureOptions={}) {
  const samples = [], errors:string[] = [];
  for (const runtime of runtimes) {
    try {
      const fixture = fixtures.get(runtime.source)!;
      await prepare(runtime,fixture);
      samples.push(await sample(runtime,{...c,fixture:{...c.fixture,sourceFixture:fixture}}, {
        ...options, actualState: runtime.source==="starter" ? c.state+"-REFERENCE_DEMONSTRATION" : c.state+"-NATIVE_PRODUCT",
      }));
    } catch (error) {
      // Never serialize arbitrary exception messages: transports may carry secrets.
      const code = error instanceof Error && error.name === "TimeoutError" ? "TIMEOUT" : "CASE_ASSERTION_OR_CAPTURE_FAILED";
      const location=error instanceof Error?error.stack?.match(/(?:domain\.spec|shared)\.ts:\d+:\d+/)?.[0]:undefined;
      errors.push(runtime.source+":"+code+(location?"@"+location:""));
    }
  }
  const fontsObserved=samples.every(entry=>Object.values(entry.fonts).every(value=>
    value&&typeof value==="object"&&"observation" in value&&value.observation==="OBSERVED"));
  const result = { execution:errors.length?"FAIL":"PASS", comparability:fontsObserved?(options.comparability??"COMPARABLE"):"INSUFFICIENT_EVIDENCE",
    requirement:errors.length?"DEFECT_FOUND":options.requirement??"HUMAN_DECISION_PENDING",
    completeness:errors.length?"PARTIAL":"COMPLETE", reasons:options.reasons??[], samples, errors };
  await recordCase(c,result);
  if (errors.length) failures.push({id:c.id,code:errors.join(";")});
}

test.beforeAll(async ({browser}) => {
  test.setTimeout(120_000);
  await registerCases(planned);
  const fullstack = await createRuntime(browser,"fullstack"); runtimes.push(fullstack);
  const starter = await createRuntime(browser,"starter"); runtimes.push(starter);
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

for(const c of cases) {
  test(c.id,async () => {
    const state=c.state as DomainState;
    const reasons=state==="area-populated"?["PINNED_STARTER_SORTS_CONFIRMATION_AND_HAS_NO_AREA_CURRENT_SUMMARY_UI02_OVERRIDES_REFERENCE"]:
      state==="collection-current"?["STARTER_PREDEFINED_DEMO_SCORE_AND_DECOMPOSITION_VS_NATIVE_COMPUTED_EXPERIMENTAL_RESULT"]:[];
    await boundedPair(c,async(runtime,fixture)=>{
      await ready(runtime,fixture,state);
      await configure(runtime,c);
      // Capture the named semantic region, rather than an unrelated map or
      // metadata block above it. This scroll precedes all recorded geometry.
      if(state==="area-populated") await runtime.page.getByRole("heading",{name:"Coletas confirmadas",exact:true})
        .evaluate(node=>node.scrollIntoView({block:"center",behavior:"instant"}));
      if(state==="collection-current") await runtime.page.getByRole("heading",{name:"Diagnóstico IHFR experimental",exact:true})
        .evaluate(node=>node.scrollIntoView({block:"center",behavior:"instant"}));
      if(state==="collection-missing") await runtime.page.getByText(runtime.source==="fullstack"?"Não há conjunto de dados ambientais confirmado para esta coleta.":"Nenhum conjunto ambiental confirmado.",{exact:true})
        .evaluate(node=>node.scrollIntoView({block:"center",behavior:"instant"}));
      expect(await runtime.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    },{comparability:reasons.length?"NON_EQUIVALENT":"COMPARABLE",reasons,
      requirement:"HUMAN_DECISION_PENDING",note:"Same semantic fixture/state/viewport/text scale. Visual acceptance requires image inspection; known reference model differences are explicit."});
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
  test(c.id,async()=>{
    const index=IHFR_CONTRACT.labels.indexOf(c.fixture.qualifier as typeof IHFR_CONTRACT.labels[number]);
    await boundedPair(c,async(runtime,fixture)=>{
      await ready(runtime,fixture,"collection-current");
      await configure(runtime,c);
      const region=await openDetails(runtime);
      const label=region.getByText(runtime.source==="fullstack"?IHFR_SCIENTIFIC_QUALIFICATIONS[index]:IHFR_CONTRACT.labels[index],{exact:true});
      await label.evaluate(node=>node.scrollIntoView({block:"center",behavior:"instant"}));
      // Preserve ratio1 for the actual A+B product interaction, including 667x375/200/inset34.
      await expect(label).toBeInViewport({ratio:1});
      expect(await runtime.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    },{comparability:"NON_EQUIVALENT",reasons:["REFERENCE_HAS_ONE_TECHNICAL_DETAILS_DISCLOSURE_AND_PREDEFINED_SCORE_PRODUCT_HAS_APPROVED_LIMITS_AND_PROVENANCE_DISCLOSURES"],
      note:"Each qualifier is scrolled into view individually; four labels need not share one photograph. No style/scroll change occurs after the measurement."});
  });
}

for(const c of navigationCases) {
  test(c.id,async()=>{
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

test(reloadCase.id,async()=>{
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
  expect(setupComplete).toBe(true);
  await finalizeCases();
  expect(failures,"See sanitized case ids and source-specific FAIL receipts").toEqual([]);
});

test.afterAll(async()=>{
  const receipt:{browserCleanup:string;logicalDataTeardown:string;physicalCleanup:string;failures:typeof failures}={
    browserCleanup:"PASS",logicalDataTeardown:"NOT_APPLICABLE_IMMUTABLE_SYNTHETIC_DATA_RETAINED_UNTIL_OWNED_RUNNER_DISPOSAL",
    physicalCleanup:"REQUIRES_ORCHESTRATOR_STOP_AND_HOSTED_RUNNER_DISPOSAL",failures,
  };
  for(const runtime of runtimes) {
    try { await runtime.cdp.detach(); await runtime.context.close(); }
    catch { receipt.browserCleanup="FAIL"; }
  }
  await mkdir(archive,{recursive:true});
  await writeFile(join(archive,"domain-cleanup.json"),JSON.stringify(receipt,null,2)+"\n",{flag:"wx"});
  if(receipt.browserCleanup!=="PASS") throw new Error("DOMAIN_BROWSER_CLEANUP_FAILED");
});
