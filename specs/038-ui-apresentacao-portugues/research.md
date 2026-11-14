# Decisões locais de apresentação

- `DECISAO_CONFIRMADA`: requisitos visuais e linguísticos de Pedro em 12/11/2026.
- `RECOMENDACAO`: esmeralda claro no resumo; corresponde à paleta existente e mantém contraste do título e detalhes.
- `RECOMENDACAO`: usar pt-BR e duas casas somente nos resultados IHFR. Valores e classes de origem permanecem intactos, inclusive números de alta precisão e zero.
- `RECOMENDACAO`: exibir confirmação no fuso declarado pela ocorrência quando ele está disponível, evitando depender do fuso do servidor. Atributos dateTime preservam os valores completos; proveniência explicitamente UTC mantém UTC.
- `EVIDENCIA_IMPLEMENTACAO`: `CollectionDetailLayout` já preserva formulário, foco e disclosures; alterar a ordem dos blocos existentes preserva esse mecanismo.
- `EVIDENCIA_IMPLEMENTACAO`: labels IHFR já existem, mas códigos ingleses são repetidos sob os textos; retirar repetições da leitura e manter a proveniência técnica separada.
- Alternativas descartadas: arredondar DTO/banco; substituir enums por português; usar CSS order sem alterar leitura do DOM; ocultar limitações científicas.
