# Execução pós-consolidação — investigação/correções e homologação/entrega

Execute as duas próximas etapas do HidroFlorestas: **A — investigar e corrigir defeitos demonstrados**; **B — homologar e preparar a entrega**. O plano visual de dez fases já tem implementação integrada, inclusive landing/consolidação; este roteiro não cria fases visuais11/12 nem manda refazer as fases8–10.

## Autorização, base e leitura inicial

DECISAO_CONFIRMADA: Pedro solicitou nesta conversa de21/10/2026 integrar o20, conferir brevemente os merges recentes e preparar as próximas duas etapas, incluindo correções necessárias. Estão autorizados ao executor investigação técnica, correções comprovadas, testes sintéticos, documentação, commits, push e abertura/atualização dos PRs necessários, sem confirmação adicional de rotina. Concluir as duas etapas até seus resultados concretamente verificáveis. Futuros merges e aceites humanos ficam com o mantenedor.

Repositório: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.
Base development verificada: b1f83cfa8e52dd25c6246c584a576553c5e9e131.
Main remota preservada: beba96fbf6bbaac8771dbb29abea2f9f8f5b0054.

#25 integrou a RC e44711d0407dbde06577bd61890f53457aa0a26a pelo merge5f6266b48d0f9d33571009c0c3981065630bd21e, com árvore exatamente igual à testada072a78eef19eb02487d1c92ee04da8cb9c5bd371. Os heads21–24 são ancestrais dessa candidata e constam merged. #20 documental foi integrado depois pelo mergeb1f83cf, acrescentando somente dez caminhos documentais; produto/testes/configuração permanecem equivalentes à RC validada.

A conferência breve leu logs do run39600889091/tentativa1/job119224780858:15gates únicos PASS/exit0, snapshot f398422d9513479eb66f1686b02a853f49f373a3412c8376169745c7fd732c00, E2E220, Integration231, HTTPS2 e IHFR6. A resposta Codex do próprio head não reportou achados. Isso não é nova auditoria completa de código, execução local ou aceite humano/operacional.

Leia AGENTS.md aplicáveis, PROJECT_CONTEXT.md, PLANS.md, TECH_DECISIONS.md, constituição/skills Spec Kit instaladas e políticas de fontes. No pacote atual, leia [estado](estado-e-decisoes.md), [regressão](regressao-agregada.md), [triagem](triagem-historicos.md), [homologação](homologacao-e-entrega.md) e [guia](guia-do-piloto.md). Consulte também o [registro INV/OBS](../../plans/active/preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md) e o [plano desta continuação](../../plans/active/pos-consolidacao-frontend-20261021/plano-de-execucao.md).

Inventarie origem/autenticação, branches/upstreams, worktrees e trabalho rastreado/não rastreado. Faça fetch/FF seguro e analise deriva desde a base acima. Preserve branches, histórico, arquivos, ZIPs e processos alheios; sem reset --hard, force push, limpeza ou stash automático. Main acompanha somente origin/main; não promover development a main por inferência. Use worktree isolada quando necessário.

## A — investigação e correções proporcionais

A preparação técnica da fase10 está integrada; a investigação técnica posterior é o próximo recorte autorizado. Aceite humano de produto/acessibilidade/copy permanece separado e não é simulado por esta autorização.

1. Reconciliar os registros antigos com o estado integrado. #19 e #20 já foram mesclados; prompts6/7 e8/9 ficam históricos. Preservar os textos/recibos anteriores por adendo, sem marcar incidentes como resolvidos por novo verde.
2. Recuperar o inventário já existente de INV-001–005/OBS-001–002. O pacote histórico descrito na triagem tem41logs/três journals, SHA256 f43a49d589fd6c9db7e15de573b8c7f86e39361105273fc096a2a125579f59fb; conferir identidade/disponibilidade, não refazer a preservação nem afirmar que possui bytes ausentes.
3. Por item, separar sintoma, head/run/tentativa e hipótese. Produzir reprodução mínima em ambiente sintético próprio, com experimentos controlados e critérios objetivos. Priorizar falha material atual; intermitência histórica não reproduzida não autoriza reescrever o produto.
4. Cobrir IHFR intermitente, concorrência histórica de duas chamadas, navegação/reset de mapa, incidente de conta e404 de página. Distinguir404 esperado de lookup da API. A correção022 de quatro operações/três ondas não demonstra retrospectivamente a causa do incidente de duas chamadas.
5. Investigar também a navegação375/texto200/settleTransitions da RC, que permaneceu INDETERMINADA após sondas. Os reparos já feitos de mapa44px/teclado/alerta e amostragem R2 não são prova dessa causa. Não reverter correções válidas para obter um caso negativo artificial.
6. Separar avisos de hidratação/caret, máscaras/indicador Next e enquadramento das falhas de produto. Obter contraprovas antes de atribuir causalidade ou aprovar pixels ocultos.
7. Se houver defeito concreto nos últimos merges, registrar cenário, caminho, causa demonstrada ou hipótese rotulada, correção mínima e regressão. Usar Spec Kit para recorte funcional e plano transversal para investigação; manter PLAN → EXECUTE → REVIEW. Branch sugerida fix/frontend-pos-consolidacao; dividir PRs quando os defeitos forem independentes.
8. Encerrar cada investigação com causa/correção comprovadas, ou INCONCLUSIVO/NAO_REPRODUZIDO com tentativas e limites. Não fabricar um patch para todo item. Comunicar risco residual e deixar aceitação residual ao mantenedor.

A branch review/frontend-rc-artifact-triage-20261021 contém sondas/workflows isolados e está fora da RC de produto. Examinar sua proveniência se necessário; não mesclar a branch inteira nem importar workflows ou vercel.json para production/development sem revisão focal. Uma sonda FAIL não é, sozinha, FAIL do head agregado atual.

Não reduzir assertions/guards, adicionar retries para ocultar falha ou ampliar timeouts indiscriminadamente. Preservar sessão, continuidade HMAC A→B→A, idempotência por autor, corpo/chave estáveis, precisão temporal/numérica, OCC/drafts, consumo/rollback, autorização e ciência. docs/raw/** permanece imutável.

## B — homologação e preparação da entrega

Avançar em tudo que independe de acesso externo enquanto a etapaA é executada. Produzir uma matriz executável de prontidão, com estado por gate e dependência concreta; não encerrar apenas com recomendações.

- Revalidar jornadas sintéticas completas da candidata corrigida, se houver, e consolidar um SHA inequívoco. Preparar roteiro humano simples usando o guia existente, sem linguagem de auditoria no passo a passo do participante.
- Preparar/verificar critérios de conta/e-mail real, exclusão, drafts/capas, mapa/atribuição/fallback, IHFR experimental, suporte, janela e recuperação. Distinguir transporte fake/SMTP aceito de recebimento humano, e feature-off de provedor homologado.
- O recibo25 relata403 da conexão Vercel no projeto hidro-florestas-full-stack/equipe hidrofloresta-8598. Esse estado foi relatado naquela execução, não verificado novamente nesta preparação. Reconsultar somente dentro do acesso disponível e registrar a resposta atual. Não criar/trocar projeto ou contornar grant_team_access.
- Homologação real, destino/alias/SHA, banco hospedado, backup/restore, participantes/suporte e aceites humanos ainda precisam de evidência própria. Não deduzir URL atual da URL histórica nem homologação de produção do CI sintético.
- Os documentos da RC registram autorização operacional C3/C4 em outra execução. Preservar esse registro; confirmar sua origem/escopo efetivos no contexto de execução antes de agir em sistemas reais. Não reabrir consentimento de rotina já comprovado; a instrução de preparar este handoff não amplia sozinha atos de produção, banco ou comunicação.
- Não reabilitar a guarda development:false, alterar main, disparar deploy/migrations reais ou enviar comunicados apenas para fechar uma checklist. Se a ação operacional estiver expressamente coberta por autorização vigente comprovada e houver destino/acesso, seguir os runbooks e seus gates; caso contrário, deixar a ação concreta pronta para o operador autorizado. Nenhum destinatário ou aceite de terceiro pode ser inventado.
- Preparar prova de restauração, identificação do deployment anterior e reversão compatível; a candidata visual não acrescenta migrations, mas main antigo e development têm cadeia acumulada distinta. Não tratar rollback de código como rollback seguro de banco.
- Atualizar guia e material de entrega com versão/features/limites verificados; campos não disponíveis ficam identificados como pendentes. Preparar o comunicado; envio depende de instrução explícita no contexto aplicável.

O resultadoB deve ser um pacote revisável de homologação/entrega, com gates executados comprovados e gates realmente bloqueados identificados por acesso/operador/aceite. Um403 bloqueia a operação correspondente, não os testes, documentação ou correções independentes.

## Validação e entrega dos dois recortes

Usar Node24.19.0/npm/lockfile, build padrão e guias locais do Next; PostgreSQL somente sintético próprio e runners oficiais. No Windows, seguir scripts/accounts-local-postgresql.ps1, scripts/rc-review-validation.ps1 e runbooks. -InitializeCiCluster é exclusivo do Actions Windows isolado. Não operar banco/provedor real para reproduzir históricos.

Mudança de produto exige regressão proporcional e validação do head final; manter os15 gates oficiais: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap e SchemaAudit. Preservar runners/Actions/permissões/guards. Antes do push funcional, usar inclusão focal da branch no gatilho e if do job existente e Preview desabilitado, sem retirar development:false ou regras anteriores. Evidence upload estreito/sanitizado; sem segredos, tokens, cookies, traces ou dados reais.

Conferir viewport320/375/768/1440, texto200%, teclado/foco, navegação/Back/Forward/reload e último controle, quando afetados. Metadados por head/run/tentativa e screenshots fullPage:false para visibilidade; não declarar dispositivo físico/WCAG/aceite humano por emulação. Alteração documental pura exige diff/escopo/JSON/links e preservação histórica, sem repetir bateria funcional por rotina.

Entregar commits/push e PRs para development, evidências por item, correções concretas ou não reprodução fundamentada, pacoteB executável, bloqueios específicos e próximos atos do operador. Concluir as duas etapas até o limite verificável do acesso, sem parar no primeiro PR. SeB depender de correçãoA ainda não integrada, declarar a dependência e usar candidata/PR empilhado quando adequado. Não fazer os merges futuros.

IHFR permanece CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. Preservar falhas/histórico e separar FATO_DOCUMENTADO, EVIDENCIA_IMPLEMENTACAO, INFERENCIA e RECOMENDACAO.

O prompt pode ser usado na branch docs/handoff-pos-consolidacao-20261021 antes do merge documental. [Recibo desta preparação](verificacao-integracao-e-handoff-pos-consolidacao.json).


## Continuação vigente para o próximo executor — 23/10/2026

O texto acima preserva o handoff de21/10. A missão HF-POS-20261021-01 produziu relatórios no #27, sem patch funcional e sem homologação operacional. #26 foi integrado por c4adfb379e5dc78f27f31b91edbd13f43228d9f9; #27/223839c9 continua aguardando revisão final na consulta desta preparação.

`DECISAO_CONFIRMADA`: Pedro pediu uma etapa focal de investigação e resolução das intermitências por outro desenvolvedor, mantendo as investigações abertas e o piloto bloqueado durante a integração dos registros. Para iniciar trabalho novo nessa frente, usar o [prompt HF-INV-20261023-01](../../plans/active/investigacoes-intermitentes-20261023/prompt-de-execucao.md) e seu [plano](../../plans/active/investigacoes-intermitentes-20261023/plano-de-execucao.md). A autorização de investigar/implementar/validar/commitar/push/PR permanece sem confirmação adicional de rotina; merges e aceites com o mantenedor. Não repetir toda a missão anterior nem transformar o recorte de investigação em liberação operacional do piloto.
