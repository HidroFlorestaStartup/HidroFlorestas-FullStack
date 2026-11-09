# Validação sintética
Usar Node24.19.0, npm/package-lock e Chromium instalados, harness com cluster próprio loopback conforme docs/operations/rc-review-ci-runbook.md. Não usar -InitializeCiCluster local, .env produtivo, Neon/Gmail/Cloudinary reais.

1. Antes de código: runner ./scripts/rc-review-validation.ps1 -Gates RegressionSetup,E2E para RED e capturas. Preservar falhas com snapshot/log sanitizado.
2. Executar ./scripts/rc-review-validation.ps1 para os15 gates. Sem filtros/adaptação de guards para verde.
3. Inspecionar PNGs .accounts-validation/frontend-workspace e copiar somente sanitizados para evidence/before-* e after-*. Trace/video/autoscreenshot dos novos testes desligados, inputs mascarados/limpos.
4. Revisar consumidores e diff com revisão independente; repetir checks afetados após achado demonstrado.
5. Conferir allowlist exacta/if + vercelfalse antes de push. PR próprio; CI do HEAD cumulativo e artefato com PNGs/journal. Sem merge/deploy.

Cenários e resultados esperados: contracts/ui-contracts.md e spec.md. Conta sem vínculos/vínculos reais,5/5, OWNER/ADMIN/MEMBER/globalADMIN, inativo, seleção explícita/histórico/ausência, menu/foco/diálogo/risco e logout desktop/mobile. Aceite humano e leitor de tela manual não são substituídos pelo Playwright.
