# Plano de preparação e execução — ajustes após testes manuais

Identificador: HF-UI-20261030. Data de referência: 30/10/2026, America/Fortaleza.
Estado do handoff: AGUARDANDO_REVISAO. Escopo de produto: CONFIRMADO.
Implementação dos ajustes: NAO_INICIADO por este pacote.

## Objetivo e origem

Preparar uma entrega documental revisável para que outro desenvolvedor implemente os sete ajustes UI-01–UI-07 aprovados por Pedro Vítor após seus testes manuais. A autorização tem origem nas anotações, nas cinco respostas transcritas em [decisões](decisoes-e-escopo.md) e na concordância final “Okay, Concordo!” nesta conversa. A publicação deste handoff e a execução posterior seguem o fluxo de commits, push e PR para development usado nas entregas anteriores.

DECISAO_CONFIRMADA: implementar o escopo aprovado e validar, commitar, publicar branches e abrir/atualizar os PRs necessários sem confirmação adicional de rotina. Merge e aceite humano final ficam com o mantenedor. REV-01–REV-03 permanecem futuros.

## Estado inicial e preservação

EVIDENCIA_IMPLEMENTACAO da consulta GitHub: development em 9b8595d232842d401ce81bbc92c54dd543aa2829, árvore e74ac641564288df01c85226ddc1ed6a8d22b941. Main e branches existentes não serão modificadas nesta preparação. Starter main em cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f; referência visual, sem autoridade sobre contratos reais.

PRs abertos observados: #41 demo/reuniao-20261026 → development; #42 fix/setup-windows-process-recovery-20261030 → feature/automated-setup; #43 fix/setup-full-runtime-validation-20261030 → branch do #42. Nenhum é integrado, retargeted ou corrigido por este handoff. Não presumir que mudanças de setup já integram development.

A preparação usa diretório próprio e API GitHub; não sincroniza ou modifica os checkouts/worktrees preexistentes da máquina. O executor deve inventariar e preservar o seu próprio ambiente antes de programar.

## Arquivos afetados

Pacote atual: readme, este plano, decisões/escopo, prompt, critérios de aceite, referências visuais, manifesto JSON e oito PNGs fornecidos pelo usuário. Apontadores em PROJECT_CONTEXT.md e docs/governance/DOCUMENT_REGISTER.md. Em vercel.json, somente guarda false para a nova branch documental, antes do primeiro push, para impedir deploy Git automático desta preparação. Os 35 valores existentes permanecem idênticos; não solicitar deployment por comando/API.

Produto, testes, schema, migrations, dependências, workflows, main, development, provedores e bancos hospedados não são alterados nesta preparação. O executor posterior pode modificar as camadas necessárias ao escopo aprovado, com spec e validação próprias.

## Fontes e autoridade

Aplicar AGENTS.md, PLANS.md, constituição e SOURCE_AUTHORITY. Decisões atuais de Pedro governam a UX descrita; código/testes existentes são baseline; screenshots são FATO_DOCUMENTADO fornecido pelo usuário, não prova de um head exato ou de execução do preparador. Novas capturas/testes terão procedência própria.

Os detalhes técnicos de geocodificação, desempate temporal, rotas e organização interna são RECOMENDACAO de engenharia a justificar na spec; não há fornecedor, plano pago ou novo contrato científico aprovado.

## Etapas ordenadas

1. Preparação documental: conferir base, autoridade, decisões, referências e integridade das imagens; produzir pacote e validação documental. Responsável: assistente autorizado por Pedro nesta conversa.
2. Publicação: criar branch documental com guarda de deploy, commits e PR para development, sem merge/autoaprovação; permitir consumo do prompt antes do merge documental.
3. Execução A: navegação/conta/mobile (UI-01, UI-05 e aplicação de UI-06).
4. Execução B: área/coletas/IHFR e composição do detalhe (UI-02–UI-04 e aplicação de UI-06).
5. Execução C: localização e endereço opcional (UI-07).
6. Revisão de cada entrega funcional: specs, comparação visual, regressões pertinentes e checks do head exato; abrir/atualizar todos os PRs e entregar recibo.
7. Aceite e merges: mantenedor, em momento próprio; revisão humana real, sem evento ou aprovação fictícia.

A divisão A/B/C é RECOMENDACAO para PRs pequenos e pode ser ajustada conforme dependências reais, preservando uma spec/branch por funcionalidade. Executar todos os recortes autorizados, sem parar após o primeiro PR nem aguardar merge de recortes independentes.

## Dependências, riscos e limites

A: shell compartilhado exige conferir autenticação, troca de contexto e responsividade dos consumidores.
B: a área precisa expor registros existentes, autorização contextual e IHFR disponível de coleta anterior; não gerar diagnóstico automaticamente, alterar matemática ou misturar drafts com dados confirmados.
C: município/UF/CEP devem continuar opcionais em formulário, DTO, persistência e leitura; ausência ou falha do provedor não bloqueia o registro com coordenadas válidas. Não presumir que todos os pontos têm CEP.

O executor confirma caminhos, contratos e próxima numeração livre do Spec Kit na base então vigente. Reusar os runners atuais; não absorver PRs #42/#43 sem decisão do mantenedor. A documentação antiga é histórica onde conflitar com as decisões aprovadas deste pacote, sem reescrever o histórico.

REV-01 landing, REV-02 Dados da observação e REV-03 auxílio a medições não são implementados nesta rodada. Limites científicos e homologação operacional permanecem independentes. Não reabrir auditorias históricas gerais sem defeito material do recorte atual.

## Pontos de revisão

Não solicitar nova confirmação para decisões já respondidas ou escolhas técnicas rotineiras compatíveis com o escopo. Se surgir conflito material não coberto pela autoridade disponível, registrar fontes e pausar apenas a parte afetada, continuando o trabalho independente. Mudanças científicas, expansão para REV, operações irreversíveis não autorizadas ou destruição de trabalho preexistente dependem de decisão específica.

## Validação e critérios de conclusão

Preparação: escopo/diff, links locais/âncoras, JSON, hashes/tamanhos/blob SHA dos oito PNGs, preservação dos registros históricos e guards anteriores, ausência de credenciais/tokens e conflitos textuais. Sem suíte funcional, build, nova revisão Codex ou aceite visual nesta preparação documental.

Implementação: [critérios de aceite](criterios-de-aceite.md) e runners/checks oficiais aplicáveis ao head final; evidência visual real comparando starter e FullStack, com versões, viewport e limites. Não herdar PASS de outro SHA ou rotular capturas do usuário como teste atual.

## Histórico

- 30/10/2026: anotações e oito prints fornecidos por Pedro.
- 30/10/2026: cinco decisões respondidas e confirmadas, organização atualizada e concordância final registrada.
- 30/10/2026: pacote preparado na base identificada; implementação dos sete ajustes não executada pelo preparador. Publicação e resultado da validação serão identificados no PR e no manifesto, sem inventar o próprio hash.

## Recibo de preparação documental

Validação PASS: 36 novas referências locais, JSON, tamanhos/SHA-256/Git blob SHA dos oito PNGs, whitespace dos dez arquivos textuais, preservação integral dos textos históricos em contexto/registro e dos 35 guards anteriores. O campo de validação no manifesto refere-se somente a este recorte documental. Produto, suítes funcionais, novas capturas em runtime e aceite humano não foram executados nesta preparação. Publicação por commit/branch/PR identificados no GitHub; sem merge.
