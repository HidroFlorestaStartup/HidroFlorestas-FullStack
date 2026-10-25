# Evidências — foco após perda de acesso administrativo

Base `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`; branch
`fix/hf-night-admin-focus-20261025`; Windows/Node24.19.0. Este registro identifica
o delta local ainda sem commit. [Recibo com hashes](validation.json).

## Resultado e alcance

`EVIDENCIA_IMPLEMENTACAO`: o único componente alterado é
`src/components/user-administration/user-administration-page.tsx`.
A mensagem agora pertence a uma ocorrência: o efeito foca depois do commit
somente quando sua identidade ainda corresponde à ocorrência vigente. A ref
vigente é invalidada imediatamente ao selecionar, limpar ou desmontar. Isso
evita depender de texto diferente e impede o efeito antigo de focar após nova
seleção. Textos, DOM do alerta, cancelamento/tickets, distinção 404 versus
401/403, limpeza de dados/diálogo e demais rAFs permanecem no contrato anterior.

`FATO_DOCUMENTADO`: QA forneceu um FAIL real403 no replay completo, outro em
dez repetições focais (9PASS/1FAIL), e um focal isolado PASS, na base indicada.
Snapshot `generic [active]` não identifica activeElementTag. Esses resultados
não são execução desta autoria. O patch foi provado no componente/CSS reais
com APIs sintéticas, sem executar servidor Next, banco ou endpoint real.
Nenhum resultado aqui fecha universalmente a causalidade do FAIL real.

## Spec Kit executado

Instalação local1.0.4/skills mode Codex, constituição1.0.0, sem extensions/hooks.
Não houve spawn adicional; pesquisa dirigida foi executada pelo autor conforme
o mandato desta onda. Guias Next locais de Client Components e CSS lidos antes
do código, sem usar APIs presumidas de outra versão.

| Etapa | Execução e resultado |
|---|---|
| specify | Template resolvido por `common.sh/resolve_template_content`; spec033 e quality checklist geradas, `.specify/feature.json` local ignorado. Sem esclarecimento material pendente. |
| plan | `setup-plan.sh --json` real pelo Git Bash instalado; plano, pesquisa, modelo, contrato UI e quickstart produzidos. Constituição PASS pré/pós design. |
| checklist | `check-prerequisites.sh --json --template checklist-template`; seis itens de qualidade gerados sem marcação pelo autor. |
| tasks | `setup-tasks.sh --json`; dez tarefas por US, com dependências, prova antes do patch e revisão/convergência finais. |
| analyze | `check-prerequisites.sh --json --require-spec --require-tasks --include-tasks`; 6FR/3SC/6cenários, cobertura por10tarefas, zero CRITICAL/HIGH/MEDIUM/LOW e zero tarefa órfã. Sem edição durante a análise. |
| gate/implement | `/root` leu os artefatos e marcou seis itens custom; quality checklist6/6. Prerequisites de implement executado; gate12/12 PASS antes de teste/código. Ignores existentes preservados. |
| converge | Resultado registrado após a avaliação final abaixo; sem usar comparação Git durante a avaliação do estado atual. |

## Provas negativas preservadas

1. **Baseline, commit retido e rAF nativo:** antes do patch,
   `native-raf/alertPresent=false`; após liberar o scheduler, alerta presente
   sem foco. `toBeFocused` falhou com5000ms. Primeiro FAIL seguido de segunda
   execução para persistir o recibo sanitizado, sem mudar expectativa, timeout
   ou retry. [Antes](evidence/timing-before.json) e
   [depois](evidence/timing-after.json). O source blob inicial era
   `8947bb26b644f911f153c065c75d36aa180ee3e6`; o teste no segundo RED tinha
   SHA-256 `7e73bcbb2beadeaac822ada743d5834ce9c448c72c33cce0a77267fd4bd03716`.
2. **Primeira versão do efeito, passivo retido:** a revisão independente sugeriu
   observar também o intervalo durante nova seleção. O controle mostrou foco
   antigo depois do início da consultaB (índice4>2), embora após o commitB o foco
   já estivesse correto. Suite13PASS/1FAIL; repetição focal para preservar o
   recibo também FAIL. Isso motivou a guarda síncrona da ocorrência atual.
   [Antes](evidence/stale-occurrence-before.json) e
   [depois](evidence/stale-occurrence-after.json); no final não há foco antigo
   após o inícioB nem após seu commit/liberação restante.

Essas provas alteram deliberadamente o despacho do scheduler React e mantêm o
rAF nativo. São contraprovas sintéticas de duas fragilidades observadas, sem
provar o interleaving do servidor/Next/QA real. O wrapper encaminha cancelamento
também ao handle nativo depois da liberação; não é um modelo universal do
scheduler para versões futuras.

O cenário de resposta anterior à apresentação inicial usa handler **real**
invocado sinteticamente fora de evento DOM discreto, dentro de transition e com
scheduler retido; consulta React19.2.4 pinado para localizar o handler. O clique
DOM normal, inclusive dentro de transition, não forneceu o atraso pretendido:
duas expectativas de preparação desse controle falharam e foram corrigidas,
sem atribuir essas falhas ao produto ou reduzir a assertion de foco. A versão
final confirma ausência de título/alerta antes da liberação e foco correto após
o commit. [Recibo](evidence/immediate-response.json). Não se confunde esse
controle com interação nativa de usuário ou cobertura de toda a gramática React.

## Validação executada

| Comando / etapa | Resultado e alcance |
|---|---|
| `npm ci --offline --no-audit --no-fund` | exit0,553pacotes; políticas de install scripts preservadas; nenhum lock alterado. |
| `npx prisma generate` | exit0,7.4.2; engine QA em leitura, client próprio; nenhum banco consultado. |
| Primeiro bootstrap de teste UI | Importação com `import.meta` incompatível com o modo do runner; nenhum cenário executado. Ajustado `createRequire` para package.json local; não é RED do produto. |
| UI após primeiro patch |12/12PASS. Após expansão,14/14PASS antes da assertion adicional da ordem transitória. Esses checkpoints não validam o delta final por associação. |
| `npx playwright test --config tests/ui/admin-access-focus.config.ts`, final | exit0,14PASS/0FAIL/0skip,12.2s, workers1/retries0. |
| `npm run typecheck`, final | exit0. |
| ESLint dos três arquivos de código/teste, final | exit0,zero avisos. Um aviso inicial de constante de teste não usada foi removido. |
| Unitário existente `frontend-user-administration.test.ts` | Sandbox impediu startup de tsx (`uv_os_get_passwd/ENOMEM`), sem executar os casos. Execução autorizada fora da restrição: exit0,6/6PASS,408.3309ms. |
| `git diff --check` | exit0 no diff rastreado; JSON/links/escopo são conferidos no recibo final. |

Os14casos cobrem seis pares status/leitura, commit retardado, texto repetido,
re-renderização alheia, duas recusas concorrentes, respostas superadas,
fechamento de diálogo sem mutação, desmontagem, resposta anterior ao primeiro
commit e trabalho passivo antigo. APIs são fake explícito, inclusive entrega
tardia ignorando AbortSignal para verificar o descarte do componente; egress
real é abortado. CSS e componente são os reais, Link é apenas anchor sintético.
Não há nova dependência, mudança de testes existentes ou relaxamento de tempo.

## Revisão independente

`FATO_DOCUMENTADO`: `/root/fr015`, sem autoria desta spec/código/testes,
comunicou revisão funcional PASS e rerun próprio14/14PASS em13.3s,0skip,
usando output separado. Conferiu hashes antes/depois iguais aos três valores
de [validation.json](validation.json). Confirmou foco pós-commit, indisponibilidade
dos dados anteriores, oldFocus=-1/newRead=2, leitura cancelada/ocorrência repetida
e limites sintéticos. Não identificou finding funcional residual.

Fechamento documental independente comunicado por `/root/fr015` após converge:
**PASS**, zero finding residual; releitura da pesquisa/evidências/convergência,
três hashes de código/testes e cinco provas iguais, zero tarefa aberta,
diffcheck e13destinos relativos conferidos. Lint/typecheck/unit foram referidos
como resultados do autor; somente o rerun UI14/14 em13.3s é execução própria do
revisor. Registro desta mensagem não representa review humano ou CI remoto.

## Convergência e limites

`speckit-converge` foi executado após implement/revisão, com prerequisites
reais e avaliação limitada aos caminhos do plano, sem Git/comparação histórica
durante a avaliação. Inventário:6FR,3SC,6cenários de aceite,5decisões técnicas
buildáveis e7princípios constitucionais. Zero missing/partial/contradicts/
unrequested; zero CRITICAL/HIGH/MEDIUM/LOW; zero tarefa acrescentada.
`tasks.md` ficou byte a byte inalterado durante a avaliação (SHA-256
`0d8c8d7f22b7d0afce94eb5d03d2e492170d5c7a88ce236529d6b687858e7777`).
T010 foi marcado depois, no fechamento de implement. Nenhuma lacuna de teste
real/homologação foi promovida a implementação concluída.

Build, integração/PostgreSQL, replay real do403, CI própria e aceite humano
`NOT_RUN` por esta autoria. QA pode executar o focal real em commit identificado
sem importar o patch em sua worktree ativa. Guardas:27false anteriores
preservadas+guarda exata admin pelo coordenador; nenhuma limpeza configuracional.
Sem commit/push/PR, deploy, main, merge, provider, SMTP ou banco hospedado.
Ciência e regras de produto permanecem com suas autoridades próprias.
