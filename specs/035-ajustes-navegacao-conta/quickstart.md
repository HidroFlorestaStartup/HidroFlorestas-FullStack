# Quickstart de validação — Spec 035

Ambiente correto: repositório no HEAD da PR #46, Node 24.19.0 conforme `package.json`, lockfile intacto, PostgreSQL sintético próprio e nunca ambientes de provedores hospedados.

1. `npm ci --no-audit --no-fund`; `npx prisma generate`; `npx playwright install chromium`.
2. `npm run test:unit`; `npm run typecheck`; `npm run lint`; `npm run build`.
3. Com fixtures sintéticas isoladas do runner oficial: `npm run test:e2e`; verificar novo `hf-ui035-navigation.spec.ts` e regressões alteradas.
4. Rodar somente o `scripts/rc-review-validation.ps1` oficial em Windows/Node 24.19 com banco local sintético próprio, sem mudar os quinze gates; conferir resultado no SHA exato da PR e tentativa.
5. Conferir capturas `fullPage:false`, geometria nos artefatos do CI e ausência de segredos/senhas. Em 320/375/390/768/1440, conferir foco/último controle, safe-area emulada e ausência de scroll lateral.
6. Para UI-06 completa, iniciar o starter somente leitura em `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` e o FullStack no HEAD final com o mesmo laboratório/sessão/caso visual, comparar. Este passo **não foi executado** neste ambiente GitHub API-only.

Não executar merge, deploy, alteração científica ou consultas aos provedores hospedados para validar a navegação.
