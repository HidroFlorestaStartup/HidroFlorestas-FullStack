import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatEnvironmentalNumber, focusEnvironmentalTarget } from '../../src/components/environmental-data/environmental-presentation';
import { keepEnvironmentalUncertainty } from '../../src/components/environmental-data/environmental-outcome';

describe('phase 7: numeric presentation without silent rounding', () => {
  const cases: [number, string][] = [[0,'0'],[-0,'0'],[0.0000004,'0.0000004'],[-0.0000004,'-0.0000004'],[12.123456789,'12.123456789'],[100,'100'],[-25.5,'-25.5'],[1e21,'1000000000000000000000']];
  for(const [value, expected] of cases) it(`renders ${value} exactly`, () => assert.equal(formatEnvironmentalNumber(value),expected));
  it('round-trips very small and very large finite values without false zero',()=>{
    for(const value of [Number.MIN_VALUE,Number.MAX_VALUE,-Number.MIN_VALUE,-Number.MAX_VALUE,Number.EPSILON,0.00000000000000000000001,1.2345678901234568e30]){
      const text=formatEnvironmentalNumber(value);
      assert.equal(Number(text),value);
      assert.notEqual(text,'0');
    }
  });
  it('round-trips a deterministic range of exponents',()=>{
    for(let exponent=-320;exponent<=300;exponent+=5)for(const sign of [-1,1]){
      const value=sign*1.2345678901234567*Math.pow(10,exponent);
      assert.equal(Number(formatEnvironmentalNumber(value)),value);
    }
  });
  it('refuses nonfinite values rather than showing a plausible measurement',()=>{
    for(const value of [NaN,Infinity,-Infinity])assert.throws(()=>formatEnvironmentalNumber(value),/NON_FINITE/);
  });
});

describe('phase 7: expand before focus (DOM protocol unit test, not browser evidence)',()=>{
  it('opens all enclosing details before focus and scroll',()=>{
    const operations:string[]=[];
    function group(name:string,parent:unknown){return {set open(value:boolean){assert.equal(value,true);operations.push(`open:${name}`);},parentElement:{closest:()=>parent}};}
    const outer=group('outer',null),inner=group('inner',outer);
    const target={closest:()=>inner,focus:()=>operations.push('focus'),scrollIntoView:()=>operations.push('scroll')};
    const root={getElementById:(id:string)=>{assert.equal(id,'soil.infiltrationRateMmPerHour');return target;}};
    assert.equal(focusEnvironmentalTarget('soil.infiltrationRateMmPerHour',root as unknown as Pick<Document,'getElementById'>),true);
    assert.deepEqual(operations,['open:inner','open:outer','focus','scroll']);
  });
  it('falls back to the form heading for a form-level error',()=>{
    let focused=false;
    const target={closest:()=>null,focus:()=>{focused=true;},scrollIntoView:()=>{}};
    const root={getElementById:(id:string)=>id==='form-title'?target:null};
    assert.equal(focusEnvironmentalTarget('form',root as unknown as Pick<Document,'getElementById'>),true);
    assert.equal(focused,true);
  });
  it('returns false if there is no target',()=>assert.equal(focusEnvironmentalTarget('missing',{getElementById:()=>null}),false));
});

describe('phase 7: a later failed response does not resolve previous uncertainty',()=>{
  for(const status of [400,401,403,404,409,422,429,500,503])it(`keeps an earlier unknown outcome after ${status}`,()=>assert.equal(keepEnvironmentalUncertainty(true,status),true));
  it('preserves a definitive first rejection',()=>assert.equal(keepEnvironmentalUncertainty(false,409),false));
  it('keeps a first server failure unknown',()=>assert.equal(keepEnvironmentalUncertainty(false,500),true));
});
