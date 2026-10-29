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
  setup detectará e preparará `.venv` automaticamente se um
  `requirements.txt` passar a fazer parte do projeto.

Serviços opcionais incluem SMTP/Gmail para e-mails, Cloudinary para imagens de
capa e os navegadores do Playwright para testes E2E. O build também acessa o
Google Fonts e a aplicação pode usar tiles externos de mapa.

## Instalação em um comando

Após clonar o repositório, entre na pasta do projeto e execute:

```bash
npm run setup
```

O comando detecta Windows, Linux ou macOS e executa, em ordem:

1. validação de Node.js, Git e gerenciador de pacotes;
2. cópia idempotente de `.env.example` para `.env`;
3. instalação das dependências com `npm ci`;
4. preparação de Python somente se houver manifesto aplicável;
5. geração do Prisma Client e tratamento protegido das migrations.

Se a detecção automática precisar ser contornada, use um dos comandos
equivalentes:

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

Para conferir o fluxo sem criar arquivos nem instalar pacotes:

```bash
npm run setup -- --dry-run --skip-migrations
```

## Banco de dados e Prisma

`prisma generate` é local e não altera o banco. Já uma migration escreve no
destino configurado: o setup só tenta aplicá-la após validar uma URL PostgreSQL
e receber confirmação interativa. Em automação não interativa, a autorização
precisa ser explícita:

```bash
npm run setup -- --migrate
```

Use essa opção somente em um banco de desenvolvimento revisado. Para apenas
preparar o código sem consultar ou alterar o banco, use:

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
