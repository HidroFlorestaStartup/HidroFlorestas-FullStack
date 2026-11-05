# HF-UI-044-CLOSE-PARALLEL-02 — parecer não autor

**BLOCKED_WITH_EXACT_FINDINGS.** Auditoria estática independente executada; revisão final de runtime e artefatos permanece pendente. Não é READY_FOR_MAINTAINER_REVIEW.

Revisor real: `/root/qa_final`, delegado após implementação e smoke local, distinto dos autores `/root/a_harness`, `/root/b_visual`, `/root/c_capture` e coordenador `/root`. O revisor não escreveu código auditado nem aprovou em nome de humano. Worktree `managed:hf044-qa/HidroFlorestas-FullStack`; branch própria `codex/hf044-qa-final-local-20261101`; somente estes dois relatórios foram escritos.

## Árvore e proveniência

- CODE_SHA_REVIEWED: `09ac98e7bbedd30a92fafe6dfc5165462e318deb`.
- Árvore: `844423332f26c6192a44d2b391fcc70143d65025`; base funcional `6c61056fe1dc2193e225d935f49b78cb6c6781ed`.
- Candidata ainda local, sem run/attempt/artifact novo; zero rodadas hospedadas publicadas.
- Diff vs6c:51 paths, sem delta em produto `src/**`, Prisma, dependências/lockfile ou proteção oficial de banco/runner/`rc-review.yml`. O único teste oficial alterado é UI037; a instrumentação bilateral permanece fora de `tests/e2e`.
- PRs45–48 consultadas pelo revisor: abertas/Draft, heads22bb9c1b/ff5db4f8/1c44058c/799c00a4. Não houve escrita remota pelo revisor.
- Os quatro documentos sanitizados são os mesmos blobs de33d9b8b1. O checkout principal foi observado limpo emc7b023f; não foi editado ou limpo por esta QA.

## Bloqueios reproduzíveis

| ID / gravidade | Evidência / path | Owner / reparo mínimo |
|---|---|---|
| QA02-PUB-001 HIGH — pré-condição de publicação | `static-verification.json:36` registra RootDirectory não observado; `:45` guard aplicável pendente. O coordenador informa rejeição nativa do loginGoogle e confirmação específica pendente. | Coordenador/operador: obter observação/recibo identificado suficiente de raiz e vínculo Git, confirmar false na raiz efetiva antes do primeiro push. Não contornar a revisão automática. |
| QA02-EVID-001 HIGH — UI06 obrigatório sem prova | `qa/hf-ui044/domain.spec.ts:208` e sumário shell existem, mas86pares A/75pares B são planejados. Não há PNGs pareados do produto/starter nem run novo. | Coordenador, A/B e QA: executar os jobs autorizados e inspecionar PNG+JSON reais; classificar diferenças e completude por caso. |
| QA02-EVID-002 HIGH — regressão/arquivo final sem prova | `scripts/hf-ui044-verify.mjs:5` exige journal ainda inexistente. Quatro nomes UI037 e uploader são compatíveis estaticamente, sem ZIP posterior às suítes. | Coordenador e QA:15gates da candidata final, depois quatro arquivos UI037, download por ID e digest/CRC/hashes/dimensões/proveniência verificados. |

Não foi demonstrado defeito novo de implementação nesta revisão estática. Os itens acima são lacunas obrigatórias de evidência e pré-condição; não rotulam código como aprovado nem inventam falha funcional.

## Evidência realmente auditada

O smoke de A é **sintético local, não produto**: Node24.14, Chromium153.0.8010.12, código9283f31. Recibo relata3/3PASS e contraprova antiga com16,2348px em vez de32px. A QA verificou17/17 hashes/tamanhos:8PNG,8JSON,1JSONL;58chunks PNG com CRC válido; dimensões320×900/1440×900, SHA exato, `fullPage:false`, fonte16/32px e hashes PNG nos JSONs coerentes.

Duas imagens foram abertas e inspecionadas: `fullstack-smoke-1440-100-1793566403189.png` e `fullstack-smoke-320-200.png`. Texto português está legível e a ampliação sintética é observável. Essas imagens não mostram o FullStack real nem o starter. A contraprova de cópia C2/2PASS é evidência sintética de filesystem registrada pelo autor/coordenador, não captura UI037 executada.

Parser PowerShell, `node --check` do verificador e whitespace do diff PASS pela QA. Typecheck/lint completos locais PASS são resultados do coordenador/autores e não runtimeNode24.19. Não houve nova bateria, banco ou provedor iniciado pela QA.

A leitura de código confirmou polling exato16/32px com rethrow/diagnóstico; CDP em TextNodes visíveis/glifos positivos e UNOBSERVED sem inferir fallback; reload observado antes da reconfiguração; índices incrementais incluindo NOT_RUN; sumários que falham por lacuna/erro. Seletores relevantes foram confrontados com o starter fixadocbb954a. Adapter e scores de demonstração permanecem somente na referência.

Workflow: quatro jobs5/35/35/35min=110min por rodada, até330min/3rodadas; teto adicional105min para CI funcional, combinado445min. Windows e setup-node24.19 pinados; Bun1.3.11 somente jobs starter; PostgreSQL owned somente jobs pertinentes. Guard exato por branch/push/tentativa1 recusa forced/deleted; uploads são allowlists14dias. A aplicabilidade Vercel permanece no bloqueioPUB-001.

UI037 copia imediatamente com COPYFILE_EXCL para `.accounts-validation/frontend-areas/`, fora de outputDir, nos quatro nomes `ui037-frontend-areas-hf-ui037-location-{mobile,desktop}-viewport.{png,json}`, com390×844/1440×900 e metadados sanitizados. Globs novos e oficiais cobrem os nomes; testes funcionais de três origens/stale/falhas foram preservados. Isso ainda não é UI037_CAPTURE_VERIFIED.

## Matriz UI01–UI07 da candidata nova

| UI | Recorte preparado | Execução nova | Comparabilidade | Requisito / completude |
|---|---|---|---|---|
| UI-01 | Shell/Conta A,86pares na suíte | NOT_RUN | INSUFFICIENT_EVIDENCE | HUMAN_DECISION_PENDING / MISSING |
| UI-02 | Área/coletas/origemCURRENT B | NOT_RUN | INSUFFICIENT_EVIDENCE | HUMAN_DECISION_PENDING / MISSING |
| UI-03 | Detalhe/registro B | NOT_RUN | INSUFFICIENT_EVIDENCE | HUMAN_DECISION_PENDING / MISSING |
| UI-04 | Ausência/resultado/qualificadores B+A | NOT_RUN | INSUFFICIENT_EVIDENCE | HUMAN_DECISION_PENDING / MISSING |
| UI-05 | Mobile/inset/foco/histórico A | NOT_RUN | INSUFFICIENT_EVIDENCE | HUMAN_DECISION_PENDING / MISSING |
| UI-06 | A86+B75=161pares planejados | NOT_RUN | INSUFFICIENT_EVIDENCE | HUMAN_DECISION_PENDING / MISSING |
| UI-07 | Preservação de2PNG+2JSON e teste C | NOT_RUN | INSUFFICIENT_EVIDENCE | HUMAN_DECISION_PENDING / MISSING |

Conta/reload e modelos/score do starter têm NON_EQUIVALENT planejado quando apropriado. A classificação final depende dos pares reais; não equivale a erro técnico nem aceite automático.

Nenhuma das flags UI06_A_EVIDENCE_COMPLETE, UI06_B_EVIDENCE_COMPLETE, UI037_CAPTURE_VERIFIED, COMPOSITION_REGRESSION_PASS da árvore nova ou INDEPENDENT_TECHNICAL_REVIEW_COMPLETE está comprovada. A revisão estática não substitui a conclusão após runtime.

## Histórico preservado e texto para PR45

O [parecer histórico composto](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6554039611) documenta15/15 apenas no6c61056f, [run41275910130/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41275910130), artifact13071771510. A [reconciliação A6/QA-C](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6559195702) preserva A isoladaFAIL e capturas/UI06 pendentes. Esses ZIPs não foram baixados por esta QA nem usados como prova da árvore nova.

Texto factual entregue ao coordenador, **não publicado por este revisor**:

> HF-UI-044-CLOSE-PARALLEL-02: código/harness A/B e preservação UI037 implementados em commits locais exclusivos, com revisão estática não autora `/root/qa_final` da candidata09ac98e/tree8444233. Smoke sintético local3/3PASS e integridade17arquivos verificada; contraprova C2/2PASS relatada. Runtime bilateral,15gates e ZIP final novos continuam NOT_RUN, zero rodadas publicadas, porque falta comprovar RootDirectory/guard Vercel e o login necessário foi rejeitado pela revisão automática. Resultado BLOCKED_WITH_EXACT_FINDINGS (PUB-001/EVID-001/EVID-002). O PASS histórico6c não foi transferido. Sem merge/deploy/aceite humano/científico; HUMAN_ACCEPTANCE_PENDING e GEOCODER_OPERATIONAL_PENDING mantidos.

CONTRATO_EXPERIMENTAL; VALIDACAO_CIENTIFICA_PENDENTE; SUJEITO_A_RECALIBRACAO; NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. G3/G4/G5 não foram encerrados.
