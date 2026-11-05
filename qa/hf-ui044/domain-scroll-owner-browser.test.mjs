import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { createHash } from 'node:crypto';
import { chromium, expect } from '@playwright/test';
import * as geometry from './domain-geometry.ts';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, 'domain.spec.ts'), 'utf8');
const start = source.indexOf('async function semanticCoreExposure(');
const end = source.indexOf('\nfor(const c of cases)', start);
assert.ok(start >= 0 && end > start);
const body = ts.transpileModule(source.slice(start, end), {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
// Execute the actual comparator routine, with the same geometry exports it imports.
const names = ['expect','waitForMissionRender', ...Object.keys(geometry)];
const semanticCoreExposure = new Function(...names, body + '\nreturn semanticCoreExposure;')(
  expect, async () => { await new Promise(requestAnimationFrame); await new Promise(requestAnimationFrame); }, ...Object.values(geometry));
const enabled = process.env.HF_UI044_SYNTHETIC_BROWSER === '1';
const browserOptions = {headless:true,...(process.env.HF_UI044_SYNTHETIC_CHROMIUM ? {executablePath:process.env.HF_UI044_SYNTHETIC_CHROMIUM} : {})};
const archive = process.env.HF_UI044_SCROLL_PROOF_DIR ? resolve(process.env.HF_UI044_SCROLL_PROOF_DIR) : null;
function documentHtml(width, height, scale, reference = false, oversized = false, shortRange = false) {
  const mobile = width < 768;
  const header = reference ? 137 : mobile ? 74 : 121;
  const rail = mobile && !reference ? 76.5 : 0;
  return `<!doctype html><style>*{box-sizing:border-box}html,body{margin:0}html{font-size:${scale*0.16}px}body{font-family:Arial;font-size:1rem}header{position:${mobile&&!reference?'relative':'sticky'};top:0;height:${header}px;background:white;z-index:20}body{${mobile&&!reference?'height:100vh;overflow:hidden;display:grid;grid-template-rows:auto minmax(0,1fr)':''}}main{${mobile&&!reference?'height:100%;overflow:auto;':'overflow:visible;'}padding:0 8px}#spacer{height:${reference?Math.max(0,111-header):shortRange?60:3657.671875}px}#target{margin:0;height:${oversized?height+80:reference?168:scale===200?218:80}px;background:#dfeddf}#tail{height:${shortRange?0:1200}px}nav{position:fixed;left:0;right:0;bottom:0;height:${rail}px;background:white;z-index:30}button{display:block;margin-top:16px}${reference?'header{position:fixed;width:100%}main{padding-top:111px}':''}</style><header id="application-header">Synthetic header</header><main id="${reference?'conteudo':'application-content'}"><div id="spacer"></div><p id="target">${reference?'Nenhuma coleta confirmada':'Esta área ainda não tem coletas confirmadas.'}</p><div id="tail"></div><button id="last">Last control</button><div style="height:150px"></div></main>${rail?'<nav aria-label="Synthetic bottom rail"></nav>':''}`;
}
async function collect(page, sourceName='fullstack') {
  const comparison = {comparability:'COMPARABLE',reasons:[]};
  const c = {id:'synthetic-scroll-owner',fixture:{}};
  await semanticCoreExposure({page,source:sourceName,code:{sha:'SYNTHETIC_NOT_PRODUCT_ACCEPTANCE'}},c,'area-empty',comparison);
  return {comparison,observation:c.fixture.semanticScrollBySource[sourceName]};
}

test('real comparator: DOM scroll owner and readable target across seven widths and text scales',{skip:!enabled},async()=>{
 const browser = await chromium.launch(browserOptions);
 const records = [];
 try {
  for(const [width,height] of [[844,390],[320,900],[375,900],[390,844],[667,375],[768,900],[1440,900]]) {
   for(const scale of [100,200]) {
    const page=await browser.newPage({viewport:{width,height}});
    await page.setContent(documentHtml(width,height,scale));
    const {observation}=await collect(page);
    const expected=width<768?'content':'document';
    assert.equal(observation.scrollOwner,expected,`${width}/${scale} scroll owner`);
    assert.equal(observation.post.rootFontPx,scale*0.16,`${width}/${scale} measured text scale`);
    assert.equal(await page.locator('#target').evaluate(node=>parseFloat(getComputedStyle(node).fontSize)),scale*0.16,'target inherits the actual enlarged root font');
    assert.equal(observation.post.target.ratio,1);
    assert.equal(observation.post.target.hit.unobstructed,true);
    assert.ok(observation.post.target.rect.top>=observation.post.readingTop-0.001);
    assert.ok(observation.post.target.rect.bottom<=observation.post.readingBottom+0.001);
    const scrolling=await page.evaluate(()=>({content:document.getElementById('application-content').scrollTop,document:scrollY}));
    assert.equal(expected==='content'?scrolling.document:scrolling.content,0,'unselected scroll owner must not move');
    let frame=null;
    if(archive&&scale===200&&[667,844,1440].includes(width)){
     mkdirSync(archive,{recursive:true});const filename='fullstack-'+width+'-'+height+'-'+scale+'.png';
     const png=await page.screenshot({fullPage:false});
     writeFileSync(join(archive,filename),png,{flag:'wx'});
     frame={filename,sha256:createHash('sha256').update(png).digest('hex'),width:png.readUInt32BE(16),height:png.readUInt32BE(20)};
    }
    records.push({width,height,scale,observation,frame});
    await page.close();
   }
  }
  if(archive){mkdirSync(archive,{recursive:true});writeFileSync(join(archive,'chromium-scroll-owner.json'),JSON.stringify({kind:'SYNTHETIC_NOT_PRODUCT_ACCEPTANCE',sourceHashes:{comparator:createHash('sha256').update(source).digest('hex'),geometry:createHash('sha256').update(readFileSync(join(here,'domain-geometry.ts'))).digest('hex')},records},null,2)+'\n',{flag:'wx'});}
 }finally{await browser.close();}
});

test('real comparator: ratio1 and centerHit do not hide 26px reference sticky-header occlusion',{skip:!enabled},async()=>{
 const browser=await chromium.launch(browserOptions);
 try{
  const page=await browser.newPage({viewport:{width:844,height:390}});
  await page.setContent(documentHtml(844,390,200,true));
  const {comparison,observation}=await collect(page,'starter');
  assert.equal(observation.post.target.ratio,1);
  assert.equal(observation.post.target.hit.unobstructed,true);
  assert.equal(observation.post.target.rect.top,111);
  assert.equal(observation.post.header.bottom,137);
  assert.equal(comparison.comparability,'NON_EQUIVALENT');
  assert.ok(comparison.reasons.includes('REFERENCE_READING_BAND_OCCLUSION'));
  if(archive){mkdirSync(archive,{recursive:true});writeFileSync(join(archive,'chromium-reference-occlusion.json'),JSON.stringify({kind:'SYNTHETIC_NOT_PRODUCT_ACCEPTANCE',comparison,observation},null,2)+'\n',{flag:'wx'});await page.screenshot({path:join(archive,'reference-844-390-200.png'),fullPage:false});}
 }finally{await browser.close();}
});

test('real comparator: insufficient document range keeps FAIL and records the measured clamp',{skip:!enabled},async()=>{
 const browser=await chromium.launch(browserOptions);
 try{
  const page=await browser.newPage({viewport:{width:844,height:390}});
  await page.setContent(documentHtml(844,390,200));
  // A viewport-bound document cannot scroll the visual transform into view.
  await page.addStyleTag({content:'html,body{height:390px;overflow:clip}main{height:269px;overflow:clip}#target{transform:translateY(1000px)}'});
  const comparison={comparability:'COMPARABLE',reasons:[]},c={id:'range-negative',fixture:{}};
  await assert.rejects(()=>semanticCoreExposure({page,source:'fullstack',code:{sha:'SYNTHETIC_NOT_PRODUCT_ACCEPTANCE'}},c,'area-empty',comparison));
  const observation=c.fixture.semanticScrollBySource.fullstack;
  assert.equal(observation.scrollOwner,'document');
  assert.equal(observation.documentMaxScrollTop,0);
  assert.equal(observation.scrollPlan.delta,0);
  assert.equal(observation.scrollPlan.clamped,true);
  assert.equal(observation.appliedDelta,0);
  assert.equal(observation.visibility.fullyExposed,false);
  assert.equal(observation.post.target.ratio,0);
 }finally{await browser.close();}
});

test('real DOM selection follows computed overflow instead of viewport breakpoint',{skip:!enabled},async()=>{
 const browser=await chromium.launch(browserOptions);
 try{
  for(const [width,height,overflow,expected] of [[844,390,'auto','content'],[667,375,'visible','document']]){
   const page=await browser.newPage({viewport:{width,height}});
   await page.setContent(documentHtml(width,height,100));
   await page.addStyleTag({content:`body{height:auto;overflow:visible;display:block}main{height:${height-121}px;overflow:${overflow}}header{height:121px;position:sticky;top:0}nav{display:none}`});
   const measured=await page.locator('#target').evaluate(geometry.measureReadingExposure);
   assert.equal(geometry.selectReadingScrollOwner(measured.scrollports).scrollOwner,expected);
   await page.close();
  }
 }finally{await browser.close();}
});

test('real browser: selected owner reveals focused last control above the fixed bottom rail',{skip:!enabled},async()=>{
 const browser=await chromium.launch(browserOptions);
 try{
  for(const [width,height] of [[667,375],[844,390]]){
   const page=await browser.newPage({viewport:{width,height}});
   await page.setContent(documentHtml(width,height,200));
   const last=page.locator('#last');await last.evaluate(node=>node.focus({preventScroll:true}));
   const initial=await last.evaluate(geometry.measureReadingExposure);
   const owner=geometry.selectReadingScrollOwner(initial.scrollports);
   const plan=geometry.planReadableScroll({targetTop:initial.target.rect.top,targetHeight:initial.target.rect.height,
    readingTop:initial.readingTop,readingBottom:initial.readingBottom,scrollTop:owner.scrollTop,maxScrollTop:owner.maxScrollTop});
   await last.evaluate(geometry.applyReadingScroll,{scrollOwner:owner.scrollOwner,delta:plan.delta});
   const post=await last.evaluate(geometry.measureReadingExposure);
   assert.equal(post.target.ratio,1);assert.equal(post.target.hit.unobstructed,true);
   assert.ok(post.target.rect.top>=post.readingTop-0.001);assert.ok(post.target.rect.bottom<=post.readingBottom+0.001);
   assert.equal(await last.evaluate(node=>document.activeElement===node),true);
   await page.close();
  }
 }finally{await browser.close();}
});

test('real comparator: oversized message records partial reading without claiming full exposure',{skip:!enabled},async()=>{
 const browser=await chromium.launch(browserOptions);
 try{
  const page=await browser.newPage({viewport:{width:844,height:390}});
  await page.setContent(documentHtml(844,390,200,false,true));
  const {observation}=await collect(page);
  assert.equal(observation.ratio1Applicable,false);
  assert.equal(observation.visibility.fullyExposed,false);
  assert.ok(observation.post.target.ratio>0&&observation.post.target.ratio<1);
  assert.match(observation.readingLimit,/TARGET_BOX_TALLER_THAN_READING_BAND/);
 }finally{await browser.close();}
});
