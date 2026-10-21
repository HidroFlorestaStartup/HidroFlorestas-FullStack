# Plano de continuação das fases 6 e 7

Identificador: HF-FRONTEND-6-7-20261020. Estado: `AGUARDANDO_REVISAO`; execução preparatória `CONCLUIDO`.

## Objetivo, autorização e resultado

`DECISAO_CONFIRMADA`: Pedro, no pedido anexado “Integração dos PRs 13–16 e
handoff das fases 6 e 7”, em 20/10/2026, autorizou inventário, revisão,
retarget, reviews cabíveis, merges sequenciais em development, sincronização
segura e publicação documental. Resultado: integrar #13–16 quando conferidos e
publicar um prompt autossuficiente que autorize outro desenvolvedor a implementar
as duas fases, validar, commitar, fazer push e abrir/atualizar ambos os PRs.
Merge futuro e aceite humano permanecem com o mantenedor.

## Escopo e limites

Revisão e integração #13 → #14 → #15 → #16; documentação no pacote atual,
PROJECT_CONTEXT.md e DOCUMENT_REGISTER.md quando necessário. Não implementar
fases 6/7 nesta preparação, promover main, excluir branches/worktrees, operar
deploy, banco real ou provedores externos. Preservar docs/raw/**, arquivos
preexistentes, evidências e falhas históricas. TECH_DECISIONS/PENDING_DECISIONS
somente se decisão material real exigir.

## Fontes e autoridade

Pedido identificado acima rege o escopo e a autorização; AGENTS.md, PLANS.md,
constituição Spec Kit e políticas de fontes regem execução e classificação.
Código/diffs/checks e Specs 020–022 são `EVIDENCIA_IMPLEMENTACAO` nos limites
verificados. PRD Code-First conserva seu estado. Starter cbb954a é referência
visual. Recomendações e inferências serão rotuladas; ciência segue ADR-0001.

## Estado inicial e preservação

`EVIDENCIA_IMPLEMENTACAO`: checkout principal em development c33bf50b510dd7af7ad59cde039839f56519c87e,
árvore limpa inclusive não rastreados; main local/remota beba96fbf6bbaac8771dbb29abea2f9f8f5b0054.
Origin correto; upstream antigo não utilizado. Autenticação local PedroVitor237.
Inventário de refs/worktrees registrado nesta sessão. Worktree rc-review e três
registros de worktrees ausentes preservados; nenhuma limpeza automática.
Revisão isolada em /tmp/hidro-integration-20261020/review, detached no head022.

## Etapas, responsáveis e critérios

| Etapa | Responsável | Estado | Critério |
|---|---|---|---|
| Inventário, fontes e fetch | Codex autorizado por Pedro | CONCLUIDO | Identidade, refs, arquivos, worktrees e PRs atuais registrados |
| Revisar diffs, discussões e CI | Codex autorizado por Pedro | CONCLUIDO | Todos os caminhos inventariados, checks do head e limites explícitos |
| Integrar #13–16 em ordem | Codex autorizado por Pedro | CONCLUIDO | Head exato, base conferida, merge commits, pais/árvore registrados |
| Equivalência e sincronização | Codex autorizado por Pedro | CONCLUIDO | Produto/testes/configuração iguais ao head022; deltas documentais identificados |
| Prompt e registros de handoff | Codex autorizado por Pedro | CONCLUIDO | Autorização de ambas as fases, contratos, evidências e publicação completas |
| Validar, commitar, push e PR aberto | Codex autorizado por Pedro | CONCLUIDO | Links/JSON/diff revisados; PR documental aberto para mantenedor |

## Riscos, dependências e paradas

PRs empilhados exigem preservar ancestralidade, conferir o head da feature anterior
e distinguir CI do head de CI do merge. Defeito concreto suspende somente o
recorte afetado/dependentes. Parar em conflito sem autoridade, alteração funcional
não validada, regra do GitHub impeditiva ou perda de preservação. Não contornar
regras, reduzir gates ou atribuir revisão a terceiros. Não há nova decisão
científica ou operacional. Responsáveis por homologações externas: não especificado.

## Validações previstas e evidências

Git local para diff completo (sem limite da API), ancestralidade, merge-tree,
pais/árvore e comparação final; GitHub para heads/bases/checks/reviews/threads,
logs oficiais quando necessários. JSON final sanitizado com resultados e links.
Documentação: diff/escopo, referências locais/âncoras, JSON, terminologia e ausência
de segredos. Sem nova bateria funcional por edição documental ou retarget sem
mudança; delta funcional exige runner oficial e validação pertinente.

## Histórico, bloqueios e encerramento

- 20/10/2026 — `EM_ANDAMENTO`: leitura do pedido e inventário iniciados.
- Restrição de rede na primeira consulta gh pr list; repetição autorizada fora
  do sandbox funcionou. A falha 403 da integração anterior é relato do pedido;
  nenhuma tentativa de escrita local foi realizada ainda.
- Encerramento, verificações, limitações e publicação: pendentes nesta etapa.
  Manter este plano no pacote ativo até revisão humana; não arquivar o pacote
  histórico nesta tarefa.

- 20/10/2026 — inventário/revisão/integração/equivalência concluídos. Merges reais
  28d4459 → 16aa443 → 1491d82 → 24be57f; reviews assistidos14/15/16 registrados
  pela conta PedroVitor237. Três journals oficiais com15PASS/exit0 conferidos;
  apenas nove deltas documentais13 contra b85edd8. Sem novo defeito bloqueante.
- 20/10/2026 — prompt6/7 e registros preparados em branch própria da development
  final. Validação documental inicial:9 arquivos,1JSON,118 links locais/2âncoras,
  seis documentos antigos preservados byte a byte, escopo/whitespace/padrões
  sensíveis reconhecidos PASS. Nenhuma suíte funcional nova, pois não há delta
  funcional de integração; limitações e históricos constam no recibo.
- Sem decisão material que exija TECH_DECISIONS.md/PENDING_DECISIONS.md.
  Próximo passo: commit/push/PR documental aberto; revisão humana pendente.

## Publicação e encerramento da preparação — 20/10/2026

Branch `docs/handoff-frontend-fases-6-7` publicada com upstream próprio; primeiro
commit `f33e1254090aacf9f9f679dd45da3846465cb0cd`. [PR documental17](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/17)
**OPEN** para development, sem autoaprovação ou auto-merge. Prompt diretamente
acessível na branch antes do merge documental. Integração13–16 e preparação do
handoff `CONCLUIDO`; documentação `AGUARDANDO_REVISAO` do mantenedor. As fases6/7
ainda serão implementadas pelo outro desenvolvedor conforme a autorização.

Validação: nove arquivos documentais, JSON,118 links locais/2âncoras, seis
documentos anteriores preservados byte a byte, campos/SHAs/pais/árvores e
equivalência, escopo/whitespace/padrões sensíveis reconhecíveis PASS. Nenhum erro
de referência anterior ou novo localizado. Sem nova bateria funcional, pois
não houve delta funcional de integração; CI dos heads e limites separados no
recibo. Main/trabalhos preexistentes preservados; sem bloqueio técnico novo.
Revisão humana documental e futuros merges6/7 continuam com o mantenedor.

Sem arquivamento: manter o plano no pacote ativo autorizado até a revisão humana
prevista. Nenhuma decisão científica/global nova, homologação externa ou
implementação6/7 alegada. Resultado preparatório entregue; não resta operação
autorizada de merge neste PR documental.
