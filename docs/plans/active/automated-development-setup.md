# Plano: setup automatizado de desenvolvimento

## Identificação e estado

- **Identificador:** `SETUP-AUTOMATIZADO-001`
- **Estado atual:** `AGUARDANDO_REVISAO`
- **Responsável pela execução:** Codex, por solicitação do usuário em 2026-10-29
- **Objetivo:** reconstruir o setup de um novo desenvolvedor sobre a versão atual da `development`, com um único comando e limites explícitos para operações de banco.
- **Resultado esperado:** `setup.js` multiplataforma em Node.js puro, scripts npm correspondentes, exemplo seguro de ambiente e README atualizado.

## Escopo

- Auditar stack, manifestos, serviços externos e variáveis observáveis em `origin/development`.
- Criar `.env.example` sem segredos, consolidando as configurações locais documentadas nos exemplos especializados.
- Automatizar validação do ambiente, instalação, geração do Prisma Client e tratamento seguro de migrations.
- Integrar comandos multiplataforma no `package.json` e atualizar introdução e instalação do `README.md`.
- Validar sintaxe, comportamento seguro, documentação, testes pertinentes, diff e escopo.

## Fora de escopo

- Provisionar PostgreSQL/Neon, SMTP, Cloudinary, dados ou credenciais.
- Aplicar migrations em banco real durante esta entrega.
- Alterar regras científicas, schema, migrations ou código funcional da aplicação.
- Fazer commit, push, PR, merge ou deploy.

## Fontes, autoridade e classificação

- Solicitações do usuário de 2026-10-29: autoridade do escopo e da mudança de base para `development`.
- `AGENTS.md`, `PLANS.md`, `PROJECT_CONTEXT.md` e `TECH_DECISIONS.md`: instruções e contexto canônicos do repositório.
- `package.json`, `package-lock.json`, `.node-version`, exemplos de ambiente, Prisma, scripts e código rastreado: `EVIDENCIA_IMPLEMENTACAO` da stack observada.
- Documentação do Next.js 16.3.8 instalada em `node_modules/next/dist/docs/`: referência técnica compatível com a dependência atual.
- Orientações operacionais novas são `RECOMENDACAO`; a automação não constitui aprovação científica, homologação, deploy ou autorização para banco remoto.

## Estado inicial e preservação

- `origin/development` no commit `9b8595d232842d401ce81bbc92c54dd543aa2829`; o novo `feature/automated-setup` parte exatamente desse commit.
- A primeira implementação, baseada na `main` atrasada, foi preservada na branch `feature/automated-setup-main-backup` e no stash identificado como `codex backup setup based on main before development rebuild`.
- O worktree estava limpo antes da reconstrução.
- Arquivos previstos: `setup.js`, `.env.example`, `.gitignore`, `package.json`, `README.md` e este plano.
- `docs/raw/**` permanece imutável.

## Dependências, riscos e decisões

- O projeto usa PostgreSQL e uma baseline especial para bancos vazios; `prisma migrate dev` não pode ser executado indiscriminadamente.
- O setup sempre pode gerar o Prisma Client, mas só consulta ou migra um banco após configuração válida e autorização explícita.
- `package-lock.json` torna npm e `npm ci` o fluxo reproduzível desta base.
- Não existe manifesto Python da aplicação; nenhum `venv` deve ser criado no estado atual. O script continuará preparado para `requirements.txt` futuro.
- Cloudinary é opcional e desabilitado por padrão; segredos nunca devem receber prefixo `NEXT_PUBLIC_`.
- A seção de Release Candidate e seus limites de homologação/produção devem ser preservados no README.

## Resultado da auditoria técnica

- **Runtime e linguagens:** Node.js `>=24.19.0 <25`, npm, TypeScript, JavaScript/Node.js e CSS; nenhum manifesto Python da aplicação.
- **Aplicação:** Next.js 16.3.8 com App Router, React/React DOM 19.2.4, Tailwind CSS 4, Leaflet/React Leaflet e Lucide React.
- **Dados:** Prisma/Prisma Client 7.4.2, PostgreSQL, adapters Neon/pg e uma cadeia de 14 migrations rastreadas.
- **Imagens:** Cloudinary 2.11.0 opcional e Sharp 0.35.5 para processamento/normalização, com upload desabilitado por padrão.
- **Segurança e comunicação:** bcrypt, JSON Web Token, Nodemailer/SMTP, keyrings criptográficos e worker de e-mail.
- **Qualidade:** ESLint 9, TypeScript 5, test runner do Node.js, `tsx` e Playwright.
- **Serviços e ferramentas externas:** Git, PostgreSQL/Neon; opcionalmente SMTP Gmail e Cloudinary; Vercel; Google Fonts no build; tiles de mapa; navegadores Playwright nos testes E2E.
- **Banco:** uma instalação totalmente vazia exige o procedimento de baseline em `prisma/bootstrap/initial-database-bootstrap.md`; o setup não automatiza essa etapa.
- **IHFR:** permanece `CONTRATO_EXPERIMENTAL`, com `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Etapas e critérios de conclusão

1. **Auditoria:** mapear a base atual e identificar incompatibilidades do setup criado sobre `main`.
2. **Ambiente:** criar `.env.example` seguro e cópia idempotente para `.env`.
3. **Automação:** implementar logs, validações, detecção de SO/gerenciador, instalação, Python condicional e Prisma seguro.
4. **Integração:** adicionar scripts npm automático e específicos por plataforma.
5. **Documentação:** preservar o RC e documentar o fluxo de um comando, pré-requisitos e limites operacionais.
6. **Validação:** executar checagens pertinentes e inspecionar o diff final.

## Pontos de parada para revisão humana

- Nenhuma migration será aplicada sem URL e banco de desenvolvimento explicitamente autorizados.
- A entrega ficará disponível para revisão antes de commit ou publicação.

## Histórico

| Data | Estado | Registro |
|---|---|---|
| 2026-10-29 | `EM_ANDAMENTO` | Auditoria refeita sobre `origin/development`; implementação anterior da `main` considerada incompatível em cobertura e preservada como backup. |
| 2026-10-29 | `AGUARDANDO_REVISAO` | Setup, ambiente, integração npm e README reconstruídos e validados sobre a `development`, sem migration, deploy ou publicação. |

## Validações e evidências finais

- `node --check setup.js` e `node setup.js --help`: PASS.
- `npm run setup -- --dry-run --skip-migrations`: PASS; detectou Linux/npm, simulou `npm ci` e `prisma generate`, sem criar `.env` ou conectar a banco.
- Simulações explícitas `--platform=windows` e `--platform=mac`: PASS; o caminho Linux foi exercitado pela detecção automática.
- Execução sem `--dry-run` sob Node 22.23.3: recusa esperada com código 1 antes de alterar arquivos, pois a base exige Node 24.19.0.
- `npm run lint -- setup.js`: PASS, sem avisos.
- `npm run lint`: PASS com zero erros e dois avisos preexistentes em `src/components/user-profile/index.tsx` e `src/components/white-box/index.tsx`.
- `npm exec -- next typegen`: PASS.
- O primeiro `npm run typecheck` identificou o Prisma Client obsoleto da branch anterior. Após `npm exec -- prisma generate`, executado sem conexão ou escrita no banco, o typecheck passou.
- `npm run test:unit`: PASS fora da restrição de subprocessos do sandbox, com 402 testes gerais e 17 testes de e-mail aprovados. A primeira execução restrita teve cinco falhas ambientais em arquivos que criam subprocessos; a repetição autorizada eliminou todas.
- Links locais do README, scripts obrigatórios do `package.json`, ausência de `.env`/`.venv`, whitespace e `git diff --check`: PASS.
- Não executados: `npm ci` real, migrations, testes de integração/E2E e build. Justificativas: o runtime disponível é Node 22; migrations exigem banco explicitamente autorizado; o escopo não alterou os fluxos funcionais; o build ainda depende de rede para Google Fonts.
- Nenhum commit, push, PR, merge, deploy ou escrita em banco foi realizado.
