# Prompt autossuficiente — primeira incorporação visual do login

Este prompt é para a execução futura por outro desenvolvedor, com seu próprio
Codex, quando Pedro lhe entregar o plano para executar. Não é autorização para
implementar durante a preparação documental de 18/10/2026. Escopo da primeira
entrega escolhido por Pedro: **adaptar o visual do login mantendo autenticação real**.

## Contexto já preparado por Pedro

Pedro e seu Codex executaram inventário, fetch e FF local seguro, reconstrução da
RC, revisão dos seis PRs e validação de prontidão em 18/10/2026. Em continuação
expressamente autorizada, concluíram também a organização da pilha #2–#7 e a
publicação da documentação de preparação em branch/PR próprios para revisão.
Conclusão: **PRONTO PARA PLANEJAR A INCORPORAÇÃO**, no corte abaixo.
Você não recebe sincronização/revisão pendente daquela execução como tarefa.
A conferência inicial é apenas para detectar deriva desde a entrega.

- Destino oficial: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git
  — branch development, SHA
  `e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8`.
- Referência visual oficial, somente leitura:
  https://github.com/HidroFlorestaStartup/hidroflorestas-frontend-starter.git
  — main, SHA `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.
- A development integra o candidato aprovado
  `0f669b79a5e73a329832593229c2557d8b12bbce` pelo merge funcional118a3a8,
  cujos pais são beba96f/0f669b7 e cuja árvore é9cde83df95785cf6115d489ca6e3584268cb6fcc.
  Depois, os merges documentais #6/ebbd9cb e #7/e17f64a acrescentaram28 caminhos
  somente em docs. Árvore atual178f0e468aee4f38444a9d1370876987d4243738;
  código/testes/specs/migrations/dependências/configuração continuam idênticos ao
  corte funcional validado. Main continua beba96f; não promover development para main.
- RC release/cri-rc-20261010 em
  `5ea982374e787e2f9844453add317f3949be4f8a` acrescentou parecer/README;
  review/cri-rc-validation-20261012 em
  `a01857b3d1a44fc0668054d03096d743ba0aede0` conservou26 documentos/evidências
  independentes. Ambos os conjuntos já foram preservados em development.
- PRs2–5: CLOSED sem novo merge, heads ancestrais de development, com comentários
  de rastreabilidade; nenhuma branch excluída. PR6: base development, APPROVED de
  Pedro no head5ea9823 (review5561665473, registro por assistente autorizado),
  MERGED em `ebbd9cb707ac2db98c56ad1ba5f344802233057c`. PR7: base development,
  sem autoaprovação ou review inventada, MERGED em
  `e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8`. Descrições anteriores, reviews,
  thread4 e FAILs históricos preservados. Pedro declarou que Luciano já revisou;
  isso é declaração de Pedro, sem evento APPROVED fabricado de Luciano.
  **A gestão preparatória destes seis PRs está concluída; não é tarefa sua.**
- Starter PRs1/2 merged em 09/10; main cbb954a inclui a correção do login
  demonstrativo em HTTP local. Esse login é mock, não autenticação do produto.

Validação da preparação: Node24.19.0/npm ci/Prisma7.4.2, Unit296+Mail17 e
provider/transações com fakes15/15 PASS; typecheck PASS; lint0erros/3avisos
preexistentes. Build local FAIL por Google Fonts/porta Turbopack; não é PASS.
CI exato do candidato: run39064686503 SUCCESS. CI da RC atual: run39071712863
SUCCESS, artefato12116150353 inspecionado, 15/15 gates: Integration218,
Migration37, Contract6, E2E72, HTTPS2, Deletion3, Ihfr6, Bootstrap14, audit0,
Build/Typecheck/Lint/Unit/R1/Setup. Reuso justificado por igualdade de todos os
arquivos fora de docs. Nenhum teste local de banco nesta preparação; nenhum
serviço real homologado. Falhas históricas e reruns continuam preservados.

Checks dos heads documentais5ea9823/a01857b: validate/SUCCESS conferidos.
Checks Vercel Preview Comments e status automático Vercel/SUCCESS observados nos
dois merges, sem disparo manual de deploy. Não equivalem a nova bateria funcional,
homologação real ou autorização produtiva. O CI RC não roda em development.

O FullStack é Next16.3.8/App Router, React19, Tailwind4, TypeScript,
Prisma/PostgreSQL, Node24.19.0/npm/package-lock. O starter é Vite/TanStack
Start/Router/Query, Bun1.3.11/bun.lock e Node>=22.12.0. Adaptar apresentação
para a arquitetura do destino. Não trocar de framework/lockfile.

## Conferência inicial e branch

1. Leia AGENTS.md aplicáveis, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md,
   constituição e política de fontes. Leia os guias Next relevantes instalados em
   node_modules/next/dist/docs antes de escrever código. Confira origin de cada
   clone: não usar o antigo repositório de outro proprietário como destino.
2. Registre status, upstreams, worktrees e HEADs; preserve tudo que já existir.
   Faça fetch de origin dos dois oficiais e confira os SHAs entregues. Se houver
   avanço apenas documental, registre o diff e mantenha o recorte; se houver
   alteração funcional/contratual material, pare e devolva a Pedro o diagnóstico
   para atualizar a base autorizada. Não faça rebase/reset/stash automático.
3. Crie worktree limpa e branch `feat/frontend-login` de origin/development
   verificada (ou nome livre equivalente se já existir trabalho nesse nome).
   Não escrever diretamente em development/main nem no starter. Se o prompt
   chegar como arquivo fora da branch de desenvolvimento, trate-o como contexto
   entregue por Pedro; não merge a branch documental para iniciar o visual.
4. Materialize este recorte já planejado em spec.md/plan.md/tasks.md de um
   diretório livre em specs, usando as skills speckit-* instaladas no destino,
   preservando IDs/artefatos existentes e critérios abaixo. Não refazer a revisão
   dos seis PRs nem transferir a si as ações remotas que ficaram com Pedro.

## Primeira entrega, estritamente delimitada

Origem visual: `src/routes/login.tsx`, partes puras de `src/styles.css`,
`src/components/hf/primitives.tsx` e `src/components/ui/button.tsx` do starter.
Destino: `src/app/login/page.tsx` do FullStack. Se ajudar a revisão, extraia somente
apresentação para novo `src/components/account/login-presentation.tsx` e estilo
local correspondente. Preserve marca existente `src/assets/logo/logo-hf.png` e
Poppins já carregada por `src/app/layout.tsx`.

Preserve `useAuth().signIn` e o fluxo em `src/contexts/auth.context.tsx`, incluindo
POST `/api/auth/sign-in`, envelopes públicos, credentials/include, loading,
erro e destination retornado pelo servidor, `/verify-email` quando indicado,
cookies HttpOnly e retorno para `/workspace` conforme contrato. Não editar
contexto/backend para simplificar o visual. Preserve links reais `/register` e
`/forgot-password`, mostrar/ocultar senha, preenchimento e validação atual;
não alterar política/normalização da senha nem trocar autenticação por mock.

Adapte Link/to de TanStack para next/link/href. Não importar `Route`,
useNavigate, QueryClient, useSession do starter, adapter/index.ts/mock.ts,
demo/scenario.ts, DemoPanel, contas/personas, fixtures ou reporting Lovable.
primitives.tsx importa ApiError do adapter: extraia visual puro e examine todos
os imports transitivos. Não copie o arquivo inteiro.

Não instalar o conjunto de dependências do starter, substituir globals.css ou
layout raiz, mudar fonte/metadata global, marca institucional, política de conta,
middleware, autorização, API, schema/migration, lockfile, Vercel, ciência ou
serviços reais. Outras telas ficam para os próximos recortes revistos por Pedro.

## Aceite e verificação do PR

- Login continua real, sem qualquer conta/sessão demonstrativa ou navegação
  automática de cadastro mock; resultado vem do servidor. Preservar informação
  de erro, campos, estado ocupado e bloqueio de envio duplicado.
- Verificar credencial inválida, conta bloqueada, conta ACTIVE verificada e
  destino verify-email; mostrar senha, links, Enter/Tab/Shift+Tab, foco visível,
  labels/erro anunciados. Somente dados sintéticos autorizados.
- Capturas antes/depois em 375/768/1440px, sem overflow ou foco encoberto;
  reflow/zoom e comportamento de hidratação testados quando alterados. Não
  afirmar acessibilidade integral com base em capturas.
- Node24.19.0/npm ci, Prisma generate, typecheck, lint e build padrão; unitários
  e E2E/HTTPS de conta existentes pertinentes à mudança. Banco exclusivamente
  no harness sintético previsto, guardas intactas. No Windows, entradas
  documentadas: scripts/accounts-local-postgresql.ps1 e
  scripts/rc-review-validation.ps1. Não usar runner full-ui hospedado em cluster
  local, nem banco normal, nem afrouxar assertions/timeouts/allowlists.
- Registrar comandos, SHA/arquivos testados, resultado e testes não realizados.
  Falhas de ambiente precisam de evidência e encaminhamento; build local não
  executado ou FAIL não vira PASS por declaração. Rerun de falha não apaga
  resultado anterior. Use CI de arquivos efetivamente equivalentes se aplicável.
- git diff --check, revisão de escopo/imports/segredos, nenhuma modificação
  alheia incorporada. Testes novos só quando cobrirem comportamento material;
  não espelhar classes/CSS em assertions artificiais.

## Paradas e entrega

Pare o recorte afetado se houver regressão material, contrato/fluxo real
incompatível, falta de evidência, necessidade de mudança de backend/persistência,
credencial/provedor real ou decisão de produto/ciência ausente. Não implemente
correção de outra feature silenciosamente nem altere guardas para obter verde.

As capacidades reais que deverão permanecer durante toda a sequência futura:
autenticação/verificação/reset/troca/exclusão, autorização contextual/global,
laboratórios/áreas/coletas/instantes, ambientais/drafts com hidratação/consumo/
rollback, capa privada/feature-off/retry/cleanup, mapa e IHFR persistidos.
O IHFR é CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

Entregue commit(s) pequenos e PR **para development**, com problema/resultado,
origem visual, caminhos alterados, capturas, validações e limites. Publicar
somente a branch de incorporação quando o mandato futuro de Pedro autorizar
push/PR; na ausência dele, entregue branch/commit e descrição local prontos.
Não merge nem faça push nas principais, rebase/force push, retarget/fechamento/
aprovação dos PRs antigos ou resolução de threads. Merge é do mantenedor.
Não iniciar a etapa seguinte automaticamente após o primeiro PR.

Para recuperação: alteração só de apresentação em commits isolados; antes de
merge, revisar/retirar o recorte sem tocar nos fluxos reais. Depois de merge,
eventual revert normal depende do mantenedor; nunca reset/force push. Não há
rollback de banco a executar neste recorte visual.

Documentos da preparação de Pedro: acompanhamento, relatório, revisão dos PRs,
evidencias.json, conclusao-dos-prs.json e plano-de-incorporacao.md no diretório
`docs/plans/active/preparacao-incorporacao-frontend-20261018/` da branch
`docs/preparacao-frontend-20261018`, cuja publicação e PR para development foram
autorizados na continuação de18/10/2026. O [PR documental8](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/8)
está aberto para revisão, sem merge automático. Preserve o commit original
dcc54e1 e o histórico subsequente. A base de execução continua sendo a development
verificada; não integrar o PR documental por iniciativa própria para começar o login.
Este prompt contém os dados essenciais para uso sem acesso ao chat ou à branch
documental; Pedro deve fornecer o plano junto para revisar as etapas posteriores.
