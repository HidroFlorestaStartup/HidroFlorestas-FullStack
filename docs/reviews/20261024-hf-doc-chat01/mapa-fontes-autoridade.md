# Mapa de fontes e autoridade — C-A

**HF-DOC-20261024-CHAT02 — C1 / conciliação documental concluída com limites explícitos.**

Mapa C0 reaproveitado com atualização focal do estado vivo. Recibos de autoridade históricos permanecem íntegros; fatos novos de consumo e confronto estão em consumo-local-c1.json e fontes-confrontadas-c1.json.

Autoria histórica C-A preservada; atualização C1 por coordenação com fragmento C-D. Fontes imutáveis e decisões de origem conservam seu alcance. Nenhum arquivo LOCAL foi alterado.

## Regra aplicável

A governança distingue decisão, implementação e validação. A constituição orienta a entrega transversal em conjunto com `AGENTS.md` e `PLANS.md`; esta frente não cria spec funcional, novo IMP ou ADR normativo. A missão atual prevalece sobre sequências operacionais de prompts históricos: ela autoriza decisões/revisão/documentação e proíbe implementação, testes funcionais, configuração, merge, deploy e e-mail. [S01], [S02].

| Assunto | Fonte competente | Utilização permitida | O que não decorre dessa fonte |
|---|---|---|---|
| Escopo CHAT/LOCAL e limites desta execução | Pedido do usuário e continuação HF-DOC-20261024-CHAT02 anexada | Preservar C0 e fechar C1 após consumo dos bytes LOCAL e confronto; ownership exclusivo | Transferência do ownership LOCAL, aprovação da #29, riscos aceitos, designação de operadores ou autorização operacional |
| Classificação e resolução de conflitos | SOURCE_AUTHORITY no baseline [S01] e política Code-First [S02] | Usar FATO_DOCUMENTADO, EVIDENCIA_IMPLEMENTACAO, DECISAO_CONFIRMADA, INFERENCIA, RECOMENDACAO e PENDENCIA_DE_DECISAO | Código como intenção científica/produto; repetição de proposta como aprovação |
| Estado real implementado | Código/schema/testes/configuração no SHA inspecionado; matriz LOCAL recebida e confrontada, com três divergências tratadas em C1 | Provar o que foi localizado e o alcance de uma validação registrada | Homologação, aprovação humana, prova de comportamento não executado |
| Resultado de CI da #29 | Recibo da CI no HEAD 00477e9 [S05] e run apontado | Consultar quinze gates próprios da candidata, distinguindo consulta de execução CHAT | Transferência de PASS a development, CHAT, LOCAL, #27 ou outro SHA |
| Parecer técnico dos alunos | Quatro arquivos em d2168c8, especialmente [S03] e [S04] | Incorporar mérito da análise com crédito, data, baseline e limites | Aprovação formal de mantenedor; uso do ZIP antigo como baseline; licença para merge integral da branch |
| Registro de integração documental da #27 | Comentário de Pedro de 23/10 [S06] | Reconhecer decisão anterior de incorporar relatórios após revisão aplicável mantendo investigações abertas e piloto bloqueado | Aceitação dos riscos operacionais, autorização desta missão para efetuar merge ou dispensar checks |
| Conclusão de review da #27 | Recibo/resumo exatos confirmados pelo adendo [S07] | Corrigir o estado corrente para completed no SHA 223839c9, preservando running como histórico | Review humano APPROVED, CI funcional desse HEAD, cancelamento demonstrado da tentativa anterior |
| Preparação/execução HF-INV | Preparação f56f73f [S08] e recibo posterior de execução [S15] | Distinguir plano preparado da investigação executada na #29 | Fechamento da #28 sem cotejo de conteúdo exclusivo; apagar NAO_INICIADO da época da preparação |
| Operação G3–G5 | Inventário histórico #27 [S11] e handoff #29 [S12] | Planejar provas e papéis pendentes no destino próprio | Inventário atual do provedor; identidade de banco pelo ID de env; HTTP 200 como sessão; SMTP accepted como recebimento; destinatário de relatório como operador |
| Ciência IHFR | Decisão experimental/ADR citados em TECH_DECISIONS [S13] e autoridade científica designada | Manter versão, proveniência, imutabilidade e qualificadores experimentais | Validação científica definitiva ou aplicabilidade territorial universal |

## Decisões já confirmadas, com origem e alcance

Estas são decisões **registradas nas fontes**; o agente não as ratifica novamente. Sua existência não autoriza executar atos que a missão atual exclui.

| Registro | Origem identificada | Escolha e alcance | Limite preservado |
|---|---|---|---|
| Escopo documental HF-DOC atual | Usuário, pedido de 24/10/2026 e missão anexada | Executar CHAT em PARALELO, três subagentes quando disponíveis, revisão/documentação e consumo do handoff LOCAL por SHA | Sem código, testes funcionais, configuração, merge, deploy ou e-mail |
| Incorporação dos relatórios pós-consolidação | Pedro; comentário [S06], publicado sob PedroVitor237 em 23/10/2026, descrito como registro técnico por Codex autorizado | Integrar relatórios após revisão aplicável mantendo investigações abertas e piloto bloqueado | Não é evento formal de review humano e não aceita/libera riscos G3–G5 |
| TD-015 | Equipe HidroFlorestas; solicitações de 18/09 e 20/09/2026 registradas em [S13] | Avaliador determinístico server-side TypeScript, manifesto experimental v0.1.1; v0.1.0 preservada | Sem Python/FastAPI/serviço externo/IA generativa nesta versão; ciência pendente |
| TD-016 | Equipe HidroFlorestas; solicitação focal de 19/09/2026 registrada em [S13] | Sete valores/scores de landUseType, predominância única, rejeição de desconhecido e ausência como insuficiência | Decisão experimental de engenharia; perfil regional e aplicabilidade científica não aprovados |
| TD-010 | Equipe solicitante; atualização documental IMP-008 de 18/09/2026 registrada em [S13] | Plotly como direção futura de gráficos após IMP-009 | Não implementado no registro; não escolhe arquitetura, gráficos, entradas, Python ou novo motor de mapa |
| TD-017 e refinamento posterior de sessão | Equipe solicitante em 28/09/2026; refinamento da spec012 e coorte de 04/10 citados em [S13] | Cadastro público cria ACTIVE; sessão normal depende da verificação no recorte posterior | Estado administrativo ACTIVE e verificação são dimensões distintas; não restaurar leitura histórica de login imediato como contrato atual |
| PD-CRI-005 e PD-CRI-006 | Resposta explícita do usuário em 10/10/2026, registrada em [S14] | Draft pessoal por usuário/coleta, save explícito, descarte definitivo, sem expiração automática, consumo ao confirmar e cleanup na exclusão permitida | Não remover vínculos científicos para viabilizar exclusão de conta; não manter a antiga recomendação de 30 dias como decisão vigente |
| PD-CRI-007, PD-CRI-008 e PD-CRI-009 | Resposta explícita do usuário em 10/10/2026, registrada em [S14] | Uma capa autenticada, mutação OWNER/ADMIN contextual, JPEG/PNG/WebP, 10 MiB/4096 px por lado, remoção EXIF e cleanup por ownership | Não autoriza upload/exclusão externos nesta missão; responsável por créditos PD-CRI-010 continua sem designação |

TD-001 a TD-007 conservam a classificação canônica `DECISAO_RELATADA_PENDENTE_DE_VERIFICACAO` apesar da coluna decisória CONFIRMADO. Não corrigir essa ambiguidade por inferência nem reescrever TECH_DECISIONS nesta missão. A política Code-First admite decisões de trabalho para rascunho quando corroboradas, sem promover aprovação. [S02], [S13].

## Contrastes relevantes para a síntese

| Contraste | Resolução documental | Dependência remanescente |
|---|---|---|
| Alunos sugerem integrar #29 antes de conciliar; missão autoriza conciliar em paralelo | Mandato atual permite preparar documentos a partir de development observada e citar #29 como candidata | Merge da #29 continua pendente do mantenedor; dependência documental LOCAL cumprida em C1 |
| Corpo da #27 informa running; recibo posterior informa completed | Usar a conclusão por SHA, preservar histórico; CI do HEAD continua NOT_RUN | Não reabrir review concluído sem delta/achado material novo |
| Corpo #28 cita b84f423/NAO_INICIADO; HEAD é f56f73f e #29 executou a etapa | Distinguir checkpoint, preparação e execução vinculada ao novo SHA | Cotejo concluído: três novos documentos, dois adendos exclusivos e três apontadores; supersessão de finalidade recomendada, encerramento humano pendente |
| G3–G5 bloqueados, mas Pedro aprovou incorporação de relatórios | Documentar bloqueios não depende de resolvê-los; autorização limitada de incorporação não equivale a operar | Composição de configurações e qualquer merge/ato operacional dependem de decisões próprias |
| “Remover/generalizar entrada temporária” pode misturar workflow e deployment | Classificar separadamente gatilho de teste e contenção de deploy | Nenhuma guarda muda nesta missão; publicação bloqueada enquanto contenção não demonstrada |
| Drafts antigos recomendavam retenção de 30 dias; decisão posterior elimina expiração automática | A decisão explícita posterior governa o recorte, mantendo a recomendação antiga como histórico | Não exige novo código ou nova decisão nesta missão |
| Metadados Git identificam autor do commit; relatório tem Thales no título | Preservar o crédito do pacote dos alunos e a proveniência Git sem inferir autoria intelectual exclusiva | Cotejo de conteúdo exclusivo e revisão C-R no fechamento |

## Proveniência e autoria do pacote dos alunos

A API Git do commit [d2168c8][S16] informa autor e committer declarados `luciano-mendesz9`, data `2026-10-24T13:04:14Z`, mensagem `docs: alinhar nome da branch de revisão`, árvore `e4cd17b11c738b5dec194b70484e02d6f4a8258c` e parent `1c361743951d691c071085f883759d5a0c87a562`. Esse metadata é proveniência Git declarada, não assinatura verificada nem prova de autoria intelectual exclusiva. E-mail e outros metadados pessoais não são necessários à conciliação.

O relatório registra execução por Codex por solicitação direta do usuário e revisão da candidata #29; o nome Thales no título identifica seu destinatário/contexto. Preservar os quatro arquivos originais e citar a fonte é suficiente para reconhecer a contribuição sem reescrever autoria. Não há necessidade de importar a branch inteira.

## Alcance real desta frente

Foram lidos os quatro arquivos dos alunos na ordem da missão; AGENTS, PLANS, PROJECT_CONTEXT, TECH_DECISIONS, constituição, SOURCE_AUTHORITY e política Code-First; backlog; documentos focais de #27/#28/#29; corpos/comentários e submissões de review das três PRs. O metadata do commit dos alunos foi consultado pela API Git.

A fonte de autoridade não foi inferida de resumo da conversa, de reação de bot ou de código de saída. Não houve auditoria técnica integral, matriz IMP, simulação de composição, teste funcional ou prova atual de provedor por C-A. Esse limite descreve a autoria histórica C-A. C1 acrescenta confronto por subcapacidade e inventário exato, com parecer independente próprio; não reexecuta os resultados históricos.

A data da leitura das PRs é 24/10/2026; comentários possuem datas próprias. Na evidência JSON, `consultedAtUtc` registra o encerramento da coleta e não a execução histórica dos ensaios.

## Fontes

[S01]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/governance/SOURCE_AUTHORITY.md
[S02]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/governance/source-policy.md
[S03]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/d2168c840937a6120e32467f24cb46383e8dcd29/docs/reviews/20261024-revisao-thales/relatorio-de-revisao.md
[S04]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/d2168c840937a6120e32467f24cb46383e8dcd29/docs/reviews/20261024-revisao-thales/proximos-passos.md
[S05]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/29#issuecomment-6375857925
[S06]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6358797593
[S07]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6359747093
[S08]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/f56f73fda1d7bd459a1415bf02df25edc9120674/docs/plans/active/investigacoes-intermitentes-20261023/preparacao-evidencias.json
[S09]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/environment-and-protocols.md
[S10]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/vercel.json
[S11]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/223839c9ae91591ded8de387144d8c1ee84b5c20/docs/releases/2026-10-21-post-consolidation/operational-readiness.md
[S12]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/00477e961e36416d8d602d36f7e0ee195c487148/docs/releases/2026-10-23-hf-inv-local01/operational-handoff.md
[S13]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/TECH_DECISIONS.md
[S14]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/plans/active/contas-rascunhos-imagens/decisoes-e-pendencias.md
[S15]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/28#issuecomment-6374225844
[S16]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/commit/d2168c840937a6120e32467f24cb46383e8dcd29
[S17]: https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md
