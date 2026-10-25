# Implementation Plan: presença operacional offline

**Branch**: `feat/hf-night-01` | **Date**: 2026-10-25 | **Spec**: [spec.md](spec.md)

## Summary

Implementar CLI offline de whitelist para inventário sanitizado. Reutilizar
Node instalado e node:test, sem dependência adicional nem carregar a aplicação.
Preparação M05; presença não homologa G3/G4/G5.

## Technical Context

**Language/Version**: JavaScript ESM, Node24.19.0.
**Primary Dependencies**: somente node:fs, node:url, node:path no CLI/testes.
**Storage**: leitura de JSON sanitizado; nenhuma escrita do CLI.
**Testing**: node --test tests/operations/ops-metadata-presence.test.mjs.
**Target Platform**: Windows/Linux com Node24.
**Project Type**: instrumento interno sob demanda.
**Performance Goals**: máximo1MiB e1000 registros; nenhuma rede.
**Constraints**: sem process.env, dotenv, subprocessos, DB/SMTP/provedor;
erros genéricos e nenhuma cópia de entrada arbitrária para saída.
**Scale/Scope**:18 nomes históricos, três targets, uma branch explícita.

## Constitution Check

PASS pré e pós design: fonte histórica identificada e mandato atual;
entrega pequena; artefatos spec031; evidência/intenções separadas;
privacidade por whitelist; nenhum docs/raw; revisão independente antes publicação.
Sem violação ou alteração normativa. Ciência e aceites continuam externos.

## Project Structure

Documentação: este diretório (spec, plan, research, data-model, quickstart,
contracts/cli.md, checklists, tasks e evidências).
Código: scripts/ops-metadata-presence.mjs.
Teste: tests/operations/ops-metadata-presence.test.mjs.
Inventário/resultado: docs/reports/2026-10-25-hf-night-01/ops/.

## Phases

1. Spec/qualidade/design/checklist/tasks/analyze antes código.
2. Testes sintéticos primeiro; implementar parser/avaliação/CLI.
3. Executar inventário atual whitelist, regressões, revisão independente,
   converge e publicação contida. Operação hospedada fora do escopo.
