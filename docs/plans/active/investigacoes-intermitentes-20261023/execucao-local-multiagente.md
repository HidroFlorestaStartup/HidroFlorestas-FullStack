# Execução local multiagente das investigações

Identificador: `HF-INV-20261023-01-LOCAL01`. Estado: `EM_ANDAMENTO`.
Início registrado: 2026-10-23 20:24:34 UTC / 17:24:34 America/Fortaleza.
Coordenador: agente raiz; revisão/integração humana: mantenedor, sem aceite delegado.

## Objetivo, autoridade e limites

`DECISAO_CONFIRMADA`: pedido explícito do usuário em 23/10/2026 para executar
integralmente o mandato local HF-INV, incluindo experimentos sintéticos, correções
demonstradas, Spec Kit, commits, push, PR, CI e revisão do HEAD final. Fonte:
arquivo de missão fornecido pelo usuário e solicitação nesta sessão.

Entregar resultados verificáveis para NAV4-LOCAL, INV-001, INV-002, INV-003,
INV-004, INV-005, NAV-SETTLE, OBS-001 e OBS-002. Sem refazer fases visuais,
merge em development/main, deploy, provedores, banco hospedado, dados reais ou
env preexistente. Não enviar e-mail. `docs/raw/**` permanece imutável.

IHFR permanece `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
Esta investigação não homologa o piloto nem concede aceite humano/científico.

## Fontes e reconciliação

As regras AGENTS, contexto, decisões, PLANS, constituição e política Code-First
governam seus assuntos. Código/testes demonstram implementação; hipóteses são
`INFERENCIA`, orientações são `RECOMENDACAO`, sem promoção a decisão da equipe.

`EVIDENCIA_IMPLEMENTACAO` — leitura autenticada e fetch sem prune:

- development: `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`, merge #26.
- main: `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`, preservada.
- [#27](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27)
  aberta, HEAD `223839c9ae91591ded8de387144d8c1ee84b5c20`.
  [Revisão](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6329614420)
  completed, sem findings/pendências, em 23/10 07:16:20 UTC. Não repetir pedido.
  CI funcional desse HEAD `NOT_RUN`; os quinze PASS anteriores pertencem a
  `131ade347258c7820c7a89989ab851769197b486`, run39699435699/attempt1.
- [#28](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/28)
  aberta, HEAD `f56f73fda1d7bd459a1415bf02df25edc9120674`. Prompt, plano e
  recibo lidos integralmente por esse SHA. Preparação `NAO_INICIADO` não prova
  execução. Branch e documentos do autor preservados; não importar branches.
- Busca remota por HF-INV encontrou #26/#27/#28, sem PR sucessora observada.
  Trabalho local 022 em `6ad9098` preservado; branch remota avançou a `b85edd8`.
  Deltas serão comparados por assunto, sem integrar versões antigas inteiras.

## Estado inicial e preservação

Checkout original: release/cri-rc-20261010 em `0f669b7`, atrás da remota um
commit. Sem mudanças tracked; oito entradas não rastreadas: `.demo-runtime/`,
`.worktrees/`, arquivo da missão, dois documentos da demonstração e três ZIPs.
Todas preservadas. Worktrees anteriores 022, review e frontend preservadas;
nenhum reset/stash/limpeza/encerramento de processos alheios.

Git original usa metadados fora do writable root. Fetch default recusou escrita.
Cópia Git independente criada dentro do workspace, sem hardlinks; fetch nessa
cópia concluído com confiança por comando e acesso de rede autorizado, sem
alterar configuração global. Candidata:
`fix/investigacoes-intermitentes-20261023-local01`, base development atual.

## Recursos e quadro de execução

Três subagentes nativos reais foram iniciados pela ferramenta de colaboração
com `reasoning_effort=ultra`, aceito na criação. Limite efetivo: quatro agentes
incluindo raiz. Modelo/esforço da raiz não é exposto por ferramenta verificável;
não se afirma reconfiguração. CLI instalado: 0.162.0-alpha.17.2. Node24.19.0,
npm12.0.2, Git2.55.0.windows.4, PowerShell5.1. WSL e gh indisponíveis.

| Owner | Branch/worktree lógica | Recursos exclusivos | Escopo de escrita |
|---|---|---|---|
| coordenador | candidata/repo | instalação própria; gates agregados serializados | plano, CI/Vercel, canônicos, manifesto/síntese |
| agent-a-nav4-accounts | inv-local01/nav4 / A | accounts55427, HTTP3001; LOCALAPPDATA sintético próprio | testes/scripts NAV4, evidência nav4, spec por causa |
| agent-b-ihfr-concurrency | inv-local01/ihfr / B | IMP00655426, HTTP3000, schema próprio | testes IHFR/duas chamadas, evidência ihfr, spec por causa |
| agent-c-navigation | inv-local01/navigation / C | HTTP3200 público, browser próprio; contas só após liberação A | navegação/settle/OBS, evidência navigation, spec por causa |
| revisor independente | agente reutilizado após terminar autoria | worktree de leitura isolada | parecer, sem autoria do patch revisado |

Não publicar branches dos agentes. Integração por commits verificados na
candidata. Diretórios de evidência por owner em
`docs/releases/2026-10-23-hf-inv-local01/`. Arquivos compartilhados requerem
acordo de ownership antes da edição. Instalações/Prisma separados por worktree.
Cluster preexistente não é reutilizado. Porta fixa/guard implica serialização.
`-InitializeCiCluster` é proibido localmente, reservado ao Actions Windows.

## Etapas e critérios

1. Preservar/reconciliar — coordenador; refs, fontes e ownership comprovados.
2. Desenhar protocolos — A/B/C; registrar hipótese, controle, variável, fixture,
   número/schedule, reinícios, coleta e encerramento antes do confirmatório.
3. Executar NAV4 autenticado primeiro, avançando frentes independentes; registrar
   todas as tentativas, inclusive FAIL/SKIP/infraestrutura; sem retries ocultos.
4. Para causa demonstrada: skills instaladas specify → clarify se material →
   plan → checklist → tasks → analyze → implement → validação/conformidade.
   Alocar feature depois de inspecionar 001–028; não criar spec para hipótese.
5. Integrar, revisar independentemente, corrigir findings materiais, validar
   typecheck/lint/diff e regressões pertinentes. Preservar controles negativos.
6. Conter deployment da branch antes de primeiro push, incluir somente essa
   branch no workflow oficial preservando quinze gates/guards/actions/runners.
7. Publicar Draft substantiva para development, conferir árvore/HEAD remoto,
   executar CI oficial e solicitar Codex se ainda não existir pedido no SHA.
8. Tratar findings, repetir validação somente quando necessário; recibos de
   CI/review posteriores por comentário para evitar HEAD autorreferente.
9. Atualizar inventário/documentos afetados; handoff em português para Pedro e
   Luciano, sem envio de e-mail; manter `AGUARDANDO_REVISAO` para mantenedor.

## Verificações e estados

Gates executáveis: RegressionSetup, Unit, Integration, Migration, Contract, R1,
Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit.
CI oficial Windows no HEAD final, sem herdar PASS. Estados de execução:
`PASS | FAIL | BLOCKED | NOT_RUN`. Estados causais separados conforme mandato.

Validar diff base→HEAD, escopo, links, JSON, hashes existentes, terminologia,
privacidade e preservação histórica. Reporter com lista fechada: sem env/cookie/
credenciais/códigos/URLs assinadas/identidades ou paths absolutos. Não atribuir
resultados a SHA limpo quando existia delta; registrar árvore/hash do patch.

## Riscos, bloqueios e pontos de revisão

Rede default recusou GitHub; fetch escalated autorizado concluiu. Conector
autenticado lê refs/PRs/reviews. Escrita será comprovada por ação autorizada.
Artefatos históricos serão verificados individualmente; ausência/expiração não
autoriza fabricar bytes. Instalação isolada e runtime ainda em preparação.

Decisão científica, conflito material, acesso externo ou aceite humano bloqueiam
apenas recorte dependente. G3–G5 continuam em frente operacional separada;
não executar provedores para encerrar investigação. Nenhuma proteção alterada.

## Histórico/checkpoints

- 23/10/2026 20:24 UTC: `EM_ANDAMENTO`; refs e fontes reconciliadas, cópia/worktrees
  próprias criadas, três agentes nativos reais ativos, protocolos em preparação.
  Próximo ato: NAV4 autenticado e experimentos independentes; nenhum PASS novo
  do produto antecipado. Encerramento e inventário de processos ainda pendentes.
