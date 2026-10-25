# Revisão independente — instrumento030

`EVIDENCIA_IMPLEMENTACAO`: revisão por `/root/fr015`, não autor do instrumento, em 2026-10-25. Fonte congelada pelo autor `/root/qa`; este parecer foi o único caminho delegado para escrita pelo revisor. Nenhum script, teste, configuração ou dado foi alterado pelo revisor. Resultado final: **PASS da revisão de fonte, do rerun próprio9/9 de testes puros e da revisão documental dos recibos reais do autor**, incluindo a tentativa falha preservada. O revisor não repetiu a carga territorial. O fechamento das tarefas documentais/converge e a publicação continuam sob seus responsáveis.

## Escopo e identidade

Revisão read-only de spec, plano, pesquisa, modelo, quickstart, tarefas e dos três arquivos funcionais abaixo, na worktree QA, branch `test/hf-night-baseline-20261025`, base `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`. Os hashes SHA256 observados após o teste, reconferidos em 2026-10-25T05:46:02Z, são:

| Caminho relativo à worktree QA | SHA256 |
| --- | --- |
| `scripts/local-readiness.ts` | `ad676befcb075234e0016b6d6b0f2411adaca9b94274f4303580026f314f8657` |
| `scripts/local-readiness-policy.ts` | `51990658f5db810067975271b31fe850d84352127d85246b519fa1b559668dfd` |
| `tests/investigations/readiness/local-readiness-policy.test.ts` | `ef0ecc26017b7154166fca3a0dff40debd504fdbfb2a8c424c19c3660e5d4376` |

Essas entradas novas não pertencem ao fingerprint baseline `e718647365dfb904eb13c968babdc947963541bf75f239f2f1c266e2c418fa59`. O instrumento e sua execução exigem identidade própria. A guarda Vercel da QA foi escrita pelo coordenador e teve revisão independente anterior: 27 valores false da base preservados, uma única branch própria false adicional, demais valores JSON e workflow preservados. Essa guarda não é autoria nem prova de execução030.

## Achados anteriores ao freeze e resolução

Quatro achados do revisor foram enviados ao autor antes da medição e corrigidos no freeze:

1. O laço inicial de readiness admitia duração superior aos 60s do plano e o recibo sugeria limites globais/cleanup que não eram garantidos. Agora há deadline monotônico60s, Status com timeout15s e descrição explícita de orçamento cooperativo5min: HTTP é abortável e há verificações entre etapas, enquanto operações em curso e cleanup best-effort podem estender o orçamento. Fonte, plano, pesquisa e quickstart conservam esse limite sem prometer teto absoluto.
2. Cardinalidade global e isolamento entre laboratórios permitiam uma permutação de coletas entre áreas do mesmo laboratório. `assertExpectedCollections` compara cada área com o mapa construído das fixtures e seu conjunto exato de coletas. A contraprova sintética de permutação mantém a cardinalidade global completa e é recusada.
3. Uma falha no lifecycle de setup SQL anterior ao callback podia sair como REFUSED/NOT_CREATED. O estágio agora muda antes do lifecycle e a ausência de identidade observada termina como FAIL, com `UNVERIFIED_BY_INSTRUMENT`. O instrumento não tenta apagar schema sem identidade; marker e createdThisRun continuam sob o lifecycle existente.
4. Dez hrefs pertencentes ao conjunto esperado ainda podiam repetir uma coleta e inflar a contagem de destinos verificados. A auditoria DOM exige também unicidade do conjunto, além de cardinalidade e pertinência. A validação do payload e a auditoria de hrefs são verificações distintas.

Nenhum achado residual de fonte foi identificado nesse recorte. O instante final da resposta do navegador é capturado por `response.finished()` no observador registrado antes da navegação, independentemente da continuação de `goto`; a auditoria posterior dos100/1000hrefs e as duas navegações de amostra não entram na duração de interação.

## Verificação própria executada

Comando na worktree QA, em 2026-10-25, sob token Windows autorizado por causa da falha conhecida do token restrito em `tsx/uv_os_get_passwd`:

```powershell
node --import=tsx --test tests/investigations/readiness/local-readiness-policy.test.ts
```

Resultado: **9 testes, 9 PASS, 0 FAIL, 0 skip, 0 cancelados, exit0**, duração reportada pelo Node192,7ms. Os casos exercitaram confirmação e ambiente estrito, destinos/principais/flags recusados, provedores/dotenv/CI/tiles públicos recusados, nearest-rank e entradas inválidas, associação exata por área e minimização recursiva do EXPLAIN. Nenhum browser, Next, banco ou serviço externo foi iniciado pelo revisor. Typecheck e lint não foram repetidos pelo revisor; o autor informou PASS desses checks no freeze.

## Segurança e limites da conclusão

A leitura confirmou guard puro anterior às importações com efeitos, host literal127.0.0.1/porta55427/principal owned, ausência de dotenv e provedores reais, runtime privado dentro da própria worktree e verificação pelo Status existente. O instrumento reutiliza o lifecycle com marker/createdThisRun, aplica ANALYZE/EXPLAIN somente à schema sintética, publica plano por allowlist sem SQL/parâmetros e encerra somente sua árvore Next. O navegador bloqueia origens externas e métodos mutantes. Erros de cleanup impedem PASS, e falhas anteriores ao callback não são apresentadas como ausência comprovada de criação.

Esses pontos são revisão de código; os testes puros não executaram ownership de filesystem/ACL, lifecycle SQL, falhas de migração ou encerramento de processos. O revisor não repetiu carga p95, EXPLAIN, navegador ou restore. No checkpoint inicial, os recibos reais ainda estavam pendentes; seu exame documental está registrado no complemento final abaixo, sem segunda carga.

Somente100 amostras após10 aquecimentos pertencem à estatística. p95 local de Next dev e interação automatizada são metas técnicas, não SLA de produção. Todos os hrefs serão auditados; somente dois destinos serão efetivamente abertos. Bloqueio do browser não é prova universal de ausência de egress em todos os processos ou em tentativas históricas. A tentativa E2E1 incompleta e seu tile GET possível/não verificado permanecem separados deste instrumento.

Homologação, aceite humano, acessibilidade com tecnologia assistiva real, operação de provedores e recuperação operacional permanecem fora deste parecer. IHFR conserva CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Revisão incremental após primeira execução real

`EVIDENCIA_IMPLEMENTACAO`: o autor preservou [territorial-readiness-attempt1.json](territorial-readiness-attempt1.json): FAIL em fixtures, antes de Next/browser, schema REMOVED, sem erros de cleanup registrados, duração2290,9749ms, fingerprint próprio `8bb76bf268fd92b7addfbd5b5f48de2e594599b6e366ab320c0a5cd6703a096d`. O [diagnóstico focal](readiness-fixture-diagnosis.json) do autor identifica a criação autocommit de laboratório antes da membership OWNER e o erro `IMP003_OWNER_INVARIANT`. A tentativa falha continua válida como evidência de falha do harness; não é medição p95 nem defeito atribuído ao produto.

O revisor conferiu somente o delta e a migration existente `20260914000100_area_registration_and_membership_roles/migration.sql`, linhas44–53: os triggers são DEFERRABLE INITIALLY DEFERRED e exigem, no commit, exatamente uma membership OWNER cujo userId corresponde ao proprietário do laboratório. A correção agrupa os dois laboratórios sintéticos e suas duas memberships OWNER em uma transação Prisma. Isso conserva a invariável, os dados planejados e o lifecycle existente; estágios de fixtures foram detalhados. **PASS da revisão incremental read-only**, sem teste adicional ou carga do revisor. Não foi alegado que o revisor executou o diagnóstico SQL.

Novo SHA256 do runner: `97c7684c2e38a7fcb6451b7ef6c62e71ef3b415d785b4b3ef8c5d547fccce200`. Os hashes de policy/teste permanecem os mesmos da tabela acima, à qual continua vinculado o rerun próprio9/9. Naquele checkpoint, os resultados e teardown da próxima execução real ainda estavam pendentes.

## Complemento final — recibos da execução real

`EVIDENCIA_IMPLEMENTACAO`: revisão documental de [territorial-readiness.json](territorial-readiness.json) e [territorial-readiness-command.json](territorial-readiness-command.json), recebidos após o autor encerrar sua janela exclusiva. O revisor não iniciou banco, Next ou browser nem repetiu a medição. O comando sanitizado corresponde ao quickstart:

```powershell
./scripts/accounts-local-postgresql.ps1 -Action Run -DatabaseMode Schema -Executable node -CommandArguments @('--conditions=react-server','--import=tsx','scripts/local-readiness.ts')
```

O wrapper registra exit0, início05:54:49.6941971Z e término05:55:15.5074322Z, duração25812,4906ms. O instrumento registra PASS entre05:54:51.754Z e05:55:14.940Z, duração23186,3287ms; esses intervalos medem fronteiras distintas e são compatíveis. O SHA base é08262dc, acompanhado pelo fingerprint próprio `8313f11b969379019da1e6dc84240d49b52f2792e1ad6a65b13059485184a90e`, igual antes/depois segundo o recibo. Não se transfere a ele o fingerprint do baseline.

O revisor conferiu a presença de100 durações finitas, recomputou o posto95 após ordenação e obteve exatamente57,835399999999936ms, igual ao p95 publicado e abaixo da meta técnica500ms. O recibo conserva10aquecimentos concluídos e100medições concluídas, payload integral147036bytes, alvo100áreas/1000coletas e ruído10/100. Há dois planos reais parametrizados, sem SQL/condições/parâmetros publicados, com cardinalidades observadas100 e1000. Os Seq Scans pequenos não são classificados como defeito nem comparados diretamente com o tempo HTTP.

A interação após resposta foi252,1367ms frente à meta2s; lista100, seleção por teclado,100hrefs de área e1000hrefs de coleta verificados, duas navegações reais de amostra. O browser registrou15requests externos bloqueados,0mutações bloqueadas e0pageerrors. O recibo comprova seu próprio recorte com tiles sintéticos indisponíveis, preservando os limites de automação e sem alegar egress universal nulo. Cleanup registra servidor STOPPED, browser CLOSED, schema REMOVED e0erros. A tentativa inicial FAIL e seu diagnóstico continuam publicados separadamente.

Os hashes dos três arquivos funcionais foram reconferidos e correspondem ao corte incremental acima: runner97c7684c…, policy51990658…, testeef0ecc26…. Os hashes SHA256 dos recibos examinados são:

| Recibo relativo a esta pasta | SHA256 |
| --- | --- |
| `territorial-readiness.json` | `969bd05501651a2c0c44084a8c9b5dd1f4ded2c37bdbb655208bf58e6264dc56` |
| `territorial-readiness-command.json` | `49a579e1f28d8e4a2899c0db0c824e7a9f18bac8b04a68231751ba7f0f029f47` |
| `territorial-readiness-attempt1.json` | `5c0c717f009f0e415ceb902b4274e564f9415bd3e3b919b03f67766900299c46` |
| `readiness-fixture-diagnosis.json` | `f4b78ff91ea1b0839c1fd994941395816e28745b5cca1c4d8ca005ae6e095a01` |

**PASS sem achado residual no corte examinado.** A conferência independente de fonte/aritmética/documentos e o rerun9/9 não são uma segunda execução de p95/EXPLAIN/browser/teardown. Restore local, baseline, homologação hospedada, aceite humano e ciência não recebem aprovação por este parecer.

## Reabertura P2 — observação de rejeições durante navegação

`EVIDENCIA_IMPLEMENTACAO`: após o corte acima, o Codex encontrou P2 material na PR39/HEAD `3e0066ab82a415e04342bd751254ee65cf533dfb`, thread `PRRT_kwDOVAitc86v--4u`, comentário4369900482. O waiter podia rejeitar sem handler enquanto um goto já falho levava o chamador ao finally, interrompendo cleanup/recibo. O PASS feliz anterior continua limitado ao seu fingerprint; aquela revisão não detectou este caminho. O adendo não transfere o resultado remoto do HEAD antigo ao novo delta.

Estado deste adendo: **PASS da revisão de fonte/testes e do rerun independente18/18; novo ensaio real ainda pendente**. O autor reabriu030 por converge/analyze e acrescentou tarefasT013–T016 para FR-002/FR-005 existentes, sem nova funcionalidade de aplicação.

Fonte congelada examinada, hashes SHA256 dos bytes físicos antes/depois do rerun:

| Arquivo | SHA256 |
| --- | --- |
| `scripts/local-readiness.ts` | `42426e12ae292ab61625608b2ceda9858092ca95cac6a25cace9b417a83901d1` |
| `scripts/local-readiness-navigation.ts` | `b75ba080fdfd3eb88df9adc148ec6344137bf39983d5c0f663be3338bca30985` |
| `tests/investigations/readiness/local-readiness-navigation.test.ts` | `79809dd4b6cf610bd234c59fa52cc13a2c1e05c7ecc4eddc1d42e56c5483a8a8` |
| `tests/investigations/readiness/fixtures/navigation-failure-child.ts` | `98fa448cba97e3d1aef63530b63d758c5e417bd8924471ec08f22a3bf2269bbb` |

O helper agenda os callbacks resposta→navegação com Promise.resolve().then e anexa imediatamente Promise.all aos dois ramos. Ambos permanecem observados antes de executar, inclusive se houver throw síncrono ou rejeição de finished() no callback de resposta. A primeira falha propaga ao chamador; não existe listener global de rejeições nem espera de um waiter pendente para iniciar o finally. No runner, o timestamp continua imediatamente após response.finished(), dentro do ramo da resposta. Validações, orçamento, finally e lifecycle reais permanecem intactos.

Comando próprio executado sob token Windows autorizado, sem browser/DB/rede:

```powershell
node --unhandled-rejections=strict --import=tsx --test --test-reporter=tap --test-concurrency=1 tests/investigations/readiness/local-readiness-policy.test.ts tests/investigations/readiness/local-readiness-navigation.test.ts
```

Resultado: **18/18PASS,0FAIL/skip/cancel,exit0**, duração Node2184,6925ms. São9política+9navegação: dois controles legacy strict encerram o subprocesso com exit1/recurso presente/recibo ausente; seis falhas do helper conservam erro causal e concluem remoção do marcador/escrita de recibo sintético FAIL; um sucesso comprova ordem, valor retornado e conclusão de ambos. Exit0 dos filhos protegidos significa que a finalização de controle terminou, não que a navegação simulada teve sucesso. Não foi injetada falha num browser, PostgreSQL ou Next real. O finally real foi revisado por leitura; seu novo caminho feliz será conferido somente nos recibos do autor, sem segunda carga do revisor.

### Complemento documental pós-P2

Estado final do adendo: **PASS**, sem achado residual no delta examinado. O revisor leu [territorial-readiness-p2.json](territorial-readiness-p2.json) e [territorial-readiness-p2-command.json](territorial-readiness-p2-command.json), sem executar segunda carga. O único ensaio real do autor usa Node strict com react-server e registra exit0, PASS,06:54:26.988Z–06:54:49.296Z,22307,9963ms. O wrapper abrange06:54:25.0348981Z–06:54:50.0888462Z e declara25050,1605ms; as fronteiras do wrapper incluem operações externas ao corpo da medição. Não são tempos do rerun sintético.

O recibo identifica HEAD-base `3e0066ab82a415e04342bd751254ee65cf533dfb` mais o delta funcional ainda não commitado no instante do ensaio. Seu fingerprint próprio é `46a9e540483c4e3748a8b185e7ea3e3fecf9ad5f2bbb8b7a748dec8c88aa2489`, igual antes/depois; não se confunde com8313,baselinee718 ou composiçãoUI1f11. Os quatro hashes de fonte/testes acima foram reconferidos após o ensaio e permaneceram iguais. O recibo feliz anterior segue byte-idêntico ao SHA256969bd055… publicado nesta revisão.

O revisor contou100amostras após10aquecimentos e recomputou o posto95:54,985499999998865ms, exatamente igual ao p95 informado, frente à meta500ms. Interação213,3963ms frente à meta2s; alvo100áreas/1000coletas, ruído10/100 e payload147036bytes. Dois EXPLAIN,100hrefs de área/1000de coleta e duas navegações de amostra;15requests externos bloqueados,0mutações e0pageerrors. Cleanup registra servidor STOPPED, browser CLOSED, schema REMOVED e0erros. Esses dados mostram o caminho feliz real da versão corrigida; a falha de navegação/cleanup sob Node strict permanece a prova sintética separada descrita acima.

Hashes SHA256 dos bytes físicos dos recibos lidos:

| Recibo | SHA256 |
| --- | --- |
| `territorial-readiness-p2.json` | `4563f646c24a6fbbe129165a530a6a60c4170b78d09d529a63475ffd24424147` |
| `territorial-readiness-p2-command.json` | `5df58c47fe38dbf132dd59e0c839c457d0221f3c37f307c018f4d858847cee70` |
| `navigation-rejection-regression.json` | `8f0f27a2a1373b1fd5ee4a41883b3bc5114e21669bfcfe3f5df46112cd89fea3` |

Este adendo encerra a revisão local do delta P2. Revisão GitHub do novo HEAD, resolução do thread e publicação continuam com o coordenador, sem transferir o estado do bot em3e0066 ao commit futuro. Nenhum aplicativo, contrato de API, schema ou teste E2E foi alterado por este incremento do instrumento.
