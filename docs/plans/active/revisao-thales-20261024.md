# Plano transversal — revisão técnica e continuidade para Thales

- **Identificador:** `REVISAO-THALES-20261024`
- **Estado:** `AGUARDANDO_REVISAO`
- **Início:** 2026-10-24, America/Fortaleza
- **Responsável pela execução:** Codex, por solicitação direta do usuário

## Objetivo e resultado esperado

Executar uma revisão técnica e documental do candidato
`origin/fix/investigacoes-intermitentes-20261023-local01` contra
`origin/development`, produzir um handoff verificável para Thales e criar um
commit local contendo apenas o plano e o pacote da revisão. O resultado deve
permitir ao mantenedor decidir sobre correções, ordem de integração, conciliação
documental e homologação sem confundir CI, revisão, merge, deploy ou aceite.

## Escopo

- reconfirmar refs, árvores, merge-base, ancestralidade, ahead/behind e delta;
- reconstruir cronologia dos 12 commits e das PRs #27, #28 e #29;
- inspecionar governança, Code-First, planos, releases, specs, código, testes e
  configuração pertinentes;
- reavaliar os nove IDs investigativos e a cadeia funcional principal;
- executar validações locais proporcionais, sem recursos hospedados;
- produzir `relatorio-de-revisao.md`, `proximos-passos.md` e
  `evidencias.json` em `docs/reviews/20261024-revisao-thales/`;
- revisar o diff completo e criar commit local explícito.

## Fora de escopo

- feature ou patch de produto por inferência;
- merge, push, abertura/alteração de PR, comentário público ou mensagem externa;
- deploy, alteração de ambiente/provedor, banco hospedado ou dados reais;
- aprovação humana, operacional, de produto, UX, acessibilidade ou ciência;
- edição de `docs/raw/**` e reescrita de recibos históricos.

## Fontes, autoridade e classificações

Aplicam-se `AGENTS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, `PLANS.md`,
`.specify/memory/constitution.md`, o pacote Code-First e
`docs/governance/SOURCE_AUTHORITY.md`. Código/testes/configuração evidenciam
implementação; decisões atuais com origem governam intenção; documentos antigos
preservam época e autoridade. Serão usadas as classificações
`FATO_DOCUMENTADO`, `EVIDENCIA_IMPLEMENTACAO`, `INFERENCIA`, `RECOMENDACAO` e
`PENDENCIA_DE_DECISAO`. O IHFR permanece `CONTRATO_EXPERIMENTAL`,
`VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Estado inicial e preservação

- checkout principal: `main@beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`;
- alteração preexistente preservada no checkout principal: `package-lock.json`;
- branch da worktree isolada: `docs/revisao-20261024`;
- base: `00477e961e36416d8d602d36f7e0ee195c487148`;
- árvore base: `c980346ef3044e0da79d36c42f3cd0da0a4839c2`;
- upstream temporário: `origin/fix/investigacoes-intermitentes-20261023-local01`;
- `origin/development`: `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`;
- relação inicial: 12 commits à frente, zero atrás, merge-base igual a
  `origin/development`.

## Dependências, riscos e decisões pendentes

- Evidência externa de PR/CI deve ser consultada por SHA/URL e separada de
  validações executadas nesta revisão.
- Ausência de PostgreSQL, browser, cache, rede ou credenciais deve ser registrada
  como bloqueio específico, sem enfraquecer guards ou assertions.
- A ordem de integração das PRs #27–#29 e qualquer homologação são decisões do
  mantenedor; a revisão apenas recomenda.
- Um novo commit não herda o CI/review do ancestral `00477e9`.

## Etapas e critérios de conclusão

1. **Preflight e inventário** — refs, worktrees, histórico, delta e fontes
   registrados; alterações alheias preservadas.
2. **Reconstrução documental e histórica** — pacotes mínimos lidos e cobertura
   classificada sem alegação de exaustividade indevida.
3. **Revisão técnica** — jornadas e nove IDs ligados a caminhos, testes e
   evidências; hipóteses separadas de achados.
4. **Validação proporcional** — comandos, ambiente, horários, códigos de saída e
   alcance registrados; CI consultado não contado como execução local.
5. **Pacote de entrega** — três artefatos consistentes, JSON válido, referências
   verificadas e dados sensíveis ausentes.
6. **Revisão final e commit** — diff/whitespace/escopo conferidos, arquivos
   adicionados por caminho explícito e commit local criado.

## Pontos de parada humana

- decisão entre fontes com autoridade insuficiente;
- autorização para operação externa, merge, push, PR, deploy ou recurso
  hospedado;
- validação científica, aceite humano ou designação de operador/autoridade.

As partes independentes continuam quando um desses pontos não bloquear a
revisão documental.

## Verificações previstas

- `git diff --check`, inspeção integral do diff e estado final;
- validação sintática de `evidencias.json`;
- checagem de links, paths, linhas, SHAs e classificações;
- busca focal por segredos e dados pessoais nos novos arquivos;
- testes existentes pertinentes ao diagnóstico, seguidos por typecheck, lint e
  build quando o ambiente permitir, sem alterar dependências ou timeouts.

## Histórico

| Data/hora (America/Fortaleza) | Estado | Registro |
|---|---|---|
| 2026-10-24 | `EM_ANDAMENTO` | Worktree isolada criada no HEAD investigativo reconfirmado; regras locais e fontes de autoridade iniciais lidas. |
| 2026-10-24 | `EM_ANDAMENTO` | PRs #27–#29 e CI do HEAD consultadas; 15/15 registros do job oficial conferidos; merge simulations executadas sem alterar refs. |
| 2026-10-24 | `EM_ANDAMENTO` | Node 24.22.1, lockfile e Prisma bootstrap usados; unitários 402/402 + mail 17/17, typecheck, lint sem erros e build Next passaram. |
| 2026-10-24 | `AGUARDANDO_REVISAO` | Relatório, próximos passos e evidências produzidos; recomendação e limites registrados; nenhum push/merge/deploy/operação hospedada. |

## Encerramento

Execução documental concluída e pronta para revisão. Merge, publicação e aceites
permanecem com o mantenedor. O SHA do commit local é registrado no fechamento da
sessão, pois não pode ser autorreferente neste arquivo antes de sua criação.
