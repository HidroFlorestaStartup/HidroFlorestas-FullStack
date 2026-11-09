# Validação
Node24.19/npm ci --no-audit --no-fund concluído antes de npx prisma generate/Chromium.
./scripts/accounts-local-postgresql.ps1 -Action Status antes dos serviços.
./scripts/rc-review-validation.ps1 -Gates RegressionSetup,E2E para baseline;sem -InitializeCiCluster local,nem E2E solto.
./scripts/rc-review-validation.ps1 para15 gates. Não editar fonte/testes durante rodada. Guardas/allowlists/fixtures/runners conservados;cluster próprio loopback,sem .env real/provedores.
Capturas sanitizadas em .accounts-validation/frontend-mobile-navigation e frontend-dashboard;selecionar before/after explícitos para evidence/. Testar toque emulado,Chromium,viewport375/320 texto100/200 e768/1440. Revisão separada leitura,diff/capturas;aceite humano e leitor de tela manual pendentes.
CI HEAD exato e journal/checksum quando acessíveis;recibo final no PR evita ciclo documental.
