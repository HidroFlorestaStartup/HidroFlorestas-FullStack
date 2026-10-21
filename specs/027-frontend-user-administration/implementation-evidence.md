# Evidência de implementação — Spec027

**Data**: 2026-10-21. **Estado**: REPARO_PREPARADO sobre o HEAD publicado `6a5e80804f46b49658dad3c1a804cf5033d2cfc3`, após falha E2E dos filtros e defeitos visuais observados a 200%. A nova alteração aguarda publicação e validação no SHA exato pela coordenação. A validação local deste reparo é NOT_RUN por indisponibilidade do executor. Este documento acompanha a árvore candidata; recibos posteriores serão registrados na PR, evitando novo commit apenas documental após os gates.

## Base e fronteira

Branch `feat/frontend-user-administration`, criada de S=`b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`; D=`1ea3cc2552c244e1004f4f733f838e0f9ea62993`. Fonte visual somente leitura `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`. Escritor exclusivo de administração. As duas rotas users existentes continuam delegando ao mesmo componente. Nenhum backend, contrato, schema, layout global, CSS global, lockfile ou workflow foi modificado.

## Resultado implementado

- Shell, visão geral, filtros, lista, detalhes, auditoria e confirmação recompostos com cards, estados explícitos e distinção de papel global/laboratório.
- Cada fluxo de GET tem escopo cancelável e identidade de leitura. Selecionar outra conta elimina imediatamente o histórico anterior; respostas antigas não atualizam o alvo atual.
- Recuperação de conflito realiza GET do alvo, mostra a revisão atual e exige nova confirmação com `expectedRevision`/estado observados. Falha de transporte exige atualização antes de nova tentativa.
- Diálogo nativo modal com foco inicial, contenção de Tab, Escape/cancelamento, restauração do foco e bloqueio de duplicatas durante PATCH. O resultado recebe foco ao concluir.
- Navegação móvel segue o fluxo da página, sem offset fixo. Diálogo tem rolagem interna e altura limitada à viewport. Texto e grades se adaptam a ampliação de fonte.
- Helper de captura próprio preserva o helper comum. As capturas usam `fullPage:false`, fixtures sintéticas e geometria sanitizada. A opção de máscara de `input,textarea,select` permanece ativa; os PNGs reais do HEAD 6a5 mostram que o textarea do diálogo nativo pode continuar visível. A metadata descreve a máscara como solicitada, sem afirmar cobertura integral dos controles.

## Validação focal histórica — não transferida ao novo reparo

A tabela abaixo documenta as verificações locais das árvores anteriores, inclusive a correção de foco/indisponibilidade publicada como 6a5. Nenhum desses PASS comprova os novos ajustes de labels, reflow ou testes; para estes, lint, typecheck, unitários e diff-check locais permanecem NOT_RUN durante a indisponibilidade do executor.

| Verificação | Resultado | Limite da evidência |
|---|---|---|
| Unitários: `frontend-user-administration.test.ts`, `user-list-state.test.ts`, `user-administration-*.test.ts`, `global-authority.test.ts`, `superadmin-contract.test.ts` | PASS — 13 arquivos, 0 falhas, 0 skips | Testes de lógica/contratos; não demonstram integração com DB nem comportamento de navegador |
| `npm run typecheck` | PASS | Cliente Prisma precisou ser gerado localmente antes da verificação |
| ESLint dos quatro arquivos de produto e três arquivos de teste desta frente | PASS | Não substitui gate global oficial |
| `git diff --check` e revisão de fronteira | PASS | Revisão local, não Codex externo |
| SPECIFY → PLAN → TASKS → ANALYZE e prerequisites | Concluído | 9/9 FR rastreados, sem declarar aceites operacionais |

O primeiro typecheck encontrou ausência de `src/generated/prisma` no checkout e na worktree, causando erros de módulos/tipos derivados. Foi executado somente `prisma generate` com URL sintética de localhost/porta não utilizada, sem conexão, consulta, migration ou alteração de banco. O cliente permanece ignorado pelo Git. O typecheck posterior passou. Esse diagnóstico local não é atribuído a falhas históricas do CI.

## Provas de navegador — execução de 6a5 preservada, novo reparo pendente

`tests/e2e/frontend-user-administration.spec.ts` contém 15 casos após a revisão: cursor/filtros; cancelamento e foco; conflito real com revisão recuperada; resposta de auditoria atrasada A→B; bloqueio de gravação em andamento; recuperação quando o valor já foi aplicado; conta removida com GET404; acesso perdido com GET401/403; seis combinações de viewport/texto. Os casos usam autenticação e fixtures sintéticas existentes, APIs reais e barreiras de rede para concorrência; não há substituição dos endpoints por sucesso fictício.

Viewports: 320×900, 375×900, 768×900 e 1440×900 a 100%; 320×900 e 844×390 a 200%. O HEAD 6a5 produziu 18 imagens de overview, detalhe e diálogo. O reparo prepara 19 imagens e respectivos metadados, incluindo um quadro adicional do título “Alterações rastreáveis” a 320×900/200%, integralmente em viewport. O destino continua `.accounts-validation/frontend-user-administration/`, com prefixo por cenário/repetição e `fullPage:false`. A fonte raiz de 32 px nos casos de 200%, palavras inteiras, limites horizontais e controles de pelo menos 44 px passam a ter assertions explícitas. Ampliação de texto e viewport são emuladas, sem alegação de dispositivo físico ou aceite humano de acessibilidade.

| Aceite restante | Estado |
|---|---|
| E2E novo e regressões administrativas legadas no runtime protegido | 6a5: FAIL, 1 falha/204 aprovados; novo reparo: PENDENTE no CI Windows e NOT_RUN local |
| Inspeção de imagens e metadados | 18 imagens de 6a5 inspecionadas pela coordenação; defeitos a 200% confirmados; 19 novas imagens PENDENTES |
| 15 gates oficiais no SHA publicado | 6a5: 9 PASS, E2E FAIL, 5 NOT_RUN; todos os 15 gates do novo reparo PENDENTES, sem herança |
| Review Codex externo e tratamento de achados | 6a5: completed sem achados pendentes; revisão do novo reparo PENDENTE |
| Aceite humano operacional/teclado/leitor de tela | PENDENTE quando exigido pelo plano mestre |

O agente não atualizou refs nem executou push, merge, deploy ou remoção de ambiente. As publicações anteriores foram feitas pela coordenação, que também publica o reparo, inicia CI/revisão e registra recibos no SHA efetivamente testado.

## Correções após revisão independente — 2026-10-21

A primeira árvore foi publicada pela coordenação como `cf1d8df64e56e17db1beacc373d0641c15c71a65` na PR21. O Codex concluiu revisão desse HEAD com um achado P2, comentário `4335281956`/review `5597773747`: o botão original pode ser removido quando a recuperação do conflito descobre que outro administrador já aplicou o valor solicitado. Cancelar ou usar Escape tentava focar o elemento desconectado. A revisão independente interna identificou o mesmo caso e também a perda silenciosa do erro401/403/404 após limpar a seleção.

- `close()` verifica `isConnected` e retorna o foco ao título do detalhe quando o acionador desapareceu. E2E preparado: conflito409 real → GET atual com o valor já aplicado → cancelar → foco no título da conta.
- Falhas401/403/404 de detalhe ou auditoria invalidam as leituras pendentes, limpam seleção/histórico/diálogo e mostram alerta sanitizado fora do ramo da conta selecionada. A primeira resposta de erro entre os dois GETs mantém o aviso. GET404 retira a linha indisponível; perda de autoridade/sessão retira a lista antiga.
- E2E404 remove somente a conta sintética54 da fixture protegida após obter a lista, retém o transporte da auditoria e observa o404 real do GET de detalhe. Outros dois casos usam sessão ausente e papel global sem autoridade, recebendo401/403 reais. Nenhum desses testes foi executado localmente.

Os resultados da revisão e do run inicial pertencem ao HEAD publicado inicial. Este ajuste exige novo HEAD, CI e revisão; nenhum resultado anterior é apresentado como aceite da correção. Após as correções, ESLint focal, typecheck, os13 arquivos unitários focais (zero falhas/skips) e `git diff --check` passaram novamente. E2E/CI das correções continuam pendentes, e os recibos remotos seguintes permanecem na PR.

## Recibo real de 6a5 e reparo de labels/reflow — 2026-10-21

O [run 39579990722](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39579990722), job `119155111703`, attempt 1, executou o HEAD `6a5e80804f46b49658dad3c1a804cf5033d2cfc3` (tree `334c32ad2bae2926dfc0e3abc75b5718227763f8`) e terminou FAILURE. O recibo oficial registra PASS para RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck e Lint; E2E FAIL; Https, Deletion, Ihfr, Bootstrap e SchemaAudit NOT_RUN. A fingerprint dos dez registros emitidos é `c4d551f717bc6ec35fb091ef3862cd80e8ed920d15cbe5336acf57605c025cc7`. O run inicial `39578261212`, de cf1, permanece CANCELLED e não é substituído por este resultado.

O E2E terminou com 1 falha e 204 aprovados em 12,2 minutos. A falha foi o timeout de `getByLabel("Filtrar por papel", { exact: true })` no cenário “admin list keeps opaque cursor navigation and resets filters”. A estrutura anterior envolvia o texto e o select, incluindo suas opções, no mesmo label. Ambos os filtros agora recebem label separado com `htmlFor` e select com `id` estável via `useId`. O teste mantém o locator exato e acrescenta a conferência do nome acessível de papel e estado. Nenhum timeout ou assertion anterior foi afrouxado.

O artifact `12337396304`, `rc-validation-6a5e80804f46b49658dad3c1a804cf5033d2cfc3`, tem 31.145.447 bytes e digest `sha256:f2927af6e6acb27776f459b1b7c29fbb40508efb69cc8612383471c4cd42a1a0`. Com o executor local indisponível, a coordenação validou associação a run/HEAD, tamanho, SHA e CRC dos ZIPs em CI diagnóstico isolado; a leitura não executou o produto nem substitui os gates da candidata.

Os PNGs originais de 6a5 foram transportados sem edição pelos leitores [39585504108](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39585504108), job `119173271836` (seis imagens a 200%), e [39586266847](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39586266847), job `119175821627` (doze imagens a 100%). A coordenação inspecionou as 18 imagens; o agente desta frente abriu diretamente as seis de 200% e os diálogos de 320 e 1440 a 100%. No detalhe de 320×900/200%, “Bloqueada”, “Administrador” e “Desenvolvedor” se fragmentam dentro das palavras. No overview da mesma viewport, “rastreáveis” ultrapassa a largura útil do cartão. Não foi identificado outro P2 nas capturas de 100%; o recorte vertical de viewport nos quadros horizontais não foi tratado como defeito por si.

O reparo reduz o padding móvel aninhado do shell, detalhe e cartões, preserva os breakpoints maiores e troca a quebra arbitrária dos botões secundários por quebra normal. Fontes e ampliação não são reduzidas; `min-h-11` permanece. A nova prova aguarda o callback compartilhado `waitForMissionRender`, que espera o trabalho finito de renderização sem cancelar animações; depois de `document.fonts.ready`, percorre cada palavra com Range, exige um único retângulo não vazio por palavra e mantém seus limites dentro do elemento, além de conferir alvo mínimo de 44 px nos controles. As 19 capturas e essas assertions precisam executar no novo HEAD; esta análise não é aprovação visual antecipada.

Limitação observada da sanitização: o textarea do diálogo contém a justificativa sintética “Spec027 revisão sintética de viewport” visível nos PNGs, mesmo com a opção de máscara solicitada. No desktop, os controles de fundo aparecem mascarados. A metadata foi corrigida para descrever essa limitação; a máscara e os guards não foram removidos. As fixtures continuam exigindo `TEST_DATABASE_CONFIRMATION=HIDROFLORESTAS_AUTH_TEST` e `TEST_DATABASE_URL`, usando contas e dados sintéticos. Não se presume cobertura visual integral de formulários pela opção de máscara.

A revisão Codex de 6a5 registrou `status=completed` e ausência de achados/pendências para aquele commit (comentário de resumo `6312825350`, recibo `6313130184`). A revisão interna focal do delta de labels/reflow/helper não encontrou bloqueio material; ambas têm escopo distinto da validação real do novo HEAD. O próximo commit exige seu próprio CI, review Codex e inspeção dos PNGs.

A preparação final foi feita com conteúdo remoto exato e substituições de ocorrência única. O executor permaneceu indisponível; novos lint, typecheck, unitários, E2E e diff-check locais são NOT_RUN. Uma tentativa anterior de criar blob ficou sem resposta e foi abortada sem SHA devolvido; nenhum ref foi atualizado pelo agente. A coordenação recebe o delta determinístico, publica a candidata e conserva os recibos posteriores na PR do mesmo SHA.
