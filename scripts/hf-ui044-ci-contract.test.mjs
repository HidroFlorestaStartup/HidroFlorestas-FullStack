import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import { assertOfficialGates } from './hf-ui044-verify.mjs';
import { assertRunnerContext, validateWorkflow, verifyPrivateEnvironment, checkFiles, repository, ref, sanitizeHostedLibpq, persistHostedEnvironment, assertEnvironmentReceipt, neutralizedPgNames } from './hf-ui044-pr50-contract.mjs';
import { expectedCaseIds, assertCoverage, verifyDomainEvidence, assertPng } from './hf-ui044-b-verify.mjs';
const require=createRequire(import.meta.url);
const workflow=require('yaml').parse(readFileSync('.github/workflows/hf-ui044-pr50-final.yml','utf8'));
const sha='a'.repeat(40),tree='b'.repeat(40);
const env={GITHUB_ACTIONS:'true',GITHUB_REPOSITORY:repository,GITHUB_REF:ref,GITHUB_EVENT_NAME:'push',GITHUB_RUN_ATTEMPT:'1',RUNNER_OS:'Windows',RUNNER_ENVIRONMENT:'github-hosted',GITHUB_SHA:sha,GITHUB_RUN_ID:'123'};
const event={forced:false,deleted:false,ref,after:sha,repository:{full_name:repository}};
test('exact authorized hosted push and complete source contract pass',()=>{
 assertRunnerContext(env,event); validateWorkflow(workflow); checkFiles();
});
test('push guard rejects every missing attestation and forged payload field',()=>{
 for(const key of Object.keys(env)) assert.throws(()=>assertRunnerContext({...env,[key]:undefined},event),undefined,key);
 for(const patch of [{forced:true},{deleted:true},{forced:undefined},{deleted:undefined},{ref:'refs/heads/main'},{after:'c'.repeat(40)},{repository:{full_name:'fork/repo'}}]) assert.throws(()=>assertRunnerContext(env,{...event,...patch}));
 for(const patch of [{GITHUB_RUN_ATTEMPT:'2'},{GITHUB_EVENT_NAME:'workflow_dispatch'},{RUNNER_ENVIRONMENT:'self-hosted'},{GITHUB_REF:ref+'-extra'}]) assert.throws(()=>assertRunnerContext({...env,...patch},event));
});
test('workflow negative mutations cannot expand event, jobs, budget, credentials or evidence',()=>{
 const mutate=fn=>{const value=structuredClone(workflow);fn(value);assert.throws(()=>validateWorkflow(value));};
 mutate(w=>w.on.workflow_dispatch={});mutate(w=>w.on.push.branches.push('main'));mutate(w=>w.permissions.contents='write');
 mutate(w=>w.jobs['b-focal-3']['timeout-minutes']=21);mutate(w=>w.jobs['b-complete-75'].needs=undefined);mutate(w=>w.jobs['rc-final'].if='false && '+w.jobs['rc-final'].if);
 mutate(w=>w.jobs.extra=structuredClone(w.jobs['rc-final']));
 mutate(w=>w.jobs['b-focal-3'].steps[0].uses='actions/checkout@main');mutate(w=>w.jobs['b-focal-3'].steps[0].with['persist-credentials']=true);
 mutate(w=>w.jobs['b-focal-3'].steps.at(-1).with.path='fullstack/.env');mutate(w=>w.jobs['b-focal-3'].steps.at(-1).with['retention-days']=90);
 mutate(w=>w.jobs['b-focal-3'].steps[1]['continue-on-error']=true);
 mutate(w=>{const step=w.jobs['b-focal-3'].steps.find(step=>step.run?.includes('--sanitize-libpq'));step.run=step.run.replace(' --sanitize-libpq','');});
 mutate(w=>{const step=w.jobs['b-focal-3'].steps.at(-1);step.with.path=step.with.path.replace('fullstack/.accounts-validation/hf-ui044-runner-environment.json','');});
});
test('inherited private config and root env files fail without revealing values',()=>{
 const root=mkdtempSync(join(tmpdir(),'hf-ui044-contract-'));
 try {
  verifyPrivateEnvironment(root,{});
  for(const key of ['DATABASE_URL','SMTP_HOST','ACCOUNT_REQUEST_KEY','DOTENV_CONFIG_PATH','HF_UI044_PUSH_GUARD']) assert.throws(()=>verifyPrivateEnvironment(root,{[key]:'synthetic-do-not-print'}),error=>!error.message.includes('synthetic-do-not-print'));
  writeFileSync(join(root,'.env'),'synthetic');assert.throws(()=>verifyPrivateEnvironment(root,{}));
 } finally {rmSync(root,{recursive:true,force:true});}
});
const identity={sha,tree,run:'123',attempt:'1'};
function coverage(caseSet) {
 const cases=expectedCaseIds(caseSet).map(id=>({id,execution:'PASS',completeness:'COMPLETE',comparability:'COMPARABLE',requirement:'HUMAN_DECISION_PENDING',samples:[{png:'fullstack-'+id+'.png'},{png:'starter-'+id+'.png'}],sourceExecutions:[{source:'fullstack',execution:'PASS'},{source:'starter',execution:'PASS'}],errors:[]}));
 return {index:{source:{sha,tree},run:'123',attempt:'1',cases},journal:cases.map(row=>({...structuredClone(row),kind:'case'}))};
}
test('focal is exactly three former failures and full matrix is exactly75, not diagnostic counts',()=>{
 assert.equal(expectedCaseIds('complete-75').length,75);assert.equal(new Set(expectedCaseIds('complete-75')).size,75);
 assert.deepEqual(expectedCaseIds('focal-3'),['domain-area-empty-320-900-200','domain-area-empty-667-375-200','domain-area-empty-844-390-200']);
 for(const caseSet of ['focal-3','complete-75']){const {index,journal}=coverage(caseSet);assertCoverage(index,journal,caseSet,identity);}
 assert.throws(()=>expectedCaseIds('all'));
});
test('coverage rejects missing, duplicate, failed, NOT_RUN, incomplete, wrong SHA and journal-hidden results',()=>{
 const mutate=fn=>{const value=coverage('complete-75');fn(value);assert.throws(()=>assertCoverage(value.index,value.journal,'complete-75',identity));};
 mutate(v=>v.index.cases.pop());mutate(v=>v.index.cases[1].id=v.index.cases[0].id);mutate(v=>v.index.source.sha='c'.repeat(40));
 mutate(v=>v.index.attempt='2');mutate(v=>v.journal.pop());mutate(v=>v.index.cases[0].execution='NOT_RUN');mutate(v=>v.index.cases[0].execution='FAIL');
 mutate(v=>v.index.cases[0].completeness='PARTIAL');mutate(v=>v.index.cases[0].comparability='INSUFFICIENT_EVIDENCE');
 mutate(v=>v.index.cases[0].sourceExecutions[0].execution='NOT_RUN');mutate(v=>v.index.cases[0].requirement='SATISFIED_TECHNICALLY');mutate(v=>v.index.cases[0].samples.pop());mutate(v=>v.journal.push({kind:'lifecycle',status:'FAIL'}));
 const {index,journal}=coverage('focal-3');assert.throws(()=>assertCoverage(index,journal,'complete-75',identity));
});

test('official RC requires exactly15 named successful gates and a valid common snapshot',()=>{
 const names=['RegressionSetup','Unit','Integration','Migration','Contract','R1','Build','Typecheck','Lint','E2E','Https','Deletion','Ihfr','Bootstrap','SchemaAudit'];
 const rows=names.map(gate=>({gate,result:'PASS',exitCode:0,snapshot:'a'.repeat(64)}));
 assertOfficialGates(rows);
 const mutate=fn=>{const value=structuredClone(rows);fn(value);assert.throws(()=>assertOfficialGates(value));};
 mutate(v=>v.pop());mutate(v=>v.push(v[0]));mutate(v=>v[1].gate=v[0].gate);mutate(v=>v[0].exitCode=1);mutate(v=>v[0].result='FAIL');
 mutate(v=>v[0].snapshot='b'.repeat(64));mutate(v=>v.forEach(row=>row.snapshot=undefined));
});
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
function png(width,height){
 const crc=bytes=>{let value=0xffffffff;for(const byte of bytes){value^=byte;for(let bit=0;bit<8;bit++)value=(value>>>1)^((value&1)?0xedb88320:0);}return(value^0xffffffff)>>>0;};
 const chunk=(type,data)=>{const bytes=Buffer.alloc(data.length+12);bytes.writeUInt32BE(data.length);bytes.write(type,4);data.copy(bytes,8);bytes.writeUInt32BE(crc(bytes.subarray(4,-4)),bytes.length-4);return bytes;};
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(width);ihdr.writeUInt32BE(height,4);ihdr[8]=8;ihdr[9]=6;
 return Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(Buffer.alloc((width*4+1)*height))),chunk('IEND',Buffer.alloc(0))]);
}
function buildArchive(root){
 const {index,journal}=coverage('focal-3');
 for(const row of index.cases){
  const dims=row.id.split('-').slice(-3).map(Number);Object.assign(row,{width:dims[0],height:dims[1],scale:200,inset:0,fixture:{semanticScrollBySource:{fullstack:{postRatio:1,postHit:{unobstructed:true},ratio1Applicable:true}}}});
  row.samples=[];
  for(const source of ['fullstack','starter']){
   const pngName=source+'-'+row.id+'.png',jsonName=source+'-'+row.id+'.json',bytes=png(row.width,row.height);
   const meta={caseId:row.id,source,sha:source==='fullstack'?sha:'cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f',tree,run:'123',attempt:'1',execution:'PASS',completeness:'COMPLETE',comparability:'COMPARABLE',viewport:{width:row.width,height:row.height},textScale:200,safeAreaBottom:0,fullPage:false,pngSha256:digest(bytes),geometry:{width:row.width,height:row.height},maskPolicy:'VISIBLE_CONTROLS_CLIPPED_TO_VIEWPORT_AND_SCROLLPORT',fontsActuallyRendered:{main:{observation:'OBSERVED'}},fontEvidence:{insufficient:false}};
   const json=JSON.stringify(meta);writeFileSync(join(root,pngName),bytes);writeFileSync(join(root,jsonName),json);
   const sample={png:pngName,json:jsonName,pngSha256:digest(bytes),jsonSha256:digest(json)};row.samples.push(sample);
   journal.push({kind:'sample',...meta,files:sample});
  }
  Object.assign(journal.find(item=>item.kind==='case' && item.id===row.id),row);
 }
 const put=(name,value)=>writeFileSync(join(root,name),JSON.stringify(value));
 put('domain-selection.json',{caseSet:'focal-3',plannedCount:3,ids:expectedCaseIds('focal-3'),sourceSha:sha,run:'123',attempt:'1'});
 writeFileSync(join(root,'domain-source-starts.jsonl'),index.cases.flatMap(row=>['fullstack','starter'].map(source=>JSON.stringify({caseId:row.id,source,execution:'STARTED',sourceSha:source==='fullstack'?sha:'cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f',run:'123',attempt:'1'}))).join('\n')+'\n');
 put('index.json',index);writeFileSync(join(root,'cases.jsonl'),journal.map(row=>JSON.stringify(row)).join('\n')+'\n');
 put('runner.json',{sourceSha:sha,tree,run:'123',attempt:'1',caseSet:'focal-3',setup:'PASS',capture:'PASS',stop:'PASS',starterStop:'PASS'});
 put('domain-fixture-receipt.json',{setup:'PASS',sourceSha:sha,run:'123',attempt:'1'});
 put('domain-cleanup.json',{browserCleanup:'PASS',failures:[],cleanupFailures:[],quarantinedSources:[],caseSet:'focal-3',run:'123',attempt:'1'});
 return {index,journal,put};
}
test('PNG verifies CRC and chunk structure, rejects corruption and wrong dimensions',()=>{
 const valid=png(320,900);assertPng(valid,320,900);assert.throws(()=>assertPng(valid,321,900));
 const corrupt=Buffer.from(valid);corrupt[20]^=1;assert.throws(()=>assertPng(corrupt,320,900));assert.throws(()=>assertPng(valid.subarray(0,-4),320,900));
});
test('source pair artifacts verify bytes, source provenance and separate cleanup',async()=>{
 const root=mkdtempSync(join(tmpdir(),'hf-ui044-evidence-'));
 try{
  const {index,put}=buildArchive(root);
  const summary=await verifyDomainEvidence(root,'focal-3',identity);assert.equal(summary.status,'PASS');assert.equal(summary.pairs,3);assert.equal(summary.coverageGate,'B_FOCAL_THREE_ONLY');
  put('domain-cleanup.json',{browserCleanup:'FAIL',failures:[],run:'123',attempt:'1'});
  await assert.rejects(verifyDomainEvidence(root,'focal-3',identity),/BROWSER_CLEANUP_FAILED/);
  put('domain-cleanup.json',{browserCleanup:'PASS',failures:[],cleanupFailures:[],quarantinedSources:[],caseSet:'focal-3',run:'123',attempt:'1'});
  writeFileSync(join(root,index.cases[0].samples[0].png),'corrupt');
  await assert.rejects(verifyDomainEvidence(root,'focal-3',identity),/SAMPLE_HASH_MISMATCH/);
 }finally{rmSync(root,{recursive:true,force:true});}
});

test('O3 regression: attested inert libpq tombstones survive subsequent Actions steps',()=>{
 const root=mkdtempSync(join(tmpdir(),'hf-ui044-libpq-red-'));
 try {assert.doesNotThrow(()=>verifyPrivateEnvironment(root,{PGUSER:'',PGPASSWORD:'',HF_UI044_LIBPQ_SANITIZED:'PASS'}));}
 finally {rmSync(root,{recursive:true,force:true});}
});

test('O3 host PGUSER reproduction remains rejected without explicit hosted neutralization',()=>{
 const root=mkdtempSync(join(tmpdir(),'hf-ui044-host-defaults-'));
 try {
  const inherited={...env,PGUSER:'synthetic-host-user',PGPASSWORD:'synthetic-host-password',PGBIN:'synthetic-host-bin',PGROOT:'synthetic-host-root',PGDATA:'synthetic-host-data'};
  assert.throws(()=>verifyPrivateEnvironment(root,inherited),/Non-neutralized PostgreSQL/);
  const result=sanitizeHostedLibpq(root,inherited,event);
  assert.deepEqual(result.presentNames,['PGBIN','PGDATA','PGPASSWORD','PGROOT','PGUSER']);
  assert.ok(neutralizedPgNames.every(name=>!Object.hasOwn(result.environment,name)));
  assert.equal(result.environment.HF_UI044_LIBPQ_SANITIZED,'PASS');
  assert.doesNotThrow(()=>verifyPrivateEnvironment(root,result.environment));
  const receiptText=JSON.stringify({presentNames:result.presentNames,neutralizedNames:result.neutralizedNames});
  assert.ok(!receiptText.includes('synthetic-host-'));
  assert.throws(()=>sanitizeHostedLibpq(root,{...inherited,RUNNER_ENVIRONMENT:'self-hosted'},event));
  assert.throws(()=>sanitizeHostedLibpq(root,{...inherited,GITHUB_RUN_ATTEMPT:'2'},event));
 } finally {rmSync(root,{recursive:true,force:true});}
});
test('O3 neutralization never permits private app values or unknown PG selectors, including empty values',()=>{
 const root=mkdtempSync(join(tmpdir(),'hf-ui044-libpq-negative-'));
 try {
  for(const key of ['DATABASE_URL','TEST_DATABASE_URL','DIRECT_URL','POSTGRES_URL','JWT_SECRET','SMTP_HOST','SMTP_USER','SMTP_APP_PASSWORD','MAIL_FROM','CLOUDINARY_API_KEY','ACCOUNT_REQUEST_KEY','DOTENV_CONFIG_PATH','HF_UI044_PUSH_GUARD'])
   for(const value of ['', 'synthetic-private-do-not-print'])
    assert.throws(()=>sanitizeHostedLibpq(root,{...env,PGUSER:'synthetic', [key]:value},event),error=>!error.message.includes('synthetic-private-do-not-print'));
  for(const value of ['', 'synthetic']) {
   assert.throws(()=>sanitizeHostedLibpq(root,{...env,PG_UNRECOGNIZED:value},event));
   assert.throws(()=>verifyPrivateEnvironment(root,{HF_UI044_LIBPQ_SANITIZED:'PASS',PG_UNRECOGNIZED:value}));
  }
  for(const key of neutralizedPgNames) {
   assert.throws(()=>verifyPrivateEnvironment(root,{[key]:''}));
   assert.throws(()=>verifyPrivateEnvironment(root,{HF_UI044_LIBPQ_SANITIZED:'PASS',[key]:'synthetic-not-inert'}));
   assert.doesNotThrow(()=>verifyPrivateEnvironment(root,{HF_UI044_LIBPQ_SANITIZED:'PASS',[key]:''}));
  }
  writeFileSync(join(root,'.env.local'),'synthetic');assert.throws(()=>sanitizeHostedLibpq(root,{...env,PGUSER:'synthetic'},event));
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('O3 names-only receipt and GITHUB_ENV persist inert selectors across steps and reject reinjection',()=>{
 const root=mkdtempSync(join(tmpdir(),'hf-ui044-libpq-persist-'));
 try{
  const githubEnvironment=join(root,'github-env'), initial={...env,GITHUB_ENV:githubEnvironment,GITHUB_JOB:'b-focal-3',PGUSER:'synthetic-host-user',PGPASSWORD:'synthetic-host-password'};
  persistHostedEnvironment(root,initial,event,tree);
  const receipt=JSON.parse(readFileSync(join(root,'.accounts-validation/hf-ui044-runner-environment.json'),'utf8'));
  assertEnvironmentReceipt(receipt,initial,tree);assert.doesNotThrow(()=>verifyPrivateEnvironment(root,initial));
  const written=readFileSync(githubEnvironment,'utf8');
  assert.ok(!written.includes('synthetic-host-'));
  const nextStep={...env,GITHUB_JOB:'b-focal-3',...Object.fromEntries(written.trim().split('\n').map(line=>{const offset=line.indexOf('=');return[line.slice(0,offset),line.slice(offset+1)];}))};
  assertEnvironmentReceipt(receipt,nextStep,tree);assert.doesNotThrow(()=>verifyPrivateEnvironment(root,nextStep));
  assert.ok(neutralizedPgNames.every(name=>nextStep[name]===''));
  for(const [key,value] of [['PGUSER','synthetic-injected'],['PGPASSWORD','synthetic-injected'],['DATABASE_URL',''],['TEST_DATABASE_URL','']])
   assert.throws(()=>verifyPrivateEnvironment(root,{...nextStep,[key]:value}));
  assert.throws(()=>assertEnvironmentReceipt({...receipt,run:'999'},nextStep,tree));
  assert.throws(()=>assertEnvironmentReceipt({...receipt,job:'rc-final'},nextStep,tree));
  assert.throws(()=>assertEnvironmentReceipt({...receipt,sourceSha:'c'.repeat(40)},nextStep,tree));
  assert.throws(()=>assertEnvironmentReceipt(receipt,{...nextStep,HF_UI044_LIBPQ_SANITIZED:undefined},tree));
  assert.throws(()=>persistHostedEnvironment(root,initial,event,tree));
 }finally{rmSync(root,{recursive:true,force:true});}
});
