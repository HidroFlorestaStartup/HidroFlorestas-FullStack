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
