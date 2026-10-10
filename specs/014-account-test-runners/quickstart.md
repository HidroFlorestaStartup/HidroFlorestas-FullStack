# Validação

No cluster próprio com chaves sintéticas e ACCOUNT_TRUSTED_INGRESS=local:
`scripts/accounts-validation.ps1 -Gate E2E`, depois o comando da
[spec 013](../013-account-deletion/quickstart.md) para account-deletion-e2e.ts,
depois `scripts/accounts-validation.ps1 -Gate Https` e SchemaAudit.
Nunca executar essas operações sobre contas reais. Limitação: Gate B permanece aberto.

Executar `node --import=tsx --test tests/unit/account-migration-source.test.ts`;
via wrapper sintético, RegressionSetup antes do E2E, depois HTTPS e SchemaAudit.
Executar exclusão com scripts/account-deletion-e2e.ts através do cluster próprio.
Bootstrap valida cadeia completa em recurso novo próprio; nunca resetar banco
existente nem reescrever checksums para aceitar alteração real de SQL.
