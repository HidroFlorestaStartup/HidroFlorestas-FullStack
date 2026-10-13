# Operação e validação

Somente local nesta execução: instalar pelo lockfile, generate Prisma,
RegressionSetup/Bootstrap em cluster próprio, Unit/Integration/Migration/Contract,
typecheck/lint/build/E2E, exclusão dedicada e SchemaAudit sequenciais.
Provider fake usa bytes sintéticos e falhas determinísticas; não há upload real.
Credenciais ausentes produzem indisponibilidade sanitizada sem derrubar leitura
das áreas; UI conserva fallback e capa anterior quando uma operação falha.
Configuração real, smoke, limites/créditos e operador de cleanup ficam pendentes.
CLI de cleanup real exige confirmação operacional explícita e ambiente escolhido;
nunca rodar contra cloud real durante esta tarefa. Runbook registra prova de
ownership, assinatura 1h, janela staging e custo de Admin/download/transformation.

RC-UI-001: após commit de planejamento, aplicar 02-test.patch e executar o teste
“reloading a temporarily unavailable cover retries its content at the same revision”
em tests/e2e/area-covers.spec.ts via accounts-local-postgresql.ps1 Run/Regression
e o coletor focal atual. Registrar RED antes de 03-code.patch; repetir sem mudar
asserts até GREEN e executar os três testes de capas, gates gerais e build.
Aceite: 503→200→503→200, quatro GETs revision=1, naturalWidth>0 após cada sucesso,
fallback recuperável e sucesso somente após carregamento. Não modificar o banco
para induzir revisão diferente. Logs/fingerprint em evidência específica da sessão.
