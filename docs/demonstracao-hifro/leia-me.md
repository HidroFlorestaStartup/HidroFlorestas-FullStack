# Apresentação pública — Laboratório Hifro

Cenário fictício preparado por autorização de Pedro em 16/11/2026, na branch Neon **Universo IF**, confirmada por ele como destino da produção. Não representa pesquisas ou diagnósticos reais em Itapecuru-Mirim.

## Conteúdo

- Hifro HidroFlorestas: proprietário.
- Ana Primavesi e Bertha Lutz: administradoras do laboratório.
- Josué de Castro e Aziz Ab’Sáber: membros.
- Todos têm papel global USER; os nomes são homenagens em contas fictícias, sem associação ou endosso dos pesquisadores.
- Área verde da Aviação, Quintal agroflorestal do Leite e Margem verde da Trizidela: quatro coletas por área, total de doze.
- Onze medições ambientais confirmadas, nove IHFRs vigentes calculados pelo avaliador atual. Duas coletas com medições ficam disponíveis para calcular IHFR; uma fica sem medições, para conhecer o fluxo de preenchimento posteriormente.

A conta principal usa o identificador **hifro@hf.example**, escolhido por Pedro. As demais usam ana, bertha, josue e aziz no mesmo domínio fictício. Todos estão ativos e com acesso liberado; esses endereços não recebem mensagens e não fazem recuperação por e-mail. Credenciais e código de ingresso não são publicados no repositório.

## Proveniência dos dados

Nomes locais conferidos em referências públicas: [Prefeitura — unidades de saúde](https://www.itapecurumirim.ma.gov.br/unidadesaude.php), para Trizidela e povoado Leite; [mapa urbano reproduzido na dissertação UEMA de Luciano Andrade](https://www.ppgeo.uema.br/wp-content/uploads/2024/02/LUCIANO_ANDRADE-2024.pdf), para Aviação. Coordenadas são pontos ilustrativos aproximados para apresentação; não são limites cadastrais, localização comprovada de propriedade ou inferência de condições ambientais reais. Isso consta das descrições das áreas e observações das coletas.

As fórmulas, classes e limites do IHFR experimental não foram alterados. Resultados foram calculados com o manifesto ativo e registrados com medição, suplemento, hash, versão, operação, evento e ponteiro vigente coerentes. Proveniência de suplemento AUTHORIZED_RECORD.

## Capas e próximos passos

[Três capas e suas licenças](capas/leia-me.md) prontas. Upload aguardando confirmação da funcionalidade, por solicitação de Pedro. Roteiro, script Playwright de apresentação e gravação não foram preparados.

[Inventário com IDs](inventario.json) · [Recibo operacional](recibo.md) · [Especificação e validação](../../specs/041-apresentacao-hifro/validation.md).

## Preparação repetível

`scripts/prepare-hifro-presentation.ts` valida payloads e gera um plano SQL privado; não se conecta ao banco, não executa SQL, não faz reset e não envia fotos. Recebe caminhos privados em HIFRO_PASSWORD_FILE e HIFRO_ACCESS_CODE_FILE, e diretório de saída fora do repositório. A aplicação deve sempre confirmar projeto/branch/banco e conflitos. Registros já existentes interrompem a transação; não repetir a preparação sobre produção sem inspecionar o inventário. Não há comando de exclusão.
