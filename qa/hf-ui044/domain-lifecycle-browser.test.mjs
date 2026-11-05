import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { collectDomainCases,withOwnedSourceBudget } from './domain-collection.ts';
test('real Chromium stalled page is closed before next independent collection step',{skip:process.env.HF_UI044_SYNTHETIC_BROWSER!=='1'},async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.HF_UI044_SYNTHETIC_CHROMIUM?{executablePath:process.env.HF_UI044_SYNTHETIC_CHROMIUM}:{})});
 try {
  const stuck=await browser.newContext(),good=await browser.newContext();
  const first=await stuck.newPage(),second=await good.newPage();
  await first.setContent('<p>synthetic first source</p>');await second.setContent('<p id="next">independent next source</p>');
  const events=[];let operationRejected=false;
  await collectDomainCases([1,2],async id=>{
   events.push('start'+id);
   if(id===1)await withOwnedSourceBudget(()=>first.evaluate(()=>new Promise(()=>{})).catch(error=>{operationRejected=true;throw error;}),50,async()=>{events.push('close');await stuck.close();events.push('closed');});
   else {assert.equal(first.isClosed(),true);assert.equal(await second.locator('#next').textContent(),'independent next source');}
  },async id=>events.push('fail'+id));
  assert.deepEqual(events,['start1','close','closed','fail1','start2']);assert.equal(operationRejected,true);
  await good.close();
 }finally{await browser.close();}
});
