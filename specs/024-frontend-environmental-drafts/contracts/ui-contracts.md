# Contratos preservados e apresentação

Manter PUT/GET/DELETE do draft e POST de confirmação existentes, revisão/ID/saveKey/formVersion e headers Draft-Id/Draft-Revision. Nenhum autosave ou contrato novo. Fonte não poço com profundidade continua rejeitada sem apagar raw silenciosamente. Formatação deve permitir recuperar o mesmo Number finito; não zero nunca é mascarado por arredondamento para zero. Grupos details devem abrir antes de focar erro, mantendo fieldset/legend e rótulos. UI deve distinguir salvar/confirmar/descartar e informar pendência sem falsa confirmação.

## Validação obrigatória antes da conclusão

Executar no clone completo, com Node24.19.0 e lockfile: instalação travada, Prisma, build/typecheck/lint e runners oficiais. Ler docs/operations/rc-review-ci-runbook.md e os scripts antes de rodar. Utilizar somente PostgreSQL sintético próprio, guards/allowlists vigentes. `-InitializeCiCluster` é exclusivo do Actions Windows isolado, nunca da máquina normal. E2E focal também exige o ambiente completo oficial.

No HEAD final de cada PR verificar individualmente: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit. Não reduzir asserts, guards, readiness, permissões, runners, pins ou timeouts para obter verde. Preservar falhas históricas e novos FAILs. Falhas antigas de IHFR/navegação/duas chamadas continuam inconclusivas; novo verde não demonstra causa retrospectiva.

Inspecionar capturas de viewport reais e sanitizadas, fullPage:false, 320/375/768/1440 px, texto200, paisagem, safe-area emulada, teclado/foco/toque, controles finais, conteúdo longo, erro/retry e Back/Forward/reload. Os testes novos cobrem parte dessa matriz; o restante e os testes existentes de contexto, conta, shell, áreas/capas, drafts/OCC/rollback e seis IHFR precisam ser executados. Emulação não prova dispositivo físico ou conformidade WCAG integral.
