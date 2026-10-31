# HF-SETUP-INCIDENT-20261030 — correção e investigação

## Estado, objetivo e autoridade

Estado: `AGUARDANDO_REVISAO`, 2026-10-30. Responsável: coordenador Codex e três
subagentes nativos reais, por solicitação explícita do usuário nesta sessão.
Objetivo: corrigir o instalador existente, demonstrar a regressão Windows e
qualificar o patch para revisão, sem atribuir causalidade ao reinício sem logs.
Resultado-alvo: `HF_SETUP_WINDOWS_QUALIFIED_FOR_REVIEW`; resultado parcial ou
bloqueado será informado quando faltar evidência material.

Esta é uma correção transversal de incidente do instalador existente, fora de
uma nova funcionalidade de produto. Segue `PLANS.md`, sem nova spec duplicada.
Fontes: solicitação HF-SETUP-INCIDENT-20261030 (autoridade do escopo), `AGENTS.md`,
`PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, constituição Spec Kit e
`docs/governance/SOURCE_AUTHORITY.md`. Código/testes são
`EVIDENCIA_IMPLEMENTACAO`; relato do reinício é `FATO_DOCUMENTADO` do pedido,
não prova causal. Hipóteses são `INFERENCIA`; orientações são `RECOMENDACAO`.

## Estado inicial e escopo

- Branch inicial `feature/automated-setup`, SHA
  `766a7f14dfdd756703798a794bb06833ef7ccecd`; `git status --porcelain=v1` vazio.
- Branch exclusiva solicitada: `fix/setup-windows-process-recovery-20261030`.
- Host de execução observado: Windows, Node `24.14.0`; não identificado como
  máquina do incidente. Não inferir versão alvo nem incidente a partir do host.
- Alterações previstas: `setup.js`, testes isolados `tests/setup/**`, workflow
  focal, script `test:setup`, README, relatório de incidente, guia de recuperação
  e este plano; registro documental correspondente.
- Preservar `docs/raw/**`, ciência/IHFR, schema/migrations, credenciais, histórico
  e quaisquer alterações preexistentes. Não fazer merge, deploy, instalação
  global, alteração de PATH/perfis, chamadas de reboot ou operação de banco.

## Etapas, responsáveis e conclusão

1. Coordenador: registrar baseline e criar branch; analisar instruções e riscos.
2. Agente A (`forensics`): auditoria estática, causalidade e coleta somente
   leitura com janela explícita; arquivos exclusivos relatório/guia.
3. Agente B (`implementation`): corrigir invocação npm sem shell e gates de
   segurança/recuperação; arquivo exclusivo `setup.js` e helpers se necessários.
4. Agente C (`quality`): regressões Node com mocks/fixtures, workflow Windows e
   Linux, sem dependências/secrets privados; arquivos exclusivos testes/workflow
   e script `test:setup`.
5. Coordenador: integrar, atualizar README, verificar escopo/sintaxe/diff/testes,
   commitar e publicar branch/PR Draft conforme autorização explícita do pedido.
6. Revisão independente por agente que não implementou o código sobre SHA final
   real; corrigir findings materiais e repetir revisão se o SHA mudar.
7. Handoff: registrar SHA, PR/checks reais, testes não executados e pendência
   forense. CI não encerra causalidade, aceite humano ou validação científica.

## Riscos, dependências e pontos de parada

- Não executar instalador completo nem `npm ci` do app neste computador.
- Testes locais reais de npm somente em fixture vazia isolada, offline, scripts
  desabilitados; comandos perigosos são mocks, nunca reboot real. Runners
  descartáveis também exercitam a instalação padrão do aplicativo, com hooks
  bloqueados, sem credenciais e sem migrations. O lockfile tem somente resoluções
  HTTPS de `registry.npmjs.org` (verificado por parser em 2026-10-30).
- Logs físicos/janela/identidade do host do incidente não fornecidos: causalidade
  fica inconclusiva e pendente de evidências externas; correção reproduzível segue.
- Permissões Git locais: `.git` é somente leitura no sandbox; criação de branch
  ocorreu por execução escalada autorizada. Publicação por conector GitHub quando
  suficiente, com fallback Git somente se necessário.
- Revisão humana necessária para merge; não solicitada como condição para produzir
  patch/PR já autorizados. Operação de banco/instalação global não autorizadas.
- Conflito material de autoridade/escopo ou impossibilidade de preservar trabalho
  preexistente interrompe somente a frente afetada.

## Validação prevista

`node --check`, testes Node built-in focais com fixtures, dry-run sem subprocessos
ou escrita, falhas/sinais/códigos, preservação de `.env`, gates de migrations,
recuperação, lint disponível, diff/links/terminologia/segredos. Workflow focal em
Windows/Linux com Node `24.19.0`, sem hooks de terceiros nem uso de
secrets. Registrar resultados reais e limites por SHA; não promover mocks a teste
do SO alvo. Revisão independente não equivale a aceite humano.

## Histórico e desvios

| Data | Estado | Evidência |
|---|---|---|
| 2026-10-30 | `EM_ANDAMENTO` | Baseline limpo verificado; três subagentes nativos iniciados; branch exclusiva criada. |
| 2026-10-30 | `EM_ANDAMENTO` | 29/29 regressões locais PASS, incluindo npm real isolado e controle negativo EINVAL; host Windows Node24.14/npm11.9, sem qualificação automática do runtime alvo. |
| 2026-10-30 | `EM_ANDAMENTO` | Revisão do coordenador identificou bypass por configuração dotenv herdada; correção e regressão adicionadas antes do commit final. |
| 2026-10-30 | `AGUARDANDO_REVISAO` | Patch integrado, 31/31 testes locais PASS, sintaxe/help/dry-run/diff PASS; publicação e revisão independente do SHA final como próximos passos. |
| 2026-10-30 | `AGUARDANDO_REVISAO` | Finding pré-commit do agente forense: exigir pip virtualenv e impedir configurações globais herdadas. Corrigido; 33/33 regressões PASS; Python real NOT_RUN. |

## Corte pré-publicação e handoff

Patch funcional integrado; relatório/guia e registro documental atualizados.
33/33 testes focais PASS no Windows Node24.14/npm11.9, incluindo spawn real,
npm offline, erro EINVAL e regressões por mocks. Não equivale ao runtime alvo.
Sintaxe/help/dry-run/diff PASS; os sete blocos de coleta PowerShell foram apenas
analisados por AST (zero erros), nunca executados. Links locais conferidos.

`NOT_RUN`: lint (dependência ausente), suítes da aplicação/build/E2E, instalação
completa neste host, Prisma/migrations reais e coleta forense. CI e revisão do SHA
final ficam pendentes neste corte; seus recibos posteriores pertencem à PR/handoff
com SHA explícito. O estado deste plano não antecipa aprovação humana.

Causalidade do reboot: `INCONCLUSIVA`, logs/janela/identidade da máquina pendentes.
Sem bloqueio para a correção reproduzível. Hooks autorizados continuam código de
terceiros fora de sandbox; npm ci é não transacional. Nenhum reboot provocado,
merge, deploy ou operação de banco realizado. Plano anterior
`automated-development-setup.md` preservado como histórico da entrega original.
