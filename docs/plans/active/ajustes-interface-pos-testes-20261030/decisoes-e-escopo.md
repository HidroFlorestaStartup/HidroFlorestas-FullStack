# Decisões aprovadas e escopo — ajustes de interface

Estado decisório de UI-01–UI-07: CONFIRMADO.
Estado dos ajustes por esta preparação: NAO_IMPLEMENTADO.
Origem: Pedro Vítor, nesta conversa, após testes manuais em 30/10/2026 (America/Fortaleza), aprovação da organização e respostas abaixo.

## Confirmações originais

DECISAO_CONFIRMADA, transcrição das respostas de Pedro às perguntas do preparador:

1. Navegação: “concentrar essa navegação na lateral, como no Lovable e no mobile barra inferior contextual”.
2. IHFR da área, quando a coleta mais recente não tem diagnóstico: “apresentar o último IHFR disponível de uma coleta anterior”.
3. Ordem das coletas: “data da ocorrência em campo”.
4. Localização: “também ao escolher um ponto no mapa e ao digitar coordenadas”, além da localização do dispositivo.
5. Campos: “Vamos incluir CEP (se estiver dísponivel. Ou seja, em áreas que não possuem ou os meios utilizados não consiguirem indentificar algum desses dados (isso vale pra nome da cidade e UF), podem ficar sem preenchimento. Até porque são opcionais)”.

Após a consolidação dessas respostas, Pedro confirmou: “Okay, Concordo!”. Os itens abaixo consolidam as anotações originais e essa confirmação; não afirmam execução ou aceite do resultado futuro.

## UI-01 — Navegação e conta

DECISAO_CONFIRMADA: antes da escolha de laboratório, retirar o acesso Áreas sem contexto e oferecer acesso geral à conta (rótulo Conta, Perfil ou Configurações da conta pode ser resolvido na implementação). Alterar senha e Excluir conta ficam dentro desse acesso, sem botões diretamente expostos no cabeçalho.

Preservar identificação/nome, avatar, texto de contexto e Sair no cabeçalho desktop. No laboratório, concentrar Resumo, Áreas, Mapa e Membros na lateral; remover o conjunto superior duplicado. Manter retorno à seleção de laboratório e acesso à conta coerentes com o contexto. No mobile, a navegação interna é inferior e contextual (UI-05), sem acesso a áreas de laboratório não escolhido.

A mudança de apresentação preserva as rotas e verificações reais de conta, exclusão, senha e logout. Não criar uma nova política de permissões ou selecionar laboratório automaticamente.

## UI-02 — Área como acesso às coletas e ao IHFR

FATO_DOCUMENTADO: Pedro relatou que a página da área mostra Registrar coleta, mas não disponibiliza suas coletas existentes; consegue encontrá-las pelo histórico do resumo ou pelo mapa. Os prints são apoio visual, não uma reprodução nova pelo preparador.

DECISAO_CONFIRMADA: a página da área apresenta as coletas existentes com acesso ao detalhe, dados ambientais e diagnóstico de cada uma; mantém Registrar coleta e permite retomar o caminho após sair e voltar à área. A lista é ordenada pela ocorrência em campo, da mais recente para a mais antiga. Comparar instantes/offsets corretamente; confirmação no sistema não substitui a ocorrência declarada.

Exibir o último IHFR disponível na área mesmo quando vem de uma coleta anterior à mais recente. Identificar explicitamente a coleta de origem e a data da ocorrência. Manter o estado vigente/substituído/revogado conforme os contratos atuais; exibir ausência quando não há diagnóstico disponível, sem inventar zero nem gerar resultado automaticamente.

INFERENCIA operacional a explicitar na spec: para combinar “mais recente” e ocorrência em campo, percorrer as coletas nessa ordem e obter o primeiro diagnóstico disponível/vigente; empates usam critério estável documentado, sem modificar o instante original. Confirmar compatibilidade com os contratos existentes, sem trocar silenciosamente o critério por data de confirmação ou cálculo.

A apresentação pode usar seção/lista, ação de abertura ou popup; a referência possui Coletas confirmadas com Abrir por item. A possibilidade de usar o espaço de Informações da área não obriga misturar metadados e resultados. Priorizar descoberta e acesso à coleta recente, mantendo as anteriores acessíveis.

## UI-03 — Detalhe da coleta

DECISAO_CONFIRMADA: aproximar a composição da referência Lovable, com melhor uso da largura desktop, registro/dados ambientais e IHFR organizados em conjunto, leitura clara do resultado e próxima ação. A disposição da referência usa duas colunas no desktop e deve adaptar-se no mobile.

Preservar ocorrência/offset, confirmação no sistema, imutabilidade, identidade da área/laboratório, dados ambientais, drafts e operações reais. A preferência é por apresentação, sem copiar automaticamente os textos ou resultados simulados da referência.

## UI-04 — IHFR e prioridade das mensagens

DECISAO_CONFIRMADA: as explicações de Limites do diagnóstico experimental podem ficar em Ler mais/conteúdo expansível; Proveniência e contrato também têm apresentação secundária/expansível ou acesso próprio aos detalhes. Preservar uma identificação curta de IHFR experimental junto ao resultado e o conteúdo completo acessível.

Esta decisão de UX substitui apenas a exigência anterior de expor todos os textos técnicos expandidos na tela principal. Permanecem CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO, compreensíveis em linguagem humana e verificáveis no detalhe expandido. Não é mudança científica.

Quando faltar conjunto ambiental confirmado, a mensagem “Não há conjunto de dados ambientais confirmado para esta coleta.” recebe mais destaque que MISSING_ENVIRONMENTAL_DATA e outros códigos técnicos. O caminho para registrar/consultar os dados deve ser evidente. Falta de dados não equivale a score zero.

“Comprovantes e relatórios” foi citado como possibilidade de organização dos detalhes; não autoriza um módulo novo de geração/exportação.

## UI-05 — Mobile contextual

DECISAO_CONFIRMADA: seguir a referência móvel do Lovable. Tornar cabeçalho/contexto mais compactos; substituir o grande conjunto vertical de navegação do laboratório pela barra inferior contextual; trazer conteúdo útil para o início da tela; manter controles e último conteúdo acessíveis com a barra inferior e safe areas.

A navegação representa o laboratório explicitamente selecionado; fora dele, oferece os acessos gerais apropriados. Não duplicar a mesma navegação acima e abaixo nem reintroduzir sobreposição de ações/conteúdo.

## UI-06 — Referência Lovable no FullStack

DECISAO_CONFIRMADA: aproximar composição, hierarquia, navegação, cards, espaçamento e distribuição das informações do FullStack ao frontend indicado por Pedro. Executar o starter de referência e o FullStack, capturar os mesmos recortes/estados/viewport e comparar antes/depois.

Fonte somente leitura: HidroFlorestaStartup/hidroflorestas-frontend-starter, main observada em cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f. O starter usa TanStack; o produto FullStack usa Next.js App Router. Adaptar a apresentação ao produto existente; mocks, personas, scores demonstrativos e roteadores do starter não entram no produto.

As oito capturas fornecidas constam em [referências](referencias-visuais.md). Sua origem é o usuário; não há associação comprovada de cada captura a um SHA, dispositivo físico, zoom ou execução de teste específica.

## UI-07 — Município, UF e CEP opcionais

DECISAO_CONFIRMADA: ao usar localização do dispositivo, escolher ponto no mapa ou digitar coordenadas válidas, tentar preencher município/cidade, UF e CEP. Os três campos são opcionais e podem permanecer sem preenchimento, inclusive parcialmente, se o local não tiver a informação ou a consulta não a identificar.

A indisponibilidade desses dados não bloqueia cadastro com coordenadas válidas. Exibir e permitir conferir/corrigir os valores encontrados. Não adivinhar CEP, cidade ou UF nem exigir placeholder fictício.

RECOMENDACAO técnica: consultar a integração existente ou selecionar uma solução de geocodificação reversa com documentação primária e uso compatível; registrar fonte/limites na spec. Falhas, limites, ausência de CEP e respostas tardias precisam de tratamento previsível. Uma resposta para coordenadas antigas não deve substituir as mais recentes ou uma correção manual posterior.

Se forem necessários DTOs, campos de persistência ou migration, implementá-los de forma mínima e compatível para opcionais, validando migração e usando apenas banco sintético próprio. A decisão não autoriza migration hospedada, chave em código ou contratação de serviço pago.

## Questões futuras — não executar nesta rodada

| ID | Estado | Tema |
| --- | --- | --- |
| REV-01 | EM_AVALIACAO | Revisar a landing pública e decisões de design; nenhuma mudança concreta da landing aprovada neste pacote. |
| REV-02 | EM_AVALIACAO | Estudar apresentação de Dados da observação junto ao cadastro ambiental; não mover campos ou fundir contratos agora. |
| REV-03 | PROPOSTA | Auxílio para estimar porcentagens e exemplos de baixo/médio/alto; não redefinir categorias, valores ou ciência nesta rodada. |

## Autoridade e limites

Este pacote governa os sete ajustes aprovados. Decisões científicas, autenticação real, autorização por laboratório, idempotência, confirmação de dados e limites de operação dos provedores permanecem com seus contratos. Implementação e aceite visual posteriores devem ser registrados separadamente da aprovação deste escopo.
