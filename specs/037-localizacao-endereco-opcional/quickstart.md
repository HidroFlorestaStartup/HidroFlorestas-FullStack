# Quickstart de validação — Spec 037

> **Ambiente protegido:** CI oficial Windows com PostgreSQL sintético de ownership do runner. Jamais executar contra Neon/prod, serviço de e-mail, Cloudinary ou provedor externo. Esta nota não autoriza mudar env hospedado.

1. Inspecionar HEAD: `git rev-parse HEAD`, `git merge-base 07755822f5dc75fe2be1d924005d30ed99f64a0b HEAD`; confirmar PR #48 e alterações A/B antes de executar.
2. Em ambiente isolado e com dependências *locked* já instaladas: `npm run test:unit`, `npm run test:integration`, `npm run test:contract`, `npm run typecheck`, `npm run lint`, `npm run build`.
3. Executar `npm run test:e2e` somente com `tests/fixtures/auth-users.ts` habilitando banco sintético protegido; o runner recomendado é `scripts/rc-review-validation.ps1 -InitializeCiCluster` nas Actions oficiais. Não executar Playwright apontando para banco real.
4. Conferir 8 combinações de município/UF/CEP em `tests/e2e/hf-ui037-location.spec.ts`: 0/1/2/3 campos; validar `201`, DTO e `CollectionArea.cep` em PostgreSQL sintético; CEP malformado deve responder 400.
5. Verificar sugestões e geolocalização com fetch mockado, troca A→B, edição humana e falha 429. No E2E real, localizar `frontend-areas-hf-ui037-*.png` no artefato do SHA final e metadados de viewport/caso.
6. Analisar arquivo `.accounts-validation/results.jsonl` do **mesmo SHA**: todos os 15 gates ou indicar primeiro FAIL/NOT_RUN; distinguir eventual defeito A (`frontend-mobile-navigation.spec.ts`) da implementação C.
7. Provedor real permanece **NOT_RUN / NOT_CONFIGURED**; não confundir mocks com disponibilidade, limites ou conformidade operacional.

**Validações específicas adicionadas:** `tests/unit/hf-ui037-geocoding.test.ts`, `tests/integration/hf-ui037-reverse-route.test.ts`, `tests/contract/hf-ui037-address-optional.test.ts`, `tests/e2e/hf-ui037-location.spec.ts`, `tests/unit/area-contracts.test.ts`, `tests/e2e/area-registration.spec.ts`.

Não executar merge/deploy nem se a CI ficar verde; revisão independente e aceite humano são etapas externas.

## Nota de execução observada — CLOSE-C (2026-11-01)

O [run oficial 41251980306, tentativa 1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306) no `CODE_SHA_TESTED=63925b3639f3eec1dd4bd737f7be7adb881c83eb` terminou 15/15 PASS, 224 E2E. Os globs de `package.json`, `scripts/imp006-test-runner.ts` e `playwright.config.ts` incluem realmente as suites 037. No [artefato 13062501328](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306/artifacts/13062501328) existem capturas do formulário pela suíte geral `frontend-areas` (320/375/768/1440 px, com metadados; 320 px a 200% do texto), **mas não existem entradas próprias `frontend-areas-hf-ui037-location-{mobile,desktop}.png`**. Assim, o passo 5 acima descreve a expectativa do harness, não um arquivo encontrado. A execução com provedor real segue `NOT_RUN/NOT_CONFIGURED`; aceitar manualmente só com nova evidência e decisão, sem alterar o status técnico sintético.
