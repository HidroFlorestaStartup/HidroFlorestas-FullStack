# Evidências de implementação 016 — 2026-10-10

G3/G4 PASS local. DECISAO_CONFIRMADA PD-CRI-007/008/009: usuário desta conversa
aprovou capa privada por área, roles contextuais, limites e cleanup próprio,
exigindo documentação. [Proveniência](../../docs/plans/active/contas-rascunhos-imagens/decisoes-e-pendencias.md).
[Plano](plan.md), [modelo](data-model.md), [contratos](contracts/images.md) e
[runbook](../../docs/operations/area-covers-runbook.md) descrevem a implementação.

EVIDENCIA_IMPLEMENTACAO em Windows/Node24.19/npm12/Pg17 próprio loopback55427,
dados e chaves sintéticos. Provider fake/HTTP interceptado; nenhum upload, delete,
SMTP, migration ou configuração remotos. E2E fake verifica UI; autorização e
persistência usam testes PostgreSQL independentes, sem extrapolar homologação.

## Regressão completa desta execução

Fingerprint de bytes funcionais: `7f540ba4160402d710bbe164dbba630a41f80e58c267dc9a46820446e853b8ce`.
Documentos não integram fingerprint; SHA Git normalizado é outro identificador.

| Comando | Intervalo UTC | Duração | Resultado/contagem |
|---|---|---|---|
| `npm run test:unit` | 2026-10-10T18:13:42.255Z → 2026-10-10T18:13:50.971Z | 8.716s | PASS; exit 0; 291 + Mail 17 |
| `npm run test:integration` | 2026-10-10T18:13:51.299Z → 2026-10-10T18:14:59.891Z | 68.592s | PASS; exit 0; 187 |
| `npm run test:migration` | 2026-10-10T18:15:00.190Z → 2026-10-10T18:15:10.961Z | 10.771s | PASS; exit 0; 37 |
| `npm run test:contract` | 2026-10-10T18:15:11.270Z → 2026-10-10T18:15:13.719Z | 2.449s | PASS; exit 0; 6 |
| `npm run test:mail:r1` | 2026-10-10T18:15:14.034Z → 2026-10-10T18:15:22.203Z | 8.169s | PASS; exit 0; 17 (sobrepostos) |
| `npm run typecheck` | 2026-10-10T18:15:22.502Z → 2026-10-10T18:15:28.699Z | 6.197s | PASS; exit 0; check completo |
| `npm run lint` | 2026-10-10T18:15:29.005Z → 2026-10-10T18:15:37.378Z | 8.373s | PASS; exit 0; zero erros; três warnings anteriores |
| `npm run build` | 2026-10-10T18:15:37.665Z → 2026-10-10T18:15:53.157Z | 15.492s | PASS; exit 0; check completo |
| `node --import=tsx scripts/imp006-clean-bootstrap.ts --with-versioned-baseline` | 2026-10-10T18:15:53.486Z → 2026-10-10T18:16:00.846Z | 7.360s | PASS; exit 0; 14 migrations; escrita sintética revertida; DB próprio removido |
| `npm run test:e2e` | 2026-10-10T18:16:01.148Z → 2026-10-10T18:18:20.929Z | 139.781s | PASS; exit 0; 67 |
| `npm run test:e2e:https` | 2026-10-10T18:18:21.222Z → 2026-10-10T18:18:48.836Z | 27.614s | PASS; exit 0; 2 |
| `npm run test:ihfr:audit:assert-zero` | 2026-10-10T18:18:49.149Z → 2026-10-10T18:18:49.658Z | 0.509s | PASS; exit 0; zero schemas candidatos |

Unit roda 291 casos Node e 17 Mail. R1 reexecuta 14 casos PostgreSQL de Integration
e 3 SMTP locais de Mail; não somar novamente. Repetições focais/regressões de cortes anteriores também não aumentam um
total exclusivo. Lint: warnings anteriores em page.tsx, user-profile e white-box.

Errata documental de 2026-10-10, auditoria posterior: o texto original
“R1 reexecuta os mesmos Mail” descrevia incorretamente o overlap. O seletor de
package.json usa integration/mail-outbox.test.ts e mail/mail-smtp.test.ts com
test-name-pattern=R1. As contagens, snapshots e resultados históricos acima e no
JSON permanecem intactos; a nova execução confirmou a composição 14 + 3.

## Corte final e utilitários

`5f36eb7e02e465741c85e5b3706276d9d153417037dce1193f7b03510d6c286d` difere do
corte completo somente pela assertion de WebP animado e pela exceção .gitignore
para o exemplo sem credenciais; nenhum byte de implementação foi alterado.
Parser/decoder: 2 PASS incluindo animação real de duas páginas. Preset offline:
PASS, providerCalls=0. Cleanup dry-run: PASS, eligible=0/providerCalls=0; não é
prova de delete real. Exclusão dedicada: 3 PASS, UTC18:20:22.316–18:20:31.313.
Typecheck PASS; auditoria final zero schemas. [JSON completo](validation-evidence.json)
contém comandos, ambiente, UTC, duração, exit code e snapshot de cada tentativa.

## Falhas observadas e correções

Registros FAIL preservados no JSON, sem substituição pelo resultado posterior:
- RED inicial parser/decoder: módulo ausente, duração Node ~0,365s; UTC não capturado.
- CoverServiceRed: serviço ausente; depois Pg/fake passou.
- Primeiro generate Prisma: relação de cover inserida no model errado; corrigida
  antes de qualquer migration, generate seguinte PASS. UTC não capturado.
- Unit107dc18: 291 PASS/1 FAIL pela projeção nova de cover; teste mantém filtro,
  ordem e agora comprova ausência de assetId no DTO, T018.
- Unitc69915: guard server-only no teste do adaptador. Movido para Integration
  com --conditions=react-server; guard de produção preservado.
- Integratione52e: fixture HTTP sem guard completo de ingress local, não defeito
  de CSRF; corrigida sem relaxar produção. CoverHttpMigrationf36a ainda falhou
  pelo mesmo contexto; 1cdf67 passou (2 casos).
- Adaptador: RED focal 1 PASS/2 FAIL, UTC não capturado, por allowed_formats CSV
  e resposta DELETE por publicId. T017 corrige e testa endpoint plural com context,
  exclusão por ID imutável e normalização estável CSV/array. Revisão independente
  /root/image_research identificou esses dois P2; revisão final sem novos P1/P2.
- CoverBrowser9efe03: interceptação não cobria subpaths image/uploads, devolvendo
  indisponibilidade sanitizada com provider desabilitado. Predicate de URL
  corrigido; 7129648 passou os 2 casos. Não ocorreu upload externo.
- Primeiro Image-cleanup-dry: helper temporário usava top-level await em CJS.
  Corrigido somente no coletor ignorado; utilitário entregue passou depois.

## Revisão, rastreabilidade e limites

FR001–009/SC001–004: roles/two labs/revogações/quota/expiração; preset drift;
staging e final authenticated; decoder/EXIF; proxy sem URL; CAS/replay/rollback;
leases/cleanup imutável/estrangeiro/vigente/tardio; UI/mobile/teclado/fallback;
exclusão efetiva do uploader preserva capa e ownership da área. Cobertura focal
final: 6 Pg + 3 provider + 1 HTTP PASS. Migração aditiva preserva ciência e FK
SetNull; rollback de conta preserva autoria. Outbox de e-mail não foi reutilizada.

Não há purge automático de tombstones; RECONCILE exige operador contínuo.
Assinatura Cloudinary vale 1h; appTTL10min não a revoga. resource_type não integra
assinatura; três destinos controlados têm jobs prévios. Preset versionado deve
permanecer congelado, pois verificações pontuais não provam seu passado. Esses
limites e custos estão documentados, sem promessa de gratuidade ou limpeza total.

PD-CRI-010 (operador/créditos), configuração e smoke Cloudinary real, Gate B012 e
aceite humano013 seguem pendentes. Acessibilidade foi verificada por papéis,
teclado e viewport390 em Chromium; não constitui auditoria universal WCAG.
IHFR mantém CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.


## Checkpoint Git posterior à execução

Commit funcional real `06fcbe005b7198b0708f280d9844f5edc0c7451d`, branch `016-area-covers`, base de feature
`45da350c34f873619a81bb5b3022bf97a1d1bc7c`, planejamento `1ae3ca51ebb0291751a39c1b2f873431ab09da52`.
T016 concluída após esse checkpoint. G5 local: documentação/escopo/diff/links e
provas de privacidade/ownership revisadas; todos os 20 itens entregues. Nenhuma
alteração em docs/raw, AGENTS, PLANS ou constituição. Corte funcional final
verificado antes do commit: 5f36eb7e; nenhum byte funcional mudou depois.
PostgreSQL próprio restaurado STOPPED, dados preservados; schemas de teste zero.
