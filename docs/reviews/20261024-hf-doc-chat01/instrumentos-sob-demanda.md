# Instrumentos HF-INV — seleção sob demanda

**DOC-D05 — RECOMENDACAO.** Manter os instrumentos sob demanda, com seleção
explícita e leitura dos protocolos do SHA de origem. Uma eventual promoção
permanente exige subconjunto determinístico, owner, custo e gate definidos em
entrega posterior. Nenhum instrumento, script ou configuração foi alterado e
nenhum protocolo foi executado nesta missão documental.

## Seleção documental real dos instrumentos

O [índice de reprodução da candidata][S-PROTOCOLS] é a entrada recomendada, preservada por SHA. Ele já separa ambientes e os comandos efetivamente executados; não se propõe um novo script universal nesta missão.

| Seleção sob demanda | Entrada verificável existente | Uso recomendado e limite |
|---|---|---|
| A — NAV4/origem/login | `docs/releases/2026-10-23-hf-inv-local01/nav4/readme.md`, `nav4/protocol.md` e `scripts/hf-inv-nav4-local.ps1` em `00477e9`. | Selecionar fases Prepare/Origin/Navigation/Back/Audit/Stop conforme o runbook, com raiz privada/marker e identidade próprios; `Probe` conserva a rodada exploratória, não é retry automático. |
| B — IHFR e quota de capas | `docs/releases/2026-10-23-hf-inv-local01/ihfr/protocol.md`, `ihfr/run-evidence.json` e `tests/investigations/ihfr/two-request-quota.test.ts` em `00477e9`, apontados no índice. | Selecionar o protocolo conforme a assinatura. two-request-quota.test.ts exercita AreaCoverService/FakeCoverProvider e quota de CAPAS; não é prova de recuperação/concorrência IHFR. Não chamar PASS de cenário controlado de explicação retrospectiva da falha antiga. |
| C — navegação/mapa | `docs/releases/2026-10-23-hf-inv-local01/navigation/protocol.md`, `navigation/report.md` e `tests/investigations/navigation` em `00477e9`, apontados no índice. | Preservar a separação documento/RSC/API, perfis e controles; nenhuma reexecução ou ampliação da CI nesta missão documental. |

Os nomes desses protocolos são proveniência documental. As instruções completas devem ser lidas no snapshot antes de qualquer execução futura; esta seleção não certifica que todos os pré-requisitos ainda estejam disponíveis.

[S-BACKLOG]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md
[S-PLAN]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/implementation-plan.md
[S-STUDENT]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/d2168c840937a6120e32467f24cb46383e8dcd29/docs/reviews/20261024-revisao-thales/relatorio-de-revisao.md
[S-PACKAGE]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/package.json
[S-PROTOCOLS]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/environment-and-protocols.md
[S-NAV4]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/nav4/readme.md
[S-VERCEL]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/vercel.json
[S-HOMOL]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/releases/2026-10-21-frontend-rc/homologacao-e-entrega.md
[S-OPS]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/operational-readiness.md
[S-RESUME]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/evidence/operations-resumption-verification.json
[S-HANDOFF]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/operational-handoff.md
[S-ACCOUNTS]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/operations/account-homologation-runbook.md
[S-COVERS]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/operations/area-covers-runbook.md

## Precisão C1

package.json e os runners convencionais não selecionam tests/investigations/**; as configurações Playwright dedicadas permanecem distintas da suíte geral. A inspeção de seleção não é execução. Nenhum instrumento foi promovido a gate, instalado ou alterado. A [matriz C1](matriz-imp-c1.json) separa IMP-006-06, CRI-014-01 e CRI-016-01.
