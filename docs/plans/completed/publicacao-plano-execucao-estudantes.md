# Publicação do plano de execução dos estudantes

Identificador: DOC-CRI-EST-20261013. Estado: `CONCLUIDO`.
Data: 2026-10-13. Executor: agente a pedido do responsável pelo projeto.

## Objetivo, autoridade e escopo

Criar, revisar, versionar e publicar o plano operacional dos estudantes na RC,
com URL GitHub confirmada por API. `DECISAO_CONFIRMADA`: solicitação do usuário
nesta conversa de 2026-10-13 delega revisão, homologação, integração e atualização
da aplicação existente aos estudantes; autoriza ao agente somente documentação,
commit e publicação. O texto da solicitação foi recebido como anexo nesta conversa.

Aplicam-se [AGENTS.md](../../../AGENTS.md), [PLANS.md](../../../PLANS.md),
[contexto](../../../PROJECT_CONTEXT.md), [decisões](../../../TECH_DECISIONS.md),
[constituição](../../../.specify/memory/constitution.md),
[autoridade](../../governance/SOURCE_AUTHORITY.md) e
[política Code-First](../../code-first-prd/governance/source-policy.md).
Git/GitHub e configuração rastreada comprovam implementação/estado observado;
runbooks orientam operações futuras; recomendações não são aprovações da equipe.

Fora de escopo: código funcional, merges principais, deploy, migrations remotas,
provedores, segredos, contas reais, smoke Cloudinary e aprovações de PRs.
Não criar spec funcional, TASKS.md global nem artefatos OpenSpec para esta entrega.

## Estado inicial e preservação

Checkout solicitado: release/cri-rc-20261010 em
2995cff372a8ff173d452b87f334d03b096de50e, limpo. Origin é o fork público
HidroFlorestaStartup/HidroFlorestas-FullStack. Fetch não alterou heads remotos.
Main/development remotos: beba96fbf6bbaac8771dbb29abea2f9f8f5b0054.
Sete worktrees preexistentes conferidos; nenhum será modificado. O checkout
principal conserva três arquivos não rastreados, sem incorporá-los à entrega.
Worktree adicional destacado, sem branch nova:
C:/projetos/ifma/HidroFlorestas-estudantes-plano-20261013.

Arquivos previstos: plano dos estudantes em docs/releases/2026-10-10-cri-rc/,
readme e checklist do mesmo pacote (navegação/errata de sete PRs), e este plano.
Não editar docs/raw, código, configurações, lockfile ou registros canônicos fora
do recorte. Catalogação no DOCUMENT_REGISTER será indicada aos mantenedores.

## Etapas e critérios

- [x] Ler instruções/contexto/decisões e os onze documentos operacionais pedidos.
- [x] Conferir Git, worktrees, refs, commits, PRs #1–#7, reviews, threads e checks.
- [x] Confirmar vercel.json remoto: deploymentEnabled da RC false; workflow sem
  deploy, com cinco branches exatas. Patch 99d8363 original ancestral da RC.
- [x] Criar worktree destacado a partir da RC remota.
- [x] Escrever todas as fases/tarefas/campos, gates e papéis sem nomes inventados.
- [x] Corrigir referências executáveis de seis para sete PRs, mantendo história.
- [x] Revisar Markdown, links, dependências, escopo e ausência de dados sensíveis.
- [x] Commit em português com identidade Git configurada e diff documental.
- [x] Reconferir remoto/proteção e push fast-forward somente para a RC.
- [x] Confirmar arquivo e novo HEAD pela API; conferir checks e impacto no PR #7.
- [x] Preparar entrega com URL, SHA, contagem, arquivos, verificações e mensagem aos estudantes.

## Riscos, paradas e decisões

PR #4/#6 conservam CHANGES_REQUESTED e #4 tem thread não resolvida/outdated.
Publicação não fecha revisões ou gates. Push documental executa CI e avança head
do PR #6/base de #7; sincronização de #7 ficará para os estudantes, por merge
da base em seu head, sem absorver o head independente na RC.

Parar publicação se o remoto avançar, proteção desaparecer, surgirem alterações
funcionais ou dados sensíveis. A autorização atual já cobre commit/push na RC;
não exige nova confirmação. Decisões operacionais ficam PENDENCIA_DE_DECISAO.

## Verificações e evidências

Prever git diff --check, inspeção do diff completo, validação local de destinos
e âncoras Markdown, IDs/campos/dependências/checklists, revisão de privacidade,
comparação de árvore funcional e refs principais. Não instalar ferramentas apenas
para Markdown. Build/E2E locais não são necessários para alteração documental;
CI vigente será observado no SHA publicado. GitHub API confirma conteúdo/URL,
check-runs e workflow runs; combined status vazio não equivale a CI pendente.

## Histórico, desvios e encerramento

| Data | Estado | Evidência/evento |
|---|---|---|
| 2026-10-13 | EM_ANDAMENTO | Mandato lido; reconciliação e worktree isolado concluídos |
| 2026-10-13 | AGUARDANDO_REVISAO | Revisão documental do agente: 43 tarefas, campos, links, diff, privacidade e preservação conferidos; sem substituir revisão humana da RC |
| 2026-10-13 | CONCLUIDO | Plano publicado em bc283ad; API/blob e URL HTTP200 confirmados; CI do commit identificado, execução dos estudantes continua NAO_INICIADO |

Sem bloqueio atual. GitHub CLI não está no PATH; conector GitHub e API REST pública
permitem leituras, Git autenticado permite publicação. Sem operação produtiva.

### Resultado e evidências da entrega

- Plano: [plano-execucao-estudantes.md](../../releases/2026-10-10-cri-rc/plano-execucao-estudantes.md),
  43 tarefas PENDENTE, preparação e sete fases/gates; nove campos mais ID por tarefa.
- Readme/checklist recebem links para o plano e errata comprovada de seis para
  sete PRs. Nenhuma alteração nos outros runbooks ou decisão operacional inventada.
- Commit inicial: `bc283adfbff09903ba461d99b03657894f2efd39`, autor/committer
  iguais à identidade Git configurada (`thalesvalente`), mensagem em português.
- Push normal fast-forward de2995cff→bc283ad somente na RC; bloqueio Vercel false
  conferido novamente por API/arquivo, sem modificação de configuração.
- GitHub Contents API e conector confirmaram blob
  `6304fc112910fc1b7b5b5a751a9203dda05dfa0e`, igual ao blob local; 43 checkboxes.
  [URL publicada](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/bc283adfbff09903ba461d99b03657894f2efd39/docs/releases/2026-10-10-cri-rc/plano-execucao-estudantes.md)
  respondeu HTTP200. Link da branch permanece o ponto de entrada compartilhável.
- CI real iniciado por push:
  [run38470436732](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38470436732),
  IN_PROGRESS na confirmação inicial, sem atribuir PASS. O commit que arquiva
  este registro terá run própria; conferir seu SHA/checks na resposta final/Actions.
- PR #6 permanece aberto com head publicado. PR #7 continua aberto no head59baff4;
  `git merge-base --is-ancestor` exige sua sincronização futura com a RC documental,
  tarefa EST-012 dos estudantes. Nenhum comentário/review/merge enviado pelo agente.

### Verificações executadas e limites

Validador temporário Python, sem instalar ferramenta ou criar teste no repositório:
43 IDs sequenciais/únicos; nove campos por tarefa; estado inicial PENDENTE;
dependências anteriores sem ciclo; 52 links relativos/destinos/âncoras válidos;
13 URLs externas distintas, PRs/threads/run/follow-up confirmados por API;
fences e tabelas consistentes, UTF-8 e quatro qualificadores IHFR preservados.
Busca de padrões sensíveis e revisão manual do conteúdo: PASS; env privados não
foram lidos. Git diff --cached --check PASS após retirar linha vazia final do
documento novo. Diff completo: somente três arquivos de release no commit inicial.
Comparação Git de src/prisma/scripts/package/lock/vercel/workflow: zero mudança.

Build/E2E locais não reexecutados: documentação apenas; CI acionado pelo push é
observado separadamente. Não realizar homologação, integração principal, deploy,
migration, smoke real, mudança de segredo/provedor ou operações de contas.
Refs principais e os sete checkouts anteriores permanecem preservados.

Este registro é arquivado em docs/plans/completed por encerramento da entrega
documental autorizada. Sua publicação adicional preserva o documento principal
e os inputs funcionais. O SHA final é obtido pelo histórico Git, evitando
autorreferência. Catalogação dos dois documentos novos no DOCUMENT_REGISTER é
indicada para mantenedores/EST-043, sem editar esse caminho nesta entrega.
Pendências: todos os gates humanos/operacionais do plano, sincronização #7,
risco dev/intermitências, recorte Cloudinary, owners, RPO/RTO e janela.
