# Fase 7 v2 — 404 do gate IHFR e hipótese de cache

## Conclusão

**A causa dos seis 404 permanece não determinada. A hipótese de ambiente privado obsoleto em cache persistido do Turbopack não foi confirmada nem refutada.** Não há evidência para atribuir esta falha a geometria, H4 ou lógica científica. A suíte E2E principal passou 188/188; o gate IHFR separado falhou 0/6 antes da interface esperada.

Este parecer supera a interpretação inicialmente excessiva gravada no primeiro `result.json`: o campo `passed: true` confirma somente as observações sintéticas de ambiente/autenticação. A frase que descreve a execução como um reinício com cache reutilizável **não é sustentada**, pois a inspeção posterior encontrou somente `CURRENT` com sequência zero, sem arquivos de dados. O original permanece preservado como evidência da tentativa e de seu limite.

## Evidência oficial

- Run `39465856665`, attempt `1`, job `118776943818`, HEAD `85e397bd4271ab07a197ea88db652227e6e392ce`.
- Log: `evidence/phase7-r3-v2-candidate/.accounts-validation/ihfr-1792518732781.log`.
- O IHFR iniciou seu próprio Next 16.3.8/Turbopack em porta aleatória `62337`; `/login` respondeu 200. Todas as seis navegações protegidas seguintes responderam 404, incluindo a criação de coleta e detalhes de coletas existentes.
- O primeiro cenário esperou `Fuso da coleta` depois de receber 404. Os demais falharam pela ausência das regiões ou controles esperados. `assets: []` significa ausência de falhas HTTP/rede de scripts registradas; não significa ausência de assets na página.
- Não encontrei `EADDRINUSE`, `ECONNREFUSED` ou `reuseExistingServer` nos logs examinados. Não foram preservados corpo da resposta ou contexto/PNG do IHFR no artifact. A evidência disponível não diferencia um 404 do roteador de um `notFound()` causado por acesso/dados.

## Leitura do código instalado e do harness

No Next **16.3.8 instalado**, `config-shared.js` habilita o filesystem cache de desenvolvimento por padrão, e `hot-reloader-turbopack.js` passa `env: process.env` à criação do projeto. O caminho JavaScript de defines examinado em `static-env.js` cobre `NEXT_PUBLIC_*` e `next.config.env`; não contém inclusão automática de `IMP006_TEST_SCHEMA` ou `JWT_SECRET`.

Na aplicação, `applicationConnection()` lê o schema na avaliação do módulo de Prisma. `readJwtSecret(environment = process.env)` lê o segredo no momento da chamada. Essas duas formas foram representadas no ensaio mínimo, sem Prisma e sem banco.

Os gates Deletion e IHFR usam a mesma pasta de trabalho/`.next`, porém processos próprios e ambientes sintéticos distintos. Deletion encerra a árvore própria no Windows com `taskkill /T /F`. O Next CLI instalado encaminha SIGTERM ao filho, mas o prazo padrão `NEXT_EXIT_TIMEOUT_MS` é 100 ms antes de SIGKILL; a limpeza do hot reloader registra `project.onExit()`. Isso descreve caminhos possíveis de persistência/encerramento, **não demonstra a causa do 404**. O readiness do harness aceita status menor que 500, mas `/login` realmente respondeu 200 nesta execução, portanto esse detalhe não explica a falha observada.

## Um ensaio focal e sua correção autorizada

Runtime: Node `24.19.0`, Next `16.3.8`, Linux x64. Projeto App Router mínimo, dependências já instaladas, variáveis A/B inteiramente sintéticas, nenhum banco, nenhuma alteração no repositório. O root Turbopack explícito permitiu o vínculo para essas dependências e difere da configuração normal do app.

| Tentativa preservada | Observação | Cache antes de B | Interpretação válida |
| --- | --- | --- | --- |
| `ihfr404-cache-initial-observations.json` | A: token A 200. Após SIGKILL do grupo próprio, B: schema/segredo de B no módulo e em runtime; token B 200 e token A 401. | Somente `CURRENT`, 73 bytes, `max_sequence_number: 0`; nenhum arquivo de dados. | O ambiente mudou corretamente neste reinício, mas a premissa de cache populado falhou. Inconclusivo para a hipótese. |
| `ihfr404-cache-corrected-observations.json` | A respondeu 200. SIGTERM no CLI próprio, com prazo de encerramento de 10 s somente no projeto sintético. Após o encerramento, o guard detectou ausência de dados persistidos e **não iniciou B**. | Somente `CURRENT`, 73 bytes, sequência 0; `dataFiles: 0`. | Correção focal abortada pela premissa não satisfeita. `passed: false` é falha da condição do ensaio, não reprodução de ambiente obsoleto. |

Os recibos das duas tentativas estão versionados ao lado deste parecer; somente o prefixo absoluto do scratch no erro da segunda tentativa foi mascarado. Os fontes, logs e diretórios `.next` originais permanecem preservados nas pastas auxiliares da execução. Não houve terceira tentativa, matriz adicional ou limpeza de evidência. Não há telemetria de cache-hit, e o comportamento Windows/Prisma/DB da aplicação não foi exercitado.

## Menor observabilidade útil

Após a falha original, consultar somente GETs já existentes de autenticação e do contexto da rota, registrando labels estáticos, status e booleans de contrato. Não alterar a navegação, os asserts ou a prontidão do teste. Cada probe deve usar contexto de API isolado e cópia dos cookies apenas em memória: `/api/auth/me` pode expirar `auth_token` ao responder 401, e o contexto compartilhado contaminaria os probes seguintes.

Auth/área/coleta com resposta 200 e página 404 aproximam o problema do caminho de renderização/roteamento; 401, 403 ou 404 de contratos da API delimitam autenticação, autorização ou disponibilidade dos dados. Esses sinais orientam o próximo diagnóstico, sem transformar uma única combinação de status em prova definitiva. Root informou que integrou essa observabilidade, com revisão de C e verificações focais; não alterei esses arquivos.

## Referências

- Fontes instaladas em `node_modules/next/dist`: `server/config-shared.js`, `server/dev/hot-reloader-turbopack.js`, `lib/static-env.js`, `cli/next-dev.js`, `server/lib/start-server.js`.
- Aplicação: `src/app/api/server/lib/prisma.ts`, `src/app/api/server/auth/session.ts`, `src/app/api/auth/me/route.handlers.ts`; harness: `scripts/imp006-local-e2e.ts`, `scripts/account-deletion-e2e.ts`; observação original: `tests/e2e/support/ihfr-diagnostics.ts`.
- Documentação primária: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopackFileSystemCache e https://nextjs.org/docs/app/guides/self-hosting. As conclusões sobre a versão executada usam o código instalado, evitando confundir defaults históricos com os de 16.3.8.
- Recibo oficial completo: `second-candidate-receipt.json`.
