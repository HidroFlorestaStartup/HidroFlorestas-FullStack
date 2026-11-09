# Data model: apresentação de áreas/capa
Nenhum schema novo. EVIDENCIA_IMPLEMENTACAO dos contratos atuais.
| Conceito | Campos/validação | Estado preservado |
|---|---|---|
| Área-ponto | id/laboratoryId/name≤100, latitude[-90,90], longitude[-180,180];0 válido | autoria/contexto server; cadastro após confirmação |
| Opcionais | municipality/state/landType≤100, description≤2000; UF livre | ausentes omitidos no detalhe |
| PointState | latitude/longitude texto, revision local | edit incrementa; location só aplica à revisão capturada, finita/nos limites |
| Contexto | id/name/status/membershipRole/readOnly | papel global não substitui vínculo |
| Lista | AreaSummary.cover{revision,hasImage,featureEnabled} | projeção canônica sempre presente na lista real |
| CoverDto | image{revision,hasImage,width?,height?},canEdit,featureEnabled | dimensões independentes; sem URL de entrega pública |
| UploadTicket | attemptId/expiresAt/upload{url,params} | chave/tentativa vigentes estáveis na resposta incerta |
| Mutação | expectedRevision + key no initiate;{}confirm;expectedRevision no remove | OCC; EXPIRED permite nova tentativa; conflito não sobrescreve |
| Preview | tentativa/retry local, callbacks de load/error atuais | mesma revisão persistida; evento antigo ignorado |

Confirmação recebida e bytes exibidos são estados distintos. Sem aumentar revision no banco para forçar reload. Qualificadores experimentais de IHFR permanecem fora desta apresentação.

Tentativa de upload em memória: chave, ticket opcional e expectedRevision original emitido; reload de preview não a descarta enquanto o resultado permanece incerto. Tentativa visual local: sequência e propósito (releitura/envio confirmado), sem alterar revisão persistida. Nova seleção/início de envio invalidam callbacks visuais anteriores.
