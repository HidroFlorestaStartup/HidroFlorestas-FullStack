# HF-UI-044-CLOSE-PARALLEL-02 — execução paralela para concluir as evidências

**Data:** 2026-11-01, America/Fortaleza. **Estado deste pacote:** PREPARADO, não executado. **Classificação:** RECOMENDACAO de organização; os fatos históricos abaixo são EVIDENCIA_IMPLEMENTACAO ou relatos explicitamente identificados. A solicitação atual do operador pede execução paralela, ciclo Spec Kit, pesquisa web quando necessária e full access. Ao enviar um dos prompts abaixo ao executor, o operador adota seu escopo de execução. As permissões reais da ferramenta continuam prevalecendo.

**Projeto exclusivo:** HidroFloresta. **Repositório:** `HidroFlorestaStartup/HidroFlorestas-FullStack`. Não trabalhar em Atlas, R4/Darwin, AP04, corpus ou arquivos científicos privados de outros projetos.

## Como executar sem duplicar trabalho

**Modo recomendado:** enviar somente o PROMPT 00 a um coordenador Codex Local. Ele delega 01, 02 e 03 a três agentes nativos reais e, depois, chama um revisor não autor com 04. O coordenador é o único publicador e integrador. Se as ferramentas nativas de delegação não existirem, registrar a limitação e executar sequencialmente, ou o operador abre três chats independentes com 01–03 e mantém 00 como coordenador. Não iniciar os dois modos ao mesmo tempo.

Cada executor deve ler integralmente o CONTRATO COMUM e seu prompt. O coordenador lê o pacote completo. Os workers podem pesquisar/implementar em paralelo; nenhuma etapa pode exigir o resultado de um worker antes de ele ter uma tarefa executável independente.

## Fontes imutáveis e estado de partida

| Objeto | Referência observada; não é alvo de reset |
|---|---|
| development | `9b8595d232842d401ce81bbc92c54dd543aa2829` |
| GUARD_SHA | `07755822f5dc75fe2be1d924005d30ed99f64a0b` |
| A, PR46, Spec035 | `ff5db4f820b6351a1cc5b5145c9c8bcaec6a40c5` — fechamento A6 documental; produto A5 em `6f236bbe7b5f4d7f9718efaa2c334f7d1520e0a0` |
| B, PR47, Spec036 | `1c44058cb45e461c719d514829a4e78d2bf7ee05` |
| C, PR48, Spec037 | `799c00a42d7f3846c3449d3615d263ce0b0e7bd2` |
| Composição funcional testada | commit `6c61056fe1dc2193e225d935f49b78cb6c6781ed`; produto tree `a585087dbbe9294c18922e3397c2561f245446c9`; tree com overlay `f40b4e8c0217311869dc5336e4fc15c7176df7a5` |
| CI composta | [41275910130/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41275910130), 15/15 gates PASS; 235 E2E e 6 IHFR, sem somar subconjuntos como testes únicos |
| UI06 falha | commit `048de7c50d4070f105fafd4679e2d006105c295e`; tree `2ec03269405b0874467c70989525e0ee42ce6114`; [41332868248/1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41332868248), FAIL, 6/336 pares completos, escala 30,7963px vs 32px |
| Starter somente leitura | `HidroFlorestaStartup/hidroflorestas-frontend-starter@cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f` |
| Conciliação documental local | operador relatou commit `33d9b8b156bf275cd7f0d122fac0957d7689997a`, branch local `docs/hf-ui044-worktree-reconcile-01`; existência e eventual aplicação devem ser verificadas LOCALMENTE |

As refs remotas foram consultadas durante a preparação; cada executor deve reconferir antes de escrever. A limpeza dos 21 arquivos já foi relatada concluída. Não repetir a limpeza, não recuperar o pacote antigo como candidato ativo e não voltar a preparar Sandbox.

### Leitura obrigatória, proporcional e sem reiniciar auditorias antigas

- `AGENTS.md` da raiz e dos diretórios alterados; `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `PLANS.md`, `.specify/memory/constitution.md`, `docs/governance/SOURCE_AUTHORITY.md`, `docs/code-first-prd/governance/source-policy.md` e o recorte pertinente do PRD Code-First.
- Decisões e critérios UI01–UI07 na [PR44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/44), fonte `972f9b00189bf09117883913d8c4fa63e69f4d2f`, diretório `docs/plans/active/ajustes-interface-pos-testes-20261030/`. Ler integralmente `decisoes-e-escopo.md` e `criterios-de-aceite.md`; consultar referências visuais e plano conforme recorte.
- [Composição terminal](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6554039611) e [A6/QA-C](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6559195702), além das PRs 45–48 atuais e das specs 035/036/037 pertinentes.
- Fonte exata do harness falho em `048de7c5`: `tests/e2e/hf-ui06-bilateral.spec.ts`, `scripts/hf-ui06-visual.ps1`, `.github/workflows/hf-ui06-bilateral.yml` e `src/app/globals.css`.
- Patch de partida: [ui06-fix-scale-fonts-reload.patch](ui06-fix-scale-fonts-reload.patch), SHA256 `5e38263d27e2297daac8a7d87fb54a12a17c267ea23d7cb57623fbf6c3911939`, aplicável ao blob de teste `c9005e79ad6c754f68d9644798eb0ebdbf16cf99`. É uma proposta com contraprova sintética, não uma correção validada no runtime integrado. Seu uso não dispensa leitura do diff e testes.

# CONTRATO COMUM — obrigatório para 00–04

<objetivo>
Concluir as evidências técnicas de UI06 no shell e nas páginas B, preservar UI037 no artefato final, reconciliar documentação/commits e entregar parecer para o mantenedor. Produzir mudanças executáveis, testes, commits e recibos; não produzir outro prompt como substituto da execução. Não prometer que full access garante aprovação.
</objetivo>

<autonomia_e_limites>
Autorizados no recorte: ler o repositório e os anexos técnicos desta missão, pesquisar documentação pública primária, criar/reutilizar worktrees isoladas e branches locais de tarefa, editar arquivos atribuídos, testar, fazer commits, preparar candidatas, publicar por push normal nas refs autorizadas, atualizar PRs Draft/recibos e executar Actions sintéticas segundo o orçamento abaixo. As operações remotas são exclusivas do coordenador.

Nova autorização operacional delimitada ao enviar o PROMPT 00: uma branch de QA `codex/hf-ui044-close-20261101`, proteção Preview false já no primeiro commit, até TRÊS rodadas hospedadas de correção (cada rodada = um novo SHA publicado + uma tentativa; nenhuma repetição cega do mesmo SHA), sem cron/disparo contínuo. Até quatro jobs por rodada: smoke <=5min, UI-A <=35min, UI-B <=35min e RC+UI037 <=35min; teto agregado de configuração 330 runner-minutes para as três rodadas, não previsão de duração ou preço. CI automática nas branches funcionais, quando houver mudança material publicada, deve ser inventariada separadamente; agrupar uma publicação por owner antes da qualificação final e evitar pushes só para atualizar texto. Não aumentar limites silenciosamente.

O limite antigo de uma única tentativa continua válido para as runs históricas: não reexecutá-las, não alterá-las e não reescrever recibos. Esta missão nova permite apenas as rodadas delimitadas acima, com causa/delta/teste explícitos entre elas. Quando esgotadas, preservar o trabalho e emitir um bloqueio focal, não pedir nova autorização para cada microajuste interno.

Continuam proibidos: merge/auto-merge/release/deploy; push em main/development/#44; force-push/reset/clean destrutivo; excluir branches/worktrees/artefatos existentes; alterar permissões/ACL/firewall/hipervisor; Neon, SMTP real, Cloudinary, geocodificador real; alterações científicas; REV01–REV03; importar automated-setup; alterar credenciais ou ler arquivos privados sem pertinência. Full access não autoriza essas operações nem contornar permissões do cliente.

Não instalar Node/Bun/PostgreSQL globalmente no computador do operador. Use runtimes existentes para inspeção/sintaxe e o Windows GitHub-hosted para runtime oficial. Node24.14 local não bloqueia preparação; Node24.19.0 é provisionado pelo `actions/setup-node` já comprovado. Bun1.3.11 é provisionado somente no runner do starter. Ausência de PG local não é novo bloqueio. Dependências isoladas da cópia de tarefa podem ser preparadas quando necessárias, sem alterar lockfiles nem o ambiente principal.
</autonomia_e_limites>

<spec_kit>
Cada worker usa a reserva existente: A=035, B=036, C=037. Não criar uma spec nova ou TASKS.md global. Ler as skills efetivamente instaladas em `.agents/skills/`; as encontradas incluem speckit-analyze, speckit-plan, speckit-tasks, speckit-implement e speckit-converge. Não inventar `$speckit-review` se inexistente.

Ciclo: ANALYZE read-only sobre spec/plan/tasks existentes -> PLAN com delta mínimo -> atualizar tarefas com IDs novos sem apagar história -> ANALYZE de consistência -> IMPLEMENT, preferencialmente contraprova RED antes do GREEN -> REVIEW -> COMMIT/HANDOFF. A fase `$speckit-analyze` não escreve arquivos; a edição autorizada começa na fase seguinte. Inconsistências técnicas do recorte estão autorizadas para remediação; decisões científicas/de produto não.

Se houver checklist aberto pelo próprio trabalho UI06/UI037, reportar a situação e continuar a implementação já autorizada; não transformar checklist aberto em PASS. Bloquear apenas conflito material de segurança/autoridade ou requisito realmente impossível de resolver no recorte. Configurar o contexto de feature na própria worktree, sem mudar um ponteiro compartilhado. Conferir efeitos dos scripts antes de executá-los; não criar branch/spec automaticamente sobre trabalho existente. Não alegar execução da CLI se foi adaptação manual, documentar a limitação precisa.

Para Next.js, consultar a documentação da versão instalada em `node_modules/next/dist/docs/` antes de mudar APIs. O coordenador mantém plano transversal conforme PLANS.md; os workers mantêm planos em specs/<feature>/plan.md. Informação observada, INFERENCIA, RECOMENDACAO e DECISAO_CONFIRMADA permanecem distintas.
</spec_kit>

<paralelismo_e_ownership>
Máximo três workers nativos simultâneos: A, B e C. Use apenas chamadas reais de delegação presentes na sessão; registre IDs e resultados. Não inventar spawn_agent, agentes, revisão ou aprovação. Sem ferramenta: NATIVE_SUBAGENTS_NOT_AVAILABLE e execução sequencial honesta, ou os chats separados iniciados pelo operador. Workers não criam subequipes recursivas.

Um escritor por arquivo, worktree, índice e branch. Coordenador é o único escritor/publicador de `.github/workflows/**`, `vercel.json`, scripts de orquestração e dos contratos comuns. Workers podem preparar recomendações nesses arquivos em texto, nunca editá-los em paralelo.

A: instrumentação compartilhada UI06 e shell/Spec035. B: testes/capturas de área/coleta/IHFR e Spec036. C: teste e evidência UI037/Spec037 mais conciliação documental já autorizada. Produto só muda no owner correto após defeito reproduzido; não reescrever A/B/C por conveniência do comparador.

Worktrees novas ficam em uma raiz curta, isolada e registrada; não operar no checkout principal do VS Code. Preserve seu branch, índice, untracked e arquivos ignorados. Não escrever pacotes temporários em docs/plans/active do checkout principal. Use a área local de evidências já ignorada ou destino explícito da missão. Não adicionar regras ignore só para esconder trabalho não concluído.

Cada worker encerra com commit LOCAL e handoff verificável. Coordenador transporta apenas deltas exclusivos para a candidata e, quando pertinente, para a branch funcional correta; nunca merge da árvore composta inteira em A/B/C. Nenhum worker faz push autônomo.
</paralelismo_e_ownership>

<contrato_de_evidencia>
Cada caso registra dimensões separadas:
1. execução técnica: PASS, FAIL, NOT_RUN;
2. comparabilidade: COMPARABLE, NON_EQUIVALENT, INSUFFICIENT_EVIDENCE;
3. avaliação do requisito: SATISFIED_TECHNICALLY, DEFECT_FOUND, HUMAN_DECISION_PENDING;
4. completude de evidência: COMPLETE, PARTIAL, MISSING.

NON_EQUIVALENT não é erro do harness nem aprovação automática. Conta ausente no starter e persistência diferente no reload são diferenças reais, explicitadas, não motivos para abortar todos os casos independentes. Ausência de fontes CDP não prova fallback. Não contar captura gravada como aceite visual. É obrigatório inspecionar as imagens dos dois projetos e produzir achados com arquivo/caso/severidade.

Preservar `toBeInViewport({ratio:1})` nos cenários pertinentes, escala efetiva, foco, hit-testing e qualificadores. Não forçar scroll/estilo depois da medição para esconder um defeito. `fullPage:false`; PNG e JSON com SHA/tree, run/attempt, origem, estado, fixture, viewport, escala real, fonte observada e hashes. Sem tokens, cookies, senhas, headers privados, payload científico, perfis reais ou arquivos de banco nos artefatos.

Artefatos em diretório durável diferente do outputDir limpo pelo Playwright. Registrar cases.jsonl de forma incremental e um índice que enumere também os casos não iniciados. Falhas de segurança/isolamento/credenciais são fail-closed; falha visual isolada preserva recibo e não impede casos seguros independentes. A sumarização final falha se houver erro técnico obrigatório ou cobertura faltante, mesmo que a coleta tenha continuado.
</contrato_de_evidencia>

<fechamento_git>
Toda entrega encerra com arquivos atribuídos commitados ou arquivados com hashes; `git status` final compara o estado inicial e não apaga trabalho alheio. Não usar git add .; adicionar paths explícitos. Commit local, push remoto, CI, comparação visual e aceite humano são estados separados. Autoria de recibo não é revisão independente. Não publicar branches de worker sem guard prévio.

A conciliação local `33d9b8b1` não é uma nova feature. Se existir e ainda não tiver sido transportada, C pode conciliar somente os quatro documentos sanitizados já autorizados. Nunca importar os 3.272 originais, .scratch, respostas brutas ou arquivos de outros projetos. Ausência do objeto local não bloqueia UI06: emitir DOC_RECONCILIATION_NOT_OBSERVED e prosseguir nos testes.
</fechamento_git>

<fim_da_missao>
Prontidão técnica exige evidências UI06 A+B completas no recorte aprovado, UI037 preservada, regressão aplicável da árvore final sem findings bloqueantes e revisão não autora. A CI composta histórica continua válida somente no seu SHA. Se produto ou testes obrigatórios mudarem, executar os 15 gates sobre a candidata final uma vez; repetir somente após mudança/falha material. Documentação isolada não justifica recomeçar todas as rodadas.

A isolada pode continuar FAIL enquanto depender de ScientificNotice de B; não copiar B para A nem afrouxar testes para torná-la verde. O mantenedor recebe uma proposta de integração que trate essa dependência, possivelmente guards -> B -> A -> C, com revalidação posterior. Nada disso é merge autorizado aqui.

Conservar HUMAN_ACCEPTANCE_PENDING, GEOCODER_OPERATIONAL_PENDING e os quatro qualificadores científicos. G3/G4/G5 operacionais não bloqueiam captura sintética nem são encerrados por ela. Resultado final: READY_FOR_MAINTAINER_REVIEW ou BLOCKED_WITH_EXACT_FINDINGS, nunca aprovação humana/científica fabricada.
</fim_da_missao>

---

# PROMPT 00 — HF-UI044-CLOSE-PARALLEL-02-COORD

<papel>
Você é o coordenador executor. Leia todo este pacote, trate o CONTRATO COMUM como parte integral e leve a missão até implementação, execução e revisão dentro dos limites. Não se limite a distribuir prompts. Esforço recomendado: Extra High quando disponível; não simular escolha de modelo/esforço ou recursos ausentes.
</papel>

<analyze_plan>
1. Reconfira refs, PRs45–48, estado local e comandos já executados; congele source-pins.json da missão. Use a composição 6c61056f como base funcional comprovada, não a branch C isolada. Leia a tentativa falha 048de7c5 como fonte de instrumentação; não transportar seu workflow de criação única sem adaptação explícita.
2. Se os HEADs avançaram, examine apenas deltas novos, preserve-os e reconcilie o que afeta produto/testes; documentação nova não invalida retroativamente a prova do código antigo. Registre quais blobs são iguais e o que continua sem nova execução.
3. Crie plano transversal e registro de ownership antes de delegar. Reserve três worktrees/branches locais, uma integração e destinos duráveis de handoff. Dê aos workers os paths reais, base e contrato de saída. Nenhum deles edita o checkout principal.
4. Para impedir colisão e dependencia circular, congele um pequeno contrato TypeScript de evidência antes dos workers: identificação do caso/fonte, viewport, escala, inset, estado, metadados e persistência de PNG/JSON. A implementa os helpers; B pode começar pelos casos/fixtures/seletores contra esse contrato. Não criar um framework genérico novo.
</analyze_plan>

<delegate_execute>
Inicie agentes nativos reais com os PROMPTS01,02,03 e ownership exclusivo. Enquanto trabalham, prepare a infraestrutura compartilhada. Aguarde e revise commits locais, não apenas seus resumos. Se um worker precisar de arquivo alheio, aloque o hunk explicitamente e serialize somente esse hunk; não interrompa as outras frentes.

Use `qa/hf-ui044/` para a instrumentação nova e configs focais, fora do `testDir` dos 15 gates originais. A base 6c61056f não tem o teste bilateral monolítico falho: não introduza um teste que exige starter no E2E geral. O teste UI037 existente continua onde está, com arquivamento durável corrigido por C.

O coordenador é writer de `qa/hf-ui044/contract.ts`, configs Playwright focais, `scripts/hf-ui06-visual.ps1`, eventual helper de orquestração específico e `.github/workflows/hf-ui044-close.yml`, mais a entrada aditiva em vercel.json. Configs focais reutilizam guardas oficiais e o webServer onde pertinente. Smoke sintético sem banco deve ter config independente que não inicialize validação de banco por import acidental.

Publicar somente `codex/hf-ui044-close-20261101`, com Preview false verificado ANTES do primeiro push; preservar entradas anteriores e confirmar aplicabilidade ao projeto vinculado por configuração/recibo disponível, sem deploy-teste. A ref deve ser ausente, ou ser continuação demonstrada desta missão. Sem sobrescrever ref alheia. Guard de eventos para a branch exata permite push normal de novos commits desta missão, não exige event.created nas rodadas corretivas; recusa exclusão/forçado e rerun automático. Não modificar filtros da CI oficial só para fazê-la ignorar um defeito.

GitHub-hosted Windows, Node24.19.0 via setup-node com o pin já usado `249970729cb0ef3589644e2896645e5dc5ba9c38`; npm ci/lockfile, Prisma generate, Next typegen e typecheck; Bun1.3.11 somente no job que executa o starter. Reutilizar entrypoint e PostgreSQL17 owned, fresh directory/ACL/loopback, sem marker/banco copiado e sem Sandbox/Hyper-V. Não alterar scripts oficiais de proteção.
</delegate_execute>

<ci_e_convergencia>
Organize o workflow novo em quatro jobs, com smoke como dependência dos jobs visuais; jobs independentes usam máquinas e bancos distintos:
- smoke: prova sintética e focal da instrumentação, sem banco;
- ui-a: shell FullStack x starter, casos particionados;
- ui-b: área/coleta/IHFR FullStack x starter, casos particionados;
- rc-ui037: suíte oficial de 15 gates sobre a candidata e verificação do arquivamento UI037 após as suítes posteriores.

Faça download/inspeção real dos artefatos finais. Se só instrumentação falhar, corrija no owner e execute somente jobs afetados na próxima rodada quando possível sem falsear evidência da árvore; o job omitido é NOT_RUN nesse SHA. Não atribuir SUCCESS de workflow a todas as provas. Não repetir A isolada indefinidamente pelo defeito que só B corrige. Se produto mudar, requalificar a composição final e informar exatamente quais testes rodaram nesse SHA.

Máximo três rodadas, cada correção fundada em log+causa+diff. Resultados parciais permanecem arquivados. Não encerrar depois de smoke se ainda couber execução visual prevista. Não solicitar novas confirmações para cada correção reversível já contida no mandato. Parar somente limites, permissão real negada, conflito de autoridade ou risco novo material.
</ci_e_convergencia>

<review_handoff>
Após terminar implementação, delegue PROMPT04 a executor real que não escreveu as correções, preservando a identidade e o escopo auditado. Não use autor como seu próprio revisor independente. Revisor pode inspecionar diffs desde o início, mas só emite conclusão após fontes/artefatos finais congelados.

Transportar somente patches de produto/teste/doc de cada owner às branches A/B/C apropriadas, após revisão do delta e preservação do HEAD remoto; nada de merge da candidata inteira. Agrupar commits e publicar por push normal somente onde há delta autorizado. Atualizar PRs/Spec Kit e registrar CODE_SHA_TESTED, DOC_HEAD, CANDIDATE_SHA e árvore de produto. Um novo SHA documental não recebe verde herdado.

Publicar recibo factual único na PR45 e referências nas PRs afetadas. Entregar uma tabela final com A/B/C, candidata, status técnico, UI06-A, UI06-B, UI037, review e decisões humanas. Mostrar nomes e paths dos worktrees restantes; fechar a missão sem arquivos soltos produzidos por ela. Conservar branches históricas; sua remoção não foi autorizada.
</review_handoff>

---

# PROMPT 01 — HF-UI044-CLOSE-A-HARNESS

<papel>
Worker A: corrigir instrumentação de escala/fontes e comparação do shell. Leia o CONTRATO COMUM. Você não edita workflow, vercel, scripts de banco, configuração compartilhada nem arquivos B/C. Esforço recomendado: Extra High. Sem subdelegação recursiva e sem push.
</papel>

<ownership>
Escrita exclusiva: helpers e smoke em `qa/hf-ui044/shared.ts`, `qa/hf-ui044/smoke.spec.ts`, comparações `qa/hf-ui044/shell.spec.ts`, testes sintéticos auxiliares A e `specs/035-ajustes-navegacao-conta/**`. Se houver defeito real do menu, o delta de produto é permitido em `src/components/top-bar/index.tsx`, `src/components/shell/shell.module.css` e teste próprio A; nunca `globals.css` só para desativar a transição observada.
</ownership>

<analyze>
Leia o harness c9005e79 em 048de7c5, a falha30,7963px e o patch local publicado junto deste pacote. A regra global `transition:.3s` torna dois frames insuficientes: isso é mecanismo com contraprova sintética, ainda precisa prova no FullStack. Não alegue que já executou a correção integrada.

Leia as capturas reais de Conta320px; corte de nome é um finding candidato, não fato comprovado de causa. Reproduza geometria no DOM/viewport antes de atribuir bug e editar produto. Consulte docs da versão instalada.
</analyze>

<plan_implement>
1. Reaproveite o patch como ponto de partida. Implemente espera limitada pela escala EXATA16/32px, confirmação estável após layout, diagnóstico amostrado persistido antes de FAIL. Sem sleep arbitrário único, tolerância ampliada, fonte reduzida ou desligamento permanente de CSS do produto. Medir estado após client navigation também.
2. Coletar fontes CDP nos elementos com TextNodes renderizados e glifos >0; amostragem delimitada de elementos visíveis por região. Lista vazia = UNOBSERVED, não fallback. Não classificar ícone de lucide como fonte textual primária. Registrar fontes por elemento/role sem conteúdo privado.
3. Observar escala antes/imediatamente após reload ANTES de reconfigurar. Identificar reset de inline style de instrumentação; não afirmar persistência de zoom do navegador ou preferência de usuário a partir dele.
4. Separar captura válida, comparação visual e avaliação do requisito. Workspace/laboratório inicialmente fechados são comparáveis; ações de abrir/fechar Conta ausentes no starter ficam NON_EQUIVALENT com justificativa da referência. Não inventar menu no starter.
5. Refatorar o monólito em casos independentes com fixtures controladas e saída incremental. Um erro de captura não pode apagar os casos anteriores. Se o setup for inseguro, interromper; diferenças visuais não abortam todas as dimensões.
6. Smoke mínimo:100->200->100, 320px e1440px, texto real e CDP não vazio; cenário sem fonte retorna INSUFFICIENT_EVIDENCE; reload registra observação anterior à reconfiguração. Exercitar em Chromium real sintético antes de depender de banco.
7. Cobertura A mínima rastreável: workspace e laboratório em320/375/390/768/1440 e667x375/844x390, texto100/200; Conta aberta/fechada e Escape em320/390/1440; safe-area0/34 em375 e667x375; foco/último controle, Back/Forward/reload nas classes relevantes. Evitar produto cartesiano de336 pares; nenhuma dimensão exigida é removida silenciosamente. Registrar quantidades REAIS, não meta de fotos como aceite.
8. Se houver recorte de nome ou menu fora da viewport reproduzido, corrigir somente o componente A e acrescentar regressão. Não modificar ScientificNotice B nem os qualificadores. Se for apenas diferença de layout aprovada, documentar sem redesign.
</plan_implement>

<review_output>
Faça typecheck completo pelo ambiente correto, teste focal e revisão própria. Não afirmar runtime Windows feito em parser local. Entregue commit LOCAL, diff e manifesto de paths, resultados RED/GREEN realmente executados, source SHA, requisitos/tarefas035 atualizados e instrução exata dos testes ao coordenador. Helpers compartilhados precisam estar commitados antes de B executar sua suíte; B pode escrever casos enquanto isso. Saída: A_HARNESS_READY_FOR_RUNTIME, ou bloqueio focal com trabalho preservado. O PASS bilateral só existe após imagens e análise reais.
</review_output>

---

# PROMPT 02 — HF-UI044-CLOSE-B-VISUAL

<papel>
Worker B: concluir a evidência UI06 para área, coleta e IHFR usando a composição, sem reimplementar funcionalidade já aprovada. Leia o CONTRATO COMUM. Esforço recomendado: High ou Extra High. Sem push ou escrita de infraestrutura.
</papel>

<ownership>
Escrita exclusiva: `qa/hf-ui044/domain.spec.ts`, `qa/hf-ui044/domain-fixtures.ts` e docs `specs/036-ajustes-area-coletas-ihfr/**`. `qa/hf-ui044/shared.ts` é somente leitura (A); configs/contract são do coordenador. Alteração de apresentação em produto B só se defeito demonstrado, no mapa de ownership já registrado na Spec036. Sem shell/conta/formulário C, ciência ou schema.
</ownership>

<analyze_plan>
Compare requisitos UI02/03/04/06, starter fixado e testes036/IHFR existentes. Prepare mapa de estados equivalentes e seletores reais por fonte. Não copiar mock, autenticação ou router TanStack para o FullStack. Use dados sintéticos semanticamente equivalentes: área sem coletas, área com coletas ordenadas por ocorrência, coleta mais nova sem diagnóstico e anterior CURRENT, detalhe de coleta, ausência de ambientais confirmados e detalhe experimental completo. Somente estados que a referência realmente suporta podem ser pares equivalentes; declarar divergência de modelo/fixture quando não suportar.

Comece fixture/seletores/cobertura em paralelo com A contra o contrato comum congelado. Não esperar A para ler fontes ou implementar seu arquivo. Não duplicar o helper de escala/fontes; quando disponível, adaptar o import e validar tipos.
</analyze_plan>

<implement>
- Executar starter e FullStack nas mesmas dimensões/escala para cada par; utilizar dados de teste owned e chamadas reais do produto. APIs do starter e seu adapter permanecem apenas na referência.
- Cobrir área, detalhe de coleta e IHFR em320/375/390/768/1440; incluir667x375/844x390 texto200 e teclado/foco. Capture estados centrais100/200 por classe relevante; documente matriz de requisitos antes de publicar e lacunas em vez de fabricar equivalência.
- Preservar ordenação por ocorrência/offset, origem de diagnóstico, CURRENT/revogado/substituído, draft/confirmado, idempotência e os quatro qualificadores científicos.
- No cenário que falhava em A isolada, executar shell A + ScientificNotice B juntos; não alterar `ratio:1`. Registre geometria real e os quatro qualificadores acessíveis, sem exigir todos simultaneamente numa fotografia quando o requisito é leitura por scroll.
- Produzir pares válidos e um relatório de comparação de hierarquia, tipografia, densidade, navegação e acesso às ações. Diferenciar erro técnico do comparador, discrepância esperada e defeito de UX. Não encerrar com uma pasta de screenshots sem análise.
- Corrigir apenas defeitos B reproduzidos e cobertos pela intenção aprovada. Divergência que exige decisão de produto fica localizada, sem bloquear coleta segura restante.
</implement>

<review_output>
Entregar commit LOCAL, matriz requisito/caso/estado/viewports, procedimentos oficiais de fixture/cleanup, diferenças por severidade, comandos da suíte focal e tarefas036 reconciliadas. Estado inicial B_VISUAL_READY_FOR_RUNTIME. Depois de runtime, análise real dos pares e evidência completa, registrar UI06_B_EVIDENCE_COMPLETE; aceite humano segue separado. Nenhuma declaração de 15/15 novo sem run próprio da árvore pertinente.
</review_output>

---

# PROMPT 03 — HF-UI044-CLOSE-C-CAPTURE-GIT

<papel>
Worker C: resolver UI037_CAPTURE_PENDING e terminar a conciliação documental já solicitada, sem reabrir CEP/geocodificador. Leia o CONTRATO COMUM. Esforço recomendado: High. Sem push autônomo ou alterações em workflow.
</papel>

<ownership>
Escrita exclusiva: `tests/e2e/hf-ui037-location.spec.ts`, docs `specs/037-localizacao-endereco-opcional/**` e, se a conciliação local ainda estiver pendente, somente os quatro documentos de `33d9b8b1` em `docs/plans/completed/hf-ui044-worktree-reconcile-01.md` e `docs/reports/2026-11-01-hf-ui044-worktree-reconcile-01/{readme.md,inventory.json,verification.json}`. Produto/CEP, API, Prisma, schema, cálculos, B/A, configurações e respostas brutas ficam intocados.
</ownership>

<analyze_plan>
O CEP já está implementado e a composição passou15/15. A lacuna é de evidência arquivada: o teste grava PNG/JSON em outputPath; upload e suítes posteriores não garantem sua persistência. Não declarar exclusão efetivamente observada sem prova. Leia o hunk A6 de preservação imediata e os globs ativos; não basta acrescentar glob após a limpeza.

Verifique na base local se33d9b8b1 existe e se sua conciliação para C já foi feita, comparando paths/blobs, não somente ancestralidade. Não refazer a retirada dos21 arquivos. Se a branch local C já estiver à frente com documentação autorizada, preservar esse avanço e avisar coordenador.
</analyze_plan>

<implement>
1. Após cada captura UI037, copiar PNG+JSON imediatamente para `.accounts-validation/frontend-areas/`, com nomes estáveis específicos `ui037-frontend-areas-hf-ui037-location-{mobile,desktop}-viewport.{png,json}` ou equivalente que case comprovadamente com os globs oficiais. Não arquivar dados sensíveis ou sobrescrever arquivo de tentativa anterior.
2. Metadados:390x844/1440x900, fullPage:false, escala real, mascaramento, fixture sintética, source SHA/tree e run/attempt. Não trocar o teste funcional de três origens/stale/falhas por simples screenshot.
3. Contraprova de preservação: o artefato final APÓS as suites posteriores deve conter os quatro arquivos dedicados, hash/CRC e dimensões corretos. Confirmar que as suites não os removem do arquivo durável; screenshot em pasta local só não fecha o requisito.
4. Conciliação Git: somente se ainda necessária, transportar os quatro documentos sanitizados autorizados do commit33d para a entrega C, preservando commit/branch de origem. Não transportar .scratch/originais/brutos. Sem git add ., merge da composição ou alteração de ignore para esconder arquivos. Operar na cópia de tarefa, não trocar o checkout do VS Code.
5. Atualizar tasks/evidências037: autoria, runtime focal, arquivamento final e operação externa como fatos distintos. Provedor real permanece desabilitado.
</implement>

<review_output>
Entregue commit LOCAL exclusivo, checks de escopo/privacidade/whitespace/tipos e prova de que os nomes coincidem com o uploader; estado C_CAPTURE_READY_FOR_RUNTIME. Após job oficial do coordenador e auditoria do ZIP, UI037_CAPTURE_VERIFIED somente se os quatro arquivos existirem e forem válidos. Entregue também DOC_RECONCILIATION_APPLIED, ALREADY_PRESENT ou NOT_OBSERVED, sem inventar acesso ao Git local de outra sessão. Publicação da branch C cabe ao coordenador, normal/fast-forward após preservar HEAD real.
</review_output>

---

# PROMPT 04 — HF-UI044-CLOSE-QA-FINAL

<papel>
Revisor técnico não autor. Leia o CONTRATO COMUM, os handoffs locais A/B/C e a candidata FINAL indicada pelo coordenador. Você não implementa os patches auditados. Esforço recomendado: High ou Extra High. Pode começar com leitura de contrato/diffs; conclusão só após runtime terminal da árvore final.
</papel>

<independencia>
Registrar identidade da sessão/agente e separar autoria do código e autoria do parecer. Contas Git iguais não provam nem refutam sozinhas a separação; usar fatos da delegação/autoria disponíveis. Se não demonstrável, INDEPENDENT_REVIEW_NOT_PROVEN, sem aprovação. Nunca emitir review APPROVE em nome de humano. O revisor pode publicar parecer factual na PR45, mas não editar código ou branches de produto.
</independencia>

<review>
1. Reconstruir proveniência: commits/tree do produto, patches exclusivos, base6c, alterações de instrumentação e documentação. Conferir HEADs antes/depois e ausência de alterações fora do mandato. Não transferir15/15 da candidata histórica para uma árvore nova.
2. Ler código da espera de escala/fontes/reload e suas contraprovas. Polling não deve engolir FAIL; [] de CDP não é fallback; reconfiguração pós-reload não prova persistência. Smoke deve ter prova real. Setup e cleanup obrigatórios permanecem qualificados separadamente.
3. Conferir grade de requisitos e casos planejados/executados/ausentes. As336 combinações históricas não são o contrato de produto, mas todos os viewports, texto200, navegação e estados materiais aprovados devem estar cobertos no novo recorte. Diferenças Conta/reload podem ser esperadas; não aprovar sem analisar.
4. Baixar ZIPs por IDs reais; verificar digest/CRC, hashes, JSON/PNG, dimensões e arquivos UI037 após suites posteriores. Inspecionar imagens reais representativas e TODAS as diferenças classificadas bloqueantes. Fonte/fixture/SHA/run exatos, sem segredo. Não substituir imagem do starter por imagem do produto.
5. Verificar quatorze? NÃO: a lista oficial tem exatamente15 gates: RegressionSetup, Unit, Integration, Migration, Contract, R1, Build, Typecheck, Lint, E2E, Https, Deletion, Ihfr, Bootstrap, SchemaAudit. Exigir15 registros únicos/exit0/snapshot consistente quando o run oficial final for necessário; não somar testes sobrepostos.
6. Emitir findings com severidade, path/linha, caso, evidência, owner e reparo mínimo. Devolver reparos ao autor; repetir somente a parte afetada quando um novo SHA surgir. Respeitar o orçamento da missão, sem criar mais uma trilha de preparação independente.
7. Revisar a conciliaçãoC e o estado final dos worktrees/commits. Confirmar que arquivos históricos foram preservados sem exposição e que nenhum resultado local foi inventado como publicado.
</review>

<handoff>
Entregar `qa-final.md` e `qa-final.json` sanitizados em diretório QA exclusivo registrado pelo coordenador, com matriz UI01–UI07 e links por SHA/run/attempt/artifact. Publicar parecer factual na PR45 ou entregar o texto ao coordenador quando não houver conexão autorizada; informar o que ocorreu de fato.

Estados separados: UI06_A_EVIDENCE_COMPLETE, UI06_B_EVIDENCE_COMPLETE, UI037_CAPTURE_VERIFIED, COMPOSITION_REGRESSION_PASS, INDEPENDENT_TECHNICAL_REVIEW_COMPLETE — cada um somente se comprovado. Conclusão READY_FOR_MAINTAINER_REVIEW apenas sem finding técnico bloqueante e sem lacuna obrigatória de evidência. Caso contrário BLOCKED_WITH_EXACT_FINDINGS, com uma lista curta e reproduzível.

Não transformar isso em merge, homologação de provedor, aceite humano/científico ou fechamento automático de G3/G4/G5. Não pedir nova auditoria geral quando os critérios técnicos do escopo estiverem satisfeitos.
</handoff>

---

## Formato obrigatório do handoff de cada worker

Registrar JSON/Markdown equivalente, sem placeholders inventados:
- mission/role; agentId real ou indisponível; worktree/branch/base/head/tree;
- paths autorizados e paths realmente alterados;
- arquivos de produto vs instrumentação vs documentação;
- requisito/taskId -> caso/teste -> resultado -> fonte/SHA/run/attempt/artifact;
- comandos executados/exit codes e NOT_RUN com motivo concreto;
- achados/limitações; dependências de outros owners;
- commit(s) local(is), patch hash, publicação feita/não feita;
- estado inicial/final do Git e preservação de trabalho concorrente;
- runtime completo/parcial, comparação visual e aceite humano separados.

## Referências técnicas primárias consultadas na preparação

- OpenAI, [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents): delegação explícita, tarefas delimitadas, resultados esperados e cuidados com escrita concorrente. Disponibilidade depende da sessão real.
- OpenAI, [Codex Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide): continuidade até implementação/validação, contexto pertinente e preservação de mudanças existentes.
- OpenAI, [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees): isolamento de tarefas em paralelo, sem significar cópias de produto divergentes a integrar indiscriminadamente.
- Playwright, [Assertions](https://playwright.dev/docs/test-assertions) e [outputDir](https://playwright.dev/docs/api/class-testconfig#test-config-output-dir): polling limitado e persistência de arquivos fora da saída limpa entre execuções.
- Chromium CDP, [CSS.getPlatformFontsForNode](https://chromedevtools.github.io/devtools-protocol/tot/CSS/#method-getPlatformFontsForNode): consulta das fontes usadas nos TextNodes do nó; falta de retorno não prova fonte alternativa.
- GitHub, [eventos de workflow](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#push): branch/ref e evento devem corresponder à estratégia nova, sem presumir dispatch em workflow fora do default.
- Vercel, [git.deploymentEnabled](https://vercel.com/docs/project-configuration/git-configuration#git.deploymentenabled): controle aditivo por branch antes da publicação; não usar push para experimentar um deploy.

**As tags XML deste pacote delimitam instruções; não habilitam ferramentas, não elevam privilégios e não são macros mágicas do projeto. A hierarquia real é a do ambiente e de AGENTS/constituição.**
