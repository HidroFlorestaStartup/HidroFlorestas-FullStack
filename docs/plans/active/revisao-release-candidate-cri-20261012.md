# PLAN-RC-REVIEW-20261012 — Revisão independente da RC CRI

Estado: EM_ANDAMENTO. Início: 2026-10-12. Retomada: 2026-10-13, America/Fortaleza.
Execução: agente. Revisores humanos e operador produtivo: não especificado.

## Objetivo e autorização

FATO_DOCUMENTADO: o pedido do usuário intitulado “Revise e valide a Release
Candidate do HidroFlorestas”, recebido em 2026-10-12, autoriza revisão técnica,
testes locais isolados, ajustes de ambiente e dependências estritamente
necessários, publicação de relatório no repositório, registro do achado no PR #4
e parecer consolidado no PR #6. Autoriza REQUEST_CHANGES quando houver correção
material comprovada. As mensagens de retomada de 2026-10-12 e 2026-10-13 mantêm
esse mandato depois das interrupções por desligamento e limite de uso.

Resultado esperado: confirmar, refutar ou delimitar as conclusões anteriores,
identificar SHAs e ambientes efetivamente examinados, registrar evidências e
instruções de correção revisáveis e publicar links reais dos registros.

## Escopo e limites

- Revisar a pilha #1→#6 de HidroFlorestaStartup/HidroFlorestas-FullStack, as specs
  014–016, contratos, runners, migrations e pacote operacional da RC.
- Reproduzir a falha de recarga usando o componente real e navegador, separando
  interceptação de rede de jornada com backend/PostgreSQL reais.
- Auditar dependências e validar a menor atualização justificável em commit
  próprio, preservando package-lock.json.
- Executar regressão pertinente em PostgreSQL local próprio e conferir o banco
  efetivamente usado pelo servidor, guards e teardown.
- Produzir este plano, relatório datado e evidências redigidas em docs/reports/audits/.

Fora de escopo: alteração funcional de UI/domínio, merge, deploy, promoção para
main, migrations/seed/bootstrap em banco hospedado, alterações de provedores e
homologação humana, científica ou operacional. Não usar audit fix --force nem
atualizações globais. docs/raw/** e registros canônicos não serão editados.

## Fontes, autoridade e classificações

Solicitação do usuário e AGENTS.md governam a execução. PLANS.md determina a
estrutura deste plano. Constituição, SOURCE_AUTHORITY.md e source-policy.md
governam classificação e alcance. PROJECT_CONTEXT.md e TECH_DECISIONS.md são
contexto; specs/014-account-test-runners/, specs/015-environmental-drafts/ e
specs/016-area-covers/ registram o recorte. docs/releases/2026-10-10-cri-rc/
registra a publicação e a sequência de integração. Código/lockfile/SQL/testes e
comportamento observado são EVIDENCIA_IMPLEMENTACAO no alcance comprovado.
Advisories oficiais atuais fundamentam risco de pacote, sem provar exploração.

O relatório anterior e resultados desta sessão antes da interrupção conservam
suas datas e limites. Resultados de logs perdidos não serão apresentados como
novas execuções com artefatos recuperados. Toda INFERENCIA e RECOMENDACAO recebe
classificação explícita; decisão de produto não será inventada para corrigir UI.

## Estado inicial, recuperação e preservação

EVIDENCIA_IMPLEMENTACAO na retomada de 2026-10-13: checkout principal permanece
em development/beba96f; worktree isolado persistente em
.accounts-validation/rc-review, branch review/cri-rc-validation-20261012,
HEAD 99d8363fba4d13a8a02937be1ff2e606d35b3fa6, inicialmente limpo. Esse commit
altera somente package.json e package-lock.json. Seu pai é o candidato original
ca80376e6e0f60aac9b94ec598e8e4a7c937d17c. A identidade do head remoto deve ser
reconferida antes da publicação. development do fork não equivale à do upstream
PedroVitor237/HidroFlorestas.

FATO_DOCUMENTADO no histórico da execução: o worktree anterior, logs, screenshots
e rascunhos não commitados estavam em /tmp e não sobreviveram ao desligamento.
O commit de dependências sobreviveu em Git. O worktree foi reconstruído em
diretório persistente; runtime e logs novos ficam em
.accounts-validation/rc-runtime, fora do versionamento. Este plano e o relatório
serão preservados em checkpoint Git antes de novas verificações prolongadas.
Alterações preexistentes do checkout principal permanecem fora desta entrega.

## Etapas, responsáveis e critérios

| Etapa | Estado | Critério de conclusão |
|---|---|---|
| Identificar candidato, autenticação, refs e pilha | EM_ANDAMENTO | SHAs/bases remotos recentes registrados; checkout principal preservado |
| Reconstituir plano e relatório duráveis | EM_ANDAMENTO | Documentos em Git, sem dados sensíveis ou alegações de logs recuperados |
| Reproduzir recarga de capa | EM_ANDAMENTO | Componente real, 503→200 com revisão fixa, contagem de requests e evidência persistente |
| Auditar dependências e verificar patch focal | EM_ANDAMENTO | Audit original/patch/prod, explain/ls e advisories vinculados; commit separado |
| Regressão PostgreSQL, contratos e E2E | EM_ANDAMENTO | Resultado por comando, SHA, banco real do servidor e teardown; nenhum teste não executado como PASS |
| Revisar escopo, links e segurança documental | NAO_INICIADO | Diff e links válidos; ciência e docs/raw preservados |
| Publicar relatório e registros PR #4/#6 | NAO_INICIADO | URLs verificadas e ausência de duplicatas; REQUEST_CHANGES fundamentado |
| Encerrar revisão | NAO_INICIADO | Parecer, pendências e verificações não realizadas registrados |

Execução das etapas: agente. Correção funcional futura e homologações: equipe,
responsável individual não especificado. Trabalho pesado será sequencial, com
limite de memória e logs persistentes; leitura documental pode ser paralela.

## Verificações previstas e evidências

Comandos pertinentes: npm ci; prisma generate; npm run test:unit; npm run
typecheck; npm run lint; npm run build; npm audit --json; npm audit --omit=dev
--json; npm ls/npm explain; runners imp006-test-runner.ts integration, migration
e contract; Playwright com um worker e destinos locais verificados. Bootstrap
somente no cluster próprio e nos termos do guard. Identificar adapters/env do
servidor e conferir schemas/fixtures antes/depois. Evidência final em
[relatório datado](../../reports/audits/2026-10-13-revisao-release-candidate-cri.md).

A matriz final distinguirá resultados novos com logs persistidos, resultados
históricos desta sessão com artefatos perdidos e gates não executados. Os testes
históricos da publicação de 2026-10-10 não serão recontados como testes atuais.

## Riscos, desvios e pontos de parada

FATO_DOCUMENTADO: interrupção por desligamento em 2026-10-12, associada pelo
usuário a possível excesso de RAM; interrupção posterior por limite de uso em
2026-10-13. INFERENCIA: consumo simultâneo de Next/build/browser/PostgreSQL pode
agravar pressão de memória; a causa exata do desligamento não foi comprovada.
RECOMENDACAO operacional aplicada: executar cargas pesadas uma de cada vez,
usar um worker e manter artefatos fora de /tmp quando possível.

E2E anterior foi interrompida antes do fim; falhas iniciais exigem investigação
do tempo de compilação e configuração. Não é PASS e não prova defeito funcional
por si só. Build webpack apresentou erro TypeScript preexistente na variante
experimentada; build padrão Turbopack passou na sessão anterior. Separar essa
variante do gate de build padrão, sem ocultar o resultado.

Pontos de revisão humana futuros: correção funcional, homologações de contas,
operação de Cloudinary/mail, validação científica e decisão de integração. Nenhum
deles impede a revisão local/publicação já autorizadas. Credencial privada só
será solicitada se indispensável; partes independentes continuam. Conflito
normativo material sem autoridade suficiente vira PENDENCIA_DE_DECISAO.

## Histórico e encerramento

- 2026-10-12 — EM_ANDAMENTO: candidato ca80376 examinado; falha de recarga
  reproduzida; auditoria original e patch focal executados; regressão local
  parcial/automatizada registrada na sessão. Commit de dependências 99d8363.
- 2026-10-12 — interrupção por desligamento; artefatos temporários perderam-se.
- 2026-10-13 — EM_ANDAMENTO: worktree persistente reconstituído; npm ci retomado
  com limite de heap; documentos reconstruídos; novo checkpoint e verificações
  com logs persistentes em preparação. Interrupção por quota não encerra tarefa.
- Encerramento: pendente de evidências finais e publicação. Plano permanece no
  diretório ativo até revisão humana; não arquivar planos anteriores.
