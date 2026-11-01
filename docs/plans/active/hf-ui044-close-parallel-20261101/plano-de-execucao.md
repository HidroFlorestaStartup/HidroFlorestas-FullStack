# HF-UI-044-CLOSE-PARALLEL-02-COORD

Estado: EM_ANDAMENTO. Origem: mandato explícito do usuário em 2026-11-01.
Objetivo: evidência executada UI06 A+B, preservação UI037, reconciliação e revisão não autora.
Base funcional 6c61056f; pacote 22bb9c1b; fontes UI01–07 em 972f9b00.
Escopo: qa/hf-ui044, orquestração focal, workflow novo, guard aditivo, specs035–037.
Fora: merge/deploy/main/development/#44, fontes privadas, ciência e provedores reais.
Estado inicial principal: feat/localizacao-endereco-opcional c7b023f, status limpo;
worktree documental 33d9b8b preservado. Não repetir limpeza dos21 arquivos.

## Etapas e responsabilidades

1. ANALYZE somente leitura das fontes, specs/plan/tasks e falha 048de7c5.
2. PLAN: contrato congelado, novos IDs de tarefas por owner, análise de consistência.
3. IMPLEMENT: A helpers/smoke/shell/035; B domain/fixtures/036; C UI037/037 e quatro docs.
4. Coordenador integra apenas deltas exclusivos; infraestrutura é writer exclusivo do coordenador.
5. REVIEW/COMMIT local; runtime Windows GitHub-hosted Node24.19.0; Bun1.3.11 só starter;
   PostgreSQL owned só jobs pertinentes. Sem instalar ferramentas globais no host.
6. Até três SHAs/uma tentativa cada: smoke5 + ui-a35 + ui-b35 + rc-ui03735 =330min configurados.
   Uma publicação consolidada A/B/C, CI automática separada até3x35; teto combinado445min.
7. Download de artifacts14dias sanitizados/allowlist, CRC/digest e inspeção de imagens reais.
8. Executor não autor PROMPT04 após runtime; recibo factual único na PR45 e PRs reconciliadas.

## Critérios e limites

Execução, comparabilidade, requisito e completude separados; imagens não são aceite humano.
Quinze gates oficiais sobre candidata quando testes obrigatórios mudarem; ratio1 preservado.
Preview false antes de qualquer push. Não alterar guardas de banco/ACL do host.
Parar só em conflito material, permissão negada ou orçamento esgotado; preservar trabalho.
HUMAN_ACCEPTANCE_PENDING; GEOCODER_OPERATIONAL_PENDING; quatro qualificadores IHFR preservados.
Verificações: escopo/diff/whitespace, sintaxe/tipos, smoke real, suítes focais e15 gates,
hashes/CRC/dimensões/metadados e revisão independente. Resultados ainda NOT_RUN.

## Histórico

- 2026-11-01: fontes e refs reconfirmadas; quatro worktrees managed isolados criados;
  contrato de evidência antes da delegação. Skills aplicadas manualmente conforme mandato;
  não se declara CLI Spec Kit nem execução do setup-plan que sobrescreveria plano existente.
