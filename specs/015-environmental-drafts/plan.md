# Implementation Plan: Rascunhos pessoais

**Branch**: `015-environmental-drafts` | **Date**: 2026-10-10 | **Spec**: [spec.md](spec.md)

## Summary

Tabela separada EnvironmentalDraft; payload fechado com discriminantes
absent/value/editing; autorização contextual/transação Serializable; salvar com
ID/revisão/key; reutilizar confirmação IMP-005 na mesma transação para consumo.

## Technical Context

TypeScript/Node24.19/Next16.3.6/React19.2.4/Prisma7.4.2/PostgreSQL17.
Nenhuma dependência nova. Testes node:test, Pg com schema próprio, Playwright.
UI existente é estendida mantendo parser científico estrito. Save limitado a
32 KiB, até 1000 caracteres por raw, campos allowlisted existentes.
Sem worker ou retention; leitura inativa autorizada/mutação bloqueada.

## Constitution Check

PASS antes/depois de design: decisão explícita registrada; spec/branch próprias;
fluxo vertical pequeno; testes proporcionais; fontes/histórico/ciência preservados.
Sem hooks. Pesquisa delegada somente leitura concluída em 2026-10-10.

## Project Structure

`src/types/environmental-draft.ts`, `src/app/api/server/environmental-data/draft.{service,http}.ts`,
rota contextual environmental-data/draft, formulário/página/state ambiental,
environmental-data.service/http e accounts/service; schema/migration aditivos;
tests/unit/integration/migration/e2e/environmental-draft*. Artefatos nesta spec.

## Design and execution

Salvar exige draftId null + expectedRevision 0 para criar, ou ID/revisão atuais
para atualizar. Primeira revision 1. Unique user/collection, sem upsert irrestrito.
Mesmo último saveKey/hash recupera resultado; conflitos não retornam payload alheio.
Discard exige ID/revisão; absent retorna sucesso, ID novo conflita (ABA protegido).
Confirmação atual aceita headers opcionais Draft-Id/Draft-Revision, verificados
juntos, sem afrouxar body fechado. Replay da medição é verificado antes do consumo.
Consume por deleteMany condicionado na transação Serializable da IMP-005, antes
do create; rollback restaura draft. Confirm pode usar alterações deliberadamente
revisadas ainda não salvas; versão salva selecionada deve permanecer vigente.
Exclusão 013 faz deleteMany de drafts pessoais após blockers e antes de User.delete.

## Validation and rollback

Migrations sobre cadeia existente em schema próprio; serviço/contratos negativos,
OCC/ABA/replay/concurrency/rollback, UI/mobile e regressão 005/013/IHFR/mail/contas.
Rollback da aplicação conserva tabela; não excluir dados nem remover triggers
científicas. Fora do produto, sem deploy/migration remoto. Evidência por fingerprint.

## Contratos verificados durante a implementação

Confirmação sem headers recusa quando há rascunho próprio vigente na transação;
replay confirmado continua idempotente. UI preserva células omitted/absent/blank
não editadas, zero/false e texto parcial. Raw acima de 1000 tem feedback recuperável.
Controle de saída usa beforeunload, links da aplicação e navigate cancelável da
Navigation API para histórico. Voltar/Avançar cancelados preservam posição e campos
no Chromium testado; navegador sem Navigation API cancelável não tem garantia de
interceptação do histórico. Não há autosave: salvar explicitamente antes de sair.
Sem expiração ou cleanup automático de rascunhos. Discard é definitivo; exclusão
de conta permitida limpa somente drafts próprios; ciência confirmada é preservada.
