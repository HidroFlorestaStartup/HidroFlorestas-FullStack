# Estado Code-First conciliado —24/10/2026, C1

**Conciliação documental C1 concluída com limites explícitos e revisão independente; incorporação Git e ratificação permanecem separadas.** Continuidade de C0 pela missão HF-DOC-20261024-CHAT02. Este documento é o estado vigente da proposta CHAT; o snapshot C0 foi preservado integralmente.

## Resultado e base

O confronto do pacote LOCAL real com C0 e fontes primárias resolve a pendência de classificação detalhada. Base de edição: **c4adfb379e5dc78f27f31b91edbd13f43228d9f9**. Candidata #29: **00477e961e36416d8d602d36f7e0ee195c487148**, fonte separada. Alunos: **d2168c840937a6120e32467f24cb46383e8dcd29**, com autoria preservada. LOCAL: commit anunciado **6f24cb345b8b3a33c46b9b76c3eb6171328296bd**, transporte e documentos verificados; proveniência do objeto Git PARTIAL.

Há implementação estática material de IMP-002–009. As tabelas antigas de mock, placeholder e ausência de API não descrevem sozinhas esse snapshot e não devem orientar reimplementação. Os trinta registros materiais e dez fronteiras estão na [matriz C1](../../reviews/20261024-hf-doc-chat01/matriz-imp-c1.json), confrontados na [conciliação](../../reviews/20261024-hf-doc-chat01/conciliacao-local-chat.md). Isso não declara cada IMP integralmente aceita, nem execução de testes, homologação ou ciência aprovada.

RTH-P2-001 tem tratamento documental conciliado nesta proposta: adendo datado e quatro apontadores mínimos, com os corpos históricos preservados. Não está declarado corrigido em development enquanto o pacote não for incorporado. Fontes: [backlog de origem](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md), [plano de origem](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/implementation-plan.md) e [revisão dos alunos](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/d2168c840937a6120e32467f24cb46383e8dcd29/docs/reviews/20261024-revisao-thales/relatorio-de-revisao.md).

## Resumo das oito IMPs

| IMP | Módulo | Registros | Conclusão delimitada |
|---|---|---|---|
| IMP-002 | Laboratórios | 3 | Criar/listar, consultar/desativar/excluir têm cadeias reais. C02 parcial no avatar de iniciais do popup; ingresso/convites não localizados e fora do recorte contratado. |
| IMP-003 | Contexto, papéis e áreas | 4 | Contexto autorizado, gestão OWNER dos papéis existentes, cadastro de ponto e consultas persistidas. Ingresso e operação de capas conservam fronteiras próprias. |
| IMP-004 | Coletas | 3 | Preparar/revisar/confirmar, idempotência/recuperação e detalhe imutável presentes; não é draft persistente de metadados. |
| IMP-005 | Dados ambientais e drafts | 5 | Captura v1, confirmação única, leitura e drafts pessoais com recuperação presentes; captura técnica não homologa cálculo científico. |
| IMP-006 | IHFR experimental | 6 | Seis subcapacidades experimentais presentes: manifesto/parser/evaluator, elegibilidade, consultas, CREATE/REPLACE, revogação e recuperação. |
| IMP-007 | Dashboard e histórico | 2 | Resumo persistido e histórico derivado de dois tipos de evento, paginados e conectados; sem auditoria universal ou histórico científico. |
| IMP-008 | Mapa territorial | 3 | Mapa mínimo Leaflet/lista presente. Plotly/analítica futura não localizada; interação sem tiles e desempenho mantêm gates históricos próprios. |
| IMP-009 | Administração global | 4 | Leitura/mudanças de estado e papel/auditoria global presentes; não concede papel contextual. Retorno a PENDING depende de decisão explícita. |

## Oito dimensões independentes

As 64 células do resumo abaixo são projeções de summary[].axes da matriz JSON. Os 40 registros detalhados têm outras320 células próprias com fontes e limites; não constituem320 testes.

| Código | Significado C1 |
|---|---|
| I-PRESENTE | Capacidades materiais do recorte presentes por inspeção estática; sem conclusão universal da IMP. |
| I-PARCIAL | Operações presentes; C02 parcial no avatar do popup e ingresso separado não localizado. |
| I-MAPA-FUTURO | Mapa mínimo presente; Plotly/analítica futura não localizada. |
| L-NOT-RUN | Nenhum teste funcional local desta missão; fontes/recibos históricos conservam alcance e SHA. |
| CI-HISTORICA | CI própria NOT_RUN;15 PASS da00477e9 consultados, sem PASS universal por critério. |
| R-C1 | Confronto por subcapacidade; resultado e hashes da revisão independente em parecer próprio. |
| H-PENDENTE | Homologação no destino não demonstrada; G3–G5 conservam o inventário histórico. |
| A-PENDENTE | Nenhum aceite humano novo; critérios ausentes nomeados por registro. |
| S-PENDENTE | Contrato técnico de captura/engenharia não substitui validação científica IHFR. |
| S-N/A | Mecanismo técnico sem conclusão científica; dados/IHFR não recebem validade por associação. |
| N-BASE | Fontes de produto já presentes em c4adfb3; #29 e documentos C1 permanecem sem integração por CHAT. |

| IMP | implementacao | validacao_local | validacao_ci | revisao_tecnica |
|---|---|---|---|---|
| IMP-002 | I-PARCIAL | L-NOT-RUN | CI-HISTORICA | R-C1 |
| IMP-003 | I-PRESENTE | L-NOT-RUN | CI-HISTORICA | R-C1 |
| IMP-004 | I-PRESENTE | L-NOT-RUN | CI-HISTORICA | R-C1 |
| IMP-005 | I-PRESENTE | L-NOT-RUN | CI-HISTORICA | R-C1 |
| IMP-006 | I-PRESENTE | L-NOT-RUN | CI-HISTORICA | R-C1 |
| IMP-007 | I-PRESENTE | L-NOT-RUN | CI-HISTORICA | R-C1 |
| IMP-008 | I-MAPA-FUTURO | L-NOT-RUN | CI-HISTORICA | R-C1 |
| IMP-009 | I-PRESENTE | L-NOT-RUN | CI-HISTORICA | R-C1 |

| IMP | homologacao | aceite_humano | validacao_cientifica | integracao |
|---|---|---|---|---|
| IMP-002 | H-PENDENTE | A-PENDENTE | S-N/A | N-BASE |
| IMP-003 | H-PENDENTE | A-PENDENTE | S-N/A | N-BASE |
| IMP-004 | H-PENDENTE | A-PENDENTE | S-N/A | N-BASE |
| IMP-005 | H-PENDENTE | A-PENDENTE | S-PENDENTE | N-BASE |
| IMP-006 | H-PENDENTE | A-PENDENTE | S-PENDENTE | N-BASE |
| IMP-007 | H-PENDENTE | A-PENDENTE | S-N/A | N-BASE |
| IMP-008 | H-PENDENTE | A-PENDENTE | S-N/A | N-BASE |
| IMP-009 | H-PENDENTE | A-PENDENTE | S-N/A | N-BASE |

## Mudanças materiais e fronteiras

- **Laboratórios:** o popup geral tem nomes, com iniciais disponíveis no DTO mas avatar FR-015 não renderizado. C02 é parcial nesse critério. A lista de gestão OWNER apresenta iniciais e é outra superfície. Ingresso/convites continua não localizado, separado da criação e da gestão de vínculos existentes.
- **Coletas/dados ambientais:** preparação transitória da coleta não é draft persistente. Draft pessoal ambiental é incremento015/024 de IMP-005; não alimenta IHFR e não tem expiração automática no contrato observado. Captura v1 tecnicamente aprovada não ratifica fórmula científica.
- **IHFR:** GET de elegibilidade200 e POST de seleção incompatível422 são contratos diferentes. CREATE/REPLACE, revogação e recuperação por ledger existem estaticamente. O teste two-request-quota de INV-002 é de capas; não constitui prova de recuperação IHFR.
- **Mapa:** Leaflet/lista é recorte implementado; Plotly é direção futura confirmada, com integração/dados/gráficos abertos. Não criar IMP novo por equivalência numérica de specs.
- **Administração:** papel global não concede autoridade territorial. O retorno de conta ativada a PENDING permanece PENDENCIA_DE_DECISAO; código atual conservado. O adendo recomenda restringir PENDING à pré-ativação, sujeito a decisão expressa.
- **Capas:** tentativa/jobs antecedem upload do asset, após validação remota do preset. OWNERSHIP_MISMATCH termina BLOCKED; as redações LOCAL amplas foram corrigidas na conciliação sem alterar os originais.
- **Sessão/cadastro/UX:** spec010 é cadastro; IMP-010 é estudo humano SC-006/007. ACTIVE não dispensa verificação de e-mail quando exigida. Sessão, reset e SMTP accepted não provam recebimento humano no destino.

## Validação consultada e lacunas

CI/testes funcionais próprios: NOT_RUN. O recibo da #29 identifica run40030207450, tentativa1, job120676307853 e15 gates PASS em 00477e9; é histórico agregado, não execução C1 ou certificação de todos os critérios. A revisão dos alunos conserva seus resultados e SHAs. #27 tem review concluído em 223839c9, mas CI funcional desse HEAD permanece NOT_RUN; resultados de131ade3 não são transferidos. Evidências negativas e causas históricas inconclusivas de HF-INV permanecem preservadas.

Permanecem explicitamente abertos: aceites humanos de002/003/004/005; SC-008/009 de007; p95 de100 leituras/EXPLAIN/interação sem tiles de008; acessibilidade real de007/008/009; estudo SC-006/007 de IMP-010; homologação operacional e validação científica. Não preencher essas lacunas por existência de código, capturas ou nomes de testes.

## Decisões e adoção

As [oito recomendações DOC-D01–D08](../../reviews/20261024-hf-doc-chat01/decisoes-e-recomendacoes.md) identificam pergunta, fonte, opção principal, alternativa, efeito, dependência, risco, reversão, autoridade e estado. Priorizam decisão humana sobre #29, composição documental focal das fontes, instrumentos sob demanda e preparação operacional posterior. A proposta de capas desligadas no primeiro piloto exige ratificação; não foi aplicada.

Publicação Git bloqueada por gatilho e Codex remoto próprio NAO_SOLICITADO_PUBLICACAO_BLOQUEADA. A [matriz histórica G3–G5](../../reviews/20261024-hf-doc-chat01/matriz-prontidao-g3-g5.md) não foi substituída por consulta atual a provedores. C1 documental pode concluir com esses eixos pendentes.

Preservação: [matriz C0](../../reviews/20261024-hf-doc-chat01/matriz-imp-c0.json), [consumo LOCAL](../../reviews/20261024-hf-doc-chat01/consumo-local-c1.json), [revisão C1](../../reviews/20261024-hf-doc-chat01/revisao-independente-c1.md) e [validação C1](../../reviews/20261024-hf-doc-chat01/validacao-documental-c1.json). Os recibos C0 identificam os bytes do ZIP C0, não o estado atual desses caminhos.

IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
