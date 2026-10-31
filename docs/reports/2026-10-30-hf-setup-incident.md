# HF-SETUP-INCIDENT-20261030 — investigação do instalador

## Escopo e conclusão forense

`FATO_DOCUMENTADO`: o solicitante relatou reinicialização inesperada durante a configuração no Windows e forneceu a saída `spawnSync npm.cmd EINVAL`, Node.js 24.19.0 e npm 11.17.0. A solicitação de 2026-10-30 é a fonte do relato; não foram fornecidos horário exato, fuso do computador afetado, registros de eventos, dumps ou árvore de processos.

**Causalidade da reinicialização: INCONCLUSIVA; coleta externa PENDING.** Não há evidência suficiente para atribuí-la ao setup, npm, fnm, Windows Update, driver, energia ou hardware. Não se identificou o computador desta execução como o computador afetado; nenhum registro pessoal ou de sistema desse host foi coletado. A ausência desses registros não refuta o incidente.

Este documento registra a análise da base `feature/automated-setup`, SHA `766a7f14dfdd756703798a794bb06833ef7ccecd`, antes do patch. As diferenças posteriores devem ser avaliadas junto aos testes e à revisão do SHA final da PR. Testes verdes do instalador não encerram a investigação física.

## Cronologia disponível

| Ordem | Evidência | Classificação e limite |
|---|---|---|
| 1 | Node.js 24.14.0 foi recusado pelo requisito `>=24.19.0 <25`; foram mostradas instruções fnm. | `FATO_DOCUMENTADO`, relato; horário não especificado. |
| 2 | Depois da atualização, Node.js 24.19.0 e npm 11.17.0 foram reconhecidos; `.env` foi criado. | `FATO_DOCUMENTADO`, saída fornecida; não identifica o mecanismo da atualização. |
| 3 | A etapa `npm ci` terminou com `spawnSync npm.cmd EINVAL`. | `FATO_DOCUMENTADO`, saída fornecida; defeito compatível com a implementação inspecionada. |
| 4 | Houve reinicialização inesperada durante a tentativa de configuração. | `FATO_DOCUMENTADO`, relato; relação temporal precisa com os itens anteriores não especificada. |
| 5 | Em 2026-10-30, foram inspecionados setup, manifestos, lockfile, configuração Prisma e código de instalação disponível, sem executar instalação de terceiros. | `EVIDENCIA_IMPLEMENTACAO`, análise estática desta investigação. |

## Causa raiz das falhas reproduzíveis

**Falha A — versão:** `EVIDENCIA_IMPLEMENTACAO`: `.node-version` fixa o mínimo 24.19.0, e `package.json` restringe a versão principal a 24. O preflight da base recusa uma versão 24.14.0 antes de copiar `.env`. É uma incompatibilidade de ambiente tratada pelo contrato, sem evidência de reinicialização causada por essa verificação. As instruções fnm/winget/Homebrew/curl são impressas; o setup não as executa.

**Falha B — criação de processo Windows:** `EVIDENCIA_IMPLEMENTACAO`: na base, `executable()` troca `npm` por `npm.cmd`, e `run()` usa `spawnSync()` sem shell. Um arquivo `.cmd` é um script de comandos, não um executável PE que possa ser iniciado diretamente por essa chamada. A [documentação do Node.js 24.19.0](https://nodejs.org/download/release/v24.19.0/docs/api/child_process.html#spawning-bat-and-cmd-files-on-windows) descreve essa distinção. O [comunicado oficial de segurança](https://nodejs.org/en/blog/vulnerability/april-2024-security-releases-2) explica que a proteção CVE-2024-27980 passou a rejeitar esses scripts com `EINVAL` quando invocados sem shell. Não desative essa proteção. O patch invoca a CLI JavaScript do npm com o Node correspondente, mantendo argumentos separados e sem interpolação de shell.

`INFERENCIA`: na tentativa cujo erro foi fornecido, o processo `npm ci` não chegou a ser criado com sucesso; seus lifecycle scripts não podem ser atribuídos àquela chamada que falhou no spawn. Isso não exclui outra tentativa, atualização manual, processo concorrente ou falha anterior. O erro de criação de processo não comprova a origem da reinicialização.

**Falha C — reinicialização:** a causa raiz permanece não determinada. Não há evidência de que o Windows tenha apresentado bugcheck, perdido energia ou recebido uma solicitação planejada de reinício. A prioridade de investigação é P0 conforme a solicitação; a severidade técnica definitiva permanece pendente.

## Inventário de processos e efeitos da base

| Caminho | Comando externo ou efeito | Risco e limite |
|---|---|---|
| Verificação básica | `git --version`; leitura da versão do próprio Node | Executa o Git encontrado no PATH, mesmo em dry-run. PATH é uma fronteira de confiança. |
| Detecção do gerenciador | `npm/pnpm/yarn/bun --version` | Pode executar wrapper arbitrário ou Corepack; fallback de user-agent não comprova a execução da CLI. |
| Ambiente | Cópia exclusiva `.env.example` → `.env` | Não sobrescreve arquivo existente; não registra valores. Uma falha posterior deixa a cópia preservada. |
| Dependências Node | `npm ci`/`install`, alternativas frozen-lockfile | Executa scripts de terceiros e pode baixar/compilar binários. `npm ci` remove `node_modules` previamente existente; não oferece rollback transacional. |
| Python condicional | `py/python/python3 --version`, `-m venv`, `pip install -r requirements.txt` | Sem manifesto Python nesta base. Se adicionado, pip/build hooks executam terceiros; `.venv` incompleta não pode ser presumida válida. |
| Prisma | `npm exec -- prisma generate`, alternativas de outros gerenciadores | `npm exec` pode obter pacote ausente. Generate escreve cliente local e carrega configuração/código do projeto; não é um diagnóstico puro. |
| Banco | `prisma migrate status` e, após confirmação/flag, `migrate dev` | Na base, status conecta antes do consentimento. A validação da URL verifica sintaxe e não prova destino de desenvolvimento. `migrate dev` pode solicitar reset; precisa de contenção explícita. |

`EVIDENCIA_IMPLEMENTACAO`: a busca em `setup.js` não encontrou chamada de reinicialização, alteração de PATH/perfil, instalação global, elevação ou atualização do sistema. Há instruções impressas para instalar fnm, que requerem ação separada do usuário. Scripts de testes locais contêm `taskkill.exe` para processos possuídos de testes, mas não são chamados pelo setup. Não foi executado `taskkill` nesta auditoria.

`RECOMENDACAO`: remover execução de ferramentas do dry-run; descobrir caminhos sem executar wrappers; limitar Prisma à CLI local; obter consentimento antes de qualquer consulta ao banco; exigir correspondência entre o destino autorizado e a URL efetivamente passada ao filho; capturar e filtrar saídas; bloquear etapas dependentes após erro, sinal ou instalação incompleta. Confiar em um binário local continua exigindo uma origem confiável; apenas mudar a API de spawn não o transforma em sandbox.

## Dependências e lifecycle scripts

`EVIDENCIA_IMPLEMENTACAO`: a enumeração de `packages[*].hasInstallScript` do lockfile desta base encontrou oito entradas. O `package.json` raiz não define `preinstall`, `install`, `postinstall` ou `prepare`.

| Pacote no lockfile | Versão | Evidência inspecionada e risco |
|---|---|---|
| `@prisma/engines` | 7.4.2 | Manifesto instalado ausente. O código-fonte upstream da tag indica postinstall e dependência de fetch-engine, porém o manifesto upstream contém versão interna de workspace; não é uma comprovação byte a byte do pacote publicado. Download de engines e execução permanecem risco de terceiro. |
| `prisma` | 7.4.2 | Manifesto instalado ausente. Upstream da tag registra preinstall; CLI e configuração podem executar código. Artefato publicado e hooks completos não foram executados/auditados integralmente. |
| `bcrypt` | 6.0.0 | Upstream da tag: `install: node-gyp-build`. Seleção de binário/compilação nativa pode criar processos; não implica instalação privilegiada automática de compilador. |
| `better-sqlite3` | 12.6.2 | Upstream da tag: `prebuild-install` com fallback `node-gyp rebuild --release`. Pode baixar binário ou compilar. |
| `esbuild` | 0.28.2 | Manifesto e `install.js` locais disponíveis: postinstall `node install.js`; valida binário com subprocesso, pode chamar npm em diretório auxiliar e baixar arquivo HTTPS. O fallback usa shell internamente, fora do controle do launcher do setup. |
| `fsevents` | 2.3.3 | Lock marcado com hook; fonte upstream declara suporte macOS. Manifesto instalado ausente; flag não revela por si só o comando publicado. Não é evidência de hook executado no Windows. |
| `playwright/node_modules/fsevents` | 2.3.2 | Entrada transitiva distinta; conteúdo instalado ausente e não auditado integralmente. Não extrapolar a inspeção da versão 2.3.3 para esta versão. |
| `unrs-resolver` | 1.11.1 | Upstream da tag: postinstall `napi-postinstall unrs-resolver 1.11.1 check`; requer inspeção dos artefatos nativos e desse hook para confiança maior. |

Os diretórios de diversos pacotes existem localmente com conteúdo incompleto; a existência do diretório não comprova instalação concluída. Os pacotes ausentes não foram instalados para esta inspeção. Não foram encontrados comandos de reboot nos trechos de instalação inspecionados; **a auditoria parcial não exclui comportamento em código transitivo, binários, registro remoto ou arquivos da máquina afetada**. Não se deve declarar toda a cadeia livre de ações privilegiadas ou efeitos colaterais.

Fontes primárias consultadas em 2026-10-30: [bcrypt v6.0.0](https://raw.githubusercontent.com/kelektiv/node.bcrypt.js/v6.0.0/package.json), [better-sqlite3 v12.6.2](https://raw.githubusercontent.com/WiseLibs/better-sqlite3/v12.6.2/package.json), [Prisma engines na tag 7.4.2](https://raw.githubusercontent.com/prisma/prisma/7.4.2/packages/engines/package.json), [CLI Prisma na tag 7.4.2](https://raw.githubusercontent.com/prisma/prisma/7.4.2/packages/cli/package.json), [fsevents v2.3.3](https://raw.githubusercontent.com/fsevents/fsevents/v2.3.3/package.json) e [unrs-resolver v1.11.1](https://raw.githubusercontent.com/unrs/unrs-resolver/v1.11.1/package.json). Tags e fontes não substituem o tarball/integrity do lockfile.

A [documentação npm ci v11](https://docs.npmjs.com/cli/v11/commands/npm-ci/) confirma a substituição de `node_modules` e a opção de desabilitar scripts. `--ignore-scripts` reduz uma superfície de execução, mas não torna pacotes confiáveis nem garante que módulos nativos funcionem. Scripts de terceiros executam com os privilégios da conta corrente: não executar o setup como administrador e não interpretar uma falha de compilação como autorização para instalar software global.

## Hipóteses da reinicialização

| Hipótese | Estado/confiança atual | Evidência que permitiria avançar |
|---|---|---|
| Reboot solicitado diretamente pelo setup inspecionado | Sem chamada correspondente na base; ligação com incidente não comprovada | Versão/hash realmente executados e evento 1074 com processo/origem. |
| Filho ou dependência solicitou reboot | Não comprovada; conteúdo completo e árvore de processos ausentes | 1074, auditoria de processo já existente, logs npm e arquivo/hash do filho. |
| Atualização fnm/Node/npm ou software de sistema | Possível, sem evidência de execução/horário | Comando exato, eventos de instalador, histórico de atualização e 1074. |
| Windows Update | Possível, sem evidência específica | WindowsUpdateClient/Operational e correlação com solicitação de reinício. |
| Bugcheck/driver/travamento | Possível, sem bugcheck ou dump fornecido | WER-SystemErrorReporting 1001, BugcheckCode em 41, dump analisado privadamente. |
| Energia/hardware/reset manual | Possível, sem evidência específica | Sequência 41/6008, observação física e dados de suporte; 41 isolado não identifica causa. |

`INFERENCIA`: não é possível ordenar essas hipóteses por probabilidade com os dados atuais. Correlação temporal, quando obtida, será necessária, mas não suficiente para atribuir causalidade.

## Coleta externa e interpretação

O [guia Windows](../operations/setup-windows-recovery.md) contém coleta somente leitura por janela explícita, incluindo System, Application/WER, Reliability Monitor, Windows Update, minidumps e metadados npm/PowerShell. Não executado nesta investigação: `Get-WinEvent`, consultas CIM, leitura de dumps, histórico de atualização ou conteúdo de logs do usuário.

Conforme a [orientação Microsoft sobre evento 41](https://learn.microsoft.com/en-us/troubleshoot/windows-client/performance/event-id-41-restart), esse evento registra detecção de encerramento não limpo e, isoladamente, não determina a causa. Use IDs junto ao provider: 1074/User32 pode identificar quem solicitou um encerramento; 1001/WER-SystemErrorReporting pode registrar bugcheck; 6005/6006 são marcadores do serviço de eventos. A [orientação Microsoft para reboots](https://learn.microsoft.com/en-us/troubleshoot/windows-server/performance/troubleshoot-unexpected-reboots-system-event-logs) mostra como combinar a sequência, sem atribuir automaticamente causa a 41/6008.

## Validação, revisão e handoff

Esta frente realizou análise estática e consulta a fontes primárias, não uma reprodução do reboot. Não executou instalador completo, npm ci, hooks de terceiros, elevação, migrations, atualização do sistema ou reinicialização. O coordenador deve vincular o patch, testes reais Windows/Linux, revisão independente e PR Draft ao SHA final, com resultado exato em vez de reutilizar resultados históricos do plano anterior.

`EVIDENCIA_IMPLEMENTACAO`, patch desta entrega: CLI npm irmã de `process.execPath`, metadados sem probes, nenhum subprocesso em dry-run, `npm ci --ignore-scripts` por padrão, `--allow-scripts` explícito para hooks/Prisma, CLI Prisma local sem aquisição via npm exec, `.env` exclusivo e preservado, saídas dos filhos suprimidas para não divulgar credenciais, código de saída/sinal tratado e cancelamento de etapas dependentes. Migrations exigem consentimentos, destino local explícito e correspondência com a URL efetiva; aplicam apenas migrations existentes por `migrate deploy`. O comportamento é mais restrito que a base e deve ser usado conforme README/ajuda corrigidos.

`FATO_DOCUMENTADO`, evidência transmitida pela frente QA ao coordenador nesta execução: 29/29 testes no host Windows com Node 24.14.0/npm 11.9.0; controle negativo `.cmd` inofensivo reproduziu EINVAL e smoke npm executou `ci` somente em fixture vazia/offline/com scripts desabilitados, via PowerShell e CMD. Não confundir esse smoke isolado com reinstalação das dependências da aplicação. A versão local é inferior ao requisito da aplicação: o preflight real continua recusando-a. A validação exata Node 24.19.0/npm 11.17.0 e Linux depende dos runners; não está comprovada por esses resultados locais. O [release oficial Node 24.19.0](https://nodejs.org/en/blog/release/v24.19.0) documenta o runtime alvo; consultar o resultado efetivo do workflow para afirmar compatibilidade executada.

`NOT_RUN` nesta frente: lint e suíte da aplicação, CI hospedada, instalação integral, consultas/migrations reais e análise dos registros do computador afetado. A suíte focal e a revisão final são de responsabilidade das frentes QA/coordenador; seu vínculo com o SHA deve constar no handoff/PR, não ser inferido deste inventário da base.

### Integração do coordenador antes da publicação

`EVIDENCIA_IMPLEMENTACAO`: a revisão de integração encontrou um bypass adicional
de destino pela configuração herdada de dotenv. `prisma.config.ts` importa
`dotenv/config`; no [dotenv 17.3.1](https://github.com/motdotla/dotenv/blob/v17.3.1/lib/main.js),
`Boolean(options.override)` trata a string `"false"` como verdadeira. O patch
remove opções dotenv herdadas, fixa o caminho `.env` do projeto, usa override
vazio (falsy), bloqueia vault/debug e remove seletores PostgreSQL herdados que
poderiam redirecionar o destino. Preserva a URL efetiva validada ao chamar Prisma.
A regressão falhou antes da correção e passou depois; nenhuma CLI Prisma ou
migration real foi executada nessa demonstração.

Na árvore integrada, o coordenador executou `node --test tests/setup/*.test.cjs`:
**33 testes, 33 PASS, zero falhas/skips**, Windows Node 24.14.0/npm 11.9.0.
Também passaram `node --check setup.js`, sintaxe do helper CI, ajuda,
`node setup.js --dry-run --skip-migrations` e `git diff --check`. A execução
dry-run informou corretamente runtime incompatível e preparação parcial.
O resultado 29/29 acima é o corte anterior, preservado como histórico; a suíte
passou por 31/31 após a correção dotenv e chegou a 33/33 após a contenção Python.

Na revisão pré-commit, o agente forense identificou que arquivos de uma `.venv`
não comprovavam o isolamento do interpretador. O caminho Python passou a usar
`-I`, pip `--isolated --require-virtualenv`, configuração nula e remoção de
redirecionamentos `PIP_*`; links/junctions são recusados. Testes por mocks
comprovam o contrato e preservação; Python real permanece `NOT_RUN`, pois não há
manifesto Python nesta aplicação.

Lint está `NOT_RUN`: `node_modules/eslint/bin/eslint.js` está ausente; nenhuma
dependência foi instalada neste host para contornar essa limitação. Suítes da
aplicação, build e E2E estão `NOT_RUN`: nenhuma mudança de produto foi realizada,
e esta missão evita executar a instalação ou operar banco no host.

O workflow focal exige Node 24.19.0/npm 11.17.0 em Windows e Linux, testa a CLI
real numa fixture offline e executa o setup padrão no checkout descartável com
hooks bloqueados, Prisma/migrations desabilitados e repetição que verifica o hash
do `.env`. A preparação padrão é parcial: não qualifica runtime da aplicação,
binários nativos ou execução autorizada de hooks. Resultados hospedados e revisão
independente serão registrados na PR por SHA final, sem alterar este corte
pré-publicação para simular evidência posterior.

Pendências externas: horário aproximado e fuso do incidente; confirmação de qual máquina foi afetada; SHA/conteúdo realmente executado; sequência de comandos de atualização; metadados e detalhes selecionados dos eventos; disponibilidade de dump; logs npm revisados localmente. Responsável físico e prazo: não especificado. Dumps, `.env`, credenciais, tokens e histórico integral não devem ser publicados na PR.

Riscos residuais: hooks de terceiros não são sandboxed pelo setup; compiladores/engines podem exigir downloads; interrupção de `npm ci` pode deixar dependências parciais; configuração do Prisma e ambiente herdado são fronteiras de confiança; CI não verifica hardware ou a origem do reboot relatado. A retomada no host afetado depende da avaliação local desses riscos e não é autorizada automaticamente por uma CI verde.
