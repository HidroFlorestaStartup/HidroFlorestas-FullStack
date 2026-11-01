# HF-UI-044-CLOSE-C — conciliação factual da UI-07 e Spec 037

**Ambiente:** ChatGPT Work/Pro com GitHub. **Owner exclusivo:** Frente C, PR Draft #48, branch `feat/localizacao-endereco-opcional`, Spec 037. **Pode iniciar paralelamente às frentes A e B.**

**Checkpoint observado:** `63925b3639f3eec1dd4bd737f7be7adb881c83eb`; [Actions #41251980306](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41251980306), tentativa 1, `completed/success`, **15/15 gates PASS e 224 E2E gerais**. A persistência opcional do CEP foi implementada e testada; **não ressuscite a pendência inicial de CEP como se ainda faltasse código**.

## Fontes de autoridade e preflight — obrigatório

1. Repositório `HidroFlorestaStartup/HidroFlorestas-FullStack`. Leia `AGENTS.md` aplicáveis, `PLANS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `.specify/memory/constitution.md`, `docs/governance/SOURCE_AUTHORITY.md`, PRD Code-First e as skills `speckit-*` realmente instaladas.
2. Leia integralmente as decisões de Pedro no [handoff #44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030/decisoes-e-escopo.md), mais `prompt-de-execucao.md`, `plano-de-execucao.md`, `criterios-de-aceite.md`, `referencias-visuais.md` e `evidencias-de-preparacao.json` nesse SHA. Os sete ajustes UI-01–UI-07 estão aprovados; REV-01–REV-03 não.
3. Consulte o [handoff G0 completo](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/blob/01a2b0fe99da470b1ecc1b7f8e785b7023f81cb2/docs/plans/active/hf-ui044-g0/handoff-de-execucao.md), as PRs #45–#48 e as specs 035–037 nos HEADs **novamente observados**. `GUARD_SHA=07755822f5dc75fe2be1d924005d30ed99f64a0b`, `development` histórico `9b8595d232842d401ce81bbc92c54dd543aa2829`. Não trate SHAs históricos como alvo de reset.
4. Antes de editar, examine branches/upstreams, histórico/ancestralidade, worktrees e alterações não commitadas no ambiente que realmente controla, PRs/commits concorrentes, scripts e o banco sintético permitido. Conserve todo trabalho alheio. Se não puder observar máquina local, diga `LOCAL_WORKTREES_NOT_OBSERVABLE`; não invente preflight.
5. Use Spec Kit **ANALYZE → PLAN → IMPLEMENT → REVIEW** conforme o recorte; não crie nova numeração se a spec já existe. Delegue subagentes **apenas** se houver ferramenta real; caso contrário `NATIVE_SUBAGENTS_NOT_AVAILABLE`, sem revisão independente simulada.

## Limites invariantes

Não executar merge, auto-merge, deploy, promoção, alterações em `main`/`development`/PR #44, Neon, migrations hospedadas, SMTP real, Cloudinary, ativação de geocodificador, nem mudança científica. Não absorber `feature/automated-setup`; não editar `vercel.json` ou `.github/workflows/rc-review.yml` em branches funcionais. Preservar autenticação/autorização, drafts vs confirmados, idempotência, quatro qualificadores do IHFR experimental e os quinze gates sintéticos. `PASS`, `FAIL` e `NOT_RUN` são por **SHA, run e tentativa**, nunca herdados. Sem aprovação humana fictícia.

## ANALYZE

- Leia `specs/037-localizacao-endereco-opcional/{spec,plan,tasks,implementation-evidence,analysis-review,research,data-model,quickstart}.md`, contratos aditivos e os artefatos `13062501328`. Reconcilie T010, T011 e T017 ainda marcados abertos no checkpoint, com o run terminal e evidências realmente presentes.
- Releia as três origens de coordenadas (dispositivo/mapa/digitação válida), as oito combinações opcionais município/UF/CEP, normalização, POST/GET/list/Prisma, concorrência de requests, correção manual e falhas/timeout/429; confira que testes realmente entram no comando oficial e não apenas existem em arquivos.
- Separe screenshot `frontend-areas` produzida no run de capturas específicas `hf-ui037-location` previstas, mas não encontradas como entradas próprias no artefato. Não alegue que uma prova inexistente foi gerada.
- O geocodificador real permanece `NOT_CONFIGURED/NOT_RUN`; não habilite `HF_REVERSE_GEOCODER_URL` nem use Nominatim público sem aprovação/limites/privacidade/atribuição. Isso não desfaz CI sintética aprovada.

## PLAN / IMPLEMENT

- Priorize **somente o delta factual/documental necessário**, sem reescrever testes ou produto já aprovado. Ajuste `tasks.md`, `implementation-evidence.md`, `plan.md` e PR #48 para registrar T010/T011/T017 como concluídas **apenas** na parte comprovada, e mantendo itens operacionais como pendências diferentes.
- Se a auditoria revelar um defeito material novo na UI-07 ou falta de evidência de aceite obrigatório, registre reproduções e corrija dentro do ownership C; coordene previamente qualquer arquivo compartilhado `area.contracts.ts`, `area.type.ts`, testes comuns, schema ou dependências, sem alteração concorrente silenciosa.
- Capturas adicionais específicas são aceitáveis somente se executadas em ambiente sintético real com atribuição de SHA, viewport/texto200 e dados redigidos; não são pretexto para alterar a pipeline compartilhada ou ligar provedor real.

## REVIEW

- Reporte `CODE_SHA_TESTED` e `DOC_HEAD`; se houver push só documental, não declare os 15 gates de um SHA diferente como CI do novo HEAD. Leia o resultado das Actions que dispararem e registre equivalência estática dos arquivos de produto se aplicável.
- Preserve logs do primeiro FAIL de contrato e TypeScript como história, documentando que foram corrigidos; sem novo pedido de migration hospedada. Escopo fica restrito à UI-07.
- Conclua `UI037_CODE_SYNTHETIC_CLOSED` se rastreabilidade e CI real comprovam, **separado** de `GEOCODER_OPERATIONAL_PENDING` e `HUMAN_ACCEPTANCE_PENDING`.

**Saída:** PR #48 e Spec 037 reconciliadas; tabela requisito→teste→SHA→evidência; referências de captura verdadeiras; limites externos, dependências e próximo passo da QA de composição.
