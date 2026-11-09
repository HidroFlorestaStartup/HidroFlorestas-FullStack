# Validação e handoff

## Verificações locais sem banco

Com Node 24.19.0 e dependências do lock instaladas:

```sh
node --import=tsx --test tests/unit/ihfr-diagnosis-read-accessibility.test.tsx tests/unit/frontend-ihfr-presentation.test.tsx
npx prisma generate
npm run typecheck
npx eslint src/components/ihfr-diagnosis tests/unit/frontend-ihfr-presentation.test.tsx tests/e2e/support/frontend-ihfr-evidence.ts tests/e2e/ihfr-diagnosis-read.spec.ts tests/e2e/ihfr-diagnosis-manage.spec.ts
```

`prisma generate` apenas gera tipos locais ignorados; não acessa banco. Não executar o runner Windows nem apontar a bancos reais neste ambiente Linux.

## CI e prova visual

O coordenador publica o candidato protegido pelo seed S e executa os 15 gates oficiais no HEAD final. O gate Ihfr seleciona os seis cenários existentes; as capturas são copiadas para `.accounts-validation/frontend-ihfr/*-frontend-ihfr-*.png` e respectivos `*-viewport.json`, além do output Playwright.

Abrir as imagens de resultado, proveniência, ausência, gestão, modal, recuperação, mobile, texto 200% e paisagem. Conferir metadados `fullPage:false`, dimensão, escala e HEAD. Imagem encontrada não equivale a imagem inspecionada. Emulação de Chromium não equivale a hardware ou homologação humana.

## Limites

Sem merge, deploy, Preview, banco real, edição científica ou Codex local nesta frente. Regressão sintética, revisão Codex externa e homologação operacional devem ter recibos separados e vinculados ao HEAD efetivamente examinado.
