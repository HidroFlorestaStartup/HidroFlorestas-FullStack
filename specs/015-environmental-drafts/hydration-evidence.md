# RC-DRAFT-001 — evidências de hidratação, 2026-10-13

EVIDENCIA_IMPLEMENTACAO: worktree C:/projetos/ifma/HidroFlorestas-rc-drafts,
branch review/015-environmental-drafts. Node24.19.0, Prisma7.4.2, Next16.3.6,
Pg17 próprio loopback55427; sem dotenv/SMTP/provedor real ou migrations remotas.
Constituição/skills Spec Kit aplicadas; checklist requirements16/16 PASS,
nenhum item do checklist alterado. Data civil America/Sao_Paulo; registros UTC.

Planejamento d6b13231444970b15b86de5582217a641e2015c0 commitado antes dos testes.
HEAD inicial443d20ee8b70607995320c511c36c73be00f3302; preimages formulário
96537ca9ff3a1decac4b69702db637f682ccd691 e testes
bdd5e1a1281d8d1551348672f1926850db2955c5 conferidos. Main/beba96f e três arquivos
locais não rastreados preservados. Nenhuma branch original reescrita.

## RED, correção e GREEN

Novo teste bloqueia scripts /_next/static por promessa na rota real, exige que
select/inputs/save/reload/revisão estejam disabled no HTML inicial; finally
libera scripts sem sleep. Ao habilitar, seleciona false, preenche0/12., captura
primeiro PUT/resposta200, compara fields completos, revision e GET persistido;
reload deve manter campos/semântica. API/DB reais do cluster sintético, sem mocks.
Dois baselines: criação revision1 e draft com absent/vazio explícito revision2.

RED18:44:38.256→18:44:56.591 UTC:1 FAIL/1 não executado por sequência serial;
Há nascente enabled enquanto JS bloqueado. Fingerprint
dc748addfca65a6b67b8d838387cb9f57278b9cd919990780ef7eda1ecdee92d.
GREEN18:46:12.259→18:46:24.933 UTC:2/2 PASS, mesmos asserts. Fingerprint
a84248047758f83a4bd8b2f4582823f1fe34fde537d48d4349f4e54a4e85b636.

Fix usa useSyncExternalStore com snapshot false no SSR/hidratação e true no
cliente pronto; funções estáveis e controles disabled conservam valores.
Status existente anuncia preparação, sem duplicar regiões live. Conversores,
parser, touched/baseline, API, serviços, schema e dados científicos inalterados.
Guias Next locais/React/Playwright conferidos; nenhuma assertion/timeouts/guard
reduzida. Os três testes originais são preservados integralmente.

## Verificações locais

DraftsAll5/5, Unit289+Mail17, typecheck/lint/build PASS no fingerprint GREEN.
Lint0erros/3avisos anteriores. Repetição com reporterJSON preservou os dois
payloads reais em [registros](hydration-evidence/validation-records.json);
somente fields/revisões publicados, sem cookies, saveKey, tokens ou env.
Logs redigidos, UTC e hashes dos arquivos originais ignorados nesse JSON.

Primeiro E2E geral:66 PASS/1 FAIL em GET /api/admin/users, read ECONNRESET,
18:48:26.657→18:51:05.426 UTC. Endpoint/teste não alterados; causa INCONCLUSIVA.
Repetição intacta do arquivo admin-read2/2 PASS. Nova suíte geral67/67 PASS,
18:52:52.815→18:55:16.927 UTC, mesmo fingerprint, sem apagar o FAIL inicial.
Não aumentar retries/timeouts nem transformar a repetição focal em PASS geral.

O banco existente já tinha14 migrations e foi preservado; esta branch conhece13.
Runner Regression/fixtures próprios usado sem reprovisionamento pela árvore antiga.
Integração/SQL/contas/IHFR e gates cumulativos serão reconferidos na árvore combinada,
com dependências originais99d8363 e checks de CI descritos no
[plano da pilha](rc-stack-plan.md). Testes locais não fecham gates humanos/cloud.
