# Plano de incorporação do frontend

## Estado vigente — login integrado; fases 2 e 3 autorizadas em 18/10/2026

Estado: `EM_ANDAMENTO` para a incorporação; fase 1 `CONCLUIDO`; fases 2 e 3
autorizadas e ainda não implementadas por esta preparação. Fases 4–10 permanecem
`PROPOSTA`, aguardando decisão própria. O registro anterior, preservado ao final,
descreve o mandato e o corte de sua época, sem limitar a autorização atual.

`DECISAO_CONFIRMADA`: origem no pedido de Pedro “sincronização, merges #8/#9 e
handoff das fases 2 e 3”, anexado ao seu Codex em 18/10/2026. Pedro autorizou o
outro desenvolvedor, com seu Codex, a **implementar, validar, commitar, fazer push
e abrir/atualizar PRs das fases 2 e 3 completas**, sem confirmação adicional nas
operações normais. Substitui a proposta limitada ao cadastro e a espera de nova
autorização de execução depois do login. **Aceite humano e merge continuam com
o mantenedor**. Nenhuma autorização para fase 4 em diante, main ou operação real.

`EVIDENCIA_IMPLEMENTACAO`: preparação #8 integrada pelo merge
`cf7f086351c952be5b7cc51f9616bc68bfd84f4d`, head
`95463d5b0a29d75e916d2115765792444438db44`; login/Spec017 #9 integrado pelo merge
`afef5db6ced1a4604a114d842bf85950ac32c69b`, head
`550308247d712c920dede8d96b5f1e6140767d10`. Este é o novo corte de
origin/development; árvore `0210b54b648b42e38fea853e650061463c3fd365`.
Main local/remota permanece `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`.
Starter main reconferida em `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.

Login real mantém signIn/payload/senha/destinos, hidratação/trava de envio,
aria-invalid por campo somente na validação local e erro geral no alerta.
AuthContext/API/banco/globals/layout/dependências sem diff; CSS local, marca e
Poppins mantidas. APPROVED de Pedro registrado por Codex autorizado na
[review5564336503](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/9#pullrequestreview-5564336503).
Não houve autoaprovação de #8, teste manual ou revisão de terceiro inventados.

CI do head5503082: [validate/SUCCESS](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39145086835/job/117727186936),
artefato12143033430 inspecionado,15 gates PASS; E2E86/login14, HTTPS2, IHFR6.
Equivalência da árvore integrada comprovada para código/testes/configuração;
nenhuma nova bateria só pelo merge documental. Ressalva aceita por Pedro:
CI292dd95 falhou nos seis IHFR, causa não demonstrada; acba40d/5503082 PASS não
provam correção. Preservar esse histórico e registrar recorrência material.

[PR documental10](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/10) aberto para development,
sem merge nesta preparação. O handoff pode ser usado diretamente nesta branch.

## Sequência vigente e critérios

| Fase | Estado e execução | Critério de entrega |
|---|---|---|
| 1. Login real / Spec017 | CONCLUIDO em #9, integrado após #8 | Head revisado e aprovado, CI exato e contratos preservados; ressalva IHFR mantida |
| 2. Cadastro e conjunto de conta | AUTORIZADO para outro desenvolvedor | Cadastro, verificação, recuperação/redefinição, troca e exclusão completos; signUp/Idempotency-Key, senha original, verify-email, provas, sessões e blockers reais; capturas e validações próprias; commits/push/PR |
| 3. Workspace e shell | AUTORIZADO na mesma missão, após validação técnica da fase2 | Workspace/sidebar/top-bar/layouts/navegação/logout desktop/mobile; contexto, seleção, permissões e guardas reais; integração com telas antigas; capturas, regressão e commits/push/PR |
| 4–10. Demais recortes do mapa histórico abaixo | PROPOSTA; execução não autorizada neste mandato | Decisão posterior; não implementar conteúdo dessas telas ao adaptar o shell |

Instrução principal para execução: **[prompt-de-execucao-fases-2-3.md](prompt-de-execucao-fases-2-3.md)**.
O prompt anterior é histórico da fase1 concluída. O novo arquivo contém bases,
autorização, caminhos, critérios, contratos, CI e entrega sem depender deste chat
ou da análise externa “revisao-prs-8-9-e-proxima-etapa.md”, que não foi incorporada.

`RECOMENDACAO`: uma branch/spec/PR por fase, nos próximos diretórios **livres**
do Spec Kit, sem presumir018/019. Iniciar da development verificada; registrar
SHA e deriva. Se a fase2 estiver merged, fase3 parte da development atualizada.
Se aguardar merge e houver dependência, fase3 parte do head validado da fase2,
com PR empilhado temporariamente contra a branch da fase2, dependência explícita
e destino final development. Após merge pelo mantenedor, reconferir diff/CI e
retarget quando cabível, preservando commits e branch-base enquanto necessária.
Sem dependência de código, branches independentes exigem comprovar o conjunto e
evitar duplicação compartilhada. Não parar depois do primeiro PR por falta de
autorização de execução já concedida. Não delegar merge ao executor.

Preservar marca/fonte, Next/App Router, serviços reais e Node/npm/lockfile.
Starter é referência visual TanStack; sem adapters/mocks/personas/roteador ou
reporting Lovable. Não substituir globals/layout raiz, instalar o pacote inteiro
de dependências, mudar schema/ciência/drafts/capas/mapa/administração funcional
ou ativar provedores reais. Biblioteca nova/alteração funcional material exige
justificativa e tratamento próprio. Usar guias Next instalados e estilos focais.

Antes do primeiro push de cada branch, incluí-la no trigger **e** no if do job
RC e excluir o preview por branch, preservando15 gates/Actions/runners/guards.
Node24.19/npm ci/Prisma/typecheck/lint/build padrão; harness sintético oficial e
CI do head exato, inclusive fase3 empilhada. Não usar -InitializeCiCluster fora
do runner isolado Actions nem E2E focal fora do ambiente completo exigido.
Capturas reais375/768/1440 e reflow320/texto ampliado, estados/foco/teclado;
publicar somente evidências sintéticas sanitizadas. Screenshot não prova leitor
de tela manual; transporte sintético não prova Gmail real.

Paradas: novo defeito/regressão material, conflito que ameace preservação,
regra/permissão impeditiva ou decisão necessária de produto/domínio/ciência.
Homologações externas históricas conservam seu alcance, sem bloquear
automaticamente a apresentação. Qualificadores IHFR mantidos. Resultados e
pendências no [relatório](relatorio-de-prontidao.md) e
[acompanhamento](plano-de-acompanhamento.md).

## Registro histórico anterior — preservado, substituído nos pontos acima

As orientações abaixo sobre “somente login”, branches sempre de development e
espera de autorização após login descrevem o mandato anterior. Para fases2/3,
prevalecem a decisão atual e a estratégia de PRs acima; o mapa de fases4–10
permanece proposta. Bases e resultados antigos não descrevem a ponta atual.

Estado: `AGUARDANDO_REVISAO` por Pedro para as etapas posteriores ao login.
`DECISAO_CONFIRMADA`: Pedro escolheu **login com autenticação real** como primeira
entrega, em resposta nesta sessão de 18/10/2026. Isso delimita o recorte inicial;
não aprova antecipadamente marca/copy definitivos, dependências ou merges futuros.

`DECISAO_CONFIRMADA`: no pedido de atualização deste plano em 18/10/2026, Pedro
autorizou o executor a **implementar, validar, fazer commits, push na branch de
incorporação e abrir ou atualizar PR para development, sem autorização ou
confirmação adicional para essas operações**, no recorte da primeira entrega.
A revisão das etapas posteriores não bloqueia a execução do login. O merge
permanece sob decisão do mantenedor.

`RECOMENDACAO`: adaptar a proposta visual em incrementos para o FullStack;
conservar serviços, contratos e comportamento persistido existentes. O executor
pode seguir com a primeira entrega e suas validações, commits, push e PR dentro
da autorização acima. Preparação e revisão dos PRs foram executadas por Pedro com
seu Codex, conforme [relatório](relatorio-de-prontidao.md), e não integram a fila
de tarefas desse desenvolvedor.

## Bases, arquitetura e origem visual

- Destino: `HidroFlorestaStartup/HidroFlorestas-FullStack`, development
  e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8, código funcional equivalente ao
  corte validado118a3a8/0f669b7. Merges posteriores #6/ebbd9cb e #7/e17f64a
  acrescentaram somente28 caminhos documentais; árvore atual178f0e468aee4f38444a9d1370876987d4243738.
  Next.js 16.3.8/App Router, React19.2.4, TypeScript, Tailwind4, Prisma/PostgreSQL;
  npm/package-lock e Node24.19.0.
- Origem de leitura: `HidroFlorestaStartup/hidroflorestas-frontend-starter`, main
  cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f. Vite8/TanStack Start/Router/Query,
  React19/Tailwind4, Bun1.3.11/bun.lock, Node>=22.12.0. PRs1/2 merged em 09/10;
  Git e API confirmam esses merges e nenhum commit posterior a cbb954a no corte.
  Não usar uma branch antiga de trabalho como fonte nem levar Bun ao FullStack.

`EVIDENCIA_IMPLEMENTACAO`: starter `src/adapter/index.ts` exporta mockApi de
`mock.ts`. `use-session.ts` deriva sessão do cenário demonstrativo. `register.tsx`
navega diretamente para workspace após signup mock; o FullStack usa destinos
autorizados do servidor, inclusive verify-email. `__root.tsx` conecta DemoPanel,
QueryClient, roteador e reporting Lovable. Nada disso é substituto do backend real.

Referência visual estática: `src/styles.css`, `components/hf/primitives.tsx`,
`components/hf/AppShell.tsx`, rotas e componentes ui do starter. Inspecionadas
também as capturas históricas versionadas landing-1440.png e workspace-375.png
em `docs/validacao/resultado/`; isso não é nova homologação de browser.

Reaproveitável com adaptação: composição, espaçamento, cores semânticas, cartões,
hierarquia, ícones já disponíveis, estados acessíveis, tabelas/diálogos e reflow.
Dependente de mocks: sessão/personas, dados/resultados, permissões calculadas no
cliente, operações e simulações de erro. Não transportar esses mecanismos.

## Mapa concreto de origem e destino

Todos os caminhos são relativos a cada repositório. Na tabela, `S` significa
`src/routes/` no starter; `L` significa
`src/app/(private)/dashboard/laboratories/[laboratoryId]` no FullStack.
`$laboratoryId/$areaId/$collectionId` são parâmetros TanStack; `[laboratoryId]`,
`[areaId]`, `[collectionId]` são os segmentos existentes no App Router.

| Tela/fluxo | Origem no starter | Destino real FullStack e comportamento a conservar |
|---|---|---|
| Login, primeira entrega | S/login.tsx; styles.css; ui/button.tsx e hf/primitives.tsx, somente partes puras | src/app/login/page.tsx; useAuth/signIn em src/contexts/auth.context.tsx. Preservar /api/auth/sign-in, destino do servidor, loading/erro, credenciais e cookies reais; eliminar personas/demo na adaptação |
| Cadastro | S/register.tsx | src/app/register/page.tsx; contexto auth e Idempotency-Key; fluxo real para /verify-email. Não copiar navegação mock para workspace |
| Verificação/recuperação/troca/exclusão | Sem equivalentes completos | src/app/verify-email, forgot-password, reset-password; src/app/(private)/change-password; src/app/(public)/delete-account, todos com page.tsx; src/components/account/*-form.tsx, account-client.ts/account-shell.tsx. Adaptar apenas visual; preservar prova, expiração, reenvio, revogação, blockers e aceite explícito |
| Logout e proteção | S/logout.tsx; hf/AppShell.tsx | src/app/logout/page.tsx; src/app/(private)/layout.tsx; auth.context.tsx/AuthSessionRestorer. Servidor requireAuth, POST/logout e recuperação de sessão/bfcache não viram guard mock |
| Landing pública | S/index.tsx | src/app/page.tsx. Composição reutilizável; textos institucionais/claims não são requisitos aprovados só por existirem; definir revisão de copy antes de alterá-los |
| Shell/navegação | hf/AppShell.tsx; S/dashboard.laboratories.$laboratoryId.tsx; features/lab/useLab.ts | src/components/sidebar, top-bar, admin-shell, workspace/laboratory-context.tsx e layouts atuais. next/link e next/navigation, children/layouts; manter contexto, logout desktop/mobile, acesso global separado do contextual |
| Workspace/laboratórios | S/workspace.tsx | src/app/(private)/workspace/page.tsx; src/components/workspace/laboratory-workspace.tsx e src/app/api/server/services/laboratories.service.ts. Seleção explícita, limite/CRUD/confirmar/inativo reais; convite não implementado não vira ação ativa |
| Resumo/histórico | S/dashboard.index.tsx, dashboard.collects.tsx, dashboard.laboratories.$laboratoryId.index.tsx | src/app/(private)/dashboard/page.tsx, dashboard/collects/page.tsx e L/page.tsx; components/dashboard/dashboard-summary.tsx e dashboard-history.tsx. Sem indicadores sintéticos nem gráficos sem contrato |
| Membros | S/dashboard.laboratories.$laboratoryId.members.tsx | L/members/page.tsx; components/laboratories/laboratory-memberships.tsx. Permissões atuais do servidor, revisão de papel, OWNER/contexto real |
| Lista/criação de áreas | S/dashboard.laboratories.$laboratoryId.areas.index.tsx e .areas.new.tsx | L/areas/page.tsx e areas/new/page.tsx; components/areas/area-list.tsx, area-form.tsx, area-form-state.ts. DTO real, coordenadas/geolocalização tardia, UF livre, revisão e validações atuais |
| Detalhe/capa | S/dashboard.laboratories.$laboratoryId.areas.$areaId.index.tsx (sem editor privado completo) | L/areas/[areaId]/page.tsx; components/areas/area-cover.tsx. Manter AreaCoverEditor/Preview, featureEnabled/canEdit/hasImage, upload/confirmação/remoção/leitura proxy e retry na mesma revisão. Detail não herda automaticamente a projeção cover da lista |
| Criar coleta/detalhe | S/dashboard.laboratories.$laboratoryId.areas.$areaId.collections.new.tsx e .collections.$collectionId.index.tsx | L/areas/[areaId]/collections/new/page.tsx e collections/[collectionId]/page.tsx; components/collections/*. Instante/offset/milissegundos, revisão, idempotência/recuperação e confirmação imutável |
| Dados ambientais | S/dashboard.laboratories.$laboratoryId.areas.$areaId.collections.$collectionId.environmental-data.new.tsx e .environmental-data.index.tsx; features/environmental/EnvView.tsx | L/areas/[areaId]/collections/[collectionId]/environmental-data/new/page.tsx e environmental-data/page.tsx; components/environmental-data/*. Preservar contrato, semântica false/zero/ausência, condicionais e tentativa incerta |
| Draft pessoal persistido | Sem equivalente completo no starter | components/environmental-data/environmental-draft-actions.tsx e environmental-data-form.tsx; src/types/environmental-draft.ts e API/draft real. Controles após hidratação, save explícito, baseline/touched, OCC, duas abas, descarte, consumo/rollback; nada parcial no IHFR |
| IHFR | features/ihfr/IhfrPanel.tsx; domain/types.ts/labels.ts, apenas apresentação compatível | components/ihfr-diagnosis/ihfr-diagnosis-management.tsx, experimental-diagnosis-summary.tsx e no-current-diagnosis.tsx; detalhe da coleta. Elegibilidade, CREATE/REPLACE/REVOKE, versões/hash, suplemento, vigência e recuperação reais; sem scores de fixtures |
| Mapa | S/dashboard.laboratories.$laboratoryId.map.tsx; hf/map/MapView.tsx e LeafletMap.tsx | L/map/page.tsx; components/territorial-map/*, components/areas/area-map*. Manter módulo cliente/SSR, atribuição, tiles configurados, lista alternativa e escopo autorizado; sem segundo motor do mapa |
| Administração | S/admin.tsx, admin.index.tsx, admin.users.tsx; dashboard.admin.users.tsx (atalho) | src/app/(private)/admin/page.tsx, admin/users/page.tsx e dashboard/admin/users/page.tsx; components/user-administration/user-administration-page.tsx e admin-shell/admin-shell.tsx. Busca/cursor/revisão/conflito/auditoria/envelopes e role global reais |

## Estilos, assets e imports

Adaptar cores/sombras de `src/styles.css` por componente ou módulo CSS delimitado.
Não importar o arquivo inteiro: inclui @source, animações e tokens globais que
afetariam telas ainda não incorporadas. FullStack já usa Poppins em
src/app/layout.tsx; não acrescentar outra fonte externa nem trocar o root layout
como efeito colateral do login. O CSS global atual possui transição universal:
qualquer correção global futura exige recorte/validação explícitos.

Starter tem public/favicon.ico e robots.txt; a marca em primitives/Brand é textual
e explicitamente temporária. FullStack já possui src/assets/logo/logo-hf.png,
logo.png/white-logo.png, src/assets/auth/register-background.png e imagens
em src/assets/lading-page/. Não substituir a marca institucional por wordmark
temporário. Preservar os assets atuais no primeiro recorte; marca/copy definitivos
continuam para decisão de Pedro quando materialmente necessários.

Recortar partes puras de primitives/ui exige conferir o grafo de imports:
primitives.tsx importa ApiError do adapter, além de Link TanStack. Não copiar o
arquivo inteiro nem o alias @/adapter. Trocar Link/to por next/link/href; adaptar
useNavigate/Route.useParams/Outlet/ClientOnly para as APIs Next instaladas.
Não instalar o conjunto Radix/shadcn/TanStack, Recharts, Nitro ou Vite no destino.
Dependência nova realmente necessária deve ter justificativa no recorte aprovado;
não criar uma segunda camada de contratos/parsers por conveniência visual.

## Etapas pequenas, aceite, validação e recuperação

Cada etapa usa branch própria a partir da development então verificada, spec/
plan/tasks no próximo diretório livre pelo Spec Kit instalado e PR pequeno para
development. O desenvolvedor materializa o recorte já planejado, sem refazer a
preparação/revisão dos PRs desta rodada. Pedro revisa cada entrega; mantenedor
decide merge. Demais etapas abaixo são `RECOMENDACAO`, aguardando revisão.

| Etapa | Origem → destino / dependência | Aceite e validação | Recuperação |
|---|---|---|---|
| 1. Login real — execução autorizada por Pedro | S/login.tsx → src/app/login/page.tsx; partes puras de styles/primitives; nova apresentação local opcional em components/account/login-presentation.tsx | Mesmo signIn/contexto/API/destino; credencial inválida, conta bloqueada, ACTIVE verificada e destino verify-email; loading/erro, senha visível, Enter/Tab e links reais. 375/768/1440px, zoom/reflow, foco visível e labels. Typecheck/lint/build + unit/contas/HTTPS pertinentes em harness sintético; capturas antes/depois | Commit isolado de apresentação; antes do merge retirar/revisar esse commit sem tocar no backend. Depois de merge só revert normal autorizado, sem reset/force. Abrir ou atualizar o PR do login; não avançar etapas seguintes automaticamente |
| 2. Cadastro e conjunto de conta | Register visual + palette da etapa1 → register e account-shell/forms existentes; após aceite1 | Cadastro → verificação → uso, reenvio/reset/troca/revogação/exclusão e blockers sem alterar estados; testes de conta existentes com transporte sintético e HTTPS. Nenhuma prova de e-mail real inferida | PRs separados de cadastro e das demais telas se necessário; preservar endpoints/challenges/migrations |
| 3. Workspace e shell | AppShell/workspace/primitives → componentes workspace/sidebar/top-bar e layouts; após conta | Contexto explícito, saída móvel/desktop, sem bypass global, retorno/histórico/sem sessão/inativo; dados reais, vazio/erro/retry e keyboard | Alterações de shell isoladas de fluxos de dados; comparar outras páginas ainda no visual anterior |
| 4. Laboratório, dashboard, histórico e membros | Rotas de resumo/membros → componentes já listados; depende3 | CRUD/limite/cancelamentos/papéis/concorrência preservados; não transformar placeholders em capacidades; E2E contextual e contratos | Pequeno PR por tela ou grupo de leitura; não migrar regras para cliente |
| 5. Áreas e capa | Rotas de áreas + cards → area-list/form/detail mantendo area-cover; depende3/4 | Coordenadas/UF/revisão; capa privada, feature-off, fallback/reload mesmo revision, upload/progresso/confirmar/remover/conflito; unit/Ajv + E2E capas/fakes/Pg quando afetados | Preservar editor/serviço original e estados; não mudar revisão persistida para reparar preview; sem Cloudinary real |
| 6. Coletas | Rotas .collections.* → components/collections; depende5 | Fuso/offset/milisegundos, revisão/imutabilidade, timeout/recuperação/chave/corpo, papéis atuais; testes focais existentes | Não converter para Date/toISOString silenciosamente nem regenerar chave em tentativa incerta |
| 7. Ambientais e drafts | EnvView/form visual → environmental-data components; depende6 | False/0/null/ausência/vazio/12., campos condicionais, hidratação retardada primeiro PUT, duas abas/conflito/reload/descarte/rollback/consumo e histórico não salvo; Unit + Pg + E2E015/016 pertinentes | Manter controladores/parsers/serviços, alterar apresentação em commits independentes; qualquer perda de dado interrompe a etapa |
| 8. IHFR | IhfrPanel somente apresentação → ihfr-diagnosis components; depende7 | Elegibilidade real, suficiente/insuficiente/incompatível, vigente/substituído/revogado, recuperação mesma chave e ID esperado; todos os qualificadores científicos; seis testes dedicados sem afrouxar seletores/asserts | Não copiar cálculo/fixtures; conferir as duas regiões ARIA visíveis; manter versões/hash e resultados imutáveis |
| 9. Mapa e administração | Componentes mapa/admin → destinos listados; após3, contratos das telas mantidos; podem ser recortes independentes | SSR seguro/atribuição/fallback/permissões/tiles; admin global/cursor/conflito/auditoria, diálogos e mobile. E2E/contexto e acessibilidade de cada recorte | Um PR para mapa e outro para admin; conservar wrappers cliente/servidor, sem segundo adapter |
| 10. Landing e consolidação visual | index.tsx e tokens delimitados → src/app/page.tsx; após decisão de copy, não é dependência do login | Texto/claims revistos por Pedro, marca existente, links e rodapé; regressão de todas as jornadas já incorporadas, screenshots e navegadores efetivamente testados | Não sobrescrever conteúdo institucional por copy sintético; centralizar tokens globais só depois de medir impacto |

Não existe rollback de banco nessas etapas visuais: nenhum schema/migration novo
está planejado. Se surgir necessidade funcional, contratual ou persistida,
registrar achado e parar o recorte afetado para decisão/spec própria.

## Validação e limites operacionais

Usar Node24.19.0/npm/lockfile do FullStack, npm ci, Prisma generate, scripts
existentes; ler guias relevantes em node_modules/next/dist/docs antes de escrever
código. Build padrão, sem substituir Turbopack silenciosamente para conseguir verde.
Nesta preparação o build local falhou por rede/porta; o CI equivalente passou.
Uma falha igual na futura máquina precisa de diagnóstico registrado; falha de
produto, ausência de evidência equivalente ou build desconhecido impede entregar
aquele PR como validado. Não pedir ao executor que resolva esta preparação.

Banco/testes: somente harness sintético autorizado; no Windows,
scripts/accounts-local-postgresql.ps1 e scripts/rc-review-validation.ps1 são as
entradas documentadas. Nunca usar banco normal nem adaptar guards/allowlists.
Runners dedicados para exclusão/IHFR/HTTPS permanecem separados da suíte geral.
Se ambiente sintético adequado faltar, registrar teste não realizado e solicitar
encaminhamento a Pedro, sem instalar/operar serviços reais por inferência.

Cloudinary real, Gmail real, aceite humano, outros navegadores, migrations
hospedadas e deploy são gates separados de Pedro/mantenedor/operador. O executor
do visual não recebe gestão preparatória de PRs: #6/#7 já foram integrados e
#2–#5 encerrados por Pedro com seu Codex na continuação18/10. O IHFR mantém
CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Decisões e paradas

- Confirmado por Pedro nesta sessão: primeira entrega/login real, com execução,
  validação, commits, push na branch de incorporação e abertura ou atualização de
  PR para development autorizados sem confirmação adicional. Plano das demais
  etapas: proposta para revisão, não aprovação de execução integral.
- CONCLUIDO nesta continuação por autorização expressa de Pedro: preservação
  documental #6/#7 por merges em development e encerramento formal #2–#5.
  Descrições/reviews/FAILs históricos preservados; sem autoaprovação de #7 ou
  review fabricada de Luciano, cuja revisão foi relatada por Pedro.
- PENDENCIA_DE_DECISAO futura: marca/copy definitivos, gráficos adicionais,
  qualquer capacidade sem contrato ou biblioteca nova material. Não bloqueiam
  o login delimitado que preserva marca/fluxo atuais.
- Parar se refs mudarem materialmente, houver trabalho preexistente incompatível,
  perda de draft/contrato/permissão, tentativa incerta descartada, ciência alterada,
  dependência de provedor real ou escopo além do recorte autorizado. Diagnosticar
  e devolver evidência; não completar silenciosamente outra feature.

A gestão da pilha CRI e a publicação desta preparação documental estão concluídas.
A autorização atual permite ao executor implementar e validar o login, fazer
commits e push na branch de incorporação e abrir ou atualizar PR para development,
sem nova autorização ou confirmação. Os PRs de implementação e o PR documental
continuam sujeitos à revisão; a decisão de merge permanece com o mantenedor.
