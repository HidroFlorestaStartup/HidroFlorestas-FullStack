# Evidências de implementação — concorrência e IHFR

**Data**: 19/10/2026. **Fluxo**: PLAN → EXECUTE → REVIEW / Spec Kit022.
**Baseline**: `3f1eba566a1f4f01e469f75a6c174fd2e602a9d2`.
**Estado**: correção A comprovada no reprodutor; causa histórica A/duas chamadas e intermitência histórica B permanecem inconclusivas. Quinze gates PASS no commit inicial; a entrega depende também do journal do SHA final, identificado no recibo externo do PR16.

## PLAN — autorização, isolamento e contratos

DECISAO_CONFIRMADA: pedido atual do usuário autoriza investigar, implementar, testar, commitar e abrir PR; proíbe merge, deploy e produção. Responsável nominal não especificado.

EVIDENCIA_IMPLEMENTACAO: branch/worktree próprias `022-fix-concurrency-ihfr`, sob `.worktrees/` da RC. RC permanece em `0f669b7`; arquivos preexistentes da demo e três ZIPs não foram incorporados. PR14 permanece em `c076ec17f668ee7cf632a6bff0c71df4e7cd2564`, PR15 em `3f1eba566a1f4f01e469f75a6c174fd2e602a9d2`.

Cluster novo IMP006, PostgreSQL17.10, porta55426; LOCALAPPDATA aponta para `.accounts-validation/runtime` desta worktree, com diretório/marker/credencial próprios. Nenhum runner acessou o banco da demo55427; nenhuma operação foi enviada a banco/provedor produtivo. Sem links de dependências para o checkout executado pela demo.

Contratos: [preservados](contracts/preserved-contracts.md), specs006/016 e ADR-0001. Sem migrations, mudança de quota, autorização, DTO, regra científica, manifesto, asserção histórica, orçamento de escritas ou valores de timeout/backoff. Nova branch adicionada ao workflow oficial existente e explicitamente desabilitada em `vercel.json` antes do push.

## EXECUTE — Frente A

### Causa demonstrada e limite histórico

EVIDENCIA_IMPLEMENTACAO: [comparação original](evidence/historical-comparison.md) confirma erro histórico com duas chamadas; [30repetições](evidence/original-two-request-repetitions.json) do cenário original passaram. O [controle de uma colisão](evidence/cover-regressions.txt) comprova que retry após commit vencedor vê a quota e retornaRATE_LIMITED. Não há prova de snapshot permanentemente antigo ou exceção desconhecida.

O novo [reprodutor determinístico](../../tests/integration/area-covers-contention.test.ts) usa **quatro operações em três ondas**, mantendo dois escritores ativos por onda. A vítima lê os estados7/8/9; concorrentes distintos confirmam8/9/10 antes de cada tentativa de commit/escrita da vítima. Cada retry tem snapshot novo. As três tentativas abortam com40001; no INSERT, Prisma embrulha o erro comoP2034; no COMMIT, retornaDriverAdapterError. Não há códigos falsos nesse reprodutor nem sleeps que decidam a ordem.

**Causa comprovada nesse schedule**: o gate de quota é lido antes do terceiro commit concorrente; quando o terceiro conflito encerra o orçamento, a quota já está cheia, mas o helper antigo sanitiza o conflito sem consultar esse estado. Isso produzINTERNAL_ERROR em vez da recusa contratual. **Não prova a origem dos três conflitos no incidente histórico de apenas duas chamadas.**

### RED/GREEN e correção mínima

- [RED](evidence/red-covers.txt): serviço original do SHA15, mesmos dois cenários/asserts, **0PASS/2FAIL**, ambosINTERNAL_ERROR versusRATE_LIMITED; três40001 reais e contagens finais10/40 em ambos. Serviço original foi usado somente na worktree própria e os bytes da correção restaurados em `finally`.
- [GREEN](evidence/green-covers.txt): **2/2PASS**, três escritas, duas esperas e uma consulta final; **10tentativas/40jobs**. Inclui DriverAdapterError/40001 em commit e P2034/40001 durante INSERT.
- [Regressões](evidence/cover-regressions.txt): **47/47PASS**, incluindo orçamento, replay, divergência de preset, falha técnica final, ausência de quota, revogação, flag desabilitada, revisão, erro arbitrário, rollback, jobs e demais operações de capa.

A correção em `images/service.ts` adiciona callback opcional somente ao pós-preset de `initiate`. Depois do terceiro conflito reconhecido, faz **uma transação adicional apenas de consultas, sem retry**. Reusa `eligibleUpload`: autorização/estado, disponibilidade, replay, revisão e quotas conservam precedência. Replay exige preset compatível. Se ainda elegível sem replay, ou se essa consulta falhar tecnicamente, mantémINTERNAL_ERROR. Nenhum ticket/assinatura é criado por mera elegibilidade; não há quarta tentativa de persistência nem nova chamada de preset.

Os testes de guard usam conflitos injetados somente para controlar condições de reautorização/replay/falha; não são a evidência causal do40001. A primeira versão da fixture tentou rebaixar o OWNER e violou o trigger `imp003_check_owner`; a fixture foi corrigida para ADMIN contextual, mantendo a expectativaFORBIDDEN. Sem alterar o trigger ou domínio.

### Riscos residuais A

A consulta excepcional pode consumir nova aquisição/maxWait15s/timeout30s já existentes: a latência total desse caminho aumenta. A transação executa somente consultas, mas não usa declaração PostgreSQLREAD ONLY. Nova contenção ou indisponibilidade ainda pode terminar emINTERNAL_ERROR sanitizado. O incidente histórico de duas operações continua inconclusivo.

## EXECUTE — Frente B

EVIDENCIA_IMPLEMENTACAO: artefatos FAIL/PASS de mesmoSHA/snapshot estão discriminados na [comparação](evidence/historical-comparison.md). Fixtures são commitadas antes do servidor, schemas são próprios, JWT é passado ao servidor/driver, workers1/retries0. Nada disso comprova que o CI falho consumiu corretamente a página/fixture; faltam seus logs de navegação/servidor.

O [runner oficial](evidence/ihfr-official.txt) passou os seis testes com diagnóstico em 29,5s, sem mudança de asserções, readiness, retries, workers ou timeouts. O diff acrescenta forwarding de linhas Next sanitizadas e, quando um teste falha, status/URL sem query, erros de console, scripts falhos e metadados limitados de visibilidade do DOM. Registros e tamanho das mensagens são limitados. Sem cookies, headers, corpos de resposta ou traces brutos. Testes de sanitização cobrem segredo dividido em chunks, cookie e última linha parcial. O [caso limite de linha longa](evidence/logger-boundary.md) foi reproduzido RED e corrigido GREEN no logger novo, descartando toda a continuação até newline; oito testes de diagnóstico PASS.

Os [controles artificiais](evidence/ihfr-controls.txt) ficam em `tests/experiments/` e configuração separada, executados somente com `--initialization-controls`. Resultado: dois RED deliberados sem JavaScript e dois PASS, em 16,0s. Não aquecem os seis testes originais nem são confundidos com gates de aceitação. As expectativas de visibilidade dos controles sem JavaScript permanecem RED; os dados de domínio não são alterados.

Observação confirmada: sem JavaScript, a região IHFR chega no DOM sob ancestral `DIV#S:1`, com `hidden=true`, `display:none` e retângulo0×0. Com JavaScript habilitado, a região tem retângulo visível e nenhum ancestral oculto nessa cadeia. Sessão inválida/ator ausente redirecionam para/login e removem a região. Esses controles discriminam sintomas; **não demonstram que JavaScript falhou no CI histórico**.

A hipótese inicial de que SSR implicaria independência de JavaScript foi corrigida com essa evidência. O primeiro controle positivo também encontrou seleção parcial ambígua entre diagnóstico e gerenciamento; somente o novo experimento passou a usar nome exato. As seleções/asserts históricas não foram alteradas. Logs intermediários permanecem no diretório local ignorado, sem substituir os resultados finais.

**Conclusão B: INCONCLUSIVA, sem correção funcional especulativa.** Preservar futura evidência de uma falha natural no CI; um PASS posterior não prova eliminação da intermitência.

## Validação local e limites

| Verificação | Resultado |
|---|---|
| Reprodutores reais contra baseline | RED2FAIL esperados, sem perda/duplicação,10/40 |
| Mesmos reprodutores com correção | GREEN2PASS |
| Regressões focais de capas/transações |47/47PASS |
| Repetição original/duas chamadas |30/30PASS; histórico inconclusivo |
| Unitários oficiais |298/298PASS; e-mail17/17PASS; execução final após correção do logger |
| Typecheck |PASS |
| Lint |PASS, três warnings preexistentes |
| Integração integral local, modoSchema |214/218PASS; quatro recusas de guard; não vale como gatePASS |
| Integração integral local, modoRegressionIMP006 |215/219PASS; quatro testes públicos legados falham por coluna de conta ausente. Não vale como gatePASS |
| CI inicial, commitbace4be |15/15gates PASS/exit0, snapshot único; integração229/229PASS e IHFR6/6PASS em34,9s; [recibo](evidence/ci-initial.json) |
| Quinze gates oficiais do SHA final |A conferir no recibo externo do PR, com journal individual |

As falhas de ambiente local não foram contornadas modificando guards/schema/configurações para obter verde. O harnessIMP006 legado prepara menos migrations no public que o harness oficial de contas; o CI usa o cluster efêmero de contas com as14migrations. A primeira tentativa de Unit no sandbox falhou antes dos testes com `uv_os_get_passwd/ENOMEM`; execução oficial fora dessa identidade restrita passou. Uma captura PowerShell5 foi interrompida por avisoNO_COLOR/FORCE_COLOR; seu resultado não foi usado como evidência do produto.

## REVIEW e entrega

- [Revisor independente A](evidence/review-concurrency.md): favorável, sem achado material remanescente; riscos e limite histórico explícitos.
- [Revisor independente B](evidence/review-ihfr.md): achados metodológicos corrigidos, sem P1/P2 material remanescente; causa histórica inconclusiva.
- [PR16](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16), empilhado sobre PR15, aberto em draft. [`@codex review` solicitado](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/16#issuecomment-6276254802); resposta/disponibilidade será registrada no recibo, sem inventar aprovação.
- Conferir15gates no mesmo SHA final e comparar SHA/snapshot/digest dos artefatos. Recibo final no PR evita que a incorporação do próprio journal crie circularidade de SHA.
- Sem merge, deploy, operação em produção, alteração da demo, PR14/15 ou `docs/raw/**`. Não há nova decisão científica/produto/arquitetura que exija editar registros canônicos globais.

O IHFR permanece **CONTRATO_EXPERIMENTAL**, **VALIDACAO_CIENTIFICA_PENDENTE**, **SUJEITO_A_RECALIBRACAO**, **NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO**.

Conferência final do diff local: `git diff --check` PASS;23arquivos de evidência/spec e27links locais conferidos; testes históricos IHFR com corpos idênticos após remover imports; configurações oficiais intactas; cinco digests das cópias publicadas PASS. Varredura focada não encontrou JWT, URL PostgreSQL com credencial ou chave privada nos artefatos da funcionalidade. Typecheck e lint novamente PASS após o último delta do logger. O journal final fica no PR; nenhum PASS posterior será apresentado como prova causal dos históricos inconclusivos.
