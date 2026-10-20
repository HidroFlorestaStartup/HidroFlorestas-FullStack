> **Estado de publicação atualizado, 20/10/2026:** branch provisória `feat/frontend-environmental-drafts` publicada e empilhada sobre a fase6 em `e12ade232e3bad2fd60dbd53da2dcbc254a9e6a1`, sem merge/deploy. Este texto abaixo registra a preparação local histórica; a validação do HEAD da fase7, a reconciliação com eventuais mudanças da fase6 e a revisão Codex permanecem pendentes. CI será rastreado pelo SHA e run no PR. O antigo erro 403 de escrita foi resolvido selecionando a conexão GitHub do projeto.

# Evidências de implementação candidata

| Verificação | Resultado e alcance |
|---|---|
| Predicados R5 extraídos literalmente da base | RED: 4 testes, 2 PASS / 2 FAIL; exit1 |
| Precisão, protocolo de foco e retenção de incerteza | 25 PASS auxiliares |
| Parsers/células/conversões reais preservados | 10 PASS auxiliares |
| Suíte cumulativa fase7 | 74 PASS, incluindo os 39 da fase6; não somar novamente |
| Cinco E2E novos | Escritos, NOT_RUN |
| Pg/OCC/rollback/CI/browser | NOT_RUN nesta candidata |

Os 74 testes não substituem as suítes históricas integrais nem o CI oficial. O predicado corrigido preserva a incerteza no código, mas sua integração com React, rede e banco ainda exige os E2E reais preparados e a regressão vigente.

Checagens adicionais: typecheck estrito dos módulos puros e unitários, análise de sintaxe TS/TSX e consistência de patches. Não chamar essas verificações de Build/Typecheck/Lint oficiais. Logs auxiliares e manifesto ficam no pacote entregue no chat.

## Estado e limites da execução

Candidata local no sandbox do chat, sem commit ou branch publicados. A criação da árvore Git pela integração retornou HTTP 403, `Resource not accessible by integration`. Nenhuma escrita remota foi confirmada. Não se tentou contornar a restrição por outro endpoint ou identidade. A causa específica da permissão não foi determinada.

O clone no sandbox falhou por conectividade; os arquivos-base necessários foram obtidos por leituras GitHub/transcrição ou reaproveitados do ZIP somente quando seus bytes, após a normalização LF declarada, coincidiram com o blob Git vigente. O manifesto registra a proveniência. Isso não constitui um clone integral. Não houve acesso ao checkout/worktrees do operador.

As skills instaladas specify/plan/tasks/implement, a constituição e os templates foram lidos. Os formatos foram aplicados manualmente, sem executar os scripts CLI Spec Kit. O plano havia sido articulado antes do código na tentativa de publicação recusada; os arquivos deste pacote consolidam esse planejamento e os resultados posteriores. Não existe commit PLAN/RED/GREEN remoto desta execução.

Runtime auxiliar: Node22.16.0/TypeScript5.8.3 com transpilação em memória, não o runner oficial Node24.19.0. O typecheck auxiliar abrange somente módulos puros e seus unitários. Sintaxe TSX foi analisada, mas React/Next, CSS em navegador e imports completos não foram compilados no projeto real.

Build, typecheck integral, lint oficial, PostgreSQL, E2E, HTTPS, CI, capturas reais, dispositivo físico, outros navegadores e leitor de tela: NOT_RUN nesta candidata. Não foram executados agentes internos independentes: essa ferramenta não estava disponível. Auditoria própria não é revisão independente. `@codex review` não foi solicitado, pois não há PR publicado; deverá ser solicitado após publicação autorizada e ter sua resposta efetivamente conferida.
