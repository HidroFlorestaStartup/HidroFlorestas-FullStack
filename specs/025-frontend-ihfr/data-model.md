# Modelo de dados da apresentação

Não há migração, tabela ou campo novo.

| Objeto existente | Uso no frontend | Invariante |
|---|---|---|
| `PublicDiagnosis` | Resultado, W/S/V/T, qualidade, ciclo de vida, explicação, origens, versões, datas e qualificadores | Valores do DTO são exibidos; nenhuma derivação científica |
| `EligibilityResponse` | Código de elegibilidade, motivos e presença de vigente | Decisão exclusivamente do servidor |
| `Attempt` | Recuperação e repetição após incerteza | Mesmo `key`, `endpoint`, `body`, `kind` durante a tentativa |
| `Feedback` | Mensagem `status` ou `alert` com foco | Estado terminal/erro segue handlers existentes |
| `IHFRRouteContext` | Composição das URLs existentes | Contexto laboratório/área/coleta inalterado |

Traduções são projeções textuais com fallback para o código recebido. Datas mantêm UTC e os fallbacks atuais. A apresentação não transporta dados de autor, chave, hash de requisição ou evidência interna para o resumo público.
