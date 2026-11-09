# HF-CLOSE-01 — disposição das seis instruções dos alunos

Data: 2026-10-25. Autoria desta síntese: agente nativo `/root/preservacao_a`.
`FATO_DOCUMENTADO`: a origem das seis instruções é o documento
[Próximos passos para Thales][alunos-passos], preservado integralmente com os
outros três originais pela fonte #33. O título e os créditos históricos não
autenticam autoria humana por conta Git ou metadata de commit.

`DECISAO_CONFIRMADA`: a ratificação explícita de HF-CLOSE-01 nesta sessão,
atos C-A a C-F, autoriza composição e disposição administrativa condicionadas
aos gates do contrato. C-F confirma as decisões de manutenção abaixo. O
[plano/checklist](readme.md) registra o mandato e os limites; esta síntese não
concede operação, aceite humano ou validação científica.

Este documento fixa fatos conhecidos antes do freeze da candidata. O
[manifesto](manifesto-integracao.json) identifica o conteúdo composto; SHA
final, CI, Codex Review, merge e estados reais das PRs produzidos depois do
freeze pertencem ao recibo verificável da PR agregadora. Um ato condicionado
descrito aqui não é evidência de que já ocorreu.

| Instrução original | Disposição do recorte técnico | Evidência e pendência real |
|---|---|---|
| 1. Fechar a decisão da #29 | `CONCLUIDA_NA_BASE` | A #29 já foi integrada por [merge `df0ac5a9ebf4b1f307ddb379f73188ab0520d6fb`][merge29]. Seu HEAD `00477e961e36416d8d602d36f7e0ee195c487148` permanece ancestral da base. Não se repete o merge nem se transfere sua CI à agregadora. |
| 2. Reconciliar documentação Code-First | `CONCLUIDA_DOCUMENTALMENTE_NA_BASE` | [C1][c1] e sua matriz de 40 registros foram integrados pela #31, merge `3b5e0babc82cc552400b09208db49ed1c4d7a232`; os 16 documentos LOCAL vieram pela #30. A matriz e seus oito eixos não são recriados. As melhorias #33–#39 ficam compostas nesta candidata; só o recibo pós-merge permite chamá-las de integradas em `development`. C1 mantém seu corte histórico, inclusive a lacuna FR-015 tratada posteriormente pela #34. Aceites/operação/ciência continuam separados. |
| 3. Resolver a topologia das PRs antigas | `DISPOSICAO_RATIFICADA; ATO_ADMINISTRATIVO_CONDICIONADO` | A #32 já preservou 206/206 blobs documentais próprios da #27 na base `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`, excluindo deliberadamente suas duas configurações antigas. Os oito caminhos #28 estão discriminados abaixo. C-E autoriza fechar #27/#28 sem merge integral somente após integração verificada, HEADs reconfirmados e prova de preservação; os estados administrativos reais ficam no recibo da PR agregadora. Branches, commits, créditos e comentários permanecem preservados. |
| 4. Decidir o destino dos instrumentos investigativos | `DECISAO_DE_MANUTENCAO: ADOTADO_SOB_DEMANDA` | C-F ratifica diagnóstico sob demanda, com seleção explícita dos [protocolos existentes][instrumentos], do [runbook QA][qa-runbook] e das fixtures/custos/limitações neles descritos. Não há promoção aos globs usuais. O scheduler LOCAL #37 e o verificador offline #35 mantêm comandos próprios e provas sintéticas; não qualificam o scheduler ou a configuração do destino hospedado. |
| 5. Higienizar configuração de branch | `DECISAO_DE_MANUTENCAO: GUARDAS_MANTIDAS; LIMPEZA_ADIADA` | C-F ratifica conservar as guardas e adiar a limpeza ampla. A retomada exige consumidores externos e necessidades de rerun conhecidos, seguidos de autorização específica para um diff próprio. O acréscimo focal da guarda da agregadora e de seu nome nos dois seletores RC é autorizado por C-B; não executa a limpeza histórica. Nenhuma remoção/generalização está declarada. |
| 6. Planejar G3–G5 com autoridade explícita | `PLANEJAMENTO_PREFLIGHT_ENTREGUES; RESPONSAVEIS_E_AUTORIDADE_OPERACIONAL_PENDENTES` | O [handoff operacional #35][ops] e os instrumentos #35/#37 preparam o próximo ato. `G3=BLOCKED; G4=BLOCKED; G5=BLOCKED`. Responsáveis, destino isolado e autorizações continuam `A_DESIGNAR` / `NAO_AUTORIZADO`. O quadro em [pendências operacionais](pendencias-operacionais.md) identifica somente os atos externos necessários; não atribui operadores por inferência. |

O recorte técnico pode ser encerrado depois dos gates e da disposição
administrativa autorizada, mantendo essas qualificações. **Nem todos os atos
operacionais das seis instruções foram realizados.** Em particular, a limpeza
ampla foi adiada por decisão de manutenção, e G3–G5 não foram executados nem
aceitos integralmente.

## Preservação dos originais e das conciliações

`EVIDENCIA_IMPLEMENTACAO`: a comparação dos objetos Git fixados verificou os
conjuntos abaixo na composição dos sete merges, antes dos adendos finais. A
prova é de conteúdo e modo Git; conversões físicas de EOL no checkout não são
igualdade presumida de bytes físicos. O manifesto contém os caminhos e blobs
para a reconferência da candidata final e pós-merge.

| Conjunto protegido | Fonte / resultado delimitado |
|---|---|
| Quatro originais dos alunos | Fonte `d2168c840937a6120e32467f24cb46383e8dcd29`; 4/4 modos/blobs iguais na #33 e na composição. Relatório `31394011249d0cc14bef31476e8967e316c5e64c`; próximos passos `0fb8a7f4ac2c07a3bb5079be36c98494a8616fa6`; evidências `9b34016408c0e9693e11e45417d7b368cf783b25`; plano `2bd10ed9491182098e332fb2ba9c791f3a18e4df`. O [recibo estudantil #33][students] preserva a atribuição e o histórico. |
| Documentos próprios #27 | 206/206 modos/blobs iguais entre `223839c9ae91591ded8de387144d8c1ee84b5c20`, a base integrada via #32 e a composição. São 205 caminhos da release e um plano, conforme o [inventário exato C1][inventario]. `.github/workflows/rc-review.yml` e `vercel.json` antigos ficaram fora dessa incorporação documental. |
| LOCAL e C1 | 16/16 documentos LOCAL e 24/24 artefatos C1 preservados em relação à base integrada; quatro apontadores anteriores preservados conforme a união das fontes, incluindo o adendo estudantil autorizado em `PROJECT_CONTEXT.md`. O [recibo de consumo LOCAL][local] conserva seu limite histórico de proveniência; esta conferência de blobs não o reclassifica. |

## Oito caminhos da #28 e seus destinos

`EVIDENCIA_IMPLEMENTACAO`: os oito links abaixo resolvem para paths/blobs
existentes no objeto Git local exato
`f56f73fda1d7bd459a1415bf02df25edc9120674`. A reconfirmação de acesso remoto e
do HEAD no ato de fechamento cabe ao coordenador. A fonte histórica e sua
branch são preservadas; o contrato ratifica esse modo de retenção do conteúdo
exclusivo, sem transplante adicional.

| Origem imutável | Blob Git | Destino e estado do conteúdo |
|---|---|---|
| [PROJECT_CONTEXT.md][p28-context] | `f53118539bcb9359e109916b456f8db8ec0a29a3` | Apontador histórico sobreposto, preservado na fonte. A árvore composta usa o estado posterior da #29/C1 e o adendo #33; não copia o apontador antigo para restabelecer um estado preparatório. |
| [DOCUMENT_REGISTER.md][p28-register] | `32cbd7afcae79b91de1de664ccc8b33907855fd1` | Apontador histórico sobreposto, preservado na fonte; o registro integrado identifica a execução posterior. |
| [Plano da investigação de 23/10][p28-plan] | `eaa9f7f7e78dc082d3105fa176baf598f56cc4bb` | Documento novo exclusivo, preservado na fonte histórica; ausente da base e da composição. Não foi copiado para `development`. |
| [Recibo de preparação][p28-evidence] | `9cf9332e3460ddfec984aabfc837dee2e171de4c` | Documento novo exclusivo, preservado inteiro na fonte histórica; ausente da base e da composição. Seu estado preparatório não é reescrito como execução. |
| [Prompt de execução][p28-prompt] | `59b1e9acd7230f6694a8469902e0f16960713b21` | Documento novo exclusivo, preservado na fonte histórica; ausente da base e da composição. É origem histórica, sem emitir nova autorização. |
| [Plano pós-consolidação de 21/10][p28-post-plan] | `bb7da549738d498f9fc12c936949d28a1f102904` | Adendo exclusivo preservado na fonte histórica. O caminho preexiste na base/composição com outro blob; o adendo #28 não foi copiado. |
| [Investigações pós-consolidação visual][p28-visual] | `a2e848b1d22188d45e625b5a2e3c20e1f66b4afe` | Apontador histórico sobreposto, preservado na fonte; a árvore integrada conserva a execução posterior, sem apagar FAILs antigos. |
| [Prompt pós-consolidação de 21/10][p28-post-prompt] | `eed77f9ff74956e958901999d6e3c37f5bfb0233` | Adendo exclusivo preservado na fonte histórica. O caminho preexiste na base/composição com outro blob; o adendo #28 não foi copiado. |

`FATO_DOCUMENTADO`: a finalidade preparatória da #28 foi sucedida pela execução
#29 e conciliada por C1. Isso autoriza a disposição prevista em C-E após as
verificações específicas; não declara equivalência integral das duas árvores,
merge da #28 ou cópia dos cinco conteúdos exclusivos para `development`.

`RESTORE_OPERACIONAL=NAO_HOMOLOGADO`. O FAIL histórico
`CATALOG_CONSTRAINT_MISMATCH` e os 188 probes finitos permanecem separados e
preservados; não foram reclassificados como sucesso integral ou recuperação
hospedada. Aceite humano/assistivo permanece pendente.

IHFR mantém `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

[alunos-passos]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/d2168c840937a6120e32467f24cb46383e8dcd29/docs/reviews/20261024-revisao-thales/proximos-passos.md
[merge29]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/commit/df0ac5a9ebf4b1f307ddb379f73188ab0520d6fb
[c1]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/docs/code-first-prd/implementation/estado-conciliado-20261024.md
[instrumentos]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/docs/reviews/20261024-hf-doc-chat01/instrumentos-sob-demanda.md
[qa-runbook]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/6b9ed579912ee9ca1590cff41779232ade40d966/docs/reports/2026-10-25-hf-night-01/qa/runbook.md
[ops]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/efd0bae2a3c4339373a3100717c5fe77345c4d02/docs/reports/2026-10-25-hf-night-01/ops/runbook.md
[students]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/9a2b757c32f28d2bb5ab505239c175b55fab9f20/docs/reports/2026-10-25-hf-night-01/students/evidencias.json
[inventario]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/docs/reviews/20261024-hf-doc-chat01/inventario-prs-c1.json
[local]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/08262dc57c1ad365244f9ec6902b1e4be39e2d7d/docs/reviews/20261024-hf-doc-chat01/consumo-local-c1.json
[p28-context]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/PROJECT_CONTEXT.md
[p28-register]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/governance/DOCUMENT_REGISTER.md
[p28-plan]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/plans/active/investigacoes-intermitentes-20261023/plano-de-execucao.md
[p28-evidence]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/plans/active/investigacoes-intermitentes-20261023/preparacao-evidencias.json
[p28-prompt]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/plans/active/investigacoes-intermitentes-20261023/prompt-de-execucao.md
[p28-post-plan]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/plans/active/pos-consolidacao-frontend-20261021/plano-de-execucao.md
[p28-visual]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/plans/active/preparacao-incorporacao-frontend-20261018/investigacoes-pos-consolidacao-visual.md
[p28-post-prompt]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/releases/2026-10-21-frontend-rc/prompt-pos-consolidacao.md
