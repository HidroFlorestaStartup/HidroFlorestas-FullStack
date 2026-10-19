# Integração das fases 2/3 e preparação das fases 4/5

ID: PLAN-FRONT-CONT-20261019. Estado: `EM_ANDAMENTO`.
Data: 19/10/2026, America/Fortaleza. Executor: Pedro com seu Codex.

## Mandato, fontes e resultado

`DECISAO_CONFIRMADA`: pedido anexado por Pedro nesta sessão, “Revisão e
continuação — PRs #10/#11/#12 e fases 4/5”, autoriza inventário/fetch/FF,
rechecagem e integração ordenada dos PRs 10/11/12, retarget do 12, reviews
cabíveis de Pedro, documentação, commit/push e PR documental para development.
A implementação das fases 4/5 pertence ao professor/outro desenvolvedor.
Resultado: fases 2/3 integradas se aptas e novo prompt autossuficiente publicado.

Aplicam-se AGENTS.md, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md,
constituição e políticas Code-First/SOURCE_AUTHORITY. Código/Git/CI constituem
`EVIDENCIA_IMPLEMENTACAO`; parecer remoto é `FATO_DOCUMENTADO`, com limites.
Toda conclusão derivada será `INFERENCIA`; orientações serão `RECOMENDACAO`.

## Estado inicial e preservação

FullStack origin oficial; upstream antigo não usado. Checkout development limpo
em afef5db6ced1a4604a114d842bf85950ac32c69b; main local/remota
beba96fbf6bbaac8771dbb29abea2f9f8f5b0054. Worktree de revisão limpa em a01857b;
refs de duas worktrees temporárias ausentes preservadas. Branches e arquivos
locais anteriores não removidos. Starter em fix/login-http-rede-local/2267250,
com package-lock.json não rastreado preservado; main local/remota cbb954a.
Inventário detalhado temporário: /tmp/hidro-fases45-audit/initial.json;
evidência sanitizada final será incluída neste pacote.
Branch documental isolada: docs/handoff-frontend-fases-4-5.

## Escopo, riscos e pontos de parada

Somente gestão dos três PRs autorizados e documentos deste pacote,
PROJECT_CONTEXT.md e DOCUMENT_REGISTER.md. Sem código novo, docs/raw, promoção
para main, remoção de branches, reset/rebase/force/stash automático ou operação
manual de provedor. Preservar histórico de FAIL sem inventar causa.
Parar apenas a integração afetada se head mudar materialmente, check falhar,
proteção impedir ação, conflito ameaçar conteúdo ou decisão de domínio surgir.
A autorização já concede merges/reviews cabíveis e publicação documental;
não há nova aprovação necessária para essas operações. Novo PR ficará em revisão.

## Etapas e critérios

| Etapa | Estado | Critério |
|---|---|---|
| Inventário e sincronização | CONCLUIDO | Fetch dos dois oficiais, refs/worktrees/status e FF seguros registrados |
| Rechecar e integrar 10 | CONCLUIDO | Oito documentos, checks/regras/head e merge commit conferidos |
| Rechecar e integrar 11 | CONCLUIDO | Contratos e CI exato/15 gates; review assistida de Pedro e merge |
| Retarget/rechecar/integrar 12 | CONCLUIDO | Base development, fase 2 ancestral, diff fase 3, CI exato/regras/review/merge |
| Sincronizar e preparar handoff | CONCLUIDO | Development real, main preservada; prompt completo 4/5 e registros aditivos |
| Validar e publicar documentação | EM_ANDAMENTO | Links/JSON/diff/terminologia/preservação; commit/push/PR e link direto |

Verificações: ancestralidade, merge trees e blobs cumulativos; heads/bases/reviews,
checks/15 gates no SHA dos PRs; políticas efetivas; diff documental final,
referências locais e ausência de segredos. Não repetir suíte por merge só
documental/retarget sem mudança funcional; nenhuma execução local será alegada.

## Histórico e desvios

- 19/10/2026 — EM_ANDAMENTO: mandato e fontes lidos; checkout limpo; heads dos
  três PRs coincidem com parecer remoto, todos abertos e mergeable; merge commit
  permitido, delete_branch_on_merge=false, development protected=false, rulesets
  vazios. Nenhuma review registrada inicialmente. rg ausente: buscas por find/Python.
- Consultas GitHub por subprocesso exigiram execução autorizada fora do sandbox;
  fetch do starter exigiu permissão de escrita fora da workspace, concedida.

Pendências de encerramento: merges, evidência final, handoff e publicação.
Homologações reais e validação científica preservam seus gates separados.

- 19/10/2026 — EM_ANDAMENTO: merges10/1956a3e,11/f0333fd e12/c33bf50
  confirmados nessa ordem; retarget12 para development antes de integrar;
  reviews assistidas de Pedro5566561057/5566567231 nos heads exatos.15 gates
  oficiais PASS em11/12; E2E100/120. Diff165 do12 reconfirmado após retarget.
  Árvores/pais/ancestralidade conferidos; produto/testes/configuração finais
  iguais ao headd555f9e, oito diferenças só documentais. Branches preservadas.
- 19/10/2026 — EM_ANDAMENTO: development original/documental FF para c33bf50;
  mainbeba96f alinhada e preservada. Prompt4/5 completo e registros aditivos
  preparados, com JSON sanitizado. Sem implementação4/5, suíte local nova ou
  aceite visual manual. FAILs históricos sem causa provada preservados.

Pendência preparatória corrente: validação documental e publicação. Sem bloqueio
novo. Revisão do futuro PR documental, merges de implementação e homologações
externas/científicas permanecem com as respectivas autoridades.

- 19/10/2026 — EM_ANDAMENTO: validação documental PASS: escopo9 arquivos,
  seis originais preservados integralmente,94 links locais, JSON/campos,
  whitespace/diff e padrões sensíveis reconhecíveis. Vercel/SUCCESS nos três
  merges; developmentc33bf50/mainbeba96f remotas sem avanço. Publicação pendente.
