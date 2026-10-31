"""Validate the exact HF-UI-044-G0 configuration delta, without network or deployment.
Usage: python validate_guards.py BASE_DIR CANDIDATE_DIR
Directories contain vercel.json and rc-review.yml (or .github/workflows/rc-review.yml).
Requires the existing PyYAML parser; no dependency installation is performed.
"""
import copy
import hashlib
import json
import re
import sys
from pathlib import Path
import yaml

FEATURES = ['feat/ajustes-navegacao-conta', 'feat/ajustes-area-coletas-ihfr', 'feat/localizacao-endereco-opcional']
GUARD = 'chore/hf-ui044-ci-preview-guards'
DOC = 'docs/handoff-ajustes-interface-20261030'
SOURCE_BLOBS = {'vercel.json': '4a9441aa7f09dacfe5c2ca544cbac60a2d6ba96f', 'rc-review.yml': '8e5434efb7c399ca929532733e4e89f4f145faa2'}

def require(test, message):
    if not test:
        raise ValueError(message)

def unique_pairs(pairs):
    value = {}
    for key, item in pairs:
        require(key not in value, 'Duplicate key: ' + str(key))
        value[key] = item
    return value

class UniqueYaml(yaml.BaseLoader):
    pass

def mapping(loader, node):
    return unique_pairs([(loader.construct_object(k), loader.construct_object(v)) for k,v in node.value])
UniqueYaml.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, mapping)

def blob(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()

def read(root, name):
    path = root / name
    if not path.exists() and name == 'rc-review.yml':
        path = root / '.github/workflows/rc-review.yml'
    return path.read_bytes()

def terms(expression):
    pieces = re.split(r'\s*\|\|\s*', expression.strip())
    result = []
    for piece in pieces:
        match = re.fullmatch(r"github\.ref_name\s*==\s*'([^']+)'", piece)
        require(match is not None, 'Unexpected job condition syntax: ' + piece)
        result.append(match.group(1))
    return result

def validate(base, candidate):
    original = {name: read(base, name) for name in SOURCE_BLOBS}
    current = {name: read(candidate, name) for name in SOURCE_BLOBS}
    for name in SOURCE_BLOBS:
        require(blob(original[name]) == SOURCE_BLOBS[name], 'Wrong source bytes: ' + name)
        text = current[name].decode('utf-8')
        require(text.endswith('\n'), 'Missing terminal newline: ' + name)
        require(all(line == line.rstrip() for line in text.splitlines()), 'Trailing whitespace: ' + name)
        require(not re.search(r'^(<<<<<<<|=======|>>>>>>>)', text, re.M), 'Conflict marker: ' + name)
    old_v = json.loads(original['vercel.json'], object_pairs_hook=unique_pairs)
    new_v = json.loads(current['vercel.json'], object_pairs_hook=unique_pairs)
    old_guards = old_v['git']['deploymentEnabled']
    new_guards = new_v['git']['deploymentEnabled']
    require(len(old_guards) == 35 and len(new_guards) == 40, 'Unexpected guard count')
    for name, value in old_guards.items():
        require(new_guards.get(name) is value, 'Old guard changed: ' + name)
    for name in [GUARD, *FEATURES, DOC]:
        require(new_guards.get(name) is False, 'Missing false guard: ' + name)
    restored_v = copy.deepcopy(new_v)
    for name in [GUARD, *FEATURES, DOC]:
        restored_v['git']['deploymentEnabled'].pop(name)
    require(restored_v == old_v, 'Vercel change outside allowed additions')
    old_w = yaml.load(original['rc-review.yml'], Loader=UniqueYaml)
    new_w = yaml.load(current['rc-review.yml'], Loader=UniqueYaml)
    old_push, new_push = old_w['on']['push']['branches'], new_w['on']['push']['branches']
    old_if, new_if = terms(old_w['jobs']['validate']['if']), terms(new_w['jobs']['validate']['if'])
    require(len(old_push)==20 and len(set(old_push))==20, 'Unexpected baseline filters')
    require(new_push == old_push + FEATURES, 'Push filter differs from exact additive delta')
    require(new_if == old_if + FEATURES, 'Validate condition differs from exact additive delta')
    require(set(new_push)==set(new_if) and len(new_push)==len(set(new_push)), 'Filter/condition mismatch or duplicate')
    restored_w = copy.deepcopy(new_w)
    restored_w['on']['push']['branches'] = old_push
    restored_w['jobs']['validate']['if'] = old_w['jobs']['validate']['if']
    require(restored_w==old_w, 'Workflow change outside branch filters')
    require(new_w['permissions']=={'contents':'read'}, 'Permissions changed')
    job = new_w['jobs']['validate']
    require(job['runs-on']=='windows-latest' and job['timeout-minutes']=='35', 'Runner or timeout changed')
    require(any(s.get('run')=='./scripts/rc-review-validation.ps1 -InitializeCiCluster' for s in job['steps']), 'Full synthetic runner missing')
    negative=['main','development','feature/automated-setup',GUARD,DOC,'feat/ajustes-navegacao-conta-extra','other/feat/ajustes-area-coletas-ihfr','refs/heads/feat/localizacao-endereco-opcional','feat/localizacao-endereco-opcional/extra','FEAT/ajustes-navegacao-conta']
    tests=[{'ref_name':name,'push_branch_match':name in new_push,'validate_if':name in new_if,'expected':True} for name in new_push]
    tests += [{'ref_name':name,'push_branch_match':name in new_push,'validate_if':name in new_if,'expected':False} for name in negative]
    require(all(t['push_branch_match']==t['validate_if']==t['expected'] for t in tests), 'Branch truth table failure')
    return {'mission':'HF-UI-044-G0','status':'PASS_STATIC_GUARDS','baseline':'9b8595d232842d401ce81bbc92c54dd543aa2829','parser':'PyYAML '+yaml.__version__+' BaseLoader with duplicate-key rejection','configuration_blob_sha':{name:blob(data) for name,data in current.items()},'configuration_sha256':{name:hashlib.sha256(data).hexdigest() for name,data in current.items()},'old_guard_entries_preserved':35,'documentary_guard_reconciled':DOC,'guard_entries_total':40,'workflow_branches_before':20,'workflow_branches_after':23,'non_filter_workflow_structure':'IDENTICAL','truth_table':tests,'truth_table_cases':len(tests),'yaml_parse':'PASS','condition_grammar':'PASS','json':'PASS','whitespace':'PASS','actionlint':'NOT_RUN_NOT_INSTALLED','full_functional_gates':'NOT_RUN_IN_STATIC_VALIDATOR','provider_runtime':'NOT_TESTED_BY_THIS_VALIDATOR','scope':'No external I/O, product execution, provider operations or database operations'}

if __name__ == '__main__':
    if len(sys.argv) != 3:
        raise SystemExit('Usage: python validate_guards.py BASE_DIR CANDIDATE_DIR')
    try:
        print(json.dumps(validate(Path(sys.argv[1]), Path(sys.argv[2])),ensure_ascii=False,indent=2))
    except (ValueError, OSError, KeyError, yaml.YAMLError) as error:
        raise SystemExit('FAIL: ' + str(error))
