# Execução autorizada — investigação e estabilização das intermitências

Execute a etapa HF-INV-20261023-01 no repositório HidroFlorestaStartup/HidroFlorestas-FullStack, até uma entrega verificável para revisão. O objetivo é investigar as falhas intermitentes já registradas, corrigir defeitos demonstrados e deixar conclusões/evidências úteis para cada caso.

## Autorização e resultado esperado

`DECISAO_CONFIRMADA` — Pedro, em 23/10/2026 nesta conversa, aprovou integrar os relatórios mantendo as investigações abertas e o piloto bloqueado e pediu esta etapa para outro desenvolvedor. Você está autorizado a investigar, implementar as correções necessárias, validar, fazer commits e push e abrir/atualizar PRs para **development**, sem confirmação adicional de rotina. Merges e aceites ficam com o mantenedor. Não pare no planejamento ou no primeiro achado: conclua os itens independentes até o limite real das evidências e do acesso.

Não é uma nova fase visual. A implementação das dez fases já foi integrada; o aceite humano de copy, produto, dispositivos e acessibilidade continua separado. Esta autorização não libera piloto, produção, providers ou banco hospedado.

Leia o [plano executável](plano-de-execucao.md), que define fontes, itens, critérios, estados e limites, e o [recibo desta preparação](preparacao-evidencias.json).

## Base e material que já existe

#26 foi integrado em `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. Faça fetch e confira development atual antes de criar a branch de trabalho, sugerida `fix/investigacoes-intermitentes-20261023`; a base pode ter avançado. Preserve main, branches, worktrees, arquivos e processos preexistentes. Use uma worktree isolada quando necessário; não force-push, não resete nem limpe trabalho alheio.

Leia AGENTS.md aplicáveis, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md, constituição, política de fontes e skills Spec Kit efetivamente instaladas. Mantenha PLAN → EXECUTE → REVIEW. Use Spec Kit em correções funcionais e este plano para a investigação transversal.

Reaproveite o [registro INV/OBS](../preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md), a [triagem da RC](../../../releases/2026-10-21-frontend-rc/triagem-historicos.md) e a missão HF-POS-20261021-01:
[relatório](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/final-report.md), [históricos](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/evidence/backend-historical.json), [NAV4](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/evidence/frontend-nav4/nav4-result.json), [frontend](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/frontend-ux.md) e [CI](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/backend-ci.md).

O #27 continua pendente de revisão final na preparação deste prompt. Consulte seu estado atual; use os arquivos imutáveis acima para recuperar provas enquanto estiver aberto, sem importar a branch inteira ou aguardar seu merge para experimentos independentes. O candidato `131ade3` teve 15 gates PASS/run39699435699/tentativa1; o fechamento `223839c9` tem CI funcional NOT_RUN. Esses são resultados anteriores, não testes desta execução. Não simule revisão/aceite nem duplique uma solicitação de revisão remota ainda ativa.

## Trabalho a executar

1. **Reconciliar e preservar.** Inventarie INV-001–005, NAV4-LOCAL, NAV-SETTLE e OBS-001/002, identificando sintoma, fonte, SHA/run/tentativa, resultado anterior e lacunas. Recupere originais/artifacts disponíveis com hashes e sanitização. Se algum artifact expirou, registre o que existe e o que falta; não declare ter recuperado bytes ausentes.
2. **Reproduzir com controles.** Comece pelo logout NAV4 local e pelos incidentes atuais materiais, depois IHFR, concorrência de duas chamadas, navegação/mapa/settleTransitions, conta e 404. Defina hipótese, controle, variável alterada, quantidade/schedule de execuções e critério objetivo antes de rodar. Toda tentativa conta, inclusive FAIL.
3. **NAV4 local.** Preserve os quatro FAILs originais. As sondas posteriores mostraram 403 com Origin127.0.0.1 e 200 com localhost no mesmo contexto; ainda falta a jornada autenticada correspondente. Compare o setup IMP006/3000 e o runner oficial de contas, confirme o contrato de origem confiável e execute o cenário com sessão sintética. Se a causa for setup/harness, corrija esse ponto e sua documentação/regressão, sem afrouxar CSRF ou trocar a origem apenas para obter verde.
4. **IHFR e concorrência.** Diferencie readiness/servidor/sessão/navegação do cálculo. Reproduza o incidente histórico de duas chamadas separadamente de Spec022/quatro operações/três ondas. Preserve quota, OCC, rollback e idempotência. Um novo PASS não explica a tentativa antiga.
5. **Navegação, conta e 404.** Colete somente diagnóstico sanitizado pertinente: ordem temporal, resposta, URL, contexto de sessão sintético e readiness. Preserve a exigência funcional e diferencie 404 de página de lookup esperado da API. Confronte hipóteses de rede, teste e produto sem atribuição causal automática.
6. **Observações auxiliares.** Faça a contraprova A/B específica de hidratação/caret se pertinente; diferencie máscara/indicador Next/enquadramento de obstrução. Mantenha as observações P3 identificadas sem iniciar reformulação visual ampla. Capturas não concedem aceite humano nem comprovam cliques que não ocorreram.
7. **Corrigir causas demonstradas.** Faça alterações mínimas com regressão RED/GREEN significativa e plano/spec aplicáveis. Separe PRs por causas independentes se melhorar a revisão. Não introduza patch especulativo; não remova guards/assertions, aumente timeouts indiscriminadamente ou acrescente retries para esconder falhas. Diagnóstico e correção de ambiente/harness são entregas legítimas quando comprovados.
8. **Concluir por item.** Registre causa/correção comprovadas, causa de ambiente/harness comprovada, NAO_REPRODUZIDO, INCONCLUSIVO ou BLOQUEADO, conforme os critérios do plano. Para pendência, entregue as tentativas reais, os limites e o próximo experimento concreto. Não encerre tudo como resolvido por um novo verde e não apague falhas históricas.

## Validação e publicação

Trabalhe com Node24.19.0/npm/lockfile, guias locais de Next e PostgreSQL descartável próprio. Use runners oficiais e preserve os quinze gates: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap e SchemaAudit. `-InitializeCiCluster` é exclusivo do Actions Windows isolado.

Antes do push de uma candidata funcional, faça somente a inclusão focal da branch nos filtros push/if do workflow existente e bloqueie seu deployment Git, preservando development:false e todas as regras anteriores. Não troque runners, permissões, Actions ou guards para obter resultado. Evidências devem ser estreitas e sanitizadas.

Uma correção funcional exige regressão pertinente e os gates oficiais no SHA funcional final. Registre run/tentativa/head, contagens e limites separadamente. Mudança apenas documental exige diff, escopo, JSON/links/hashes pertinentes e preservação histórica, sem herdar PASS funcional. Solicite revisão da entrega final e trate achados materiais; running/null não é aprovação. Registre recibos posteriores em comentários quando apropriado para não criar commits apenas para registrar o resultado do próprio head.

Entregue commits e push, PRs para development com descrição revisável, matriz por incidente, evidências negativas/positivas e risco remanescente. Atualize o registro INV/OBS por adendos e os registros canônicos afetados, preservando histórico e docs/raw/**. Deixe merge com o mantenedor. Informe testes não executados e limites de inspeção.

## Limites operacionais preservados

O [checklist operacional da missão](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/operational-readiness.md) continua em outra frente: isolamento/recuperação hospedada, contas/SMTP/scheduler, capas on/off e fallback, participantes/suporte/aceites. Não assuma responsáveis nem execute deploy, env/provedores, banco/migrations reais ou e-mail para encerrar esta investigação. O piloto permanece bloqueado até seus gates e decisões próprios.

Preserve CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. Não altere ciência ou contratos por inferência.

Este prompt pode ser usado na branch documental antes de seu merge. Comece pela base real atual e preserve as provas da missão anterior, sem repetir trabalho já concluído apenas para produzir outro recibo.
