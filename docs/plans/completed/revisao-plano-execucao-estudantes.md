# Revisão do plano de execução dos estudantes

Identificador: DOC-CRI-EST-REV-20261013. Estado: `CONCLUIDO`.
Objetivo: revisar e republicar o plano com seis entregas principais, separando
execução dos estudantes, operação e aprovação do projeto; preservar referência
técnica, reutilizar evidências e remover dependências artificiais.

`DECISAO_CONFIRMADA`: pedido do usuário nesta conversa de 2026-10-13 define
este recorte, somente documental. A autorização anterior de publicação na RC
persiste; não executar integração principal, testes reais, deploy, migrations,
mudança de acessos/segredos, custos ou dados.

Fontes: [AGENTS.md](../../../AGENTS.md), [PLANS.md](../../../PLANS.md),
[contexto](../../../PROJECT_CONTEXT.md), [decisões](../../../TECH_DECISIONS.md),
[constituição](../../../.specify/memory/constitution.md),
[autoridade](../../governance/SOURCE_AUTHORITY.md),
[plano publicado](../../releases/2026-10-10-cri-rc/plano-execucao-estudantes.md),
runbooks e evidências associados. Recomendações não designam autoridade;
configurações/testes são evidência de implementação, não aprovação operacional.

Estado inicial: checkout solicitado limpo na RC local2995cff; remoto981eb9d.
Worktree documental isolado existente, destacado em981eb9d, limpo e reutilizado.
Main/development remotos beba96f. Demais checkouts e três arquivos não rastreados
preexistentes do principal são preservados. Run38470655392 do head981eb9d
concluiu SUCCESS; os resultados anteriores serão aproveitados com equivalência
de inputs comprovada, sem atribuir PASS automático ao novo SHA.

Escopo de arquivos: plano dos estudantes, readme, checklist e atribuição de papéis
no runbook produtivo do pacote de release, e este registro. Não alterar código,
testes, config, lockfile, docs/raw ou registros
canônicos fora do recorte. Não criar feature Spec Kit para revisão documental.

## Etapas, riscos e verificações

- [x] Reconciliar estado, fontes e conclusão do CI anterior.
- [x] Escrever seis entregas com executor/aprovador, saídas e limites de acesso.
- [x] Reclassificar detalhes EST como referências condicionais, sem série obrigatória.
- [x] Ajustar reutilização de provas e dependências por frente, mantendo gates produtivos.
- [x] Alinhar navegação, checklist e atribuição no runbook produtivo.
- [x] Validar links/âncoras, Markdown, campos, IDs, diff, privacidade e árvore funcional.
- [x] Commitar/publicar na RC protegida e confirmar conteúdo/HEAD/checks por API.
- [x] Registrar resultado e arquivar este plano ao concluir a revisão documental.

Parar a parte afetada se houver head remoto inesperado, proteção ausente,
conflito de autoridade não resolvido ou alteração preexistente incompatível.
Falta de admin/owner/custo/dados não impede escrever o plano: registrar papéis
a designar pelo projeto, sem solicitar credenciais ou assumir suas atribuições.
Aceite de revisão e GO produtivo permanecem humanos, fora desta execução.

Validações previstas: seis entregas e 43 referências preservadas; campos e
links corretos; testes de exclusão/drafts/capas sem encadeamento artificial;
sem obrigação geral de repetir15 gates; alterações apenas em docs; proteção
Vercel false e refs principais intactas. Não repetir build/E2E para alteração
documental; observar CI que o workflow existente iniciar pelo push.

## Histórico e resultado

| Data | Estado | Evento |
|---|---|---|
| 2026-10-13 | EM_ANDAMENTO | Revisão autorizada; baseline e evidências conferidos |
| 2026-10-13 | AGUARDANDO_REVISAO | Revisão documental local de campos, dependências, provas, papéis, links e escopo concluída |
| 2026-10-13 | CONCLUIDO | Seis entregas republicadas e0358df; API/blob/URL200 confirmados; execução operacional e aprovações continuam pendentes |

Aprovações/papéis/custos/dados continuam não especificados; serão designados
pelas autoridades do projeto, sem presumir acessos ou responsabilidade dos estudantes.

Revisão documental local concluída: seis checkboxes ENT com executor/aprovador
e campos completos; 43 referências EST com responsáveis e dependências materiais;
32 procedimentos técnicos preservados literalmente, demais ajustados para reuso/
delegação. Validador temporário Python (sem arquivos de teste ou instalação)
conferiu 87 links relativos/âncoras, tabelas/fences/UTF-8, IDs/campos, contexto de
frentes independentes, quatro qualificadores IHFR e cuidados GO/backup/RPO/recorte.
Busca de padrões sensíveis/revisão manual e git diff --check PASS. Env privados
não foram lidos. Build/E2E locais não repetidos: apenas documentação; CI anterior
SUCCESS é referência, run do novo head será consultada separadamente.

Desvio pertinente: o runbook produtivo ainda atribuía execução exclusivamente
a estudantes autorizados. Dois parágrafos foram alinhados aos operadores do
projeto/delegação explícita, mantendo procedimentos e cuidados técnicos intactos.
Também foram alinhados no checklist seleção de testes e smoke pós-deploy limitado,
para não repetir jornadas/cleanup sintéticos na produção.

## Publicação e encerramento documental

Commit da revisão: `e0358dfb725c2ed997716a9ea3f942cab617f6aa`, mensagem
`docs(release): separa entregas dos estudantes e operação do projeto`;
identidade Git configurada preservada, autor/committer thalesvalente.
Push normal fast-forward somente em release/cri-rc-20261010; proteção remota
Vercel false conferida por API, blob vercel dc91711f inalterado.

GitHub Contents API/conector confirmam blob
`caeeaccc11a5de1f2500fe2bb8a6168b348df747`, igual ao local,
seis caixas ENT e 43 referências EST. A
[URL compartilhável](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/release/cri-rc-20261010/docs/releases/2026-10-10-cri-rc/plano-execucao-estudantes.md)
respondeu HTTP200. A [run38474701875](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38474701875)
do commit revisado foi observada IN_PROGRESS, sem atribuição de PASS.
O commit adicional de arquivamento deste registro terá check próprio, a informar
na entrega final, sem autorreferência ao SHA no próprio documento.

Comparação Git de todos os caminhos fora de docs: zero mudança; main/development
remotos permanecem beba96f e PR7/head59baff4 preservado, sem sincronização realizada.
Checkout solicitado limpo e arquivos não rastreados do principal preservados.
Nenhuma operação de aplicação/serviço/banco/conta/segredo, review ou merge principal.
O histórico do plano1.0 e o registro anterior de publicação ficam preservados.
Registro desta revisão arquivado conforme PLANS.md; total de cinco arquivos
documentais afetados, incluindo este registro.

Pendências do projeto: designar operadores/aprovadores, aceitar reviews/recorte/
riscos, confirmar configuração/dados/custos, suprir lacunas de homologação e
autorizar a janela. CI novo é separado da prova anterior reutilizável; relatório
de estudantes não fecha GO nem atualização não executada. Nenhum bloqueio desta
revisão documental; catalogação do novo registro canônico indicada aos mantenedores,
sem alterar DOCUMENT_REGISTER no recorte desta entrega.
