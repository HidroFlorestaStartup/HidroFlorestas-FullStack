# Desenvolvimento da plataforma HidroFlorestas — atividades, resultados e perspectivas

**Relatório de continuidade | Após o corte de 1º de outubro até 25 de novembro de 2026**

## Resumo

O HidroFlorestas é uma plataforma web de uma startup nascida no Instituto Federal do Maranhão (IFMA). A plataforma organiza o monitoramento ambiental por laboratório e vincula cada área às suas coletas, medições e diagnósticos. Seu núcleo científico é o Índice HidroFlorestal de Risco (IHFR), cuja implementação continua experimental e sujeita a recalibração.

No período, a equipe implantou jornadas de verificação de e-mail, recuperação de senha e exclusão da própria conta, acrescentou rascunhos ambientais pessoais e capas privadas para áreas e incorporou uma nova interface ao sistema que já armazenava os registros. Depois dos testes de integração, foram ajustadas a navegação móvel, a leitura de coletas e do IHFR e a apresentação do território. Em novembro, as melhorias chegaram à versão principal. A equipe também atualizou a página institucional, preparou o laboratório fictício Hifro para demonstração e restabeleceu operações de geocodificação, envio de capas e processamento automático de e-mails. Os testes dão evidência de funcionamento nos cenários registrados. A validação científica do IHFR, a restauração de banco hospedado e o aceite amplo por usuários seguem com comprovação pendente.

## 1. Contexto e objetivos do trabalho

O relatório anterior, *Desenvolvimento da plataforma HidroFlorestas — atividades, resultados e perspectivas*, registrou até 1º de outubro de 2026 a construção do fluxo de laboratório, área, coleta, dados ambientais e diagnóstico. A fase seguinte partiu dessa base para melhorar o uso em situações reais. Entre os objetivos estavam facilitar a retomada de um preenchimento, tornar mais claras as informações de cada coleta, ampliar as operações de conta e preparar uma apresentação navegável com registros de demonstração.

O recorte começa no ponto em que a versão para leitura do relatório anterior foi registrada no Git, no commit `f8b2a47`. Assim, inclui as correções publicadas mais tarde no próprio dia 1º de outubro. O novo corte é 25 de novembro de 2026. As últimas alterações nas branches principais e o registro operacional mais recente encontrado são de 16 de novembro.

A apuração usou o repositório oficial HidroFlorestaStartup/HidroFlorestas-FullStack e consultou o repositório de origem PedroVitor237/HidroFlorestas para recompor a transição de outubro. Foram inventariados os arquivos versionados, o histórico das branches principais e auxiliares e as propostas de integração do repositório oficial. A leitura técnica concentrou-se nas alterações do período e cruzou código de interface e servidor, estrutura do banco, configurações, scripts, especificações, testes, registros de revisão e evidências operacionais. Uma proposta de alteração no GitHub é identificada neste relatório pelo número de seu *pull request* (PR). Quando o número pertence ao repositório de origem, isso é indicado no texto.

## 2. Organização e análise da documentação

Em outubro foram reunidos os requisitos, testes e procedimentos de atualização referentes a contas, rascunhos e capas. A revisão inicial encontrou divergências entre a documentação das respostas do sistema e o que de fato era entregue ao navegador. Foi corrigido o contrato documentado da lista de áreas, distinguindo as informações de capa mostradas na lista daquelas disponíveis no detalhe. A equipe preservou também os testes e as observações das primeiras tentativas, inclusive os resultados de falha.

A incorporação visual gerou um conjunto de especificações, verificações por etapa e orientações para continuidade. O trabalho de 23 a 25 de outubro conciliou registros do PRD Code-First, o documento de requisitos reconstruído a partir do sistema, com a implementação e a revisão técnica dos estudantes. A equipe preservou 206 documentos da investigação pós-consolidação por meio de uma entrega documental (PR #32). Os PRs #27 e #28 foram encerrados sem merge direto, e as evidências aproveitadas ficaram registradas nas entregas que efetivamente entraram no projeto. O material histórico de referência permaneceu intacto na comparação entre o corte anterior e a versão principal atual.

Em novembro, a consolidação do ciclo de interface preservou as aprovações, as capturas de tela e os recibos da demonstração isolada. O registro posterior de operações identificou as configurações revisadas e os testes feitos antes da apresentação. Esse registro ficou no PR #67, que estava aberto como rascunho na consulta de 25 de novembro.

## 3. Planejamento e definição de requisitos

A equipe dividiu a renovação visual em dez fases, começando pelo login e pelas jornadas de conta. Em seguida vieram a escolha de laboratório, a navegação, o painel, os membros, as áreas e suas capas, as coletas e os dados ambientais. As fases finais reuniram IHFR, mapa, administração global e página pública. O Lovable serviu para explorar propostas e referências de tela. A integração adaptou essas referências à aplicação Next.js e às operações já ligadas ao banco de dados, incluindo suas regras de permissão e tratamento de falhas.

Na virada de 7 para 8 de outubro, a primeira etapa de contas foi reunida na versão principal do repositório de origem. Em 17 de outubro, a versão candidata com contas, rascunhos e capas entrou em desenvolvimento no repositório da startup. As fases de interface foram integradas de 18 a 21 de outubro, com a candidata agregada do PR #25. Em 9 de novembro, o PR #55 levou as melhorias acumuladas e o suporte a Photon à versão principal. Entre 14 e 16 de novembro, novas publicações incorporaram a apresentação revisada das coletas, a página institucional, o mascote e a demonstração Hifro.

Os critérios de aceitação passaram a cobrir situações concretas. Entre elas estavam retomar a confirmação de uma coleta após perda de conexão, preservar uma medição com valor zero, impedir que um rascunho seja salvo após troca de sessão e manter o foco de teclado ao carregar informações. A configuração de implantação e os testes com bancos isolados permitiram revisar as entregas antes de decidir a integração.

Após o primeiro ciclo, os testes manuais orientaram três frentes no início de novembro. A primeira tratou de navegação e do menu de conta. A segunda reorganizou a leitura de áreas, coletas e IHFR. A terceira tornou município, unidade federativa (UF) e CEP opcionais e preparou o preenchimento sugerido por geocodificação reversa, que procura um endereço aproximado a partir de coordenadas. A equipe reuniu as frentes em uma única candidata para aceite, registrou o que ainda precisava de ajuste e concluiu as três ressalvas de interface em 6 de novembro.

## 4. Evolução da plataforma e funcionalidades entregues

### 4.1 Acesso do usuário e gestão da própria conta

Ainda em 1º de outubro, após o corte anterior, foi acrescentada uma saída mais fácil de encontrar na tela de escolha de laboratório, inclusive em dispositivos móveis. Em seguida, o sistema recebeu verificação de e-mail com código, reenvio controlado, recuperação de senha e troca de senha. A conta criada pode ter estado ativo e, enquanto aguarda a confirmação exigida, opera com uma sessão restrita. A recuperação e a troca de senha encerram a validade de credenciais de sessão anteriores conforme as regras da aplicação.

A exclusão da própria conta passou a exigir confirmação de senha. As regras bloqueiam a exclusão em situações que envolvem responsabilidades ou vínculos protegidos e preservam a integridade dos registros mantidos pelo laboratório. As telas de login, cadastro, confirmação, recuperação, troca de senha e exclusão foram redesenhadas com os estados de carregamento, erro e nova tentativa correspondentes a cada fluxo.

### 4.2 Laboratório, membros e navegação

A tela de trabalho passou a facilitar a identificação e a escolha explícita do laboratório em uso. A navegação evidencia o contexto corrente e conserva os estados de carregamento, ausência de registros, erro e recuperação. O painel e os integrantes passaram pela incorporação visual com dados reais. No celular, a equipe ajustou a rolagem, o retorno do foco de teclado e a abertura do menu de conta dentro dos limites da tela. O painel de integrantes passou a mostrar iniciais quando a foto de um membro está ausente. Em novembro, a imagem do mascote foi incluída no cabeçalho do ambiente de análise.

### 4.3 Áreas monitoradas, localização e capas

O cadastro continua fazendo a representação territorial da área por um ponto. As coordenadas podem vir do dispositivo, da seleção no mapa ou do preenchimento manual. Município, UF e CEP podem ser sugeridos pelo Photon, aceitam edição manual e são opcionais no cadastro. A interface preserva campos já editados pelo usuário e permite concluir o cadastro quando o provedor não responde ou a localização não tem um endereço disponível.

A área ganhou uma capa privada, com edição condicionada à permissão no laboratório. O fluxo valida o arquivo, cria uma revisão para a imagem e serve o conteúdo por leitura autorizada. Em outubro, foram corrigidos dois problemas: a recarga após uma falha de imagem com a mesma revisão e a recuperação de tentativas de envio sujeitas a conflitos no PostgreSQL. Em novembro, três áreas da demonstração receberam fotos regionais ilustrativas para uso na ausência de capa persistida. Uma capa salva pelo serviço prevalece e os controles existentes de seleção, envio e recarga permanecem disponíveis para quem tem permissão.

### 4.4 Coletas e registros ambientais

A entrada da data de ocorrência ficou mais simples, com preservação do instante e do fuso registrado. A interface diferencia o horário ocorrido em campo do horário da confirmação no sistema. A etapa de revisão permite conferir o preenchimento e recuperar uma confirmação cujo resultado ficou incerto durante uma falha de comunicação. O fluxo conserva a identidade da tentativa para evitar a criação de uma coleta duplicada quando o mesmo usuário repete a solicitação.

O rascunho ambiental pessoal passou a poder ser salvo explicitamente e retomado na mesma coleta. O sistema armazena valores parciais, distingue ausência de informação, valor zero e resposta negativa, protege o salvamento de mudanças concorrentes e consome o rascunho na confirmação dos dados definitivos. A apresentação por grupos de medições ganhou ajustes de precisão e clareza. No celular, a consulta da coleta foi reorganizada para mostrar primeiro a leitura, seguida por dados ambientais, registro e ações autorizadas.

### 4.5 Apresentação do IHFR experimental

O cartão da área passou a destacar o último IHFR experimental disponível e sua coleta de origem. Na tela de diagnóstico, a apresentação passou a usar **IHFR registrado**, com duas casas decimais e vírgula decimal, no lugar de “Escore” ou “Score”. Os limites do diagnóstico ficaram acessíveis em **Ler mais**, inclusive quando ainda não há resultado. Também foram removidos atalhos redundantes e foram ajustados a ordem da leitura em dispositivos móveis e os rótulos em português.

A versão experimental continua identificando a origem do resultado, sua condição e a coleta à qual ele pertence. A formulação do índice e os critérios científicos do contrato experimental v0.1 permaneceram os mesmos no período. Melhorias de apresentação e testes de regressão dão evidência sobre o funcionamento do software. A adequação dos pesos, limites e classes exige calibração e validação científica próprias.

### 4.6 Mapa territorial, painel e administração

O mapa e sua alternativa em lista foram harmonizados com a nova interface. Ambos usam as áreas e coletas autorizadas do laboratório. Os pontos do mapa ganharam acionamento por teclado e os controles de zoom foram ajustados para uso em telas estreitas. Na apresentação de coletas do mapa, a confirmação passou a aparecer primeiro e em negrito, com o horário exibido em horas e minutos. A lista continua disponível para consulta quando as imagens do mapa ficam indisponíveis.

Na administração global, as mudanças atingiram busca, filtros, paginação e revisão de contas. A interface deixa de mostrar a auditoria da conta anterior ao trocar a seleção, e o foco respeita o alerta administrativo vigente. O papel de quem administra a plataforma e os papéis dentro de um laboratório continuam sendo aplicados em seus respectivos contextos.

### 4.7 Página pública e demonstração Hifro

A página pública foi revisada em outubro e novamente em novembro. A versão principal conserva a apresentação de **Monitoramento ambiental por laboratório** e posiciona a proposta de segurança hídrica e restauração florestal em relação ao Médio Itapecuru. Foram reorganizados o desafio territorial, a solução, a equipe por competências e o apoio institucional. A página identifica o IFMA, a AGiFMA e a FAPEMA, apresenta os canais atualizados de contato e traz o Hifro animado, com alternativa estática conforme as preferências de movimento e as condições de carregamento. A inteligência artificial é apresentada como possibilidade futura.

Uma primeira demonstração hospedada foi preparada em um ambiente isolado com banco e dados sintéticos. Em 16 de novembro, foi preparado um cenário distinto para o ambiente principal. O laboratório fictício Hifro recebeu cinco participantes com papéis de proprietário, administração e participação, três áreas ilustrativas e quatro coletas por área. Das doze coletas, onze receberam medições confirmadas e nove ficaram com IHFR vigente calculado pelo avaliador do sistema. Isso permite demonstrar uma coleta pronta para consulta do índice, uma com medições disponíveis para calcular e outra ainda sem dados ambientais. Os nomes e as localizações ilustram o contexto da apresentação. Os números vêm de registros sintéticos e descrevem a demonstração, sem representar uma campanha de campo.

As capas finais mostram babaçu e cultivo em Itapecuru-Mirim e o rio Itapecuru em Rosário. A plataforma apresenta a atribuição e a licença das imagens, utilizadas como ilustrações regionais. Em 16 de novembro, a publicação da demonstração e dessas capas na versão principal foi registrada no PR #66.

## 5. Decisões técnicas e científicas durante o trabalho

A aplicação manteve Next.js, PostgreSQL e Prisma. As seis novas migrações versionadas desde o corte anterior dão suporte à fila de e-mail, à verificação e recuperação de conta, aos limites de solicitação, à exclusão de conta, aos rascunhos e às capas. A preparação de um banco vazio e a atualização de um banco existente permaneceram documentadas como operações distintas. As intervenções de serviços em 16 de novembro ocorreram por configuração, sem migração adicional naquele trabalho.

A revisão de outubro incorporou uma atualização focal de dependências do framework e do processamento de imagens. A auditoria daquela versão registrou a redução de 13 alertas para cinco, todos em dependências de desenvolvimento. A auditoria se refere à versão revisada em outubro.

O envio de e-mails usa uma fila persistente. Um processador executa os envios por meio do Gmail SMTP, e o agendador externo chama a aplicação periodicamente. Em produção e no ambiente de prévia, a equipe alinhou o remetente da aplicação à conta SMTP configurada. O agendador existente foi redirecionado para o ambiente principal e retomou a frequência de uma execução por minuto. O tratamento de mensagens vencidas foi testado separadamente da confirmação de recebimento de uma mensagem válida.

Para a geocodificação, a aplicação recebeu adaptação ao formato de resposta do Photon. A consulta é complementar ao cadastro e a seleção de coordenadas continua disponível com preenchimento manual. Para as capas, a configuração produtiva do Cloudinary foi alinhada à assinatura do perfil de upload já existente. A consulta autenticada do conteúdo foi preservada, assim como a distinção entre a capa salva da área e as ilustrações públicas da demonstração.

O contrato científico do IHFR permaneceu experimental. Os dados fictícios foram processados com o avaliador existente, com identificação da versão e do histórico. A confirmação de que o cálculo e a exibição funcionam com essas entradas serve para avaliar o sistema e sustentar a demonstração.

## 6. Atividades de teste e resultados demonstrados

Os resultados a seguir pertencem às versões e aos ambientes registrados no período. A mesma suíte aparece em mais de uma rodada, por isso suas contagens representam cada execução individual.

| Período e atividade | Resultado registrado | Alcance da evidência |
| --- | --- | --- |
| 1º de outubro, usabilidade anterior à renovação visual | 255 testes unitários, sete testes de rotas e doze cenários de interface em Chromium aprovados. | Os componentes foram exercitados com dependências controladas. O build padrão ficou bloqueado no ambiente local e a compilação diagnóstica com Webpack passou. |
| 12 a 17 de outubro, revisão de contas, rascunhos e imagens | A primeira rodada geral registrou 65 testes de ponta a ponta aprovados, uma falha e um caso sem execução. A candidata corrigida registrada em 13 de outubro passou em 15 verificações, incluindo 70 testes de ponta a ponta. | São execuções distintas. A revisão reproduziu o defeito na recarga da capa, e a rodada corrigida demonstrou a retomada do rascunho e a nova tentativa de leitura da imagem. |
| 21 e 22 de outubro, consolidação da interface | A candidata integrada no PR #25 passou em 15 verificações na integração contínua, com 220 testes de ponta a ponta e 231 de integração. A candidata funcional da investigação seguinte também passou em 15 verificações. | O complemento documental final da investigação tinha outro commit e ficou sem execução funcional própria. Os dois resultados de outubro não se somam. |
| 23 a 25 de outubro, investigação de intermitências | Quatro cenários móveis de saída passaram no ambiente local autenticado e configurado para o fluxo. Os quatro resultados negativos do cenário anterior foram preservados. | A investigação demonstrou o efeito da configuração de origem no cenário reproduzido. Algumas intermitências históricas permaneceram sem causa comprovada. |
| 1º a 6 de novembro, interface e aceite | A rodada final de comparação visual completou 75 de 75 casos previstos. A candidata integrada no PR #51 passou em 15 verificações e 241 testes de ponta a ponta. O PR #53 passou em 15 verificações e 244 testes de ponta a ponta. | Pedro testou e aprovou a remoção do atalho redundante, a apresentação do aviso experimental e a prioridade de leitura no celular. |
| 14 de novembro, publicação da interface e da página pública | A candidata do PR #58 registrou 434 testes unitários centrais e 17 de e-mail aprovados, sete cenários da página pública e 14 regressões de apresentação aprovados. | A publicação reuniu os ajustes de coletas e IHFR e a primeira versão com Hifro animado, após teste manual no ambiente de prévia. |
| 16 de novembro, apresentação Hifro | Build local e hospedado, 26 verificações locais das capas ilustrativas e dois testes de contrato de capa aprovados. Login e leituras autenticadas do cenário sintético retornaram HTTP 200. | Os testes cobriram a seleção das imagens, atribuição, prioridade da capa privada, preservação dos controles e leitura dos registros da demonstração. |
| 16 de novembro, configuração dos serviços | Photon retornou município, UF e CEP na consulta testada em Itapecuru-Mirim. O upload assinado e a leitura privada da capa passaram. O agendador registrou duas execuções automáticas com HTTP 200, e Pedro confirmou o funcionamento e o recebimento no fluxo de recuperação de senha. | Cada evidência cobre o cenário, o endereço ou o fluxo efetivamente exercitado. A rotina periódica de limpeza de imagens ficou fora dessa configuração. |

Os ensaios de outubro também incluíram preparação de banco sintético, verificações de migração e uma tentativa de restauração. A comparação textual do catálogo na restauração registrou divergência. As verificações pontuais posteriores indicaram compatibilidade no recorte testado. A homologação de backup e restauração em ambiente hospedado permanece aberta.

## 7. Dificuldades encontradas e encaminhamentos

Na primeira revisão de outubro, o comando de recarga podia mostrar sucesso enquanto mantinha o erro anterior da imagem. A causa foi rastreada ao estado da prévia quando a revisão da capa permanecia igual. A correção passou a reabrir a tentativa de leitura. Em paralelo, um salvamento inicial de rascunho podia esbarrar na preparação tardia da tela, e um envio de capa podia encontrar conflito de concorrência no banco. Os casos motivaram correções focais, com testes para os cenários afetados.

No ciclo de incorporação visual, testes com texto ampliado e telas estreitas expuseram falhas de foco, rolagem e recorte. Uma execução local da navegação móvel também ficou parada na saída da conta. A investigação demonstrou que a diferença entre as origens `127.0.0.1` e `localhost` interferia na autorização da solicitação naquele contexto. O novo ensaio com a configuração correta passou. A falha anterior permanece registrada com seu próprio ambiente e resultado. A investigação de outras ocorrências históricas de verificação de conta e leitura do diagnóstico deixou hipóteses em aberto.

Houve ainda uma frente de correção do instalador Windows, com testes de execução do processo de instalação. Essa frente ficou em uma linha de desenvolvimento separada da aplicação publicada. O PR #42 integrou a correção no ramo do instalador, e o PR #43, referente à continuação, foi encerrado sem merge. Nenhum dos dois commits de ponta integra a versão principal examinada.

Em novembro, o primeiro teste manual de capa retornou indisponibilidade. A equipe preparou as fotos estáticas para viabilizar a apresentação e corrigiu depois a divergência de configuração do serviço de imagens. O teste real percorreu início do envio, upload assinado, confirmação e leitura autenticada. Em e-mail, o remetente incompatível e o agendador apontando para um deploy antigo foram corrigidos separadamente. O registro operacional preserva o resultado de cada verificação e os limites de sua abrangência.

## 8. Participação individual e construção coletiva

**Pedro Vítor** aparece no histórico como autor das melhorias iniciais de saída e data da coleta e como responsável por preparar a proposta visual, registrar revisões e evidências, orientar a sequência de incorporação do frontend e integrar várias das entregas. Também estão registrados seu teste manual e aceite de novembro, a adaptação do Photon, a revisão dos textos e da apresentação de coletas e IHFR, a atualização institucional da página pública, a preparação dos dados e capas da demonstração e a confirmação operacional dos serviços. Sua atuação combina implementação, revisão, organização técnica, testes de uso e publicação.

**Luciano Mendes** aparece na consolidação das entregas do repositório de origem, na documentação e revisão de contas, rascunhos e capas e no trabalho de apresentação do mascote e da equipe. Os registros também atribuem a ele a mudança do mascote no cabeçalho do ambiente de análise. Há revisão conjunta em diferentes etapas do período.

A conta **thalesvalente** aparece na implementação e na validação da fila de e-mail, das jornadas de conta, dos rascunhos e das capas, nas primeiras fases de incorporação visual e em correções, instrumentos de teste e fechamento técnico. Outros commits e propostas aparecem sob a conta da organização HidroFlorestas. A atribuição neste relatório segue autores, responsáveis por revisões e aprovações identificados nas fontes. As atividades realizadas em conjunto e as decisões tomadas em reunião têm autoria individual menos detalhada nesses registros.

## 9. Contribuições, aprendizado e limitações

O principal avanço do período foi transformar uma base funcional em uma aplicação mais completa para uso e demonstração. A equipe pôde conservar um rascunho durante o trabalho, acompanhar a origem de um resultado pelas telas de área e coleta, encontrar o mesmo conjunto territorial pelo mapa ou pela lista e percorrer a aplicação com um cenário de demonstração coerente. A aproximação entre testes automatizados e testes manuais permitiu corrigir dificuldades que eram visíveis no uso, como a ordem da leitura móvel e o preenchimento de endereço.

Na consulta de 25 de novembro, `main` estava no commit `142cf87` e `development` em `0bfdd26`. As duas branches tinham conteúdo idêntico. A decisão de congelar o estado para a apresentação foi registrada no PR #67, que acrescenta documentação e segue como rascunho. O último estado operacional documentado é de 16 de novembro. A inspeção atual verificou o histórico e as evidências do repositório. Os ensaios citados são os do período, e o estado atual dos provedores e do site publicado ficou fora da verificação.

A evidência disponível também é limitada para uso com tecnologias assistivas, desempenho em escala, experiência de usuários externos e adoção da plataforma. Os testes técnicos e o aceite de Pedro têm recortes definidos. Os dados sintéticos da demonstração e o funcionamento do avaliador preservam o caráter experimental do IHFR. Os efeitos da plataforma em campo e a adequação científica do diagnóstico seguem como questões de avaliação.

## 10. Atividades futuras

- **Operação de contas e imagens.** Completar a verificação das diferentes jornadas de e-mail em ambiente real e tratar a execução periódica da limpeza de imagens. O processamento automático de e-mails e a limpeza do Cloudinary são rotinas independentes.
- **Recuperação e continuidade operacional.** Homologar backup e restauração em ambiente hospedado, com responsáveis, escopo e evidências definidos. O ensaio local de restauração oferece um ponto de partida para essa verificação.
- **Avaliação de uso.** Ampliar os testes com usuários e tecnologias assistivas, verificar dispositivos e navegadores adicionais e avaliar a experiência da consulta territorial e do preenchimento em condições de conectividade de campo.
- **Validação científica.** Definir casos de referência, conduzir avaliações de campo e comparar formulações do IHFR sob responsabilidade científica. Uma eventual recalibração exige versão própria e preservação dos diagnósticos anteriores.
- **Material de apresentação.** O cenário Hifro ficou preparado e publicado. O roteiro de gravação e sua execução por automação de navegador ficaram adiados nos registros desse trabalho.
