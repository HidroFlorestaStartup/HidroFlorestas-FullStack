# Evidências da continuidade R3 — 20/10/2026

## Checkpoint original efetivamente inspecionado

PR [#18](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/18), branch `feat/frontend-collections`, HEAD `9a5254a8e6bb060c7767231a38370c073b2bdb78`.

- [Run 39453181573](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39453181573), tentativa 1, job `118733100849`.
- Artifact `12280945790`; SHA-256 do ZIP conferido: `96ccebf4719a441e4eaba07d102c4cf388cc150c27c9e5a7d66d29bffdf2d1bc`.
- Fingerprint: `75cfc33722df43ecc4085976dd64a1796dc7d2d8867861a81a9733aec010277e`.
- 9 gates PASS; E2E **155 PASS / 2 FAIL / 2 NOT_RUN**; Https, Deletion, Ihfr, Bootstrap e SchemaAudit não executados nesse HEAD.
- Primeira falha de geometria após os quatro viewports a 100%: botão da coleta em 320×900/texto200. A falha de conta ocorreu na URL após login, antes da leitura do e-mail sintético. O artifact não contém os traces/error-context citados; não se inventou evidência ausente.

## RED → GREEN auxiliar e alcance

Todos os ensaios abaixo usam dados sintéticos. Browser auxiliar: Chromium 153.0.8010.0, Playwright 1.55.1 do lockfile, Node 24.19.0. Não representam o gate oficial Windows/PostgreSQL.

| Ensaio | RED / contraprova negativa | GREEN / contraprova positiva |
|---|---|---|
| Contorno arredondado | Helper anterior: 4 PASS / 2 FAIL; quatro probes fora do raio de 20px a texto200 atingiam MAIN, centro atingia BUTTON | Helper corrigido: 20/20 PASS; execução independente D também 20/20, retries0 |
| Obstrução real | Cobertura das quatro bordas, centro/canto, clipping, controle fora do viewport e overflow são rejeitados | Descendente legítimo, raios elípticos/percentuais/sobrepostos e seis viewports preservados |
| Margem de rolagem da coleta (H1 real) | SSR dos componentes reais ApplicationShell + CollectionDetail + painel IHFR, CSS/Tailwind/logo reais: em 844×390/texto200, link em y37,45..129,45 sob header até82;3/9 probes interceptados | Margem local simétrica1rem: y149,45..241,45 e9/9 livres;320/375×900/texto200 e844×390/texto100 continuam PASS; sem alteração do shell |
| Foco da revisão ambiental | Sem barreira: 12/12 reproduções falham; callback tardio desfaz a rolagem até Confirmar | Foco observado + frame causal: 12/12 PASS; um único scroll, sem elevar timeout |
| Resposta de login | Helper antigo falha com HTTP200 em 5,6s; novo rejeita401 inesperado e200 sem navegação | Novo aguarda a mesma resposta e passa;401 explícito para senha antiga passa;1POST/caso |

O ensaio H1 usa SSR estático com hooks/Link/Image adaptados e Arial de fallback, sem servidor Next ou DB. Demonstra a obstrução com a estrutura fonte, mas não substitui as capturas oficiais. A única mudança de produto nesta R3 é `scroll-margin-block:1rem 8rem` → `1rem` no CSS Module local de coleta; a navegação permanece intacta.

A causa histórica do incidente de conta continua **INCONCLUSIVA**. O ensaio prova a lacuna de sincronização do teste, não que a latência foi a causa daquele run. Teste, autenticação e componentes relevantes eram iguais ao baseline integrado examinado; isso não autoriza chamar a falha de flakiness.

`npm run typecheck`: PASS local integral. `npm run lint`: exit0, três warnings preexistentes fora do delta (page, user-profile, white-box). Esses comandos auxiliares não substituem os gates oficiais por HEAD. `git diff --check`: PASS.

Recibos sanitizados persistidos: [geometria SSR](evidence/r3/collection-landscape.json), [antes](evidence/r3/collection-landscape-original.png), [depois](evidence/r3/collection-landscape-symmetric.png) e [contraprova de login](evidence/r3/account-login-counterproof.json).

## Proteções e evidência futura

O helper preserva bounds, `elementFromPoint`, navegação móvel, todos os cenários e texto200. Só probes que caíam fora do contorno real são deslocados até dentro dele; quatro pontos de eixo ampliam a detecção. Em falha, registra geometria/scroll/viewport/header/nav e captura mascarada `fullPage:false`, com HEAD e escala. Os negativos sintéticos da suíte `frontend-mission-evidence.spec.ts` geram capturas de obstrução esperada em diretório próprio; não são falhas do aplicativo.

A candidata deve executar os 15 gates e os dois cenários antes NOT_RUN (conta ativa não verificada após reset e recuperação da coleta sob outro membro). Resultados finais, URLs, fingerprint e revisão Codex precisam corresponder ao HEAD final, e não apenas ao checkpoint acima.

---

## Histórico preservado — preparação anterior à continuidade R3

> **Atualização de publicação, 20/10/2026:** O texto histórico abaixo descreve a preparação anterior à publicação. A fase 6 foi publicada na branch `feat/frontend-collections`; RED oficial no run [39444967220](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/39444967220): RegressionSetup PASS, Unit FAIL esperado no teste de estado R1. GREEN integral e homologação ainda pendentes desta atualização. O registro final de CI por HEAD deve constar no PR.

# Evidências de implementação candidata

| Verificação | Resultado e alcance |
|---|---|
| R1 em sete testes novos de estado na base | RED: 2 PASS / 5 FAIL; exit1 |
| Mesmos sete testes após correção | GREEN: 7 PASS; exit0 |
| Unitários fase6 | 39 PASS: 8 existentes (um cenário atualizado pontualmente), 7 R1, 24 submissão |
| Quatro E2E novos | Escritos, NOT_RUN |
| UI/Pg/CI/15 gates | NOT_RUN; publicação recusada |

O teste existente que antes permitia iniciar outra tentativa após falha desconhecida foi ajustado à regra segura: agora exige recusa na incerteza e mantém as asserções de nova tentativa após rejeição inicial definitiva. Nenhuma asserção do backend ou E2E anterior foi reduzida. A validação de idempotência no banco ainda precisa do runner oficial.

Checagens adicionais: typecheck estrito dos módulos puros e unitários, análise de sintaxe TS/TSX e consistência de patches. Não chamar essas verificações de Build/Typecheck/Lint oficiais. Logs auxiliares e manifesto ficam no pacote entregue no chat.

## Estado e limites da execução

Candidata local no sandbox do chat, sem commit ou branch publicados. A criação da árvore Git pela integração retornou HTTP 403, `Resource not accessible by integration`. Nenhuma escrita remota foi confirmada. Não se tentou contornar a restrição por outro endpoint ou identidade. A causa específica da permissão não foi determinada.

O clone no sandbox falhou por conectividade; os arquivos-base necessários foram obtidos por leituras GitHub/transcrição ou reaproveitados do ZIP somente quando seus bytes, após a normalização LF declarada, coincidiram com o blob Git vigente. O manifesto registra a proveniência. Isso não constitui um clone integral. Não houve acesso ao checkout/worktrees do operador.

As skills instaladas specify/plan/tasks/implement, a constituição e os templates foram lidos. Os formatos foram aplicados manualmente, sem executar os scripts CLI Spec Kit. O plano havia sido articulado antes do código na tentativa de publicação recusada; os arquivos deste pacote consolidam esse planejamento e os resultados posteriores. Não existe commit PLAN/RED/GREEN remoto desta execução.

Runtime auxiliar: Node22.16.0/TypeScript5.8.3 com transpilação em memória, não o runner oficial Node24.19.0. O typecheck auxiliar abrange somente módulos puros e seus unitários. Sintaxe TSX foi analisada, mas React/Next, CSS em navegador e imports completos não foram compilados no projeto real.

Build, typecheck integral, lint oficial, PostgreSQL, E2E, HTTPS, CI, capturas reais, dispositivo físico, outros navegadores e leitor de tela: NOT_RUN nesta candidata. Não foram executados agentes internos independentes: essa ferramenta não estava disponível. Auditoria própria não é revisão independente. `@codex review` não foi solicitado, pois não há PR publicado; deverá ser solicitado após publicação autorizada e ter sua resposta efetivamente conferida.
