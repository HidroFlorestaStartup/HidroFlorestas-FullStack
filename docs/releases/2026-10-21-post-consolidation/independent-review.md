# Revisão independente — HF-POS-20261021-01

## Parecer e escopo

**PASS para publicar os recortes documentais e de configuração revisados, mantendo a navegação móvel local com quatro FAIL e a causa sob triagem.** A revisão encontrou um P1 no artefato intermediário de frontend e confirmou sua correção antes do primeiro commit. Não foi demonstrado P0 neste recorte. Este parecer não aprova merge, Production, o piloto ou o contrato científico.

Revisor real: `/root/operacao_vercel`, distinto dos autores backend/frontend e do coordenador responsável por CI/guard. Os arquivos operacionais de autoria deste mesmo agente **não fazem parte da revisão independente aqui declarada**; a coordenação os examinou separadamente.

### Snapshots examinados

| Recorte | Commit local do autor | Produto testado | Limite da revisão |
|---|---|---|---|
| Plano, workflow e guarda Vercel | `13e07c0fdb536e56ffa8e1147e41105ee1ee00b1` | Base `b1f83cf`; nenhum teste de produto alterado | Diff e configuração comparados integralmente |
| Frontend/UX | `21b5884cfbd15ce794295fdd00cfc2f07a116743` | `b1f83cfa8e52dd25c6246c584a576553c5e9e131` | Relatório, testes originais, projeção Playwright, manifesto, unitários e cinco imagens |
| Backend, históricos e recuperação | `1608d523c89d2440dac45d2a79bc9e1325b1315e` | `b1f83cfa8e52dd25c6246c584a576553c5e9e131` | Relatório, nove projeções, 14 hashes de migrations, logs de resultados e limites de recuperação |

Os commits acima identificam a revisão dos autores locais. Cherry-picks/reconstrução por Git Data API podem ter outros SHAs mantendo os mesmos blobs; o recibo de publicação da coordenação deve vincular a árvore efetivamente enviada. Nenhum link remoto desses commits locais é presumido.

## Achados e resolução

| ID | Severidade | Arquivo | Evidência e tratamento | Estado |
|---|---|---|---|---|
| RV-001 | P1 | `evidence/frontend-public/playwright-results.json` intermediário | O JSON completo do reporter serializava ambiente do executor, incluindo informação privada. O autor substituiu o artefato por projeção fechada, retirando integralmente config/env/stdout/stderr/anexos e metadados arbitrários. Manifesto recalculado; nenhuma versão bruta entrou no histórico Git examinado. | PASS, resolvido antes do primeiro commit |
| RV-002 | P2, triagem local | `tests/e2e/frontend-mobile-navigation.spec.ts`, resultado em `evidence/backend-execution.json` | Quatro casos falharam ao permanecer em `/logout` durante a asserção original de 5 s para `/login`. Uma tentativa por caso, zero retries. O relatório preserva FAIL; causa de produto, configuração ou harness ainda não estabelecida neste snapshot. | ABERTO; não declarar navegação integral aprovada |

RV-002 registra uma falha real de teste; a classificação P2 prioriza a triagem e não comprova um novo defeito de produto nem a causa histórica INV-004. O agente frontend conduz a contraprova focal, sem repetir a suíte para obter verde. Valores privados, nomes de credenciais e conteúdo bruto do primeiro artefato não são reproduzidos neste relatório.

### Verificação da correção de RV-001

`EVIDENCIA_IMPLEMENTACAO`: a projeção final contém somente `schemaVersion`, `evidenceKind`, `productHead`, `testFile`, `stats`, `cases` e `redaction`. A travessia do JSON não encontrou objetos `env`/`config`, `stdout`, `stderr` ou anexos. Os sete casos continuam `passed`, retry 0; horários, duração e nomes correspondem aos resultados lidos antes da projeção. Hashes dos **44 arquivos** listados no manifesto foram recalculados independentemente e coincidem. O hash do teste original também coincide.

A checagem local comparou, somente em memória, valores sensíveis conhecidos do ambiente com os arquivos textuais candidatos; retornou zero correspondências, sem imprimir os valores. A checagem do histórico do caminho do JSON, antes do commit, retornou zero entradas. Isso verifica a correção concreta encontrada; não é certificação universal de ausência de qualquer segredo.

## Configuração de integração

A comparação programática do commit `13e07c0` com a base confirmou:

- `vercel.json` preserva exatamente as **23 regras anteriores** e acrescenta somente `docs/pilot-readiness-20261021:false`; `development:false` permanece.
- `.github/workflows/rc-review.yml` acrescenta essa branch apenas ao filtro de push e à condição do job.
- Permissão `contents:read`, Windows, Node `24.19.0`, Actions fixadas, timeout, instalação pelo lockfile, coleta de artefatos e runner oficial permanecem iguais.
- `scripts/rc-review-validation.ps1` continua com os **15 gates** originais e preserva as precondições de cluster próprio/Windows/CI; não houve redução de assertions, retry ou timeout.
- `src`, `tests`, `scripts`, `prisma`, `package.json`, `package-lock.json` e `docs/raw/**` não mudaram nesse recorte.

`RECOMENDACAO`: conferir no GitHub que o SHA efetivamente publicado iniciou e concluiu o workflow. O histórico de `e44711d`/PR #25 não é herdado. Esta revisão anterior à publicação não declara um resultado de CI que ainda não observou.

## Frontend e qualidade da prova

Foram confrontados [relatório frontend](frontend-ux.md), [manifesto](evidence/frontend-public/manifest.json), [projeção Playwright](evidence/frontend-public/playwright-results.json), configuração executada e resultados unitários.

Os sete testes públicos originais têm uma tentativa cada, sem skip/flaky, com cobertura em 320/375/768/1440 px, paisagem e fonte raiz 200%. O teste distingue essa ampliação de zoom nativo. A evidência usa `fullPage:false` e `physicalDevice:false`; CTA >=44 px, hit test, reflow, foco e qualificações IHFR são assertions explícitas. O hash do arquivo original `tests/e2e/frontend-landing.spec.ts` é `e87120de0e9f608a72e2e7013d00c6ec0a91c8d3d778d0bfa1eb989cf815ee7a`.

A revisão abriu independentemente **cinco das 21 imagens** inspecionadas pelo autor: hero 320 px/texto 200%, qualificações IHFR ao final 320 px/texto 200%, hero 375 px, hero 768 px e hero 1440 px. Não demonstraram novo defeito visual; indicador Next dev e limites do viewport não foram convertidos em falha de produção.

O resumo dos dez processos unitários soma **86 casos PASS**, todos exit 0, sem skip. O relatório conserva a limitação do launcher inicial e não soma entradas de arquivos a casos individuais. Testes unitários não comprovam navegação autenticada no browser ou acesso real a tiles.

Os resultados conservam INV-003/`settleTransitions` como `INCONCLUSIVO` e OBS-001 como contraprova específica não executada; não afirmam homologação integral de mapa, IHFR, administração, dispositivos ou leitor de tela.

## Backend, histórico e recuperação

Foram confrontados o [relatório backend](backend-database.md), [recibo de execução](evidence/backend-execution.json), [projeção histórica](evidence/backend-historical.json), [proveniência do ZIP](evidence/backend-upload-provenance.json), [cadeia de migrations](evidence/backend-migrations-source.json), [recuperação sintética](evidence/backend-synthetic-recovery.json) e quatro projeções de logs.

A contagem publicada é coerente com os resultados: **402 + 17 unitários**, **36 testes de capas/contenção**, **37 testes de migrations** e **6 casos IHFR**, todos PASS. Os 86 casos focais frontend se sobrepõem ao conjunto geral e não são somados como casos novos. Linux/PostgreSQL **16.15**, cluster próprio em loopback, é explicitamente separado da CI oficial Windows/PostgreSQL 17.

O revisor recalculou independentemente nome, bytes, SHA-256 e Git blob de todas as **14 migrations** a partir do código; 14/14 coincidiram. O commit backend acrescenta somente dez arquivos de documentação/evidência; não altera produto, scripts, assertions, timeout, retry ou histórico de migrations.

### Histórico sem causalidade inventada

A projeção distingue run, attempt, head e artifact de INV-001/002/005. No INV-001, attempt 1 FAIL e attempt 2 PASS têm o mesmo head e snapshot; isso não fecha causa. O cenário antigo INV-002 de duas chamadas permanece distinto do contrato de quatro operações/três ondas de Spec022. Os seis 404 históricos de páginas no INV-005 não foram confundidos com os dois 404 esperados de API no ensaio atual. INV-004 mantém sua reprodução dedicada atual como NOT_RUN; a contraprova anterior não é contada como teste novo.

A revisão leu as projeções históricas e a análise de código. Não rebaixou o ZIP fornecido a base executável e não reexecutou os ZIPs de artifacts. Os digests/CRC dos ZIPs foram obtidos pelo autor na recuperação conectada; este revisor não fez um segundo download independente desses arquivos. As lacunas dos `error-context.md` históricos ausentes e de instrumentação causal estão explícitas.

### Recuperação: o que foi efetivamente validado

O procedimento documenta cluster descartável próprio, role, bind e porta; source/target vazios verificados; baseline formal antes do `migrate resolve` inicial; `migrate deploy/status`; fixtures artificiais; dump custom e restore com `--exit-on-error`. Não há uso de `db push`, reset ou destino hospedado.

O revisor comparou as estruturas source/restored do JSON: são iguais para **26 tabelas**, **52 linhas totais**, hashes MD5 por tabela, **14 registros de migrations** e **120 constraints por contagem**. O dump e o restore foram executados pelo autor; este revisor não realizou um segundo restore nem acessou um banco hospedado.

O recibo registra **FAIL de igualdade textual do schema**: oito CHECKs foram reexpressos após reparse; as definições de origem/destino e ambos os hashes estão preservados. A análise não converte contagem igual de constraints em certificação de equivalência semântica total. ACLs/roles, PITR, ativos externos, cofre de segredos e RPO/RTO operacional continuam NOT_RUN. O tempo de 0,232 s da amostra mínima não é apresentado como RTO do piloto.

### Falha móvel adicional

O log da extensão móvel é identificado por SHA-256 `c5d193b7dbc2f8207cbb42fcd98ae63717da96693121da0a9d2c71f1fcc2d4f5`; o recibo marca exit 1, **0 PASS/4 FAIL**, um worker e zero retries. As 92 imagens e quatro geometrias produzidas antes da falha não transformam os casos em PASS.

O revisor confrontou a asserção final original de URL e o contrato CSRF. A hipótese de origem local normalizada por Next ainda depende da contraprova da frente frontend; este snapshot não declara causa concluída. O resultado local precisa permanecer na síntese final e em G4, mesmo que CI ou uma configuração corrigida obtenham PASS posteriormente.


## Estado dos gates e condições preservadas

| Aspecto | Estado nesta revisão | Limite |
|---|---|---|
| Deltas de configuração e escopo | PASS | Inclusões focais sem alteração de produto |
| Integridade/proveniência dos artefatos frontend | PASS | Projeção redigida e hashes verificados |
| RV-001 de privacidade | PASS | Correção antes de commit/publicação; não reproduzir bruto |
| Recibos backend e cadeia de migrations | PASS documental | Hashes locais e limites conferidos; execuções pertencem ao autor |
| Recuperação sintética | PASS limitado / schema textual FAIL | Dados/histórico iguais; oito CHECKs reexpressos; não é recuperação hospedada |
| Navegação móvel local adicional | FAIL | Quatro casos; causa em triagem, RV-002 aberto |
| G2 — CI oficial do SHA publicado | NOT_RUN por este revisor | Recibo próprio do coordenador/GitHub; nenhuma herança de PASS |
| Causa histórica completa INV/OBS | BLOCKED | Preservada como inconclusiva quando falta prova causal |
| G3–G5 operacionais e aceites | BLOCKED | Este parecer não concede configuração, banco, recebimento, aceite ou Production |
| Revisão externa Codex | NOT_RUN por este revisor | Somente resposta real no GitHub pode certificar a revisão externa |

A síntese e o preflight da coordenação foram lidos ainda antes da publicação. Distinguem corretamente `protected:false` informado pelo endpoint da branch, lista de rulesets vazia e 403 no endpoint de detalhe da proteção; não houve mudança de proteção. A revisão solicitou que a síntese incorporasse a nova falha móvel, recebida depois do primeiro rascunho. Resultados de CI, revisão externa ou comunicação posteriores devem ser registrados pelo coordenador com SHA/recibo próprios.

As quatro qualificações permanecem: `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

Não foi repetida uma bateria funcional apenas para esta revisão documental. A verificação independente confrontou fontes, deltas, hashes, contagens, instruções e capturas; a CI oficial e a revisão Codex são provas distintas e devem receber seus próprios recibos. A coordenação deve manter bloqueios e achados futuros no PR, sem reescrever estes fatos como se estivessem disponíveis antes.

## Adendo de revisão — 22/10/2026, 00:22 UTC

**RV-002: incompatibilidade de origem demonstrada no contexto local; NAV4 permanece FAIL.** Este adendo revisa o commit frontend `8264d7bc8b1d1e625f968b212ef7b06d9eda9014`, posterior ao snapshot inicial acima. O resultado histórico de quatro falhas e as conclusões anteriores não foram reescritos.

O revisor leu os recibos [HTTP](evidence/frontend-nav4/frontend-logout-http-probe.json), [browser](evidence/frontend-nav4/frontend-logout-browser-probe.json) e [NAV4](evidence/frontend-nav4/nav4-result.json), além do adendo frontend, código CSRF, teste unitário existente e configuração do runner oficial. No mesmo contexto IMP006/porta 3000, sem cookie, mudar apenas `Origin` de `127.0.0.1` para `localhost` mudou a resposta de 403 `FORBIDDEN` para 200 `success:true`. Um novo browser sem sessão reproduziu o 403, a permanência em `/logout` e o mesmo alerta. A fonte existente documenta a normalização loopback de Next e o ingresso local explícito usado pelo runner oficial.

Essa combinação sustenta a classificação **incompatibilidade de configuração do ingresso local** e explica o mecanismo de bloqueio reproduzido. O limite está correto: os quatro casos originais não capturaram status HTTP/cookies/sessão; os códigos pertencem à contraprova posterior. Os POSTs sem sessão não validam a jornada autenticada completa. Não houve patch, desativação de CSRF, alteração de guard, timeout ou retry nem repetição de NAV4.

Foram abertas independentemente duas capturas: o alerta de logout a 375 × 900 e o último controle a 320 px/texto 200%. A primeira corresponde ao recibo de erro; a segunda preserva o indicador Next dev e o foco visível, sem esconder o contexto. O revisor recalculou **22/22 hashes** dos arquivos retidos no manifesto; a lista contém 92 capturas originais, 68 hashes distintos e oito originais selecionados. Não foi alegada segunda inspeção das 68 imagens pelo revisor.

A travessia dos JSONs não encontrou objetos de ambiente, headers, cookies, stdout/stderr ou anexos arbitrários. A comparação em memória de valores sensíveis conhecidos com os textos retornou zero correspondências; valores não foram impressos. O hash do teste original corresponde ao informado no recibo.

**Parecer do adendo: PASS documental.** A triagem de RV-002 avançou de hipótese para mecanismo reproduzido no contexto local. A aprovação da navegação completa continua pendente: **0 PASS/4 FAIL originais**, runner oficial NOT_RUN neste momento, INV-003/`settleTransitions` inconclusivos e G3–G5 sem liberação. Nenhuma nova bateria funcional foi executada pelo revisor.

## Adendo de fechamento — 2026-10-22 00:55:57 UTC

**PASS para o snapshot documental examinado; CI e revisão externa confirmados exclusivamente para o candidato `131ade347258c7820c7a89989ab851769197b486`.** Foram lidos `final-report.md` (SHA-256 `f88002cec52919424610c56e859103742bee8821adfefe6c7008f393a57a6cd0`) e `evidence/publication-receipt.json` (SHA-256 `832c1f13e55f453e0f371122f4f0510e4e36cda6f4ff12adbe9e779fc890889c`) na integração, ainda antes do commit documental de fechamento. Os links relativos dessa versão resolvem. Estes hashes identificam o snapshot efetivamente revisado, não conteúdo posterior ainda não examinado.

### CI e Codex conferidos por este revisor

- As consultas conectadas ao [run 39699435699](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39699435699), seus jobs da tentativa 1 e artifacts confirmam o head acima, conclusão `success` e job `119564787181`, de `2026-10-22T00:23:54Z` a `2026-10-22T00:45:58Z`.
- O ZIP local foi confrontado com o artifact oficial `12392364807`: **26.854.109 bytes**, SHA-256 `b4fe1d31a3f59d3c4c329d6099dfc95d887c9c09a8c4349119d86bd1e2c0225e`, **735 entradas**, CRC íntegro, sem caminho inseguro ou symlink. São 451 PNGs e 268 JSONs; isso não significa inspeção visual de todos os arquivos.
- As **15 entradas** do `results.jsonl` dentro do ZIP coincidem exatamente, nos campos publicados, com o recibo da coordenação: nomes únicos, PASS, exit 0 e snapshot `47acca4bbc5b2f71368e8b2dfe1d66a5d12e6ff9ca13720e954d3fa0a876aee5`. Os resumos dos logs confirmam Unit 402 + 17, Integration 231, Migration 37, Contract 6, R1 17, E2E 220, Https 2, Deletion 3 e Ihfr 6. Não houve nova execução de suítes pelo revisor.
- Foram lidos diretamente o [recibo Codex 6329641230](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6329641230) e o [summary 6329614420](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/27#issuecomment-6329614420). O estado estruturado identifica o SHA completo, `status:completed`, `has_any_findings:false` e `has_unresolved_findings:false`, concluído em `2026-10-22T00:26:15.726939Z`. É revisão de código; o campo de revisão de segurança não declara execução.

A síntese conserva as quatro falhas NAV4 locais, a contraprova de ingresso, as oito diferenças textuais de CHECKs, os históricos inconclusivos e os bloqueios G3–G5. O sucesso do candidato não foi usado para reescrever esses fatos.

### Amostra visual e limite de escopo

Este revisor abriu **dez PNGs originais do CI**: quatro de administração e seis de IHFR, com seus dez metadados. Todos correspondem ao candidato, `fullPage:false`, `physicalDevice:false`, fonte raiz 32 px/texto 200%, largura documental igual ao viewport e `scrollX:0`. A lista exata foi encaminhada à frente frontend para seu recibo de inspeção oficial. Não foi demonstrado achado material nessa amostra; **isso não é declaração de ausência geral de problemas visuais**. Os recortes longos e rolados não mostram necessariamente toda uma região ao mesmo tempo e não constituem aceite humano.

A observação de quebra da CTA de drafts pertence à inspeção da frente frontend, fora dessas dez capturas. Deve conservar sua evidência e classificação próprias; este parecer não importa automaticamente requisitos de quebra de palavras de outra spec nem omite a observação por existir CI PASS.

### Política aplicável ao próximo head documental

A leitura de G2 da missão, `AGENTS.md`, `PLANS.md` e princípio V da constituição sustenta validação proporcional de um delta **exclusivamente documental**. O plano deve vincular os quinze gates ao candidato executado e registrar no futuro head documental a sua validação própria de escopo, links, JSON, histórico, hashes, árvore remota e checks efetivos. Qualquer alteração de produto, testes, dependências, scripts, workflow ou guarda está fora desta conclusão.

O marcador `[skip ci]` é admissível nesse recorte sem atribuir PASS funcional ao novo SHA. Segundo a [documentação do GitHub](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs), checks de workflow ignorado podem permanecer Pending; uma exigência obrigatória não é dispensada e pode bloquear merge. Não há autorização para alterar proteções ou fabricar status.

**Neste adendo, checks e nova resposta Codex do head documental futuro são NOT_RUN.** O coordenador deve verificá-los após a publicação e registrar os recibos do SHA efetivo. Este parecer não antecipa essa revisão, envio de e-mail, aceite humano ou merge. Nenhuma consulta Vercel foi repetida nesta etapa.
