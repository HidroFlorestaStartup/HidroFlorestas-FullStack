# Pesquisa focal

`EVIDENCIA_IMPLEMENTACAO`: account-mail-harness existente usa IPC manual;
handleMailTrigger real já aceita segredo explícito e allowlist de métricas.
Node24.19 local importou trigger.ts com strip-types sem dependências ou env.
O aviso MODULE_TYPELESS_PACKAGE_JSON foi observado; package.json não será alterado.
Referência primária: [Node24 — TypeScript](https://nodejs.org/docs/latest-v24.x/api/typescript.html).
O mecanismo remove tipos erasable e não aplica tsconfig; este import não usa aliases/TSX.

`RECOMENDACAO`: ensaiar timer/HTTP/guard em localhost com callback falso e
relatório de contadores. Alternativa de scheduler hospedado é proibida; duplicar
worker SQL em fake seria falsa prova e não será feito. R1/outbox têm testes próprios.
