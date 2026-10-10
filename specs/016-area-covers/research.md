# Pesquisa de fontes e escolhas

DECISAO_CONFIRMADA: política na spec, proveniência na conversa/pacote CRI.
RECOMENDACAO técnica adotada: staging privado + sanitização server-side + proxy,
em vez de URL signed no browser: a assinatura de delivery não expira nem verifica
membership. Tokens/cookies dependem de plano/configuração; não presumir disponíveis.
Upload signature não vincula bytes e vale 1h; response signature cobre somente
public_id/version, por isso Admin API e decoder real são necessários.
Limites widget são client-side, não prova server-side. Staging pode conter EXIF
temporariamente; capa final reencodada elimina metadata. Cleanup aguarda expiração
real da assinatura e conserva tombstones/reconciliação periódica para ativos
tardios; não promete ausência de recriação remota em janela ilimitada.
FATO_DOCUMENTADO: assinatura exclui resource_type. INFERENCIA: replay em raw/video
pode criar recurso próprio fora do lookup image. RECOMENDACAO técnica: verificar
identidades conhecidas image/video/raw e destruir somente assetId/context próprios.
Alternativas: upload backend direto 10MiB incompatível com limite Vercel; imagens
públicas incompatíveis com decisão; SDK/decoder evitam criptografia/formato artesanal.

Fontes primárias consultadas em 2026-10-10:
- [Authenticated e assinaturas](https://cloudinary.com/documentation/control_access_to_media#authenticated_media_assets)
- [Upload API](https://cloudinary.com/documentation/image_upload_api_reference#upload)
- [Nomenclatura public_id](https://cloudinary.com/documentation/upload_parameters#public_id_naming_preferences)
- [Autenticação](https://cloudinary.com/documentation/authentication_signatures)
- [Response signatures](https://cloudinary.com/documentation/response_signatures)
- [Admin API](https://cloudinary.com/documentation/admin_api)
- [SDK Node](https://cloudinary.com/documentation/node_integration)
- [Defaults e precedência de presets](https://cloudinary.com/documentation/upload_presets#default_upload_presets)
- [Sharp metadata e saída](https://sharp.pixelplumbing.com/api-output/)
- [Sharp decoder](https://sharp.pixelplumbing.com/api-constructor/)
- [Limite Vercel](https://vercel.com/docs/functions/limitations#request-body-size)
- [Invalidation e limitações](https://cloudinary.com/documentation/invalidate_cached_media_assets_on_the_cdn)
Guias Next locais de route/image consultados; optimizer não encaminha headers,
portanto img same-origin ou Image unoptimized com autorização em cada pedido.
