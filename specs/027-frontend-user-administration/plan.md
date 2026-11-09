# Implementation Plan: Administração global

**Branch**: `feat/frontend-user-administration` | **Date**: 2026-10-21 | **Spec**: [spec.md](spec.md)
**Estado**: CANDIDATA_LOCAL; aguardando E2E real, inspeção visual, gates oficiais e revisão externa do SHA publicado.

## Summary

Adaptar composição de consulta, revisão, auditoria e navegação ao visual incorporado, preservando o contrato administrativo existente. Corrigir somente dois defeitos concretos de apresentação: resposta atrasada aplicada a outra seleção e recuperação de conflito que não atualiza a revisão selecionada.

## Technical Context

- **Language/Version**: TypeScript, Node 24.19.0, React 19.2.4, Next 16.3.8/App Router.
- **Primary Dependencies**: Tailwind e Lucide já instalados; nenhuma dependência nova.
- **Storage**: PostgreSQL existente, nenhuma escrita direta ou migration nesta frente.
- **Testing**: node:test/tsx, Playwright/Chromium, regressões oficiais no runner protegido.
- **Target Platform**: web responsiva, 320–1440 px, texto 200%, paisagem emulada.
- **Performance Goals**: preservar paginação 25, limite existente e consultas independentes; nenhuma nova meta de domínio.
- **Constraints**: sem backend, schema, OpenAPI, configuração global, serviços externos ou dados fictícios no produto.
- **Scale/Scope**: visão geral, lista/detalhe, diálogo e shell administrativos.

## Constitution Check

| Princípio | Pré-design | Pós-design |
|---|---|---|
| Hierarquia | PASS: C1 atual + IMP-009; starter somente visual | PASS: contratos referenciados |
| Entrega vertical | PASS: uma frente administrativa | PASS: fluxos existentes completos |
| Spec por feature | PASS: diretório027 livre | PASS: plano/tarefas/rastreabilidade próprios |
| Evidência | PASS: baselines exatos | PASS: CI/aceite humano separados |
| Segurança proporcional | PASS: proteção server-side intacta | PASS: nenhuma autoridade no cliente |
| Documentação evolutiva | PASS: histórico preservado | PASS: docs/raw sem alteração |
| Equipe | PASS: worktree e escritor exclusivos | PASS: CI/refs reservados à coordenação |

## Project Structure

Produto: `src/components/user-administration/**`, `src/components/admin-shell/admin-shell.tsx`, `src/app/(private)/admin/page.tsx`. Manter routes users e legado quando nenhum ajuste for necessário. Testes: `tests/unit/frontend-user-administration.test.ts`, `tests/e2e/frontend-user-administration.spec.ts` e helper próprio de captura no mesmo prefixo.

Documentação: spec, research, data-model, contracts/presentation, quickstart, tasks, analysis, traceability e implementation-evidence neste diretório. O ponteiro local ignorado `.specify/feature.json` é usado pelos scripts instalados e não será commitado.

## Execução e base

D = `1ea3cc2552c244e1004f4f733f838e0f9ea62993`; S = `b3f65f2ccd8a4b08cf53a1bebf16e3ba33db09a6`. Branch Git real `feat/frontend-user-administration`; os scripts Spec Kit reportam o slug027 como contexto, não alteram a branch. Árvore inicial limpa; node_modules é symlink local ignorado para dependências preparadas pela coordenação.

1. SPECIFY/PLAN/TASKS/ANALYZE usando skills instaladas; sem extensions.yml/hooks.
2. Preparar testes focais e E2E que verificam conta-alvo/revisão, teclado e reflow.
3. Implementar por recorte com GET/PATCH existentes, cancelar leituras antigas e manter modal acessível.
4. Executar unit/typecheck/lint focais; revisão de escopo/diff.
5. Commit PT-BR. Coordenação publica/roda 15 gates, obtém Codex externo e fornece artefatos para inspeção visual.

## Riscos, reversibilidade e pontos de revisão

Erros atuais de autoridade seriam bloqueio material, não tarefa visual. Nenhuma regra nova será criada para PENDING. Capturas sintéticas são evidência automatizada, não teste de leitor de tela. Alterações são reversíveis por commit sem migração. Risco de reflow/foco deve ser demonstrado por navegador real no runner; na ausência de runtime autorizado, registrar NOT_RUN. Sem merge/deploy.

## Histórico

2026-10-21: preflight e planejamento em S; regras e fonte visual lidas. Dois defeitos locais de estado identificados por inspeção, aguardando contraprovas de navegador. Estado atualizado em implementation-evidence.md.
