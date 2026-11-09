# Protocolo C — navegação e observações auxiliares

Missão `HF-INV-20261023-01-LOCAL01`, protocolo `C-1`, definido antes do runtime.
Base `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`; owner `agent-c-navigation`.
Classificação: `RECOMENDACAO` experimental; resultados observados serão
`EVIDENCIA_IMPLEMENTACAO` somente depois da execução identificada.

## Fontes e limites históricos

As fontes técnicas foram lidas por SHA, sem importar suas branches:
`f56f73fda1d7bd459a1415bf02df25edc9120674`, diretório
`docs/plans/active/investigacoes-intermitentes-20261023/`, arquivos
`prompt-de-execucao.md`, `plano-de-execucao.md` e `preparacao-evidencias.json`;
`223839c9ae91591ded8de387144d8c1ee84b5c20`, diretório
`docs/releases/2026-10-21-post-consolidation/`, `frontend-ux.md` e
`evidence/backend-historical.json`; registro INV/OBS e triagem RC na base.

`FATO_DOCUMENTADO`: INV-003 reúne navegação fase 3/PR12 e reset cartográfico
fase 4/PR14 sem causa comprovada. NAV-SETTLE ocorreu em 375px/texto200%; três
sondas antigas não reproduziram o bloqueio. INV-005 teve seis linhas de
document navigation HTTP404 no log IHFR de `85e397bd4271ab07a197ea88db652227e6e392ce`,
run39465856665/tentativa1/job118776943818; o artefato histórico12287280647
tem digest informado `c8f87eb327d5bd3a8c7235fdc84a3ef60ab01dfd7fa42bb0cf62ce4468a41e6e`.
Este agente leu a projeção versionada; não recuperou nem verificou novamente
os bytes originais. Um lookup API404 esperado não é document404.

`FATO_DOCUMENTADO`: OBS-001 associa divergência de hidratação/caret a captura
de coleta, sem contraprova temporal A/B. OBS-002 descreve máscara/indicador
Next e enquadramento parcial; imagem parcial não comprova obstrução.
Os resultados históricos de PASS e FAIL são preservados.

## Recursos e contenção

Worktree lógica `wt-c-navigation`, branch `inv-local01/navigation`, HTTP3200,
um servidor próprio, um browser próprio, contexts/jars novos por cenário.
Não há cluster/fixture/conta/sessão neste primeiro recorte público.
Sem leitura de `.env`, `.demo-private` ou sessões existentes; sem banco,
SMTP, Cloudinary ou APIs de provedores. Instalação própria pelo lockfile,
sem compartilhamento de Prisma gerado. Next é iniciado com allowlist de
variáveis do sistema, `NODE_ENV=development` e telemetria desativada.

Reporter escreve somente campos fechados. URLs são classificadas por rota;
não há query string, headers, cookies, payloads, texto livre de console ou
caminhos absolutos nos recibos. Logs brutos locais ficam ignorados em
`.accounts-validation/`. Capturas são do viewport e têm campos de formulário
mascarados. Não há trace, vídeo ou reporter JSON bruto. Hashes são calculados
apenas para bytes efetivamente existentes, sem hash autorreferente.

## Experimentos predefinidos

1. `C-PUBLIC-SETTLE`: três contexts novos, ordem fixa controle/initial/hide,
   `/login`, 375×900, fonte raiz32px. Observar animações antes/depois do helper
   original equivalente de `frontend-mobile-navigation.spec.ts`: somente
   `running` com endTime finito, `Promise.allSettled`, sem cancelamento.
   Guard90s preservado; sucesso: helper conclui, formulário habilitado e
   navegação pública login→register→Back→Forward→reload responde200.
   Registrar timings, status document/API separados, erros categorizados,
   geometria e estado de animações. O servidor já foi aquecido pela readiness;
   não se apresenta contraste causal frio/quente. Nenhum retry. Qualquer timeout ou
   document404 é FAIL; seguir registrando tentativas restantes se seguro.

2. `C-CARET-PUBLIC`: três contexts novos, ordem controle sem captura,
   captura `caret:initial`, captura `caret:hide`, mesmo formulário login vazio,
   375×900/texto200%, sem submissão. Instalar MutationObserver antes da
   interação e registrar somente transições da propriedade caret-color e
   classificação de warning. Amostrar antes/durante/depois da captura;
   confirmar input habilitado/focável e estado final. Injeção de controles de
   animação ou screenshot é identificada como sintética. Isso examina o helper
   em formulário público e não encerra o caso histórico do formulário coleta.

3. `C-ANIMATION-CONTROLS`: em documento explicitamente sintético separado,
   testar finita+infinita e finita cancelada por barreira observable. Confirmar
   que o helper aguarda finita, ignora infinita e tolera rejeição de finished
   cancelada. Sem sleeps substituindo barreiras, sem alterar guard90s.
   Estes controles validam mecanismo do helper, não reproduzem produto antigo.

4. `C-MAP` e `C-DOCUMENT404`: dependem de liberar runner/fixture compatíveis.
   Executar testes originais de mapa com sua sessão sintética, transporte
   controlado e tiles bloqueados explicitamente rotulados; observar lista,
   seleção, teclado, atribuição, Back/Forward/reload e reset esperado por
   mudança de contexto. API404 esperado fica na evidência. Após falha, sondas
   GET somente leitura em jar separado, sem mutação ou reaproveitar cookie.
   Não iniciar recurso fixo pertencente a outro agente; serializar consumidores.

Cada rodada termina após o número predefinido, preservando FAIL, erro de
infraestrutura e cancelamento. Nova rodada exige hipótese/impedimento novo.
Sem defeito material demonstrado não há patch nem spec fictícia; correção
demonstrada seguirá o Spec Kit instalado e receberá revisão independente.

## Críticas pré-runtime aos controles

`EVIDENCIA_IMPLEMENTACAO`: `playwright.config.ts` chama dotenv para `.env` e
`.env.test.local`, herda ambiente e impõe base3000/3001 conforme contexto;
portanto não é reutilizado para o recorte público3200. O runner público será
standalone sem dotenv. O helper original mobile usa screenshots com
`animations:disabled`; isso pode avançar transições e deve ser distinguido da
observação sem captura. O helper de missão usa `animations:allow`.

`RECOMENDACAO`: não contar guard90s como diagnóstico de logout; não chamar
document200 prova de API/sessão; não misturar resets esperados de contexto
com reset cartográfico inexplicado. A projeção JSON histórica não substitui
os artifacts originais. Máscaras escondem pixels, mas deixam geometria e
hit tests aferíveis; aceitar pixels ocultos requer prova adicional.

Estado inicial: apenas leitura e planejamento executados; runtime `NOT_RUN`.

Revisão pré-runtime por `agent-a-nav4-accounts`: exigidas assertions reais
para os estados de foco/hit/visibilidade/habilitação coletados; hash do diff
deve usar bytes brutos sem trim; calor do servidor é limite do contraste de
caret. Os três pontos foram incorporados antes da execução. Não houve leitura
de env ou logs privados por esse revisor.

## Protocolo autenticado C-AUTH-1, antes do runtime

Recursos: cluster novo C, marcador e credencial próprios, em LOCALAPPDATA
redirecionado para diretório privado da worktree C; PostgreSQL55427 e
HTTP3001 somente depois de A liberar ambos. Reutilizam-se exclusivamente
binários pinados, conferindo SHA256postgres.exe
`db14ddb0efc10b72b57dc29dbce5a719e2755dcd0ae54297d0ea4bbfc75f79a0`.
Nenhum data/marker/credential de A é copiado. O wrapper cria allowlist e chaves
sintéticas efêmeras; runners accounts originais provisionam regressão/fixtures.
Sem SMTP/provider real, `.env` ou cookies preexistentes. Não mudar seus guards.

Uma execução, worker1/retries0, preservando os testes originais
`frontend-territorial-map.spec.ts` e `territorial-map.spec.ts`; tiles abortados
e transporte503 permanecem identificados como injeções sintéticas existentes.
Esses cenários cobrem lista/fallback, seleção, teclado, atribuição e mudança
de contexto/Back/Forward/reload; não reconstruem a rede histórica INV-003.

Dois casos adicionais timeout90s: (1) a mesma coleta sintética real, formulário
hidratado, 375×900/texto200%, captura controle caretinitial e helper original
`captureMissionViewport` com caretdefaulthide, observador de estilo antes/durante/
depois, console categorizado sem supressão e input habilitado/foco exigidos;
(2) navegação real de documento200 e lookup API404 esperado, repetidos uma vez
em outro context/jar emitido independentemente, somente GET. Não copiar cookies
nem remover API404 da projeção. As seis rotas document404 originais continuam
não recuperadas; o experimento atual terá esse limite causal.

Reporter fechado não serializa config/env/errors/attachments. Raw logs e imagens
ficam ignorados até inspeção; publicar somente projeções e imagens revisadas.
Depois: SchemaAudit e Stop no cluster próprio, sem apagar cluster alheio.
