# Evidências de implementação — fase5
Estado inicial: PLAN. Base 7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d; PRfase4 pendente por403 do conector; branch publicada https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/tree/feat/frontend-laboratory-dashboard; base temporária conforme estado real. Startercbb954a somenteleitura.
Nenhum teste novo PASS ou problema funcional confirmado por esta inspeção. Hipótese de anúncio antesonLoad será testada antes do produto.

## Análise independente antes do commit PLAN

mission_context, somente leitura sobre HEADbase7b8d9c0c8894d4e3e86d35d90b4d1b3d2eab003d:0P1/P2 materiais,12FR/4SC/19tarefas com cobertura documental completa, sem tarefas órfãs/violação de constituição. Pré-requisitos SpecKit PASS; hooks ausentes. LOWs editoriais ajustados: nome STALE_REVISION e repetição da mesma seleção incerta, distinguindo resets explícitos por nova seleção/sucesso/remoção confirmada. Limite: nenhuma suíte nova ou implementação validada ainda.

Evento posterior ao preflight de14:20Z: CI fase4 run39267705060/job118111516392 terminou FAIL em Integration. RegressionSetup e Unit PASS; CRI-REV-002 quota concorrente recebeu INTERNAL_ERROR em vez de RATE_LIMITED, com conflitos40001/P2034 registrados. Os12gates seguintes não executaram. Artefato12192554979 ZIP conferido, SHA25618f1bec27a42ae84c049d69ee634c402a61b53d041f706acfbf60c7fbe886566. Nenhuma alteração de backend/teste/guard para conseguir PASS; rerun pelo conector também403. Usuário indicará CLI autenticado; PRs/review/rerun seguem pendentes de acesso, código da fase5 pode continuar. O FAIL será preservado e novo resultado deverá ser conferido no HEAD exato.
## Baseline inicial congelada — 19/10/2026

HEAD851e05e645173da2150616c17c22cf0cd23f8ef9, snapshot01e5478ac6ea34f6866aa1b51bf375d3bc168e10b55681c54f7504a86955af78;2026-10-19T14:34:20Z–14:41:50Z. RegressionSetup,Typecheck,Lint PASS (0erros/3avisos anteriores). E2E145PASS/7FAIL152; todos136preexistentes PASS. Entre os16novos,9PASS e7FAIL.

Cinco REDs funcionais: confirmação200 anuncia Capa salva com bytes novos retidos/naturalWidth0; reload após confirmação incerta cria segunda key/ticket; emissão incerta repetida após metadatarevisionnova altera key e expectedRevision original; onLoad real anterior substitui mensagem de nova seleção e de upload atual. Os dois últimos casos são dois cenários do mesmo problema de status anterior. Não confundir cinco cenários com cinco defeitos independentes.

Dois FAILs de teste: alerta global também seleciona __next-route-announcer__; metadatafail baseado no segundo GET atinge efeito inicial repetido em desenvolvimento. Correções limitadas ao teste: escopo pela mensagem real do app e flag de falha armada após fallback inicial. Não são defeitos de produto.

[Journal, logs e capturas before](evidence/baseline-initial/). Logs mantêm redator oficial, removem ANSI e substituem UUIDs por aliases consistentes por arquivo; preservam comparações sem publicar chaves sintéticas desnecessárias. Textos têm hash UTF8/LF semBOM; PNG hash dos bytes. Perfis responsivos têm altura900; casos funcionais também usam1280×720, conforme JSON. Corrige a previsão genérica de900, sem afirmar que todas as capturas têm essa altura.

Complemento de cobertura antes do produto: capas habilitadas nos quatro perfis, com preview decodificado, foco do input vazio e recarga, progresso com confirmação retida. canEdit continua vindo do GET real. Fonte de aplicação ainda preservada. Probe de16casos usa o mesmo envelope RC local de chaves sintéticas/ausências/StartStop/RegressionSetup e accounts-local-postgresql Run Regression oficiais, substituindo somente o filho E2E por coletor focal; wrappers ignorados, sem editar runners/config/guards/package. Coletor não lê .env. Este probe não será apresentado como gate E2E152.
## Baseline complementar e RED consolidado

HEADda57eb7a80ccb6406733fd952e36feb21a078ed9; snapshot05158fc38a9c6145e66bd519f3c29b04af934acd48ffcdcb2955e34cfa81004b. Setup/Typecheck/Lint PASS na fonte congelada. Primeiro coletor focal falhou sem encontrar testes por nome de arquivo incorreto; erro do diagnóstico corrigido, não RED do produto. Probe correto2026-10-19T14:46:10Z–14:47:38Z: **11PASS/5FAIL nos16casos de áreas**, mantendo os mesmos cinco cenários funcionais RED; problemas dos testes F4/F11 corrigidos. Não é gate E2E152. Aplicação permanece sem alterações da fase5 até este registro.

[Journal/logs e capturas adicionais](evidence/baseline-corrected/) incluem os16frames de capa habilitada375/768/1440/320texto200, foco nativo e progresso observado com confirmação retida. Capacidade veio do GET real. Fonte permite iniciar UI e correções restritas ao protocolo local demonstrado, sem alterar backend, contratos, revisão persistida, guards ou roteador.