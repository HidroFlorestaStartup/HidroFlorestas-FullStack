# HF-NIGHT-01 — verificação combinada de UI

Estado: `AGUARDANDO_REVISAO`, 2026-10-25. Responsável pela execução: `/root/fr015`; revisão documental independente: `/root/students`; composição/publicação: `/root`.

## Objetivo e autoridade

`FATO_DOCUMENTADO`: o coordenador autorizou nesta sessão uma coorte local própria para validar conjuntamente as correções já especificadas/revisadas nas PR34/36/38. Isso evita transferir o baseline08262dc às correções posteriores. Nenhuma funcionalidade, intenção de produto ou ciência nova será criada. Sem merge em development/main, push ou PR pelo executor. A composição não é PR funcional duplicada.

Fontes de intenção: specs029/032/033 e seus planos/tarefas/contratos, regidos pela constituição1.0.0 e políticas de fontes. As skills instaladas speckit-analyze/converge serão reaplicadas ao recorte existente; nenhuma spec artificial será criada. Recibos são `EVIDENCIA_IMPLEMENTACAO`, sem aceite humano ou validade científica presumida.

## Corte inicial e ownership

Worktree nova `.worktrees/ui`, branch `test/hf-night-ui-combined-20261025`, HEAD inicial `840cd1b6e51d7adc2fd196d177870ff513d5ad87`, árvore limpa. O coordenador compôs daebd71, ddd4e82, fb1523b e1dbe3d4; somente vercel.json conflitou. Root verificou15/15blobs funcionais idênticos às três fontes e31false=27base+3fontes+own, resto JSON/workflow preservado. O executor reconferirá a identidade sem editar fonte/configuração.

Escrita autorizada somente neste plano e em `docs/reports/2026-10-25-hf-night-01/combined/**`; privados ignorados sob a própria `.accounts-validation`. Não alterar src/tests/config/deps/guardas/specs históricas. Preservar worktrees anteriores e docs/raw. Nenhum segredo, ambiente, cookie, dump, trace ou dado pessoal será publicado.

## Sequência e critérios

1. Registrar composição, hashes, guardas e estado inicial. Analisar consistência de spec/plan/tasks029/032/033 por skills reais, sem escrever nesses artefatos; registrar lacuna material antes de qualquer correção de código.
2. Instalar dependências do lockfile com npm ci e gerar Prisma. Rodar typecheck/lint/build/unit e as três suítes UI existentes, serializadas:6+27+14=47execuções sintéticas. Não somar como teste global único.
3. Criar runtime PostgreSQL17.10 owned novo em `.accounts-validation`, ACL privada currentUser+SYSTEM, usando somente pacote público pinado/verificado; nunca copiar data/marker/credencial de outra árvore. Coordenador confirmou Stop da QA; verificar portas55427/3001 antes de iniciar, recusando processo alheio.
4. Wrapper oficial, somente envsistema+sintético, sem dotenv/SMTP/provedores externos; RegressionSetup14migrations e prova de0dados/reference0 antes das fixtures. E2E220 com um worker/retries0, sem alterações de assertions/timeouts. TileURLloopback e attribution canônica evitam fallback público intencional. Encerrar somente runtime/processos próprios.
5. Preservar comandos/UTC/durações/exit codes/logs privados, amostras falhas e fingerprint funcional antes/depois. Não repetir integração/migration/contract/HTTPS sem falha nova/materialidade: backend/schema não mudam.
6. Reaplicar converge aos mesmos requisitos/contratos e deixar tasks byte-idênticas quando não houver lacunas. Revisar diff/links/segredos/escopo, encaminhar recibos a C e delta a root antes de publicação.

## Riscos e pontos de parada

Windows sandbox pode falhar em tsx/uv_os_get_passwd antes dos testes; repetir somente sob token autorizado, preservando a tentativa. Cache/download de dependências/fontes/engine e MAX_PATH podem atrasar o setup; não mudar versões ou relaxar guards. Runtime usa caminho curto e pacote público17.10 de origem verificada. Custo observado planejado16–20min após setup, variável por cache/Windows; não é timeout nem promessa de duração.

Se houver falha, registrar e analisar antes de retry; defeito novo exige triagem/autoria própria, sem alterar código congelado. Ausência de ownership/porta/autoridade bloqueia somente o runtime afetado. Aceites humanos, tecnologia assistiva real, homologação hospedada, G3–G5 e ciência permanecem separados. IHFR: CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE, SUJEITO_A_RECALIBRACAO, NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Histórico

- Inicial: árvore recebida limpa; leitura de instruções/contexto/fontes e skills efetuada. Nenhum runtime iniciado; instalação/checks a executar.
- 06:10–06:16UTC: npm ci553/Prisma/typecheck/lint/build/unit402+17 e UI6+27+14 PASS. Lint conserva2warnings preexistentes,0erros. Analyze real das três features:30FR/SC,31tarefas,100% cobertura,0achados; tasks históricas intactas. Manifesto próprio confirma15/15blobs e31guardas false. Fingerprint601entradas `1f11a53ef3a5510ad35033b9000d12b6ae10b4c7e6222c425880f3d5c7ff7eac` antes de UI/runtime, sem alterações funcionais.
- 06:17UTC: runtime novo próprio passou RegressionSetup e prova READ ONLY anterior às fixtures:14migrations,0usuários/labs/memberships/áreas/coletas/audit e0tabelas na referência. E2E220 em andamento,1worker/retries0. Nenhum resultado final antecipado.
- 06:26–06:27UTC:220/220E2E PASS,0skip/retry,571,669s; teste403 existente passou. Runtime próprio parado,0listeners55427/3001,dados preservados. Fingerprint601entradas antes/depois idêntico. Converge real das três specs:30FR/SC+17AC+16decisões+7princípios,0lacunas/0tasks novas; hashes das três tasks intactos. Pacote público será congelado UTF8/LF com hashScope físico explícito; C revisará os recibos e root o delta/publicação. Não foi repetida carga de backend sem mudança material.
