# Research UI-07 — decisões técnicas verificadas

**Status:** trabalho técnico de engenharia sobre baseline 2026-10-31; não confere escolha de fornecedor nem aprovação humana.

## Decisão 1 — persistir CEP sem migration

- **Escolha:** reusar `CollectionArea.cep String?` já presente no schema Prisma e `AreasService.create` com `...parsed`.
- **Motivo:** a nulabilidade física existente já atende CEP ausente. Falta permitir e serializar o campo na fronteira da API.
- **Alternativa rejeitada:** migration redundante, relaxamento de allowlist ou campo paralelo; arriscariam concorrência de schema, perda de integridade e operações desnecessárias.
- **Validação:** contrato rejeita chaves desconhecidas; E2E usa PostgreSQL sintético isolado e verifica armazenamento, POST e GET.

## Decisão 2 — forma de CEP, município e UF

- CEP: `null` quando ausente/vazio, string com 8 dígitos (com ou sem hífen) normalizada para `NNNNN-NNN`; tipos inválidos são 400.
- Município/UF: manter contratos opcionais e limites de texto existentes; não inventar obrigatoriedade nem validação territorial por geocodificador.
- Não inferir CEP, município ou UF para localidades sem identificação.

## Decisão 3 — provedor de geocodificação reversa

- `/api/geocoding/reverse` requer sessão e usa adapter mockável; endpoint externo opt-in e **não configurado por esta PR**.
- Nominatim público é referência técnica, NÃO escolha ativa: política https://operations.osmfoundation.org/policies/nominatim/ exige identificação, atribuição, limites agregados e restrições de uso; sem throttle/cache/privacidade aprovados não apontar o env para seu host.
- **Alternativas:** provedor próprio, serviço contratado aprovado ou nenhum provedor; nesta execução nenhum é ativado. Sem consulta externa e sem keys.
- Timeout/rede/429 não afetam POST de áreas; endereço é apenas sugestão editável.

## Decisão 4 — concorrência de solicitações e UI

- Reducer `area-geocoding-state.ts` mantém revision do ponto, ignora respostas obsoletas e não substitui valores editados manualmente; cancelamento/debounce são otimizações e não única garantia.
- Testar manual, dispositivo e mapa; respostas A/B invertidas; CPF/CEP sintético somente; mensagens aria-live.


## Ciclo autorizado de teste real — 2026-11-06

Photon escolhido como serviço público para teste moderado, não como contratação/garantia de operação. Fontes primárias consultadas em 2026-11-06: https://github.com/komoot/photon e https://github.com/komoot/photon/blob/master/docs/api-v1.md. A política permite volume razoável, admite limitação/bloqueio por uso excessivo e não garante disponibilidade. Nenhuma chave ou conta paga foi criada.

Duas sondas reais, seriais e identificadas, usando coordenadas públicas (sem localização pessoal): (-3.3925,-44.3589) retornou Itapecuru Mirim/Maranhão/65485-000; (-2.5286,-44.3055) retornou São Luís/MA/65010-410. HTTP 200 em ambas. Isso observa apenas essas amostras e não certifica cobertura/endereço exato.

Resposta é FeatureCollection GeoJSON; adapter anterior não a normalizava. Extrair apenas propriedades da primeira Feature válida: city/town/municipality/village, state e postcode, mantendo precedência dos formatos legados. Não converter POI.name, street ou county em município. Usar a normalização brasileira já existente. Nominatim público não foi ativado: os controles exigidos pela política não estão implementados de forma agregada neste recorte.
