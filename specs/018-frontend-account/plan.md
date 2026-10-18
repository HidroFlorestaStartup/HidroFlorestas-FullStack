# Implementation Plan: Cadastro e contas

**Branch**: `feat/frontend-account` | **Date**: 2026-10-18 | **Spec**: [spec.md](spec.md)
**Estado**: EM_ANDAMENTO. Execução autorizada pelo pedido atual e handoff de Pedro de 18/10/2026.

## Summary

Adaptar cadastro à composição do starter (painel descritivo e cartão) e harmonizar as demais contas ao login já integrado. Reutilizar contratos reais e estilos locais; nenhum backend, schema, middleware, provedor ou regra científica será alterado.

## Technical Context

**Language/Version**: TypeScript/React19.2.4, Node24.19.0.
**Primary Dependencies**: Next16.3.8/App Router, Tailwind4, lucide já instalado; nenhuma dependência nova.
**Storage**: PostgreSQL existente; nenhuma mudança de banco. Provas somente em memória.
**Testing**: node:test, Playwright e runner RC oficial com PostgreSQL sintético.
**Target Platform**: navegador desktop/mobile.
**Project Type**: aplicação web full-stack.
**Performance Goals**: sem novos requests ou bibliotecas para apresentação; trava síncrona para submissões.
**Constraints**: preservar autenticação, Idempotency-Key, mensagens e payloads; CSS Module local; sem dados reais.
**Scale/Scope**: seis páginas, cinco componentes de formulário e dois compartilhados de conta.

## Constitution Check

I: pedido/handoff têm autoridade no recorte, starter somente visual. II: entrega vertical das seis jornadas. III: artefatos próprios em specs/018. IV: Code-First EM_REVISAO; acesso ligado a IMP-001 e CF-UC-001, políticas posteriores nas Specs012/013. V: harness sintético, provas e campos mascarados. VI: preservar histórico/docs/raw. VII: branch própria, auth/schema sem edição. PASS antes e após desenho; sem exceções.

## Project Structure

Documentação: spec.md, plan.md, tasks.md, research.md, data-model.md, contracts/ui-contracts.md, quickstart.md, implementation-evidence.md e evidence/.
Código: src/app/register/page.tsx; src/components/account/{account-shell,password-field,account-controls,email-verification-form,forgot-password-form,password-reset-form,account-deletion-form}.tsx; account.module.css. Teste novo tests/e2e/frontend-account.spec.ts. Configuração focal em .github/workflows/rc-review.yml e vercel.json.

## Estado inicial e fontes

Worktree reutilizada: `C:/projetos/consolidados/HidroFlorestas-frontend-login`, inicialmente limpa, login5503082 preservado. Branch criada de origin/development `afef5db6ced1a4604a114d842bf85950ac32c69b`; sem avanço desde baseline. Main beba96f. RC0f669b7 preservada com dois ZIPs não rastreados. Outras worktrees inspecionadas e não alteradas.
Handoff lido diretamente de origin/docs/handoff-frontend-fases-2-3, sem merge documental. Starter oficial main/cbb954a obtido por fetch somente leitura. Guias Next locais CSS e Server/Client Components consultados. Hooks ausentes. Bash está no runtime Git portátil; primeira tentativa de caminho convencional indisponível, sem modificação por essa tentativa.

## Etapas e commits

1. Spec/checklist → pesquisa/plano/contratos → tarefas → análise de consistência; commit documental em português.
2. Testes RED de interação antes do código e capturas baseline pelo Next real/harness oficial; preservar FAIL sanitizado.
3. Implementar apresentação e guardas locais de hidratação/envio; GREEN dos mesmos casos. Contratos existentes não mudam.
4. Unit/integração/contrato/build/typecheck/lint/E2E/HTTPS/exclusão e demais 15 gates pelo runner; capturas 375/768/1440 e320/texto200 de todas as jornadas.
5. Revisão adversarial independente, tratar somente achados demonstrados, repetir checks afetados.
6. Allowlist exata e preview desabilitado antes de push. PR para development, CI no SHA publicado. Sem merge. Continuar fase3 após publicação validada.

## Dependências, riscos e reversão

AccountShell consumido por EmailVerificationForm, ForgotPasswordForm, PasswordResetForm (reset e troca), AccountDeletionForm; cadastro passa a usá-lo com variante split. PasswordField consumido por reset/troca/exclusão e cadastro. Login mantém CSS e código existentes. Matriz detalhada em contracts/ui-contracts.md.
Riscos: inércia SSR, double submit antes do rerender, idempotência incerta, estilo de exclusão, exposição de prova e regressão de selects Playwright. Tratar com cenários explícitos, sem enfraquecer assertions.
Reversão: commits de apresentação/testes delimitados, revert normal sob decisão do mantenedor; nenhuma reversão de banco. Não usar reset, rebase, force-push ou limpar arquivos preexistentes.
Fase3 provavelmente usará PR empilhado sobre HEAD validado desta fase para manter uma única sequência de entrega/configuração; decisão será reconferida na abertura da fase3. Aceite humano no PR, não bloqueia execução já autorizada.

## Verificações e histórico

2026-10-18: PLAN iniciado, baseline e consumidores inspecionados. Nenhum resultado de runtime desta fase declarado ainda. Pendências operacionais históricas e validação científica não são alteradas.
