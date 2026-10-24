# Errata — GETs de rota Next e navegações documentais

Finding `CLI-D-P2-002`, revisão local de
`52cdf6ed28b12dfc0428cdf07f042c63f698da5c`, em23/10/2026. Procedente:
o recibo B classificou linhas GET do servidor como `document`; esses GETs podem
ser documento **ou RSC**. `router.push`/`router.refresh` nos fluxos de coleta e
dados ambientais não tornam cada linha do log uma navegação principal.

Esta errata deve acompanhar [run-evidence.json](../ihfr/run-evidence.json) e
[inv005-historical.json](inv005-historical.json). Ambos permanecem byte a byte
iguais ao HEAD52cdf6e. Não se apagaram linhas negativas, contagens ou resultados;
o [recibo estruturado da errata](http-classification-errata.json) identifica os
blobs/digests originais e as interpretações corrigidas. O manifesto B muda
somente para identificar os bytes reais da síntese `results.md` corrigida.

| Campo/afirmação anterior | Interpretação vigente |
|---|---|
| B `http[*].kind=document`, origem log Next | GET de rota não API; documento-ou-RSC, tipo de recurso não observado por essa fonte |
| B `document200`/`document404` | Contagem de GETs das rotas dashboard200/404; não contagem comprovada de documentos principais |
| Quinze documentos200/rodada | Quinze GETs de rota200/rodada; seis casos UI PASS em cada rodada. Não certificar quinze documentos ou ausência universal de document404 |
| `httpTotalLogged` e array `http` |84 linhas totais e47 selecionadas por rodada; filtros distintos, sem igualdade de cardinalidade |
| `interpretation.currentCounterproof` da primeira projeção INV-005 | B exercitou os mesmos seis casos e duas famílias, com UI PASS e GETs de rota200 documento-ou-RSC. C observou separadamente dois documentos200 e lookupAPI404 em jars próprios |

A evidência histórica dos seis404 tem suporte distinto: o listener imutável
[ihfr-diagnostics.ts em85e397bd](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/85e397bd4271ab07a197ea88db652227e6e392ce/tests/e2e/support/ihfr-diagnostics.ts#L16-L19)
só inclui navegação quando `isNavigationRequest()` e frame principal. Cada um
dos seis diagnósticos recuperados tem uma navegação404. Essas seis navegações
continuam classificadas como documentos; não são os GETs atuais B nem os
lookupAPI404 esperados. A validade da sessão histórica continua não estabelecida.

`EVIDENCIA_IMPLEMENTACAO`: correção da classificação e das sínteses, sem mudar
testes, resultados UI, produto ou fonte executada. `INFERENCIA`: GETs de rota
podem incluir RSC; sem headers/resourceType capturados não se separa a quantidade
exata. Não se reconstroem campos inexistentes. A causa antiga permanece
`INCONCLUSIVO`; não se repetem experimentos verdes para fabricar metadados.

O [recibo CLI na PR29](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6375354310)
preserva o finding no SHA anterior. O novo HEAD exige seus próprios CI/reviews;
processo CLI exit0 com finding não é aprovação. O Codex remoto sem findings do
HEAD anterior não refuta este P2. Merge e aceites continuam com o mantenedor.
