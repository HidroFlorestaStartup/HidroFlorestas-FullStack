# Checks automatizados das branches de revisão da RC

EVIDENCIA_IMPLEMENTACAO: workflow `.github/workflows/rc-review.yml` e entrypoint
`scripts/rc-review-validation.ps1`, adicionados em 2026-10-13. Esta automação
valida código; aprovações de estudantes e homologações reais têm registros próprios.

## Escopo e execução

Push dispara somente para os nomes existentes `review/015-environmental-drafts`,
`review/016-area-covers`, `review/cri-audit-20261010`, `release/cri-rc-20261010` e
`review/cri-rc-validation-20261012`. O job também recusa outros nomes no dispatch.
Não há evento para main/development nem comandos de deploy no workflow.
As cinco entradas correspondentes em vercel.json permanecem false.

Runner Windows, Node24.19.0, lockfile/npm ci, Prisma generate e Chromium.
Actions oficiais pinadas por SHA e token contents:read; checkout não conserva
credencial Git. Nenhum secret de aplicação/provedor é solicitado. Segredos de
contas/mail são gerados sinteticamente, SMTP fica ausente e os cenários de
provedores usam os fakes já existentes.

CI instala o binário PostgreSQL17.10.0-beta.17 pinado, com lifecycle scripts
desabilitados e preparação explícita do pacote nativo revisado. A instalação
recusa diretório existente e prepara ACL privada somente no diretório recém-criado.
Os guards existentes de ACL/ownership/path/loopback permanecem ativos. Databases
de regressão, desenvolvimento local e referência vazia pertencem ao próprio runner;
RegressionSetup nunca recebe destino hospedado. Stop preserva dados locais.

Gates sequenciais: RegressionSetup, Unit, Integration, Migration, Contract, R1,
Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit.
Exclusão de conta e IHFR usam seus CLIs próprios; R1 é subconjunto já contado.
Qualquer falha interrompe a sequência, sem presumir resultado dos gates seguintes.
Logs e results.jsonl redigidos são artefatos por14 dias; nenhum dotenv, credential,
cookie ou chave privada integra o upload. Snapshot funcional acompanha cada gate.

## Reproduzir localmente e interpretar resultados

Usar Node24 e dependências do lockfile, gerar Prisma e instalar Chromium.
Conda não é necessário para npm/npx. Em Windows, com o cluster sintético próprio
já provisionado pelo harness atual, executar:

```powershell
./scripts/accounts-local-postgresql.ps1 -Action Status
./scripts/rc-review-validation.ps1
```

`-InitializeCiCluster` é exclusivo de Actions/Windows em diretório fresco.
Não adaptar o guard para bancos/provedores reais. Resultados local e CI têm
ambientes/fingerprints distintos; conferir SHA, comando, UTC e conclusão da run.
Um job em andamento, ausente ou interrompido não é PASS. Falhas históricas ficam
registradas mesmo após correção ou repetição válida. Mudança documental também
dispara checks para que o head publicado tenha seu próprio resultado.

A primeira run38452226442 falhou na ACL inicial antes dos gates. O commitbc3a751
prepara explicitamente os dois principals privados no diretório novo; a recusa
do guard não foi relaxada. A consulta administrativa Actions retornou403 com a
conta local write, porém o push iniciou runs reais sem mudar settings.
RECOMENDACAO: mantenedores podem avaliar checks obrigatórios após revisão;
nenhuma configuração de proteção das branches principais foi alterada.

Artefatos/detalhes cumulativos e conclusão atual ficam na documentação de
`docs/releases/2026-10-10-cri-rc/` na branch de release e no GitHub Actions do SHA.
CI não fecha GateB012, aceite humano013, Cloudinary real, operadores, backup/ensaio
nem validação científica. IHFR continua CONTRATO_EXPERIMENTAL,
VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Adendo — reprodução NAV4 e branch HF-INV — 2026-10-23

`EVIDENCIA_IMPLEMENTACAO`: a candidata
`fix/investigacoes-intermitentes-20261023-local01` acrescenta somente seu nome
ao push/if do workflow e uma regra de deployment Git false. As23regras Vercel
anteriores, development:false e quinze gates/guards permanecem. O texto anterior
registra a configuração histórica; não é uma lista exaustiva dos filtros atuais.

NAV4 deve usar o contexto de contas existente: PostgreSQL próprio55427,
HTTP127.0.0.1:3001 e ingresso local explícito preparado pelo wrapper oficial
`rc-review-validation.ps1`. O fallback de um Next em outro contexto pode
normalizar a origem para localhost; a sonda autenticada demonstrou403 em127 e
200 emlocalhost, no mesmo servidor. Não ampliar CSRF para acomodar esse setup.
Os quatro cenários originais passaram no contexto oficial, sem alterar90s/5s,
assertions ou retries0. A conclusão atual não reatribui códigos aos FAILs Linux.

Os [comandos e pré-requisitos reais da investigação](../releases/2026-10-23-hf-inv-local01/nav4/readme.md)
e o [wrapper focal](../../scripts/hf-inv-nav4-local.ps1) preservam marker, raiz
privada e allowlist de processo. Esse wrapper exige `-Phase` e um runtime de
missão já preparado; não é autorização para reutilizar banco, env ou credencial
preexistente. Portas ocupadas exigem identificar owner e coordenar encerramento;
nesta execução o usuário autorizou explicitamente parar o PostgreSQL local
anterior, que foi encerrado ordenadamente, com arquivos preservados.

Os [limites de ambiente/protocolos](../releases/2026-10-23-hf-inv-local01/environment-and-protocols.md)
distinguem Windows atual de Linux histórico, os erros de token OS/Git do produto,
e os recursos serializados. `-InitializeCiCluster` segue exclusivo de Actions;
nenhum guard foi alterado. O estado oficial do HEAD final é o recibo posterior
da PR, sem herdar os quinze PASS da missão anterior.
