# Plano — investigação e estabilização das falhas intermitentes

Identificador: HF-INV-20261023-01. Data: 23/10/2026, America/Fortaleza.
Estado da execução: **NAO_INICIADO**. Preparação documental: concluída, aguardando revisão/publicação. Executor: outro desenvolvedor, a designar pelo mantenedor.

## Objetivo e autoridade

`DECISAO_CONFIRMADA`: Pedro, nesta conversa em 23/10/2026, concordou com a integração dos relatórios mantendo as investigações abertas e o piloto bloqueado e pediu uma etapa executável de investigação e resolução das falhas intermitentes por outro desenvolvedor. Implementar correções demonstradas, validar, commitar, fazer push e abrir/atualizar PRs para development estão autorizados sem confirmação adicional de rotina. Futuros merges e aceites ficam com o mantenedor.

A autorização não declara as falhas resolvidas nem dispensa a revisão final pendente do #27. A decisão sobre integrar os registros está tomada nesse alcance; não concede aceitação operacional dos riscos de contas, banco ou recuperação. A implementação visual das fases 1–10 já foi integrada; esta é uma etapa posterior de estabilização, sem criar uma fase visual 11.

Resultado esperado: inventário reconciliado, experimentos reproduzíveis e evidências por incidente; correções mínimas e regressões quando houver defeito demonstrado; causas ainda insuficientes classificadas explicitamente, com próximo experimento concreto.

## Estado inicial e fontes

`EVIDENCIA_IMPLEMENTACAO`: #26 integrado em development por `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`, head documental `f85077a6f0c229ea08fd4ce85c80a92c67c48093`, sem autoaprovação. Main observada em `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`; não foi promovida. Máquina local de Pedro não sincronizada nesta preparação.

#27 permanece aberto em `223839c9ae91591ded8de387144d8c1ee84b5c20`, revisão externa final ainda `running` na consulta desta preparação; não há conclusão utilizável. Seu candidato `131ade347258c7820c7a89989ab851769197b486` conserva os 15 gates PASS do run 39699435699/tentativa 1. CI funcional do fechamento documental: NOT_RUN. Nada disso é resultado desta nova investigação.

Fontes: [AGENTS](../../../../AGENTS.md), [PLANS](../../../../PLANS.md), [contexto](../../../../PROJECT_CONTEXT.md), [decisões técnicas](../../../../TECH_DECISIONS.md), [registro INV/OBS](../preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md), [triagem da RC](../../../releases/2026-10-21-frontend-rc/triagem-historicos.md), [relatório da missão](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/final-report.md), [históricos recuperados](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/evidence/backend-historical.json), [recibo NAV4](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/evidence/frontend-nav4/nav4-result.json) e [revisão independente](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/independent-review.md).

Os links imutáveis da missão funcionam antes do merge do #27. Não importar a branch inteira para executar a investigação. Confirmar o estado remoto real e usar development atual; recuperar evidências necessárias por arquivo/commit com conferência de identidade e proveniência. Falta de merge documental não impede os experimentos independentes sobre o produto.

## Escopo e prioridade recomendada

As prioridades abaixo são `RECOMENDACAO`; defeito material atual pode alterar a ordem com justificativa.

| Item | Resultado herdado e trabalho executável |
|---|---|
| NAV4-LOCAL | Quatro FAILs no logout, 0 PASS, em b1f83cf/Linux/IMP006. Contraprovas posteriores sustentam incompatibilidade de ingresso 127.0.0.1/localhost. Verificar a configuração pretendida, reproduzir com sessão sintética e testar a correção do ambiente/harness se demonstrada. Não atribuir os códigos das sondas aos quatro casos originais. |
| INV-001 | IHFR: run 39300023357, tentativa 1 FAIL e 2 PASS no mesmo head. Instrumentar inicialização, sessão, navegação, readiness e isolamento; comparar condições com o runner atual sem reescrever o histórico. |
| INV-002 | Concorrência histórica de duas chamadas. Reproduzir o schedule específico, distinguir Spec022 de quatro operações/três ondas e preservar quota, idempotência, OCC e rollback. |
| INV-003 / NAV-SETTLE | Navegação/reset de mapa e 375 px/texto 200%/settleTransitions. Recuperar cenário original, observar URL, resposta, console sanitizado e estado de interação; separar readiness, rede, servidor, sessão e geometria. |
| INV-004 | Incidente de conta/login. Capturar resposta real, tempo e mudança de rota em condições controladas; a espera adicionada ao teste anterior não certifica a causa histórica. |
| INV-005 | 404 de páginas da candidata 85e397bd/run 39465856665. Distinguir de 404 esperado de API; preservar sondas pós-falha somente leitura e cookie jars isolados. |
| OBS-001 / OBS-002 | Contraprova específica de hidratação/caret e limites de máscaras/enquadramento quando relacionados aos incidentes. Separar observação visual de defeito funcional e de aceite humano. |

As observações P3 de fragmentação de palavras em texto 200% ficam identificadas, sem supor obstrução funcional ou iniciar uma reformulação visual ampla. As oito diferenças textuais de CHECK do restore sintético e a recuperação hospedada permanecem em seus registros próprios; não são tratadas como falhas intermitentes automaticamente.

## Etapas, resultados e critérios

1. **NAO_INICIADO — preservar e reconciliar.** Inventariar worktrees, refs, arquivos e serviços; usar worktree isolada e fetch seguro. Construir tabela por ID com fonte, SHA, run/tentativa, sintoma, reproduções anteriores, lacunas e hipótese rotulada. Preservar falhas e evidências existentes.
2. **NAO_INICIADO — desenhar experimentos.** Para cada hipótese, registrar variável alterada, controle, fixture, critério de falha e quantidade/schedule de tentativas antes de executar. Evidência expirada/ausente é limitação; não fabricar os bytes nem rodar código histórico indiscriminadamente.
3. **NAO_INICIADO — executar e diagnosticar.** Usar banco sintético próprio e runner pertinente. Separar produto, harness e ambiente. Conservar todos os resultados do protocolo, inclusive primeiro FAIL, sem selecionar apenas verdes ou adicionar retries ao teste.
4. **NAO_INICIADO — corrigir o que foi demonstrado.** Correção mínima por causa; regressão significativa RED/GREEN quando houver patch funcional. Defeito de configuração/harness pode ter correção de setup ou runbook, mantendo segurança e contratos do produto. Usar Spec Kit instalado para recortes funcionais; manter este plano para a investigação transversal.
5. **NAO_INICIADO — validar a candidata e revisar.** Aplicar gates oficiais ao head funcional final e verificação focal proporcional. Mudanças só documentais recebem validação própria. Revisão independente/Codex deve ter recibo do SHA examinado; estado running/null não é aprovação.
6. **NAO_INICIADO — publicar e entregar.** Commits, push e PRs para development por grupos causais coerentes; atualizar o inventário e registrar conclusões/risco por ID. Não fazer merge. O mantenedor decide integração e eventual continuidade do piloto.

Não é obrigatório produzir patch para todo ID. Não encerrar um item como corrigido só porque passou novamente.

## Estados por incidente e prova mínima

- **CAUSA_E_CORRECAO_COMPROVADAS:** reprodução negativa vinculada à causa, mudança correspondente e regressão positiva, com resultado de validação aplicável.
- **CAUSA_DE_AMBIENTE_OU_HARNESS_COMPROVADA:** mecanismo e setup correto demonstrados, incluindo jornada autenticada pertinente; preservar limites da atribuição ao incidente original.
- **NAO_REPRODUZIDO:** protocolo efetivamente executado, tentativas e condições registradas, sem afirmar ausência universal do problema.
- **INCONCLUSIVO:** evidências insuficientes, hipóteses que restam e próximo experimento descritos.
- **BLOQUEADO:** dependência material específica, acesso/decisão necessários e partes independentes que ainda podem prosseguir.

Esses estados são desta etapa e não apagam os resultados históricos. Quando a prova alcançar somente uma reprodução nova, registrar esse alcance em vez de inferir a causa retrospectiva.

## Validação, limites e pontos de revisão

Usar Node 24.19.0, lockfile e guias locais da versão instalada de Next; PostgreSQL descartável próprio. Preservar os 15 gates oficiais, controles de loopback/schema, CSRF, autorização, precisão temporal/numérica, idempotência, corpo/chave e continuidade A→B→A. Não reduzir assertions, aumentar timeouts indiscriminadamente ou ocultar falhas com retries. Ampliação de diagnóstico deve ser estreita e sanitizada; não publicar env, tokens, cookies, códigos de conta ou dados reais.

Mudanças do produto exigem testes e CI do SHA funcional efetivo. Antes do primeiro push funcional, incluir somente a branch necessária nos filtros oficiais e desabilitar seu deployment Git, preservando regras anteriores e development:false. Não atribuir PASS a um fechamento documental não executado. Fatos posteriores ao commit podem ser registrados em comentário para evitar commits autorreferentes e revisões invalidadas continuamente.

Pausar somente o recorte que exigir decisão material, conflito de autoridade, acesso externo ou aceite humano; avançar nas partes independentes. Não operar produção, providers, env hospedado, migrations/banco real ou enviar e-mail nesta etapa. G3–G5 e a liberação do piloto seguem bloqueados até provas e autorizações próprias; esta etapa não concede aceite científico, visual ou de acessibilidade.

IHFR: CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. docs/raw/** permanece imutável.

## Preparação, validações e histórico

23/10/2026 — Pedro confirmou a continuação e solicitou a etapa dedicada; #26 integrado sem autoaprovação. Preparados plano, prompt, recibo e adendos navegacionais preservando os textos anteriores. Esta preparação é documental; nenhuma investigação, correção funcional, nova bateria de testes ou homologação operacional foi executada. Validação e publicação efetivas serão registradas na descrição/recibo do PR, com SHA exato, evitando antecipar resultados.


## Atualização vigente — revisão do #27 concluída — 23/10/2026

`EVIDENCIA_IMPLEMENTACAO`: a [nova solicitação manual](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6359591138) foi publicada em23/10/2026 07:13:43UTC (04:13:43 America/Fortaleza), para o mesmo head223839c9ae91591ded8de387144d8c1ee84b5c20. O bot publicou [recibo conclusivo sem achados](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6359630181) às07:16:18UTC; o [resumo oficial](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6329614420) registra completed às07:16:20UTC (04:16:20 America/Fortaleza), has_any_findings:false e has_unresolved_findings:false. A pendência de conclusão dessa revisão final está encerrada; isso não é merge nem aprovação humana ou homologação do piloto.

O histórico anterior de running permanece válido para a hora em que foi observado. Não há recibo de cancelamento ou término individual da execução anterior; a nova solicitação e a atualização do resumo não comprovam seu cancelamento automático. Uma revisão analisa um SHA e entrega seu parecer; não deve ser mantida aguardando o merge como condição de conclusão. Não criar outra solicitação para este mesmo head apenas por haver registros antigos de running.

**Responsabilidades nesta etapa:** a decisão de aceite/integração do #27 e a gestão de sua revisão pertencem ao mantenedor. O próximo desenvolvedor executa as investigações e correções deste prompt e providencia revisão das novas entregas que produzir; não precisa retomar, cancelar ou repetir a revisão concluída do #27. Se encontrar defeito concreto nessa entrega, registra o achado e segue o fluxo de correção autorizado. Confira referências remotas atuais antes de iniciar, sem bloquear experimentos independentes por um estado histórico do bot.

O PASS dos15gates continua exclusivo de131ade3/run39699435699/tentativa1; CI funcional de223839c9 permanece NOT_RUN. Investigações históricas, aceites humanos e G3–G5 continuam com seus estados próprios. Nenhum novo teste funcional, merge, deploy ou mudança operacional foi realizado para este esclarecimento documental.
