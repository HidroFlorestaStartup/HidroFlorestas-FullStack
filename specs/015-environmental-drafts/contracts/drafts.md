# Contrato contextual de rascunhos

Recurso `/api/laboratories/{laboratoryId}/areas/{areaId}/collections/{collectionId}/environmental-data/draft`.
GET: `{draft:null|{id,revision,formVersion,fields,updatedAt}}`, no-store.
PUT: JSON fechado `{draftId:null|UUID,expectedRevision:number,saveKey:UUID,formVersion,fields}`.
Sucesso 200 `{draft}`; 400 inválido; 401; 404 contextual; 409 STALE_REVISION/READ_ONLY;
nenhum ownerId no request/DTO. Máximo 32 KiB, raw 1000 caracteres e allowlist.
DELETE: JSON fechado `{draftId:UUID,expectedRevision:number}`; 204 inclusive absent;
ID/revisão divergentes 409, não remove versão recriada.
Mutações validam Origin/fetch-site e principal atual; id do ator deriva da sessão.
POST de confirmação ambiental mantém payload científico e Idempotency-Key;
headers Draft-Id/Draft-Revision opcionais, ambos ou nenhum. Consumo e criação
na mesma transação; erro/revisão obsoleta preservam draft. Replay retorna 200
do conjunto original sem consumir novo draft.
