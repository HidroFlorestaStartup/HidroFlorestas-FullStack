# Validação

No cluster próprio com chaves sintéticas e ACCOUNT_TRUSTED_INGRESS=local:
`scripts/accounts-validation.ps1 -Gate E2E`, depois o comando da
[spec 013](../013-account-deletion/quickstart.md) para account-deletion-e2e.ts,
depois `scripts/accounts-validation.ps1 -Gate Https` e SchemaAudit.
Nunca executar essas operações sobre contas reais. Limitação: Gate B permanece aberto.
