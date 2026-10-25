# Validação focal

Na worktree admin, Node24 e instalação própria pelo lockfile:

```powershell
npx playwright test --config tests/ui/admin-access-focus.config.ts
npm run typecheck
npx eslint src/components/user-administration/user-administration-page.tsx tests/ui/admin-access-focus.spec.ts tests/ui/admin-access-focus.config.ts
```

O harness usa componente e CSS reais, origem .invalid interceptada, APIs sintéticas e nenhum servidor Next/banco. Requer Chromium instalado; toda rota não explicitamente permitida deve ser abortada. O controle de scheduler é sintético e identificado.

Expectativas: alerta focado após commit; 401/403 retiram lista, 404 retira só o alvo; dados/diálogo limpos; respostas descartadas e atualizações não relacionadas não roubam foco. Não alterar testes reais ou defaults para obter PASS. QA poderá repetir seu teste existente em commit identificado, sem integrar na worktree QA atual.
