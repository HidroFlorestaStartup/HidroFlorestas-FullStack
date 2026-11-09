import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright';
import * as geometry from './domain-geometry.ts';

// Uses the exact browser callback imported by domain.spec.ts, not a copy.
const enabled = process.env.HF_UI044_SYNTHETIC_BROWSER === '1';
const opts = { headless: true, ...(process.env.HF_UI044_SYNTHETIC_CHROMIUM ?
  { executablePath: process.env.HF_UI044_SYNTHETIC_CHROMIUM } : {}) };
const proofDir = process.env.HF_UI044_CONTOUR_PROOF_DIR ? resolve(process.env.HF_UI044_CONTOUR_PROOF_DIR) : null;
const records = [];
function assessment(m) {
  return geometry.assessReadingExposure({ targetTop:m.target.rect.top, targetBottom:m.target.rect.bottom,
    targetLeft:m.target.rect.left,targetRight:m.target.rect.right,readingTop:m.readingTop,
    readingBottom:m.readingBottom,viewportWidth:m.viewport.width,ratio:m.target.ratio,
    centerHit:m.target.hit.unobstructed,edgeHits:m.target.hitPoints.every(p=>p.unobstructed) });
}
function fixture(width,height,scale,{radius='1rem',reference=false,scroll=true}={}) {
  const mobile=width<768&&!reference;
  const header=reference?137:mobile?74:121;
  const rail=mobile?(width===320?133:76.5):0;
  const targetHeight=width===320&&scale===200?458:scale===200?218:120;
  // Same semantic DIV, dashed border, rounded-2xl and p-6 as area-collections.tsx.
  // Geometry/CSS fixture, not the running Next.js application or a production screenshot.
  return `<!doctype html><html><head><style>
    *{box-sizing:border-box}html{font-size:${scale*0.16}px}html,body{margin:0}
    body{font-family:Arial;font-size:1rem;${mobile?'height:100vh;overflow:hidden;display:grid;grid-template-rows:auto minmax(0,1fr)':''}}
    header{position:${mobile?'relative':'sticky'};top:0;height:${header}px;background:white;z-index:20}
    main{${mobile?'height:100%;overflow:auto;':'overflow:visible;'}padding:0 16px;scroll-padding-block:8px ${mobile?140:8}px}
    section{background:#e8efe8}#spacer{height:${scroll?3657.671875:20}px}
    #target{height:${targetHeight}px;border:1px dashed #cbd5e1;border-radius:${radius};padding:1.5rem;background:white;font-size:.875rem;line-height:1.5;overflow-wrap:anywhere}
    #tail{height:1200px}nav{position:fixed;left:0;right:0;bottom:0;height:${rail}px;background:white;z-index:30}
    ${reference?'header{position:fixed;width:100%}main{padding-top:111px}#spacer{height:0}#target{height:168px;border-radius:1rem}':''}
  </style></head><body><header id="application-header">Synthetic header</header>
  <main id="${reference?'conteudo':'application-content'}"><section><div id="spacer"></div>
  <div id="target" role="status" class="rounded-2xl border border-dashed p-6">Esta área ainda não tem coletas confirmadas. Utilize Registrar coleta para iniciar um registro.</div>
  <div id="tail"></div></section></main>${rail?'<nav aria-label="Synthetic bottom rail"></nav>':''}</body></html>`;
}
async function reveal(page) {
  const target=page.locator('#target');
  const initial=await target.evaluate(geometry.measureReadingExposure);
  const owner=geometry.selectReadingScrollOwner(initial.scrollports);
  const plan=geometry.planReadableScroll({targetTop:initial.target.rect.top,targetHeight:initial.target.rect.height,
    readingTop:initial.readingTop,readingBottom:initial.readingBottom,scrollTop:owner.scrollTop,maxScrollTop:owner.maxScrollTop});
  await target.evaluate(geometry.applyReadingScroll,{scrollOwner:owner.scrollOwner,delta:plan.delta});
  const post=await target.evaluate(geometry.measureReadingExposure);
  return {owner,initial,plan,post,visibility:assessment(post)};
}
async function context(width,height,scale,body) {
  const browser=await chromium.launch(opts);
  try{const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    await page.setContent(fixture(width,height,scale));await body(page);
  }finally{await browser.close();}
}
for(const [width,height] of [[320,900],[375,900],[390,844],[667,375],[768,900],[844,390],[1440,900]]) {
 for(const scale of [100,200]) {
  test(`rounded DIV: ${width}x${height} actual text ${scale}%`,{skip:!enabled},async()=>{
   await context(width,height,scale,async page=>{
    const r=await reveal(page);
    assert.equal(r.post.rootFontPx,scale*0.16);
    assert.equal(r.owner.scrollOwner,width<768?'content':'document');
    assert.equal(r.post.target.ratio,1);
    assert.equal(r.post.target.hit.unobstructed,true);
    assert.equal(r.visibility.fullyExposed,true,'painted rounded target is not an occlusion');
    assert.equal(r.post.target.hitPoints.length,5);
    const other=await page.evaluate(()=>({document:scrollY,content:document.getElementById('application-content').scrollTop}));
    assert.equal(r.owner.scrollOwner==='content'?other.document:other.content,0);
    records.push({width,height,scale,...r});
    if(proofDir&&scale===200&&[320,667,844].includes(width)){
      mkdirSync(proofDir,{recursive:true});await page.screenshot({path:join(proofDir,`synthetic-rounded-${width}-${scale}.png`),fullPage:false});
    }
   });
  });
 }
}
// Exact POST-scroll border-box measurements from artifact 13115506528,
// run 41385859316/1 at a290cfc. This is a DOM replay, not a new app run.
for (const [width,height,top,left,w,h,header,rail] of [
  [320,900,250.40625,16,288,458,74,133],
  [667,375,77.671875,16,635,218,74,76.5],
  [844,390,146.671875,224,596,218,121,0],
]) {
 test(`official artifact geometry replay: ${width}x${height}`,{skip:!enabled},async()=>{
  await context(width,height,200,async page=>{
   await page.setContent(`<!doctype html><style>*{box-sizing:border-box}html{font-size:32px}body{margin:0;font-family:Arial}header{position:fixed;top:0;width:100%;height:${header}px;background:white;z-index:20}main,section{position:absolute;inset:0}#target{position:absolute;left:${left}px;top:${top}px;width:${w}px;height:${h}px;border-radius:1rem;border:1px dashed #cbd5e1;padding:1.5rem;font-size:.875rem;background:white}nav{position:fixed;bottom:0;width:100%;height:${rail}px;background:white;z-index:30}</style><header id="application-header"></header><main id="application-content"><section><div id="target" role="status">Esta área ainda não tem coletas confirmadas. Utilize Registrar coleta para iniciar um registro.</div></section></main>${rail?'<nav></nav>':''}`);
   const m=await page.locator('#target').evaluate(geometry.measureReadingExposure);
   assert.equal(m.rootFontPx,32);assert.equal(m.target.rect.top,top);
   assert.equal(m.target.ratio,1);assert.equal(m.target.hit.unobstructed,true);
   assert.equal(assessment(m).fullyExposed,true);
  });
 });
}
for(const radius of ['0px','32px','9999px','50%','80% 10% 30% 20% / 30% 70% 10% 40%']) {
 test(`computed contour: ${radius}`,{skip:!enabled},async()=>{
  await context(844,390,200,async page=>{
   await page.locator('#target').evaluate((node,r)=>node.style.borderRadius=r,radius);
   const r=await reveal(page);assert.equal(r.visibility.fullyExposed,true,radius);
  });
 });
}
for(const index of [0,1,2,3,4]) {
 test(`real overlay over accepted contour probe ${index} remains FAIL`,{skip:!enabled},async()=>{
  await context(844,390,200,async page=>{
   const before=await reveal(page);assert.equal(before.visibility.fullyExposed,true);
   const point=before.post.target.hitPoints[index];
   await page.evaluate(p=>{
    const overlay=document.createElement('aside');overlay.id='actual-overlay';
    Object.assign(overlay.style,{position:'fixed',left:(p.x-4)+'px',top:(p.y-4)+'px',width:'8px',height:'8px',background:'black',zIndex:'1000'});
    document.body.appendChild(overlay);
   },point);
   const m=await page.locator('#target').evaluate(geometry.measureReadingExposure);
   assert.equal(m.target.ratio,1,'IntersectionObserver alone does not catch overlay');
   assert.equal(m.target.hitPoints[index].unobstructed,false);
   assert.equal(assessment(m).fullyExposed,false);
  });
 });
}
test('ancestor is NOT accepted as the target: clipped content still fails',{skip:!enabled},async()=>{
 await context(844,390,200,async page=>{
  await reveal(page);await page.locator('#target').evaluate(node=>node.style.clipPath='inset(0 0 45% 0)');
  const m=await page.locator('#target').evaluate(geometry.measureReadingExposure);
  assert.equal(assessment(m).fullyExposed,false);assert.ok(m.target.hitPoints.some(p=>!p.unobstructed));
 });
});
test('sticky reference overlap is NON_EQUIVALENT even with ratio1 and centre hit',{skip:!enabled},async()=>{
 await context(844,390,200,async page=>{
  await page.setContent(fixture(844,390,200,{reference:true}));
  const m=await page.locator('#target').evaluate(geometry.measureReadingExposure);
  assert.equal(m.target.ratio,1);assert.equal(m.target.hit.unobstructed,true);
  assert.equal(m.target.rect.top,111);assert.equal(m.header.bottom,137);
  const a=assessment(m);assert.equal(a.comparability,'NON_EQUIVALENT');assert.equal(a.fullyExposed,false);
 });
});
test('insufficient scroll range never fabricates exposure',{skip:!enabled},async()=>{
 await context(844,390,200,async page=>{
  await page.addStyleTag({content:'html,body{height:390px;overflow:clip}main{height:269px;overflow:clip}'});
  const r=await reveal(page);assert.equal(r.owner.maxScrollTop,0);assert.equal(r.plan.delta,0);assert.equal(r.visibility.fullyExposed,false);
 });
});
test('non-rectangular unsupported clip is not auto-approved',{skip:!enabled},async()=>{
 await context(844,390,200,async page=>{
  await reveal(page);await page.locator('#target').evaluate(node=>node.style.clipPath='polygon(50% 0%,100% 50%,50% 100%,0% 50%)');
  const m=await page.locator('#target').evaluate(geometry.measureReadingExposure);assert.equal(assessment(m).fullyExposed,false);
 });
});
// Archiving is not counted as a behavioral test.
test.after(()=>{
 if(enabled&&proofDir){
  const source=readFileSync(join(dirname(fileURLToPath(import.meta.url)),'domain-geometry.ts'));
  mkdirSync(proofDir,{recursive:true});writeFileSync(join(proofDir,'rounded-contour-browser.json'),JSON.stringify({
   classification:'SYNTHETIC_GEOMETRY_NOT_FULLSTACK_RUNTIME',sourceSha256:createHash('sha256').update(source).digest('hex'),
   viewportCases:records.length,records,
  },null,2)+'\n',{flag:'wx'});
 }
});
