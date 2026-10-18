# Plan — Primeira incorporação visual do login

Data: 2026-10-18. Estado: EM_ANDAMENTO no checkout oficial; os bloqueios do pacote parcial abaixo são históricos.
Base: development `e17f64a1a9d8bdf48edd9ca1bc9443e118a41bc8`. Spec: [spec.md](spec.md).

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
