# Estratégia de testes futuros

## Estado corrente após entrega local — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: correção focal de runners 014, drafts pessoais 015 e
capas privadas 016 implementados e validados localmente. Contas/mail existentes
foram preservados e revalidados. [Matriz única](matriz-de-estado.md) concentra
requisitos, decisões, cenários, snapshots e pendências; [evidências 016](../../../../specs/016-area-covers/implementation-evidence.md)
registram a regressão integrada. Gate B012, aceite humano013 e operação/créditos
Cloudinary continuam pendentes. Estado global AGUARDANDO_REVISAO; entrega local
não equivale a homologação externa. Seções seguintes preservam os cortes anteriores.

## Reconciliação de 2026-10-10

Execuções atuais e históricas são separadas pela matriz única. O runner real inclui test:mail:unit e test:mail:r1; Unit já inclui Mail, portanto não somar Mail novamente ao total. PostgreSQL local próprio 55427 foi encontrado via harness; ausência no PATH não impediu validação. Nenhum SMTP/upload remoto será executado.

Fonte única de estado/evidências: [matriz de estado](matriz-de-estado.md). Coordenação: [PLAN-CRI-002](../reconciliacao-e-evolucao-contas-rascunhos-imagens.md). Contratos de contas: [spec 012](../../../../specs/012-account-verification-recovery/contracts/accounts.md).

## Registro histórico preservado — 2026-10-03

## Registro mínimo por caso

Cada evidência deve registrar ID, requisito, nível, fixture sintética, pré-condições, ação, resultado, invariantes, ambiente, SHA/data e estado `PASS`, `FAIL`, `SKIP`, `BLOQUEIO_DE_SETUP` ou `NAO_EXECUTADO`. Relatórios antigos não contam como execução futura.

## Matriz principal

| ID | Requisito | Nível/fixture | Cenário e resultado esperado |
|---|---|---|---|
| TEST-001 | MAIL-FR-002 | unitário/config | 465 exige secure; 587 exige STARTTLS; certificado inválido falha. |
| TEST-002 | MAIL-FR-003 | integração fake SMTP | timeout/falha após commit deixa outbox recuperável, sem duplicar challenge. |
| TEST-003 | MAIL-NFR-001 | unitário/log capture | código, token, segredo e e-mail completo ausentes de logs. |
| TEST-004 | EMAIL-FR-001 | unitário/relógio fixo | gera 000042 como string válida; distribuição não é testada com `Math.random`. |
| TEST-005 | EMAIL-FR-002 | PostgreSQL | HMAC correto só para conta/e-mail/finalidade/desafio correspondentes. |
| TEST-006 | EMAIL-FR-003 | PostgreSQL/barreira | duas confirmações: uma transição; sem dupla sessão/evento. |
| TEST-007 | EMAIL-FR-004 | PostgreSQL/clock | cooldown, limite, fronteira de expiração e código antigo após reenvio. |
| TEST-008 | EMAIL-FR-005 | integração | conta bloqueada verifica e-mail sem reativar/acessar. |
| TEST-009 | EMAIL-FR-006 | contrato/E2E | sessão restrita acessa confirmar/reenviar e recebe 403 no workspace. |
| TEST-010 | RESET-FR-001 | contrato/latência controlada | existente/inexistente retornam mesmo status/envelope e sem PII. |
| TEST-011 | RESET-FR-002 | unitário+DB | alta entropia, digest, finalidade separada, expiração e pedido repetido. |
| TEST-012 | RESET-FR-003 | PostgreSQL/barreira | dupla submissão consome uma vez; rollback não muda senha. |
| TEST-013 | RESET-FR-004 | integração auth | JWT antigo recusado após incremento; novo login funciona; papel/status preservados. |
| TEST-014 | DRAFT-FR-001 | integração PostgreSQL | dono/contexto válido; cross-lab, vínculo removido, conta bloqueada e lab inativo. |
| TEST-015 | DRAFT-FR-003 | unitário/contract | null/ausente/vazio/raw decimal/zero/false round-trip sem colapso. |
| TEST-016 | DRAFT-FR-004 | E2E | save, reload, outro dispositivo, falha/retry e aviso de não salvo. |
| TEST-017 | DRAFT-FR-002 | PostgreSQL/barreira | duas abas com mesma revisão: uma vence, outra 409. |
| TEST-018 | DRAFT-FR-005 | PostgreSQL | editar versus confirmar, duas confirmações, mesma chave/payload, chave divergente, resposta perdida. |
| TEST-019 | DRAFT-FR-006 | integração | draft ausente de dashboard/histórico/IHFR; confirmado aparece normalmente. |
| TEST-020 | IMAGE-FR-001 | unidade/integração | assinatura só após revalidação; parâmetros fora da allowlist recusados. |
| TEST-021 | IMAGE-FR-002 | contrato | nenhum secret no browser; assinatura expirada/replay/namespace alterado falham. |
| TEST-022 | IMAGE-FR-003 | fake Cloudinary | extensão/MIME/magic bytes divergentes, arquivo corrompido, bytes/dimensões, asset alheio. |
| TEST-023 | IMAGE-FR-004 | PostgreSQL+fake | falha ao persistir preserva antiga e agenda órfã; sucesso troca uma vez. |
| TEST-024 | IMAGE-FR-005 | integração | delete/retry/not-found idempotentes; permissão perdida antes da finalização. |
| TEST-025 | regressão | unit/integration/E2E | signup/login/logout, administração/último admin, vínculos, área/coleta, medição e IHFR inalterados. |

## Ambientes e técnicas

- Unitário: CSPRNG injetável somente para teste, relógio controlado, parser, HMAC/token, templates, configuração e erros.
- Contrato: schemas exatos, cookies, status, headers, DTO allowlist, OpenAPI se adotado.
- PostgreSQL real isolado: constraints, FK, transações, locks, OCC, consumo único, idempotência e migrations. SQLite/mocks não provam propriedades PostgreSQL.
- Fakes de SMTP/Cloudinary: sucesso, atraso, timeout, resposta perdida, rate limit, erro permanente, retry e cleanup.
- Migration: baseline antigo, contas existentes, imagens legadas, rerun e recuperação; endpoint direto quando exigido.
- E2E: UI mínima real com teclado/foco/`aria-live`, reload e estados de erro. Integração Lovable posterior repete os mesmos contratos.
- Smoke real: caixas/contas de teste controladas para Gmail/Cloudinary; separado da suíte determinística, sem usuários reais nem evidência com segredo.

Concorrência usa barreiras/transações, nunca sleeps arbitrários. Fixtures têm prefixo/IDs únicos e teardown somente dos registros/assets criados no caso; históricos existentes não são apagados.

## Comandos atuais versus futuros

Atuais confirmados em `package.json`: `npm run test:unit`, `test:integration`, `test:contract`, `test:migration`, `test:e2e`, `test:e2e:https`, `typecheck`, `lint`, `build`. Executar sequencialmente quando a implementação existir e as precondições forem satisfeitas.

Comandos focais para e-mail/drafts/imagens são futuros e devem ser adicionados somente na feature correspondente. Não inventar resultado nem executar SMTP/upload real como parte de `npm test`.

## Gates

1. Unit/contract sem secrets e sem rede.
2. Migration e integração em PostgreSQL isolado.
3. Typecheck, lint e build.
4. E2E e acessibilidade automatizável.
5. Smoke controlado de provedores, com limpeza/reconciliação.
6. Revisão humana de mensagens, política de acesso, privacidade de imagens e operação.


### Implementação 015 — 2026-10-10

EVIDENCIA_IMPLEMENTACAO: rascunhos pessoais implementados conforme aprovação PD-CRI-005/006, sem expiração; tabela segregada e consumo transacional. [Spec 015](../../../../specs/015-environmental-drafts/spec.md) e [runbook](../../../operations/environmental-drafts-runbook.md). Histórico de 2026-10-03 acima permanece contextual.
