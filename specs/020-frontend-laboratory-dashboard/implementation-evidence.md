# Evidências de implementação — fase4
Estado: REVIEW local concluido; publicacao e CI final acompanhados no PR. Historico de rodadas abaixo.
## PLAN
Base c33bf50b510dd7af7ad59cde039839f56519c87e;planejamento8741996521c61bdf221b8c58ed975b89784772d8.Revisão independente ajustou ordenação e referências.
Correção de precisão:contrato de membros está em specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml e src/app/api/server/laboratories/laboratory-membership.contracts.ts;menção anterior a contracts/laboratory-memberships era assunto,não caminho existente.
## Baseline inicial congelada
2026-10-19T12:15:18Z–12:22:23Z,snapshot3630ac0d3c0822f03ec853d97eca7acdd96d0392e7440a9c284e2d6c8bcd489a.RegressionSetup PASS,E2E121 PASS/13 FAIL em134.Todos120 testes preexistentes PASS;nova matriz de autoridade também PASS.
[Journal](evidence/baseline-initial.jsonl),[log redigido](evidence/baseline-initial.log).PNG/JSON em evidence/baseline-initial/.
Não são13 defeitos de produto:quatro testes de nomes usaram exact no span concatenado a papel;quatro testes móveis tentaram Escape antes do término do GET (bloqueio busy intencional).Helper de overflow ainda supunha main em membros (rota tem0),será corrigido antes de src.
Cinco falhas materiais verificam anúncio acessível de erro de membros:quatro503 controlados e um409 de mutação real retornam mensagem em status,sem alert.O retry limpar mensagem de erro antiga será conferido depois da primeira assertion;nenhuma causa adicional alegada.
34 capturas móveis viewport iniciais,com4JSON:controles focados inteiros acima da rail nas posições inspecionadas;sem defeito de CSS demonstrado. Faltam completar sequência/menu/paisagem,quatro atalhos e safe-area.As capturas iniciais usam máscara até em campo vazio,que pode pintar sobre camada fixa;posição middle por scrollHeight/2 às vezes já era end.Ambos serão corrigidos na evidência,sem confundir com z-index real.
Revisor independente examinou16 PNG e4JSON;conclusão limitada,não aceite humano.Móvel continua pendente até rodada corrigida.Sem mudança de aplicação antes dessa conclusão.
Cluster sintético foi iniciado pelo runner e parado ao término;dados e processo alheio3000 preservados.Nenhum serviço real.

## Baseline corrigida e RED móvel confirmado
2026-10-19T12:24:06Z–12:31:18Z; snapshot2f71aa8c85a72767d9d47255404f096040187297e33b81f9e827cddf53adacbc. RegressionSetup PASS; E2E127 PASS/7 FAIL em134, todos120 preexistentes PASS. Quatro fluxos reais novos de resumo/paginação/membros/vazio PASS depois de corrigir seletores;matriz de autoridade também PASS.
[Journal](evidence/mobile-red.jsonl),[log](evidence/mobile-red.log),capturas/JSON em evidence/mobile-red/.
Móvel375/320 texto100 PASS;texto200 falha em safe-area34 emulada viaCDP no viewport667x375. Exemplo quatro atalhos:Configurações top199.95,bottom309.95,rail top215.22;centro não recebe pointer(hit=false). Três atalhos também têm parte do controle coberta. Controle preservava foco ao mudar altura efetiva;barrafixedsobrepunha-o. Não é só composição fullPage nesta reprodução. Antes de safe-area,as posições portrait e paisagem testadas passaram. A imagem histórica é fullPage e,isoladamente,não comprova esse cenário.
RECOMENDACAO de correção focal:header e rail em regiões naturais de grid/flex100dvh;conteúdo rolável entre elas;atalhos por largura intrínseca com wrap;foco/skip e observer relativos ao conteúdo;desktop conserva composição anterior. Sem alterar workspaceCRUD/APIs.
### Errata da classificação anterior de membros
Cinco falhas por ausência de rolealert são expectativas de apresentação,não prova de erro não anunciado:rolestatus já anuncia a mensagem. Não as tratar como cinco defeitos funcionais. Próxima revisão do teste medirá texto real,ausência de sucesso em409 e limpeza da mensagem após retry real200;alterar semântica para alert será apresentação. O FAIL inicial e sua classificação original permanecem rastreáveis no commit anterior.

## Candidato de composição móvel
Rodada2026-10-19T12:35:20Z–12:44:14Z;snapshot3823edaea167989f3aae6c9a7524178422fc13c82d9c77bcc70dc8787f0b9877.RegressionSetup/Typecheck/Lint PASS (0erros,3avisos preexistentes);E2E127 PASS/7 FAIL em134.Todos120preexistentes PASS.
[Journal](evidence/mobile-candidate.jsonl),[log](evidence/mobile-candidate.log);capturas/JSON em evidence/mobile-candidate/.
A região própria eliminou sobreposição estável e hit=false no cenário safe-area34:as oito medições de foco por largura/perfil nesse cenário estão visíveis e recebem pointer.Links não fragmentam palavras. Três casos ainda falharam numa amostragem booleana50ms após resize normal;capturas seguintes mostram controle exposto.INFERENCIA:sincronização por espera fixa pode amostrar antes da conclusão do layout;próximo teste aguardará a condição,sem afrouxar geometria ou aumentar timeout global.Não declarar GREEN móvel completo.
Quatro outros FAILs confirmam defeito material de membros:GETretry200 e lista3 pronta,mas texto do503 anterior continua mostrado. Conflito409 e bloqueio de mutação duplicada agora passam com mensagem real,sem impor rolealert.
Revisão separada do diff sem bloqueio estático;achadoP2:captura do destino era feita depois de scroll auxiliar,não comprova navegação nativa. JSON mostra Back retornando scroller ao topo;revisar restauração específica do novo contêiner e capturar antes de assistência. Nenhum reset de pathname será adicionado para esconder isso.
Correção de regiões será commit delimitado como candidato;restauração e regressão final seguem pendentes.Sem resultado global PASS alegado.


## Rodada completa interrompida no gate E2E ? retorno m?vel
HEAD0b4ea8474670eea66022e5c49edc8c073cf87973; 2026-10-19T12:59:48Z?13:09:06Z; snapshot5253d80a93ecfc800ebef49f56fa89a538fdab56c8ca8a38a00ed6ba32977fac.
RegressionSetup,Unit(296+17),Integration(218),Migration(37),Contract(6),R1(17),Build padr?o,Typecheck eLint PASS (0erros/3avisos antigos). E2E132PASS/4FAIL em136; todos120preexistentes e os12novos de dashboard/membros PASS, inclusive resposta tardia ap?s troca client real.
Os4FAILs s?o a diferen?a de offset no Back; n?o timeout de rede nem geometria de footer. Destino nativo sem assist?ncia inicia em0 e exp?e h1 nas375; retorno n?o restaura posi??o766/2355/valores respectivos. [Journal e log](evidence/scroll-red/); capturas s?o viewport900. Os5gates posteriores n?o executaram nesta rodada; nenhum PASS inferido.
INFERENCIA ap?s inspe??o dos consumidores: workspace/layout e dashboard/layout possuem inst?ncias distintas do shell, mas pendingRestore era global e usePathname global podia acionar inst?ncia que sa?a. Corre??o focal proposta: pend?ncia por inst?ncia, inten??o POP compartilhada com sequ?ncia e escopo expl?cito por layout; guardas server permanecem id?nticas.
A revis?o visual confirmou qualidade375/768/1440, mas certas fotos320texto200 s? mostram contexto, sem estado anunciado. Helper de conte?do receber? alvo/rolagem expl?citos e metadados; fotos nativas m?veis continuar?o sem assist?ncia.
Corre??o de proveni?ncia: arquivos das primeiras pastas baseline/candidate foram copiados com compara??o DateTime local/UTC; podem conter fotos de rodadas anteriores com nomesbefore. N?o atribuir cada arquivo dessas pastas ao fingerprint do journal. A pasta scroll-red e as pr?ximas usam DateTimeOffset.UtcDateTime e manifestoSHA256; apenas registros com snapshot exato identificam os gates.


## Segunda rodada completa e diagn?stico focal
HEAD35026ec7c8d58d52f4bf3e1e953f533efeed2386; snapshot2f4a9ec35de213a98b4407182cd9936c75c2617b29794c372d8b0d607ef3adf9; 2026-10-19T13:14:47Z?13:28:46Z. Primeiros9 gates PASS; E2E129PASS/5FAIL/2n?oexecutados de136. Al?m dos4FAILs de Back, teste preexistente de mapa teve ECONNRESET no GET de contagem ANTES do clique; dependentes serial n?o rodaram. Causa desse reset n?o demonstrada. Teste/asser??es/timeout/retries antigos permanecem intactos; nova execu??o deve comprov?-los. Gates posteriores novamente n?o executados.
Revis?o visual independente:31PNG atuais e JSON confirmam conte?do leg?vel nos4 tamanhos, estados empty/loading/error/readOnly e foco por Tab. IndicadorN do Next dev ? chrome de ferramenta; fotos s?o viewport e descrevem alvo/rolagem expl?cita. N?o resolve Back.
[Diagn?stico focal](evidence/scroll-scope-red/diagnostic-red.json): envelope RC local conserva gera??o/limpeza de ambiente, Start/Stop, RegressionSetup e accounts-local-postgresql Run Regression oficiais; somente filho diagn?stico executa1caso com coletor redigido. Wrapper/collector ficam ignorados, sem modificar scripts oficiais, guards, package/config ou CI. N?o classificar esse1FAIL como gate E2E completo.
Fingerprint60d1ce324e4de1f5a4e0919ef80d8fc1d3cb9cad5e70fd3d28b95ee8285ca21e inclui instrumenta??o tempor?ria opt-in de lifecycle. timeOrigin igual prova navega??o client; cache766 est? correto, novo workspace fica0. A inst?ncia dashboard instala listener, depois cleanup o remove; n?o h? pop-seen antes da inst?ncia workspace tentar claim com missing-marker. EVIDENCIA_IMPLEMENTACAO: inten??o n?o chega ao destino. O respons?vel exato na ordem interna do Next n?o foi instrumentado e n?o ? atribu?do.
Corre??o focal em avalia??o: evento POP ?nico por m?dulo/aba e subscribers de inst?ncias, em vez de listener removido junto com layout. Ap?s diagn?stico, retirar toda instrumenta??o e repetir gates sobre candidato limpo.


## Retorno e geometria ? probe limpo de quatro casos
Snapshot e801a73a8f9e541f9bcdaa040be5ff3595a7073f9fd4652c18ef02a154566339: quatro perfis375/320 ?texto100/200 PASS, sem instrumenta??o. [Journals focais e geometria](evidence/mobile-focused-green/). ? GREEN dos quatro testes m?veis, n?o do gate E2E global.
O listener ?nico observou tab-pop, publicou posi??o766; destino reivindicou, inicialmente clampou durante loading e restaurou766 quando a lista chegou. Back/Forward/reload e3/4 atalhos passam; safe-area34 em667?375 tem todos os controles medidos vis?veis e com hit real. Cliques/toques s?o emulados no Chromium140.0.7339.186/Playwright1.55.1, n?o aparelho f?sico.
Classifica??o das falhas focais preservada nos journals: probe1FAILseminten??o; probe2FAILapesarBackcorrigido por amostra imediata em transi??o; probe4casos3PASS/1FAIL e candidato limpo3PASS/1FAIL por exigir offset fisicamente indispon?vel. Fonte global existente transition .3s ? aguardada naturalmente antes da medi??o e a escalaCSS ? restabelecida ap?sreload antes de voltar. Diferen?a38 tinha origem2782 e novo m?ximo2744; a restaura??o j? estava2744, corretamente clampada. A expectation agora ? min(posi??o salva,m?ximo atual), com mesma toler?ncia2px/timeout5s; o retorno incorreto0 continua reprovado.
Instrumenta??o tempor?ria inteiramente retirada. Runners/config/package/guards n?o foram alterados para os probes. Listener da aba n?o captura campos, autentica??o ou history.state; inst?ncias mant?m pend?ncia/ref e assinaturas locais. Revis?o independente do hook limpo n?o encontrou bloqueio concreto.
A regress?o completa e o CI do HEAD publicado ainda precisam confirmar a candidata.


## Regress?o completa: exclus?o detecta reten??o do cache

EVIDENCIA_IMPLEMENTACAO. HEAD c0f74db3d7d8c16720bb6f6a04a66fb0b8b1d3d8; snapshot e801a73a8f9e541f9bcdaa040be5ff3595a7073f9fd4652c18ef02a154566339; 2026-10-19T13:46:58Z?13:56:00Z. Primeiros nove gates PASS; E2E **136/136 PASS** (inclui o teste preexistente de mapa, sem alterar asser??es/timeouts/retries); HTTPS **2/2 PASS**. Deletion **FAIL: 2 PASS/1 FAIL**, porque ap?s excluir a conta localStorage.length + sessionStorage.length era 1, esperado 0. Este resultado bloqueia publica??o at? corre??o. Ihfr, Bootstrap e SchemaAudit n?o executaram nessa rodada.

[Journal](evidence/deletion-red/results.jsonl), logs redigidos E2E/HTTPS/Deletion na mesma pasta. O cache m?vel n?o pode recriar armazenamento ao sair do shell para exclus?o, nem reter estado de uma sess?o terminada. A corre??o ser? restrita ao hook de UI, preservando AuthContext, fluxo de exclus?o e teste preexistente. Nenhum PASS global inferido.

## REVIEW final local — 19/10/2026

EVIDENCIA_IMPLEMENTACAO. Fonte final revisada:275f4dc7147dcf223cd2ced9da069be2fb05e966; snapshot funcional7d13dedfa6c89edf5c2a3262e1c5eae4c958da1f386cb86890e7ade9963d9a51. A rodada completa anterior de15gates é f6225ec0aa48a15e4120d82195cba99d3a7d02b683106edd59008ed04b710894 (f8c5e7114ebc86ca55f5d0690120bd608f280c0e), todos PASS, E2E136, HTTPS2, exclusão3, IHFR6. Após a revisão, o delta documental de exclusão passou Deletion3, Build padrão, Typecheck e Lint:0erros/3avisos preexistentes. Não chamar os15gates anteriores de rodada integral da fonte posterior. CI15gates do HEAD publicado será conferido no recibo final do PR.

Revisores separados somente leitura: análise SpecKit e fontes por mission_context; protocolo/concorrência e hook por phase4_tests;31capturas atuais e metadados por visual_contracts. Revisão do delta275f4dc por phase4_tests sem bloqueio identificado. Autor raiz revisou os PNG finais de safe-area/texto200, foco de membros320 e resumo1440. Essas revisões são locais por agentes, não aprovação humana nem revisão do GitHub em nome de Pedro.

Consistência Spec Kit:9FR/4SC/19tarefas; cobertura mantida do PLAN. FR001/002→T005–008; FR003/004→T009–012; FR005→T009/010/014; FR006/007→T013–015; FR008→T008/011 e delta de consumidor público; FR009→T016–019. Sem conflito crítico/alto ou requisito sem tarefa. T019 aguarda publicação/checagem do CI; seu recibo final será no PR para evitar novo ciclo documental. Precisão adicional de rastreabilidade: gestão de papéis corresponde a CF-UC-016; CF-UC-006 trata seleção/contexto. Contratos de membros: specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml e src/app/api/server/laboratories/laboratory-membership.contracts.ts. A referência inicial resumida era assunto, não arquivo existente. Code-First permanece EM_REVISAO.

Apontamento móvel: screenshot fullPage histórico isolado não provava obstrução geral. RED real confirmou controle encoberto/hit=false em667×375, texto CSS200%, safe-area34emulada. GREEN reserva regiões naturais de header/conteúdo/nav100dvh; não usa espaçador arbitrário.4perfis375/320×texto100/200,3/4atalhos, posições de rolagem, toque/teclado/menu/logout, orientação/resize/skip, foco e Back/Forward/reload passam. Desktop768/1440 conserva documento. Cache limitado porpathname,50entradas, não porentrada de histórico; não guarda campos/autenticação/DTOs. Restauração respeita o máximo atual e foco explícito.

Achados tratados: GET503 antigo persistia após retry200; retorno ao topo entre layouts perdia intenção POP; cache persistia após exclusão SPA e documental. A entrada documental foi testada com cache criado por interação real, sem seed nem leitura de valores; sucesso HTTP/DTO estrito agora limpa apenas a chave própria. Não altera cancelamento/senhaerrada/resultadoincerto, AuthContext ou backend. Primeiro probe documental falhou por seletor com acento corrompido (59b827...), corrigido sem mudar asserções; RED funcional subsequente1e34f89... comprovou storage1, esperado0. Logs e reruns preservados.

APIs reais no ambiente sintético comprovam contagens, cursores, papéis e conflito409; atrasos/503 controlam transporte, sem DTO inventado. Troca client real descarta respostas antigas de histórico/membros. Não há caso de PATCH pendente durante troca de contexto: limite declarado, não alegação de cobertura. Todos120E2E preexistentes passaram; o ECONNRESET histórico de mapa foi reexecutado sem alterar teste/timeouts/retries e permanece sem causa retrospectiva atribuída.

[Journal completo anterior, delta, falhas documentais, capturas finais e manifesto](evidence/local-reviewed/). PNG têm hash dos bytes; textos hash UTF8/LF semBOM para verificação entre checkouts. Capturas são viewport fullPage:false,900px em portrait e375em paisagem, Chromium140.0.7339.186/Playwright1.55.1; metadados registram scroll/alvo/escala. Texto200% é escalaCSS de fonte; safe-area/toque são emulação, não aparelho físico. Campos preenchidos mascarados; nenhum env,cookie,token,senha ou trace publicado.

Pendências humanas: aceite visual/manual, leitor de tela/dispositivo físico e integração pelo mantenedor. Previewfalse e CI focal prontos antes do primeiro push. Sem merge/deploy/operação em provedores ou bancos reais; RC/ZIPs/processos alheios preservados. Estado publicado e HEAD/CI finais serão registrados no PR, sem transformar resultado local em publicação.
## Correção focal OBS-UI-01 — PLAN / EXECUTE / REVIEW — 2026-10-19

### PLAN
FATO_DOCUMENTADO: solicitação atual e PROMPT-CODEX.md do ZIP (SHA2567faea0ad19e4efcc00fce85b5ee6637b82854d18f65b689ba4dab5f04d6916d3). Adendos Spec Kit em spec/plan/tasks, sem nova spec/branch/worktree. Commit PLAN42dd5f3e93deb5074d5bf678b9ddc584e99e3d23 precede o teste3c356d78d22074e01193bb41205e434b552daaaf e o produto2909ce33d900331fd05d754b04f3a860eb035056.

### EXECUTE
EVIDENCIA_IMPLEMENTACAO: somente tests/e2e/frontend-mobile-navigation.spec.ts e uma regra em src/components/workspace/workspace.module.css. Range delimita a palavra Configurações; flex-wrap permite distribuir ícone/texto sem quebrar o interior das palavras. Nenhuma redução da fonte ou mudança de alvo/foco/contrato.

| Rodada oficial | Intervalo UTC | Resultado | Fingerprint funcional |
|---|---|---|---|
| RED no teste3c356d7 |17:01:47–17:07:51|RegressionSetup PASS; E2E134PASS/2FAIL (375/320texto200, Range2)|e3f0ef212747111b69285ce9fbeea82881d0c50a219490147ad93c4e6bdc0c8a|
| GREEN no produto2909ce3 |17:08:13–17:14:39|RegressionSetup/Build/Typecheck/Lint/E2E PASS;136E2E|b7c7aa993accff559d51dcf57da7b927aaf34bc03bd30fb70f791a7ae31cdf0f|

Entrypoint oficial rc-review-validation.ps1; RED -Gates RegressionSetup,E2E e GREEN -Gates RegressionSetup,Build,Typecheck,Lint,E2E. Runners/guards/timeouts/asserts anteriores preservados; cluster próprio encerrado, dados preservados. Lint0erros e3warnings preexistentes fora do delta. Nenhum PASS inferido dos gates não executados localmente; os15remotos serão conferidos no HEAD final.

[Manifest RED](evidence/visual-fix-red/manifest.json) e [manifest GREEN](evidence/visual-fix-green/manifest.json) preservam journals, logs e SHA256 de cada arquivo. Before/after do mesmo cenário são viewport fullPage:false:320/375texto100/200, três/quatro links, paisagem667×375/safe-area34 e foco. Os PNGs desktop768/1440 do teste existente são composições fullPage, identificadas como tal; não provam exposição de viewport. Capturas históricas não foram substituídas. Falhas anteriores do CI permanecem nos recibos anteriores do PR14.

### REVIEW
RECOMENDACAO do revisor independente /root/review_visual (somente leitura do delta/capturas): nenhum achado material após a correção. Conferidos ícone/palavra, fonte ampliada html32px, foco, hit e geometrias atuais. Range antes do override não afirma safe-area/recorte/Poppins sozinho; evidência visual e geometria corroboram esses cenários.
Limites: Chromium com ampliação CSS e safe-area emulada, sem dispositivo físico/leitor de tela/WCAG integral. Aceite humano continua pendente. Sem API/DTO/AuthContext/autorização/ciência/provedor real/merge em development/main/deploy. Não houve alteração material de decisão técnica ou registro canônico global.
Publicação: usar branch/PR14 existentes. O recibo remoto em https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/14 registrará o SHA final,15gates,run/artefato/checksum e encerrará T024 sem novo commit documental circular. Até esse recibo, CI final não é alegado.
