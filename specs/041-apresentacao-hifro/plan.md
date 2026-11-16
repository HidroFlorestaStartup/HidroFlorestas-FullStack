# Implementation Plan: Apresentação pública Hifro

**Branch**: `codex/apresentacao-hifro-20261116` | **Date**: 2026-11-16 | **Spec**: [spec.md](spec.md)

## Summary

Preparação operacional aditiva no banco confirmado por Pedro, com plano SQL privado gerado por TypeScript e aplicado pelo conector Neon. Nenhum deploy de aplicação necessário.

## Technical Context

**Language/Version**: TypeScript/Node24, PostgreSQL existente.
**Primary Dependencies**: bcrypt, tsx e avaliador IHFR já instalados; sem pacotes novos.
**Storage**: Neon hidden-art-76143033 / Universo IF br-green-firefly-b65qnqxd / hf_ui038_test.
**Testing**: Validação de contratos, inventário SQL antes/depois, hashes, relações e consultas HTTP autenticadas.
**Target Platform**: Produção existente da Vercel, vinculada a Universo IF por confirmação do usuário.
**Project Type**: Preparação operacional de dados e ativos.
**Performance Goals**: Uma transação de inserção e fotografias locais otimizadas.
**Constraints**: Sem overwrite, migrations, upload de capas ou gravação; nenhum segredo em Git.
**Scale/Scope**: Cinco usuários, um laboratório, três áreas, doze coletas, onze medições e nove IHFRs vigentes.

## Constitution Check

PASS: autorização atual e destino confirmados, branch/spec próprias, contratos existentes preservados e validação proporcional. Ciência e limitações experimentais não alteradas. Credenciais em arquivos privados temporários; histórico e dados anteriores preservados.

## Project Structure

- `scripts/prepare-hifro-presentation.ts`: somente gera plano privado; não abre conexão nem aplica SQL automaticamente.
- `docs/demonstracao-hifro/`: inventário sem senhas, fotos, licenças e recibo operacional.
- `specs/041-apresentacao-hifro/`: escopo, plano, tarefas e validação.

## Application Sequence

1. Inspecionar destino, conflitos e inventário inicial.
2. Gerar identidades próprias, validar payloads e calcular IHFR usando código existente.
3. Aplicar somente inserções em transação, com proteção contra conflitos; conferir totais e registros anteriores.
4. Validar login/leituras e preparar capas. Upload e filmagem permanecem adiados.
