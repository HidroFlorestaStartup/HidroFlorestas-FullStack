# HF-UI-044-G0 — preparação Git/CI e ownership

Data: 2026-10-31, America/Fortaleza. Estado do plano: AGUARDANDO_REVISAO.
Escopo: preparação autorizada; produto NAO_IMPLEMENTADO por G0.
Método: PLAN → EVIDENCE → PREPARE → VALIDATE → HANDOFF.

## Objetivo, autoridade e fontes

DECISAO_CONFIRMADA: a solicitação HF-UI-044-G0 autoriza publicar a preparação e três pontos de partida independentes, sem merge ou deploy. As decisões de Pedro Vítor sobre UI-01–UI-07 constam da [PR #44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/44), no commit `972f9b00189bf09117883913d8c4fa63e69f4d2f`.

Fonte imutável: [prompt e pacote aprovado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/tree/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030). Decisões, plano, critérios, referências e manifesto foram lidos. Consumir esse pacote por SHA enquanto #44 não integrar development; não copiar seus fatos históricos como testes atuais.

Aplicam-se AGENTS.md, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md, constituição Spec Kit, SOURCE_AUTHORITY e PRD Code-First conforme seus estados. O PRD permanece não normativo/em revisão onde assim classificado. UI aprovada não altera ciência ou homologação operacional. Fonte visual somente leitura: starter `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.

## Preflight observado

| Referência | SHA | Tratamento |
| --- | --- | --- |
| development | `9b8595d232842d401ce81bbc92c54dd543aa2829` | Base única; não modificar |
| Árvore da base | `e74ac641564288df01c85226ddc1ed6a8d22b941` | Preservar caminhos não autorizados |
| main | `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054` | Somente leitura |
| docs/handoff-ajustes-interface-20261030 | `972f9b00189bf09117883913d8c4fa63e69f4d2f` | +1/−0; fonte, sem escrita |
| feature/automated-setup | `9743349b792f117134a6a90984cd099793401fa5` | +9/−0; não absorver |
| demo/reuniao-20261026 | `b2f3133bae6e7e0559eb8d843e67fb112536352c` | +2/−0; não absorver |

Inventário remoto: dez branches, PRs abertas #41 e #44; quatro nomes de destino ausentes no preflight. Comparações usam a development acima como merge-base. Os deltas de #41, #44 e setup não reservam novas specs. A árvore specs contém 001–034 e mail-foundation, sem 035–037. Reserva coordenada desta missão: 035/A, 036/B e 037/C. Revalidar concorrência antes de novas publicações.

Execução via API GitHub com conta HidroFlorestaStartup. O clone local falhou por resolução DNS; nenhum checkout do produto foi criado. Upstreams, worktrees e alterações da máquina do usuário: NAO_OBSERVAVEIS, não declarados limpos. Arquivos locais são somente evidências isoladas desta execução. Cada executor local deverá inventariar seu próprio ambiente antes de editar.

`NATIVE_SUBAGENTS_UNAVAILABLE`: não há ferramenta real de delegação nesta sessão. Inspeções Git/base, CI/Preview e fontes/aceite realizadas sequencialmente pelo mesmo coordenador. Não constituem revisão independente de terceiro.

## Alterações e publicação segura

Ownership exclusivo G0: `vercel.json` e `.github/workflows/rc-review.yml`, mais este pacote documental. Nenhum arquivo de produto, teste funcional, runner, schema, migration, dependência ou fonte científica pode mudar em G0.

Vercel: preservar as 35 entradas de development e acrescentar false para a branch de guards, A, B, C e a branch documental #44. A reconciliação é aditiva e sem editar #44. Não usar wildcard nem alterar o comportamento de main.

Workflow: acrescentar somente A/B/C ao filtro push e à condição do job validate. Preservar os 20 nomes anteriores, todas as Actions fixadas, permissões contents:read, windows-latest, timeout de 35 minutos, artefatos e chamada integral do runner sintético.

Criar árvore/commit já protegido, com um único pai development, ANTES de criar a referência remota de guards. Abrir PR Draft para development. Congelar esse SHA como GUARD_SHA; ele será registrado nos PRs e nos handoffs das features, sem tentar embutir o próprio hash no commit.

Criar para cada feature um commit documental próprio, com único pai GUARD_SHA e apenas seu diretório de spec. A primeira referência publicada já apontará para uma árvore protegida. Abrir três PRs Draft para development. Não empilhar A sobre B/C nem importar setup. Os PRs são recipientes de implementação futura, não declaração de feature concluída.

## Reserva e fronteiras de edição

| Owner | Branch / spec | Escopo e ownership de produto posterior |
| --- | --- | --- |
| A | feat/ajustes-navegacao-conta / specs/035-ajustes-navegacao-conta | UI-01, UI-05, UI-06 no shell, navegação, workspace e acesso à conta; layouts privados necessários e testes próprios |
| B | feat/ajustes-area-coletas-ihfr / specs/036-ajustes-area-coletas-ihfr | UI-02–UI-04, UI-06 em detalhe da área/coleta, listagem/leitura de coletas e apresentação IHFR/ambientais; sem alterar motor científico |
| C | feat/localizacao-endereco-opcional / specs/037-localizacao-endereco-opcional | UI-07: formulário de localização/cadastro da área, entrada de coordenadas, endereço opcional e geocodificação; DTO/persistência mínima somente se necessária |
| Coordenador | guards e interfaces compartilhadas | Único integrador de deltas compartilhados, mediante patches dos owners; nenhuma alteração de produto em G0 |

B não edita o formulário de localização reservado a C; C não reorganiza o detalhe da área de B. A é o writer do shell/layout: B adapta conteúdo ao contrato existente e propõe qualquer necessidade a A/coordenador. Caminhos concretos e AGENTS aplicáveis devem ser conferidos antes da implementação.

Arquivos sensíveis a colisão: estilos globais, componentes UI comuns, layouts, DTO/repositório de áreas, schema, package.json/lockfile, fixtures e configuração de testes. Nenhum owner pode modificá-los em paralelo por conveniência. Registrar pedido com arquivo/hunks/contrato/testes; o coordenador aloca um writer ou integra patch. Não renomear nem refatorar globalmente. `.specify/feature.json`, quando usado, é contexto local de cada execução, não um ponteiro global compartilhado entre A/B/C.

## Validação e evidência

Ver [preflight-and-validation.json](preflight-and-validation.json) e [validador reproduzível](validate-guards.py). O validador recebe diretórios base e candidato contendo vercel.json e rc-review.yml (aceita também o caminho .github/workflows/rc-review.yml). Extrair a base por `git show 9b8595d232842d401ce81bbc92c54dd543aa2829:<caminho>`; preservar bytes UTF-8/LF. Usa PyYAML já disponível no ambiente de validação, sem alterar dependências do projeto.

PASS estático: identidade Git blob das fontes; JSON sem chaves repetidas; YAML sem chaves repetidas; gramática da condição; equivalência dos filtros; 23 casos positivos e 10 negativos; restauração semântica integral do workflow ao remover os três nomes; preservação das 35 guardas e inclusão da documental; diff/whitespace.

Os quinze gates são RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap e SchemaAudit. O runner original `scripts/rc-review-validation.ps1`, blob `86d2720fd6359a0971fe28f142a7a8b7ed758142`, não é editado. Mantém banco sintético próprio, ACL, ambiente sintético, limpeza das variáveis SMTP e fail-fast.

Actionlint: NOT_RUN (não instalado). Suíte funcional, comparação visual e aceite humano: NOT_RUN por este teste estático. Consultar runs reais por SHA/evento push após publicar as features; não usar ausência de runs de pull_request como prova de que push não executou. Guards não é acrescentada ao filtro funcional. Configuração false é controle preventivo; não é ensaio operacional do provedor.

## Integração futura e pontos de parada

RECOMENDACAO: revisar/integrar guards primeiro; #44 pode integrar independentemente, conciliando a união das entradas false. Depois A; B valida seu conteúdo com o shell final de A antes do merge quando houver dependência. C pode avançar em paralelo e integrar após guards, com coordenação de DTO/formulário. Todos os destinos finais permanecem development.

Cada PR deve informar `git diff GUARD_SHA...HEAD` (exclusivo) e `git diff development...HEAD` (acumulado), SHAs reais, arquivos, testes e limitações. Antes da integração futura, refazer a comparação na base atual, preservar guardas concorrentes e revisar a propriedade de cada hunk. Se guards for integrado por squash/rebase, transportar somente os commits exclusivos posteriores a GUARD_SHA após autorização, sem duplicar/reverter configurações. Nenhum merge é executado para resolver dependências nesta missão.

Parar apenas o recorte afetado por conflito material, movimento concorrente de ref ou escrita não autorizada. Não produzir aprovação humana nem revisão independente fictícia. REV-01–REV-03, deploy, main/development, Neon, banco hospedado, SMTP, Cloudinary e alterações científicas permanecem proibidos.

## Handoff e encerramento

A/B/C devem completar a especificação técnica, plano e tarefas nas reservas próprias, implementar somente seu recorte, executar os critérios da PR #44 e registrar testes/capturas por SHA/run/tentativa. Os artefatos iniciais de G0 distinguem decisões aprovadas, recomendações de engenharia e testes ainda não realizados.

Histórico: preflight e validação estática concluídos em 2026-10-31; esta versão congela a preparação antes da publicação das referências. Recibos de publicação, HEADs finais, PRs, resultados de leitura remota e estado PASS_G0_READY ou bloqueio pertencem ao fechamento do PR G0 e ao handoff da sessão, sem reescrever este corte. Prontidão G0 não significa produto implementado, quinze gates aprovados, aceite visual ou autorização de merge/deploy.
