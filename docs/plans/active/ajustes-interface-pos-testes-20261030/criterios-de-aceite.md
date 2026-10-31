# Critérios de aceite — UI-01 a UI-07

Esta é a lista de resultados futuros exigidos pelo escopo aprovado. Não marca testes como executados. O executor registra ambiente, SHA e resultados na spec/PR de cada recorte.

| ID | Resultado esperado | Conferência mínima |
| --- | --- | --- |
| UI-01 | Fora do laboratório, acesso à conta e seleção de laboratório; Áreas sem contexto ausente | Login/logout reais; troca explícita de laboratório; senha e exclusão acessíveis pelo novo acesso; cabeçalho sem botões de senha/exclusão expostos |
| UI-01 | Dentro do laboratório, navegação lateral única no desktop | Resumo/Áreas/Mapa/Membros no contexto correto, link ativo e retorno à seleção; sem conjunto superior duplicado |
| UI-02 | Área apresenta coletas e caminhos para detalhe, dados e IHFR | Criar coleta, sair da área, voltar por Áreas e reencontrá-la; abrir também uma coleta anterior sem recorrer ao histórico ou mapa |
| UI-02 | Coletas da mais recente para a mais antiga pela ocorrência em campo | Caso com confirmação em ordem diferente e offsets distintos; empate estável; nenhum instante original reescrito |
| UI-02 | Resumo IHFR existente e rastreável na área | Coleta mais nova sem IHFR e anterior com IHFR; origem/data claras; nenhuma coleta com IHFR; autorização/ausência/revogado tratados conforme contrato |
| UI-03 | Detalhe da coleta mais próximo da referência | Comparação desktop/mobile de registro, medições e painel IHFR; persistência/imutabilidade e ações existentes preservadas |
| UI-04 | Resultado/pendência compreensível antes dos detalhes técnicos | Ausência de conjunto confirmado em destaque; código técnico secundário; ações para dados ambientais descobríveis |
| UI-04 | Expansíveis acessíveis com informações completas | Teclado, foco, estado aberto/fechado e conteúdo; identificação experimental curta sempre junto ao resultado; quatro qualificadores completos no detalhe e proveniência preservada |
| UI-05 | Barra inferior contextual e contexto compacto no mobile | Fora/dentro do laboratório, seleção explícita, sem botões verticais duplicados, ação final visível e sem sobreposição |
| UI-06 | Adaptação visual baseada em execução real de ambos os projetos | Capturas comparáveis antes/depois, mesmas telas/estados/viewport, fonte e commit de cada execução identificados; nenhuma imagem de mock rotulada como produto |
| UI-07 | Geolocalização, ponto no mapa e coordenadas digitadas tentam obter endereço | Conferir cada origem de coordenadas e estados de carregamento; município/UF/CEP reconhecidos exibidos e persistidos quando aplicável |
| UI-07 | Município, UF e CEP continuam opcionais | Todos ausentes, ausência individual, resposta parcial, ponto sem CEP, timeout/erro do serviço: cadastro possível; edição manual e dados existentes preservados |
| UI-07 | Concorrência de consultas não deixa endereço errado | Mudar coordenadas durante consulta e simular resposta antiga; resposta antiga não prevalece sobre ponto atual ou correção manual posterior |

## Verificação visual e navegação

Executar 320, 375/390, 768 e 1440px; texto ampliado a 200%, teclado/foco, menus/diálogos, paisagem, Back/Forward e reload no contexto autorizado. Usar capturas de viewport (fullPage:false) para visibilidade e navegação; capturas de página inteira podem complementar, sem substituir. Não atribuir teste em dispositivo físico, leitor de tela ou WCAG integral sem execução correspondente.

O objetivo é aproximação visual da referência com comportamento real, e não igualdade pixel a pixel entre frameworks, dados ou viewports diferentes.

## Regressão proporcional e CI

Usar os scripts e runners oficiais da base vigente, build padrão, typecheck/lint e regressões dos consumidores alterados. Mudança de shell cobre autenticação, contas e consumidores; mudança de área/IHFR cobre autorização, leitura/gestão de coleta, ambientais/drafts e diagnóstico; mudança de endereço cobre API/persistência e migrations se alteradas.

Testes de apresentação podem ser atualizados para refletir a UX aprovada, mantendo verificações significativas de navegação, mensagem humana, abertura dos detalhes e qualificadores. Não remover testes de contrato/autorização, ampliar timeouts sem causa ou enfraquecer assertions para obter verde.

Antes do primeiro push funcional, incluir os nomes reais das branches no filtro push e na condição if do job oficial de .github/workflows/rc-review.yml, preservando runners, Actions/permissões e os 15 gates existentes, e adicionar a guarda Preview false correspondente em vercel.json. A preparação documental não altera workflow nem exige uma bateria funcional nova.

No head final de cada PR funcional, conferir os checks obrigatórios e o journal dos gates aplicáveis, registrando SHA/run/tentativa. Distinguir PASS/FAIL/NOT_RUN e falha histórica de execução atual. Não reexecutar indiscriminadamente rodadas gerais já concluídas; repetir apenas quando mudança, falha ou preocupação material justificar.

## Entrega revisável

Para cada recorte: spec/plano/tarefas reconciliados, implementação, testes pertinentes, evidências visuais e descrição final do PR com UI IDs cobertos, dependências, resultados e limitações. Concluir todos os recortes autorizados e publicar todos os PRs. Merges e aceite humano final ficam com o mantenedor. REV-01–REV-03 continuam fora do código desta rodada.
