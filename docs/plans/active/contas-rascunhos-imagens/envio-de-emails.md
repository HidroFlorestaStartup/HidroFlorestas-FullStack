# Envio de e-mails

## Estado corrente após entrega local — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: correção focal de runners 014, drafts pessoais 015 e
capas privadas 016 implementados e validados localmente. Contas/mail existentes
foram preservados e revalidados. [Matriz única](matriz-de-estado.md) concentra
requisitos, decisões, cenários, snapshots e pendências; [evidências 016](../../../../specs/016-area-covers/implementation-evidence.md)
registram a regressão integrada. Gate B012, aceite humano013 e operação/créditos
Cloudinary continuam pendentes. Estado global AGUARDANDO_REVISAO; entrega local
não equivale a homologação externa. Seções seguintes preservam os cortes anteriores.

## Reconciliação de 2026-10-10

Fundação implementada em src/app/api/server/mail, rota /api/internal/mail/process e scripts de worker. Contrato/runbook vigentes: specs/mail-foundation/contracts/mail.md e docs/operations/mail-runbook.md. Leases, fencing pré-SMTP/final, prazo operacional e R1 já existem e serão preservados. Smoke de 2026-10-04 e envio automático de 2026-10-05 são históricos; nenhum envio externo nesta execução.

Fonte única de estado/evidências: [matriz de estado](matriz-de-estado.md). Coordenação: [PLAN-CRI-002](../reconciliacao-e-evolucao-contas-rascunhos-imagens.md). Contratos de contas: [spec 012](../../../../specs/012-account-verification-recovery/contracts/accounts.md).

## Registro histórico preservado — 2026-10-03

## Transporte confirmado e pré-requisitos

`DECISAO_CONFIRMADA`: Nodemailer, SMTP Gmail e senha de aplicativo. O transporte é exclusivamente server-side em runtime Node.js.

- Porta 465: `secure: true`, TLS desde a conexão.
- Porta 587: `secure: false` com `requireTLS: true`; falhar se STARTTLS não for oferecido.
- Nunca definir `tls.rejectUnauthorized: false` nem `ignoreTLS: true`.
- A conta Google precisa de verificação em duas etapas. A opção de senha de app pode não existir em contas com somente chaves de segurança, contas organizacionais restritas ou Advanced Protection; mudança da senha Google revoga senhas de app.
- Aceitação pelo SMTP não comprova entrega na caixa de entrada. Quotas/bloqueios variam e devem ser monitorados na conta, sem números codificados como garantia.

## Configuração privada proposta

| Variável | Regra |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com`, validado no servidor. |
| `SMTP_PORT` | `465` ou `587`. |
| `SMTP_SECURE` | coerente com a porta. |
| `SMTP_REQUIRE_TLS` | obrigatório em 587. |
| `SMTP_USER` | conta remetente; nunca logar integralmente. |
| `SMTP_APP_PASSWORD` | segredo Google; não é senha do usuário nem código de verificação. |
| `MAIL_FROM` | remetente aprovado e compatível com a conta. |
| `APP_PUBLIC_URL` | URL HTTPS allowlisted por ambiente; nunca derivada de `Host`/`Origin` do request. |
| `MAIL_PAYLOAD_ENCRYPTION_KEYS` | keyring/versionamento para payload temporário da outbox. |

Nenhuma variável usa `NEXT_PUBLIC_`. Falha de validação impede inicializar o worker/envio, mas não deve derrubar páginas que não dependem de e-mail sem decisão operacional explícita.

## Serviço e templates

- Interface `MailTransport.send(message)` desacopla Nodemailer do domínio.
- Templates versionados: `email-verification-v1`, `password-reset-v1`, opcionalmente `password-changed-v1`.
- HTML e texto simples em português; título claro, alternativa textual, código legível sem depender de cor, link completo no texto, validade declarada e orientação para ignorar solicitação alheia.
- Escape obrigatório de nome/conteúdo; nenhum HTML fornecido pelo usuário.
- Assunto e preheader não incluem token/código.
- Link de reset contém token opaco; código de cadastro é distinto e não deve virar senha/link reutilizável.

## Envio síncrono versus outbox

| Alternativa | Benefício | Risco |
|---|---|---|
| SMTP dentro do request | Simples e feedback imediato | Timeout deixa estado ambíguo; acopla cadastro ao Gmail; retry do cliente pode duplicar. |
| Outbox durável | Commit atômico da intenção, retries e observabilidade | Exige worker/cron, criptografia temporária e operação. |

`RECOMENDACAO`: outbox PostgreSQL. Um worker acionado por cron autenticado solicita lote com `FOR UPDATE SKIP LOCKED` ou claim condicional, define lease, envia, registra sucesso/falha e aplica backoff limitado com jitter. Duas instâncias podem causar envio duplicado se a resposta SMTP se perder após aceitação; templates e reenvio devem tolerar isso, e o código/token continua uso único.

O código precisa existir em claro apenas no instante de geração/template. Como seu HMAC não é reversível, a outbox deve guardar o payload necessário cifrado com chave fora do banco e TTL curto, ou enviar sincronamente após commit com reenvio criando novo código. Recomendação: payload cifrado versionado, apagar após sucesso/expiração; reenvio cria novo desafio/payload e invalida o anterior.

## Falhas e operação

- Classificar autenticação, conexão/DNS, TLS, timeout, rejeição 4xx temporária, 5xx permanente e configuração.
- `transporter.verify()` é diagnóstico controlado, não health check a cada request e não prova entrega.
- Retry somente para falhas transitórias; limite/expiração; dead-letter inspecionável sem segredo.
- Métricas: pendentes por idade, tentativas, sucessos, falhas por classe, lease expirado, tempo até envio.
- Logs: `outboxId`, template, tentativa, classe de erro e domínio/recipient HMAC; nunca código, token, senha, payload cifrado ou resposta completa potencialmente sensível.
- Runbook: habilitar 2FA, gerar/revogar senha de app, configurar secrets, smoke para caixa de teste, acompanhar quotas, rotacionar credenciais e trocar transporte futuro sem alterar serviços de verificação/reset.
