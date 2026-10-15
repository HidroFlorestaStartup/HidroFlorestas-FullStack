# Guia de correção dos achados — handoff para desenvolvimento com IA

Este roteiro transforma os achados de
[15/10/2026](achados-revisao-2026-10-15.md) em trabalho implementável e
verificável. Ele não autoriza merge, deploy, Cloudinary real, migration remota nem
alteração de produção.

## Resultado esperado

Entregar correções para CRI-REV-001 e CRI-REV-002 na etapa de origem da Spec 016,
propagá-las pela pilha sem reescrever histórico compartilhado, atualizar a revisão
independente e obter nova aprovação. A RC só fica candidata ao merge em
`development` quando todos os critérios do documento de achados estiverem fechados.

## Regras para o agente/IA que executar

1. Ler `AGENTS.md`, `PROJECT_CONTEXT.md`, `TECH_DECISIONS.md`, a Spec 016 e os
   contratos de imagens antes de alterar código.
2. Confirmar novamente heads, bases, reviews e automações; o snapshot de 15/10 pode
   ficar desatualizado.
3. Corrigir primeiro na branch de origem `review/016-area-covers`, não diretamente
   na branch de release, e propagar conforme `integration-guide.md`.
4. Atualizar Spec/plan/tasks/contratos antes ou junto da implementação quando a
   decisão funcional de rollout for confirmada.
5. Não usar credenciais, banco hospedado, Cloudinary real ou dados pessoais nos
   testes. Usar fixture, banco isolado e marcadores de ownership previstos no repo.
6. Não remover/relaxar autorização, OCC, idempotência, prova de ownership, limpeza
   de metadados ou reautorização para facilitar a correção.
7. Não declarar homologação/produção pronta com base apenas em suíte verde.

## Etapa 1 — fechar a decisão de produto do flag

PENDENCIA_DE_DECISAO: escolher e registrar uma das políticas:

- **A — desabilitação total:** com flag `0`, upload, remoção e leitura do conteúdo
  ficam indisponíveis; metadados e fallback continuam funcionando; ou
- **B — somente leitura:** com flag `0`, novas mutações ficam indisponíveis, mas
  capas já existentes ainda podem ser lidas por usuários autorizados.

A política B exige separar capacidade de leitura e de mutação na configuração; não
é seguro derivá-la de um único factory que recusa todo o provedor. Em qualquer
política, autorização contextual continua sendo avaliada no servidor.

Registrar a decisão em:

- `specs/016-area-covers/spec.md`;
- `specs/016-area-covers/contracts/images.md`;
- plan/tasks correspondentes;
- `docs/operations/area-covers-runbook.md` e exemplo de ambiente.

## Etapa 2 — corrigir o contrato e a UI

### Alteração mínima sugerida

- Introduzir no `CoverDto` uma capacidade explícita, por exemplo
  `featureEnabled` ou um enum pequeno de disponibilidade.
- Calcular a capacidade no servidor a partir de validação segura do ambiente, sem
  instanciar o provedor nem fazer chamada de rede.
- Manter `canEdit` representando somente autorização contextual.
- Renderizar mensagem/fallback próprio quando a capacidade estiver desligada.
- Não renderizar controles de seleção, upload ou remoção como operáveis nesse estado.
- Aplicar a política escolhida a capas existentes e à rota de conteúdo.

Evitar devolver motivo interno, variável, nome do provedor ou detalhe de credencial.
Um boolean/enum de capacidade é suficiente para o cliente.

### Matriz mínima de testes

| Cenário | Permissão | Flag/config | Resultado esperado |
|---|---|---|---|
| OWNER ativo | edita | `1` e config válida | controles disponíveis |
| OWNER ativo | edita | `0` | mensagem de recurso desligado; sem mutação |
| OWNER ativo | edita | flag ausente/inválido | falha fechada; sem mutação |
| MEMBER ativo | lê | `1` | sem controles de mutação |
| MEMBER ativo | lê | `0` | comportamento de leitura conforme decisão, nunca edição |
| laboratório inativo | somente leitura | qualquer | nenhuma mutação |
| capa ausente | conforme role | qualquer | fallback “Área sem capa” |
| capa existente + recurso indisponível | conforme decisão | `0` | estado explícito, sem erro enganoso |

Cobrir DTO/contrato e componente. Não testar somente a resposta da rota de upload.

## Etapa 3 — mover a barreira local para antes do provedor

### Algoritmo requerido para `initiate`

```text
parseUpload
  -> transação serializável de preflight
       reautoriza contexto
       valida replay, revisão e quotas
       devolve estado mínimo elegível
  -> se inelegível: retorna erro local, sem provider()
  -> provider().preset()
  -> segunda transação serializável
       reautoriza contexto
       revalida replay, revisão e quotas
       cria tentativa e jobs uma única vez
  -> provider.ticket(attempt)
```

Cuidados obrigatórios:

- não segurar transação enquanto aguarda a rede;
- preservar retry serializável de `P2034`/unicidade;
- preservar semântica da mesma chave idempotente;
- revalidar role, vínculo, laboratório e revisão na segunda transação;
- decidir de forma determinística o caso em que outra requisição cria a mesma chave
  durante a consulta externa;
- garantir que concorrência não ultrapasse as quotas, mesmo que várias chamadas
  passem simultaneamente pelo preflight;
- não criar tentativa/job quando preset falha.

### Instrumentação do fake provider

Adicionar contadores explícitos em `tests/fixtures/area-cover-provider.ts`, ao menos:

- `presetCalls`;
- opcionalmente `ticketCalls`, se útil para provar emissão única;
- um hook/barreira controlada para testes concorrentes, sem `sleep` frágil.

### Testes obrigatórios

- sucesso novo: exatamente uma validação externa necessária e um ticket;
- replay válido: resultado idempotente; documentar se reutiliza ou não valida preset
  e testar a escolha;
- replay incompatível: zero novas chamadas externas;
- revisão obsoleta: zero novas chamadas externas;
- três tentativas ativas: quarta recusa com zero novas chamadas externas;
- dez tentativas na janela: próxima recusa com zero novas chamadas externas;
- mudança de revisão/vínculo durante a chamada externa: segunda transação recusa e
  não cria tentativa;
- duas ou mais solicitações concorrentes perto do limite: total persistido nunca
  ultrapassa a quota;
- preset indisponível/alterado: nenhum registro ou job órfão.

## Etapa 4 — validação proporcional ao risco

Executar em ambiente local isolado, com versão Node indicada pelo repositório e
Prisma gerado. Selecionar comandos conforme o diff, registrando SHA, ambiente e
resultado. Para esta correção, o mínimo esperado é:

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run test:integration
npm run build
```

Executar também os testes de componente/browser específicos da área se forem
adicionados ou se a UI mudar. O banco do runner deve passar pelos guards do projeto;
jamais apontar `TEST_DATABASE_URL` para produção. `git diff --check` e revisão do
diff são obrigatórios mesmo com a suíte verde.

## Etapa 5 — propagação e revisão

1. Abrir/atualizar a correção a partir de `review/016-area-covers`.
2. Obter revisão do diff de código e dos testes.
3. Propagar pela cadeia por merges rastreáveis, respeitando a ordem descrita em
   [integration-guide.md](integration-guide.md); não rebasear/forçar branches já
   compartilhadas sem decisão explícita do mantenedor.
4. Atualizar `release/cri-rc-20261010` somente depois de a correção de origem estar
   identificada e aprovada.
5. Sincronizar `review/cri-rc-validation-20261012` com a nova RC e rerodar seus
   checks no novo SHA.
6. Solicitar nova revisão dos PRs 4 e 6; resolver `CHANGES_REQUESTED` somente com
   evidência correspondente.
7. Confirmar que o candidato aprovado é ancestral exato do merge proposto em
   `development` e verificar se essa branch dispara deploy.

## Definição de pronto para solicitar o merge

- [ ] Decisão de comportamento do flag registrada e aprovada.
- [ ] CRI-REV-001 corrigido com testes de DTO, autorização e UI.
- [ ] CRI-REV-002 corrigido com contador de provider e testes concorrentes.
- [ ] Nenhum segredo/config interna foi adicionado ao DTO, log ou fixture.
- [ ] Suíte selecionada, typecheck, lint e build aprovados no SHA candidato.
- [ ] Correção propagada pela pilha sem commit duplicado ou história reescrita.
- [ ] PR 7 sincronizado e validado no head atual.
- [ ] `CHANGES_REQUESTED` resolvidos e aprovações obrigatórias presentes.
- [ ] Efeito de merge em `development` sobre deploy foi confirmado.
- [ ] Gates operacionais ainda pendentes continuam declarados como pendentes.

## Modelo de relatório para devolver ao revisor

```markdown
### Correção dos achados CRI — AAAA-MM-DD

- Branch/PR de origem:
- Commit da correção:
- Head da RC após propagação:
- Head da revisão independente:
- Decisão do flag (A ou B) e link:
- Testes executados (com resultado e ambiente isolado):
- Evidência de zero provider calls nos casos recusados:
- Evidência de concorrência/quota:
- Reviews reaprovados:
- Gates operacionais ainda abertos:
- Merge/deploy realizado: NÃO (salvo autorização separada)
```
