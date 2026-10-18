# Correção focal de aria-invalid — Plan → Execute → Review

> As seções originais abaixo preservam a preparação histórica do pacote, feita
> antes deste checkout oficial. A execução oficial está no adendo ao final;
> seus resultados não reclassificam os testes isolados como React/Next.

Data: 18/10/2026. Repositório: HidroFlorestaStartup/HidroFlorestas-FullStack.
Alvo: PR #9, branch feat/frontend-login, base acba40d6dbbef10f1307f858f5db59bf819bbbd4.

## Resultado

**Candidata implementada e testada isoladamente; não aplicada nem publicada no GitHub.**
Não foi possível executar Next.js/Node24/React/Playwright do projeto neste ambiente.
A tentativa GitHub.create_file para registrar o planejamento retornou HTTP403
`Resource not accessible by integration`. O Git por HTTPS também falhou por DNS.
Nenhuma branch, PR, produção ou arquivo do computador do usuário foi alterado.

## Plan

O escopo é somente a semântica de aria-invalid no login. O componente anterior
associa qualquer errorMessage à invalidade dos dois campos. A correção separa
a verificação local por campo da mensagem geral do contexto.

Os adendos fornecidos para plan.md, tasks.md (T015–T018) e contracts/login-ui.md
foram preparados antes do código. Tarefas oficiais permanecem desmarcadas até o
executor comprovar aplicação, RED/GREEN no Next, publicação e CI do novo SHA.
A Spec 017 e o histórico anterior continuam sendo as referências; nenhuma
nova feature/branch/worktree é necessária.

Referência de semântica: W3C ARIA21 —
https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA21.html.
O atributo deve indicar falha de validação do campo, não indisponibilidade de rede.

## Execute

Alteração de produto restrita a src/app/login/page.tsx:
- invalidFields mantém dois booleanos locais, independentes de errorMessage;
- validação de vazio conserva a política !email.trim()/!password.trim(), mas
  marca somente o campo recusado e continua sem enviar POST;
- edição limpa feedback obsoleto como antes; nova submissão valida novamente;
- falhas gerais de signIn continuam no alerta e em aria-describedby, sem
  classificar por texto, inferir qual credencial falhou ou mudar AuthContext;
- payload original, trava síncrona, hidratação, loading, CSS e fluxos preservados.

Testes oficiais preparados em tests/e2e/frontend-login.spec.ts:
- mantém os dez cenários anteriores e acrescenta quatro (três combinações de
  vazio e um erro HTTP genérico); registro estático de 14 casos confirmado;
- corrige a assertion de rede indevida e verifica preservação/repetição dos valores;
- reforça que os erros genéricos de credenciais não identificam um campo específico;
- mantém os dois testes de backend real, sem converter autenticação em mock;
- transporte interceptado permanece explicitamente identificado nos testes de UI.

## Review — o que foi realmente executado aqui

| Verificação | Resultado e alcance |
|---|---|
| Blobs do componente/teste | Iguais aos hashes lidos do GitHub no SHA base |
| RED isolado, código anterior | 14 casos: 5 PASS, 9 FAIL; exit code 1 |
| GREEN isolado, código corrigido | Os mesmos 14 casos: 14 PASS, 0 FAIL; exit code 0 |
| Sintaxe TSX/TS | Transpilação de dois arquivos PASS; não é typecheck do projeto |
| Registro dos casos Playwright | 10 nomes antigos preservados + 4 novos; NÃO EXECUTADOS |
| Diff de código/testes | git apply --check e aplicação sobre os blobs exatos PASS |
| Escopo | Imports, signIn/payload, readiness, trava, alerta/associações preservados |
| Runtime oficial/CI | NÃO EXECUTADOS; escrita remota BLOQUEADA |

Os testes isolados usam **Node22.16.0 e TypeScript5.8.3**, transpilem o TSX
completo e executam seus handlers reais com **doubles de hooks e imports**.
Inspecionam as props emitidas. Não há React/Next, navegador, AuthContext real,
PostgreSQL ou servidor nesse harness. Portanto esses resultados não equivalem
a testes de hidratação, acessibilidade com leitor de tela ou autenticação real.
O arquivo da suíte isolada é idêntico nas rodadas RED e GREEN.

Evidências no pacote: evidence/red-isolated.txt, green-isolated.txt,
syntax-and-scope.json, patch-check.txt e manifest.json. O teste isolado está em
tools/isolated-component.test.cjs. Não o incorporar à suíte oficial: é uma
ferramenta de inspeção deste ambiente, não um substituto de React/Playwright.

## Resultado da revisão adversarial

O estado inicial não acusa erro; campo preenchido não é acusado por falha de
outro campo. Marcações antigas são removidas após edição e em nova tentativa.
Falhas genéricas permanecem anunciadas. O payload com espaços foi comparado
integralmente; a chamada ao contexto não mudou. A verificação de duplicidade
continua síncrona; nenhuma classificação depende de texto de erro ou existência
de conta. A validação de sintaxe nativa type=email é preservada, não reimplementada.

Não foram alterados backend, API, contexto, senha enviada, banco, CSS, lockfile,
workflow, Vercel, testes/guards do IHFR, contratos científicos ou provedores.
Nenhuma conclusão de conformidade WCAG integral é atribuída a este recorte.

## Restante para o Codex local

Reutilizar C:/projetos/consolidados/HidroFlorestas-frontend-login, se confirmado
como o checkout da branch feat/frontend-login. Fazer fetch, conferir deriva,
instruções e blobs; aplicar plan → tests (RED real) → fix (GREEN real) → review.
Executar typecheck/lint e regressões proporcionais no runner oficial com seu
ambiente sintético completo. Não repetir a chamada focal sem o ambiente RC que
já produziu falsos 403 na execução anterior. Não afrouxar assertions/timeouts.

Publicar somente a feature existente e atualizar o PR #9, sem novo PR/branch,
merge ou deploy. Conferir o CI do SHA novo; registrar o resultado final no PR
para evitar commits de recibo sucessivos que disparem novamente a mesma suíte.
O FAIL histórico IHFR e a aprovação de Pedro permanecem fora deste ajuste.

## Execução oficial na worktree existente — 2026-10-18

EVIDENCIA_IMPLEMENTACAO: reutilizada exclusivamente
`C:/projetos/consolidados/HidroFlorestas-frontend-login`, branch feat/frontend-login,
HEAD inicial acba40d e worktree limpa. Fetch confirmou a mesma ponta remota.
RC0f669b7, os dois ZIPs não rastreados e as outras worktrees foram preservados.
Não houve branch, worktree ou PR adicional. Pacote original preservado fora do
Git; SHA256 do ZIP em plan.md. Manifesto e aplicador passaram sem adaptação.

### Plan

Skills speckit-plan e speckit-implement aplicadas à Spec017. setup-plan preservou
o plano; check-prerequisites confirmou os artefatos; checklist8/8 PASS, sem
alteração dos seus marcadores. Constituição I–VII e contrato reconciliados;
sem hooks instalados, novos dados persistidos ou decisão material pendente.
Guias Next locais e W3C ARIA21 consultados. Planejamento commitado em
`ee9b98f727d3802108f0b6429246fa1066954c53`, antes dos testes e do código.

### Execute: RED → correção → GREEN

1. Aplicados somente os testes do pacote. Página ainda idêntica ao baseline.
2. `./scripts/rc-review-validation.ps1 -Gates E2E`: **79 PASS / 7 FAIL**;
   arquivo focal **7 PASS / 7 FAIL**. As sete falhas receberam aria-invalid=true
   onde a assertion esperava ausência dessa marcação: 401 interceptado, rede,
   senha incorreta e conta BLOCKED pelo backend real, somente e-mail vazio,
   somente senha vazia e erro HTTP503. Nenhuma falha fora do arquivo focal.
   [Journal/preimages](evidence/aria-invalid-red.json) e
   [assertions oficiais](evidence/aria-invalid-red.log). Commit de testes/RED
   `7286a5f`; log bruto preservado fora do Git, atributos value mascarados no extrato.
3. Aplicada somente a candidata page.tsx. Commit `ea93b344b42a0ceaba28d204ba57f7bcb7b278af`:
   13 linhas adicionadas, 5 removidas; imports e restante do fluxo preservados.
4. `./scripts/rc-review-validation.ps1 -Gates Unit,Build,Typecheck,Lint,E2E,Https`:
   **6 gates PASS**, Unit296 + mail17, build padrão Turbopack, typecheck, lint
   sem erros (3 avisos preexistentes fora do escopo), E2E86 incluindo login14,
   HTTPS2 em servidor de produção local. [Journal GREEN](evidence/aria-invalid-green.json).

Ambiente real: Windows, Node24.19.0, dependências/lockfile existentes,
Next16.3.8/React19.2.4, Chromium e PostgreSQL17 próprio em loopback. Runner RC
completo forneceu configuração sintética, ingresso e fixtures reais; nenhuma
invocação focal sem esse ambiente. Guards, timeouts, assertions e fixtures
permaneceram intactos. Teste com hash SHA256 e3545d192c25d7a0299a974b3d7e05de4ec911059a8745aa97a1606b8011c0fe
(LF normalizado) é idêntico no RED e GREEN. Página/teste correspondem ao overlay.
Os seis gates GREEN compartilham o mesmo fingerprint funcional. HTTPS encerrou
com remainingFixtureUsers=0, artefatos temporários removidos e cluster parado,
preservando seus dados. Os testes isolados Node22 do pacote não foram repetidos;
seu alcance histórico está descrito acima e não substitui estes resultados.

### Review focal e publicação

Revisão manual do diff: estado inicial sem marcação; somente vazios recusados
recebem invalidade; edição limpa feedback; nova submissão revalida. Falha geral
permanece anunciada e associada aos campos por aria-describedby. Nenhuma
classificação por texto de erro ou inferência da existência de conta. Senha e
payload originais preservados, sem normalização adicional; type=email nativo,
hidratação, busy, trava síncrona, mensagens e visibilidade da senha preservados.

Zero diff relativo a acba40d em AuthContext (também comparação byte a byte), API,
backend, CSS, layout, configurações, dependências, banco, IHFR e scripts de teste.
Mudanças restritas à página, seu teste e documentação/evidências da Spec017.
Diff/whitespace, imports, referências locais e padrões sensíveis revisados.
Nenhum achado bloqueante no ajuste focal. Os logs completos ficam ignorados ou
fora do Git; nenhum snapshot automático de falha com credenciais foi publicado.
Evidências anteriores, inclusive FAIL remoto IHFR de292dd95 e SUCCESS deacba40d,
permanecem históricas. Não foram investigadas/refatoradas nesta missão.

RECOMENDACAO: apto para revisão humana quanto ao ajuste focal, com CI do novo SHA
a conferir após o push. T015–T017 comprovadas; T018 captura publicação/CI pendentes
neste commit anterior ao push e terá fechamento no registro vivo do
[PR9](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/9),
sem commits de recibo a cada consulta. A autorização atual abrange push exclusivo
da feature e atualização desse PR; revisão de PedroVitor237 permanece solicitada.
Aceite humano, outros navegadores e teste manual com leitor de tela não executados;
sem certificação WCAG integral. Sem merge, deploy ou provedor real.
