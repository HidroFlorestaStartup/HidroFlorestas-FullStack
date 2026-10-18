# Plan — Primeira incorporação visual do login

Data: 2026-10-18. Estado: AGUARDANDO_REVISAO no PR9; resultado do CI final mantido no PR. Os bloqueios do pacote parcial abaixo são históricos.
Base: development `e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8`. Spec: [spec.md](spec.md).

As seções até “Reconciliação no checkout oficial” preservam o planejamento e as limitações do pacote parcial; o estado corrente é registrado na reconciliação e nas evidências da execução.

## Contexto técnico e recorte

Destino: Next16.3.8, React19.2.4, Node24.19.0, npm/package-lock, Tailwind4. Alterar página do login + CSS Module; manter contexto de autenticação, serviços, banco, imagens da marca, fonte e layout global. Não importar o grafo de dependências do starter.

Constituição: entrega vertical, fontes classificadas, spec própria, testes proporcionais e preservação dos dados/história. Instruções AGENTS, PROJECT_CONTEXT, TECH_DECISIONS, PLANS, constituição e skills plan/implement foram consultadas. Os scripts oficiais dependem do checkout completo; não declarar sua execução neste pacote parcial. Não há checkout Windows do usuário neste ambiente.

## Decisões técnicas do recorte

1. Cartão central, espaçamento/raio/sombras, neutros claros, verde de ação e ocre de título da referência; logo oficial em lugar do wordmark temporário. Texto de produto e links reais preservados. Sem header com links vazios ou demo.
2. CSS Module local define cores/estados; não depende de classes sem tokens configurados (`bg-card`, `text-ochre`) nem toca em CSS global. Override de reduced-motion apenas nos descendentes do login.
3. `handleLogin` conserva validação e chamada ao contexto. Ref síncrona complementa loading contra envio duplicado. Readiness pelo mesmo padrão `useSyncExternalStore` do formulário ambiental.
4. Preview bloqueado com exclusão do nome exato da branch ANTES do primeiro push. Não criar branch remota no baseline desprotegido.
5. Alteração mínima de rc-review.yml: nova branch no filtro push e na condição do job. Reutilizar tudo mais. Capturas sintéticas de login podem ser preservadas por glob específico; sem traces/cookies.

## Plan → execute → review

P1: registrar spec/plan/tasks/contrato e fingerprints antes do código.
P2: escrever testes de interface; executar RED do cenário de hidratação no projeto real antes da substituição (neste ambiente: NÃO EXECUTADO).
E1: implementar somente página/CSS, guard de Preview e habilitação de CI focal.
E2: validar sintaxe, lógica isolada do handler, DOM/CSS estáticos e configurações; isso NÃO é validação React/Next.
R1: revisar payload, contexto intocado, imports, fechamento de escopo, CSS local, acessibilidade visual, seletores e alcance das provas.
R2: no runtime oficial, executar scripts Spec Kit aplicáveis, Node24/npm ci/Prisma/build/typecheck/lint, testes existentes de auth/E2E/HTTPS e o novo teste. Atualizar tasks/evidências sem reclassificar limitações locais como PASS.
R3: commit(s) cronológicos e push protegido, PR para development, conferência do SHA/check; sem auto-merge.

## Limitações observadas

- GitHub leitura disponível. `create_tree` para o planejamento retornou HTTP403; nenhum ref/commit remoto criado.
- Git local por HTTPS falhou por DNS; nenhum clone foi concluído.
- Node local22.16.0, TypeScript5.8.3 e Chromium disponíveis; Node24, dependências Next/React/Prisma e PostgreSQL do projeto não disponíveis. Não atualizar lockfile para adaptar o projeto ao runtime local.
- O teste oficial real e o aceite visual permanecem pendentes. Preview estático utiliza HTML emitido dos elementos TSX por um adaptador de inspeção e fonte substituta do sistema: não é Next nem prova de hidratação.

## Arquivos e recuperação

Página: src/app/login/page.tsx. CSS: src/app/login/login.module.css. Testes: tests/e2e/frontend-login.spec.ts. Configuração estritamente focal: vercel.json e .github/workflows/rc-review.yml. Documentação: specs/017-frontend-login/**.

Nenhum checkout/worktree do usuário foi alterado. Pacote aplicável por etapas com hashes de preimage, nunca sobre arquivo divergente. Reutilizar checkout limpo disponível, criando apenas branch da feature a partir de development; outro worktree somente se isolamento for necessário.

Retirada/revert normal da apresentação por decisão do mantenedor. Sem rollback de banco, reset ou force push. Novos achados funcionais fora do recorte exigem plano e decisão, não correção silenciosa.

## Reconciliação no checkout oficial — 2026-10-18

EVIDENCIA_IMPLEMENTACAO: `origin/development` confirmado em e17f64a; branch nova `feat/frontend-login` em `C:/projetos/consolidados/HidroFlorestas-frontend-login`. As três worktrees de revisão pertencem a outros trabalhos; a RC permanece em 0f669b7 com somente o ZIP não rastreado. Não havia branch funcional local/remota. Uma única worktree adicional foi necessária para isolamento.

O ZIP foi extraído fora do Git em `C:/projetos/pacotes/hidrofloresta-login-20261018/`; seus 11 hashes SHA-256 e tamanhos foram verificados. Originais preservados. O aplicador falhou inicialmente por blobs com terminações LF/CRLF mistas no baseline e `core.autocrlf=true`; desativar a conversão uniformemente também não basta. Adaptador externo `apply-windows.py` conserva todos os guards e compara bytes exatos do HEAD ou somente sua conversão de checkout LF→CRLF antes de reconhecer o preimage. Nenhum arquivo protegido é regravado. A criação prematura de um template pelo setup-plan foi removida antes da aplicação correta; não há conteúdo desse template na entrega.

As skills specify→plan→tasks→analyze são aplicadas à Spec 017 existente. `setup-plan.sh` preservou o plano existente; `setup-tasks.sh` forneceu o template. Ambos usam `SPECIFY_FEATURE_DIRECTORY=specs/017-frontend-login`, sem criação de branch/worktree. `.specify/feature.json` é estado local ignorado; não há extensions.yml nem hooks. Reconciliar as tarefas do pacote com fases/histórias/paths exigidas pela skill, mantendo sua proveniência.

Node24.19.0 confirmado; `npm ci --no-audit --no-fund`, `npx prisma generate` e instalação oficial de Chromium executados. Pacotes com lifecycle bloqueado pelo npm serão diagnosticados somente se causarem falha; políticas preservadas. Guias Next locais de CSS Modules, client/server, imagens e fontes consultados. O guia de imagem de Next16 depreca `priority`: ajustar apenas a candidata de login para `preload`, mantendo a mesma logo/precarregamento. Não alterar outras páginas.

Constitution Check I–VII: PASS no planejamento. Referência visual e preparação documental são fontes de apresentação e handoff, não base Git nem contrato de auth. Sem novas entidades, dependências, backend ou mudanças científicas. `research.md`, `data-model.md`, contrato e quickstart completam os artefatos existentes. A aprovação visual humana permanece pendente.

Histórico: pacote parcial preservado nas seções anteriores → planejamento reconciliado no checkout real → commit local antes dos testes e implementação → RED → GREEN/regressão → revisão/publicação/checks.

Revisão das capturas após E2E80 PASS: a transição global de 300ms em html ainda estava ampliando a fonte quando a captura320 foi dimensionada. RECOMENDACAO aplicada no recorte de testes: aguardar fonte computada em32px antes de verificar reflow e estabilizar animações nas capturas, sem alterar CSS global, timeout ou assertion existente. Capturas iniciais ficam no diretório externo do pacote; substituir somente as cópias de evidência final por novas capturas reais estáveis. Acrescentar dois cenários UI de resposta401 real (senha incorreta e BLOCKED) com as fixtures sintéticas oficiais para comprovar os casos exigidos diretamente no navegador, além da cobertura API existente. Reexecutar o arquivo focal, typecheck e lint afetados; código de produto permanece igual ao build aprovado.

O focal ampliado executado diretamente pelo accounts-local produziu 8 PASS/2 FAIL (403 esperado pelo guard, não401): faltou o ambiente sintético completo criado pelo rc-review-validation, em especial ingresso local/política de contas. Nenhum guard/backend foi alterado; os mesmos testes estão sendo reexecutados pelo runner RC completo. As duas falhas e seus snapshots sem senha foram preservados.

Na captura320 estável, paddings em rem também dobram e deixam somente160px úteis no cartão, partindo ENTRAR e Cadastrar-se. Correção focal planejada após terminar o gate corrente: manter em pixels somente os espaçamentos horizontais de página/cartão abaixo de400px, preservando ampliação do texto/controles e as outras larguras. Acrescentar verificação de rótulo ENTRAR em uma linha no cenário320; executar antes para comprovar a falha e depois para GREEN. Em seguida repetir build padrão e os gates afetados no runner oficial; nenhuma configuração global.

Encerramento da execução local: RED de reflow FAIL1 antes do CSS → GREEN1 após; commits de implementação61b27ac e correção9bb0eb9. Build padrão/typecheck/lint/E2E82/HTTPS2/SchemaAudit finais PASS; unit296+mail17 PASS. Spec Kit/checklist/análise de consistência e revisão adversarial concluídos sem achado bloqueante. Estado: EM_ANDAMENTO somente para publicação/CI e solicitação de revisão; ver implementation-evidence.md. O aceite humano permanece fora da autoaprovação do executor.

Publicação: primeiro push protegido5720646 e PR9 para development; revisão solicitada a PedroVitor237. Workflow de push39133594916 iniciou efetivamente. Esta atualização final de documentação gera novo HEAD, cujo check e resultado serão registrados no corpo do PR após execução, sem reclassificar o check anterior como prova do HEAD novo. Estado: AGUARDANDO_REVISAO humana; missão técnica continua até conferir o CI do último SHA. Nenhum merge/deploy.

Desvio de validação remota: SHA292dd95 passou12 gates e falhou nos6 testes do gate Ihfr; os2 gates posteriores não rodaram. Evidência preservada em implementation-evidence.md. Reexecução oficial local dos mesmos testes:6 PASS, bootstrap14 migrations e auditoria0 PASS. Causa remota ainda NAO_ESPECIFICADO; não alterar backend/fixtures/guards/ciência por inferência. Nova rodada CI com insumos funcionais idênticos e somente documentação adicional para preservar o FAIL; manter resultados anteriores e conferir o novo SHA no PR. Aceite humano e avaliação da intermitência continuam pendentes.

## Ajuste focal: aria-invalid e falhas gerais — 2026-10-18

Base: PR #9, feat/frontend-login/acba40d6dbbef10f1307f858f5db59bf819bbbd4.
DECISAO_CONFIRMADA: o usuário autorizou, nesta conversa, executar o ajuste
focal de acessibilidade identificado na revisão, mantendo Plan → Execute → Review.

EVIDENCIA_IMPLEMENTACAO: a página deriva aria-invalid de qualquer errorMessage;
a asserção de rede exige senha inválida quando só houve falha do transporte.
Referência técnica: W3C ARIA21, especialmente o teste de não marcar um campo
inválido sem falha de validação correspondente:
https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA21.html.

RECOMENDACAO implementável: estado local por campo, separado do alerta geral.
Somente os campos vazios recusados pela validação já existente recebem
aria-invalid=true. Edição e nova submissão limpam marcações obsoletas em conjunto
com a mensagem, conservando o comportamento de limpar feedback ao editar.
Falhas do contexto (rede, indisponibilidade, credenciais genéricas) continuam
em role=alert e aria-describedby. O resultado de signIn não identifica qual
campo falhou; não inferir pelo texto, modificar AuthContext ou revelar se uma
conta existe. A validação nativa type=email permanece intacta.

Sequência: registrar T015–T018 → testes RED → alteração local de page.tsx →
GREEN e revisão de escopo → publicação no PR #9 após validação oficial.
Preservar política atual de whitespace, payload original, hidratação, loading,
trava síncrona, mensagens e CSS. Não alterar backend, dependências, CI, Vercel,
IHFR ou outros fluxos. Não criar branch nem worktree adicionais.

Casos: campo e-mail vazio, senha vazia, ambos vazios (zero POST); primeira
renderização; limpeza após edição; falha de rede, erro HTTP genérico e 401
sem atribuir invalidade a um campo; retry sem perda de valores; envio duplicado
e controles inertes preservados. Os testes de rede e erro HTTP são de
UI/transporte interceptado; os dois casos de credenciais reais continuam reais.

Resultados isolados do pacote não substituem Node24/Next/Playwright/harness
oficiais. CI anterior e aceites humanos permanecem históricos e independentes.
A intermitência IHFR continua registrada, sem investigação neste recorte.

### Reconciliação oficial do ajuste focal

Estado: EM_ANDAMENTO. Origem da autorização: pedido atual do usuário para concluir
este pacote na feature existente, com commit/push e atualização do PR9.
EVIDENCIA_IMPLEMENTACAO: fetch confirmou HEAD e origin/feat/frontend-login em
acba40d6dbbef10f1307f858f5db59bf819bbbd4; origin/development permanece e17f64a.
A worktree existente estava limpa. A RC permanece em 0f669b7, com os dois ZIPs
não rastreados preservados; as demais worktrees não serão alteradas.

Pacote extraído fora do Git: hidrofloresta-login-aria-20261018.zip, SHA256
3f37082a28558306323fd6a0be70918784c287841f62b36307343ab140333627.
Manifesto, aplicador e patches revisados; preimages e integridade passaram sem
adaptação. Somente os três adendos documentais foram aplicados nesta etapa.
setup-plan preservou os artefatos da Spec017; não há extensions.yml/hooks.
Constitution Check I–VII: PASS; não há decisão material pendente para o recorte.
Guia Next local de Client Components e referência W3C ARIA21 consultados.

Validação prevista: commit deste planejamento; aplicar somente os testes do
pacote; RED pelo runner oficial `rc-review-validation.ps1 -Gates E2E`, com o
ambiente sintético completo e fixtures reais existentes. Após preservar o FAIL,
aplicar somente page.tsx e repetir E2E para GREEN dos mesmos casos. Regressão
proporcional: Unit, Build, Typecheck, Lint, E2E e Https pelos runners oficiais.
Nenhum runner, guard, fixture ou timeout será alterado. Revisar diff e privacidade,
registrar resultados e commitar antes de publicar exclusivamente a feature.
O CI do SHA final será registrado no PR9, sem commits sucessivos de recibo.
Revisão humana continua pendente; sem merge, deploy ou investigação de IHFR.

RED oficial concluído antes da correção: planejamento ee9b98f, página idêntica
ao baseline, testes idênticos ao overlay. Runner RC completo, gate E2E:
79 PASS / 7 FAIL; no arquivo de login, 7 PASS / 7 FAIL. Todas as sete falhas
esperavam ausência de aria-invalid=true e receberam true (401 interceptado,
rede, duas negativas reais, um campo vazio e o outro preenchido, HTTP503).
Sem falha fora do arquivo focal; caso de ambos vazios já passou.
Evidências: [journal RED](evidence/aria-invalid-red.json) e
[assertions oficiais](evidence/aria-invalid-red.log). Nenhuma assertion, timeout,
fixture ou guard foi alterado. Próxima etapa: aplicar page.tsx e repetir E2E.
