# Excertos sanitizados da QA

Logs completos permanecem privados/ignorados, sem inclusão forçada no Git. As linhas abaixo conservam somente evidência necessária; caminhos pessoais, credenciais, cookies e parâmetros foram omitidos. Resultados detalhados serão consolidados em JSON com duração/exit/contagens.

## Setup e baseline

- npm ci: `added 553 packages in 2m`; exit0. npm12 bloqueou lifecycle scripts de6pacotes; nenhuma aprovação global de scripts foi adicionada.
- Prisma restrito: erro de request do engine público pinado; retry de rede gerou client7.4.2. Não houve banco remoto.
- Build restrito: `Failed to fetch Poppins from Google Fonts`; retry autorizado de rede completou build.
- Token Windows restrito: `ERR_SYSTEM_ERROR`, `uv_os_get_passwd`, `ENOMEM`, antes de iniciar tsx/testes. Não é prova de falta de memória física nem falha do produto.
- Lint: `0 errors, 2 warnings`, preexistentes em `user-profile/useAuth` e `white-box/className`.

## E2E2 —193PASS/3FAIL/24NOT_RUN

Preparação de áreas:

```text
Invalid tx.user.create() invocation
Unique constraint failed on the (not available)
Source: tests/fixtures/areas.ts:40; frontend-areas.spec.ts beforeAll.
```

EVIDENCIA_IMPLEMENTACAO: colisão observada no helper create-only, sem overwrite/upsert. INFERENCIA: resíduo da interrupção anterior de NAV4; não foi identificado um registro individual nesta evidência. Limpeza posterior pelo helper original contou0/0antes/depois, após os teardowns da bateria2; isso não prova que o resíduo jamais existiu.

Atribuição cartográfica:

```text
locator('.leaflet-control-attribution').getByRole('link', {name:'OpenStreetMap'})
Expected: visible
Received: element(s) not found
Timeout:5000ms
Source: tests/e2e/frontend-territorial-map.spec.ts:96
```

Causa de harness confirmada: atribuição sintética sem link substituiu conteúdo esperado. A URL de tiles permanece loopback; a atribuição canônica com nota sintética foi restaurada na sessão, sem alterar source/assertion.

Foco administrativo:

```text
getByRole('alert').filter({hasText:'Seu acesso à administração não está mais disponível. Atualize a página para continuar.'})
Expected: focused
Received: inactive
Timeout:5000ms
Source: tests/e2e/frontend-user-administration.spec.ts:194
```

O alerta existia no DOM, com role=alert/tabindex=-1; foco permanecia fora dele. O mesmo cenário403 passou1/1isolado e falhou1/10repetições seriais posteriores (9PASS,1FAIL;35,7s), sem retries/assertions modificados. EVIDENCIA_IMPLEMENTACAO: comportamento intermitente de foco reproduzido. INFERENCIA: requestAnimationFrame em `user-administration-page.tsx:86` pode correr antes do commit; causalidade ainda inconclusiva. O coordenador recebeu a evidência para entrega separada, sem integrar fix ao baseline QA.

Os testes de integração, contrato e dados não recebem conclusão científica por associação. IHFR permanece CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## E2E3 —218 PASS/2 FAIL

```text
frontend-mobile-navigation.spec.ts:95 (NAV4, viewport375/text200)
Test timeout of 90000ms exceeded.
page.evaluate at settleTransitions:68 -> focusAndExpose:78 -> test:154
```

`EVIDENCIA_IMPLEMENTACAO`: timeout durante sincronização de transições; não foi falha da assertion de tolerância de restauração. Causa inconclusiva; não atribuir a desempenho específico nem apagar o FAIL porque a coorte fresca posterior passou.

```text
frontend-user-administration.spec.ts:72
getByText('Justificativa: Spec027 revisão confirmada')
strict mode violation: resolved to 2 elements (assertion:96)
```

`EVIDENCIA_IMPLEMENTACAO`: probe read-only contou dois eventos distintos persistidos desse fixture. O helper de replay faz upsert/reset de estado, mas preserva auditoria imutável; HARNESS_REUSE_CONFIRMED. Não é prova de duplicação pelo renderer. Não se apagou auditoria para obter PASS; nova coorte usou cluster/DB realmente frescos. Esse caso é distinto do403; o403 passou no E2E3, sem eliminar falhas anteriores.

## Restore e030

```text
Restore attempt1: pg_dump.exe / pg_restore.exe ENOENT, nenhum restore executado.
Restore attempt2: SERVER_BINARY_CHANGED no preflight,0stages.
Independent Get-FileHash: servidor17.10 coincide com hash esperado.
Cause: helper privado calculava SHA de JSON.stringify(Buffer), não dos bytes.
Restore final: pg_dump exit0; pg_restore exit0; CATALOG_CONSTRAINT_MISMATCH.
26 table counts/digests +14 migration checksums +47FKs +17triggers matched.
8 CHECK canonical expressions differed; textual gate FAIL retained.

Readiness attempt1: fixtures FAIL,Next/browser NOT_STARTED,schema REMOVED.
Focal fixture-only reproduction: DriverAdapterError IMP003_OWNER_INVARIANT.
Correction: synthetic laboratory and OWNER membership in one transaction.
Readiness final: PASS,10warmups,100measured,p95=57.8354ms,list=252.1367ms.
Cleanup: serverSTOPPED/browserCLOSED/schemaREMOVED,0errors.
```

Nenhum trecho contém SQL com parâmetros, stack, URL de banco, credencial, cookie ou dados pessoais. Recibos conservam versões/fingerprints, tempos completos e fronteiras de cada ensaio. O restore integral não recebe PASS por igualdade de contagens, e o instrumento030 não recebe os15 gates da baseline.

## PR39 P2 — waiter sem handler após falha de navegação

```text
Equivalent pre-fix sequence: create incoming; await navigation; await incoming.
Strict legacy children: WAITER_FAILURE / FINISHED_FAILURE -> exit1.
Synthetic resource marker remained; final receipt was absent.
RED extracted helper:9tests,4PASS,5FAIL,exit1.
Fixed helper+policy:18tests,18PASS,0FAIL/skip,exit0.
Six protected failures: causal error retained; own marker removed; FAIL receipt written.
Independent strict rerun:18/18PASS.
Single real post-P2 run:PASS,p95=54.9855ms,list=213.3963ms.
Cleanup:STOPPED/CLOSED/REMOVED,0errors;owned PostgreSQL stopped.
```

O processo strict foi deliberadamente isolado: a contraprova não usa browser/servidor/DB, não instala listener global de rejeições e não afirma cleanup SQL real em falha. O novo ensaio030 tem fingerprint46a9... próprio; o8313 e todos FAILs anteriores permanecem na trilha. A navegação e a resposta agora são observadas imediatamente antes de executar callbacks, incluindo throws síncronos e rejeição de finished().
