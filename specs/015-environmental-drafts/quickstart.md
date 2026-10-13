# Validação local e operação

Instalar pelo lockfile, gerar Prisma e usar cluster próprio 55427 via
scripts/accounts-validation.ps1. Aplicar nova migration com RegressionSetup,
sem db push/reset. Executar Unit/Integration/Migration/Contract/E2E e runner
dedicado de exclusão; Typecheck/Lint/Build sequenciais; SchemaAudit ao final.
Na UI de medições de uma coleta confirmada: preencher zero/Não/texto incompleto,
Salvar rascunho, recarregar; em outra aba salvar mesma revisão e observar conflito.
Recarregar draft explicitamente preserva controle do usuário; descartar confirma
perda definitiva. Completar/revisar/confirmar remove só draft pessoal atomically.
Laboratório inativo permite consultar draft mas não salvar/descartar/confirmar.
Sem expiração automática. Dados científicos confirmados e terceiros preservados.
Nenhuma operação remota; rollback conserva tabela/dados para retomada posterior.

RC-DRAFT-001: após commit de planejamento, executar novos testes Playwright em
environmental-drafts.spec.ts com scripts /_next/static bloqueados por promessa.
RED antes do fix: controles SSR habilitados. GREEN: disabled até liberar scripts,
primeiro savefalse/0/12. com payload/resposta/retomada reais e ausência preservada.
Repetir com baseline absent e vazio explícito. Usar accounts-local-postgresql.ps1
Run/Regression; coletor redige saída e captura fingerprint. Não ajustar assertions
ou guards, não usar waits arbitrários e não migrar bancos hospedados.
