# Evidências da preparação e revisão local — 017

Data: 2026-10-18. As seções até “Execução no checkout oficial” preservam literalmente o estado histórico do pacote parcial. Resultados atuais são registrados separadamente abaixo.

## O que foi realizado nesta conversa

1. Leitura do handoff 18/10, instruções e constituição; conferência de development e17f64a, starter cbb954a, ausência de branch feat/frontend-login e diretório 017 livre no corte consultado.
2. Planejamento/spec/contrato/tarefas elaborados antes dos arquivos de implementação.
3. Nova página de login e CSS Module, teste Playwright de UI, exclusão exata da branch na configuração Vercel e inclusão exata da branch no CI existente preparados.
4. Node22.16.0/TypeScript5.8.3: 13 verificações isoladas PASS — sintaxe/transpilação de dois arquivos TS/TSX, handler extraído do código com doubles de estado/signIn, imports/fronteiras e configuração. Não é typecheck do projeto, React ou autenticação real.
5. Chromium com HTML estático derivado dos elementos TSX: 7 verificações PASS — 375/768/1440px, reflow320/texto200%, inércia do fieldset no snapshot SSR, foco/teclado/alvo e associação de erro. Fonte substituta do sistema e adaptadores de imagem/ícones; não é Next SSR, hidratação ou E2E oficial.
6. CSS parseado por PostCSS; 22 referências de classes resolvidas. JSON/YAML válidos. Ao retirar as três mudanças focais do workflow, seu Git blob é idêntico ao baseline dc5e821e3ef6708d81aead7ebb873b03bc122aa2; ao retirar a regra Vercel da branch, retorna ao blob dc91711f0af76df3644aa425eec1166a5590248a.
7. Contraste calculado nos pares sólidos usados: branco/verde5.016, ocre/branco5.022, cinza/branco5.329, placeholder/input4.635, erro/fundo7.597 e foco/input5.914. Não é auditoria integral de acessibilidade.
8. Logo obtida do arquivo previamente fornecido pelo usuário e verificada contra o Git blob 2bbdfd56caa472c269ddfdc36e0ca4f3aca70d51. Nenhum novo asset será aplicado ao repositório.

## Revisão do recorte

- Apenas página/CSS e guardas locais de UI foram alterados; a chamada signIn e o payload permanecem. AuthContext, cookies, API, credenciais, banco, fontes/root/globals e regras científicas não estão no overlay.
- Não há TanStack, mockApi, DemoPanel, personas, nova biblioteca, localStorage ou navegação alternativa no produto.
- Erro no teste de UI foi escopado ao formulário para não confundir o alerta do formulário com notificações globais. Este é ajuste de teste ainda não executado no Next.
- A nova branch é bloqueada na Vercel antes do primeiro push e está incluída tanto no trigger quanto no if do job. Não há configuração de CI global para development/main.
- As 7 novas declarações de testes E2E estão escritas, NÃO executadas aqui. Não atribuir resultado da inspeção estática a elas.

## Falhas de ambiente preservadas

- `git ls-remote --heads … development`: falhou por DNS. Nenhum clone disponível aqui.
- GitHub.create_tree para planejamento: HTTP403 Resource not accessible by integration. Nenhum commit/branch/PR remoto criado.
- Primeira inspeção estática via loopback: Chromium retornou ERR_BLOCKED_BY_ADMINISTRATOR. Servidor encerrado; política não foi alterada. A inspeção subsequente usou set_content e dados locais em memória, sem rede.

## Limites e pendências

Node24/npm ci/Prisma, guias Next instalados, scripts oficiais Spec Kit, RED/GREEN real, typecheck/lint/build do projeto, autenticação/HTTPS/hidratação, capturas reais do Next, push/CI/PR e aceite dos revisores: NÃO EXECUTADOS/PENDENTES.

A implementação é uma candidata para aplicação e validação no checkout oficial, não uma funcionalidade já entregue no GitHub. Não repetir o planejamento do zero: conferir o pacote e completar precisamente essas etapas. Quaisquer falhas oficiais devem ser preservadas e tratadas, sem converter ausência de execução em PASS.

Os registros JSON e PNGs locais de inspeção acompanham o pacote de transferência. O executor deverá produzir registros oficiais com SHA, comandos, ambiente, resultados e links dos checks no repositório após sua execução. Não inserir tokens/cookies/segredos nos artefatos.

## Execução no checkout oficial — 2026-10-18

EVIDENCIA_IMPLEMENTACAO: base `origin/development=e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8`; branch `feat/frontend-login`; worktree única adicional `C:/projetos/consolidados/HidroFlorestas-frontend-login`. RC em 0f669b7 preservada com o ZIP não rastreado; demais worktrees preservadas. Fontes documentais 95463d5 e visuais cbb954a consultadas, sem merge dessas branches.

ZIP SHA-256: `8e2b2d0675776dac319f3c697392d1bde4cd6af35ecaf233792cdd13eaaa1e4f`. Todos os 11 hashes/tamanhos do overlay conferidos. Extração e adaptador fora do Git; pacote original inalterado. Os seis protected_blobs correspondem ao HEAD do baseline. O aplicador original usa hash-object com filtros e recusou os blobs de terminações mistas no Git Windows; o adaptador reconhece somente bytes do HEAD ou sua conversão de checkout LF→CRLF, sem remover nenhum guard. Ver reconciliação em [plan.md](plan.md).

Spec Kit: specify aplicado à Spec existente/checklist; setup-plan.sh e setup-tasks.sh executados com feature explícita; check-prerequisites.sh --json --require-spec --require-tasks --include-tasks PASS. Sem hooks/extensions. Análise preliminar em [review.md](review.md). Commit local de planejamento `514106aa6d7797b7f0e76f9b458c7fdacc3d7037`, antes de aplicar testes/código. Testes preparados commitados em `ffe9e43b2d8ea0df0b564a4fba6cc173978653f9` após o RED e capturas do baseline; nenhum push intermediário.

Ambiente: Windows, Node24.19.0, dependências de package-lock via npm ci --no-audit --no-fund, npx prisma generate e npx playwright install chromium. Nenhuma mudança em package/lockfile, política npm ou dependências. Guias Next16.3.8 locais consultados. A única adaptação de código à candidata é `priority`→`preload` na mesma Image, pois priority é deprecado no guia instalado. Os testes preparados foram acrescidos de rede/Enter, sem remover assertions/timeouts.

### RED e invocações anteriores

1. Invocação focal inicial com node.cmd e grep contendo pipe falhou no wrapper Windows antes dos testes; não é RED funcional. A tentativa com Node.exe e redirecionamento PowerShell5 interrompeu ao tratar stderr do WebServer como NativeCommandError; não é teste aprovado nem falha da UI.
2. Resolvido somente o transporte de stdout/stderr por coletor externo Node (spawn direto, sem shell), invocado pelo harness oficial. Comando efetivo: `accounts-local-postgresql.ps1 -Action Run -DatabaseMode Regression -Executable <Node24.exe> -CommandArguments @('<coletor externo>','<log>','--grep','inert')`. Filho: `node node_modules/@playwright/test/cli.js test tests/e2e/frontend-login.spec.ts --reporter=line --grep inert`.
3. HEAD `514106a`, testes ainda não commitados, página original: **1 FAIL verdadeiro**, cenário “login is inert until hydration and then accepts the first input”. E-mail deveria estar disabled com JS suspenso; estava enabled (linha79 original). Assertions/timeout preservados. Log em [evidence/red-hydration.log](evidence/red-hydration.log).
4. Mesmo harness e HEAD, grep presentation: **3 PASS** na página antiga, capturas reais vazias 375/768/1440px. Nenhum RED artificial de apresentação foi necessário. Antes da implementação o cluster foi parado pelo runner, com dados preservados.

### Validação integrada

Comandos oficiais: `./scripts/rc-review-validation.ps1 -Gates RegressionSetup` e `./scripts/rc-review-validation.ps1 -Gates Unit,Build,Typecheck,Lint,E2E,Https,SchemaAudit`. Guards, confirmação e URLs são definidos somente pelo harness; nenhum valor sensível é registrado. PostgreSQL17 dedicado 127.0.0.1, sem Neon, serviço real, seed ou migration remota.

Os resultados estruturados, capturas e revisão final são acrescentados após o término dos gates; os estados históricos acima não são reclassificados como execução oficial.

Após E2E80 PASS, o focal ampliado teve **8 PASS/2 FAIL**: recebeu403 nas duas tentativas reais por execução sem o ambiente completo do runner RC (ingresso/política sintéticos), antes da validação de credenciais. Assertions401 foram preservadas e o recorte voltou ao runner oficial completo. [Log sanitizado](evidence/failed-focal-incomplete-environment.log); snapshots [1](evidence/failed-focal-context-1.md) e [2](evidence/failed-focal-context-2.md). O snapshot automático do Playwright incluiu o valor da senha sintética: o valor foi redigido antes de preservar a evidência e não é publicado. Não houve exposição de credencial de serviço real.

### Correção demonstrada de reflow

EVIDENCIA_IMPLEMENTACAO: no runner completo, o recorte ampliado atingiu **82 PASS**, incluindo as duas respostas401 reais. A captura320/texto200 estável mostrou quebra de ENTRAR por paddings emrem. Nova assertion foi executada contra o HEAD `61b27ac37335c215a58bff3d31dd755d94d8be36` antes de corrigir CSS: **1 FAIL**, esperado1 linha/recebido2. Com somente padding-inline local em pixels abaixo de400px, o mesmo teste produziu **1 PASS**. Logs [RED](evidence/red-reflow.log) e [GREEN](evidence/green-reflow.log). Correção commitada em `9bb0eb99a543391dd0f8a6bb452c65752d74673a`. Nenhum timeout/guard/assertion foi reduzido.

### Capturas reais do Next

| Cenário | Antes (HEAD514106a, página original) | Depois (fonte9bb0eb9) |
|---|---|---|
| 375px | [antes](evidence/before-frontend-login-375.png) | [depois](evidence/after-frontend-login-375.png) |
| 768px | [antes](evidence/before-frontend-login-768.png) | [depois](evidence/after-frontend-login-768.png) |
| 1440px | [antes](evidence/before-frontend-login-1440.png) | [depois](evidence/after-frontend-login-1440.png) |
| 320px/texto200% | comparação diagnóstica descrita no RED | [depois estável](evidence/after-frontend-login-320-text200.png) |
| Envio | — | [loading, campos mascarados](evidence/after-frontend-login-loading.png) |
| Rede indisponível | — | [erro, campos mascarados](evidence/after-frontend-login-network-error.png) |

Inspeção visual nas três larguras, no reflow e nos estados de erro/loading executada no Next com Poppins real, distinguindo as capturas estáticas do pacote. Composição/cartão/cores/espaçamento do starter adaptados; logo institucional, heading/copy e links reais preservados; nenhum painel demo ou header com links#. O indicador N que pode aparecer nas capturas pertence ao Next dev, não ao login de produção. Foco, Tab/Shift+Tab, Enter, labels, busy/status/alert, visibilidade da senha, payload, duplicidade e hidratação lenta foram exercitados. Reflow/texto ampliado não certificam browser zoom em todas as combinações, leitor de tela manual ou WCAG integral.

Não houve alteração nos registros globais de decisões/documentos/pendências: o recorte não mudou arquitetura, produto fora do login ou ciência, e suas evidências permanecem nesta spec. Dependências futuras de e-mail/Cloudinary reais e homologações da RC não foram promovidas a aceite desta entrega.

### Resultado local final

Fonte funcional final: `9bb0eb99a543391dd0f8a6bb452c65752d74673a`. Fingerprint funcional do último Build/Typecheck/Lint/E2E/Https/SchemaAudit: `32f4f017adcda9b7851ac3ddbd29e227a4405eb5f06f27495bffefd6c748abf9`. Commits documentais seguintes não alteram os insumos funcionais. [Journal completo com comandos, horários UTC, fingerprints e hashes dos logs](evidence/runtime-results.json); os logs integrais sanitizados ficam em `.accounts-validation/` no checkout e no artefato do CI.

| Verificação | Resultado real |
|---|---|
| Node24.19.0 / npm ci / Prisma generate / Chromium | PASS |
| RegressionSetup no cluster próprio | PASS |
| Unit / mail unit | 296 + 17 PASS, zero FAIL |
| Build padrão Turbopack, repetido após CSS final | PASS |
| Typecheck final | PASS |
| Lint final | PASS: zero erros, 3 avisos preexistentes fora do escopo |
| E2E geral final | 82 PASS, incluindo 10 do login; [resumo](evidence/green-login-summary.log) |
| HTTPS de produção local após build final | 2 PASS; fixture users restantes0; artefatos temporários removidos |
| SchemaAudit final | PASS: zero schemas candidatos remanescentes |
| diff/escopo/imports/AuthContext byte a byte/links/tarefas | [PASS](evidence/scope-check.json) |
| Isolamento Preview e trigger/if do job | [PASS](evidence/config-check.json) |

Última execução oficial: `./scripts/rc-review-validation.ps1 -Gates Build,Typecheck,Lint,E2E,Https,SchemaAudit`. PostgreSQL parado ao terminar, dados sintéticos preservados. Não foi necessário aprovar lifecycle scripts bloqueados pelo npm. Os avisos de lint são em app/page.tsx, user-profile/index.tsx e white-box/index.tsx, sem alteração nesses arquivos.

Integration/Migration/Contract/R1/Deletion/Ihfr/Bootstrap não foram repetidos localmente neste recorte visual; o workflow publicado conserva os15 gates para sua execução no HEAD. O resultado remoto final e seu SHA são registrados no PR, separadamente deste snapshot de validação local.

RECOMENDACAO: apto para publicação e revisão humana do login. Aceite visual/copy por Pedro/mantenedor, leitura manual com tecnologias assistivas e navegadores adicionais permanecem pendentes; nenhuma certificação WCAG ou homologação de provedores reais é inferida. Sem merge/deploy.

### Publicação e referência viva do CI

EVIDENCIA_IMPLEMENTACAO: primeiro push exclusivo de feat/frontend-login em `5720646f7cf26efc218f5fc185a4af8b32906408`, com Preview bloqueado e job habilitado já no commit. origin/development reconferida em e17f64a, sem drift. [PR9 para development](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/9), autor thalesvalente; revisão formal solicitada a PedroVitor237. A integração do conector retornou403 ao criar PR; a mesma operação autorizada foi concluída pela API com a autenticação local já usada pelo Git, mantida somente em memória e sem valores registrados.

O [primeiro workflow39133594916](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39133594916) foi observado in_progress/event=push no SHA5720646, não skipped. Esta fotografia não declara seu resultado final. O commit documental seguinte gera outro HEAD; o corpo do PR registra o **SHA final exato, run/job e conclusão efetivamente conferidos**, evitando uma cadeia circular de commits documentais que invalidem o SHA recém-verificado. Não usar o check anterior como prova do novo HEAD.

Todos os commits de planejamento/testes/implementação/correção/evidências foram preservados, em português. As cópias de logs de evidência removem ANSI e espaços no fim de linha; os logs originais permanecem fora do Git. RC em0f669b7, ZIP original e demais worktrees preservados. Próxima ação humana: revisar composição/copy e configuração no PR; mantenedor decide integração. Não houve merge, deploy, operação de provedor ou alteração de ambiente remoto.
