# Análise de consistência — fechamento técnico da candidata funcional

EVIDENCIA_IMPLEMENTACAO:5f5d8719e25856b59e84c053cb13d2516dbeac49 passou15/15 gates,182/182 E2E e Codex sem findings. A inspeção visual independente cobriu26 quadros de aplicativo e separou2 sintéticos. O commit de consolidação é documental e requer seu próprio recibo exato na PR, conforme a regra de tasks.md; não herda aprovação do parent.

| Requisito / risco | Evidência observada | Limite remanescente |
|---|---|---|
| US3: contorno e obstrução |23/23 contraprovas;9 pontos e bounds preservados;182 E2E aprovados | Nenhuma alegação de todos os elementos possíveis;demais controles fora do alvo testado permanecem qualificados |
| US3: paisagem/texto200 | Margem simétrica local e18/18 quadros finais com controle inteiro | Ação secundária parcialmente fora em paisagem; máscaras/indicador dev impedem concluir pixels de toda a navegação |
| US3: foco/resize/captura | P1/P2 corrigidos e revisados; esperas causais, uma rolagem e animations allow | Pixels estáticos não provam ordenação; esta é sustentada por testes/contraprovas |
| Conta | Jornada integral aprovada; respostaHTTP observada, URLassert preservado | Causa do incidente histórico INCONCLUSIVA |
| US1: A → B → A | Mesma chave/corpo/proof, B403 sem nova linha, A recupera ID; incluído no182/182 | PASS nominal inferido da seleção integral, pois reporter usa pontos |
| Domínio e ciência |15 gates completos, sem mudança de schema/algoritmo/cálculo nesta correção | Contrato científico continua experimental, sem homologação científica |
| Publicação | Draft e base development preservados; incorporação não destrutiva na fase7 | Novo HEAD documental exige15 gates e Codex próprios; aceite humano permanece externo |

Fontes, checkout integral, skills/Spec Kit, preflight e históricos estão preservados em plan.md e implementation-evidence.md. A Spec existente continua adequada; não há novo requisito funcional ou desvio de escopo.

## Histórico — análise anterior à consolidação

Estado vigente: candidata em validação na PR Draft #18; as limitações de conectividade/publicação do histórico abaixo não descrevem esta execução. O checkout integral foi obtido do GitHub no HEAD `9a5254a8e6bb060c7767231a38370c073b2bdb78`, com Node 24.19.0 e dependências do lockfile. Os scripts Spec Kit `setup-plan`, `setup-tasks` e `check-prerequisites --require-spec --require-tasks --include-tasks` foram executados preservando a Spec existente; não há hooks adicionais configurados.

| Requisito / risco | Alteração R3 e evidência | Pendência oficial |
|---|---|---|
| US3: toque/reflow sem obstrução | Helper considera o contorno CSS, mantém os quatro cantos/centro, acrescenta eixos e rejeita obstruções reais; 20/20 contraprovas independentes | Matriz do aplicativo em Windows/Chromium |
| US3: paisagem com texto200 | Margem assimétrica da coleta reproduziu obstrução real pelo header; margem simétrica local libera9/9 pontos, sem alterar shell | Matriz oficial herdada pela fase7 |
| US3: foco e rolagem | Transições finitas/ResizeObserver reproduzidos; aguardar todas as gerações e concluir os callbacks de renderização antes da única rolagem;23/23 contraprovas independentes, incluindo P1/P2 da revisão2a047d1 | Nova regressão oficial de coleta e ambiental |
| Conta: primeiro desvio em /login | Resposta do sign-in observada, URL preservada; jornada passou no run39460675003, causa histórica permanece inconclusiva | Regressão no novo HEAD |
| US1: continuidade A → B → A | HMAC/snapshot/idempotência preservados; cenário antes NOT_RUN passou na suíte179/179 do HEAD6fd8066 | Regressão no novo HEAD |
| Domínio e ciência | Sem mudanças de schema, serviços, parsers, autorização, HMAC ou IHFR nesta correção | Gates existentes permanecem obrigatórios |

A revisão Codex de2a047d1 identificou P1 de ordenação de callbacks e P2 de captura que adiantava transições. Ambos receberam triagem causal, correção e testes permanentes, com recibos em implementation-evidence.md. A candidata seguinte ainda depende de nova revisão externa e CI exatos.

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
