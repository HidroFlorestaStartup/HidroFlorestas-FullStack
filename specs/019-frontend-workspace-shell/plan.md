# Implementation Plan: Workspace, navegação e shell
**Branch**: `feat/frontend-workspace-shell` | **Date**: 2026-10-18 | **Spec**: [spec.md](spec.md)
**Estado**: PLAN; código ainda não alterado.
## Summary
Adaptar hierarquia/cartões/workspace e chrome do starter ao Next real, mantendo serviços, contexto, seleção explícita e consumidores antigos.
## Technical Context
**Language/Version**: TypeScript, React19.2.4, Node24.19.0.
**Primary Dependencies**: Next16.3.8/App Router, Tailwind4, lucide existente; nenhuma nova.
**Storage**: PostgreSQL existente, sem alterações; menu/foco em estado local.
**Testing**: Playwright e15 gates RC oficiais; PostgreSQL loopback sintético próprio.
**Target Platform**: desktop/mobile375/768/1440 e320px/texto200.
**Project Type**: web full-stack existente.
**Performance Goals**: nenhum request/métrica/pacote novo para reproduzir apresentação.
**Constraints**: sem alteração de backend/guardas/AuthContext/ciência ou páginas de domínio; CSS Module local; contagem de main preservada por consumidor e um Sair visível.
**Scale/Scope**: workspace, TopBar, Sidebar, dois layouts, navegação contextual e logout.
## Constitution Check
I: pedido/handoff de Pedro18/10 têm autoridade no recorte; starter só visual. II: jornada vertical seleção/navegação/gestão/saída. III: artefatos próprios019. IV: CF-PRD-FR-003/004 e CF-US-004/005/007/008/CF-UC-004/006/016/017 mantêm classificação, requisitos globais EM_REVISAO não são aprovados silenciosamente. V: isolamento/fixtures/mascaramento e regressão transversal. VI: docs/raw/histórico preservados. VII: branch própria empilhada, edição de shared files por um implementador; revisão independente somente leitura. PASS antes/depois do desenho, sem exceção.
## Project Structure
Documentos: spec, plan, research, data-model, quickstart, tasks, contracts/ui-contracts, checklists/requirements, implementation-evidence e evidence/ nesta pasta.
Código: src/components/shell/{application-shell.tsx,shell.module.css,laboratory-navigation.tsx}; top-bar/index.tsx; sidebar/index.tsx; workspace/{laboratory-workspace.tsx,workspace.module.css,settings-dialog.tsx}; app/(private)/workspace/{layout,page}.tsx; dashboard/layout.tsx; dashboard/laboratories/[laboratoryId]/layout.tsx; app/logout/page.tsx. Nenhuma edição em laboratory-context.tsx ou parent guard/restorer.
Testes: tests/e2e/frontend-workspace.spec.ts e abertura explícita do menu no teste móvel existente account-deletion.spec.ts, sem alterar assertions de domínio. Workflow/vercel: somente nome exato da branch e PNGs sanitizados.
## Baseline e estratégia
Worktree única reutilizada C:/projetos/consolidados/HidroFlorestas-frontend-login. origin/development afef5db6ced1a4604a114d842bf85950ac32c69b e main beba96fbf6bbaac8771dbb29abea2f9f8f5b0054 reconferidos após fetch; sem avanço. RC0f669b79a5e73a329832593229c2557d8b12bbce e dois ZIPs preservados.
Fase2 PR11 aberto/não integrado, HEAD8cacfc99ba0e2876c1036a0f67ec41375806b9ac. Sua fonte passou15 gates locais e CI39165060917 em5d8733f;8cacfc9 só acrescenta recibos documentais e tem novo CI em acompanhamento. Esta fase parte desse HEAD cumulativo, sem duplicação. Dependência: AccountShell/estilos018 para logout e configuração cumulativa CI/Vercel. Base temporária do PR: feat/frontend-account. Ordem recomendada: mantenedor revisa/integra11; depois conferir ancestralidade/diff e redirecionar este PR para development. Sem merge/rebase/force-push.
Starter oficial cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f somente leitura. Guias locais Next consultados; sem AGENTS mais específico, numbering sequential,019 realmente livre, branch preferida inexistente. feature.json ignorado é seletor local. Hooks ausentes.
## Execução e commits
1. specify/checklist → plan/research/contracts → tasks → analyze; commit documental português.
2. Testes antes do código: baseline visual e RED de foco/menu/reflow/erros/travas, sem forçar falhas quando preservação já passa.
3. Shell/layouts/context nav; workspace/cards/dialog; logout por AccountShell018. Payloads/handlers reais preservados; correções locais somente demonstradas no RED.
4. GREEN dos novos casos e regressão completa oficial, capturas e inspeção visual real.
5. Revisão independente/adversarial; tratar achados e repetir apenas checks afetados.
6. Allowlist/if e Previewfalse antes de push, commits pequenos, PR empilhado, CI15 gates no HEAD cumulativo publicado e artefato inspecionado.
## Dependências, risco e reversão
Matriz em contracts/ui-contracts.md precede qualquer alteração shared. Riscos: sessão/contexto, autoridade global versus OWNER, main duplicado, Sair duplicado, erro atrás do modal, foco e conteúdo antigo obscurecido.
Fixtures: criação própria AUTH001+prefixo IMP-002 E2E, áreas/roles AREA301–304; teardown exato, papel global temporário restaurado em finally. Não criar54 admins sem cleanup.
Reversão: revert normal de commits de apresentação sob decisão do mantenedor; nenhuma reversão de banco. Sem reset/clean/stash automático/force/rebase/deleção de worktrees.
Aceite humano e certificação de acessibilidade não são inferidos de testes automatizados.
