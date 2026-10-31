# HF-UI-044-G0 — handoff de implementação

**Estado: PASS_G0_READY — preparação Git/CI publicada.**
**Data do corte:** 31/10/2026, America/Fortaleza. **Repositório:** `HidroFlorestaStartup/HidroFlorestas-FullStack`.

Prontidão de preparação não significa produto implementado, quinze gates aprovados, revisão independente, aceite humano ou autorização de merge/deploy. As três Actions estavam em andamento na última leitura; os IDs abaixo permitem consultar a conclusão real.

## 1. Base e recibo publicado

- GUARD_SHA congelado: `07755822f5dc75fe2be1d924005d30ed99f64a0b`.
- Branch: `chore/hf-ui044-ci-preview-guards`; [PR Draft #45](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45), destino development.
- Pai único/development confirmada: `9b8595d232842d401ce81bbc92c54dd543aa2829`.
- Fonte aprovada [PR #44](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/44), SHA `972f9b00189bf09117883913d8c4fa63e69f4d2f`; branch documental não editada.
- Starter visual somente leitura: `HidroFlorestaStartup/hidroflorestas-frontend-starter`, SHA `cbb954a7d3cdb6bb08d2a5864541b8aa9605fa0f`.
- `main` permaneceu em `beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`; `feature/automated-setup` permaneceu em `9743349b792f117134a6a90984cd099793401fa5` e não foi absorvida.

O recibo final está na descrição do PR #45. O manifesto do commit guards é deliberadamente um corte pré-publicação; seu campo pendente não foi reescrito. A descrição final encerra essa etapa sem mover o SHA compartilhado.

## 2. Pontos de partida independentes

| Frente | Branch existente | HEAD observado | PR Draft / spec |
|---|---|---|---|
| A | `feat/ajustes-navegacao-conta` | `55e00b531c9691c1b568fc83e86c0ccf176430fd` | [#46](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/46) / `035-ajustes-navegacao-conta` |
| B | `feat/ajustes-area-coletas-ihfr` | `353a3fd00bc7d4155ab3fc2f17ad063e7108d68f` | [#47](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/47) / `036-ajustes-area-coletas-ihfr` |
| C | `feat/localizacao-endereco-opcional` | `e1ec632d60b22f2ddef93f1dbec0116d214d30f1` | [#48](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/48) / `037-localizacao-endereco-opcional` |

Todas as frentes têm como base/merge-base `07755822f5dc75fe2be1d924005d30ed99f64a0b`. A e B têm dois commits documentais próprios; C tem um. Não estão empilhadas umas sobre as outras. Os destinos finais de todos os PRs são development.

Cada reserva contém `spec.md`, `plan.md`, `tasks.md` e `implementation-evidence.md`. São documentos iniciais com testes planejados e evidências de preparação, não código funcional/testes executáveis concluídos. Completar o detalhamento técnico na própria reserva antes de implementar.

## 3. Ownership e arquivos compartilhados

| Owner | Exclusividade de implementação futura |
|---|---|
| A | Shell/layout, workspace, navegação e conta; UI-01/UI-05/UI-06 nesse recorte. |
| B | Detalhe da área/coleta, listagem e apresentação/leitura IHFR/ambientais; UI-02/UI-03/UI-04/UI-06 nesse recorte. Não editar formulário C ou shell A. |
| C | Formulário de localização/cadastro da área, entradas de coordenadas, geocodificação e endereço opcional. Não reorganizar detalhe B nem shell A. |
| Coordenador | `vercel.json`, `.github/workflows/rc-review.yml` e integração de alterações compartilhadas. |

Estilos globais, UI comum, layouts, DTO/repositório de áreas, schema, package.json/lockfile, fixtures e configuração de testes exigem alocação explícita de um writer. Propor arquivo/hunks/contrato/testes ao coordenador; não editar em paralelo por conveniência. Completar o mapa de arquivos concretos e ler AGENTS aplicáveis antes de produto.

## 4. Validação e CI

JSON/YAML sem chaves duplicadas, gramática do if, igualdade entre filtros, diff/whitespace e hashes dos blobs: PASS. Preservadas 35 guardas existentes, acrescentadas cinco (guards, A, B, C, documental #44), total 40. Branches do workflow: 20 anteriores + três funcionais = 23.
Tabela de 33 casos: 23 positivos e dez negativos. Seis contraprovas rejeitadas: Preview habilitado, guarda antiga removida, nome ausente em push, nome ausente em if, runner alterado e timeout ampliado. Remover os três novos nomes recupera a estrutura semântica original do workflow integralmente.
Runners, Actions fixadas, contents:read, timeout de 35 minutos, artefatos e proteção do PostgreSQL sintético permanecem inalterados. Os quinze gates continuam no runner original. Nenhum arquivo de produto/runner/schema/dependência/teste funcional foi editado pelo G0.

| Frente | Run / tentativa | Job validate | Estado na última leitura |
|---|---|---|---|
| A | [41216365650](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41216365650) / 1 | `124581672069` | in_progress; job iniciou no HEAD acima |
| B | [41216396078](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41216396078) / 1 | `124581763018` | in_progress; job iniciou no HEAD acima |
| C | [41216197678](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41216197678) / 1 | `124581121107` | in_progress; job iniciou no HEAD acima |

Os três runs são do evento push. Isso confirma que os filtros e a condição permitem os nomes novos; não prova PASS terminal dos quinze gates. Actionlint local não estava instalado. O GitHub aceitou o workflow e iniciou os jobs. Testes de produto/visual/aceite humano: NOT_RUN por G0. Inventário de deployments do provedor não consultado; guardas preventivas verificadas, nenhuma ação de deploy executada.

## 5. Diffs e integração futura

Guards versus development: cinco arquivos. Cada frente versus GUARD_SHA: quatro documentos próprios. Cada frente acumulada versus development observada: nove arquivos, cinco compartilhados e quatro exclusivos. Os PRs trazem links imutáveis para os dois diffs.

```bash
git diff 07755822f5dc75fe2be1d924005d30ed99f64a0b...HEAD
git diff 9b8595d232842d401ce81bbc92c54dd543aa2829...HEAD
# Antes da integração, repetir a segunda comparação contra development atual e registrar seu SHA.
```

Ordem recomendada, sem executar merge agora: guards #45 primeiro; #44 pode integrar independentemente conciliando a união das guardas. A precede a validação composta de B quando houver dependência do shell. C trabalha em paralelo e pode integrar após guards, coordenando os contratos comuns. Em eventual squash/rebase de guards, transportar somente commits exclusivos posteriores a GUARD_SHA, preservar configurações concorrentes e refazer diffs/CI.

## 6. Handoffs exatos por frente

As instruções abaixo são para os executores das implementações; não ampliam a autorização de G0. Cada execução deve observar a autorização aplicável, reutilizar a branch/PR existente e preservar trabalho concorrente.

### Frente A — UI-01, UI-05 e UI-06 no shell, conta e navegação

```text
Retome HidroFlorestaStartup/HidroFlorestas-FullStack, branch feat/ajustes-navegacao-conta, PR Draft #46 para development.
Checkpoint G0: 55e00b531c9691c1b568fc83e86c0ccf176430fd.
Base comum congelada: 07755822f5dc75fe2be1d924005d30ed99f64a0b.
Reserva exclusiva: specs/035-ajustes-navegacao-conta/.
Leia integralmente o pacote aprovado de #44 no SHA 972f9b00189bf09117883913d8c4fa63e69f4d2f, a governança aplicável e os quatro documentos da reserva.
Confira HEADs/ancestralidade, guardas, PRs, upstreams/worktrees/alterações locais quando aplicável. Se o HEAD avançou, reconcilie e preserve o trabalho; não resete para o checkpoint.
Complete o fluxo Spec Kit e o mapa de paths/contratos/testes na mesma reserva. Não abra nova branch/spec/PR para duplicar este início.
Preserve Resumo/Áreas/Mapa/Membros no contexto correto, conta agrupando senha/exclusão, rotas e autorização reais. Implemente navegação inferior mobile contextual com safe-area e último controle acessível. Compare starter/FullStack executados nos mesmos estados e viewports; não copie mocks, personas ou TanStack Router. B/C não escrevem no shell em paralelo.
Vercel/workflow são somente leitura. Encaminhe deltas compartilhados ao coordenador com hunks, contrato e testes; não absorva outras frentes nem automated-setup.
Consulte o run G0 41216365650 por SHA/tentativa antes de alegar baseline verde. Execute testes próprios e gates preservados no HEAD de implementação; registre PASS/FAIL/NOT_RUN e evidências reais.
Atualize spec/plano/tarefas/evidências e o PR próprio, apresentando diff exclusivo contra GUARD_SHA e acumulado contra development atual.
Sem merge, deploy, escrita em main/development/#44, Neon, migrations hospedadas, SMTP, Cloudinary, alterações científicas ou REV-01–REV-03. Não simule revisão independente ou aprovação humana.
```

### Frente B — UI-02, UI-03, UI-04 e UI-06 nas páginas de área e coleta

```text
Retome HidroFlorestaStartup/HidroFlorestas-FullStack, branch feat/ajustes-area-coletas-ihfr, PR Draft #47 para development.
Checkpoint G0: 353a3fd00bc7d4155ab3fc2f17ad063e7108d68f.
Base comum congelada: 07755822f5dc75fe2be1d924005d30ed99f64a0b.
Reserva exclusiva: specs/036-ajustes-area-coletas-ihfr/.
Leia integralmente o pacote aprovado de #44 no SHA 972f9b00189bf09117883913d8c4fa63e69f4d2f, a governança aplicável e os quatro documentos da reserva.
Confira HEADs/ancestralidade, guardas, PRs, upstreams/worktrees/alterações locais quando aplicável. Se o HEAD avançou, reconcilie e preserve o trabalho; não resete para o checkpoint.
Complete o fluxo Spec Kit e o mapa de paths/contratos/testes na mesma reserva. Não abra nova branch/spec/PR para duplicar este início.
Preserve ocorrência em campo/offsets, confirmado/draft e estado vigente/substituído/revogado. Exiba origem e ocorrência do IHFR disponível, mesmo de coleta anterior. A seleção do primeiro diagnóstico vigente entre coletas ordenadas por ocorrência é INFERENCIA operacional do handoff, a confirmar contra contratos, não nova decisão aprovada. Preserve os quatro qualificadores experimentais acessíveis e a orientação humana sobre falta de dados confirmados. Não altere fórmula, ciência, manifestos ou hashes científicos.
Vercel/workflow são somente leitura. Encaminhe deltas compartilhados ao coordenador com hunks, contrato e testes; não absorva outras frentes nem automated-setup.
Consulte o run G0 41216396078 por SHA/tentativa antes de alegar baseline verde. Execute testes próprios e gates preservados no HEAD de implementação; registre PASS/FAIL/NOT_RUN e evidências reais.
Atualize spec/plano/tarefas/evidências e o PR próprio, apresentando diff exclusivo contra GUARD_SHA e acumulado contra development atual.
Sem merge, deploy, escrita em main/development/#44, Neon, migrations hospedadas, SMTP, Cloudinary, alterações científicas ou REV-01–REV-03. Não simule revisão independente ou aprovação humana.
```

### Frente C — UI-07: geocodificação reversa e endereço opcional

```text
Retome HidroFlorestaStartup/HidroFlorestas-FullStack, branch feat/localizacao-endereco-opcional, PR Draft #48 para development.
Checkpoint G0: e1ec632d60b22f2ddef93f1dbec0116d214d30f1.
Base comum congelada: 07755822f5dc75fe2be1d924005d30ed99f64a0b.
Reserva exclusiva: specs/037-localizacao-endereco-opcional/.
Leia integralmente o pacote aprovado de #44 no SHA 972f9b00189bf09117883913d8c4fa63e69f4d2f, a governança aplicável e os quatro documentos da reserva.
Confira HEADs/ancestralidade, guardas, PRs, upstreams/worktrees/alterações locais quando aplicável. Se o HEAD avançou, reconcilie e preserve o trabalho; não resete para o checkpoint.
Complete o fluxo Spec Kit e o mapa de paths/contratos/testes na mesma reserva. Não abra nova branch/spec/PR para duplicar este início.
Cubra coordenadas do dispositivo, ponto no mapa e digitação válida. Município/UF/CEP são opcionais parcial ou totalmente; retorno parcial, timeout, limite, ausência de CEP ou falha não podem bloquear cadastro válido. Teste respostas fora de ordem e proteção de edição manual. Confirme/documente provedor e termos atuais, sem contratação paga ou ativação presumida. Mudança mínima em DTO/schema somente se demonstrada, coordenada e testada em banco sintético; nunca migration hospedada.
Vercel/workflow são somente leitura. Encaminhe deltas compartilhados ao coordenador com hunks, contrato e testes; não absorva outras frentes nem automated-setup.
Consulte o run G0 41216197678 por SHA/tentativa antes de alegar baseline verde. Execute testes próprios e gates preservados no HEAD de implementação; registre PASS/FAIL/NOT_RUN e evidências reais.
Atualize spec/plano/tarefas/evidências e o PR próprio, apresentando diff exclusivo contra GUARD_SHA e acumulado contra development atual.
Sem merge, deploy, escrita em main/development/#44, Neon, migrations hospedadas, SMTP, Cloudinary, alterações científicas ou REV-01–REV-03. Não simule revisão independente ou aprovação humana.
```

## 7. Limites do ambiente e fontes

`NATIVE_SUBAGENTS_UNAVAILABLE`: inspeções sequenciais pelo mesmo coordenador, sem delegação simulada. O clone local falhou por DNS; publicação realizada pela API GitHub, sem checkout de produto. Worktrees, upstreams e alterações da máquina do usuário não são observáveis nesta sessão e não foram declarados limpos.

- [Recibo final G0](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/45).
- [Plano/ownership e validador por SHA](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/tree/07755822f5dc75fe2be1d924005d30ed99f64a0b/docs/plans/active/hf-ui044-g0).
- [Pacote aprovado de Pedro por SHA](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/tree/972f9b00189bf09117883913d8c4fa63e69f4d2f/docs/plans/active/ajustes-interface-pos-testes-20261030).
- O ZIP de evidências contém configurações de base/candidata, validador e resultados locais, recibo JSON e este handoff; não é um clone ou arquivo completo do repositório.
