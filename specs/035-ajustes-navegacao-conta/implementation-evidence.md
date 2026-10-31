# Evidências — frente A / Spec 035

Data: 2026-10-31. Estado histórico: PREPARACAO_G0; adendo abaixo: código e testes da frente A preparados, validação funcional ainda pendente do HEAD final.

Base exata: `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem: `9b8595d232842d401ce81bbc92c54dd543aa2829`. Branch: `feat/ajustes-navegacao-conta`. Guards herdados antes da primeira publicação. PR alvo: development; dependência de integração #45.

G0 adiciona somente spec.md, plan.md, tasks.md e este registro no diretório 035. Nenhum arquivo de produto/teste funcional modificado. Fonte de decisões: #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`.

| Verificação | Estado deste corte |
| --- | --- |
| Guardas estáticas | PASS no pacote G0, mesmos blobs herdados |
| Implementação e testes próprios A | NOT_RUN / NAO_IMPLEMENTADO |
| Quinze gates no HEAD A | Não observado ainda neste commit; consultar run real após publicação |
| Comparação visual atual | NOT_RUN |
| Revisão independente / aceite humano | NÃO REALIZADOS |
| Native subagents no G0 | NATIVE_SUBAGENTS_UNAVAILABLE |

O SHA deste commit e o número do PR são registrados no recibo de publicação, evitando hash autorreferente. O executor deve acrescentar eventos por SHA/run/tentativa, preservando este histórico. Capturas históricas e PASS de outros HEADs não validam a implementação futura.

## Adendo de execução A — fatos e limites

**EVIDENCIA_IMPLEMENTACAO / autoria de código:** os commits próprios A contêm o novo modelo de rotas, a remoção de Áreas sem laboratório, a substituição da navegação horizontal contextual por trilho lateral/rodapé móvel, o agrupamento Conta e o tratamento de foco sob a barra fixa. Os arquivos de teste contêm asserts de renderização/rotas/papel/viewport/safe-area. Nenhuma mudança em autenticação, serviços, persistência, ciência ou provedores.

**Baseline G0 real**, não herdado como validação do código novo:
- GitHub Actions [run 41216365650](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41216365650), tentativa 1, `head_sha=55e00b531c9691c1b568fc83e86c0ccf176430fd`, `status=completed`, `conclusion=failure`.
- Job validate 124581672069: checkout/install PASS; validação FAIL; upload do artefato `rc-validation-55e00b531c9691c1b568fc83e86c0ccf176430fd` (ID 13048962053, ZIP digest `ec6ff3ba3bf0a600a771ab5599651cc6706ed5a87066aa045377c71895e79925`) PASS.
- Logs do baseline: Build PASS, Typecheck PASS, Lint PASS (dois avisos preexistentes), E2E 220 PASS, HTTPS 2 PASS, Deletion 3 PASS, IHFR **FAIL: seis E2E** de `ihfr-diagnosis-manage.spec.ts` e `ihfr-diagnosis-read.spec.ts`. O runner parou com exitCode 1. Causa dessas falhas não determinada; não foram reparadas nesta frente de shell.
- Nenhum desses PASS valida o código A, pois precede os commits próprios.

**Autoridade dos estados:** checagem do código GitHub é evidência da edição, não da execução. No momento deste adendo, testes de A, Typecheck, Lint, Build, E2E atual e fifteen-gate final: NOT_RUN; a PR será atualizada com run/tentativa/resultado real após o push. Nenhuma screenshot produzida pela presente sessão de navegador foi afirmada; `tests/e2e/hf-ui035-navigation.spec.ts` captura `fullPage:false` em execução sintética real, com geometria e mascaramento, e o artefato de CI deve ser conferido antes de rotular PASS.

**Ambiente/custódia:** leitura e autoria realizadas via GitHub API, sem checkout fiel do HEAD/sem Node 24 + docs `node_modules/next/dist/docs` locais. Worktrees/upstreams/sujeira da máquina do usuário não observáveis. Não foi executado runtime do frontend starter. `NATIVE_SUBAGENTS_NOT_AVAILABLE` (nenhuma ferramenta de delegação nativa exposta nesta sessão); não se afirma revisão independente. Pré-validação estática de path/ownership e base via GitHub; hashes de commit final serão informados na PR.

**Diff pretendido:** exclusivo A contra `07755822f5dc75fe2be1d924005d30ed99f64a0b`; acumulado contra `development` observado em `9b8595d232842d401ce81bbc92c54dd543aa2829`. Reconciliar SHA atual antes da publicação. Dependência #45, sem merge.
