# Plano — demonstração HidroFlorestas em 26/10/2026

Estado: EM_ANDAMENTO. Fonte de autoridade: pedido de Pedro nesta conversa para análise/merge e deploy na Vercel para a reunião de hoje. Alcance: demonstração isolada com dados sintéticos; não promoção Production ou homologação integral do piloto.

Base confirmada: development 9b8595d232842d401ce81bbc92c54dd543aa2829, árvore e74ac641564288df01c85226ddc1ed6a8d22b941, idêntica à candidata a713de28d43caa9578de87224a38389097a2aa45. Main beba96f preservada. Sem PR aberto. Logs oficiais40209919090:15gates PASS, E2E220, HTTPS2 e IHFR6; Codex final sem achados. Não repetir investigação geral concluída.

Etapas: confirmar provedores e destino; obter banco novo ou branch sem dados reais; provar identidade/isolamento e preparar recuperação delimitada; executar bootstrap/migrations versionados no destino sintético; configurar somente Preview/branch própria com chaves independentes e capas desligadas como proposta temporária da demonstração; publicar o SHA validado; preparar conta sintética e roteiro, testar login e fluxo lab/área/coleta/dados/IHFR/mapa; entregar URL real com limites e recibo. Não reutilizar banco/segredos Production, scheduler histórico, bypass de autenticação ou dados reais.

Autoridade/operador de aceite humano e científico não designados; não inferir aprovações. A configuração de SMTP/recebimento/scheduler exige caixa e acesso privados próprios; poderá permanecer fora do recorte demonstrado. Contas sintéticas pré-provisionadas devem ser identificadas como tais, sem alegar verificação de inbox real. Nenhum código ou guard alterado para contornar segurança. Escopo da infraestrutura e dados será confirmado por IDs retornados, mantidos no recibo sem segredos.

Estado inicial dos provedores: FullStack Vercelprj_DiLVjku1AglHtTXv8ckxg8pBiZR3/team_YqedIK09zOGFeZ8M84kra0oM, proteçãoSSO ativa, última Production1ea3cc2 e Previewfuncional5f6266b;11entradas/5nomes de env. Neon tem projetoslate-poetry-24969502 e lingering-dream-37087260; nenhum escolhido para escrita. Recomendação: banco novo para não copiar dados existentes. Credenciais só em ambiente privado; não imprimir nem publicar.

Validação: readiness não é homologação; conferir SHA/deployment/env, bootstrap/migrations/checksums, papel/host isolados, smoke autenticado e persistência, visual em viewport pertinente e erros. Preservar falhas e distinção accepted/inbox. Reversão de aplicação não restaura dados; não apagar nada preexistente. Parar somente operação afetada se houver bloqueio material.

Pendências: conexão dos serviços confirmada nesta sessão; execução de provisionamento/deploy e demonstração ainda não realizada neste corte. Rollback do Preview por alias/deployment anterior, sem alterar Production; recursos novos identificados para cleanup posterior autorizado.

IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.


## Pré-flight e bloqueio de aprovação — 26/10/2026

Criado projeto Neon exclusivo `polished-shape-31530954` (hidroflorestas-demo-20261026), PostgreSQL17, regiãoaws-sa-east-1. Branch nova br-aged-sun-b60nqmre. Criados roleaccounts_owner e bancoaccounts_homologation, sem copiar dados dos dois projetos anteriores. Leituras SQL de identidade e vazio não modificam schema/dados.

Sandbox próprio hf-demo-20261026-setup/sbx_TLKyBvvalj0CxMXmDZtX1iOpzxdI criado na equipe/projeto FullStack; checkout público exato9b8595d, npmci e prismagenerate executados. Runtime observado24.22.1; não confundir com24.19.0 da CI oficial. Bootstrap remoto não executado: a aprovação automática rejeitou a tentativa de transmitir a credencial do banco novo ao sandbox e executar scripts/accounts-remote-bootstrap.ts. Razão informada: autorização para demonstração não cobre claramente essa mutação/transmissão. Não contornar por SQL indireto ou outro canal.

Aprovação específica necessária: inicializar somente esse banco vazio com o baseline versionado e as14migrations, provisionar contas/dados sintéticos, usar credenciais independentes em configuração privada no sandbox e no Preview da branchdemo/reuniao-20261026, testar jornada real da demonstração e manterCAPAS_OFF nesse recorte. Não alterarProduction, main ou bancos anteriores. SMTP/inbox/scheduler e homologação completa permanecem separados. Nenhum deploy da versão atual foi solicitado até esse corte.


## Autorização específica e continuação

DECISAO_CONFIRMADA: Pedro respondeu «Okay, autorizo» nesta conversa após a descrição das credenciais e do escopo: baseline/14migrations no banco novo, contas/dados sintéticos, configuração privada no sandbox e Preview, CAPAS_OFF, preservando Production/main/bancos anteriores. A aprovação anterior rejeitada fica no histórico; não foi contornada. Nova operação após autorização usa os mesmos destinos isolados.

Branch própria demo/reuniao-20261026 terá guarda false antes da primeira ref pública; a publicação é manual no Preview, sem alterar35guardas anteriores. Banco exclusivo: polished-shape-31530954/br-aged-sun-b60nqmre/accounts_homologation, papelaccounts_owner. Código de aplicação herdado integralmente da árvore validadae74ac641564288df01c85226ddc1ed6a8d22b941. Verificações posteriores, URLs e resultados reais serão registrados no recibo da entrega, sem antecipar o próprio SHA ou resultados de testes.


## Fechamento da demonstração

PREVIEW DISPONÍVEL COM DADOS SINTÉTICOS. Banco inicializado, conta e jornada preparadas, deployment READY e leituras hospedadas verificadas. O resultado do roteiro histórico que falhou e a conferência independente que passou são distintos. Ver [recibo da demonstração](./recibo-demonstracao-reuniao-20261026.md) e [dados do recibo](./demonstracao-reuniao-20261026.json). Acesso privado e senha não são versionados. CI funcional do fechamento documental: NOT_RUN. Homologação do piloto permanece pendente.
