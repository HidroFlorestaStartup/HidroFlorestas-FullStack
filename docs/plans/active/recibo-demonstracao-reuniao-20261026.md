# Demonstração da reunião — 26/10/2026

Estado: PREVIEW DISPONÍVEL COM DADOS SINTÉTICOS. Recibo emitido em 2026-10-26T19:59:16.434Z. Este recorte não homologa o piloto ou o ambiente Production.

## Autoridade e base técnica

DECISAO_CONFIRMADA: Pedro autorizou nesta conversa o bootstrap/14 migrations apenas no banco novo, contas/dados sintéticos, credenciais independentes em configuração privada no sandbox e no Preview, publicação e testes com CAPAS_OFF. A rejeição automática anterior foi preservada no plano e a execução prosseguiu somente depois dessa autorização específica.

FATO_DOCUMENTADO: PR #40 já integrado em development no commit `9b8595d232842d401ce81bbc92c54dd543aa2829`. Sua árvore `e74ac641564288df01c85226ddc1ed6a8d22b941` coincide com a candidata `a713de28d43caa9578de87224a38389097a2aa45`. O run oficial [40209919090](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/40209919090), tentativa 1, registra 15 gates PASS, incluindo E2E 220; a revisão Codex final não trouxe achados materiais pendentes. Não foi repetida a bateria geral e não havia novo PR aberto para integrar.

## Destinos exclusivos

| Recurso | Identificação |
| --- | --- |
| Preview | https://hidroflorestas-demo-20261026.vercel.app |
| Deployment imutável | `dpl_8YHFKdJLY3N38FFVJKaDSsCrVVEJ`, READY |
| Host imutável | `hidro-florestas-full-stack-gymvf3324-hidrofloresta-8598.vercel.app` |
| SHA publicado | `917593a9b59697a745e08ac5c5cf6b3ab1d4e51f` |
| Branch Git | `demo/reuniao-20261026` |
| Projeto Neon novo | `polished-shape-31530954`, hidroflorestas-demo-20261026 |
| Branch Neon | `br-aged-sun-b60nqmre` |
| Banco/papel | `accounts_homologation` / `accounts_owner` |
| Endpoint | `ep-wispy-mode-b6zrqmhe`, São Paulo, PostgreSQL 17 |
| Checkpoint sintético | `br-proud-truth-b6e9u097`, sem compute, pai `br-aged-sun-b60nqmre` |

EVIDENCIA_IMPLEMENTACAO: o banco apresentou zero relações públicas antes da inicialização. O bootstrap versionado e as 14 migrations foram aplicados; a consulta posterior confirmou 14 registros de migrations e zero falhas. Nenhum dado de banco anterior foi copiado. O checkpoint do banco sintético foi criado; isto não comprova restauração operacional, ACLs, PITR, RPO/RTO ou backup dos ambientes anteriores.

Foram configuradas 15 variáveis específicas de Preview para essa branch, com chaves novas e sem publicar valores. `CLOUDINARY_IMAGE_ENABLED=0`, origem canônica no alias acima, ingresso Vercel e allowlist restrita à conta sintética. SMTP e scheduler não foram configurados. O guard `demo/reuniao-20261026:false` entrou antes do primeiro push, preservando os 35 guards anteriores; o deployment foi solicitado manualmente. A proteção SSO continua ativa. O link temporário de acesso e a senha são entregues em canal privado e não pertencem a este repositório.

## Verificação hospedada

EVIDENCIA_IMPLEMENTACAO: login pela interface e API, sessão autenticada e criação pela interface de laboratório, área, coleta, conjunto ambiental e diagnóstico foram executados no Preview real. Os POSTs responderam 200 para login e 201 para criações. A leitura persistida do diagnóstico confirmou score 0.29, classe MODERATE e componentes esperados. Dados ambientais e diagnóstico permaneceram após reload.

Uma asserção do roteiro histórico `full-ui-flow.spec.ts`, copiado somente para a ferramenta temporária, esperava o texto contíguo `0.29 · MODERATE`. Essa execução terminou FAIL na apresentação, pois o produto atual apresenta score e classe em campos separados. A leitura API/vetor anterior à asserção passou. Não foram alterados testes oficiais, timeout, guard ou produto; não foi atribuído PASS ao roteiro que falhou. A conferência independente, sem repetir criações, exigiu os dois valores visíveis separadamente, os quatro qualificadores científicos, o diagnóstico persistido e ausência de overflow em 390px, e passou.

Na primeira execução houve requests de leitura cancelados durante navegação e uma mensagem de console sem correlação causal capturada. Isso não foi tratado como prova de defeito ou de sua causa. Na conferência independente não houve pageerror ou respostas HTTP >=400 observadas; summary, history, territorial-map e fallback da imagem responderam 200. A consulta dos logs error/fatal desse deployment na janela examinada não retornou grupos.

O mapa móvel exibiu a área sintética e não apresentou overflow ou respostas HTTP >=400 na amostra. Capturas foram produzidas no sandbox em 1440px e 390px; não houve aceite humano de acessibilidade ou auditoria visual exaustiva. A tentativa inicial de abrir Chromium falhou por bibliotecas ausentes na máquina de teste; a instalação das dependências do sandbox permitiu executar o navegador, sem patch no produto.

Identificadores sintéticos e leituras verificadas: [recibo estruturado](./demonstracao-reuniao-20261026.json). Conta pré-provisionada, ativa e marcada verificada para a demonstração; isso não demonstra recebimento de e-mail, verificação de inbox ou SMTP operacional.

## Roteiro da reunião

Abrir o acesso privado, entrar com a conta de demonstração, acessar o laboratório “DEMO 26/10 · Sintético Laboratório”, visitar a área, sua coleta, os dados ambientais, o diagnóstico experimental e o mapa. Todos os registros desse ambiente são sintéticos. O link de compartilhamento tem validade limitada; o alias permanece protegido pela Vercel.

## Preservação e pendências

Development permanece em `9b8595d232842d401ce81bbc92c54dd543aa2829`; main em `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`. A Production anterior `dpl_FEPNkC3Rg52iaBk8hs1TtutPXJoA`, SHA `1ea3cc2552c244e1004f4f733f838e0f9ea62993`, continua READY. Não houve promoção Production, alteração de DNS próprio, alteração dos bancos anteriores, merge, envio de e-mail ou uso do scheduler histórico.

A preparação Git altera somente o guard e documentação. O SHA de fechamento documental posterior ao deployment não recebe o PASS funcional da candidata nem dos testes do deployment: CI funcional nesse fechamento é NOT_RUN. Não foi criada alegação de nova revisão Codex.

Continuam pendentes de homologação operacional: SMTP/recebimento/scheduler; isolamento e recuperação do destino definitivo; decisão definitiva sobre capas; participantes, suporte e aceites humanos. CAPAS_OFF é a opção desta demonstração. Históricos investigativos e limites dos relatórios anteriores permanecem válidos; este smoke não reabre nem declara resolvidas causas históricas.

Não promover este banco ou suas contas sintéticas a Production por inferência. Após a reunião, decidir conservação ou remoção dos recursos novos; não há limpeza destrutiva automática. Reversão do alias não restaura dados.

IHFR: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
