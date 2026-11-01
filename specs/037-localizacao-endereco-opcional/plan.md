# Implementation Plan: localização/endereço opcional — preparação C

**Branch**: `feat/localizacao-endereco-opcional` | **Date**: 2026-10-31 | **Spec**: [spec.md](spec.md)
**Estado**: `UI037_CODE_SYNTHETIC_CLOSED` no `CODE_SHA_TESTED=63925b3639f3eec1dd4bd737f7be7adb881c83eb` (run 41251980306/1); `GEOCODER_OPERATIONAL_PENDING` e `HUMAN_ACCEPTANCE_PENDING`. O planejamento G0 abaixo é histórico e permanece preservado.

## Summary and technical context

UI-07 nas três entradas de coordenadas e nos campos de endereço opcionais. Base `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem `9b8595d232842d401ce81bbc92c54dd543aa2829`; guards #45 são dependência de integração.

Reutilizar Next.js/TypeScript, formulários, DTOs e persistência existentes. Provedor e arquitetura de geocodificação: a selecionar/confirmar por leitura do código e documentação primária atual de termos, limites, atribuição e privacidade. Não pressupor Nominatim ou qualquer outro serviço. Não executar chamadas externas em G0. Testes devem poder controlar respostas deterministicamente, sem depender de rede externa.

CI Windows/Node 24.19.0/PowerShell, quinze gates e banco sintético próprios preservados. Sem alteração de dependências por conveniência; sem banco hospedado. Novo objetivo quantitativo de performance: não especificado; consultas não devem bloquear o cadastro.

## Constitution Check

UI-07 confirmada; spec/branch/PR próprios; optionalidade e coordenadas preservadas; sem ciência, histórico ou domínio inventado. Gate técnico de contratos e nulabilidade a concluir na implementação; revisão independente pendente.

## Project Structure and ownership

Documentação exclusiva: `specs/037-localizacao-endereco-opcional/`.
C é writer do formulário de localização/cadastro da área e da lógica de obtenção/edição do endereço. O executor deverá enumerar os arquivos reais em `src/`, seguir os imports de UI/DTO/API/repositório e conferir `prisma/schema.prisma` sem editar até demonstrar necessidade. Ler AGENTS aplicáveis e registrar o mapa exato antes de produto.

B não edita o formulário C; C não reorganiza o detalhe da área B nem o shell A. DTO/repositório de área e schema podem ser compartilhados: enviar patch/contrato/testes ao coordenador para alocação de writer. Vercel/workflow, dependências, fixtures e configuração de testes não são livres para edição concorrente.

Testes propostos ainda não criados: `tests/unit/hf-ui037-geocoding.test.ts`, `tests/contract/hf-ui037-address-optional.test.ts` e `tests/e2e/hf-ui037-location.spec.ts`, adaptados ao harness existente.

## Sequência técnica recomendada

1. Preflight por SHA/guardas/refs/PR/ambiente local; completar Spec Kit, rastreabilidade e mapa de arquivos na reserva 037.
2. Inspecionar optionalidade de ponta a ponta e integração atual; documentar decisão técnica do provedor e limites. Não inventar escolha ou autorização paga. Planejar contratos mínimos.
3. Testar US1/US2 com adaptador controlável: todas as entradas, retornos completos/parciais/vazios, timeout/limite/rede e cadastro sem endereço.
4. Testar US3 antes da correção: respostas A/B invertidas e edição manual pendente. Definir controle de versão/cancelamento e semântica de limpeza/revisão ao trocar coordenadas, preservando intenção atual.
5. Implementar mínimo necessário; somente se demonstrado, alterar contrato/schema com coordenação e migration versionada/sintética, nunca executada em hosted DB.
6. Executar testes focais/contrato/persistência/E2E e quinze gates preservados; registrar falhas e NOT_RUN com SHA/run/tentativa. Atualizar docs e PR.

## Handoff Git e integração

Usar branch existente com pai dos guards, sem recriar de development desprotegida. Diff exclusivo `git diff 07755822f5dc75fe2be1d924005d30ed99f64a0b...HEAD`; acumulado inicial `git diff 9b8595d232842d401ce81bbc92c54dd543aa2829...HEAD`. Destino final development; #45 integra primeiro sob autorização futura. Não aguardar implementação A/B para trabalho independente; qualquer interface comum passa pelo coordenador.

Se #45 integrar por squash/rebase, transportar somente os commits exclusivos após o guard congelado e revalidar a união de configurações e contratos. Não executar esse merge/rebase de integração agora nem importar setup.

## Riscos e parada focal

Optionalidade somente visual mas ainda obrigatória no DTO, endereço antigo associado ao novo ponto, sobrescrita de edição manual e dependência síncrona de serviço externo são riscos focais. Decisão técnica pendente não autoriza contratar serviço. Bloquear somente o recorte dependente e avançar com contratos/testes independentes. Sem deploy, Neon, hosted migrations, SMTP, Cloudinary, REV-01–REV-03 ou ciência.

## Projeto executado — recorte C e mapa concreto de paths

**Git/ownership:** PR Draft #48, branch `feat/localizacao-endereco-opcional`, base imutável `07755822f5dc75fe2be1d924005d30ed99f64a0b`. G0 `e1ec632d60b22f2ddef93f1dbec0116d214d30f1`. Na inspeção inicial, A #46 e B #47 tinham apenas seus documentos, sem arquivos de contrato/área alterados. Revisar novamente antes da integração compartilhada. Arquivo `AGENTS.md` na raiz rege os paths observados; não havia `AGENTS.md` mais específico nos diretórios inspecionados.

| Arquivo/camada | Writer/alocação | Implementação |
| --- | --- | --- |
| `src/components/areas/area-form.tsx` | C | Inputs controlados, busca assíncrona, revisão/falha/CEP informativo, submissão legada segura |
| `src/components/areas/area-geocoding-state.ts` | C | Máquina pura de revisões, proteção manual, invalidação de sugestões |
| `src/components/areas/reverse-address.ts` | C | Leitura robusta e normalização estrita de município/UF/CEP |
| `src/app/api/geocoding/reverse/route.ts`, `src/app/api/geocoding/reverse/route.handlers.ts` | C | Integração de autenticação com route handler puro, proxy opt-in HTTPS e timeout sintético testável |
| `src/components/areas/area-form-state.ts` | C (leitura) | Reutilizado sem alterar semântica antiga de geolocalização |
| `src/components/areas/area-map.client.tsx` | C (leitura) | Clique já fornece coordenadas; nenhuma edição requerida |
| `src/app/api/server/areas/area.contracts.ts`, `src/types/area.type.ts` | **Compartilhados/coordenador** | Somente leitura; permitir CEP mínimo após atribuição de writer |
| `src/app/api/server/services/areas.service.ts`, `prisma/schema.prisma` | **Compartilhados/coordenador** | Somente leitura: `cep String?` e `...parsed` já existentes; **sem migration** |
| `tests/unit/hf-ui037-geocoding.test.ts`, `tests/integration/hf-ui037-reverse-route.test.ts`, `tests/contract/hf-ui037-address-optional.test.ts`, `tests/e2e/hf-ui037-location.spec.ts` | C | Testes novos, sem editar fixtures, runners ou config; contrato atual de CEP permanece explicitamente NÃO IMPLEMENTADO |
| `tests/unit/area-contracts.test.ts`, `tests/unit/area-openapi-contract.test.ts`, `tests/e2e/area-registration.spec.ts` | **Compartilhados/coordenador** | Assertivas da spec 003 precisam ser reconciliadas com decisão posterior UI-07 |

**Autoridade:** DECISAO_CONFIRMADA UI-07 em #44 supera apenas a antiga exclusão de CEP do contrato mínimo da spec 003. Código/schema existentes continuam baseline, não aprovação de nova taxonomia ou ciência. Constituição/spec kit v1.0.0; nenhuma alteração histórica da 003 ou docs/raw.

### Adaptação de geocodificação (RECOMENDACAO técnica, não seleção de fornecedor)

`HF_REVERSE_GEOCODER_URL` é um endpoint HTTPS externo configurado **somente se o operador aprovar um fornecedor e seus termos**. O servidor faz GET com `lat`/`lon`, envia Accept JSON, não encaminha sessão/cookies, aborta após 5 segundos, retorna somente `{address:{municipality,state,cep}}` ou 503. Não armazena coordenadas no cache. As respostas podem incluir `address.city/town/municipality/village/state/postcode` ou campos normalizados, e só passam CEP brasileiro com 8 dígitos e UF reconhecida. API própria exige autenticação; não permite que o cliente defina a URL do fornecedor. Chaves de fornecedor não são introduzidas nem expostas.

**O endpoint público Nominatim NÃO foi escolhido/ativado.** A política oficial acessada em 31/10/2026: https://operations.osmfoundation.org/policies/nominatim/ impõe máximo agregado de 1 requisição/s, User-Agent/Referer identificável, atribuição e regras ODbL, cache e capacidade de substituição; geocodificação automática/bulk é proibida em determinados contextos. Não existe neste recorte limitador global/distribuído ou cache operacional aprovado. Apontar o env para esse host sem aprovação, implementação desses controles e revisão de privacidade/termos **não é permitido por este plano**. Documentação de API reversa: https://nominatim.org/release-docs/latest/api/Reverse/. O retorno reverso pode ser do objeto próximo e não representar endereço exato; revisão humana permanece obrigatória.

**Privacidade:** latitude/longitude descrevem pontos potencialmente sensíveis. Antes de ativar fornecedor externo, decidir retenção/logs, base legal/aviso, país, limites, atribuição e revogação de acesso; nenhum dado pessoal ou coordenada real foi enviado nesta execução. Sem provedor, os fluxos de cadastro existentes continuam funcionais.

### Validação e integração

Os testes unitários exercitam o reducer e parsing/normalização, os de integração exercitam autenticação/contrato do endpoint com fetch simulado, e E2E usa fixtures sintéticas existentes e interceptação de rede (sem provedor público). Nenhum arquivo de execução de CI foi editado. Consultar `implementation-evidence.md` para resultados reais, run e tentativa específicos; status NÃO deve ser inferido de criação de teste ou do G0.

Patch compartilhado proposto ao coordenador da #45 (comentário #6547701906): [contracts/cep-api-extension.md](contracts/cep-api-extension.md). Não existe writer delegado nesta execução, portanto não aplicar a atualização de DTO/API nesta branch sem alocação. Se alocado, os testes de contrato e E2E devem verificar CEP persistido em PostgreSQL sintético e todas as antigas assertivas conflitantes antes de encerrar UI-07.

## Replanejamento Spec Kit — análise de 31/10/2026

Consulte [analysis-review.md](analysis-review.md), [research.md](research.md), [data-model.md](data-model.md) e [quickstart.md](quickstart.md).

**Writer focal coordenado:** consulta aos HEADs de A #46 (`d895119`) e B #47 (`6cfd15b`) não encontrou modificação de `area.contracts.ts`, `area.type.ts`, `tests/unit/area-contracts.test.ts`, `tests/e2e/area-registration.spec.ts`. Em atendimento à instrução atual de correções necessárias, C é writer único desses hunks **na branch C** e registra comunicação na #45 (comentário 6550339752); não altera schemas, runners ou testes da A/B. Revalidar antes do push.

**Ajuste funcional prioritário:** parse/serialize CEP opcional e DTO de resposta; incluir provas para entradas 0/1/2/3 e invalidez em banco sintético. O modelo Prisma já tem coluna nullable; **nenhuma migration**. Contrato OpenAPI 037 aditivo, sem reescrever o 003 histórico. Evitar tornar `cep` obrigatório para consumidores TypeScript existentes; serialização efetiva deve incluir `cep:null` quando ausente.

**Check anterior:** run 41232297194 (HEAD 53af107, tentativa 1) FAIL em E2E 320px/200% no teste de shell da Frente A; nove gates PASS e cinco NOT_RUN posteriores. Artefato GitHub ID 13055030510. Encaminhado para owner A, PR #46 comentário 6550340205. Não modificar A nem omitir o FAIL.

**Evidência visual:** screenshots E2E UI-07 em `TestInfo.outputPath`/attachments para inclusão no glob CI já existente; capturas de referência #44 não substituem execução.

## Matriz de implementação coordenada da continuidade corretiva

| Contrato | Path/hunk | Teste | Writer |
| --- | --- | --- | --- |
| CEP opcional em POST | `src/app/api/server/areas/area.contracts.ts` | `tests/unit/area-contracts.test.ts`, `tests/contract/hf-ui037-address-optional.test.ts` | C, registrado na PR #45 |
| CEP null/normalizado nos DTOs | `src/app/api/server/areas/area.contracts.ts`, `src/types/area.type.ts` | E2E de POST/GET e 8 combinações | C, hunks mínimos compartilhados |
| Persistência sintética | Serviço `AreasService` EXISTENTE sem edição; schema `CollectionArea.cep String?` EXISTENTE | `tests/e2e/hf-ui037-location.spec.ts` com `createAreaFixtureClient` | C (testes somente), sem migration |
| Revisão do contrato atual | `specs/037-localizacao-endereco-opcional/contracts/area-optional-address.openapi.yaml` | Unit/contract validates patterns e exclusão de chaves | C, spec própria |
| Provas de UI | `src/components/areas/area-form.tsx` e `tests/e2e/hf-ui037-location.spec.ts` | sugestões, point/draft, screenshot no padrão CI | C |
| CI/Preview e shell | Somente leitura; A e coordenador são writers | Run oficial e diagnóstico factual de #46 | C observa, não edita |

**Critério de revisão:** nenhum PASS sem processo concluído, artefato visual existente e HEAD exato. Os previews falsos/guards herdados não foram alterados. A falha do cenário de navegação 320px texto 200% permanece em A e pode manter CI global FAIL mesmo com correção UI-07 local aprovada.

## Revisão de paridade após primeiro run de CEP

A suíte Unit identificou validador vivo ainda vinculado ao contrato IMP-003 original. Contrato de operação atual deve ser a composição da base fechada IMP-003 **mais** o delta CEP autorizado 037: não remover regras de permissões, privacidade, campos fechados e cover. A atualização de `tests/unit/area-openapi-parity.test.ts` altera somente a fonte de validação do teste corrente, mantém exemplos de 003 inalterados e adiciona CEP nulo nos exemplos em memória. Resultado do run 41251238442 pertence exclusivamente ao SHA antigo 91565eb; corrigir depois validar novamente.

## Compatibilidade TS de entrada de área

Ao admitir campo novo opcional na API, o tipo `CreateAreaInput` não pode obrigar todos os consumidores internos legados a fornecer `cep:null`. O parser sempre retorna objeto com valor explícito normalizado, mas o parâmetro de serviço e fixtures TypeScript aceitam omissão via `cep?:string|null`. O runner mostrou essa incompatibilidade no Build de 506cb57 (TS2345), não na paridade Unit; a correção é estritamente de tipo e não exige migration ou mudança de permissões.

## Fechamento HF-UI-044-CLOSE-C — PLAN → IMPLEMENT → REVIEW (2026-11-01)

**ANALYZE:** constatou-se documentação desatualizada de T010/T011/T017, embora o código de persistência opcional de CEP já estivesse testado no SHA `63925b3639f3eec1dd4bd737f7be7adb881c83eb`. Havia diferença material entre capturas `frontend-areas` arquivadas e capturas dedicadas `hf-ui037-location` ausentes do ZIP. Não foi constatada necessidade de patch novo de produto, schema, testes ou pipeline.

**PLAN:** corrigir exclusivamente a rastreabilidade em `specs/037-localizacao-endereco-opcional/**`, manter a PR #48 Draft; preservar a responsabilidade C pelos contratos aditivos já coordenados, sem tocar nas branches A/B e sem executar CI hospedada manualmente. Distinguir explicitamente SHA de código testado de commit documental de fechamento.

**IMPLEMENT:** marcar T010, T011 e T017 como concluídas nos alcances comprovados e atualizar spec, evidências, quickstart/contrato histórico e PR. Nenhuma mudança em `src/**`, `tests/**`, `prisma/**`, `.github/workflows/rc-review.yml`, `vercel.json` ou dependências.

**REVIEW:** [run 41251980306 / tentativa 1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306) `completed/success` no `CODE_SHA_TESTED=63925b3639f3eec1dd4bd737f7be7adb881c83eb`; [artefato 13062501328](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306/artifacts/13062501328) e journal confirmam 15/15 gates com `exitCode=0`, 224 E2E PASS, oito subsets de endereço no contrato e no teste E2E. Os arquivos `hf-ui037-location` específicos não constam do ZIP; capturas de `frontend-areas` têm procedência, dimensões e escala documentadas em `implementation-evidence.md`. O commit documental posterior requer verificação de equivalência estática e não recebe automaticamente os 15 PASS.

**Paradas preservadas:** geocodificador real `NOT_CONFIGURED/NOT_RUN` (fornecedor, taxa global, cache, atribuição, licença, retenção/privacidade); QA independente/composição A+B+C, homologação humana/acessibilidade/dispositivo real, merge e deploy `PENDING`. T010/T011/T017 são fechamento **da implementação sintética e rastreabilidade**, não desses aceites. Não empregar serviço externo, migration ou deploy para encerrar a documentação.

## CLOSE-PARALLEL-02 / PROMPT03 — plano focal C (2026-11-01)

Estado: EM_ANDAMENTO. Agente nativo real `/root/c_capture`, worktree exclusiva
`hf044-c`, branch local `codex/hf044-c-local-20261101`, base funcional `6c61056f`
e setup `1b6a2d3`. Mandato atual adota o contrato comum do pacote `22bb9c1b`.
RECOMENDACAO técnica: corrigir somente instrumentação do teste existente e docs.
CF-PRD-FR-005 continua referência de rastreabilidade EM_REVISAO; a decisão UI-07
de Pedro em `972f9b00` governa o recorte, sem promover o catálogo histórico.

ANALYZE somente leitura: 9 FR/SC e 19 tarefas históricas; nenhuma contradição
constitucional material. C1 HIGH: T015 registra outputPath/attach, mas os globs
reais leem a pasta durável e não fecham QA-04. C2 MEDIUM: os quatro documentos
sanitizados33d estão na C local c7b, porém ausentes da base composta. Nenhuma
remoção entre suítes foi observada. Não atribuir causa retrospectiva.

PLAN: acrescentar T020–T024 preservando histórico; coletar fonte renderizada por
CDP em elementos textuais, escala medida, SHA/tree, run/attempt, máscara e hash
PNG; copiar PNG+JSON imediatamente, com COPYFILE_EXCL e nomes aceitos pelos
globs oficiais. Preservar o teste de três origens e casos de concorrência/CEP.
Transportar somente os quatro blobs idênticos33d/c7b, sem brutos e sem repetir
a limpeza21. Executar contraprova sintética da persistência e não sobrescrita;
runtime real e auditoria do ZIP final após outras suítes cabem ao coordenador.

Segunda ANALYZE após PLAN: T020–T024 cobrem as duas lacunas, fonte/proveniência
e validação terminal. Sem nova entidade, API, schema, Next.js API, provider ou
mudança de produto. Não executar setup-plan que sobrescreve plano histórico.
Skills analyze/plan/tasks/implement foram aplicadas manualmente; prereq
paths-only executado com contexto de feature por processo e validação manual
dos três artefatos para manter análise somente leitura. Não é execução da CLI.
Não há checklists037 nem `.specify/extensions.yml`; nenhum hook é aplicável.
Constituição e ignores existentes preservados. Próxima revisão: diff, sintaxe,
tipos focais, contraprova e handoff; aceites humanos/operacionais permanecem.

### IMPLEMENT → REVIEW C / estado de handoff

Implementados T020/T021 e T023: cópia exclusiva durável e metadados sanitizados;
quatro docs33d/c7b transportados por identidade dos blobs, sem limpeza de originais.
T022: função real de cópia extraída por AST TypeScript executada com bytes
sintéticos, 2 testes PASS (sobrevivência à remoção da saída e EEXIST); não é
runtime UI037. Fonte completa parseada; helpers e loop alterado passaram
typecheck estrito focal local. Lint dos dois arquivos PASS; warning de React
detect sem pacote na worktree não foi convertido em falha ou prova de runtime.
Scope/whitespace/JSON/blobs/globs PASS. Autorrevisão, não revisão independente.
T024 continua aberta para o coordenador:15 gates, quatro arquivos no ZIP depois
das suítes posteriores, digest/CRC/hash/dimensões e inspeção real das imagens.
Estado deste plano focal: AGUARDANDO_REVISAO/runtime. Publicação só coordenador.

### Rodada1 / revisão parcial de artefatos UI037

ANALYZE/REVIEW pós-runtime: ZIP41351237110/1 baixado pelo coordenador foi lido
integralmente pelo worker C; digest/CRC e4PNG/JSON UI037 conferidos,2imagens
inspecionadas. Registro somente em docs037; nenhum patch de produto é necessário
para a preservação observada. Estado UI037_CAPTURE_ARCHIVED_PARTIAL: E2Efalhou
em outro cenário de atribuição de mapa e5gates posteriores não rodaram; T024
continua pendente da próxima candidata e de prova após suítes posteriores.
Recibo `evidence/close02-round1-ui037.json`; review independente continua separado.
