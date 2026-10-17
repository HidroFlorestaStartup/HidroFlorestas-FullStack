# Implementation Plan: Runners de contas

**Branch**: `014-account-test-runners` | **Date**: 2026-10-10 | **Spec**: [spec.md](spec.md)

## Summary

Corrigir seleção geral para reservar exclusão ao runner dedicado, preservando
assertions, fixtures e guards. Base Git: c59a7b6 (branch documental validada).

## Technical Context

TypeScript/Node24.19, Next16.3.6, Playwright1.55.1; PostgreSQL17 local isolado.
Nenhuma dependência ou migration nova. Testes: E2E geral, exclusão dedicada,
HTTPS e auditoria de schemas, sequenciais. Escopo: configuração de seleção e
comparação de checksums no preparador do banco sintético.

## Constitution Check

PASS antes/depois do design: intenção autorizada, spec própria, correção focal,
histórico preservado, dados sintéticos, nenhuma mudança científica/normativa.

## Project Structure

`playwright.config.ts`, configuração/runner dedicado existentes;
`scripts/accounts-migration-source.ts`, `scripts/accounts-database-setup.ts`,
`tests/unit/account-migration-source.test.ts`;
`specs/014-account-test-runners/{spec,plan,tasks,research,data-model,quickstart}.md`.

## Validation and rollback

A reprodução já observada fica na matriz. Alterar somente a seleção e reexecutar
os cenários com seus runners corretos; preservar a falha original. Rollback local:
reverter o commit focal, sem banco/dados remotos. Sem hook registrado.

## Correção adicional identificada na execução

FR-004: comparar SHA-256 do arquivo original e suas variantes LF/CRLF. Não editar
SQL histórico nem checksums do banco. Testar as duas direções e recusar mudanças
de SQL e comentários. Depois executar RegressionSetup no cluster com ownership
comprovado; preservar todas as migrations concluídas e aplicar somente a pendente.
