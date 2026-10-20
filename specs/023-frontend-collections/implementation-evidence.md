> **Atualização de publicação, 20/10/2026:** O texto histórico abaixo descreve a preparação anterior à publicação. A fase 6 foi publicada na branch `feat/frontend-collections`; RED oficial no run [39444967220](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39444967220): RegressionSetup PASS, Unit FAIL esperado no teste de estado R1. GREEN integral e homologação ainda pendentes desta atualização. O registro final de CI por HEAD deve constar no PR.

# Evidências de implementação candidata

| Verificação | Resultado e alcance |
|---|---|
| R1 em sete testes novos de estado na base | RED: 2 PASS / 5 FAIL; exit1 |
| Mesmos sete testes após correção | GREEN: 7 PASS; exit0 |
| Unitários fase6 | 39 PASS: 8 existentes (um cenário atualizado pontualmente), 7 R1, 24 submissão |
| Quatro E2E novos | Escritos, NOT_RUN |
| UI/Pg/CI/15 gates | NOT_RUN; publicação recusada |

O teste existente que antes permitia iniciar outra tentativa após falha desconhecida foi ajustado à regra segura: agora exige recusa na incerteza e mantém as asserções de nova tentativa após rejeição inicial definitiva. Nenhuma asserção do backend ou E2E anterior foi reduzida. A validação de idempotência no banco ainda precisa do runner oficial.

Checagens adicionais: typecheck estrito dos módulos puros e unitários, análise de sintaxe TS/TSX e consistência de patches. Não chamar essas verificações de Build/Typecheck/Lint oficiais. Logs auxiliares e manifesto ficam no pacote entregue no chat.

## Estado e limites da execução

Candidata local no sandbox do chat, sem commit ou branch publicados. A criação da árvore Git pela integração retornou HTTP 403, `Resource not accessible by integration`. Nenhuma escrita remota foi confirmada. Não se tentou contornar a restrição por outro endpoint ou identidade. A causa específica da permissão não foi determinada.

O clone no sandbox falhou por conectividade; os arquivos-base necessários foram obtidos por leituras GitHub/transcrição ou reaproveitados do ZIP somente quando seus bytes, após a normalização LF declarada, coincidiram com o blob Git vigente. O manifesto registra a proveniência. Isso não constitui um clone integral. Não houve acesso ao checkout/worktrees do operador.

As skills instaladas specify/plan/tasks/implement, a constituição e os templates foram lidos. Os formatos foram aplicados manualmente, sem executar os scripts CLI Spec Kit. O plano havia sido articulado antes do código na tentativa de publicação recusada; os arquivos deste pacote consolidam esse planejamento e os resultados posteriores. Não existe commit PLAN/RED/GREEN remoto desta execução.

Runtime auxiliar: Node22.16.0/TypeScript5.8.3 com transpilação em memória, não o runner oficial Node24.19.0. O typecheck auxiliar abrange somente módulos puros e seus unitários. Sintaxe TSX foi analisada, mas React/Next, CSS em navegador e imports completos não foram compilados no projeto real.

Build, typecheck integral, lint oficial, PostgreSQL, E2E, HTTPS, CI, capturas reais, dispositivo físico, outros navegadores e leitor de tela: NOT_RUN nesta candidata. Não foram executados agentes internos independentes: essa ferramenta não estava disponível. Auditoria própria não é revisão independente. `@codex review` não foi solicitado, pois não há PR publicado; deverá ser solicitado após publicação autorizada e ter sua resposta efetivamente conferida.
