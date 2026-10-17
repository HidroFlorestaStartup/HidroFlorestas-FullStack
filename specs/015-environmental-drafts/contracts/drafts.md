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
ocorrem na mesma transação; erro/revisão obsoleta preservam draft. A confirmação
exigem a referência se houver draft pessoal vigente na transação, inclusive se
outra aba o criou depois de abrir o formulário. Ausência de referência nesse
caso retorna conflito; confirmação sem draft continua compatível. Campos da UI
não editados preservam suas células originais/omissão ao salvar outros campos.
Replay retorna 200
do conjunto original sem consumir novo draft.

RC-DRAFT-001: controles de edição e ações de draft/revisão não aceitam interação
antes da hidratação; status informa preparação. Primeiro PUT após liberação deve
conter raw false e0, conservar células não editadas e omitir campos ausentes como
antes. API/envelope/versionamento/CSRF/idempotência permanecem inalterados.
