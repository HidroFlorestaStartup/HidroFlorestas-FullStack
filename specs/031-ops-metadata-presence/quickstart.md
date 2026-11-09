# Validação offline

Na raiz, Node24.19.0:

```powershell
node --test tests/operations/ops-metadata-presence.test.mjs
node scripts/ops-metadata-presence.mjs docs/reports/2026-10-25-hf-night-01/ops/metadata-inventory.json preview feat/hf-night-01
```

Snapshot atual retorna exit2 com18 ausentes; isso não é falha do instrumento.
Tests cobrem completo/vazio/escopos e entradas recusadas com canários.
Não carregar .env/configurar provedor. [Contrato](contracts/cli.md).
