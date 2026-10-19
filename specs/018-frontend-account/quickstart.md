# Validação — contas

Pré-requisitos: Node24.19.0, lockfile, Chromium e cluster local sintético com markers/ACL do runner oficial. Ler docs/operations/rc-review-ci-runbook.md. Nunca usar InitializeCiCluster nesta estação.

1. `npm ci --no-audit --no-fund`; `npx prisma generate`.
2. RED: adicionar testes frontend-account antes do código; `./scripts/rc-review-validation.ps1 -Gates E2E`. Preservar journal/log sanitizado. Capturas baseline descrevem código anterior.
3. Após implementação, repetir os mesmos testes pelo runner; executar `./scripts/rc-review-validation.ps1` para os15 gates (inclui build padrão Turbopack, typecheck e lint).
4. Inspecionar as capturas explícitas em test-results/**/frontend-account-*.png: seis jornadas, 375/768/1440 e320/texto200, erro/loading/foco. Campos mascarados; sem provas em artefatos.
5. Revisar diff, privacidade, contratos; publicar somente branch autorizada com preview desligado. Acompanhar validate do SHA exato e15 resultados no artefato. Não confundir execução anterior ou mock de UI com CI/serviço real.

Os testes de Specs001/012/013 continuam cobrindo domínio real e revogação. Suite nova cobre apresentação e interações adicionais sem substituir essas assertions. Sem certificação WCAG, leitor de tela manual, e-mail real ou homologação produtiva.
