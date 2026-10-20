# Análise de consistência — continuidade R3 (20/10/2026)

Estado vigente: candidata em validação na PR Draft #18; as limitações de conectividade/publicação do histórico abaixo não descrevem esta execução. O checkout integral foi obtido do GitHub no HEAD `9a5254a8e6bb060c7767231a38370c073b2bdb78`, com Node 24.19.0 e dependências do lockfile. Os scripts Spec Kit `setup-plan`, `setup-tasks` e `check-prerequisites --require-spec --require-tasks --include-tasks` foram executados preservando a Spec existente; não há hooks adicionais configurados.

| Requisito / risco | Alteração R3 e evidência | Pendência oficial |
|---|---|---|
| US3: toque/reflow sem obstrução | Helper considera o contorno CSS, mantém os quatro cantos/centro, acrescenta eixos e rejeita obstruções reais; 20/20 contraprovas independentes | Matriz do aplicativo em Windows/Chromium |
| US3: paisagem com texto200 | Margem assimétrica da coleta reproduziu obstrução real pelo header; margem simétrica local libera9/9 pontos, sem alterar shell | Matriz oficial herdada pela fase7 |
| US3: foco e rolagem | Transições finitas/ResizeObserver reproduzidos; aguardar todas as gerações e drenar dois frames causais antes da única rolagem;21/21 contraprovas independentes | Nova regressão oficial de coleta e ambiental |
| Conta: primeiro desvio em /login | Resposta do sign-in observada, URL preservada; jornada passou no run39460675003, causa histórica permanece inconclusiva | Regressão no novo HEAD |
| US1: continuidade A → B → A | HMAC/snapshot/idempotência preservados; cenário antes NOT_RUN passou na suíte179/179 do HEAD6fd8066 | Regressão no novo HEAD |
| Domínio e ciência | Sem mudanças de schema, serviços, parsers, autorização, HMAC ou IHFR nesta correção | Gates existentes permanecem obrigatórios |

O primeiro candidato passou15 gates, mas suas capturas foram removidas por execuções Playwright posteriores. A cópia durável e seus namespaces tiveram contraprova2PASS+1PASS; o próximo artifact deverá conter a matriz completa.

Não há desvio de escopo ou novo requisito funcional que justifique outra Spec. A análise e as contraprovas locais não equivalem a aceite humano nem aos 15 gates. Os resultados por HEAD serão consolidados em `implementation-evidence.md` e na PR, sem transportar aprovação de um SHA anterior.

---

## Histórico preservado — preparação anterior à continuidade R3

# Análise de consistência

Revisão própria de documentos e código candidato, sem agente independente. Histórias priorizam integridade; requisitos mapeiam a recuperação, precisão, contexto e acessibilidade. Contratos de domínio/ciência permanecem inalterados. R1 e R5 têm reproduções auxiliares de alcance explícito; R2/R3 são proteções da adaptação. Publicação e comprovação end-to-end seguem bloqueadas/pendentes.

## Estado e limites da execução

Candidata local no sandbox do chat, sem commit ou branch publicados. A criação da árvore Git pela integração retornou HTTP 403, `Resource not accessible by integration`. Nenhuma escrita remota foi confirmada. Não se tentou contornar a restrição por outro endpoint ou identidade. A causa específica da permissão não foi determinada.

O clone no sandbox falhou por conectividade; os arquivos-base necessários foram obtidos por leituras GitHub/transcrição ou reaproveitados do ZIP somente quando seus bytes, após a normalização LF declarada, coincidiram com o blob Git vigente. O manifesto registra a proveniência. Isso não constitui um clone integral. Não houve acesso ao checkout/worktrees do operador.

As skills instaladas specify/plan/tasks/implement, a constituição e os templates foram lidos. Os formatos foram aplicados manualmente, sem executar os scripts CLI Spec Kit. O plano havia sido articulado antes do código na tentativa de publicação recusada; os arquivos deste pacote consolidam esse planejamento e os resultados posteriores. Não existe commit PLAN/RED/GREEN remoto desta execução.

Runtime auxiliar: Node22.16.0/TypeScript5.8.3 com transpilação em memória, não o runner oficial Node24.19.0. O typecheck auxiliar abrange somente módulos puros e seus unitários. Sintaxe TSX foi analisada, mas React/Next, CSS em navegador e imports completos não foram compilados no projeto real.

Build, typecheck integral, lint oficial, PostgreSQL, E2E, HTTPS, CI, capturas reais, dispositivo físico, outros navegadores e leitor de tela: NOT_RUN nesta candidata. Não foram executados agentes internos independentes: essa ferramenta não estava disponível. Auditoria própria não é revisão independente. `@codex review` não foi solicitado, pois não há PR publicado; deverá ser solicitado após publicação autorizada e ter sua resposta efetivamente conferida.
