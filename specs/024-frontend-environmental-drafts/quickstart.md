# Validação e retomada

A implementação está publicada na branch `feat/frontend-environmental-drafts`, PR Draft #19 empilhada sobre #18. Conferir HEAD remoto, worktree, merge-base e parents antes de incorporar a próxima correção de coleta. O candidato5ca5205 executou os P1 ambientais e24 capturas, mas falhou na geometria herdada da coleta; consultar `implementation-evidence.md`. Os antigos pacotes de patches não são a fonte vigente de publicação.

## Validação obrigatória antes da conclusão

Executar no clone completo, com Node24.19.0 e lockfile: instalação travada, Prisma, build/typecheck/lint e runners oficiais. Ler docs/operations/rc-review-ci-runbook.md e os scripts antes de rodar. Utilizar somente PostgreSQL sintético próprio, guards/allowlists vigentes. `-InitializeCiCluster` é exclusivo do Actions Windows isolado, nunca da máquina normal. E2E focal também exige o ambiente completo oficial.

No HEAD final de cada PR verificar individualmente: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit. Não reduzir asserts, guards, readiness, permissões, runners, pins ou timeouts para obter verde. Preservar falhas históricas e novos FAILs. Falhas antigas de IHFR/navegação/duas chamadas continuam inconclusivas; novo verde não demonstra causa retrospectiva.

Inspecionar capturas de viewport reais e sanitizadas, fullPage:false, 320/375/768/1440 px, texto200, paisagem, safe-area emulada, teclado/foco/toque, controles finais, conteúdo longo, erro/retry e Back/Forward/reload. Os testes novos cobrem parte dessa matriz; o restante e os testes existentes de contexto, conta, shell, áreas/capas, drafts/OCC/rollback e seis IHFR precisam ser executados. Emulação não prova dispositivo físico ou conformidade WCAG integral.
