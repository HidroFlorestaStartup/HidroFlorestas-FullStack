# PR50 — onda técnica B local, 2026-11-02

`EVIDENCIA_IMPLEMENTACAO`: **NO_CODE_CHANGE_REQUIRED** no recorte QA B inspecionado. A correção já presente em `ea43ad24a8307be6a0c7b183320b460f42dbc32d` passou nas contraprovas locais Windows. Nenhum defeito novo foi comprovado para justificar alteração de código. Este registro não encerra a segunda onda de execução oficial, a comparação bilateral, a matriz de produto75, RC15 ou aceite humano/científico.

## Fonte e escopo

- Worktree exclusiva: `C:/Users/selah/.codex/worktrees/hf-ui044-pr50-final/HidroFlorestas-FullStack`; branch `fix/hf-ui044-ui06-b-residual-20261101`.
- `git status --short` inicial: vazio, exit0. HEAD inicial: `ea43ad24a8307be6a0c7b183320b460f42dbc32d`.
- Antes da inspeção foram lidos AGENTS.md, PROJECT_CONTEXT.md, TECH_DECISIONS.md, constituição e spec/plano/tarefas036 pertinentes; nenhum AGENTS.md mais específico foi encontrado.
- Apenas este recibo foi escrito. `qa/hf-ui044/**`, inclusive shared.ts, produto, ciência, fixtures, guardas, workflows e plano/tarefas ficaram sem alteração por este agente. A Frente C em `G:/projetos/ifma/HidroFlorestas-FullStack` não foi escrita.
- Sistema observado: Microsoft Windows NT10.0.26200.0; Node local `v24.14.0`; Chrome/Chromium `156.0.8078.79` existente no host. O Node local fica abaixo do engine24.19 exigido pelo pacote: prova local adicional, não equivalência ao runtime oficial.

## Contraprova RED → GREEN do contorno

O callback antigo foi obtido em memória com `git show ea43ad24^:qa/hf-ui044/domain-geometry.ts`, transpilado por TypeScript e executado em Chromium; nenhum checkout ou troca do arquivo atual foi feito. Pai exato: `a290cfc6383dc8fa0a61bd17122f95735da54ce2`. Blob antigo `de7911e0b4f73df418f7c7eac9ee1d861455ae8c`; atual `6ae5ff1a6b67c505d8842dc692b60013343bca6a`.

SHA256 do helper antigo: `a999d07024f736136965b96c65b47fd261bacced12f4f071d15511aafba611b9`. SHA256 do arquivo atual: `3ec4bbaeb17ea9d0f15839cacd1e15387ccc820e61f783ccd7638795ccb86026`.

Replays DOM sintéticos das caixas já registradas no artefato histórico, com fonte raiz32px, DIV, borda dashed, padding e raio1rem:

| viewport | caixa top/left/width/height px | helper antigo | helper atual | overlay real8×8px no probe atual |
|---|---|---|---|---|
|320×900|250.40625 /16 /288 /458|4 cantos→SECTION; rejeita|5 probes→DIV; aceita|rejeita|
|667×375|77.671875 /16 /635 /218|4 cantos→SECTION; rejeita|5 probes→DIV; aceita|rejeita|
|844×390|146.671875 /224 /596 /218|4 cantos→SECTION; rejeita|5 probes→DIV; aceita|rejeita|

Nos três, `ratio=1`, centro atingível e caixa na faixa útil permaneceram verdadeiros. A contraprova com node:test exigindo `fullyExposed=true` do helper antigo falhou exatamente3/3, exit1, com `OLD helper incorrectly rejects visible rounded card`; zero skip. Com o helper atual, os três mesmos replays passam. Inserir overlay DOM fixed/z-index1000 sobre o probe atual manteve ratio1, mas tornou o probe obstruído e `fullyExposed=false` nos três; exit0 da verificação positiva/negativa conjunta. Não se aceitou ancestral nem se mutou CSS para fazer o alvo passar.

O RED foi executado por um here-string PowerShell entregue a `node --experimental-strip-types --input-type=module`; o script importou node:test/assert, obteve o blob via execFileSync git show e utilizou a mesma composição de replay de `domain-hit-contour-browser.test.mjs` com os três valores da tabela. A única expectativa que falhou foi a exposição integral que o cartão visível deveria obter. As execuções dos replays não são somadas aos78 testes distintos abaixo.

## Comandos e resultados

Comandos executados da worktree exclusiva; as variáveis abaixo apontaram apenas para o browser já instalado, sem fixture de banco ou alegação de GitHub runner:

```powershell
$env:HF_UI044_SYNTHETIC_BROWSER='1'
$env:HF_UI044_SYNTHETIC_CHROMIUM='C:/Program Files/Google/Chrome/Application/chrome.exe'
node --experimental-strip-types --test qa/hf-ui044/domain-geometry.test.mjs qa/hf-ui044/domain-collection.test.mjs qa/hf-ui044/runner-gate.test.mjs qa/hf-ui044/domain-hit-contour-browser.test.mjs qa/hf-ui044/domain-scroll-owner-browser.test.mjs qa/hf-ui044/domain-lifecycle-browser.test.mjs
```

**78/78 PASS, fail0, skip0, exit0**. Contagem: geometria24; coletor8; guarda8; contorno Chromium31; comparador/scroll-owner Chromium6; lifecycle Chromium1. O teste de arquivamento não é contado como teste comportamental; o caso do comparador com14 combinações continua contado como um teste.

Cobertura executada:

- Larguras320/375/390/667/768/844/1440 e texto100/200:14 combinações no contorno e14 no comparador real extraído de domain.spec.ts. Fonte medida16/32px, sem desativar ampliação.
- DOM computado seleciona content em320/375/390/667 e document em768/844/1440; o owner não selecionado não se move. Contraprova altera somente fixture sintética para overflow auto em844 e visible em667: seleção segue DOM, sem deduzir owner do breakpoint.
- `ratio:1`, centro, cinco probes, faixa de leitura e scroll único permanecem exigidos quando a caixa cabe. Range insuficiente, clamp e mensagem maior que a faixa conservam exposição parcial/falha; não passam por redução de limiar.
- Raios zero,32px,9999px,50% e elipses percentuais assimétricas; overlay real individual sobre cada um dos cinco probes; clipping por inset e polígono. Referência com cabeçalho sobrepondo26px continua NON_EQUIVALENT com ratio1 e centro livre.
- Último controle com foco em667×375 e844×390 permanece focado, inteiramente na faixa acima do rail, atingível e com ratio1.
- Lifecycle real Chromium: contexto com operação pendente é fechado e rejeita a operação antes de iniciar fonte independente. Coletor preserva falha, inicia os75 uma única vez e trata fechamento falho/lento como falha material.

```powershell
node node_modules/typescript/bin/tsc --target ES2022 --module nodenext --moduleResolution nodenext --strict --noEmit --skipLibCheck qa/hf-ui044/domain-geometry.ts qa/hf-ui044/domain-collection.ts qa/hf-ui044/runner-gate.ts
```

**PASS, exit0**, sem emissão de arquivos. Não equivale a typecheck completo.

Uma primeira tentativa com `node --import=tsx --test` falhou por interoperabilidade CommonJS/named exports dos helpers (`FOCAL_DOMAIN_IDS`, `classifyHorizontalOverflow`, `isApprovedFreshWindowsRunner`), exit1 do processo Node. A execução documentada acima usa strip-types nativo, como o recibo anterior da correção; nenhum package.json foi alterado para contornar essa característica do ambiente.

## Seleção real75 e fixtures

Verificação adicional executou o trecho real `const dimensions` até antes de `const caseExecutors` de domain.spec.ts, transpilado sem seus hooks/serviços, com IHFR_CONTRACT real e selectDomainCases real. SHA256 da fonte: `ebdec223433c846ee9ada540760c8e5d83e85506ad9f82ba848782edcb7e8cc4`.

Resultado: **75 IDs únicos =60 centrais +12 qualificadores +2 jornadas +1 reload**, exit0. Focal3 seleciona exatamente:

- `domain-area-empty-320-900-200`
- `domain-area-empty-667-375-200`
- `domain-area-empty-844-390-200`

Isso verifica o construtor real, não executa a matriz bilateral. Inspeção de fixtures confirmou gate antes de count/setup de auth e antes do primeiro acesso ao banco. Dados sintéticos imutáveis permanecem até descarte do runner owned; afterAll limita detach/close, usa recibos por worker com flag wx e lança DOMAIN_BROWSER_CLEANUP_FAILED quando necessário. O teste de runner gate verifica essas precondições e rejeita ambiente local, branch/ref/identidade incorretos, rerun, self-hosted e atestação ausente.

Não foi executado setupFullstackDomain, banco, API nativa ou teardown de dados neste host. Não houve spoof de variáveis de GitHub, Actions, push, merge, deploy ou review request.

## Handoff

`RECOMENDACAO`: manter o código ea43ad24 sem patch técnico adicional; encaminhar este recibo e o escopo restante ao integrador e à revisão não autora. A evidência de 2026-11-02 em Linux permanece histórica e separada; este é um corte novo local Windows.

Estado preservado: `FULLSTACK_STARTER_RUNTIME=NOT_RUN`, `FINAL_75_CASES=NOT_RUN`, `FINAL_RC15=NOT_RUN`, `FULL_REPO_TYPECHECK=NOT_RUN`, `INDEPENDENT_REVIEW=OUTSIDE_THIS_AUTHOR_SCOPE`, `HUMAN_ACCEPTANCE_PENDING`. Cinco probes são amostragem; esta prova não demonstra ausência de toda oclusão pixel a pixel ou de overlays pointer-events:none. Nenhuma conclusão científica foi emitida.
