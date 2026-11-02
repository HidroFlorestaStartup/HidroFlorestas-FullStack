import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const starterSha = 'cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f';
const hash = bytes=>createHash('sha256').update(bytes).digest('hex');
const check = (condition,code)=>{ if(!condition) throw new Error(code); };
function crc32(bytes) {
  let crc=0xffffffff;
  for(const byte of bytes){crc^=byte;for(let bit=0;bit<8;bit++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}
  return (crc^0xffffffff)>>>0;
}
export function assertPng(bytes,width,height) {
  check(bytes.length>24 && bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a','PNG_SIGNATURE_INVALID');
  let offset=8;const chunks=[];
  while(offset<bytes.length){
    check(offset+12<=bytes.length,'PNG_TRUNCATED');
    const length=bytes.readUInt32BE(offset),end=offset+length+12;
    check(end<=bytes.length,'PNG_CHUNK_TRUNCATED');
    const type=bytes.subarray(offset+4,offset+8).toString();chunks.push(type);
    check(crc32(bytes.subarray(offset+4,end-4))===bytes.readUInt32BE(end-4),'PNG_CRC_MISMATCH');
    if(type==='IHDR')check(length===13 && bytes.readUInt32BE(offset+8)===width && bytes.readUInt32BE(offset+12)===height,'PNG_DIMENSIONS_INVALID');
    offset=end;if(type==='IEND')break;
  }
  check(chunks[0]==='IHDR' && chunks.filter(type=>type==='IHDR').length===1 && chunks.includes('IDAT') && chunks.at(-1)==='IEND' && offset===bytes.length,'PNG_CHUNK_STRUCTURE_INVALID');
}
export function expectedCaseIds(caseSet) {
  check(['focal-3','complete-75'].includes(caseSet),'INVALID_CASE_SET');
  const focal = ['domain-area-empty-320-900-200','domain-area-empty-667-375-200','domain-area-empty-844-390-200'];
  if(caseSet === 'focal-3') return focal;
  const layouts = [[320,900,100],[320,900,200],[375,900,100],[375,900,200],[390,844,100],[390,844,200],[768,900,100],[768,900,200],[1440,900,100],[1440,900,200],[667,375,200],[844,390,200]];
  return ['area-empty','area-populated','collection-record','collection-missing','collection-current']
    .flatMap(state=>layouts.map(layout=>`domain-${state}-${layout.join('-')}`))
    .concat([[320,900,0],[667,375,34],[844,390,0]].flatMap(layout=>[0,1,2,3].map(index=>`domain-qualifier-${layout.join('-')}-${index}`)),
      ['domain-keyboard-history-390','domain-keyboard-history-1440','domain-reload-390-text200']);
}
export function assertCoverage(index,journal,caseSet,identity) {
  const expected = expectedCaseIds(caseSet);
  check(index.source?.sha === identity.sha && index.source?.tree === identity.tree && index.run === identity.run && index.attempt === identity.attempt,'INDEX_PROVENANCE_MISMATCH');
  check(Array.isArray(index.cases) && index.cases.length === expected.length && new Set(index.cases.map(row=>row.id)).size === expected.length && expected.every(id=>index.cases.some(row=>row.id===id)),'PLANNED_IDS_MUST_BE_EXACT_AND_UNIQUE');
  const results = journal.filter(row=>row.kind==='case');
  check(results.length === expected.length && new Set(results.map(row=>row.id)).size === expected.length,'JOURNAL_RESULTS_MUST_BE_EXACT_AND_UNIQUE');
  for(const row of index.cases) {
    const logged = results.find(item=>item.id===row.id);
    check(logged && logged.execution === row.execution && logged.completeness === row.completeness && logged.comparability === row.comparability && logged.requirement === row.requirement,'JOURNAL_INDEX_RESULT_MISMATCH');
    check(row.execution === 'PASS' && row.completeness === 'COMPLETE' && ['COMPARABLE','NON_EQUIVALENT'].includes(row.comparability),'REQUIRED_CASE_INCOMPLETE_OR_FAILED');
    check(['SATISFIED_TECHNICALLY','HUMAN_DECISION_PENDING'].includes(row.requirement),'REQUIREMENT_DEFECT_OR_UNKNOWN');
    check(Array.isArray(row.samples) && row.samples.length===2 && !row.errors?.length,'TWO_SUCCESSFUL_SOURCE_SAMPLES_REQUIRED');
    check(JSON.stringify(logged.samples)===JSON.stringify(row.samples),'JOURNAL_INDEX_SAMPLES_MISMATCH');
    check(Array.isArray(row.sourceExecutions) && row.sourceExecutions.length===2 && new Set(row.sourceExecutions.map(value=>value.source)).size===2 && row.sourceExecutions.every(value=>['fullstack','starter'].includes(value.source) && value.execution==='PASS'),'TWO_SOURCE_EXECUTIONS_REQUIRED');
    check(JSON.stringify(logged.sourceExecutions)===JSON.stringify(row.sourceExecutions),'JOURNAL_INDEX_SOURCE_EXECUTIONS_MISMATCH');
  }
  check(!journal.some(row=>row.kind==='lifecycle' && row.status==='FAIL'),'LIFECYCLE_FAILURE_PRESERVED');
  return expected;
}
export async function verifyDomainEvidence(root,caseSet,identity) {
  const readJson = async file=>JSON.parse((await readFile(join(root,file),'utf8')).replace(/^\uFEFF/,''));
  const index=await readJson('index.json');
  const journal=(await readFile(join(root,'cases.jsonl'),'utf8')).trim().split(/\r?\n/).map(JSON.parse);
  const expected=assertCoverage(index,journal,caseSet,identity);
  const selection=await readJson('domain-selection.json');
  check(selection.caseSet===caseSet && selection.plannedCount===expected.length && JSON.stringify(selection.ids)===JSON.stringify(expected) && selection.sourceSha===identity.sha && selection.run===identity.run && selection.attempt===identity.attempt,'SELECTION_MANIFEST_MISMATCH');
  const starts=(await readFile(join(root,'domain-source-starts.jsonl'),'utf8')).trim().split(/\r?\n/).map(JSON.parse);
  check(starts.length===expected.length*2 && new Set(starts.map(row=>row.caseId+':'+row.source)).size===expected.length*2,'EXACTLY_TWO_SOURCE_STARTS_PER_CASE_REQUIRED');
  for(const id of expected) for(const source of ['fullstack','starter']) {
    const started=starts.find(row=>row.caseId===id && row.source===source);
    check(started?.execution==='STARTED' && started.sourceSha===(source==='fullstack'?identity.sha:starterSha) && started.run===identity.run && started.attempt===identity.attempt,'SOURCE_START_PROVENANCE_MISMATCH');
  }
  const runner=await readJson('runner.json');
  check(runner.sourceSha===identity.sha && runner.tree===identity.tree && runner.run===identity.run && runner.attempt===identity.attempt && runner.caseSet===caseSet,'RUNNER_PROVENANCE_MISMATCH');
  check(['setup','capture','stop','starterStop'].every(key=>runner[key]==='PASS'),'RUNNER_SETUP_CAPTURE_OR_CLEANUP_FAILED');
  const fixture=await readJson('domain-fixture-receipt.json');
  check(fixture.setup==='PASS' && fixture.sourceSha===identity.sha && fixture.run===identity.run && fixture.attempt===identity.attempt,'FIXTURE_PROVENANCE_MISMATCH');
  const cleanups=(await readdir(root)).filter(name=>/^domain-cleanup(?:-worker-\d+)?\.json$/.test(name));
  check(cleanups.length===1,'WORKER_RESTART_OR_MISSING_CLEANUP');
  const cleanup=await readJson(cleanups[0]);
  check(cleanup.browserCleanup==='PASS' && !cleanup.failures?.length && Array.isArray(cleanup.cleanupFailures) && cleanup.cleanupFailures.length===0 && Array.isArray(cleanup.quarantinedSources) && cleanup.quarantinedSources.length===0 && cleanup.caseSet===caseSet && cleanup.run===identity.run && cleanup.attempt===identity.attempt,'BROWSER_CLEANUP_FAILED');
  const files=[];
  for(const row of index.cases) {
    const sources=[];
    for(const sample of row.samples) {
      check([sample.png,sample.json].every(name=>typeof name==='string' && basename(name)===name && !name.includes('..')),'UNSAFE_SAMPLE_PATH');
      const png=await readFile(join(root,sample.png)),json=await readFile(join(root,sample.json));
      check(hash(png)===sample.pngSha256 && hash(json)===sample.jsonSha256,'SAMPLE_HASH_MISMATCH');
      const meta=JSON.parse(json);
      check(['fullstack','starter'].includes(meta.source) && !sources.includes(meta.source),'SOURCE_PAIR_DUPLICATED_OR_INVALID');sources.push(meta.source);
      check(meta.sha===(meta.source==='fullstack'?identity.sha:starterSha) && /^[a-f0-9]{40}$/.test(meta.tree) && (meta.source!=='fullstack' || meta.tree===identity.tree) && meta.run===identity.run && meta.attempt===identity.attempt,'SAMPLE_PROVENANCE_MISMATCH');
      check(meta.caseId===row.id && meta.execution==='PASS' && meta.completeness==='COMPLETE' && ['COMPARABLE','NON_EQUIVALENT'].includes(meta.comparability),'SAMPLE_CLASSIFICATION_INVALID');
      check(meta.fullPage===false && meta.textScale===row.scale && meta.safeAreaBottom===row.inset && meta.viewport?.width===row.width && meta.viewport?.height===row.height,'SAMPLE_LAYOUT_MISMATCH');
      assertPng(png,row.width,row.height);
      check(meta.pngSha256===sample.pngSha256 && meta.geometry?.width===row.width && meta.geometry?.height===row.height && meta.maskPolicy==='VISIBLE_CONTROLS_CLIPPED_TO_VIEWPORT_AND_SCROLLPORT','GEOMETRY_OR_MASKING_INVALID');
      check(meta.fontsActuallyRendered && Object.keys(meta.fontsActuallyRendered).length>0 && meta.fontEvidence && meta.fontEvidence.insufficient===false,'FONT_EVIDENCE_INSUFFICIENT');
      if(meta.comparability==='NON_EQUIVALENT') check(meta.reasons?.length>0,'NON_EQUIVALENT_REASON_REQUIRED');
      const loggedSamples=journal.filter(entry=>entry.kind==='sample' && entry.caseId===row.id && entry.source===meta.source);
      check(loggedSamples.length===1 && loggedSamples[0].files?.pngSha256===sample.pngSha256 && loggedSamples[0].files?.jsonSha256===sample.jsonSha256,'SAMPLE_JOURNAL_MISMATCH');
      files.push({caseId:row.id,source:meta.source,png:sample.png,json:sample.json,pngSha256:sample.pngSha256,jsonSha256:sample.jsonSha256});
    }
  }
  const native667=index.cases.find(row=>row.id==='domain-area-empty-667-375-200')?.fixture?.semanticScrollBySource?.fullstack;
  check(native667?.postRatio===1 && native667?.postHit?.unobstructed===true && native667?.ratio1Applicable===true,'NATIVE_667_RATIO_ONE_AND_HIT_REQUIRED');
  return {schema:'hf-ui044-pr50-b-verification-v1',status:'PASS',...identity,caseSet,planned:expected.length,results:index.cases.length,notRun:0,pairs:files.length/2,
    coverageGate:caseSet==='complete-75'?'UI06_B_EVIDENCE_COMPLETE':'B_FOCAL_THREE_ONLY',
    comparability:Object.fromEntries(['COMPARABLE','NON_EQUIVALENT'].map(value=>[value,index.cases.filter(row=>row.comparability===value).length])),
    humanAcceptance:'HUMAN_ACCEPTANCE_PENDING',files};
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href) {
  const args=process.argv.slice(2), root=resolve(args[args.indexOf('--archive')+1]??''),caseSet=args[args.indexOf('--case-set')+1];
  let summary;
  try {
    const identity={sha:process.env.GITHUB_SHA,tree:execFileSync('git',['rev-parse','HEAD^{tree}'],{encoding:'utf8'}).trim(),run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT};
    summary=await verifyDomainEvidence(root,caseSet,identity);
  } catch(error) {
    summary={schema:'hf-ui044-pr50-b-verification-v1',status:'FAIL',sha:process.env.GITHUB_SHA,run:process.env.GITHUB_RUN_ID,attempt:process.env.GITHUB_RUN_ATTEMPT,caseSet,
      failureCode:error?.code==='ENOENT'?'REQUIRED_EVIDENCE_MISSING':/^[A-Z0-9_]+$/.test(error?.message??'')?error.message:'EVIDENCE_PARSE_OR_VERIFICATION_FAILED',
      required:expectedCaseIds(caseSet).length,notRun:'REQUIRES_INDEX_INSPECTION',humanAcceptance:'HUMAN_ACCEPTANCE_PENDING'};
    process.exitCode=1;
  }
  await mkdir(root,{recursive:true});
  await writeFile(join(root,'b-verification-summary.json'),JSON.stringify(summary,null,2)+'\n',{flag:'wx'});
  console.log(`${caseSet}: ${summary.status}; ${summary.coverageGate??summary.failureCode}`);
}
