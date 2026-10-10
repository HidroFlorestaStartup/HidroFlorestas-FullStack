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
