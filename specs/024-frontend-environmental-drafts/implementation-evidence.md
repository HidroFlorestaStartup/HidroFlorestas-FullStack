# Evidências da continuidade R3 — 20/10/2026

## Incorporação complementar e candidata seguinte

A segunda candidata preserva como primeiro parent `5ca520500298a2066f2072290998754a4a62d42e` e incorpora como segundo parent a fase6 `2a047d10360803517ff6bf64b38754cd0f07f5ba`. O merge-tree encontrou uma única sobreposição textual em `.github/workflows/rc-review.yml`: os dois lados acrescentavam capturas no mesmo trecho. A resolução preserva a união dos caminhos sanitizados de coleta/ambiental e todas as allowlists da branch ambiental. Os demais arquivos herdados conferem byte a byte com o merge-tree automático. [Registro da incorporação](evidence/r3/second-candidate-incorporation.json). Não houve rebase, force-push ou merge de PR.

A sincronização agora aguarda todas as gerações de transições finitas, conclui o ciclo ResizeObserver/foco em dois frames e reavalia antes da única rolagem. O helper final passou21/21 contraprovas independentes e3/3 reproduções focais, preservando foco,9hit tests e animação infinita. A pausa pendente foi excluída porque sua promise `finished` pode não resolver. [Evidência compartilhada da fase6](../023-frontend-collections/implementation-evidence.md).

O workflow preserva PNG/JSON mascarados de ambas as fases em diretórios duráveis. C comprovou2PASS+1PASS em duas execuções Playwright com o helper de captura exato; o bloco de captura continuou idêntico após a correção de sincronização. A suíte oficial esperada passa a188 testes, mas essa expectativa não é resultado. A candidata seguinte exige seu próprio run completo, fingerprint, inspeção dos artifacts e revisão Codex.

## Primeira candidata R3 publicada e resultado oficial

HEAD `5ca520500298a2066f2072290998754a4a62d42e`, [run 39461576673](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39461576673), tentativa1, job `118762102005`: **9 gates PASS; E2E185 PASS / 1 FAIL / 0 SKIP / 1 NOT_RUN; cinco gates posteriores NOT_RUN**. Unit390+17 e Integration231 passaram, incluindo resultados nominais dos dois novos testes de handlers. O fingerprint `bc1b4a11b6aacf578512d946cbe96e5e0d2c06ed3096bf34cfe7514e9782c625` foi reproduzido exatamente sobre564 arquivos funcionais com filtros de checkout CRLF.

O commit tem parents ordenados `3d8038294e3d5383b0b3536b8ded275f2f85e884` e `6fd80667f4270ce43536963762444f6893f0c347`: incorporação não destrutiva da fase6, sem rebase ou merge de PR. A árvore local conferida foi `987bdddd50c64b5ef2d41eacc3d2443a63b7a79f`.

- Artifact `12283507803`, SHA-256 verificado `a7eeae056a0bd2225a2044c2e11e06b23c4310abfa0c28595af927477c6dd11e`.
- Única falha: coleta herdada, botão Revisar coleta em320×900/texto200, y1726..1860,9/9 hits ausentes, INPUT focado. O P1 de coleta seguinte ficou NOT_RUN pelo modo serial; isso não apaga o PASS dele no run anterior da fase6, mas tampouco aprova este HEAD.
- Os três P1 ambientais passaram: PUT/GET/DELETE do draft, POST antes de persistir e POST já persistido com resposta perdida, sempre A → B → A. A inferência individual está explicitada no [recibo](evidence/r3/first-candidate-receipt.json):187 selecionados,185 aprovados, somente a falha e a interrupção de coleta acima, sem filtros/skips.
- [Codex concluído no mesmo HEAD](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19#issuecomment-6296404441), sem achados materiais. A revisão será renovada após o próximo commit.
- [Inspeção dos24 pares PNG/JSON ambientais](evidence/r3/first-candidate-visual-review.md): Salvar,Declividade,Revisar eConfirmar visíveis em todas as seis combinações; HEAD/escala/dimensões consistentes. Limites documentados incluem máscaras sobre pixels da navegação, rolagem do documento em alguns quadros, rótulo de Declividade parcialmente fora em paisagem e indicador Next de desenvolvimento. Não se declara aceite humano ou navegação sempre ancorada.

A causa restante H4 foi reproduzida com React/CSS reais: transições globais acionam ResizeObserver e revelam novamente o input focado após a rolagem do teste. A correção compartilhada deverá aguardar transições finitas e concluir o ciclo de resize/foco antes de uma única rolagem, mantendo as contraprovas de obstrução. PNG/JSON da coleta e do ambiental serão preservados fora do outputDir que os gates posteriores limpam. O novo HEAD requer seus próprios15 gates, captura durável e Codex.

## Checkpoint original e dependência

PR [#19](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/19), branch `feat/frontend-environmental-drafts`, HEAD `3d8038294e3d5383b0b3536b8ded275f2f85e884`, base `feat/frontend-collections`.

- [Run39452650036](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39452650036), tentativa 1, job `118731460561`, artifact `12281000723`.
- SHA-256 conferido do ZIP: `f7ce01106aae683fb562f4bbf8bebeb2d573f116e70f72130bbd12f9156d8d5c`.
- Fingerprint: `d70740daeced33e017aac2f5a564ed4ac08ce6810b4ef79ba8237c62c685521c`.
- 9 gates PASS; E2E **161 PASS / 2 FAIL / 3 NOT_RUN**. Https/Deletion/Ihfr/Bootstrap/SchemaAudit não executados. Os três casos NOT_RUN eram as recuperações P1 de coleta, draft e POST ambiental.
- Primeira falha ambiental na confirmação375×900/texto 100%, antes da captura de revisão375. Não pode ser atribuída a cantos em200%. Traces/error-context não constavam no artifact.

Merge-base histórico: `e12ade232e3bad2fd60dbd53da2dcbc254a9e6a1`. A incorporação R3 usa dois parents, preservando `3d8038294e3d5383b0b3536b8ded275f2f85e884` como primeiro parent e o candidato fase6 `6fd80667f4270ce43536963762444f6893f0c347` como segundo. `git merge-tree --write-tree` produziu árvore sem conflito `5d103bd3fe572355f1a1cd5ee194fa8505c1b0d0`; os 15 arquivos incorporados da fase6 foram conferidos por blob. Este registro não declara a fase6 aprovada antes de seu CI. Nenhuma PR foi mesclada, nenhuma branch base foi alterada e não houve rebase.

## Diagnósticos e contraprovas auxiliares

Node24.19.0, Playwright1.55.1 do lockfile, Chromium153.0.8010.0. Alcance auxiliar explicitamente distinto do Windows/PostgreSQL oficial.

| Risco | RED | GREEN / preservação |
|---|---|---|
| H4: foco/scroll | DOM sintético com CSS e algoritmo relevante:12/12 falhas; scrollTop1281→0; confirmação y751,875→2032,875 após callback tardio | Foco esperado + frame causal:12/12 PASS; y751,875 estável; sem elevar timeout ou repetir scroll |
| H1: margem assimétrica | SSR dos componentes reais+CSS/Tailwind:844×390/texto 200%, Salvar y37,188..129,188 e Declividade y34,313..132,313, header até 82;3/9 pontos interceptados | Margem local 1rem: y149,188..241,188 e y146,313..244,313;9/9 pontos livres; controles móveis preservados |
| Continuidade HTTP | Mutante sem guard draft:3 PASS / 1 FAIL; sem guard POST:3 PASS / 1 FAIL | Handlers vigentes4/4 PASS; guard antes de qualquer acesso ao serviço |

O SSR usa adaptadores mínimos Next/contexto sintético, Arial de fallback e controles desabilitados no estado inicial. O ensaio comprova a geometria, não a hidratação ou persistência. Os cinco controles de formulário/revisão têm 9/9 pontos livres após a correção nas combinações844×390/texto 200%,320×900/texto 200% e375×900/texto 100%. `summary` é um alvo distinto: raio próprio 0 com recorte arredondado do ancestral causa dois cantos externos ao contorno a 200%; não há asserção desse alvo na suíte atual, e a matriz auxiliar completa não foi declarada integralmente verde.

Evidências sanitizadas: [geometria SSR](evidence/r3/environmental-landscape.json), Salvar [antes](evidence/r3/environmental-save-original.png)/[depois](evidence/r3/environmental-save-symmetric.png), Declividade [antes](evidence/r3/environmental-last-field-original.png)/[depois](evidence/r3/environmental-last-field-symmetric.png); handlers [GREEN](evidence/r3/handler-green.tap), [REDdraft](evidence/r3/handler-red-draft-guard.tap) e [REDPOST](evidence/r3/handler-red-post-guard.tap).

`npm run typecheck`: PASS local integral. `npm run lint`: exit0, somente os três warnings preexistentes em page/user-profile/white-box. `git diff --check`: PASS. Esses resultados auxiliares não substituem os gates oficiais.

Os recibos TAP sanitizam apenas o prefixo de caminho auxiliar e espaços finais; preservam testes, falhas, status e contagens.

## Regressão do candidato

O E2E conserva todos os viewports, texto 200%, toque, foco e checks de obstrução. Acrescenta o último campo e espera foco da revisão; a barreira causal fica no helper compartilhado. O cenário de draft confere GET/DELETE sob B → 403 com proof de A, recuperação A com mesmo ID/revisão e descarte autorizado → 204 após o replay. A confirmação POST foi parametrizada para cobrir tanto ausência de persistência inicial quanto persistência com resposta perdida, preservando chave/corpo/proof e mesmo ID no retorno a A. O caso anterior conserva B403, GETnull e A201; a nova variante exige primeiro201, B403, GET legítimo compartilhado com mesmoID e A200. O contador das fixtures exige uma única medição após o replay e nenhuma inserção sob B. A execução real permanece pendente do CI.

Os 15 gates e o Codex precisam ser conferidos no HEAD final. Não transportar o resultado de um parent ou checkpoint. Os recibos oficiais serão consolidados nesta Spec e na PR sem marcar tarefa apenas planejada como executada.

---

## Histórico preservado — preparação anterior à continuidade R3

> **Estado de publicação atualizado, 20/10/2026:** branch provisória `feat/frontend-environmental-drafts` publicada e empilhada sobre a fase6 em `e12ade232e3bad2fd60dbd53da2dcbc254a9e6a1`, sem merge/deploy. Este texto abaixo registra a preparação local histórica; a validação do HEAD da fase7, a reconciliação com eventuais mudanças da fase6 e a revisão Codex permanecem pendentes. CI será rastreado pelo SHA e run no PR. O antigo erro 403 de escrita foi resolvido selecionando a conexão GitHub do projeto.

# Evidências de implementação candidata

| Verificação | Resultado e alcance |
|---|---|
| Predicados R5 extraídos literalmente da base | RED: 4 testes, 2 PASS / 2 FAIL; exit1 |
| Precisão, protocolo de foco e retenção de incerteza | 25 PASS auxiliares |
| Parsers/células/conversões reais preservados | 10 PASS auxiliares |
| Suíte cumulativa fase7 | 74 PASS, incluindo os 39 da fase6; não somar novamente |
| Cinco E2E novos | Escritos, NOT_RUN |
| Pg/OCC/rollback/CI/browser | NOT_RUN nesta candidata |

Os 74 testes não substituem as suítes históricas integrais nem o CI oficial. O predicado corrigido preserva a incerteza no código, mas sua integração com React, rede e banco ainda exige os E2E reais preparados e a regressão vigente.

Checagens adicionais: typecheck estrito dos módulos puros e unitários, análise de sintaxe TS/TSX e consistência de patches. Não chamar essas verificações de Build/Typecheck/Lint oficiais. Logs auxiliares e manifesto ficam no pacote entregue no chat.

## Estado e limites da execução

Candidata local no sandbox do chat, sem commit ou branch publicados. A criação da árvore Git pela integração retornou HTTP 403, `Resource not accessible by integration`. Nenhuma escrita remota foi confirmada. Não se tentou contornar a restrição por outro endpoint ou identidade. A causa específica da permissão não foi determinada.

O clone no sandbox falhou por conectividade; os arquivos-base necessários foram obtidos por leituras GitHub/transcrição ou reaproveitados do ZIP somente quando seus bytes, após a normalização LF declarada, coincidiram com o blob Git vigente. O manifesto registra a proveniência. Isso não constitui um clone integral. Não houve acesso ao checkout/worktrees do operador.

As skills instaladas specify/plan/tasks/implement, a constituição e os templates foram lidos. Os formatos foram aplicados manualmente, sem executar os scripts CLI Spec Kit. O plano havia sido articulado antes do código na tentativa de publicação recusada; os arquivos deste pacote consolidam esse planejamento e os resultados posteriores. Não existe commit PLAN/RED/GREEN remoto desta execução.

Runtime auxiliar: Node22.16.0/TypeScript5.8.3 com transpilação em memória, não o runner oficial Node24.19.0. O typecheck auxiliar abrange somente módulos puros e seus unitários. Sintaxe TSX foi analisada, mas React/Next, CSS em navegador e imports completos não foram compilados no projeto real.

Build, typecheck integral, lint oficial, PostgreSQL, E2E, HTTPS, CI, capturas reais, dispositivo físico, outros navegadores e leitor de tela: NOT_RUN nesta candidata. Não foram executados agentes internos independentes: essa ferramenta não estava disponível. Auditoria própria não é revisão independente. `@codex review` não foi solicitado, pois não há PR publicado; deverá ser solicitado após publicação autorizada e ter sua resposta efetivamente conferida.
