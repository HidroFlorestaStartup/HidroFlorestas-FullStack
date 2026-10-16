# Notas da Release Candidate CRI

## Correções da revisão de 15/10/2026

CRI-REV-001: disponibilidade explícita separada de autorização/existência. Política
A confirmada: desligado bloqueia upload/confirm/remove/content, preserva metadados
e capas persistidas. UI e lista usam fallback sem GET de conteúdo desabilitado.
CRI-REV-002: preflight local antes do preset e segunda validação Serializable
após rede, sem transação aberta durante I/O. Replay/quotas/contexto são revalidados
e tentativa/jobs continuam atômicos. Sem schema/migration/dependência nova.
[Evidências e estado atual](cri-rev-readiness-20261015.md); aprovação humana aberta.

## Atualização focal — 2026-10-13

EVIDENCIA_IMPLEMENTACAO: RC-DRAFT-001 impede edição/salvamento antes de os handlers
do formulário ambiental estarem prontos. RED determinístico bloqueia scripts;
GREEN valida primeiro PUT, persistência e reload com false, 0, ausência e vazio
explícito, sem mudar parser/API/schema. Os três E2E originais foram preservados.

RC-UI-001 faz “Recarregar capa” tentar novo GET após503, mantendo revision1 e
comprovando naturalWidth>0, inclusive após outra falha. Nenhum UPDATE de revisão
no banco foi usado. Ambas as correções integram a árvore cumulativa por merges.

O commit99d8363 revisado do PR7 foi integrado com SHA/autoria originais:
Next/config-next16.3.8, sharp0.35.5/libvips1.3.4, source-map-js1.2.2 e os dois
patches brace-expansion. Sem atualização geral. Os valores0.35.4/16.3.6 nas
seções originais abaixo descrevem o baseline histórico da publicação.

Checks Windows/Node24/PostgreSQL sintético próprio foram adicionados às cinco
branches da revisão, sem segredos de produção/deploy. Resultados atuais, FAILs
históricos e condições de aprovação estão em [prontidão](rc-readiness-20261013.md)
e no [runbook CI](../../operations/rc-review-ci-runbook.md).

Data: 2026-10-10. Recorte: base beba96f → auditoria539f38d, acrescido de proteção
das branches de revisão e documentação de entrega. Identificador operacional
`cri-rc-20261010`; package.json continua0.1.0. Esta RC não é homologação concluída.
EVIDENCIA_IMPLEMENTACAO nas capacidades abaixo; intenção e limites nas specs.

## Correção 014 — runners de contas

[Spec014](../../../specs/014-account-test-runners/spec.md): a seleção geral
Playwright deixa a exclusão de conta para o runner próprio. O setup local aceita
checksums das mesmas migrations em representações UTF-8 LF/CRLF, mantendo recusa
para conteúdo alterado. Os cenários de exclusão permanecem no runner dedicado.
Não cria migration, variável de produção nem mudança de negócio de contas.

## Nova funcionalidade 015 — rascunhos pessoais

[Spec015](../../../specs/015-environmental-drafts/spec.md): salvar explicitamente
medições parciais, retomar após reload e descartar com confirmação. Um draft por
usuário/coleta confirmada; conflito em outra aba exige recarga deliberada e conserva
edição local. Zero, false e ausência continuam distintos. Confirmação consome a
revisão pessoal vigente na transação; rollback a preserva. Sem expiração automática.
Draft alheio não é exposto/consumido; draft não alimenta ciência nem diagnósticos.
Exclusão permitida de conta remove somente seus drafts e respeita bloqueios013.
Aviso Voltar/Avançar foi validado em Chromium; suporte amplo requer teste humano.

Banco: nova `EnvironmentalDraft`, JSONB, revisão, chaves de save, índices e FKs
RESTRICT. Nenhuma variável de ambiente nova; usa o banco/sessão existentes.
[Runbook de uso](../../operations/environmental-drafts-runbook.md).

## Nova funcionalidade 016 — capas privadas

[Spec016](../../../specs/016-area-covers/spec.md): uma capa por área, com upload
direto assinado para staging Cloudinary authenticated e confirmação validada no
servidor. JPEG/PNG/WebP até10MiB e4096px por lado; decoder/reencode WebP removem
metadados da capa final. OWNER/ADMIN contextual muta em laboratório ativo; membro
vinculado lê. Papel global não concede bypass. Proxy privado revalida autorização;
fallback quando ausente/indisponível. Legado CollectionArea.image não vira URL confiável.

Banco: `CoverUploadAttempt`, `AreaCover`, `CoverCleanupJob`; referência/revisão,
leases e prova de ownership protegem concorrência e recuperação. Cleanup usa IDs
exatos próprios; nunca varredura/destruição por prefixo. Staging privado pode conter
EXIF até limpeza. AppTTL10min não revoga assinatura do provedor de até1h. Jobs de
reconciliação tardia exigem operador contínuo e monitoramento de créditos.

Dependências novas: cloudinary2.11.0 e sharp0.35.4; lockfile versionado. Seis
variáveis CLOUDINARY_* em [.env.images.example](../../../.env.images.example),
com recurso desabilitado por padrão. Sem configuração válida, uploads/conteúdo
recusam de forma sanitizada; metadados/áreas continuam disponíveis.
[Runbook completo](../../operations/area-covers-runbook.md).

## Banco, configuração e compatibilidade

As únicas migrations novas sobre beba96f são
`20261010000100_environmental_drafts` e `20261010000200_area_covers`; criam tabelas,
índices e constraints sem backfill, UPDATE/DELETE de dados antigos ou alteração do
contrato IHFR. Tabelas referenciadas sofrem locks de DDL; testar duração no clone.
Os12 SQL anteriores permanecem idênticos. Estado remoto do banco é desconhecido;
se houver migrations anteriores pendentes, o impacto é maior que estas duas.
Consultar [procedimento seguro](migration-runbook.md) antes de qualquer aplicação.

Configuração completa e distinção entre valores existentes e novos estão no
[guia operacional](production-update-runbook.md). Preservar JWT, keyrings, IDs
ativos e schedulers atuais: rotação indevida invalida sessões/provas/outbox.
`env.exemple` é legado e inadequado como configuração desta RC.

## Evidência e limitações

A revisão focal registrou291 unitários +17 Mail,187 integração,37 migrations,
6 contrato,67 Chromium,2 HTTPS,3 exclusão,14 bootstrap, typecheck/lint/build PASS.
R1 repete14 integração +3 Mail; não somar como casos novos. Lint tem3 warnings
preexistentes. Esses resultados são históricos, no ambiente local descrito pelo
relatório, não testes executados na produção nem prova do provedor real.

Ressalvas atuais: GateB012/reset/reenvio, aceite humano013, navegadores/drafts,
Cloudinary real/privacidade/custos, responsáveis mail/cleanup, mapeamento do destino
e backup/ensaio. Cada condição tem ação de fechamento no [checklist](review-checklist.md).
Nenhuma pendência científica foi encerrada; IHFR continua CONTRATO_EXPERIMENTAL,
VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e
NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
