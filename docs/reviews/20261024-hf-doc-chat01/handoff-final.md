# Handoff CHAT — C1 / HF-DOC-20261024-CHAT02

**C1 CONCLUIDA_COM_LIMITES_EXPLICITOS; revisão independente APTO_DOCUMENTAL_C1_COM_LIMITES.** C0 e LOCAL preservados; nenhuma pendência de envio dos anexos. O fechamento documental não depende de publicar branch, integrar #29 ou concluir G3–G5.

## Identidades e alcance

Base c4adfb379e5dc78f27f31b91edbd13f43228d9f9; candidata #29 00477e961e36416d8d602d36f7e0ee195c487148; alunos d2168c840937a6120e32467f24cb46383e8dcd29; commit LOCAL anunciado 6f24cb345b8b3a33c46b9b76c3eb6171328296bd. ZIP LOCAL 2d598359ce495977bc8869d579ed2403b11dc8d37813803c350a7ed5dae1f7a3, recibo 39b98167facfa8a998f8ba498904c7b42fd1526f3f13af6c48f2bab888362786. O [consumo](consumo-local-c1.json) confirma bytes/16 documentos, com LOCAL_COMMIT_PROVENANCE=PARTIAL pela ausência de objetos Git. O [inventário](inventario-publicacao-c1.json) delimita os arquivos próprios propostos.

C1 cobre 40 registros/320 células e oito IMPs/64 células de resumo. Três divergências materiais foram corrigidas na síntese: avatar do popup, ordem de I/O de capas e BLOCKED no mismatch. O original LOCAL não foi alterado. Os recibos C0 permanecem relativos ao seu ZIP; [revisão C1](revisao-independente-c1.md) e [validação C1](validacao-documental-c1.json) vinculam o delta atual.

## Ordem recomendada de decisão humana

| Ordem | Decisão / ato | Evidência e condição |
|---|---|---|
| 1 | DOC-D01 — mantenedor decide #29 no HEAD conferido | Parecer técnico favorável com ressalvas para00477e9; causas históricas inconclusivas e piloto não homologado preservados. Não é um pedido automático de merge. |
| 2 | DOC-D02 — ratificar adoção do adendo/documentos | C1 revisado e pacote íntegro; a incorporação remota terá autorização própria. Nenhuma reimplementação abrangente inferida do backlog antigo. |
| 3 | DOC-D03/D04/D08 — escolher composição documental focal | #28:3 novos + 2 adendos + 3 apontadores; #27:206 documentais separados de 2 configurações; alunos:4 documentos + 2 apontadores. Fontes, autoria e cronologia mantidas. |
| 4 | DOC-D05/D06 — manutenção e publicação futuras | Sob demanda como padrão; qualquer gate/guarda/ref fora desta missão. Preservar todas as regras false. |
| 5 | DOC-D07 — autorizar e dotar preparação operacional específica | Papéis/destino/provas definidos antes de qualquer operação. Sem pressupor autorização anterior de e-mail ou provedor. |

O quadro completo de onze campos está em [decisões](decisoes-e-recomendacoes.md). A aprovação do plano documental não ratifica automaticamente essas recomendações.

## Perguntas fechadas e recomendações para lacunas materiais

| Questão para autoridade competente | Recomendação principal | Alternativa e efeito |
|---|---|---|
| Cumprir FR-015 no popup geral de membros em recorte técnico futuro? | Sim: delimitar o avatar neutro com iniciais nessa superfície e seu aceite, mantendo as operações já existentes. Produto/mantenedor a designar. | Se o requisito deixou de representar a intenção, alterá-lo expressamente por decisão de produto. Até lá,C02 permanece parcial; não afirmar ausência de iniciais em toda a aplicação. |
| Restringir PENDING à fase anterior à ativação da conta? | Sim, como proposta de produto a ratificar. O código atual continua permitindo retorno; não foi modificado. | Ratificar explicitamente retorno a PENDING e definir comportamento/efeitos. Ausência de ratificação mantém PENDENCIA_DE_DECISAO. |
| Primeiro piloto pode usar o recorte sem capas? | Recomendar capas explicitamente desligadas no destino futuro, com fallback/jornadas verificadas e aceite humano do escopo. Não aplicado. | Se capas forem essenciais, homologar provedor/preset/créditos/cleanup e designar operador antes do piloto. |
| Piloto exige ingresso/convites autônomos? | Não considerar a capacidade existente. Fixar o recorte de participantes/vínculos autorizados antes de planejar a jornada; se ingresso for essencial, especificar missão própria. | Adiar essa jornada e limitar o piloto ao escopo expressamente aceito; não usar accessCode interno como convite implementado. |

## G3–G5: próximo trabalho concreto, não executado

| Passo | Papel necessário | Prova de saída | Dependência |
|---|---|---|---|
| 1. Destino e recuperação | Operador de ambiente/banco e mantenedor — a designar | Projeto, deployment/SHA e banco corretos; isolamento verificável; backup e restauração autorizados antes de escritas. Restore sintético antigo não basta. | Escopo operacional novo e autorização do recurso. |
| 2. Contas e entrega de mensagens | Owner de contas/e-mail/scheduler — a designar | Conta/caixa sintética autorizada, recebimento/reenvio, reset em outro navegador, revogação de sessão e scheduler no FullStack. SMTP accepted é etapa diferente de inbox. | Passo1, destinatário/participantes e atos externos autorizados. |
| 3. Jornadas e capas | Produto/UX e operador de capas/créditos — a designar | Jornadas autenticadas e fallback; decisão explícita de capas off ou homologação real de upload/cleanup. BLOCKED requer revisão humana. | Passos1–2 e escopo ratificado. |
| 4. Piloto e suporte | Responsável por piloto/suporte e aceites — a designar | Janela, suporte, critérios humanos/assistivos e autorização de piloto registrados. Ciência IHFR conserva aprovação separada. | Provas anteriores, participantes/protocolo e responsáveis. |

A [matriz G3–G5](matriz-prontidao-g3-g5.md) é o inventário histórico: última reconsulta de metadata em 22/10/2026 14:16:30–33 UTC; smoke de 21/10/2026 23:56:45–23:58:59 UTC, em Preview RC5f6266b, não00477e9. Não houve nova consulta a provedores. HTTP200 não prova sessão; worker503/configuração não prova lote; IDs de env não provam credencial/isolamento. Responsáveis desconhecidos continuam a designar.

## Publicação e retomada

O pacote é transporte e proposta documental, não commit publicado. Nenhuma branch/ref/PR foi criada. Publicação futura requer autorização/contenção específica e revisão do delta contra a development então vigente; nunca aplicar cegamente o patch se os quatro preimages mudarem. Preservar atualizações legítimas de terceiros e revisar somente o conflito real. Não retirar false, importar branch de terceiro, usar Draft/[skip ci] ou acionar Codex na #29 como substituto de revisão própria.

Codex remoto próprio: NAO_SOLICITADO_PUBLICACAO_BLOQUEADA. Se e quando existir PR própria segura em outro recorte, solicitar revisão naquele HEAD; resultados pertencem àquele SHA. O eventual comentário factual [HF-DOC-CHAT02-C1] é o único ato remoto previsto aqui, sem aprovação, merge, bot ou dados privados, após uma reconsulta final de refs/duplicidade.

## Contrato final de fechamento

C0_PRESERVED=YES; LOCAL_BYTES_READ=YES; TRANSPORT_INTEGRITY=PASS; LOCAL_COMMIT_PROVENANCE=PARTIAL; C1_CONCILIATION=CONCLUIDA_COM_LIMITES_EXPLICITOS; INDEPENDENT_REVIEW=APTO_DOCUMENTAL_C1_COM_LIMITES; DECISIONS=RECOMENDACOES_PARA_RATIFICACAO; REMOTE_PUBLICATION=BLOCKED_PENDING_SCOPED_AUTHORIZATION; REMOTE_CODEX_REVIEW=NAO_SOLICITADO_PUBLICACAO_BLOQUEADA; APPLICATION_TESTS=NOT_RUN; PILOT_AUTHORIZATION=NOT_GRANTED.

Não há monitoramento, investigação funcional ou trabalho futuro em execução. O próximo ato de produto/operação depende de missão própria; C1 documental foi encerrado com parecer independente e validação; a confirmação focal dos estados finais fica registrada no próprio parecer.

IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
