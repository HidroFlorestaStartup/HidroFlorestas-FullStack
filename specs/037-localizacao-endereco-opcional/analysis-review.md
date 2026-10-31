# Spec Kit — análise cruzada e revisão focal da UI-07

**Execução:** 2026-10-31; modo `ANALYZE` executado inicialmente somente leitura, sobre o HEAD `53af10765bc401b43e80749c6a763ff11ee3d33f`. Não confundir esta revisão pelo próprio autor com QA independente.

| ID | Severidade | Evidência/fonte | Diagnóstico | Tratamento |
| --- | --- | --- | --- | --- |
| A-037-01 | HIGH | `FR-037-002`/spec 037 versus `area.contracts.ts`, `area.type.ts`, schema | CEP já é nullable no Prisma, porém payload é rejeitado e não aparece nos DTOs; interface sugere sem persistir | Writer único C coordenado para pequeno contrato aditivo, E2E com banco sintético; sem migration |
| A-037-02 | HIGH | `tests/unit/area-contracts.test.ts`, `area-registration.spec.ts`, spec 003 | Testes antigos impõem a exclusão histórica de CEP e chaves exatas, inconciliáveis com a decisão posterior UI-07 | Atualizar assertivas do contrato *corrente*, preservar arquivo histórico spec 003 e provar atributos privilegiados bloqueados |
| A-037-03 | MEDIUM | `tests/e2e/hf-ui037-location.spec.ts`, artefato CI `13055030510` | Prints UI-07 não constam do artefato: screenshot fora do diretório `TestInfo.outputPath` | Usar outputPath/attach e padrão existente `frontend-areas-*.png`; não inventar prova visual |
| A-037-04 | HIGH (gate de integração) | Run `41232297194`, arquivo `e2e-1793473619562.log` | 9 gates PASS, E2E FAIL: 222 PASS/1 timeout em `frontend-mobile-navigation.spec.ts:68`, cenário 320 px/texto 200%; A controla esse arquivo | Encaminhado à PR #46; nenhum edit A pela C; manter gate total FAIL até resolução/integração |
| A-037-05 | MEDIUM | `FR-037-005`, `route.handlers.ts` e plano | Provedor reverso não ativado nem aprovado; testes mockados não provam quota/termos/privacidade | Preservar `HF_REVERSE_GEOCODER_URL` opt-in desabilitado, não ativar serviço externo |
| A-037-06 | LOW | `tasks.md` versus arquivos executados | T006 descrita como teste contratual pendente mesmo com teste escrito, T010 ainda sem run terminal registrado | Atualizar status real por SHA/run/artefato sem declarar aceite fictício |

## Cobertura de requisitos

| FR / SC | Tarefas | Estado após análise |
| --- | --- | --- |
| FR-037-001 / SC-037-001 | T004–T005, T006, T008–T009 | 3 fontes implementadas; E2E da CI 53af107 incluído no conjunto de 222 PASS, sem inspeção visual certificada |
| FR-037-002 / SC-037-002 | T006–T007, T012–T014 | CEP end-to-end ausente; corrigir |
| FR-037-003 | T005–T007, T014 | POST não depende de provedor; preservar |
| FR-037-004 / SC-037-003 | T008–T009 | Reducer, abort, revisão e proteção manual testados; preservar |
| FR-037-005 / SC-037-004 | T003, T010, T015–T016 | Provedor continua não selecionado; runtime real pendente de gate operacional |

**Constituição 1.0.0:** sem conflitos deliberados; autoridade do #44 prevalece sobre antiga exclusão funcional de CEP; arquivo histórico spec 003 e ciência preservados. Sem ampliação de domínio, autorização, uso do provedor ou arquitetura científica.

**Método:** GitHub conectado; scripts locais Spec Kit que pressupõem checkout não foram executados por indisponibilidade de clone/DNS nesta sessão. Arquivos reais e skills `.agents/skills/speckit-analyze`, `speckit-plan`, `speckit-implement` lidos pela API. Sem subagentes nativos reais: `NATIVE_SUBAGENTS_NOT_AVAILABLE`.

**Decisão operacional de coordenação:** o pedido explícito do mantenedor para executar correções necessárias nesta PR, a ausência de overlap com A/B nos HEADs revisados e o aviso no [comentário #6550339752](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6550339752) delimitam C como único writer para os hunks mínimos do contrato da área. Não implica aprovação humana de integração ou extensão de ownership para A/B, workflows ou schema. Revalidar concorrência imediatamente antes da referência final.

## Critérios da revisão após implementação

1. `parseAreaInput` aceita CEP ausente/nulo/vazio e CEP válido normalizado, rejeita inválido/objetos/chaves privilegiadas.
2. `AreasService.create` persiste na coluna nullable já versionada, e GET/list/POST DTO retornam CEP ou `null`; nenhuma migration.
3. Testes sintéticos cobrem todas as 8 combinações de município/UF/CEP preenchidos/vazios e invalid input.
4. E2E registra prints de viewport com metadados reais no artefato se chegar ao trecho.
5. Resultado do CI é atribuído somente ao SHA da branch e tentativa real; problema de navegação A é separado da verificação C.
