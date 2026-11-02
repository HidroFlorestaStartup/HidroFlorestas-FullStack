import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { planReadableScroll, classifyHorizontalOverflow } from './domain-geometry.ts';

const observedR3 = {
  targetTop: 3703.671875, targetHeight: 218,
  readingTop: 74, readingBottom: 298.5,
  scrollTop: 0, maxScrollTop: 4000,
};

test('R3 red: old scrollIntoView(center) leaves the native target behind the header', () => {
  const oldTop = 49.671875; // R3 screenshot/JSON: 0.888403 ratio
  assert.ok(oldTop < observedR3.readingTop);
  assert.equal(oldTop + observedR3.targetHeight, 267.671875);
});
test('R3 corrective: one planned scroll fits the actual unobscured 224.5px band', () => {
  const plan = planReadableScroll(observedR3);
  assert.equal(plan.delta, 3626.421875);
  assert.equal(plan.desiredTop, 77.25);
  assert.equal(plan.predictedTop, 77.25);
  assert.equal(plan.predictedBottom, 295.25);
  assert.equal(plan.predictedFullExposure, true);
  assert.equal(plan.clamped, false);
});
test('scroll range is binding: do not manufacture full exposure', () => {
  const plan = planReadableScroll({ ...observedR3, maxScrollTop: 2000 });
  assert.equal(plan.clamped, true);
  assert.equal(plan.predictedFullExposure, false);
});
test('too-tall target cannot be labelled fully exposed', () => {
  const plan = planReadableScroll({ ...observedR3, targetHeight: 250 });
  assert.equal(plan.fitsBand, false);
  assert.equal(plan.predictedFullExposure, false);
});
test('invalid geometry fails closed', () => {
  assert.throws(() => planReadableScroll({ ...observedR3, scrollTop: 5000 }), /INVALID_READING_SCROLL_GEOMETRY/);
});
test('320px overflow in starter is NON_EQUIVALENT, not native failure', () => {
  assert.deepEqual(classifyHorizontalOverflow('starter', 334, 320), {
    excessPx: 14, nativeFailure: false, referenceNonEquivalent: true,
  });
});
test('FullStack overflow remains a native failure', () => {
  assert.deepEqual(classifyHorizontalOverflow('fullstack', 334, 320), {
    excessPx: 14, nativeFailure: true, referenceNonEquivalent: false,
  });
});
test('zero overflow stays comparable', () => {
  assert.equal(classifyHorizontalOverflow('starter', 320, 320).referenceNonEquivalent, false);
  assert.equal(classifyHorizontalOverflow('fullstack', 320, 320).nativeFailure, false);
});

const here = dirname(fileURLToPath(import.meta.url));
test('B runtime retains ratio1, immutable fixtures, and separate worker receipts', () => {
  const spec = readFileSync(join(here, 'domain.spec.ts'), 'utf8');
  const fixture = readFileSync(join(here, 'domain-fixtures.ts'), 'utf8');
  assert.match(spec, /toBeInViewport\(\{ratio:1\}\)/);
  assert.match(spec, /DOMAIN_BROWSER_CLEANUP_FAILED/);
  assert.match(spec, /workerInfo\.workerIndex/);
  assert.match(spec, /flag:"wx"/);
  assert.doesNotMatch(spec, /requirement:errors\.length\?"DEFECT_FOUND"/);
  assert.match(fixture, /countAuthFixtureUsers\(process\.env\)/);
  assert.match(fixture, /1440, height: 900/);
  assert.match(fixture, /timeout: 12_000/);
});
test('existing R3 failure receipts are immutable inputs, not reclassified as PASS', () => {
  const spec = readFileSync(join(here, 'domain.spec.ts'), 'utf8');
  assert.match(spec, /execution:"FAIL",comparability:"INSUFFICIENT_EVIDENCE",requirement:"HUMAN_DECISION_PENDING"/);
  assert.match(spec, /requirement:options\.requirement\?\?"HUMAN_DECISION_PENDING"/);
  assert.match(spec, /NATIVE_HORIZONTAL_OVERFLOW/);
  assert.match(spec, /PINNED_REFERENCE_HORIZONTAL_OVERFLOW/);
});

const { selectReadingScrollOwner, assessReadingExposure } = await import('./domain-geometry.ts');
const ports = (overflowY='auto', range=4000) => ({
  content:{exists:true,connected:true,containsTarget:true,overflowY,clientHeight:301,scrollHeight:301+range,scrollTop:0,maxScrollTop:range},
  document:{exists:true,connected:true,clientHeight:390,scrollHeight:5890,scrollTop:0,maxScrollTop:5500,windowScrollY:0,scrollingElementTag:'HTML'},
});
const exposureInput = {targetTop:150,targetBottom:250,targetLeft:8,targetRight:312,readingTop:121,readingBottom:390,viewportWidth:844,
  ratio:1,centerHit:true,edgeHits:true};

test('desktop844 observed: content overflow visible has range0; document range is used',()=>{
 const input=ports('visible',0);
 const owner=selectReadingScrollOwner(input);
 const plan=planReadableScroll({targetTop:3778.671875,targetHeight:218,readingTop:121,readingBottom:390,
   scrollTop:owner.scrollTop,maxScrollTop:owner.maxScrollTop});
 assert.equal(owner.scrollOwner,'document');
 assert.ok(plan.delta>0);assert.equal(plan.predictedFullExposure,true);
 const wrong=planReadableScroll({targetTop:3778.671875,targetHeight:218,readingTop:121,readingBottom:390,
   scrollTop:input.content.scrollTop,maxScrollTop:input.content.maxScrollTop});
 assert.equal(wrong.delta,0);assert.equal(wrong.predictedFullExposure,false);
});
test('mobile own scrollport remains content even when its range is zero',()=>{
 const owner=selectReadingScrollOwner(ports('auto',0));
 assert.equal(owner.scrollOwner,'content');assert.equal(owner.maxScrollTop,0);
 const plan=planReadableScroll({targetTop:1000,targetHeight:100,readingTop:74,readingBottom:298.5,scrollTop:owner.scrollTop,maxScrollTop:owner.maxScrollTop});
 assert.equal(plan.delta,0);assert.equal(plan.clamped,true);assert.equal(plan.predictedFullExposure,false);
});
for(const overflow of ['visible','hidden','clip'])test(`non-owning overflow ${overflow} uses document despite content dimensions`,()=>{
 assert.equal(selectReadingScrollOwner(ports(overflow)).scrollOwner,'document');
});
for(const property of ['exists','connected','containsTarget'])test(`content ${property}=false cannot own target scrolling`,()=>{
 const input=ports();input.content[property]=false;assert.equal(selectReadingScrollOwner(input).scrollOwner,'document');
});
test('document uses window.scrollY and the actual scrollingElement range',()=>{
 const input=ports('visible',0);input.document.windowScrollY=300;input.document.scrollTop=300;
 assert.deepEqual(selectReadingScrollOwner(input),{scrollOwner:'document',scrollTop:300,maxScrollTop:5500,overflowY:'visible'});
 input.document.exists=false;assert.throws(()=>selectReadingScrollOwner(input),/INVALID_SCROLL_OWNER_GEOMETRY/);
});
test('invalid scroll geometry does not manufacture an owner or available range',()=>{
 const input=ports();input.content.maxScrollTop=NaN;
 assert.throws(()=>selectReadingScrollOwner(input),/INVALID_SCROLL_OWNER_GEOMETRY/);
});
test('reference26px header occlusion remains NON_EQUIVALENT with ratio1 and centerHit',()=>{
 const observation=assessReadingExposure({...exposureInput,targetTop:111,targetBottom:279,readingTop:137});
 assert.equal(observation.fitsReadingBand,true);assert.equal(observation.withinReadingBand,false);
 assert.equal(observation.fullyExposed,false);assert.equal(observation.comparability,'NON_EQUIVALENT');
 assert.equal(observation.reason,'REFERENCE_READING_BAND_OCCLUSION');
});
test('unobstructed whole target can be comparable; partial ratio or overlay cannot',()=>{
 assert.equal(assessReadingExposure(exposureInput).fullyExposed,true);
 for(const delta of [{ratio:0.999},{edgeHits:false},{centerHit:false},{targetBottom:400},{targetLeft:-2}]){
  const result=assessReadingExposure({...exposureInput,...delta});assert.equal(result.fullyExposed,false);assert.equal(result.comparability,'NON_EQUIVALENT');
 }
});
test('oversized target remains partial exposure, never whole text legibility',()=>{
 const result=assessReadingExposure({...exposureInput,targetBottom:700});
 assert.equal(result.fitsReadingBand,false);assert.equal(result.fullyExposed,false);assert.equal(result.comparability,'NON_EQUIVALENT');
});
test('unobserved geometry is insufficient evidence',()=>{
 assert.equal(assessReadingExposure({...exposureInput,ratio:NaN}).comparability,'INSUFFICIENT_EVIDENCE');
});
