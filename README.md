# HidroFlorestas Fullstack

## Release Candidate para revisão dos estudantes — 2026-10-10

Consulte o [pacote de entrega CRI](docs/releases/2026-10-10-cri-rc/readme.md) para
PRs encadeados, release notes, configuração, atualização da aplicação existente,
migrations, backup, recuperação e checklist. Estado: **APTO COM RESSALVAS** para
revisão; homologação e produção permanecem pendentes. Para atualizar um banco
hospedado existente, siga o runbook da RC antes dos comandos genéricos de
desenvolvimento abaixo.

O HidroFlorestas é uma aplicação web fullstack para cadastro de áreas, coletas,
medições ambientais e acompanhamento de diagnósticos florestais. O projeto usa
Next.js com TypeScript, React, Prisma e PostgreSQL, reunindo interface, API e
persistência em um único repositório.

## IHFR experimental

A versão v0.1 do IHFR permanece um `CONTRATO_EXPERIMENTAL`, com
`VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`. O setup local e as
validações técnicas não alteram esse estado. Consulte o
[ADR-0001](docs/governance/ADR-0001-contrato-experimental-ihfr-v0-1.md).

## Pré-requisitos

- Git.
- Node.js `24.19.0` ou outra versão `>=24.19.0 <25`, conforme
  [`.node-version`](.node-version).
- npm, distribuído com o Node.js. O repositório usa `package-lock.json` e
  instalação reproduzível com `npm ci`.
- Um PostgreSQL de desenvolvimento autorizado, local ou Neon, para usar as
  funcionalidades persistentes e aplicar migrations.
- Python 3 não é necessário no estado atual: não existe manifesto Python. O
  setup só prepara `.venv` para um `requirements.txt` futuro com consentimento
  explícito `--allow-scripts`; ambientes incompletos são preservados para revisão.

Serviços opcionais incluem SMTP/Gmail para e-mails, Cloudinary para imagens de
capa e os navegadores do Playwright para testes E2E. O build também acessa o
Google Fonts e a aplicação pode usar tiles externos de mapa.

### Corrigindo a versão do Node.js

Se o preflight encontrar uma versão incompatível, ele interromperá o setup e
orientará a atualização manual. Como opção, use o
[`fnm`](https://github.com/Schniz/fnm) para instalar e selecionar a versão
registrada em `.node-version`, sem substituir globalmente outros projetos.

No Linux com Bash:

```bash
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm use --install-if-missing 24.19.0
npm run setup
```

Se o shell for Zsh, carregue `~/.zshrc` no lugar de `~/.bashrc`. No macOS com
Zsh e Homebrew:

```bash
brew install fnm
eval "$(fnm env --use-on-cd --shell zsh)"
fnm use --install-if-missing 24.19.0
npm run setup
```

No Windows, execute no PowerShell:

```powershell
winget install Schniz.fnm
```

Feche e abra o PowerShell após a instalação e execute:

```powershell
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
fnm use --install-if-missing 24.19.0
npm run setup
```

## Instalação em um comando

Após clonar o repositório, entre na pasta do projeto e execute:

```bash
npm run setup
```

O comando detecta Windows, Linux ou macOS e executa, em ordem:

1. validação de Node.js, Git e gerenciador de pacotes;
2. cópia idempotente de `.env.example` para `.env`;
3. instalação das dependências com `npm ci --ignore-scripts` por padrão;
4. preparação de Python somente se houver manifesto aplicável e consentimento;
5. geração local do Prisma Client somente com `--allow-scripts`; migrations
   permanecem desabilitadas sem autorização e verificação explícitas do destino.

O modo padrão é intencionalmente seguro e **parcial**: extrai pacotes sem executar
scripts de terceiros. Para preparar **todas as dependências locais**, incluindo
binários nativos e Prisma Client, há um único comando de consentimento explícito:

```bash
npm run setup:full
```

Esse comando executa os lifecycle scripts das dependências, gera o Prisma Client
e comprova operações reais de bcrypt, better-sqlite3 (SQLite em memória), Sharp
e esbuild; se qualquer componente falhar, encerra com erro em vez de declarar a
aplicação pronta. **Não aplica migrations**, não configura o PostgreSQL remoto,
não cria segredos nem inicia a aplicação. Para essas etapas, revise o `.env` e
siga os procedimentos de banco e serviços externos separadamente.

**Segurança:** lifecycle scripts podem executar terceiros, baixar binários ou
compilar com privilégios do usuário atual. Execute `setup:full` somente após
revisar essa autorização, de preferência inicialmente em máquina descartável e
nunca como administrador. O setup não instala ferramentas globais, altera
PATH/perfis nem solicita reinicialização. Em caso de falha, preserve evidências
e não tente rebuilds globais ou repetidos automaticamente.

Para uma instalação já existente, a verificação isolada de runtime pode ser
solicitada com `node setup.js --skip-install --skip-migrations --allow-scripts --verify-runtime`;
essa operação ainda gera o Prisma Client, mas não reinstala nem conserta
automaticamente binários ausentes.

No Windows, o npm é executado pela CLI JavaScript da instalação do Node ativo,
sem interpretar `npm.cmd` por um shell. Lockfiles de outros gerenciadores são
recusados com orientação explícita, em vez de executar wrappers não verificados.
Consulte o [guia de recuperação Windows](docs/operations/setup-windows-recovery.md)
antes de retomar uma instalação interrompida ou investigar uma reinicialização.

Os comandos equivalentes abaixo verificam a plataforma real; uma seleção
incompatível é aceita apenas para visualizar um plano com `--dry-run`:

```bash
npm run setup:windows
npm run setup:linux
npm run setup:mac
```

O setup nunca sobrescreve um `.env` existente e não exibe valores sensíveis.
Após a primeira execução, preencha no mínimo `DATABASE_URL` e `JWT_SECRET` no
`.env`. Revise também `ROOT_PASSWORD`, `APP_PUBLIC_URL` e, conforme o fluxo que
será usado, as configurações de contas, e-mail, mapa e imagens. O Cloudinary
permanece desabilitado por padrão com `CLOUDINARY_IMAGE_ENABLED=0`.

Para conferir o plano sem criar arquivos, executar subprocessos ou conectar ao banco:

```bash
node setup.js --dry-run --skip-migrations
```

## Banco de dados e Prisma

`prisma generate` executa código local e exige `--allow-scripts`; não aplica
migrations. O setup não consulta o banco por padrão. Aplicar migrations existentes
exige `--migrate` e confirmação explícita do destino por `--database-target`,
além do consentimento para código local. O instalador aceita apenas PostgreSQL
em loopback, sem parâmetros de URL que alterem o destino. Exemplo **somente para
um banco local descartável, previamente revisado e autorizado**:

```bash
npm run setup -- --allow-scripts --migrate --database-target=localhost:5432/hidro_dev
```

O valor deve corresponder à URL efetiva, inclusive ambiente herdado. Loopback não
prova que um banco seja de desenvolvimento. O setup usa `migrate deploy` para
migrations existentes e não oferece reset nem cria novas migrations. Bancos
remotos seguem o runbook próprio; não são migrados por este instalador.
Para preparar pacotes sem consultar ou alterar o banco, use:

```bash
npm run setup -- --skip-migrations
```

Um banco **totalmente vazio** exige primeiro o
[procedimento formal de baseline](prisma/bootstrap/initial-database-bootstrap.md).
A primeira migration pressupõe a tabela legada `LaboratoryRoom`; portanto, não
execute `prisma migrate deploy` diretamente em um banco vazio. Em bancos
hospedados existentes, siga o runbook da Release Candidate e confirme destino,
backup e histórico antes de qualquer escrita.

## Desenvolvimento

Com o ambiente preenchido e o banco preparado, inicie a aplicação:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). Os principais comandos
de qualidade são:

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
```

## Stack tecnológica

- Next.js 16.3.8 com App Router, React 19.2.4 e TypeScript 5.
- Prisma 7.4.2 com PostgreSQL, Neon e adapter `pg`.
- Tailwind CSS 4, Leaflet/React Leaflet e Lucide React.
- Cloudinary e Sharp para o fluxo opcional de imagens.
- Nodemailer/SMTP, bcrypt e JSON Web Token para comunicação e autenticação.
- ESLint, test runner do Node.js, `tsx` e Playwright para qualidade.

Os exemplos especializados [`.env.accounts.example`](.env.accounts.example),
[`.env.mail.example`](.env.mail.example) e
[`.env.images.example`](.env.images.example) documentam cenários isolados. Para
o setup geral, use [`.env.example`](.env.example) e mantenha todos os segredos
somente em configuração privada.
