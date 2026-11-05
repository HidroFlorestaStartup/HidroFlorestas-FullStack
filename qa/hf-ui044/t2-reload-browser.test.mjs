import test from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { observeStarterReloadTerminal } from './t2-reload.ts';
const enabled=process.env.HF_UI044_SYNTHETIC_BROWSER==='1';
const options={headless:true,...(process.env.HF_UI044_SYNTHETIC_CHROMIUM?{executablePath:process.env.HF_UI044_SYNTHETIC_CHROMIUM}:{})};
async function withPage(html,fn){
 const browser=await chromium.launch(options);
 try{const page=await browser.newPage();
  await page.route('http://127.0.0.1:17891/**',route=>route.fulfill({contentType:'text/html; charset=utf-8',body:html}));
  await page.goto('http://127.0.0.1:17891/dashboard/laboratories/synthetic');await fn(page);
 }finally{await browser.close();}
}
const loading='<div role="status">Carregando laboratório…</div>';
const missing='<div role="status"><p>Recurso não encontrado</p></div>';
for(const delay of [35,160])test(`T2state observer awaits eventual404 latency${delay}`,{skip:!enabled},async()=>{
 await withPage(loading,async page=>{
  await page.evaluate(({delay,missing})=>setTimeout(()=>document.body.innerHTML=missing,delay),{delay,missing});
  const result=await observeStarterReloadTerminal(page,1000);
  assert.equal(result.state,'RESOURCE_NOT_FOUND');
  assert.equal(result.transitions[0].state,'INITIAL_LOADING');
  assert.equal(result.transitions.at(-1).state,'RESOURCE_NOT_FOUND');
 });
});
test('T2persistent loading is nonterminal timeout, never404',{skip:!enabled},async()=>{
 await withPage(loading,async page=>{
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.state,'NON_TERMINAL_TIMEOUT');
  assert.equal(r.transitions.length,1);assert.equal(r.transitions[0].state,'INITIAL_LOADING');
  assert.equal(await page.getByText('Recurso não encontrado',{exact:true}).count(),0);
 });
});
test('T2unobserved content has insufficient evidence, never terminal approval',{skip:!enabled},async()=>{
 await withPage('<p>Unknown synthetic state</p>',async page=>{
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.state,'UNOBSERVED');
 });
});
test('T2unexpected error is other terminal, not404',{skip:!enabled},async()=>{
 await withPage('<div role="alert">Não foi possível conectar ao servidor.</div>',async page=>{
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.state,'OTHER_TERMINAL_STATE');
 });
});
test('T2auth redirect is classified independently',{skip:!enabled},async()=>{
 await withPage(loading,async page=>{
  await page.evaluate(()=>history.replaceState(null,'','/login'));
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.state,'AUTH_REDIRECT');
 });
});
test('T2hidden404 does not turn persistent loading into terminal evidence',{skip:!enabled},async()=>{
 await withPage(loading+'<div role="status" style="display:none"><p>Recurso não encontrado</p></div>',async page=>{
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.state,'NON_TERMINAL_TIMEOUT');
 });
});
test('T2font observer records scale before caller reinstrumentation',{skip:!enabled},async()=>{
 await withPage('<html style="font-size:16px"><body>'+missing+'</body></html>',async page=>{
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.transitions[0].rootFontPx,16);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  assert.equal(await page.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).fontSize)),32);
  assert.equal(r.transitions[0].rootFontPx,16);
 });
});
test('T2hidden label in visible status cannot establish404',{skip:!enabled},async()=>{
 await withPage(loading+'<div role="status">Other status<p hidden>Recurso não encontrado</p></div>',async page=>{
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.state,'NON_TERMINAL_TIMEOUT');
 });
});
test('T2loading and404 at once are ambiguous, never approval',{skip:!enabled},async()=>{
 await withPage(loading+missing,async page=>{
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.state,'OTHER_TERMINAL_STATE');
 });
});
test('T2unexpected alert alongside404 cannot approve404',{skip:!enabled},async()=>{
 await withPage(missing+'<div role="alert">Other failure</div>',async page=>{
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.state,'OTHER_TERMINAL_STATE');
 });
});
test('T2workspace redirect cannot approve missing-resource outcome',{skip:!enabled},async()=>{
 await withPage(loading,async page=>{
  await page.evaluate(()=>history.replaceState(null,'','/workspace'));
  const r=await observeStarterReloadTerminal(page,80);assert.equal(r.state,'OTHER_TERMINAL_STATE');
 });
});
test('T2loading disappears without terminal evidence remains unobserved',{skip:!enabled},async()=>{
 await withPage(loading,async page=>{
  await page.evaluate(()=>setTimeout(()=>document.body.innerHTML='<p>Unknown</p>',30));
  const r=await observeStarterReloadTerminal(page,120);assert.equal(r.state,'UNOBSERVED');
  assert.deepEqual(r.transitions.map(t=>t.state),['INITIAL_LOADING','UNOBSERVED']);
 });
});
test('T2invalid or unbounded deadlines are rejected before observation',{skip:!enabled},async()=>{
 await withPage(loading,async page=>{
  for(const timeout of [0,-1,Infinity,17001])await assert.rejects(observeStarterReloadTerminal(page,timeout),/INVALID_REFERENCE_RELOAD_BUDGET/);
 });
});
