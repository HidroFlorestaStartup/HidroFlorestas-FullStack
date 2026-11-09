# Validação isolada

1. Checkout022; `npm ci --no-audit --no-fund`; `npx prisma generate`.
2. Cluster novo IMP00655426 com LOCALAPPDATA próprio; nunca PG55427 da demo.
3. Harness oficial `scripts/imp006-local-postgresql.ps1 -Action Run -Executable node -CommandArguments @('--conditions=react-server','--import=tsx','--test','--test-concurrency=1','tests/integration/area-covers.test.ts')`.
4. Mesmo harness: `-CommandArguments @('--import=tsx','scripts/imp006-local-e2e.ts')` para seis testes IHFR; não alterar workers/retries/timeouts.
5. Windows Actions: `scripts/rc-review-validation.ps1 -InitializeCiCluster`; conferir SHA/snapshot/exit0 dos quinze gates.
6. Evidências sanitizadas RED/GREEN/comparação/pareceres em `evidence/` e `implementation-evidence.md` conforme disponíveis. Sem reprodução, sem alegar resolução.

Reprodutor real: substituir argumentos do passo3 por `@('--conditions=react-server','--import=tsx','--test','tests/integration/area-covers-contention.test.ts')`. BaselineSHA15:2FAIL(INTERNAL_ERROR versusRATE_LIMITED); correção:2PASS com10tentativas/40jobs.

Controles artificiais IHFR, somente em rodada separada: argumentos `@('--import=tsx','scripts/imp006-local-e2e.ts','--initialization-controls')`. Esperado: **exit1, dois RED deliberados sem JavaScript e dois PASS**. Testes em `tests/experiments/`; configuração dedicada `playwright.imp006-controls.config.ts`. Não são gates de aceitação nem devem ser executados antes dos seis cenários oficiais para investigar inicialização fria. Nenhuma asserção original foi reduzida para obter verde.

Traces brutos fora de Git/upload. Sem merge/deploy/operação remota de banco.
