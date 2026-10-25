# Validação sintética de foco

Pré-requisitos: Node24.19+, `npm ci --offline --no-audit --no-fund` quando cache disponível, Chromium local Playwright. Não iniciar Next, banco ou SMTP. Não ler .env real. Engine Prisma de QA pode ser referenciado por leitura para geração local ignorada, sem migration.

1. `npx playwright test --config tests/ui/async-read-focus.config.ts`: harness de navegador com APIs sintéticas e todo egress bloqueado. Primeiro demonstrar RED no baseline; depois confirmar identidade/foco/nome/outline da região em loading/error/success/zero, paginação ida/volta/refresh, retry, no initialfocus, ação não focada, intenção posterior, abort/context replacement, fast/delayed e texto200%320/375/768/1440.
2. `npx eslint src/components/async-read-focus.ts src/components/dashboard/dashboard-summary.tsx src/components/dashboard/dashboard-history.tsx src/components/territorial-map/territorial-map-view.tsx tests/ui/async-read-focus.spec.ts tests/ui/async-read-focus.config.ts`.
3. `npm run typecheck`, após gerar Prisma localmente com engine já disponível, sem banco.
4. Revisar três TSX segundo skill vercel:react-best-practices; executar `git diff --check` e validar referências/scope.

Recibos e limites em [implementation-evidence.md](implementation-evidence.md). Os testes automatizados não substituem leitores de tela, zoom de navegador ou aceite humano reais. Ampliação de texto200% é avaliada por font-size raiz, com fonte de fallback local, e não reivindica equivalência visual da fonte produtiva.
