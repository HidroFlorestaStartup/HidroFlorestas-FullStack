# UI-06 — proposta focal de runtime, HF-UI-044-A6

**RECOMENDACAO / UI06_RUNTIME_PENDING.** Este arquivo e o [patch único](evidence/ui06-bilateral.patch) são inertes, preparados para revisão. Nenhuma branch/workflow/job novo foi criado, publicado ou executado. Publicar este documento em A não autoriza a execução da proposta.

## Diff concreto e limites

Base proposta: candidata composta congelada `6c61056fe1dc2193e225d935f49b78cb6c6781ed`, produto `a585087dbbe9294c18922e3397c2561f245446c9` e árvore operacional `f40b4e8c0217311869dc5336e4fc15c7176df7a5`. Criar futuramente um único commit filho dessa base, em `codex/hf-ui044-ui06-bilateral-20261101`, somente após autorização específica. Não é filho de DOC_HEAD A6 e não atualiza A/B/C. Não aplicar o antigo control-candidate.patch de quatro arquivos.

| Path proposto, somente na futura candidata visual | Mudança |
| --- | --- |
| `.github/workflows/hf-ui06-bilateral.yml` | Job próprio Windows, criação da ref exata, push não forçado/tentativa1; sem dispatch/rerun; actions com pins já usados |
| `vercel.json` | Acrescenta somente a chave exata da branch visual com false; conserva os 41 guards da candidata composta; já deve existir antes do primeiro push |
| `scripts/hf-ui06-visual.ps1` | Reusa entrypoint oficial para fresh PostgreSQL/RegressionSetup; inicia starter loopback e executa somente o spec focal via wrapper de banco owned |
| `tests/e2e/hf-ui06-bilateral.spec.ts` | Pares PNG/JSON duráveis do shell, fixtures sintéticas próprias e estado real da referência; sem importar adapter/auth do starter no produto |

Patch SHA256: `76bbc0f7bcde64f3ffd8cf697c222be31908cff26215d5f2342461ebd06907a7`. Aplicabilidade do guard e leases da base/branch devem ser reconferidos por leitura antes de qualquer push; o job checa o guard novamente, mas a verificação posterior ao push não substitui a prevenção anterior. Ref deve estar ausente; não sobrescrever nenhuma ref. O workflow RC e seus quinze gates ficam intactos. Esta proposta é captura focal e não promete nem publica um novo 15/15 PASS.

## Execução especificamente proposta

Um job GitHub-hosted Windows, no máximo35min, Node24.19.0, Bun1.3.11 com bun.lock frozen no checkout separado de starter `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`; npm ci/Prisma/Chromium do FullStack. Inicialização pelo runner oficial `rc-review-validation.ps1 -InitializeCiCluster -Gates RegressionSetup`, depois o mesmo wrapper accounts-local-postgresql com banco Regression e só o spec focal. Não reaproveitar env, marker, banco ou credenciais do host; não provisionar Sandbox/Hyper-V. Dependências de instalação/build requerem rede; isto não afirma isolamento total de rede.

O starter é executado em diretório próprio/loopback4173, sem edição de fonte; FullStack loopback3001 com autenticação real e fixture própria apenas no PG sintético. O script para os processos/cluster no finally. Chaves temporárias sintéticas não são arquivadas. Browser permite somente os dois origins locais e fontes Google; demais requisições são bloqueadas e registradas sem query/headers/body. Provedores reais não são configurados. Actions/artifacts serão públicos neste repositório; retenção14dias de PNG/JSON mascarados. Sem deploy/merge/release, ambientes remotos, tokens novos, settings ou escrita no starter remoto.

## Pares e critérios

28 combinações:320×900,375×900,390×844,768×900,1440×900,667×375,844×390 × texto100/200 × inset0/34. Cada projeto usa viewport/dpr1 idênticos. Capturas são `fullPage:false`, com dimensões PNG verificadas e JSON de SHA/tree efetivos, base composta, viewport, escala, rootFontSize, família computada, fontes realmente renderizadas via CDP, requisições bloqueadas, fixture/estado, safe-area, foco/retângulos, rota sem query e run/tentativa. Fontes de fallback são diferenças reais, não sucesso presumido. Pares são copiados diretamente para .accounts-validation/ui06, fora de outputDir.

Workspace começa com usuário ACTIVE/USER sem laboratório, depois um laboratório ativo próprio/OWNER sem áreas/coletas em ambos; starter usa a persona nativa de conta vazia e cria laboratório pela própria UI, FullStack cria registro pelo fluxo real no PG sintético. IDs/nome de pessoa/implementações de auth são distintos, informados como sintéticos, sem copiar a lógica de um projeto para o outro. Comparar composição, hierarquia, navegação, densidade, palavras e foco; não igualdade de pixels.

Cobertura proposta: workspace, laboratório, Conta aberta/fechada no FullStack, navegação Áreas, último controle/Tab, safe-area, Back/Forward/reload. **Diferenças materiais verificadas na fonte fixada:** o AppShell do starter não possui disclosure Conta; os registros criados pelo seu adapter são somente em memória e podem desaparecer no reload. O teste captura a referência real e registra `equivalent:false` nos pares Conta/reload, sem inventar menu ou persistência. Esses pares não podem receber PASS de equivalência; exigem avaliação humana conforme o requisito atual e o handoff aprovado. A fonte fixada não precisa receber funcionalidade nova para ser comparada.

**Este patch é focal no ownership A.** Não cobre área/coleta/IHFR com B, logo mesmo sua execução bem-sucedida não encerra UI-06 global, FR-036-004, T007/T015/T027 ou aceite humano. O índice mantém `ui06BilateralPass:false` e identifica revisão humana/B pendentes. Não há threshold de screenshot ou redução de fontes/asserts/qualificadores. Falha, captura ausente ou par não equivalente permanece registrado; nenhuma repetição automática.

## Validação nesta preparação

Aplicação seca do patch, sintaxe YAML/PowerShell/TypeScript e invariantes são verificações estáticas, registradas na revisão A6. Runtime starter/FullStack, PostgreSQL do patch e captures novas: NOT_RUN. Typecheck completo do novo spec e ensaio de seu job: NOT_RUN, dependem da candidata autorizada. Nenhum PASS histórico é transferido para essa futura árvore instrumentada.

## Ato de autorização pendente

Autorizar especificamente este diff de quatro paths e seu hash, um commit filho da composição congelada, criação protegida da ref exata, um push/uma tentativa Windows de até35min e upload público14dias somente dos PNG/JSON propostos. A autorização anterior não vale para isso. Sem autorizar dispatch, rerun, integração de B em A, branch de produto, merge/deploy ou aceite. O commit/árvore futuros serão identificados antes do push e no recibo, pois este patch ainda não foi aplicado/publicado como execução.
