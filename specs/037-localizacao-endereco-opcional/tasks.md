# Tasks: 037 — localização e endereço opcional

Lista inicial G0; fonte #44 fixada em `972f9b00189bf09117883913d8c4fa63e69f4d2f`. Testes obrigatórios. Completar paths reais antes de produto.

## Preparação

- [x] T001 Conferir branch/HEAD/base/guardas/ambiente; registrar em `specs/037-localizacao-endereco-opcional/implementation-evidence.md`, usando base `07755822f5dc75fe2be1d924005d30ed99f64a0b`.
- [x] T002 Completar Spec Kit em `spec.md`, `plan.md` e `tasks.md`; mapear arquivos reais de formulário/DTO/API/persistência e AGENTS, rastrear Code-First e coordenar quaisquer arquivos compartilhados.
- [x] T003 Inspecionar provedor/contratos existentes; registrar decisão técnica, termos/limites/privacidade e necessidade ou não de mudança em `prisma/schema.prisma` no `plan.md`; sem chamadas externas ou serviço pago por G0.

## US1 — três entradas

- [x] T004 [US1] Criar testes em `tests/unit/hf-ui037-geocoding.test.ts` para coordenadas de dispositivo/mapa/manual e para entrada inválida; usar adaptador determinístico, não rede real.
- [x] T005 [US1] Implementar enriquecimento nas três entradas nos arquivos congelados em `plan.md`; não editar detalhe B ou shell A.

## US2 — optionalidade e falhas

- [x] T006 [US2] Criar `tests/contract/hf-ui037-address-optional.test.ts` e cenários em `tests/e2e/hf-ui037-location.spec.ts` para retorno parcial/vazio, ausência de CEP, timeout/limite/rede e cadastro com campos opcionais ausentes.
- [x] T007 [US2] Aplicar optionalidade mínima de ponta a ponta nos paths documentados; submeter deltas compartilhados e eventual schema/migration ao coordenador, testar somente em banco sintético.

## US3 — concorrência e edição

- [x] T008 [US3] Ampliar `tests/unit/hf-ui037-geocoding.test.ts` com respostas em ordem invertida e edição manual durante consulta; demonstrar a regressão antes de corrigir quando reproduzível.
- [x] T009 [US3] Implementar política documentada contra respostas obsoletas e sobrescrita de edição manual; completar jornada em `tests/e2e/hf-ui037-location.spec.ts`.

## Validação e entrega

- [x] T010 Executar testes focais/contrato/persistência aplicáveis e os quinze gates de `scripts/rc-review-validation.ps1`; registrar SHA/run/tentativa e falhas/NOT_RUN em `implementation-evidence.md`, sem enfraquecer proteção sintética.
- [x] T011 Atualizar os quatro documentos da spec e PR Draft próprio com diffs exclusivo/acumulado, contratos compartilhados e pendências; sem merge/deploy.

G0 não concluiu tarefas de implementação/testes. A reserva 037 não autoriza editar os arquivos de A/B ou mudar providers/infraestrutura alheios ao recorte.

## Reconciliação factual das tarefas — snapshot anterior ao replanejamento (31/10/2026)

- T006 parcial: existem cenários UI/E2E para ausência de CEP, provedor indisponível e cadastro mínimo; `tests/contract/hf-ui037-address-optional.test.ts` segue pendente da alocação do contrato compartilhado. Há cobertura própria disponível, mas T006 **permanece aberta** até contrato de CEP end-to-end e evidência executada.
- T007 **pendente** de writer: coluna CEP já é nullable, mas API/DTOs e testes históricos precisam de mudança aditiva e coordenada. Não é necessária migration.
- T010 **pendente da CI no SHA de implementação**: não herdar G0; registrar PASS/FAIL/NOT_RUN real no recibo.
- T011 **em andamento**: documentos reconciliados; PR Draft atualizar no SHA final. Aceite humano/merge/deploy proibidos.

## Continuidade corretiva Spec Kit — tarefas T012–T017 (2026-10-31)

- [x] T012 [US2] Implementar CEP normalizado `string|null` com allowlist em `src/app/api/server/areas/area.contracts.ts`, serialização POST/GET/list e DTO compatível em `src/types/area.type.ts`; sem migration.
- [x] T013 [US2] Reconciliar regressão antiga em `tests/unit/area-contracts.test.ts`, `tests/e2e/area-registration.spec.ts`, contrato aditivo 037 em `contracts/area-optional-address.openapi.yaml` e suíte `tests/contract/hf-ui037-address-optional.test.ts` mantendo proteção de chaves privilegiadas.
- [x] T014 [US2] Integrar CEP no `src/components/areas/area-form.tsx` e verificar armazenamento POST/GET/Prisma sintético nas oito combinações de opcionais em `tests/e2e/hf-ui037-location.spec.ts`.
- [x] T015 [US1] Corrigir persistência das capturas E2E para `TestInfo.outputPath` e `attach` em `tests/e2e/hf-ui037-location.spec.ts`; registrar viewport e máscara de valores da UI.
- [x] T016 Registrar em `specs/037-localizacao-endereco-opcional/analysis-review.md` a falha real E2E de shell A e encaminhá-la ao owner #46 com SHA, run e log; não editar A.
- [x] T017 Executar revisão do diff, teste e gates por HEAD final; atualizar `implementation-evidence.md`, `tasks.md`, `plan.md`, `spec.md` e PR #48, separando revisão própria de QA independente.

**Nota após a correção:** T006/T007 e T012–T015 marcadas como código/testes implementados, não como CI verde. T010/T011/T017 continuam abertas até revisão do SHA final e atualização do PR. A ausência de provedor aprovado é gate operacional separado, não autorização para chamadas externas.

- [x] T018 [US2] Corrigir paridade do serializer no arquivo de teste corrente `tests/unit/area-openapi-parity.test.ts` compondo schema IMP-003 + extensão 037 e mantendo asserções de contrato fechado; teste e revisão de runtime pendentes de novo SHA.

- [x] T019 [US2] Preservar compatibilidade de consumidores `CreateAreaInput` em `src/app/api/server/areas/area.contracts.ts` com `cep?:string|null`, mantendo `parseAreaInput` normalizado; comprovação de Typecheck/Build depende de run posterior.

## HF-UI-044-CLOSE-C — conciliação terminal (2026-11-01)

As ocorrências anteriores de `pendente`, `NOT_RUN` e `FAIL` neste arquivo pertencem aos checkpoints históricos explicitados acima; não descrevem o estado do código do HEAD `63925b3639f3eec1dd4bd737f7be7adb881c83eb`.

- **T010 [x] — validação sintética comprovada:** [run 41251980306, tentativa 1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306), evento `push`, SHA de código exato `63925b3639f3eec1dd4bd737f7be7adb881c83eb`, `completed/success`; journal do [artefato 13062501328](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306/artifacts/13062501328) com **15/15 gates `PASS` (`exitCode=0`) e 224 E2E aprovados**. O runner usa PostgreSQL 17 sintético próprio, não banco hospedado. As suites 037 efetivamente entram em Unit, Integration, Contract e E2E via globs oficiais; não apenas existem no repositório.
- **T011 [x] — reconciliação documental/PR:** `spec.md`, `plan.md`, `tasks.md`, `implementation-evidence.md` reconciliados com o run e com suas evidências reais; comentário de ownership de C na PR #45 permanece como origem dos hunks compartilhados. A PR Draft #48 registra o `DOC_HEAD` posterior à publicação e o `CODE_SHA_TESTED` anterior, sem transferir o `PASS` automaticamente para outro commit.
- **T017 [x] — revisão técnica do próprio executor:** contrato opcional, persistência, autorização/allowlist, 3 entradas de coordenadas, concorrência, falhas/429 e logs FAIL históricos foram cruzados com o SHA testado e o artefato real. A comparação de diffs contra `GUARD_SHA`/`development` e a preservação de A/B foram conferidas. **Não** se trata de revisão independente, homologação ou aceite humano.

**Atribuição visual correta:** o artefato contém `.accounts-validation/frontend-areas/after-frontend-areas-new-map-{320,375,768,1440}-viewport.png` e metadados, além de `new-focus`. A captura 320 px tem texto 200% (`rootFontSize=32px`); a 1440 px, 100% (`16px`). Os arquivos específicos `frontend-areas-hf-ui037-location-{mobile,desktop}.png`, embora previstos em `tests/e2e/hf-ui037-location.spec.ts`, **não aparecem como entradas independentes do ZIP**. Não alegar captura de geocodificador real nem prova inexistente.

**Estados separados:** `UI037_CODE_SYNTHETIC_CLOSED` (somente SHA testado); `GEOCODER_OPERATIONAL_PENDING` (`NOT_CONFIGURED/NOT_RUN` para provedor real, quotas/atribuição/cache/privacidade pendentes); `HUMAN_ACCEPTANCE_PENDING` (inclusive QA de composição e revisão por terceiro). `LOCAL_WORKTREES_NOT_OBSERVABLE`; `NATIVE_SUBAGENTS_NOT_AVAILABLE`. Nenhum merge, deploy ou migration hospedada foi autorizado/executado por este fechamento.

## CLOSE-PARALLEL-02 / PROMPT03 — delta focal (2026-11-01)

- [x] T020 [US1] Preservar PNG+JSON imediatamente fora do outputDir com COPYFILE_EXCL em `tests/e2e/hf-ui037-location.spec.ts`, usando nomes cobertos pelos globs oficiais.
- [x] T021 [US1] Completar metadados sanitizados de viewport/escala/fonte/máscara/fixture/SHA/tree/run/attempt/hash no mesmo teste, sem substituir as asserções funcionais.
- [x] T022 [US1] Executar contraprova sintética da função real de cópia para sobrevivência à limpeza de outputDir e recusa de sobrescrita em `specs/037-localizacao-endereco-opcional/evidence/close02-preservation-check.mjs`; registrar limites de runtime.
- [x] T023 Transportar somente quatro documentos sanitizados33d idênticos a c7b, conferir blobs e registrar em `specs/037-localizacao-endereco-opcional/evidence/close02-handoff.json`; preservar branch/commit original e limpeza21.
- [ ] T024 Após runtime do coordenador, auditar ZIP final com os quatro arquivos UI037, digest/CRC/dimensões/metadados depois das suítes posteriores e registrar em `specs/037-localizacao-endereco-opcional/implementation-evidence.md`.

Dependências: T020/T021 precedem T022 e runtime; T023 é independente; T024 exige
artefatos reais do coordenador. Checklist técnico aberto está autorizado pelo
mandato atual, sem transformá-lo em PASS ou aceite. Ownership C exclusivo;
workflow/guard/upload/scripts não são editados por C.

### Revisão pós-runtime da rodada1

- [x] T025 Auditar em `evidence/close02-round1-ui037.json` o ZIP real41351237110/1, digest/CRC,4arquivos UI037, fontes/proveniência e2imagens; registrar preservação parcial sem fechar T024 quando as suítes posteriores forem NOT_RUN.

T024 permanece aberta: R1 entregou4arquivos válidos, mas Https/Deletion/Ihfr não
rodaram após E2EFAIL. Não transferir essa prova ou os9gatesPASS para o SHA seguinte.
