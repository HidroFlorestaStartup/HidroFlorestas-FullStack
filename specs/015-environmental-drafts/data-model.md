# Modelo de dados

EnvironmentalDraft: id UUID; userId FK User Restrict; collectionDataId FK
CollectionData Restrict; formVersion; fields JSONB; revision Int >=1;
lastSaveKey UUID; lastSaveHash SHA256; createdAt/updatedAt timestamptz(3).
Unique(userId,collectionDataId). Relação laboratório/área deriva da coleta,
validada na transação; nenhum laboratoryId redundante controlado pelo cliente.
Estado: ausente → salvo revision1 → revisão seguinte; salvo → descarte físico;
salvo → consumo físico + MeasurementSet único imutável na mesma transação.
Sem expiresAt/status/ledger payload; não possui FK para diagnóstico.
Payload: formVersion environmental-draft-v1, fields allowlisted da IMP-005,
células absent, value (tipo/enums/faixas vigentes) ou editing (raw limitado).
Não aplica obrigatoriedade/cross-field de confirmação no save incompleto.
