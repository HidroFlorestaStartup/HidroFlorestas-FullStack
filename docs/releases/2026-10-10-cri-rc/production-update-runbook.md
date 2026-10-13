# Atualização operacional da aplicação existente

Atualização2026-10-13: consultar [candidato corrigido](rc-readiness-20261013.md).
Consulta autenticada Vercel somente leitura confirmou projeto existente
hidro-florestas-full-stack ligado a HidroFlorestaStartup/HidroFlorestas-FullStack,
produção main, sem deploy hooks/deployments das branches de revisão. Este achado
posterior atualiza somente o vínculo Git; o inventário histórico abaixo continua
exigindo confirmação de domínio/root/Node/banco/cloud/owners/backup/ensaio antes
de qualquer operação. Nenhuma credencial/configuração do provedor foi alterada.

RECOMENDACAO para execução futura pelos estudantes. Nenhum comando de deploy,
migration remota ou modificação de provedor foi executado nesta preparação.
Seguir do início ao fim; uma caixa pendente impede a etapa que dela depende.
Operador de aplicação, operador de banco e aprovador da janela: não especificado.

## 1. Identificar e registrar o destino existente

| Recurso | Evidência disponível | O que confirmar antes de operar |
|---|---|---|
| Repositório de entrega | origin=HidroFlorestaStartup/HidroFlorestas-FullStack, fork; main/development=beba96f | Permissão de merge e repo/branch efetivamente ligado à produção |
| URL declarada da aplicação | GitHub homepage https://hidro-florestas.vercel.app; GET200 nesta preparação | Dono confirma domínio produtivo, alias atual e deployment que atende esse domínio |
| Projeto Vercel relacionado ao baseline | Status histórico em beba96f aponta equipe hidrofloresta-8598/projeto hidro-florestas-full-stack | Settings→Git (repo, branch produção, root), Node, build/install, environment targets, integrações e triggers; status herdado não prova vínculo atual |
| Homologação de contas existente | Projeto hidroflorestas-accounts-homologation, prj_OHzoR4hZ4MOrg2HOBvbZmiADrwaz; sem Git no registro histórico; URL https://hidroflorestas-accounts-homologatio.vercel.app | Reutilização autorizada, estado atual/candidato e isolamento; target chamado production ali é homologação, não domínio produtivo |
| Neon da homologação de contas | Projeto histórico lingering-dream-37087260;12 migrations no checkpoint013 | Identidade atual de branch/database/role/endpoint e separação do banco de produção |
| Neon produtivo | PostgreSQL/PrismaNeon no código; projeto/branch/database reais NAO_ESPECIFICADO | Painel/API: project_id, branch_id, database, role, endpoint direto e pooler, região, histórico e restore window do plano efetivo |
| Cloudinary | SDK/configuração implementados; nenhuma cloud de produção identificada | Conta/cloud existente autorizada, plano/créditos, permissões API, preset e ativos existentes; não criar cloud por suposição |
| Mail/scheduler | Gmail SMTP/outbox implementados; scheduler60s foi verificado historicamente somente na homologação | Produtores/scheduler de produção, destino HTTPS, fonte do bearer, owner, cadência e alertas; não reutilizar destino homologação sem revisão |

Fontes: [API do repositório](https://api.github.com/repos/HidroFlorestaStartup/HidroFlorestas-FullStack),
status histórico em beba96f e [runbook de contas](../../operations/account-homologation-runbook.md).
Credenciais de API Vercel não estavam disponíveis nesta preparação; não houve
inspeção autenticada dos painéis Vercel/Neon/Cloudinary. Logo, não atestar os vínculos
ou recursos atuais só pelos registros históricos. A evidência read-only da homepage
não confirma versão, banco ou saúde de jornadas.

O operador registra privadamente: URL produtiva, IDs acima, repo/branch/root,
SHA/deployment anterior, SHA RC aprovado, fingerprint do endpoint (sem URL secreta),
ambiente alvo, owner e horário UTC. Revisar esse mapa com um segundo estudante.
Sem confirmação, parar ANTES de mudar configuração/migrar/deployar. Reutilizar os
projetos existentes; criação de recurso só se a equipe decidir especificamente.

## 2. Preparar código e ambiente local de revisão

Usar checkout isolado; não importar .env de produção nem apontar testes para ela.
Instalar Node24.19.0 (engines>=24.19.0<25), npm compatível com lockfile, Git e
dependências nativas exigidas por sharp/bcrypt. Geração/build não aplicam migrations.

```powershell
git clone --branch release/cri-rc-20261010 https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack.git hidroflorestas-rc
Set-Location hidroflorestas-rc
git rev-parse HEAD
node --version
npm --version
npm ci
npx --no-install prisma generate
npm run typecheck
npm run lint
npm run build
```

Conferir o SHA contra o PR final. Build requer egress Google Fonts (Poppins).
O novo código é o já auditado; [evidências](../../reports/audits/2026-10-10-cri-local-validation.json)
não dispensam validação do ambiente usado pelo estudante. Não executar fixtures,
seed, create-super-admin, bootstrap ou wrappers locais contra banco remoto.
Para regressão local com PostgreSQL próprio, usar
`scripts/accounts-validation.ps1`, conforme checklist e guards de ownership.

## 3. Conferir variáveis sem alterar as existentes nesta preparação

EVIDENCIA_IMPLEMENTACAO nos módulos accounts/policy+proof, mail/config+crypto e
images/cloudinary. RECOMENDACAO: comparar presença/versão/finalidade no secret
store e Environment Variables do projeto existente, distinguindo Production,
Preview e homologação. Não imprimir/exportar valores para PRs/logs. Alterações
futuras dependem de aprovação do operador; nenhuma rotação é necessária por esta RC.

| Grupo/nomes | Exigência e finalidade |
|---|---|
| DATABASE_URL | PostgreSQL do ambiente confirmado, SSL; runtime usa PrismaNeon. CLI migrations deve receber o endpoint direto confirmado privadamente. prisma.config.ts lê esta mesma variável; DIRECT_URL não está implementada |
| JWT_SECRET | Preservar segredo atual adequado; não usar valores fixos do env.exemple. Rotação invalida sessões e exige plano separado |
| APP_PUBLIC_URL | Origem HTTPS estável do ambiente, sem path/query/fragment/userinfo; gera links mail, nunca Host da requisição |
| SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_REQUIRE_TLS | smtp.gmail.com;465/true/true ou587/false/true; validar combinação, TLS obrigatório |
| SMTP_USER, SMTP_APP_PASSWORD, MAIL_FROM | Conta autorizada e senha de app; MAIL_FROM igual SMTP_USER. Não trocar credencial que já funciona |
| MAIL_PAYLOAD_ENCRYPTION_KEYS, MAIL_PAYLOAD_ACTIVE_KEY_ID | JSON de IDs→chaves32bytes base64, active ID existente; manter chaves históricas enquanto houver payload que delas depende |
| MAIL_IDEMPOTENCY_KEY, MAIL_WORKER_SECRET | Chave32bytes/base64 independente e bearer32–128chars base64url; manter estabilidade e vínculo do scheduler |
| ACCOUNT_PROOF_KEYS, ACCOUNT_PROOF_ACTIVE_KEY_ID, ACCOUNT_REQUEST_KEY | Keyring32bytes/base64 e chave32bytes/base64 independentes; ID ativo existente e chaves antigas necessárias a provas vigentes |
| ACCOUNT_POLICY_ENABLED, ACCOUNT_TRUSTED_INGRESS | 1 e vercel no ambiente Vercel; não usar ingress local em produção; sem policy válida fluxos falham fechados |
| ACCOUNT_TESTER_ALLOWLIST | Opcional: restrição a testers; conferir se o alvo é homologação ou produto aberto. Não copiar automaticamente allowlist privada de homologação |
| ACCOUNT_VERIFICATION_TTL_SECONDS, ACCOUNT_VERIFICATION_ATTEMPTS, ACCOUNT_RESEND_COOLDOWN_SECONDS, ACCOUNT_VERIFICATION_SENDS_PER_HOUR | Defaults900,5,60,5; preservar valores aprovados atuais |
| ACCOUNT_RESET_TTL_SECONDS, ACCOUNT_RESET_REQUESTS_PER_HOUR, ACCOUNT_GLOBAL_REQUESTS_PER_HOUR | Defaults1800,3,100; preservar política atual |
| CLOUDINARY_IMAGE_ENABLED | NOVA em016;0/ausente mantém provedor desabilitado. Só1 após configuração/homologação/operação aprovadas |
| CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET | NOVAS em016; cloud existente confirmada e credenciais privadas server-side. Nunca NEXT_PUBLIC_* |
| CLOUDINARY_COVER_PRESET, CLOUDINARY_COVER_PRESET_SHA256 | NOVAS em016; nome versionado hfr-cover-vN e hash64hex do preset revisado/frozen. Exemplo hfr-cover-v1 é proposta, não preset provisionado |

Referências sem segredos: [.env.accounts.example](../../../.env.accounts.example),
[.env.mail.example](../../../.env.mail.example), [.env.images.example](../../../.env.images.example).
Não definir na produção variáveis dos harnesses: TEST_DATABASE_URL,
TEST_DATABASE_CONFIRMATION, IMP006_*, ACCOUNTS_LOCAL_APP, ACCOUNT_LOCAL_APP_ORIGIN,
PLAYWRIGHT_* ou MAIL_SMOKE_*. ROOT_PASSWORD pertence ao script administrativo;
esta atualização não recria superadmin nem faz seed.

## 4. Fechar os pré-requisitos e ensaiar

1. Revisão dos PRs aprovada; [checklist](review-checklist.md) registra cada gate,
   responsável e evidência. Identificação do destino e autorização da janela completas.
2. Backup verificável/restaurado e migrations ensaiadas em destino isolado autorizado,
   conforme [runbook](migration-runbook.md). Medir locks, compatibilidade e recuperação.
3. Cumprir GateB012 e aceite013 no candidato aprovado, sem contas reais descartáveis.
   Validar drafts nos navegadores alvo e integração com confirmação/exclusão.
4. Para habilitar capas, concluir smoke Cloudinary, preset/privacy/EXIF/raw/tardios,
   cleanup/créditos e PD-CRI-010. Se ainda pendente, equipe pode aprovar explicitamente
   rollout parcial com CLOUDINARY_IMAGE_ENABLED=0, fallback e registro da ressalva.
   Não declarar016 homologada nem ativar uploads sem operador.
5. Identificar operador mail PD-CRI-004; conferir scheduler existente, auth, cadência
   e atraso menor que a validade. Build verde não prova entrega de e-mail.

## 5. Atualizar o projeto existente, em janela autorizada

RECOMENDACAO de sequência; somente estudantes autorizados executam esta etapa.

1. Registrar deployment/SHA anterior e guardar artefato/configuração recuperáveis.
   Confirmar se a branch de produção ou development dispara deploy automático.
   Não fazer promoção/merge que dispare aplicação nova antes de concluir migrations.
2. Ensaiar primeiro. Na janela real, controlar mutações/tráfego e workers por mecanismo
   operacional existente e aprovado; registrar início do congelamento de escrita.
   Fazer backup final. Não simular manutenção mudando status de contas ou excluindo dados.
3. Operador de banco aplica somente a cadeia revisada ao banco identificado; conferir
   inventário/checksums/status/constraints/contagens. Sem aprovação do banco, parar.
4. Confirmar env/build settings da versão candidata no MESMO projeto Vercel. Não
   reutilizar Preview com banco produtivo nem homologação como produção por nome do target.
5. Pelo fluxo existente (Git ou CLI da equipe), implantar exatamente o SHA aprovado.
   Se Git conectado, completar promoção revisada para a branch confirmada; se manual,
   selecionar projeto/equipe já existentes. Não executar `vercel` com defaults que
   possam criar/linkar um projeto novo. Conferir READY, SHA e destino antes de promover
   o alias/domínio. Não adicionar migrate deploy ao build de cada Preview.
6. Conferir pós-deploy do checklist: autenticação, autorização, jornadas, isolamento,
   headers/cache, métricas de erro, banco, fila mail e capas. Só reabrir escrita após
   checks essenciais e evidência; reativar schedulers aprovados e verificar execução.
7. Registrar URL/candidato/deployment/UTC, aprovação, backup ID, migrations aplicadas,
   resultados e pendências. Não registrar senhas/tokens/e-mails/URLs assinadas.

## 6. Recuperação e acompanhamento

Erros de migration: não publicar nova aplicação; preservar evidência e seguir
[recuperação do banco](migration-runbook.md). Erros da aplicação: conter mutações,
conferir banco e usar deployment anterior aprovado no MESMO projeto; testar sua
compatibilidade com tabelas novas/dados já produzidos. Conservar migrations/jobs;
não apagar tabelas/ativos nem repetir bootstrap como rollback.

Se capas estiverem inseguras, suspender novos uploads por procedimento aprovado
e manter reconciliação dos jobs próprios; controlar feature flag requer autorização.
Se mail falhar, impedir novos fluxos dependentes por decisão operacional e reparar
scheduler/credencial pelo owner; não alongar TTL nem apagar outbox para esconder fila.
Retomar somente após gate de recuperação aprovado.

Monitorar continuamente erro5xx/401/403, locks e latência, atraso/DEAD do mail,
PROCESSING/RECONCILE/BLOCKED de capas, assets próprios tardios e créditos. Definir
quem monitora, limiares adequados ao plano e período de observação; não assumir
gratuidades, cron existente ou operação automática total.

IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
