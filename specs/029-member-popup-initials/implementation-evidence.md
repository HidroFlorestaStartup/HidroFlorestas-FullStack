# Evidências locais — popup geral de membros

Missão HF-NIGHT-01, autor /root/fr015, 2026-10-25. `EVIDENCIA_IMPLEMENTACAO` somente no alcance observado abaixo; não representa aceite humano, operação real ou validação científica.

## Estado inicial e escopo

- Worktree exclusivo `.worktrees/fr015`, branch `fix/hf-night-fr015-20261025`, baseline `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`; árvore inicialmente limpa.
- Dois arquivos de apresentação previstos, mais testes sintéticos e artefatos spec029. DTO `LaboratoryMemberDto` existente contém somente `name`/`initials`; parser/serviço/rede/schema/membership não são alterados.
- `vercel.json`: o coordenador /root acrescentou a guarda exata da branch com valor false durante o trabalho. Mudança coordenada separada da correção visual, preservada pelo autor; sem setting externo alterado.

## Spec Kit real executado

- Skills instaladas em `.agents/skills/speckit-*/SKILL.md` foram lidas e executadas como workflows: specify com template resolvido/ponteiro local ignorado e checklist16/16; setup-plan e artefatos fase0/1; checklist8 itens; setup-tasks10 tarefas; analyze somente leitura antes de código.
- Analyze: 6 requisitos, 4 critérios de sucesso,10 tarefas,100% cobertura;0 conflitos, ambiguidades, duplicações ou tarefas sem vínculo. Sete princípios constitucionais conferidos. Fontes: missão corrente, C1 C02, spec002 FR-015 e CF-PRD-FR-003.
- Checklist UX gerado inicialmente unchecked; revisor /root avaliou explicitamente os8 critérios e registrou marcações/nota. Gate implement: requirements16/16 e UX8/8,0 itens pendentes. Implement não alterou marcadores.
- `.specify/extensions.yml` e diretório de extensões ausentes; nenhum hook de bugfix ou outro hook instalado para executar.
- `check-prerequisites.sh --json --require-spec --require-tasks --include-tasks` e variante implement executados com sucesso usando Git Bash local.

## Ambiente e preparação

- Node24.19.0, npm12.0.2, Next16.3.8, React19.2.4 e Playwright1.55.1.
- `npm ci --no-audit --no-fund`: PASS,553 pacotes; nenhuma mudança de lock. npm informou scripts de instalação bloqueados por política local em6 pacotes. Não houve alteração dessa política ou atualização de dependências.
- Guias locais Next lidos antes do código: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` e `11-css.md` (incluindo CSS Modules).
- `.gitignore` e ESLint existentes verificados; node_modules, saída de browser, gerados, ambiente e build já ignorados. Não há novo artefato sensível para incluir.

## Verificação

| Verificação | Resultado | Alcance |
|---|---|---|
| `npx playwright test --config tests/ui/member-popup.config.ts` antes da correção | RED:4 FAIL/1 PASS | Quatro falhas exclusivamente nos avatares ausentes (0 elementos); lista vazia passou. |
| Mesmo runner após a correção e extensão de reflow | PASS:6/6,0 skips,5.2s | 320px/1280px, acentos, espaços/vazios, duplicatas, texto semelhante a HTML,40 membros, nome de240 caracteres, semântica, foco e reflow equivalente200%. |
| `node --import=tsx --test tests/unit/laboratory-contracts.test.ts tests/unit/laboratories-service.test.ts` | PASS:9/9,2 suítes,0 skips | Mocks existentes; allowlist pública e iniciais do serviço preservadas; URL loopback sintética em sessão, sem conexão. |
| `npx eslint src/components/workspace/laboratory-workspace.tsx tests/ui/member-popup.spec.ts tests/ui/member-popup.config.ts` | PASS,exit0 | Sem erro ou aviso nos arquivos do delta, última execução após a regressão de reflow. |
| `npm run typecheck` | PASS,exit0 | Tipos gerados Prisma locais; última execução após a regressão de reflow. |
| `git diff --check` e revisão de escopo | PASS | Sem whitespace inválido, nenhum arquivo de dados/serviço/schema/auth alterado. |
| Referências Markdown novas | PASS | Destinos relativos existentes na spec029. |

O navegador usou o componente real, CSS Modules real e CSS global processado, com stub somente de Next/link para o harness. Cada teste registra exatamente os dois GETs existentes e bloqueia qualquer requisição inesperada, inclusive egress ou escrita. Respostas inteiramente sintéticas. Sem erros de página e sem imagem de avatar solicitada. Nomes aparecem na árvore de acessibilidade; iniciais decorativas não aparecem nem recebem foco. Tab/Shift+Tab permanecem no dialog e Escape devolve foco ao acionador.

## Falhas intermediárias e resolução

- A primeira execução unitária teve3 testes de contrato PASS e erro de import do serviço porque Prisma ainda não estava gerado; não foi resultado funcional do serviço. Uma segunda tentativa encontrou `uv_os_get_passwd ENOMEM` da restrição Windows antes dos dois arquivos de teste executarem. Repetição autorizada fora dessa restrição:9/9 PASS.
- `npx prisma generate` inicial falhou ao obter schema-engine por rede. Reexecução com `PRISMA_SCHEMA_ENGINE_BINARY` apontando por leitura para o engine já instalado no worktree QA, da mesma versão: PASS; gerados somente em `src/generated/prisma` deste worktree e ignorados por Git. Nenhuma migration ou banco acessado.
- Primeiro pós-delta:3/5 PASS, dois testes esperavam foco imediato no botão fechar. Inspeção mostrou contrato existente de focar o dialog enquanto busy; o teste foi corrigido para usar Tab desde o dialog após a carga, sem editar SettingsDialog. Reexecução5/5 PASS e extensão de reflow6/6 PASS. Não houve correção de aplicação para acomodar o teste.
- Lint inicial demorou e concluiu exit0. Última execução focal autorizada fora da restrição Windows também exit0. Política de instalação e configurações do repositório permaneceram intactas.

## Limites

- Emulação de reflow200% usa640px físicos/320px CSS com deviceScaleFactor2; não é ensaio manual do controle de zoom do navegador.
- Testes de navegador isolados não validam o servidor Next completo, autenticação real, integração com banco, homologação no destino, avaliação humana de leitor de tela ou aceite humano. Build/suíte ampla não foram executados pelo autor focal; QA independente possui seu escopo próprio.
- Sem serviços, SMTP real, schema ou dependência nova; sem alteração científica/IHFR. `docs/raw/**`, registros canônicos globais e superfícies OWNER mantidos. A evidência nova está localizada nesta spec, sem reescrever C1 histórico.
- Nenhum commit/push/PR pelo autor; delta aguardará revisão independente. Guarda de Vercel do coordenador permanece separada.

Revisão independente posterior `/root`: [parecer](independent-review.md), PASS
local sem finding material. Revisor leu o delta e executou os6 testes de navegador
com6/6PASS,0skip,5.7s. Não concede aceite humano; publicação/Codex do SHA final
seguem separados. A afirmação anterior de aguardo descreve o corte do autor.

## Convergência posterior à implementação

speckit-converge executado após implement, usando spec/plan/tasks e constituição como intenção; inspeção limitada aos caminhos previstos, sem comparação Git durante a avaliação.

| Métrica | Resultado |
|---|---|
| Requisitos/critérios/aceites examinados | 15:6 FR,4 SC,5 cenários |
| Decisões técnicas do plano | 4 |
| Princípios constitucionais | 7 |
| missing / partial / contradicts / unrequested | 0 /0 /0 /0 |
| Achados por severidade | CRITICAL0,HIGH0,MEDIUM0,LOW0 |
| Tarefas acrescentadas | 0 |

Resultado: **Converged — the implementation satisfies the spec, plan, and tasks.** tasks.md permaneceu byte a byte inalterado durante converge (SHA256 antes/depois `08164097205EBD12B1F1E6A6B582D62471515C67D425D3715D963222D0382A0C`). A marcação de T010 ocorreu posteriormente em implement, após registrar a evidência. Nenhum hook antes/depois instalado. Próximo passo: revisão independente do delta pelo coordenador/revisor, sem publicação pelo autor.
