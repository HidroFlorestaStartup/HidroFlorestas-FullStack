# Plano — consolidação e encerramento das PRs remanescentes

ID HF-UI044-CLEANUP-20261106. Estado AGUARDANDO_REVISAO. Data 06/11/2026 (America/Fortaleza).

## Objetivo e autoridade

Origem: pedido atual de Pedro para tratar as PRs41,44–48,50,52 que permaneceram abertas após os aceites/merges51 e53. O objetivo é encerrar as propostas substituídas e preservar conteúdo documental exclusivo antes do fechamento, sem excluir branches. Integração técnica e aceite de C1–C3 já constam da review5800053435 e do merge865054b.

## Estado inicial e preservação

Development865054b53e5820582d7956a29dc95fc9a2690bd8; mainbeba96fbf6bbaac8771dbb29abea2f9f8f5b0054. Oito PRs abertas. Fontes44–50 têm heads idênticos aos pins da proveniência de51;55 blobs recuperados/arquivados conferidos sem divergência. PR41 tem três recibos exclusivos e um guard. PR52 tem sete arquivos novos, quatro adendos documentais e um guard, ainda não integrados. Trabalho por API Git em diretório novo; não altera checkout/worktrees de outras máquinas.

## Escopo, fontes e etapas

AGENTS/PLANS e SOURCE_AUTHORITY regem a organização documental; as decisões de Pedro regem o aceite. Código, Git e logs são evidências de implementação. Documentos da demonstração e do handoff são históricos e preservam os resultados em seus SHAs, sem novo PASS funcional.

1. Conferir heads/proveniência e preparar um registro de encerramento rastreável.
2. Fechar44–48/50 com comentário de substituição por51/53 e branches preservadas.
3. Conciliar41 e52 pela branch documental52, usando a development atual como árvore-base; manter seus conteúdos originais, três prints e guardsfalse. Acrescentar o estado vigente de C1–C3 concluídas e aceitas, distinguindo-o dos mandatos históricos.
4. Verificar escopo, todos os blobs de produto, preservação dos originais, links, JSON e whitespace. Nenhuma suíte funcional nova necessária se só documentação/guardsfalse mudar.
5. Integrar52 pelo head exato, sem autoaprovação, e encerrar41 com rastreabilidade caso não seja encerrada automaticamente por ancestralidade. Conferir refs/PRs e publicar o recibo final na PR52.

## Limites e pontos de parada

Não reaplicar código antigo; não criar implementação nova, alterar workflow/schema/testes/dependências, promoverProduction, operar banco/provedores ou apagar branches. Divergência de head/conteúdo material impede apenas a parte afetada até reconciliação. Não inventar check, aprovação ou encerramento causal de falha histórica. CI do novo head documental é NOT_RUN salvo execução efetivamente observada; nenhum gate obrigatório será dispensado.

## Verificação e histórico

Planejado: três documentos41 e conteúdos52 preservados por blob/bytes,55 registros de proveniência, diff documental exato, JSON/links e árvore funcional idêntica a865054b. O estado de execução e as operações externas serão identificados por PR/commit/comentário, sem atribuir resultados de um SHA a outro.

06/11: inventário e proveniência conferidos; consolidação necessária antes do fechamento de41/52. CI/review/aceite de53 mantidos, sem nova bateria geral.

## Conferência anterior à integração documental

06/11: PRs44–48/50 fechadas sem novo merge, com comentários de rastreabilidade. Fontes41/52 conciliadas com a development865054b; três documentos41, JSON histórico52 e três PNGs mantidos por blob; adendos atuais preservam seus textos anteriores. O prompt52 agora identifica o mandato como executado e aceito, não como tarefa pendente. A união de guards mantém todas as entradasfalse. Main e produto permanecem preservados.

[Recibo estruturado](recibo-de-consolidacao.json). O estado externo final de52/41 será fechado e conferido na conversa da [PR52](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/52), identificando seu SHA de merge. Não transferir CI da candidata53 ao head documental.
