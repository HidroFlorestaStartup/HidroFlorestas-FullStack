# RTH-P2-001 — tratamento documental conciliado em C1

**Tratado na proposta documental C1; publicação e adoção em development pendentes.** O diagnóstico C0 está preservado no pacote original. Esta atualização fecha o confronto antes pendente do handoff LOCAL, sem reescrever os textos históricos do backlog/plano.

## Problema e consequência

As tabelas antigas descrevem laboratórios/áreas/coletas/dados ambientais/IHFR/dashboard/administração como mock, sem API ou sem consumidor; o plano mantém mapa como placeholder e o backlog o conserva no corte planejado/adiado. No snapshot c4adfb3 há cadeias reais. Usar isoladamente os cortes antigos cria risco de selecionar reimplementação e confundir homologação pendente com código ausente. A revisão dos alunos em d2168c8 identificou esse descompasso como RTH-P2-001; o confronto LOCAL/CHAT agora o sustenta por subcapacidade.

## Tratamento aplicado aos documentos propostos

1. Adendo datado [estado-conciliado-20261024.md](../../code-first-prd/implementation/estado-conciliado-20261024.md), com oito IMPs e oito eixos independentes.
2. [Matriz C1](matriz-imp-c1.json):30 subcapacidades materiais e10 fronteiras, fontes por SHA, divergências e lacunas.
3. Quatro apontadores mínimos em PROJECT_CONTEXT.md, backlog.md, implementation-plan.md e DOCUMENT_REGISTER.md, baseados nos mesmos preimages c4adfb3 utilizados em C0; corpos anteriores intactos.
4. [Conciliação](conciliacao-local-chat.md) e [decisões](decisoes-e-recomendacoes.md) encerram a dependência de conhecimento de LOCAL, preservando autoridade humana, operacional e científica.

## Classificações que exigem precisão

Não declarar IMP-002 integralmente completa: C02 é parcial no avatar FR-015 do popup e ingresso/convites permanece não localizado. Não chamar dados ambientais de contrato científico definitivo; a aprovação técnica da captura v1 tem alcance próprio. Não somar mapa Leaflet à entrega Plotly futura. Não usar teste de quota de capas como prova de recuperação IHFR. Não usar backend de administração para presumir decisão sobre retorno a PENDING ou aceite assistivo.

Os gates humanos/operacionais e ciência pendentes não fazem desaparecer a implementação estática observada. A ausência de objeto Git LOCAL limita a proveniência do commit, não a identidade dos 16 documentos verificados. C1 fecha a conciliação com limites; não apaga nenhum histórico ou claim LOCAL original.

## Critério de resolução e restante

A resolução documental proposta depende de validação e revisão independentes dos bytes C1. A eventual incorporação remota depende de autorização/contenção própria. Enquanto os arquivos forem somente pacote de transporte, não escrever que development já foi corrigida. Produto, testes funcionais, configuração, merge e deploy não foram alterados/executados.

Recomendação principal: adotar o adendo e os quatro apontadores após o parecer C1 e a decisão futura de incorporação. Alternativa: referenciar o pacote íntegro enquanto a publicação estiver bloqueada. Reversão: corrigir somente a síntese/apontadores em nova versão, preservando C0, LOCAL, fontes dos alunos e a evidência que motivar a errata.

Fontes de origem: [backlog](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/backlog.md), [plano](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/c4adfb379e5dc78f27f31b91edbd13f43228d9f9/docs/code-first-prd/implementation/implementation-plan.md), [relatório dos alunos](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/d2168c840937a6120e32467f24cb46383e8dcd29/docs/reviews/20261024-revisao-thales/relatorio-de-revisao.md).

IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
