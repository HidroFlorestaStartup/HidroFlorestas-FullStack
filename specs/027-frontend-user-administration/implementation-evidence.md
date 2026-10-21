# Evidência de implementação — Spec027

**Data**: 2026-10-21. **Estado**: CANDIDATA_LOCAL, aguardando publicação e validação da coordenação. Este documento acompanha a árvore candidata; recibos posteriores serão registrados na PR com SHA exato, evitando novo commit apenas documental após os gates.

## Base e fronteira

Branch `feat/frontend-user-administration`, criada de S=`b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`; D=`1ea3cc2552c244e1004f4f733f838e0f9ea62993`. Fonte visual somente leitura `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`. Escritor exclusivo de administração. As duas rotas users existentes continuam delegando ao mesmo componente. Nenhum backend, contrato, schema, layout global, CSS global, lockfile ou workflow foi modificado.

## Resultado implementado

- Shell, visão geral, filtros, lista, detalhes, auditoria e confirmação recompostos com cards, estados explícitos e distinção de papel global/laboratório.
- Cada fluxo de GET tem escopo cancelável e identidade de leitura. Selecionar outra conta elimina imediatamente o histórico anterior; respostas antigas não atualizam o alvo atual.
- Recuperação de conflito realiza GET do alvo, mostra a revisão atual e exige nova confirmação com `expectedRevision`/estado observados. Falha de transporte exige atualização antes de nova tentativa.
- Diálogo nativo modal com foco inicial, contenção de Tab, Escape/cancelamento, restauração do foco e bloqueio de duplicatas durante PATCH. O resultado recebe foco ao concluir.
- Navegação móvel segue o fluxo da página, sem offset fixo. Diálogo tem rolagem interna e altura limitada à viewport. Texto e grades se adaptam a ampliação de fonte.
- Helper de captura próprio preserva o helper comum. Evidências planejadas usam `fullPage:false`, valores de formulário mascarados, nomes sintéticos e geometria sanitizada.

## Validação focal executada

| Verificação | Resultado | Limite da evidência |
|---|---|---|
| Unitários: `frontend-user-administration.test.ts`, `user-list-state.test.ts`, `user-administration-*.test.ts`, `global-authority.test.ts`, `superadmin-contract.test.ts` | PASS — 13 arquivos, 0 falhas, 0 skips | Testes de lógica/contratos; não demonstram integração com DB nem comportamento de navegador |
| `npm run typecheck` | PASS | Cliente Prisma precisou ser gerado localmente antes da verificação |
| ESLint dos quatro arquivos de produto e três arquivos de teste desta frente | PASS | Não substitui gate global oficial |
| `git diff --check` e revisão de fronteira | PASS | Revisão local, não Codex externo |
| SPECIFY → PLAN → TASKS → ANALYZE e prerequisites | Concluído | 9/9 FR rastreados, sem declarar aceites operacionais |

O primeiro typecheck encontrou ausência de `src/generated/prisma` no checkout e na worktree, causando erros de módulos/tipos derivados. Foi executado somente `prisma generate` com URL sintética de localhost/porta não utilizada, sem conexão, consulta, migration ou alteração de banco. O cliente permanece ignorado pelo Git. O typecheck posterior passou. Esse diagnóstico local não é atribuído a falhas históricas do CI.

## Provas de navegador preparadas — execução pendente

`tests/e2e/frontend-user-administration.spec.ts` contém 15 casos após a revisão: cursor/filtros; cancelamento e foco; conflito real com revisão recuperada; resposta de auditoria atrasada A→B; bloqueio de gravação em andamento; recuperação quando o valor já foi aplicado; conta removida com GET404; acesso perdido com GET401/403; seis combinações de viewport/texto. Os casos usam autenticação e fixtures sintéticas existentes, APIs reais e barreiras de rede para concorrência; não há substituição dos endpoints por sucesso fictício.

Viewports: 320×900, 375×900, 768×900 e 1440×900 a 100%; 320×900 e 844×390 a 200%. Cada cenário prepara captura de overview, detalhe e diálogo: 18 imagens e respectivos metadados, arquivados em `.accounts-validation/frontend-user-administration/` com prefixo por cenário/repetição. Ampliação de texto e viewport são emuladas, sem alegação de dispositivo físico ou aceite humano de acessibilidade.

| Aceite restante | Estado |
|---|---|
| E2E novo e regressões administrativas legadas no runtime protegido | NOT_RUN local; reservado ao CI Windows da coordenação |
| Inspeção das 18 imagens e metadados | PENDENTE de artefatos reais |
| 15 gates oficiais no SHA publicado | PENDENTE; nenhum PASS herdado |
| Review Codex externo e tratamento de achados | PENDENTE |
| Aceite humano operacional/teclado/leitor de tela | PENDENTE quando exigido pelo plano mestre |

Nenhum push, merge, deploy ou remoção de ambiente foi executado nesta frente. A coordenação publica a árvore idêntica, inicia CI/revisão e registra recibos no SHA efetivamente testado.

## Correções após revisão independente — 2026-10-21

A primeira árvore foi publicada pela coordenação como `cf1d8df64e56e17db1beacc373d0641c15c71a65` na PR21. O Codex concluiu revisão desse HEAD com um achado P2, comentário `4335281956`/review `5597773747`: o botão original pode ser removido quando a recuperação do conflito descobre que outro administrador já aplicou o valor solicitado. Cancelar ou usar Escape tentava focar o elemento desconectado. A revisão independente interna identificou o mesmo caso e também a perda silenciosa do erro401/403/404 após limpar a seleção.

- `close()` verifica `isConnected` e retorna o foco ao título do detalhe quando o acionador desapareceu. E2E preparado: conflito409 real → GET atual com o valor já aplicado → cancelar → foco no título da conta.
- Falhas401/403/404 de detalhe ou auditoria invalidam as leituras pendentes, limpam seleção/histórico/diálogo e mostram alerta sanitizado fora do ramo da conta selecionada. A primeira resposta de erro entre os dois GETs mantém o aviso. GET404 retira a linha indisponível; perda de autoridade/sessão retira a lista antiga.
- E2E404 remove somente a conta sintética54 da fixture protegida após obter a lista, retém o transporte da auditoria e observa o404 real do GET de detalhe. Outros dois casos usam sessão ausente e papel global sem autoridade, recebendo401/403 reais. Nenhum desses testes foi executado localmente.

Os resultados da revisão e do run inicial pertencem ao HEAD publicado inicial. Este ajuste exige novo HEAD, CI e revisão; nenhum resultado anterior é apresentado como aceite da correção. Após as correções, ESLint focal, typecheck, os13 arquivos unitários focais (zero falhas/skips) e `git diff --check` passaram novamente. E2E/CI das correções continuam pendentes, e os recibos remotos seguintes permanecem na PR.
