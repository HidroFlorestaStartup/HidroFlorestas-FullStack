# Relatório da missão — fases 4 e 5

Registro anterior ao primeiro push da fase 5 em 19/10/2026. Classificação: EVIDENCIA_IMPLEMENTACAO para os resultados observados; FATO_DOCUMENTADO para o escopo autorizado pelo usuário. O recibo final de cada PR registra o HEAD publicado e o CI exato; este relatório não antecipa aprovação humana.

## PLAN

A worktree `C:/projetos/consolidados/HidroFlorestas-frontend-login` foi reutilizada sequencialmente. Estava limpa na branch antiga já integrada, `feat/frontend-workspace-shell@d555f9e6686228f0af38ff16f66598bdd75b1f89`; nenhuma implementação foi feita nessa branch. A fase 4 nasceu de `origin/development@c33bf50b510dd7af7ad59cde039839f56519c87e`. A fase 5 nasceu do HEAD publicado da fase 4, `7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d`.

Foram lidos integralmente a missão local e o handoff oficial de `origin/docs/handoff-frontend-fases-4-5@4144e12`, incluindo o adendo móvel. O starter `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` foi usado somente como referência visual, em leitura. Foram aplicadas as skills Spec Kit instaladas: specify → plan → tasks → analyze → implement, com scripts reais de preparação/pré-requisitos, templates, constituição, contratos, checklist e análise por feature.

| Fase | Spec | Branch | Base do PR |
|---|---|---|---|
| 4 | [020](../020-frontend-laboratory-dashboard/spec.md) | `feat/frontend-laboratory-dashboard` | `development` |
| 5 | [021](spec.md) | `feat/frontend-areas-cover` | temporariamente `feat/frontend-laboratory-dashboard`; destino final `development` |

Planos foram commitados antes dos testes e do produto. Na fase 5, 12 FR, 4 SC e 19 tarefas têm cobertura rastreada; a análise não encontrou lacuna material de requisito ou violação constitucional. O encerramento de publicação/CI de T019 é confirmado no recibo remoto para evitar um ciclo de commits documentais.

## EXECUTE

**Fase 4 — apontamento móvel.** A captura fullPage histórica, isoladamente, não provava inacessibilidade. A reprodução no Next real demonstrou defeito de layout em viewport: orientação 667×375, texto 200% e safe-area emulada de34px deixavam Configurações sob a navegação (bottom309,95/navtop215,22; hit-test falso). Há RED delimitado e correção de regiões próprias para cabeçalho, conteúdo rolável e navegação, com altura dinâmica e rótulos que podem quebrar linha, sem espaçador fixo.

A mudança do scroller foi acompanhada de restauração por pathname/escopo, Back/Forward, reload, mudanças de layout, conteúdo tardio, foco explícito/skip link, menu e limpeza após logout/exclusão confirmada. O cache por aba é limitado a50 caminhos e armazena somente pathname/offset; não representa restauração por entrada duplicada de histórico. Foram corrigidos REDs adicionais de retorno entre instâncias e exclusão por entrada documental, mantendo AuthContext e backend intactos.

GREEN por viewport real `fullPage:false`:375 e320, texto100/200%,3/4 atalhos, vazio/lista, início/meio/fim, clique/toque emulado, Tab/Shift+Tab, resize/orientação/safe-area emulada, e desktop768/1440. Conclusão: **defeito real confirmado e corrigido**; a composição fullPage não foi usada como prova geral. [Histórico e metadados móveis](../020-frontend-laboratory-dashboard/evidence/) e [review da fase4](../020-frontend-laboratory-dashboard/review.md).

**Fase 4 — laboratório/dashboard/histórico/membros.** Foram incorporados cards e apresentação contextual com contagens/DTOs/links reais. Cursor, paginação, ordem, refresh, respostas tardias e isolamento de laboratório foram preservados e exercitados. Membros preservam OWNER imutável, ADMIN global/contextual, MEMBER, expectedRole, lock e conflito409 sem falso sucesso; erro de leitura é separado do aviso de mutação para permitir retry real503→200. `/dashboard` e `/dashboard/collects` continuam redirecionando para `/workspace`, sem laboratório escolhido automaticamente. São12 testes novos de dashboard e4 móveis; os120 anteriores passaram na suíte136.

**Fase 5 — áreas e ponto.** Lista, formulário e detalhe SSR receberam apresentação delimitada. Foram preservados efeitos completos/AbortSignal, DTOs distintos, campos/opcionalidade, UF livre, zero/extremos/decimais, revisão manual, geolocalização10s/negação/timeout/tardia, lock, cancelamento, resposta incerta e link de coleta. Reducer, Leaflet, OSM/atribuição/configuração e separação client/SSR não têm alteração. Os tiles externos foram bloqueados nos testes novos; isso não prova disponibilidade do serviço de tiles.

**Fase 5 — capa.** Matriz featureEnabled × canEdit × hasImage com8 combinações, capacidade derivada do GET real e fakes de transporte explicitamente limitados aos testes. O produto mantém proxy privado, Image unoptimized, JPEG/PNG/WebP,10MiB/4096px, confirmação/reconciliação, progresso, remoção e OCC. Correções demonstradas em RED: chave/ticket/expectedRevision originais sobrevivem à incerteza e à recarga; confirmação persistida se distingue do carregamento dos bytes; onLoad antigo não conclui nem muda seleção/envio atual. EXPIRED/STALE_REVISION autoritativos permitem nova tentativa sem perder seleção. Retry de bytes conserva a revisão persistida.

A baseline inicial teve145PASS/7FAIL em152 E2E, com136 anteriores PASS. Cinco cenários eram REDs funcionais; dois eram defeitos do teste (escopo do alerta e contagem de GET em StrictMode), corrigidos antes da UI. A baseline corrigida teve11PASS/5FAIL no probe16. Não são cinco defeitos independentes: dois cenários tratam eventos antigos. Candidata local teve Typecheck FAIL por fechamento omitido de useEffect; restaurado exatamente à base antes de publicação como HEAD. Após15/16, CSS de status vazio foi corrigido e o review acrescentou RED17 de mensagem de loading permanente após falha de metadados. Obteve16PASS/1FAIL antes do catch focal e17/17 após. FAIL de coletor sem testes encontrados também foi preservado como erro de diagnóstico.

| Evidência da fase 5 | Resultado/alcance |
|---|---|
| [Baseline inicial](evidence/baseline-initial/) | E2E152 completo;145PASS/7FAIL |
| [Baseline corrigida](evidence/baseline-corrected/) | probe16;11PASS/5FAIL |
| [Compilação RED](evidence/candidate-compile-red/) | Typecheck FAIL; lint/browser não executados |
| [Primeiro candidato](evidence/candidate-first/) | probe16;15PASS/1FAIL |
| [RED adicional](evidence/reload-status-red/) | probe17;16PASS/1FAIL |
| [GREEN focal](evidence/local-focused-green/) | probe17;17PASS,56PNG+56JSON+2logs |
| [Regressão completa](evidence/local-full-reviewed/) |15 gates PASS; E2E153 completo |

Capturas before/after incluem375/768/1440 e320 com html font-size200% (sem zoom físico). Altura900 nos perfis responsivos; casos funcionais1280×720. JSONs registram viewport, rolagem do documento/conteúdo, foco e alvo; PNGs são de viewport. Campos preenchidos foram mascarados. Chromium140.0.7339.186/Playwright1.55.1. Sem alegar dispositivo físico, leitor de tela manual, conformidade WCAG integral ou operação real de Cloudinary.

Arquivos de produto/teste/configuração alterados, por fase:

Fase4:

- `.github/workflows/rc-review.yml`
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/members/page.tsx`
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/page.tsx`
- `src/app/(private)/dashboard/layout.tsx`
- `src/app/(private)/workspace/layout.tsx`
- `src/components/account/account-deletion-form.tsx`
- `src/components/dashboard/dashboard-history.tsx`
- `src/components/dashboard/dashboard-summary.tsx`
- `src/components/dashboard/dashboard.module.css`
- `src/components/laboratories/laboratory-memberships.tsx`
- `src/components/shell/application-shell.tsx`
- `src/components/shell/shell.module.css`
- `src/components/shell/use-content-scroll.ts`
- `tests/e2e/account-deletion.spec.ts`
- `tests/e2e/frontend-dashboard.spec.ts`
- `tests/e2e/frontend-mobile-navigation.spec.ts`
- `vercel.json`
- `specs/020-frontend-laboratory-dashboard/**` (Spec Kit, revisão e evidências com manifests).

Fase5:

- `.github/workflows/rc-review.yml`
- `src/app/(private)/dashboard/laboratories/[laboratoryId]/areas/[areaId]/page.tsx`
- `src/components/areas/area-cover.tsx`
- `src/components/areas/area-form.tsx`
- `src/components/areas/area-list.tsx`
- `src/components/areas/areas.module.css`
- `src/components/areas/cover.module.css`
- `tests/e2e/frontend-areas.spec.ts`
- `vercel.json`
- `specs/021-frontend-areas-cover/**` (Spec Kit, este relatório, revisão e evidências com manifests).

## REVIEW

Revisores separados, somente leitura, analisaram código, testes e bitmaps; nenhuma aprovação humana foi registrada. Na fase5, comparação completa de AreaForm preservou lógica e48 atributos JSX funcionais; AreaList preservou efeito inteiro/cleanup/dependências e10 atributos existentes. Detalhe SSR preservou requireAuth/service/notFound/projeção/opcionais/data/destinos. O review visual examinou34 PNGs after+6 before, sem novo P1/P2. Achados materiais foram corrigidos com RED/regressão e delta revisado; quebras de título e placeholder estreito já existiam no before e não foram classificados como regressão nova.

[Review detalhado](review.md) registra escopo, hashes e limites.114 hashes do GREEN focal foram conferidos sem divergência; textos históricos usam hash canônico UTF8/LF sem BOM e PNGs usam bytes. Um log histórico ainda tinha ANSI/UUID sintético: sanitizado antes do push, preservando resultados, com manifests acrescentados. A inspeção por8 regras locais não equivale a scanner universal de segredos. Sem publicação de cookies, tokens, env, provas, senhas, traces ou contextos brutos.

**Validação local da fase4:** rodada de15 gates PASS na candidata f8c5e711, snapshot `f6225ec0aa48a15e4120d82195cba99d3a7d02b683106edd59008ed04b710894`; depois, exclusão documental alterou a fonte, com Deletion/Build/Typecheck/Lint PASS no snapshot `7d13dedfa6c89edf5c2a3262e1c5eae4c958da1f386cb86890e7ade9963d9a51`. Não se apresenta a rodada anterior como teste completo da fonte final; o CI exato final completa essa verificação.

**Validação local da fase5:** HEAD documental `6448f21a59dc08e52963d5f46a0a4b459efa69a4`, fonte funcional `e3a9c09f910e18e25c97e6926ea9ed57fd6ca3aa`, snapshot `1b80704bd9e8ae7cac1050da260d1efcccc17421591b85289f4852817f64b025`,19/10/2026 15:09:16.998–15:20:20.224UTC.15/15 PASS/exit0: RegressionSetup; Unit296+17; Integration218; Migration37; Contract6; R1=17; Build padrão; Typecheck; Lint0erros/3avisos anteriores; E2E153; Https2; Deletion3; Ihfr6; Bootstrap14 migrations/rollback/dispose próprios; SchemaAudit0. Nenhuma mudança funcional após essa rodada.

**CI final da fase4:** [run39267705060, tentativa3](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39267705060/job/118134854957), HEAD `7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d`, concluído SUCCESS em2026-10-19T15:19:24Z. Conferência do journal:15 registros/15 gates únicos, todos PASS/exit0, fingerprint único `9a5dd074aa94a9072903714135ca946991ce80526ec61ef6276953b72b9ba7c6`. E2E136, Https2, Deletion3 e Ihfr6; demais contagens correspondem aos gates locais descritos, com build padrão/3 avisos antigos e Bootstrap14/SchemaAudit0. Artefato12197323787,289 entradas,14359184 bytes; SHA256 baixado e digestAPI iguais `86d8237b51e749cb249e93215848b82f33707a15f33fa976ae42bc7961627364`. [Recibo estruturado](evidence/phase4-ci-final-receipt.json).

Histórico preservado no mesmo HEAD: tentativa1 FAIL Integration por retorno INTERNAL_ERROR em cenário de quota concorrente (RegressionSetup/Unit PASS,12 gates seguintes não executados), artefato12192554979 SHA256 `18f1bec27a42ae84c049d69ee634c402a61b53d041f706acfbf60c7fbe886566`; tentativa2 teve12 primeiros gates PASS e6/6 IhfrFAIL por controles/regiões ausentes, Bootstrap/SchemaAudit não executados, artefato12196855106 SHA256 `f48170a3f35490a70ba419eea5fa67c6fe9e5c47183ab391767a89ab4dc3ed55`. A tentativa3 passou sem mudança de backend/auth/ciência/runner/testes/timeouts. O resultado não demonstra a causa dos FAILs anteriores.

A fase5 ainda não está publicada no instante deste registro. O PR será aberto com base temporária indicada acima, revisão solicitada a PedroVitor237 (responsável confirmado por histórico do repositório) e pedido `@codex review` quando disponível. O recibo final remoto fornecerá URL, HEAD completo,15 gates/fingerprint/artefato/checksum. O pedido de revisão automatizada não equivale a resultado ou aprovação; a análise local fica identificada.

As branches exatas foram incluídas no filtro push/if de validate e receberam Preview=false antes do primeiro push. Upload de artefatos foi ampliado somente com padrões focais de PNG/JSON sanitizados. Permanecem os15 gates, guards, permissões, Actions fixadas, retenção, runner e timeouts existentes. A recusa403 do conector foi contornada pelo CLI normalmente autenticado indicado pelo usuário, sem extrair credenciais.

A RC `release/cri-rc-20261010@0f669b79a5e73a329832593229c2557d8b12bbce`, as outras worktrees e trabalhos preexistentes foram preservados. ZIPs preservados:

- `hidrofloresta-login-20261018.zip`: SHA256 `8E2B2D0675776DAC319F3C697392D1BDE4CD6AF35ECAF233792CDD13EAAA1E4F`.
- `hidrofloresta-login-aria-20261018.zip`: SHA256 `3F37082A28558306323FD6A0BE70918784C287841F62B36307343AB140333627`.

Foram usados somente PostgreSQL17.10 próprio em loopback55427, schemas/fixtures sintéticos e runners oficiais, sem suítes concorrentes ou InitializeCiCluster local. O cluster foi parado preservando dados; o processo alheio inicialmente em3000 foi preservado. npm ci travado/Prisma local/build padrão, sem mudar dependências/lockfile ou habilitar scripts globalmente.

Não houve merge de PR, push direto em development/main, deploy, mudança de secrets ou operação em banco/provedor real. Backend/APIs/AuthContext/guards/schema/migrations/contratos científicos/globals/layout-fonte raiz e docs/raw não foram alterados. Permanecem CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO e ADR-0001.

Pendências humanas: revisar/aceitar visual e contratos; decidir sobre os três avisos antigos fora do recorte; merge da fase4 pelo mantenedor; depois conferir ancestralidade/diff da fase5 antes de retarget para development e revalidar mudanças materiais/CI aplicável. Preservar a branch-base enquanto necessária. Dispositivo físico, leitor de tela e disponibilidade de tiles/provedor real não foram testados nesta missão.

### Commits completos em ordem cronológica

O bloco abaixo vai da base development ao HEAD anterior ao commit deste relatório. O commit documental que contém este arquivo e os HEADs publicados completos constam no recibo final do PR, evitando autorreferência impossível.

```text
8741996521c61bdf221b8c58ed975b89784772d8 docs: planejar fase quatro e diagnóstico da navegação móvel
5c317740fc6b3ed7a24ce03093f298e4e86a66e6 test: registrar baseline móvel e contratos reais do dashboard
ef9c2fe685512a5ec10e85c7ebd710a776d0ae1d test: reproduzir obstrução móvel com safe-area e texto ampliado
dec0b5452e4e3fd59191d6e7dd7a005990aa4135 test: medir recuperação real de erros e rolagem por contexto
c9eadd9d4d4a9739b30081a541f8ab2a56204497 fix: reservar regiões para navegação e conteúdo móvel
5816b70f52781565f241203daa0e3d1c906038da test: verificar retorno móvel e descarte de respostas anteriores
178fa8f1b7cc7ab5c638025079e99ed16c483726 fix: restaurar rolagem e foco do contêiner móvel
b5d8ff16940429be05a6c0e1f90d8c428015f6d1 feat: incorporar visual contextual de dashboard e membros
0b4ea8474670eea66022e5c49edc8c073cf87973 ci: validar fase quatro e impedir Preview da branch
44948ce4aaa8e52d226c5765ece0123835e467c3 test: registrar falha de retorno entre instâncias do shell
68cc06a3c11195d19f5ff57488788cba3e6e3627 test: expor estados e foco de teclado nas capturas do dashboard
35026ec7c8d58d52f4bf3e1e953f533efeed2386 fix: isolar restauração móvel por escopo do shell
3e7db46e5cc4b82fead10b23b012a34fce6cd3fa test: aferir retorno no limite real de rolagem
c0f74db3d7d8c16720bb6f6a04a66fb0b8b1d3d8 fix: manter intenção de retorno entre layouts
f8c5e7114ebc86ca55f5d0690120bd608f280c0e fix: descartar cache móvel na exclusão de conta
671f4c86c91b993f5aff3650c297e4fe277d88d0 docs: planejar verificação documental da exclusão
1c0920f4432a804227ef67b28192226b52e724fa test: verificar cache na entrada documental da exclusão
fd7879dcb3bd96fe33fbdbaab1b4556d9eafb17e test: preservar acento do seletor na entrada documental
275f4dc7147dcf223cd2ced9da069be2fb05e966 fix: limpar cache após exclusão confirmada por documento
7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d docs: registrar revisão e regressões da fase quatro
43fd1364fb429eeea4cda2b7201ded9f746bd8d7 docs: planejar áreas e capa com contratos e matriz de estados
851e05e645173da2150616c17c22cf0cd23f8ef9 test: caracterizar áreas e protocolo privado de capas
da57eb7a80ccb6406733fd952e36feb21a078ed9 test: precisar falhas e ampliar baseline responsiva de capas
2a272d363461e463e7e835e3f07aa75541b848d4 test: consolidar RED e capturas habilitadas de capa
d67f7c61a5df2cbf58857b48ce738dcdf5db8456 ci: validar áreas e capa sem habilitar Preview
0f83a9fe01e613ab75b6cc2d8a82c67671ecae66 feat: incorporar áreas e capas com repetição e preview seguros
1e75ea4c645df2076e6f3c37aca4d8f4294ff5ea fix: preservar encerramento do efeito de leitura de áreas
6abd312415cc86ee2216431bc3cf6a284f69d6fc test: preservar status acessível e reproduzir recarga concorrente
e3a9c09f910e18e25c97e6926ea9ed57fd6ca3aa fix: encerrar estado pendente quando recarga da capa falha
6448f21a59dc08e52963d5f46a0a4b459efa69a4 docs: registrar GREEN focal e evidencias reais da fase 5
```
