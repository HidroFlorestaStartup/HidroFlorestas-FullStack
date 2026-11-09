import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { draftFieldsToForm, formToDraftFields, parseDraftFields, type DraftFields } from '../../src/types/environmental-draft';
import { emptyEnvironmentalForm, formToPayload, prepareSubmission } from '../../src/components/environmental-data/environmental-data-form-state';
import { formatEnvironmentalNumber } from '../../src/components/environmental-data/environmental-presentation';

function validForm() {
  return {...emptyEnvironmentalForm(),
    'water.waterSourceType':'RIVER_STREAM','water.hasSpring':'false','water.waterAvailability':'PERMANENT',
    'soil.soilTexture':'SANDY','soil.infiltrationRateMmPerHour':'0','soil.compactionLevel':'LOW','soil.erosionSigns':'NONE',
    'vegetation.vegetationCoverPercent':'0','vegetation.fragmentationLevel':'LOW','vegetation.landscapeDegradation':'LOW',
  };
}

describe('phase 7: unchanged parser and draft conversions',()=>{
  it('keeps zero and false distinct from optional null',()=>{
    const payload=formToPayload(validForm());
    assert.equal(payload.water.hasSpring,false);
    assert.equal(payload.soil.infiltrationRateMmPerHour,0);
    assert.equal(payload.vegetation.vegetationCoverPercent,0);
    assert.equal(payload.vegetation.hasRiparianApp,null);
    assert.equal(payload.water.wellDepthMeters,null);
  });
  it('preserves absent, explicit empty, boolean and numeric cells without touching them',()=>{
    const fields:DraftFields={
      'water.salinityIndicator':{kind:'absent'},
      'vegetation.hasRiparianApp':{kind:'editing',raw:''},
      'water.hasSpring':{kind:'value',value:false},
      'soil.infiltrationRateMmPerHour':{kind:'value',value:0},
      'terrain.elevationMeters':{kind:'editing',raw:'12.'},
    };
    assert.deepEqual(formToDraftFields(draftFieldsToForm(fields),fields,new Set()),fields);
    assert.ok(!Object.hasOwn(fields,'terrain.slopePercent'));
  });
  it('keeps first-save raw strings and omits untouched missing cells',()=>{
    const form={...emptyEnvironmentalForm(),'water.hasSpring':'false','soil.infiltrationRateMmPerHour':'0','terrain.elevationMeters':'12.'};
    const touched=new Set(['water.hasSpring','soil.infiltrationRateMmPerHour','terrain.elevationMeters']);
    const fields=formToDraftFields(form,{},touched);
    assert.deepEqual(fields,{
      'water.hasSpring':{kind:'editing',raw:'false'},
      'soil.infiltrationRateMmPerHour':{kind:'editing',raw:'0'},
      'terrain.elevationMeters':{kind:'editing',raw:'12.'},
    });
    assert.equal(draftFieldsToForm(fields)['terrain.elevationMeters'],'12.');
  });
  it('distinguishes an explicitly cleared field from an absent one',()=>{
    const baseline:DraftFields={'water.salinityIndicator':{kind:'absent'}};
    const changed=formToDraftFields(draftFieldsToForm(baseline),baseline,new Set(['water.salinityIndicator']));
    assert.deepEqual(changed['water.salinityIndicator'],{kind:'editing',raw:''});
  });
  it('does not introduce null into a typed value draft cell',()=>assert.throws(()=>parseDraftFields({'water.hasSpring':{kind:'value',value:null}})));
  it('retains a partial number in the draft and parses it only for confirmation',()=>{
    const form={...validForm(),'terrain.elevationMeters':'12.'};
    assert.equal(formToPayload(form).terrain.elevationMeters,12);
    assert.deepEqual(formToDraftFields(form,{},new Set(['terrain.elevationMeters']))['terrain.elevationMeters'],{kind:'editing',raw:'12.'});
  });
  it('does not silently discard an inapplicable well depth',()=>{
    const form={...validForm(),'water.wellDepthMeters':'12'};
    assert.throws(()=>formToPayload(form));
    assert.equal(form['water.wellDepthMeters'],'12');
  });
  it('keeps canonical confirmation and key stable for an unchanged payload',()=>{
    const payload=formToPayload(validForm());
    const first=prepareSubmission(payload,null,()=> 'key1');
    assert.equal(prepareSubmission(payload,first,()=> 'must-not-be-used'),first);
  });
  it('preserves a tiny accepted number from input through canonical JSON and presentation',()=>{
    const payload=formToPayload({...validForm(),'soil.infiltrationRateMmPerHour':'0.0000004'});
    const submitted=prepareSubmission(payload,null,()=> 'key');
    assert.equal(JSON.parse(submitted.canonical).soil.infiltrationRateMmPerHour,0.0000004);
    assert.equal(formatEnvironmentalNumber(payload.soil.infiltrationRateMmPerHour),'0.0000004');
  });
  it('continues to reject non-finite, malformed and out-of-range values',()=>{
    for(const value of ['NaN','Infinity','--1','12text','-1']) assert.throws(()=>formToPayload({...validForm(),'soil.infiltrationRateMmPerHour':value}));
    assert.throws(()=>formToPayload({...validForm(),'vegetation.vegetationCoverPercent':'101'}));
  });
});
