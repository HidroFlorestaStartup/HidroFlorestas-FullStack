# Dados existentes utilizados

User → ResearchersLinked → LaboratoryRoom → CollectionArea → CollectionData → EnvironmentalMeasurementSet. As medições usam EnvironmentalMeasurementSet, assim como o serviço atual; tabelas legadas WaterData/SoilData/VegetationData/TerrainData permanecem preservadas. Suplemento, diagnóstico, operação, evento e ponteiro vigente usam o contrato IHFR existente. Nenhuma tabela, coluna ou enum novo.

IDs determinísticos exclusivos do pacote permitem conferir a propriedade dos registros. O gerador interrompe a aplicação se encontrar as identidades/e-mails antes de uma nova preparação; não faz reset nem substituição.
