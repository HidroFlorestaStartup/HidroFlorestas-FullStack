# Execução autorizada — ajustes após testes manuais

Implemente todos os ajustes UI-01–UI-07 aprovados por Pedro no HidroFlorestas FullStack. Comece por este arquivo na branch docs/handoff-ajustes-interface-20261030; o pacote pode ser lido antes do merge documental.

## Autorização

DECISAO_CONFIRMADA: Pedro forneceu anotações e oito prints, respondeu às cinco dúvidas de produto/UX e confirmou “Okay, Concordo!” após a consolidação. As respostas e o escopo estão em [decisões](decisoes-e-escopo.md).

Estão autorizados implementar, validar, fazer commits, push e abrir/atualizar todos os PRs necessários para development, sem confirmação adicional de rotina. Execute todos os recortes; não pare no primeiro PR e não espere merge do mantenedor para partes independentes. Merges e aceite humano final ficam com o mantenedor.

As decisões de produto já respondidas não devem ser reabertas por falta de confirmação em um arquivo histórico. Conflitos materiais não cobertos exigem registro e pausa apenas da parte afetada. Escolhas técnicas compatíveis com o escopo são resolvidas e justificadas pelo executor.

## Começo da execução

Leia AGENTS.md aplicáveis, PROJECT_CONTEXT.md, TECH_DECISIONS.md, PLANS.md, constituição e skills speckit-* realmente instaladas, políticas de autoridade e o PRD Code-First pertinente. Use PLAN → EXECUTE → REVIEW e specs/<próxima-numeração-livre>-<feature>/ conforme o fluxo do repositório. Não criar TASKS.md global.

Confira origin/conta, branches/upstreams, worktrees, alterações rastreadas/não rastreadas e divergências; faça fetch/FF seguro e use worktree isolada quando necessário. Preserve todos os trabalhos e branches, inclusive os PRs de setup #42/#43 e a demonstração #41. Não absorva mudanças de outras branches por conveniência.

Base observada neste handoff: development 9b8595d232842d401ce81bbc92c54dd543aa2829. Na implementação, use a development então conferida; mantenha os fatos datados como histórico, sem repetir integrações antigas. A branch documental é fonte das instruções, não uma obrigação de usar código desatualizado.

Leia integralmente [decisões/escopo](decisoes-e-escopo.md), [referências](referencias-visuais.md) e [critérios](criterios-de-aceite.md). O [plano](plano-de-execucao.md) explica dependências e a divisão recomendada.

## Escopo a concluir

- UI-01: fora do laboratório, remover Áreas sem contexto e oferecer acesso à conta; senha/exclusão dentro desse acesso; nome/avatar/contexto e Sair no cabeçalho desktop. Dentro do laboratório, navegação Resumo/Áreas/Mapa/Membros na lateral, retirando duplicação superior.
- UI-02: abrir uma área deve revelar suas coletas, ordenadas por ocorrência em campo, com acesso a detalhe, ambientais e IHFR; permitir retomada após sair/voltar. Mostrar o último IHFR disponível, mesmo de coleta anterior à mais recente, identificando origem/data; sem cálculo automático.
- UI-03: detalhe da coleta com composição próxima à referência e melhor uso da largura, preservando todos os registros/ações reais.
- UI-04: identificação experimental curta e mensagem humana/ação em prioridade; Limites do diagnóstico e Proveniência/contrato em detalhes expansíveis acessíveis. Preservar os quatro qualificadores completos e a proveniência; código técnico secundário.
- UI-05: mobile com barra inferior contextual e cabeçalho/contexto compactos, sem grande menu vertical duplicado ou sobreposição.
- UI-06: executar e comparar o starter Lovable e o FullStack em telas/estados equivalentes, adaptando apresentação de verdade. Não se limitar a uma descrição de inspeção estática.
- UI-07: tentar município/cidade, UF e CEP ao usar geolocalização, clicar no mapa ou digitar coordenadas. Todos opcionais; ausência, falha, resposta parcial ou ponto sem CEP não bloqueiam cadastro com coordenadas válidas. Se houver alteração necessária de DTO/persistência/migration, implementá-la minimamente e validar em banco sintético próprio.

## Referência visual e arquitetura

Fonte somente leitura: https://github.com/HidroFlorestaStartup/hidroflorestas-frontend-starter, main observada cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f. Registre o SHA efetivamente executado e qualquer diferença. Abra também os oito PNGs locais do [guia visual](referencias-visuais.md); eles são capturas fornecidas pelo usuário, não testes do head atual.

O starter é TanStack Start/Router/Query; o produto é Next.js App Router. Adaptar composição/estilos para componentes reais, next/link e next/navigation; não migrar framework nem transportar mocks/personas, autenticação falsa, resultados simulados ou cálculos do starter ao FullStack.

Use runtime/lockfile conferidos na base vigente, scripts oficiais e guias pertinentes em node_modules/next/dist/docs antes de escrever código. Preserve marca/Poppins e dados reais. Alterações no shell/estilos/componentes compartilhados necessárias à navegação estão no escopo, com regressão dos consumidores; não fazer reformulação global sem relação com estes sete ajustes.

Caminhos iniciais para investigação, a confirmar na árvore vigente: src/components/shell/application-shell.tsx, src/components/shell/laboratory-navigation.tsx, src/components/workspace/, src/components/laboratories/, src/app/(private)/workspace/, src/app/(private)/dashboard/laboratories/, src/components/areas/, src/components/collections/, src/components/environmental-data/ e src/components/ihfr-diagnosis/. Consulte specs/019–028 e as specs de domínio 003, 005, 006, 008, 012/013, 015/016 aplicáveis. Esses apontadores não substituem conferir nomes e contratos existentes.

## Organização recomendada das entregas

RECOMENDACAO: A — navegação/conta/mobile; B — área/coletas/IHFR; C — endereço opcional. Uma spec/branch por funcionalidade, com PRs pequenos. Nomes possíveis: feat/ajustes-navegacao-conta, feat/ajustes-area-coletas-ihfr e feat/localizacao-endereco-opcional.

A/B podem depender do shell; C pode ser independente. Declare empilhamento quando necessário e deixe claro o diff de cada PR e a ordem de integração. Complete as três entregas autorizadas sem esperar merges de partes independentes.

Antes de publicar cada branch funcional, prepare a guarda Preview false e o acionamento do CI oficial para o nome real da branch, conforme [critérios](criterios-de-aceite.md). Isso protege os provedores e conserva os gates; não autoriza deployment manual.

## Preservação de contratos

Conservar autenticação real, autorização por laboratório/área/coleta, isolamento entre laboratórios, cookies e validação de origem. Não fazer login funcionar por remoção de CSRF, troca de papel ou desvio de sessão.

Conservar dados ambientais confirmados e imutáveis, drafts pessoais, save explícito, revisão/OCC/idempotência e comportamento incerto. Não copiar metadados entre coleta, confirmação e observação: reorganizar Dados da observação é REV-02, futuro.

Não alterar fórmula, pesos, classes, manifesto, versões/hashes ou estado científico. Preservar CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO. As explicações completas podem estar no detalhe expansível aprovado, com identificação experimental curta junto ao resultado. Não iniciar diagnóstico automaticamente para preencher o resumo da área.

A geocodificação deve falhar de forma não bloqueante e conservar os opcionais em toda a cadeia; escolha/justifique tecnicamente o provedor e suas condições com documentação primária. Sem contratar serviço pago ou registrar chaves. Não misturar município, UF e CEP com critérios de cálculo IHFR.

## Fora do escopo

REV-01 landing pública; REV-02 fusão/movimentação de Dados da observação; REV-03 auxílio a estimativas de medições. Não criar módulo de relatórios/exportação por causa da menção a detalhes técnicos.

Não refazer investigações históricas gerais, auditar todo o projeto ou alterar ciência sem defeito concreto do recorte. Deploy/promoção Production, operação de banco hospedado, SMTP/scheduler/Cloudinary, mudança de proteção, main e merge continuam fora desta execução. Ambientes de teste devem ser sintéticos próprios, com guards oficiais; nunca reutilizar credenciais ou link temporário da demonstração por inferência.

## Validação e fechamento

Execute os [critérios](criterios-de-aceite.md), testes pertinentes e checks oficiais do head final. Use mocks controlados apenas nos testes de provedor indisponível, não como comportamento do produto. Compare execução visual dos dois projetos em desktop/mobile e 200% de texto; teclado/foco, Back/Forward, reload, contexto e último controle alcançável.

É legítimo atualizar expectativas de apresentação para a UX aprovada, verificando resultado/mensagem e abrindo os detalhes quando necessário. Não enfraquecer autorização, contratos, assertions ou timeouts para produzir PASS. Se mudar schema/DTO, validar compatibilidade e migrations no runner oficial sintético.

Em cada PR, informe UI IDs cobertos, base/head, spec, arquivos alterados, dependências/ordem, comandos/resultados por SHA/run/tentativa, capturas reais e limites. Diferencie teste atual, captura do usuário e evidência histórica. Não alegar aceite humano, dispositivo físico, acessibilidade integral, homologação ou revisão de terceiro não realizadas.

Publique todos os PRs necessários e entregue seus links/SHAs, checks e ressalvas ao mantenedor, deixando-os abertos para decisão de merge.
