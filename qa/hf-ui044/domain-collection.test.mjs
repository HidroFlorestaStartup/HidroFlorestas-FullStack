import test from 'node:test';
import assert from 'node:assert/strict';
import { FOCAL_DOMAIN_IDS, selectDomainCases, collectDomainCases, withOwnedSourceBudget, classifyDomainPair } from './domain-collection.ts';
const matrix = [...FOCAL_DOMAIN_IDS.map(id => ({id})), ...Array.from({length:72}, (_,i) => ({id:'case-'+i}))];
test('focal selects only three actual old IDs; complete selects exactly75', () => {
  assert.deepEqual(selectDomainCases(matrix,'focal-3').map(c=>c.id), [...FOCAL_DOMAIN_IDS]);
  assert.equal(selectDomainCases(matrix,'complete-75').length,75);
  assert.throws(()=>selectDomainCases(matrix,undefined),/EXPLICIT_CASE_SET/);
  assert.throws(()=>selectDomainCases([...matrix.slice(0,74),matrix[0]],'complete-75'),/75_UNIQUE/);
  assert.throws(()=>selectDomainCases(matrix.slice(1).concat({id:'other'}),'focal-3'),/FOCAL_CASE_MISSING/);
});
test('actual collector preserves a rejected first case and starts all75 once', async () => {
  const started=[], failed=[];
  await collectDomainCases(matrix, async c=>{started.push(c.id);if(c===matrix[0])throw new Error('fixture transport failure');},async c=>{failed.push(c.id);});
  assert.deepEqual(started,matrix.map(c=>c.id));assert.deepEqual(failed,[matrix[0].id]);
});
test('deadline closes owned context before collector continues; pending action terminates',async()=>{
  const events=[];let rejectOperation;
  await collectDomainCases([1,2],async c=>{
    events.push('start'+c);
    if(c===1)await withOwnedSourceBudget(()=>new Promise((_,reject)=>{rejectOperation=reject;}),5,async()=>{
      events.push('close');rejectOperation(new Error('target closed'));await Promise.resolve();events.push('closed');
    });
  },async c=>events.push('fail'+c));
  assert.deepEqual(events,['start1','close','closed','fail1','start2']);
});
test('ordinary failure propagates without deleting fixture or closing unrelated context',async()=>{
  let closes=0;await assert.rejects(withOwnedSourceBudget(async()=>{throw new Error('VIEWPORT_ASSERTION');},100,async()=>{closes++;}),/VIEWPORT_ASSERTION/);assert.equal(closes,0);
});
test('successful operation clears deadline without closing context',async()=>{
  let closes=0;assert.equal(await withOwnedSourceBudget(async()=>42,5,async()=>{closes++;}),42);await new Promise(resolve=>setTimeout(resolve,10));assert.equal(closes,0);
});
test('failed cancellation stays a material failure',async()=>{
  await assert.rejects(withOwnedSourceBudget(()=>new Promise(()=>{}),5,async()=>{throw new Error('OWNED_CONTEXT_CLOSE_FAILED');}),/DOMAIN_OWNED_CONTEXT_CLOSE_FAILED/);
});

test('a hanging context close is bounded and never promoted to cleanup PASS',async()=>{
 await assert.rejects(withOwnedSourceBudget(()=>new Promise(()=>{}),5,()=>new Promise(()=>{}),5),/DOMAIN_OWNED_CONTEXT_CLOSE_FAILED/);
});

test('pair classification requires two qualified source metadata records, preserving technical failures',()=>{
 const good={comparability:'COMPARABLE'},difference={comparability:'NON_EQUIVALENT'},missing={comparability:'INSUFFICIENT_EVIDENCE'};
 for(const [count,meta]of [[0,[]],[1,[good]],[2,[good]],[2,[good,missing]]]){
  const result=classifyDomainPair(count,[],meta);assert.equal(result.comparability,'INSUFFICIENT_EVIDENCE');
  if(count!==2||meta.length!==2)assert.equal(result.execution,'FAIL');
 }
 assert.deepEqual(classifyDomainPair(2,[],[good,good]),{execution:'PASS',comparability:'COMPARABLE',completeness:'COMPLETE'});
 assert.deepEqual(classifyDomainPair(2,[],[good,difference]),{execution:'PASS',comparability:'NON_EQUIVALENT',completeness:'COMPLETE'});
 assert.deepEqual(classifyDomainPair(2,['NATIVE_ASSERTION'],[good,good]),{execution:'FAIL',comparability:'COMPARABLE',completeness:'PARTIAL'});
});
