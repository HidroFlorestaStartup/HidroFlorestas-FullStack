# Prontidão operacional — execução HF-POS-20261021-01

## Resultado e escopo

**Frente C: PARCIAL. G3: BLOCKED (BLOCKED_ENV). G5: BLOCKED.**

`EVIDENCIA_IMPLEMENTACAO`: a conexão Vercel do HidroFloresta acessou o projeto correto, confirmou os deployments e executou cinco requisições HTTP controladas na RC. Quatro páginas retornaram HTTP 200 pelo mecanismo autenticado da Vercel; o endpoint do worker retornou HTTP 503 `CONFIGURATION` sem autenticação da aplicação e sem executar um lote. As variáveis necessárias para contas/e-mail continuam ausentes no inventário consultado. Isso impede tratar o Preview como piloto homologado.

A inspeção é do agente real `/root/operacao_vercel`, coordenado em paralelo com as demais frentes. Base Git: `b1f83cfa8e52dd25c6246c584a576553c5e9e131`; branch local exclusiva `review/hf-pos-operations-20261021`. Somente este documento e seu recibo JSON foram escritos por este agente. Nenhuma alteração em produção, configuração remota, scheduler, banco ou dados da aplicação foi executada.

**Recibo completo redigido:** [operations-vercel-metadata.json](evidence/operations-vercel-metadata.json). Horários HTTP observados entre **2026-10-21 23:56:45 e 23:58:59 UTC** (20:56:45–20:58:59 em Brasília). O relatório não converte a hora de coleta em hora de criação dos deployments.

## Fontes e classificação

`DECISAO_CONFIRMADA`: o usuário autorizou a execução pós-consolidação, publicação de resultados no GitHub e o e-mail final; proibiu merge automático, produção, mudanças em `main` e operação de banco hospedado sem os gates demonstrados. A coordenação mantém a autorização e o recibo do e-mail; este agente não o enviou.

`EVIDENCIA_IMPLEMENTACAO`: API Vercel atual, código e exemplos de ambiente do SHA-base, além dos runbooks citados abaixo. `FATO_DOCUMENTADO`: o runbook de contas descreve um **outro projeto**, específico de homologação de 05/10; seus testes e scheduler não são evidência do FullStack atual. Recomendações e inferências aparecem identificadas.

Foram aplicadas as skills `vercel:env-vars`, `vercel:deployments-cicd` e `vercel:access-protected-vercel-deployment`; consultas por nomes/targets e acesso HTTP autenticado, sem descriptografar variáveis. Foram lidos `AGENTS.md`, contexto, política de planos, decisões técnicas, constituição, política de fontes, runbooks e código pertinente.

## Identidade, deployments e proteção

| Campo | Evidência atual | Alcance |
|---|---|---|
| Equipe | `team_YqedIK09zOGFeZ8M84kra0oM`, `hidrofloresta-8598` | Conta conectada do HidroFloresta |
| Projeto | `prj_DiLVjku1AglHtTXv8ckxg8pBiZR3`, `hidro-florestas-full-stack` | Next.js; Node configurado `24.x` |
| RC em Preview | `dpl_FZkyCyfvzLVQFG5W9sVCd34ipcdj`; SHA `5f6266b48d0f9d33571009c0c3981065630bd21e`; READY; API `target:null` | Preview da RC, não Production |
| Preview documental posterior | `dpl_D6LnRpT5xEMJVDRmxYKx2R5EvVji`; SHA `f85077a6f0c229ea08fd4ce85c80a92c67c48093`; READY; `docs/handoff-pos-consolidacao-20261021` | Documentação de Pedro; não substitui a CI funcional |
| Production | `dpl_FEPNkC3Rg52iaBk8hs1TtutPXJoA`; SHA `1ea3cc2552c244e1004f4f733f838e0f9ea62993`; READY; `target:production` | Versão anterior, sem promoção nesta execução |
| Proteção | SSO habilitado, `all_except_custom_domains`; password protection desabilitada | Proteção não alterada |
| Conectores do projeto | Endpoint retornou `connectors:[]` | Não identifica o banco nem prova ausência de banco externo |

Links de acompanhamento: [Preview RC](https://vercel.com/hidrofloresta-8598/hidro-florestas-full-stack/FZkyCyfvzLVQFG5W9sVCd34ipcdj), [Preview documental](https://vercel.com/hidrofloresta-8598/hidro-florestas-full-stack/D6LnRpT5xEMJVDRmxYKx2R5EvVji), [Production preservada](https://vercel.com/hidrofloresta-8598/hidro-florestas-full-stack/FEPNkC3Rg52iaBk8hs1TtutPXJoA).

A URL exata usada no smoke foi `https://hidro-florestas-full-stack-iuurq9rcv-hidrofloresta-8598.vercel.app`. A API retornou aliases históricos que podem se sobrepor entre deployments; por isso o smoke usou o hostname imutável da RC. Nenhum alias é apresentado como URL homologada do piloto.

### Smoke HTTP autenticado na proteção Vercel

| Caminho | Resultado | Evidência observada | O que não foi testado |
|---|---|---|---|
| `/` | PASS; HTTP 200 | Título de monitoramento ambiental por laboratório; quatro qualificações científicas em texto humano | Interação, layout renderizado, sessão da aplicação |
| `/login` | PASS; HTTP 200 | Formulário com inputs de e-mail e senha | Credenciais, login e autorização da aplicação |
| `/register` | PASS; HTTP 200 | Formulário com inputs de e-mail e senha | Cadastro, gravação no banco, envio/recebimento |
| `/forgot-password` | PASS; HTTP 200 | Título de recuperação e formulário de e-mail | Reset solicitado/recebido/consumido |
| `/api/internal/mail/process` | PASS para recusa segura; HTTP 503 `CONFIGURATION` | GET sem Bearer da aplicação; guard retorna antes de chamar o worker | Envio, lote, fila ou scheduler |

A ferramenta `vercel_web_fetch_vercel_url` administra acesso temporário autorizado à proteção Vercel. Nenhuma URL assinada, token, cookie ou resposta privada de usuário foi gravada. O teste autentica a requisição perante a **Vercel**, não cria uma sessão de usuário na aplicação. A recusa do worker é evidência do bloqueio de configuração, não falha nova de produto nem PASS de e-mail operacional.

## Inventário de ambiente sem valores

A consulta `filter_project_envs` usou explicitamente `decrypt:false`. Retornou **11 entradas e cinco nomes distintos**, sem variáveis ocultas adicionais de Production no campo `hiddenProductionEnvCount`.

| Nome presente | Targets | Entradas | Observação |
|---|---|---:|---|
| `NEXT_PUBLIC_MAP_ATTRIBUTION` | Production, Preview, Development | 1 | Valor não lido; presença não valida atribuição/cobertura do provedor |
| `NEXT_PUBLIC_MAP_TILE_URL` | Production, Preview, Development | 1 | Valor não lido; presença não prova acesso aos tiles |
| `DATABASE_URL` | Uma entrada separada em cada target | 3 | IDs distintos; valores, host, banco, papel e isolamento não verificados |
| `JWT_SECRET` | Uma entrada separada em cada target | 3 | Valores não lidos; independência não demonstrada |
| `ROOT_PASSWORD` | Uma entrada separada em cada target | 3 | Não foi usada nem testada |

**Ausências materiais no projeto FullStack**, confrontadas com [.env.accounts.example](../../../.env.accounts.example), [política de contas](../../../src/app/api/server/accounts/policy.ts), [configuração SMTP](../../../src/app/api/server/mail/config.ts), [provas](../../../src/app/api/server/accounts/proof.ts), [cifra da outbox](../../../src/app/api/server/mail/crypto.ts) e [guard do worker](../../../src/app/api/server/mail/trigger.ts):

| Grupo ausente | Nomes | Consequência |
|---|---|---|
| Origem e ingresso | `APP_PUBLIC_URL`, `ACCOUNT_TRUSTED_INGRESS` | Origem HTTPS e ingresso Vercel não configurados para as jornadas de contas |
| Política e testadores | `ACCOUNT_POLICY_ENABLED`, `ACCOUNT_TESTER_ALLOWLIST` | Política não ativada; allowlist operacional não definida |
| Provas de conta | `ACCOUNT_PROOF_KEYS`, `ACCOUNT_PROOF_ACTIVE_KEY_ID`, `ACCOUNT_REQUEST_KEY` | Não há configuração válida de proteção de provas/solicitações |
| Outbox e worker | `MAIL_PAYLOAD_ENCRYPTION_KEYS`, `MAIL_PAYLOAD_ACTIVE_KEY_ID`, `MAIL_IDEMPOTENCY_KEY`, `MAIL_WORKER_SECRET` | Cifra/HMAC e autorização do worker não configuradas; 503 confirmado |
| SMTP | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_REQUIRE_TLS`, `SMTP_USER`, `SMTP_APP_PASSWORD`, `MAIL_FROM` | Transporte real não configurado |

As sete variáveis numéricas `ACCOUNT_VERIFICATION_TTL_SECONDS`, `ACCOUNT_VERIFICATION_ATTEMPTS`, `ACCOUNT_RESEND_COOLDOWN_SECONDS`, `ACCOUNT_VERIFICATION_SENDS_PER_HOUR`, `ACCOUNT_RESET_TTL_SECONDS`, `ACCOUNT_RESET_REQUESTS_PER_HOUR` e `ACCOUNT_GLOBAL_REQUESTS_PER_HOUR` também não constam. **Elas têm defaults no código**; sua ausência isolada não é um defeito nem bloqueio obrigatório. O operador deve revisar a política desejada, sem alterar os limites para obter um resultado verde.

`INFERENCIA`: valores distintos de `DATABASE_URL` não podem ser deduzidos de IDs ou targets distintos. As três entradas podem apontar para o mesmo banco; o inventário não permite concluir nenhuma das alternativas. O mesmo limite vale para independência das chaves.

### Allowlist e chaves: critérios concretos

`EVIDENCIA_IMPLEMENTACAO`: `readAccountPolicy` exige `ACCOUNT_POLICY_ENABLED=1`, URL HTTPS válida, keyrings válidos e chaves independentes entre provas, requisições, outbox, idempotência e JWT quando comparável. A ausência de `ACCOUNT_TESTER_ALLOWLIST` resulta em `testerAllowlist:null`; não se deve ativar o piloto de testadores presumindo uma restrição que o código não recebe. A política de allowlist permanece server-side e não significa restrição de domínio Gmail.

`RECOMENDACAO`: preparar as chaves com CSPRNG no cofre/configuração privada do operador; nunca no PR, no chat, em argumentos de shell ou em variáveis `NEXT_PUBLIC_*`. Gerar um conjunto próprio do destino. Não copiar a homologação histórica ou Production para Preview. Registrar somente confirmação booleana de independência e presença, sem hashes de segredos ou endereços de testadores.

## SMTP, worker e scheduler

`EVIDENCIA_IMPLEMENTACAO`: o código aceita SMTP Google com `smtp.gmail.com`, 465/TLS implícito ou 587/STARTTLS, sempre com TLS obrigatório e validação de certificado. `MAIL_FROM` deve ser a mesma caixa simples de `SMTP_USER`. A validação é lazy: build e páginas HTTP 200 não inicializam nem comprovam SMTP.

O worker aceita GET/POST autenticado, sem query/corpo, e retorna apenas contagens seguras. O teste desta rodada não forneceu Bearer e recebeu 503 antes da execução do worker. Não consultou fila, payloads, destinatários, códigos ou tokens. R1, leases, fencing e concorrência foram preservados.

O script [accounts-homologation-scheduler.ps1](../../../scripts/accounts-homologation-scheduler.ps1) está **deliberadamente vinculado a outro destino**: `hidroflorestas-accounts-homologatio.vercel.app`, projeto `hidroflorestas-accounts-homologation`. Não executar esse script para configurar o FullStack, não remover seu guard e não promover o histórico de 05/10 a automação do piloto atual.

O `vercel.json` não contém cron. Nenhum job externo específico do FullStack foi identificado nesta leitura; isso não prova sua inexistência. Credenciais/configuração/histórico de cron-job.org do FullStack não estavam disponíveis. Scheduler: **BLOCKED**. Operador: **a designar**.

### Checklist privado de configuração e homologação

Todas as etapas seguintes são `RECOMENDACAO`; este documento não as apresenta como já executadas.

1. **Identificar o destino.** Registrar projeto/equipe, hostname estável, SHA, target Preview e branch, proprietário do banco/papel, isolamento de Production e autorização dos dados sintéticos. Confirmar backup/restore antes de qualquer escrita hospedada. Responsável: a designar.
2. **Revisar presença/configuração em canal privado.** Usar o painel [Environment Variables do projeto](https://vercel.com/hidrofloresta-8598/hidro-florestas-full-stack/settings/environment-variables), apenas no target/branch autorizado. Injetar os 18 nomes materiais acima e revisar os defaults numéricos. O destinatário de teste deve estar autorizado; Pedro e Luciano serem destinatários do relatório final não autoriza criar contas de teste em nome deles.
3. **Definir origem e política.** `APP_PUBLIC_URL` deve ser uma origem HTTPS estável sem path/query/fragment/userinfo, compatível com o hostname acessado. `ACCOUNT_TRUSTED_INGRESS=vercel` e política `1` devem corresponder ao destino real. Acesso à proteção Vercel para os participantes permanece necessário; não desabilitar SSO por conveniência.
4. **Preparar SMTP de modo privado.** Usar caixa Google elegível e senha de aplicativo coletada privadamente. Preservar proteções da conta. Em contexto autorizado com as variáveis injetadas privadamente, `npm run mail:verify` verifica conexão/autenticação **sem enviar**; registrar apenas exit code e mensagem sanitizada. O comando não foi executado nesta rodada, porque falta configuração.
5. **Validar o candidato no Preview controlado.** Variáveis futuras precisam pertencer ao deployment verificado. Registrar SHA/ID/target/horário e smoke após o provisionamento aprovado; não inferir que o Preview antigo incorporou alterações de ambiente.
6. **Vincular automação própria.** Registrar job/provedor/operador do FullStack com GET HTTPS no endpoint exato, Bearer privado em header, sem corpo/query e sem armazenamento de respostas. Usar cadência e timeout aprovados; provar duas execuções automáticas distintas e recuperação de backlog sintético. O job histórico não deve ser reutilizado por suposição.
7. **Executar jornadas de caixa autorizada.** Cadastro → recebimento → verificação → login/logout; expiração; reenvio com código anterior recusado; reset em outro contexto → recebimento → troca → sessão anterior recusada → senha anterior negada → senha nova aceita → link não reutilizável → aviso. Não consultar provas no banco nem pedir códigos/senhas pelo chat.
8. **Registrar separadamente cada prova.** Execução do agente, aceite SMTP, recebimento da caixa, jornada humana e scheduler devem ter recibos próprios. `accepted`/outbox `SENT` não equivale a recebimento. O envio do relatório via conector Gmail também não comprova SMTP da aplicação.
9. **Encerrar gates somente com evidência.** Definir suporte, janela e responsáveis; executar o roteiro de exclusão somente com dados descartáveis autorizados, revisar experiência/dispositivos e registrar aceite humano. G3–G5 sem PASS continuam impedindo Production.

O script `mail:smoke` existente exige suas próprias confirmações/allowlist e PostgreSQL sintético. Não deve ser redirecionado a banco hospedado para contornar os gates. As ferramentas desta rodada não receberam autorização nem configuração de dados hospedados que satisfizessem tais pré-condições.

## Capas e Cloudinary

`EVIDENCIA_IMPLEMENTACAO`: nenhum nome `CLOUDINARY_*` consta no inventário. [settings.ts](../../../src/app/api/server/images/settings.ts) retorna disponibilidade falsa se `CLOUDINARY_IMAGE_ENABLED` não for exatamente `1` ou se a configuração estiver incompleta. A política A já documentada em [area-covers-runbook.md](../../operations/area-covers-runbook.md) bloqueia upload, confirmação, remoção e conteúdo em estado ausente/desligado/inválido; metadados e referências são preservados.

`INFERENCIA`: o inventário atual, aplicado a esse contrato, indica **feature off por ausência de configuração**. Não foi aberta uma sessão autenticada da aplicação para observar o painel da capa, nem houve teste Cloudinary real. Não declarar provedor homologado ou decisão explícita de rollout concluída a partir dessa inferência.

`PENDENCIA_DE_DECISAO`: para o piloto, registrar explicitamente “capas desabilitadas” no destino/versão, validar o fallback em uma jornada autorizada e informar isso aos participantes; ou homologar o provedor conforme o runbook. Operador de cleanup/monitoramento de créditos: a designar. Nenhum upload/delete/cleanup foi executado.

## Matriz de gates operacionais

| Recorte | Estado | Evidência ou bloqueio | Próxima ação |
|---|---|---|---|
| Identidade do projeto e deployments | PASS | IDs/SHA/targets no JSON | Revalidar se houver drift |
| Proteção Vercel e páginas públicas da RC | PASS | 4 GETs autenticados com HTTP 200 | Testar sessão/jornadas após configuração |
| Recusa segura do worker sem configuração | PASS | 503 `CONFIGURATION`, sem lote | Configurar destino privado aprovado |
| G3 — contas/e-mail real | BLOCKED | `BLOCKED_ENV`; 18 nomes materiais ausentes | Configuração privada + jornadas + inbox + scheduler |
| Envio/recebimento SMTP nesta rodada | NOT_RUN | Configuração e destinatário de teste indisponíveis | Executar somente no destino autorizado |
| G4 — jornadas do produto hospedado | BLOCKED | Sem sessão, isolamento de dados ou permissão de escrita demonstrados | Liberar destino sintético, depois testar |
| Cloudinary real | NOT_RUN | Configuração ausente | Homologar ou registrar rollout off explícito |
| Isolamento/backup/restore hospedado | BLOCKED | IDs de env não identificam bancos | Evidência do operador e ensaio descartável |
| G5 — piloto e aceite operacional | BLOCKED | G3/G4, suporte, janela e aceites incompletos | Encerrar dependências com responsáveis designados |

## Riscos e handoff

| Prioridade | Risco atual | Estado/ação |
|---|---|---|
| P1 | Publicar piloto sem contas/e-mail configurados | Impedir divulgação como homologado; fechar G3 |
| P1 | Preview compartilhar banco/dados com Production | Não escrever; provar isolamento/recuperação |
| P1 | Confundir SMTP aceito, Gmail do relatório ou histórico com recebimento operacional atual | Manter provas e ambientes separados |
| P1 | Branch nova disparar deploy Git automático | Acrescentar guard focal do nome da branch antes do push; preservar `development:false` |
| P2 | Falta de operador/suporte, allowlist e aceite de capas off | Designar responsáveis e registrar decisões no piloto |
| P2 | HTTP 200/build READY ser tratado como acessibilidade ou jornada homologada | Exigir sessões, uso real e aceites específicos |

Não foi identificado P0 comprovado nesta inspeção limitada. Isso não equivale a auditoria completa de segurança.

`EVIDENCIA_IMPLEMENTACAO`: [vercel.json](../../../vercel.json) usa entradas de branch específicas e preserva `development:false`; o Preview documental de Pedro é uma evidência concreta de que outras branches podem produzir deployments. A coordenação é a única responsável por editar a guarda focal da branch de publicação desta missão. Este agente não editou `vercel.json`, workflows ou a branch de Pedro.

**Adendo factual à PR #26:** o antigo 403 de leitura do projeto está resolvido; a RC permanece READY; agora há quatro smokes de página bem-sucedidos por acesso autenticado Vercel e uma recusa segura do worker. Contas/e-mail/banco/aceites continuam bloqueados. O comentário correspondente é publicado pela coordenação, sem modificar o histórico ou assumir a branch de Pedro.

Referências de continuidade: [contas](../../operations/account-homologation-runbook.md), [e-mail](../../operations/mail-runbook.md), [drafts](../../operations/environmental-drafts-runbook.md), [capas](../../operations/area-covers-runbook.md), [homologação da RC](../2026-10-21-frontend-rc/homologacao-e-entrega.md), [guia do piloto](../2026-10-21-frontend-rc/guia-do-piloto.md). Os dois últimos preservam sua preparação histórica; este adendo atualiza apenas fatos demonstrados.

## Validação dos artefatos desta frente

PASS: JSON carregado por `python3/json`; 11 entradas de ambiente, todas com `decrypted:false`, ausência de campo `value`, `valuesRead:false` e `decryptionRequested:false`; referências locais resolvidas; `git diff --check` sem erros. O recibo contém quatro páginas e uma recusa de worker, sem URLs assinadas. Não houve alteração funcional que justificasse herdar ou alegar nova CI de 15 gates; a validação agregada e a revisão independente são registradas pela coordenação no SHA publicado.
