# HF-UI-044 — Guia para Pedro, Luciano e assistentes de IA

**Data do corte:** 02/11/2026 (America/Fortaleza). **Classificação:** `EVIDENCIA_IMPLEMENTACAO` + procedimento `RECOMENDACAO_CONDICIONAL`. **Estado de produto:** `READY_FOR_MAINTAINER_REVIEW`, **não** é aprovação humana, merge ou deploy.

## 0. Missão e limites

Destinatários: Pedro e Luciano, responsáveis pela validação e decisões de integração. Executor técnico: assistente de IA conectado ao GitHub ou Codex Local **somente após autorização inequívoca**. Coordenador único e, se necessário, QA não autora. Não inventar subagentes, CI, revisões ou aprovações; verificar sempre os SHAs atuais.

**Repositório:** `HidroFlorestaStartup/HidroFlorestas-FullStack`.
**PR principal de evidências:** https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/50
**SHA tecnicamente testado:** `3c9b9c83e3abca48ede0b8c4f03343e4b4aa3698`.
**Tree tecnicamente testada:** `0f134faf3d69c87a449f908d106d3986a34192a1`.
**CI oficial:** https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41488874486 — tentativa 1, três jobs `SUCCESS` (focal 3/3, bilateral 75/75, RC 15/15).
**Parecer:** https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/50#issuecomment-6584496002
**Codex Review:** https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/50#issuecomment-6583440660
**Review threads históricas desatualizadas, ainda não resolvidas formalmente:** [scroll owner/P1](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/50#discussion_r4438596010) e [rounded hit/P2](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/50#discussion_r4438818762). Reconciliar com as correções e evidências no SHA final antes de marcar resolvidas; não tratá-las como findings novos.
**Resumo preparatório:** https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45#issuecomment-6584519514

O resultado técnico confirma 150 amostras válidas nos 75 pares de UI06-B, 15 gates oficiais PASS e quatro evidências UI037 preservadas. As comparações se dividem em **25 COMPARABLE e 50 NON_EQUIVALENT**. `NON_EQUIVALENT` descreve diferenças documentadas da referência, não falha de execução nem aprovação visual automática. A86 é evidência histórica própria da R3, não uma reexecução neste SHA.

**Qualificadores preservados:** `HUMAN_ACCEPTANCE_PENDING`, `GEOCODER_OPERATIONAL_PENDING`, `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`, `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## 1. Manifeste as decisões humanas antes de começar

- [ ] Pedro e Luciano revisaram UI-01 (navegação/Conta) e UI-05 (barra móvel e foco).
- [ ] Revisaram UI-02 (coletas pela área, data de ocorrência e último IHFR disponível), UI-03 (detalhe da coleta) e UI-04 (mensagens/qualificadores e expansíveis).
- [ ] Revisaram UI-06 contra as oito imagens originais e as capturas reais, **especialmente as 50 diferenças NON_EQUIVALENT**; aceitaram ou documentaram ressalvas, inclusive a observação histórica de sobreposição de parte do logo em 844px e o aviso de hidratação (não classificado como finding material no escopo QA-T1/T2).
- [ ] Revisaram UI-07 (coordenadas dispositivo/mapa/digitação; município/UF/CEP opcionais), cientes de que o **geocodificador externo real ainda exige homologação separada**.
- [ ] Decidiram expressamente se autorizam apenas **preparar uma PR de integração** ou também **fazer o merge após CI e review no novo SHA**.
- [ ] Decidiram separadamente se autorizam **fechar PRs substituídas e limpar branches** após confirmar incorporação/backup.

A decisão pode ser: `APROVADO_COM_RESSALVAS`, `APROVADO` ou `AJUSTES_NECESSARIOS`, com responsável, data, ressalvas e escopo (UI-01–UI-07). Sem aceite: **parar antes do merge**.

## 2. Manifesto Git: PRs e dependências (reconfirmar antes de operar)

| PR | Objetivo | Branch | SHA observado | Relação |
| --- | --- | --- | --- | --- |
| [#44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/44) | Decisões aprovadas, sete documentos e oito imagens originais | `docs/handoff-ajustes-interface-20261030` | `972f9b00189bf09117883913d8c4fa63e69f4d2f` | Base `development`, independente |
| [#45](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45) | Guardas CI/Preview, handoffs G0 | `chore/hf-ui044-ci-preview-guards` | `22bb9c1bee446e02b0bf8ce702e0db89b9e74905` | Contém base comum `07755822...`, com documentos posteriores |
| [#46](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/46) | UI-01, UI-05, partes UI-06 | `feat/ajustes-navegacao-conta` | `e5d030918bc0c04c321aff42cbc2e3fb6faad256` | Branch funcional A, histórica divergente |
| [#47](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/47) | UI-02/03/04, partes UI-06 | `feat/ajustes-area-coletas-ihfr` | `ca1d03b49c214986c7640d80e6e78d8067753ae2` | Branch funcional B, histórica divergente |
| [#48](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/48) | UI-07, endereço opcional | `feat/localizacao-endereco-opcional` | `641be73e32bcbaed282cac81dec9ae85a52b32de` | Branch funcional C, histórica divergente |
| [#49](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/49) | Composição A+B+C, instrumentação QA | `codex/hf-ui044-close-20261101` | `ebf7e9707d5beba949ae932cdffeb3f9068f8a73` | Base `development`; ancestral direto de #50 |
| [#50](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/50) | Recuperação final QA e CI 75/75 +15/15 | `fix/hf-ui044-ui06-b-residual-20261101` | `3c9b9c83e3abca48ede0b8c4f03343e4b4aa3698` | **Base de PR #50 é a branch #49, não development** |

**Base `development` observada:** `9b8595d232842d401ce81bbc92c54dd543aa2829`. `main` observada: `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`. Ambas devem ser reconfirmadas.

### Resultado da auditoria de blobs (02/11/2026)

Comparados os arquivos efetivamente modificados versus `development` em #46/#47/#48: os blobs de **`src/**` e `tests/**` dessas frentes estão idênticos nos caminhos correspondentes da árvore #50**. Portanto, não fazer merge automático das branches A/B/C por cima da composição sem uma reconciliação de conteúdo.

**Faltas e divergências documentais relevantes na árvore #50:**

- #44: **15 arquivos ausentes** (documentos originais de decisão/aceite e oito PNGs); alguns arquivos de governança/configuração existentes têm versões distintas.
- #45: **12 documentos G0 ausentes**; workflow/guarda final precisam de comparação, nunca substituição cega.
- #46: **dois recibos finais A ausentes**, e documentos Spec 035 divergentes.
- #47: **dois relatórios finais B ausentes**, e documentos Spec 036 divergentes.
- #48: nenhum arquivo de sua mudança versus `development` ausente ou divergente no conteúdo final, **exceto configurações compartilhadas** (`rc-review.yml` e `vercel.json`).

Arquivos ausentes de A: `specs/035-ajustes-navegacao-conta/evidence/close02-r3-final.json` e `specs/035-ajustes-navegacao-conta/evidence/close02-r3-visual-analysis.md`.
Arquivos ausentes de B: `specs/036-ajustes-area-coletas-ihfr/evidence/close02-final-findings.md` e `specs/036-ajustes-area-coletas-ihfr/evidence/close02-final-runtime.json`.

**Conflito de autoridade:** não copiar `plan.md`/`tasks.md` antigos sobre versões QA finais; preservar histórico via adendo ou arquivo exclusivo após auditoria. Não classificar como integrados os documentos faltantes apenas porque o código está equivalente.

## 3. Sequência recomendada para uma IA integradora (somente depois do aceite para preparação)

**O0 — Reconciliação somente leitura.** Revalidar branches, HEADs, ancestralidade, PRs/reviews, check runs e artifacts, `AGENTS.md`, constituição, Spec 035/036/037, worktrees/owners, status tracked/untracked/ignored, locks/processos. Não presumir checkout limpo da máquina dos alunos. Registrar SHA testado `3c9b9c83` e diferenciar do futuro SHA integrado.

**O1 — Preparar branch de integração isolada.** Criar `integrate/hf-ui044-aceite-20261102` **a partir da `origin/development` então atual**, em nova worktree autorizada. Não escrever em `development`/`main` protegidas. O futuro push da nova branch pode ativar Vercel automaticamente: antes do primeiro push, adicionar em `vercel.json` `git.deploymentEnabled["integrate/hf-ui044-aceite-20261102"] = false` e verificar a configuração atual, além dos gatilhos externos. Se CI for esperada nesse nome, preparar filtros `on.push.branches` e `jobs.if` equivalentes, sem afrouxar gates ou permissões; caso não seja viável, bloquear a publicação e propor alternativa segura.

**O2 — Composição por conteúdo, não por clique em sete PRs.** Na worktree de integração, reconciliar **#44 (decisões e PNGs) → #45 (G0/guardas) → #50 (composição que descende de #49)**. O integrador pode usar merges normais na branch de integração e resolver conflitos com a autoridade de cada fonte, mas não fazer merge direto dessas PRs em `development`. #49 já é ancestral de #50; não importar os mesmos commits duas vezes. Reconferir os arquivos exclusivos A/B, preservar recibos antigos sem reverter specs mais novas, e demonstrar que nenhum código/teste aprovado das três frentes foi perdido. **A ordem é de reconciliação de fontes, não uma promessa de ausência de conflitos.** Não fazer push antes da avaliação dos hunks e da guarda Preview.

**O3 — QA e CI no SHA de integração.** Registrar diff completo de `origin/development` à candidata de integração, ownership e ausência de segredos. Executar checks aplicáveis, especialmente os 15 gates oficiais, smoke UI-01–UI-07 e verificação das evidências UI-06/UI-07 no **novo SHA**. Reutilização de evidências históricas só com igualdade comprovada de blobs/contrato; nunca transferir PASS de `3c9b9c83` para árvore diferente. `@codex review` e QA independente no SHA final da PR de integração, se disponíveis, e tratar findings. Se a CI não disparar por filtro, isso é NOT_RUN, não PASS. Garantir que uma mudança em `development` não acione deploy não autorizado.

**O4 — Decisão de merge.** Abrir **uma PR de integração** para `development`, informar #44–#50 como fontes, SHAs, artefatos e diferenças. Apresentar ao mantenedor um recibo de ausência de duplicação, configuração Preview e status de CI. **Somente com autorização humana expressa de merge, aprovação e checks do SHA final**, executar merge pela interface/CLI autorizada. `READY_FOR_MAINTAINER_REVIEW` de #50 não substitui autorização de merge. Produzir recibo do novo SHA de `development` e confirmar comportamento/efeito de deploy; se houver deploy involuntário esperado, parar antes do merge.

### Comandos de preflight PowerShell (adaptar caminhos; não fazem merge)

```powershell
git remote -v
git fetch origin
git status --porcelain=v2 --untracked-files=all
git worktree list --porcelain
git rev-parse origin/development
git rev-parse origin/fix/hf-ui044-ui06-b-residual-20261101
git merge-base origin/development origin/fix/hf-ui044-ui06-b-residual-20261101
git diff --stat origin/development...origin/fix/hf-ui044-ui06-b-residual-20261101
```

Para criar branch/worktree em ambiente autorizado **depois do aceite**, preferir `git worktree add -b integrate/hf-ui044-aceite-20261102 <CAMINHO-NOVO-VERIFICADO> origin/development`; não criar em caminho já ocupado. Em qualquer conflito, **parar e revisar**, não resolver com `--ours`/`--theirs` indiscriminadamente.

## 4. Limpeza APENAS após integração e comprovação de preservação

O escopo de remoção precisa ser **autorizado pelos owners e pelo mantenedor**. Nenhuma limpeza antecipada em branches com PR Draft, worktrees, stashes, arquivos ignorados, backups ou atividade concorrente.

**Pré-condições cumulativas:**

1. PR de integração efetivamente merged em `development`, verificada por ID, autorizações, SHA de merge/squash e checks em seu SHA resultante.
2. Todos os caminhos validados (código A/B/C, specs, fontes #44 e documentação G0) presentes na `development` ou preservados em referência/tags/backup identificáveis por SHA; histórico de QA e artifacts acessíveis.
3. Para cada branch proposta para exclusão: owner identificado, sem commits exclusivos ainda necessários, sem PR dependente ativa, sem trabalho não publicado, sem worktree ainda ligada, sem arquivos untracked/ignored indispensáveis, sem processos/locks.
4. Inventário de branches, worktrees, PRs, SHAs, stashes, backups e hashes registrado antes da limpeza; confirmação humana explícita sobre os **nomes exatos** a apagar.

**Fechamento de PRs:** PRs cujo conteúdo entrou via PR de integração podem ser **fechadas como `superseded/incorporated via PR #N`**, com comentário e SHA; não dizer que foram `merged` individualmente se foram somente fechadas. Não alterar o histórico de reviews ou recibos. PR #44 documental deve ser preservada até assegurar seus documentos/PNG originais. PR #50 teve base #49; não clicar no Merge de #50 supondo que o destino seja `development`.

**Remoção segura:** depois do aceite e inventário, usar `git worktree remove <path>` **sem `--force`** apenas se worktree limpa, arquivos importantes publicados/guardados e não houver processos. Confirmar `git worktree list --porcelain`. Para branches locais realmente integradas, `git branch -d <branch>`; após squash, se `-d` recusar, não usar `-D` para contornar sem recibo de equivalência e autorização específica. Para branch remota aprovada para exclusão, `git push origin --delete <nome-exato>` somente depois de confirmar redundância, backups e permissão do owner. Não usar `git clean -fdx`, `git worktree remove --force`, `rm -rf`, exclusão cega de `.local`, `.env`, bancos, backups ou diretórios ignorados.

**Não excluir por padrão:** `main`, `development`, `feature/automated-setup`, branches/PRs alheios à HF-UI-044 ou qualquer nome sem aprovação individual.

## 5. Recibo de handoff da IA (obrigatório)

```text
ESTADO: PASS / PARTIAL / FAIL / BLOCKED
DECISAO_HUMANA: nomes, datas, escopo, aceite e autorizações separadas
O0: repo, remoto, development HEAD, PR #44–#50 HEADs, worktrees, donos
O1: branch/worktree nova, guardas CI/Vercel, diff e conflitos
O2: origem de cada caminho/proveniência, ausência de código duplicado,
    docs/PNGs originais e recibos A/B preservados
O3: SHA/tree testados, run/attempt, 15 gates, @codex review,
    QA independente, findings e evidências UI-01–UI-07
O4: PR de integração, revisão/aceite/merge efetivos ou BLOQUEADO
LIMPEZA: inventário PR/branches/worktrees, backups/hash,
         consentimento por branch, ações efetuadas, espaço recuperado
LIMITES: HUMAN_ACCEPTANCE, GEOCODER_OPERATIONAL,
         IHFR_EXPERIMENTAL / VALIDACAO_CIENTIFICA_PENDENTE
```

Nenhuma execução em background foi autorizada por este documento. IA deve responder com evidências, sem se atribuir permissões humanas, sem ocultar gates pendentes e sem confundir aprovação técnica com ciência, operação ou UX.
