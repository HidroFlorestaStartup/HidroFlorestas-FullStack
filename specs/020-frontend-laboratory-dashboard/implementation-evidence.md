# Evidências de implementação — fase4
Estado: EXECUTE em andamento;produto ainda sem alteração. EVIDENCIA_IMPLEMENTACAO.
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
