# Guia cirúrgico de correção e revisão final da RC CRI

Destinatário principal: desenvolvedor responsável pelas correções, com apoio de
IA. Branch candidata: `release/cri-rc-20261010`. Origem funcional da correção de
capas: `review/016-area-covers`.

Este guia transforma o parecer de 2026-10-17 em um procedimento reproduzível.
Seu objetivo é corrigir `CRI-REV-005`, repetir a análise com profundidade
equivalente ou maior e somente então solicitar as aprovações humanas.

## Regras obrigatórias

- Não trabalhar sobre checkout com alterações de outra pessoa.
- Não descartar, fazer stash, reset, rebase ou force-push sobre trabalho alheio.
- Não corrigir somente na RC: preservar a origem e a cadeia
  `#4 → #5 → #6 → #7`.
- Não usar squash, cherry-pick ou reescrita; usar merge commits na propagação.
- Não tratar CI verde como prova suficiente de contrato, segurança ou aceite.
- Não alterar asserts, guards, timeouts ou schemas apenas para obter verde.
- Não executar teste, seed, migration, cleanup ou harness contra produção.
- Não registrar segredos, URLs assinadas, connection strings, PII ou artefatos
  privados no Git ou em comentários.
- Não aprovar a própria mudança. Review, homologação e GO produtivo são atos
  humanos distintos.

## Fase 0 — congelar o ponto de partida

Use worktree/clone isolado e registre o estado antes de editar:

```bash
git fetch --all --prune --tags
git status --short --branch
git rev-parse origin/development origin/main \
  origin/review/016-area-covers \
  origin/review/cri-audit-20261010 \
  origin/release/cri-rc-20261010 \
  origin/review/cri-rc-validation-20261012
git log --reverse --topo-order --format='%H %P %an %s' \
  f351373ab19eab7d4331d5d72d988f34a621e337..origin/release/cri-rc-20261010
```

Registre no handoff: UTC, sistema, Node, PostgreSQL quando aplicável, branch,
HEAD e árvore suja/limpa. Se algum ref avançar durante o trabalho, interrompa a
publicação, faça novo fetch e reavalie ancestralidade/diff; não force o ref.

## Fase 1 — corrigir CRI-REV-005 na origem

### 1.1 Atualizar a especificação antes da implementação

Na branch `review/016-area-covers`, registrar a correção na Spec 016 e nas tarefas
antes do commit de implementação, preservando o histórico RED/GREEN.

Arquivos mínimos a reconciliar:

- `specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml`;
- `specs/003-area-registration-and-viewing/data-model.md`;
- `specs/016-area-covers/contracts/images.md`;
- `specs/016-area-covers/plan.md` e `tasks.md`, se usados para rastrear a execução;
- `tests/unit/area-openapi-contract.test.ts`;
- teste de contrato adicional, caso a validação real fique mais clara em
  `tests/contract/`.

### 1.2 Forma esperada do contrato

Estrutura recomendada no OpenAPI:

```yaml
AreaCoverSummary:
  type: object
  additionalProperties: false
  required: [revision, hasImage, featureEnabled]
  properties:
    revision:
      type: integer
      minimum: 0
    hasImage:
      type: boolean
    featureEnabled:
      type: boolean

AreaSummary:
  type: object
  additionalProperties: false
  required:
    - id
    - name
    - latitude
    - longitude
    - municipality
    - state
    - cover
  properties:
    # propriedades existentes preservadas
    cover:
      $ref: '#/components/schemas/AreaCoverSummary'
```

A obrigatoriedade de `cover` reflete o comportamento atual de
`AreasService.list()`, que sempre inclui a relação. Se a equipe optar por campo
opcional, essa escolha deve ser justificada e testada; não deixar implementação
e contrato com opcionalidades diferentes por acidente.

Atualize `AreaListResponse.examples` com `revision`, `hasImage` e
`featureEnabled`. Não inclua `assetId`, public ID, URL, parâmetros assinados ou
detalhes da configuração.

### 1.3 Teste de paridade obrigatório

O teste precisa validar uma saída produzida pelo código, não uma cópia manual que
possa repetir o mesmo erro da documentação.

Use `Ajv2020` e `ajv-formats`, já existentes no projeto, para compilar
`AreaListResponse`. Gere o corpo por `AreasService.list()` com adapter controlado
ou por `serializeAreaSummary()` com fixture tipada e contexto real do contrato.

Casos mínimos:

| Caso | Resultado esperado |
|---|---|
| feature ligada, ativo existente | `featureEnabled=true`, `hasImage=true`, schema válido |
| feature desligada, ativo existente | `featureEnabled=false`, `hasImage=true`, schema válido |
| sem ativo | revisão coerente, `hasImage=false`, schema válido |
| `assetId` ou URL injetado | não aparece no serializer; objeto adicional é recusado pelo schema |
| propriedade desconhecida | Ajv recusa por `additionalProperties=false` |
| exemplo publicado no YAML | passa no mesmo schema |

Também preserve o teste que confirma `include.cover` no Prisma e a ausência do
identificador privado na serialização.

### 1.4 RED/GREEN esperado

Antes da alteração do YAML, o novo teste deve falhar demonstrando que `cover` é
rejeitado pelo contrato fechado. Depois da reconciliação, o mesmo teste deve
passar sem afrouxar o schema.

Preserve nos registros:

- comando exato;
- SHA/estado anterior;
- mensagem do Ajv no RED;
- SHA da correção;
- resultado GREEN;
- ausência de alteração funcional não planejada.

## Fase 2 — repetir a análise criteriosa completa

Não limitar a revisão a `CRI-REV-005`. A propriedade nova foi encontrada seguindo
um campo transversalmente; repetir o mesmo método para cada arquivo/campo tocado.

### 2.1 Revisar a topologia Git

```bash
git rev-list --left-right --count \
  origin/release/cri-rc-20261010...origin/review/cri-rc-validation-20261012
git merge-base --is-ancestor \
  origin/release/cri-rc-20261010 \
  origin/review/cri-rc-validation-20261012
git diff --check origin/development...origin/release/cri-rc-20261010
```

Depois de cada propagação, confirme:

- pais e merge commits esperados;
- nenhuma duplicação de commit;
- nenhuma alteração acidental em lockfile, migration, env, workflow ou deploy;
- branch seguinte mostra somente sua etapa quando comparada à base correta.

Não revisar todos os PRs simultaneamente contra `main`. Revisar os diffs da
corrente: #1 contra `development`, #2 contra #1, e assim sucessivamente.

### 2.2 Rastrear cada campo de ponta a ponta

Para cada nome adicionado ou alterado, usar `git grep` ou `rg` e preencher uma
matriz:

| Camada | Pergunta obrigatória |
|---|---|
| Tipo público | o campo e sua opcionalidade estão corretos? |
| Serializer | quando aparece, qual default e quais campos privados são removidos? |
| Serviço | a relação necessária sempre é carregada? configuração é lida no limite correto? |
| Handler/rota | status, headers, cache e erros continuam corretos? |
| UI | todos os estados ligado/desligado/ausente/falha/retry são tratados? |
| OpenAPI/contrato | schema fechado e exemplos correspondem à saída real? |
| Modelo/spec | intenção e limites estão registrados sem promover inferência? |
| Testes | existe prova de paridade e cenário negativo, ou somente assert parcial? |
| Runbook | operação e fallback refletem o comportamento real? |

Exemplo de busca:

```bash
git grep -n -E 'featureEnabled|canEdit|hasImage|revision|assetId' -- \
  src tests specs docs
```

Repetir para nomes de erros, chaves idempotentes, quotas, retry, jobs e estados.

### 2.3 Revisar fronteiras de autorização e disponibilidade

Confirmar por código e teste:

- sessão ausente, conta inativa/bloqueada e vínculo revogado;
- usuário externo, laboratório errado e laboratório inativo;
- `MEMBER` lê quando autorizado, mas não muta;
- `OWNER/ADMIN` não recebem bypass global;
- autorização é repetida após operação externa;
- flag desligada bloqueia todas as rotas definidas pela política A;
- metadados/fallback preservados sem solicitar conteúdo;
- respostas não expõem motivo interno, segredo ou identificador do provider.

### 2.4 Revisar I/O externo, concorrência e transações

Marcar explicitamente os intervalos com transação aberta. Nenhuma chamada ao
Cloudinary deve ocorrer dentro deles.

Rever:

- stale e quotas recusados antes do provider;
- reautorização/revisão/quotas repetidas após a rede;
- replay igual converge; replay incompatível falha;
- falha do preset não deixa tentativa/job órfão;
- retry reconhece somente formas comprovadas de conflito;
- teto de retry evita laço infinito;
- retry de commit não repete preset/ticket;
- tentativa e quatro jobs são atômicos;
- cleanup nunca remove ativo corrente ou alheio.

Executar cenários concorrentes reais em PostgreSQL isolado; mock unitário sozinho
não prova `40001`, `40P01` ou comportamento do adapter.

### 2.5 Revisar contratos e migrations

Para cada DTO de resposta:

1. obter uma saída real do serializer/handler;
2. validar contra OpenAPI com referências resolvidas;
3. validar exemplos do OpenAPI;
4. testar rejeição de propriedades extras;
5. conferir que tipos TypeScript e documentação têm a mesma nulabilidade e
   opcionalidade.

Para schema/migrations:

- confirmar que somente migrations novas esperadas foram acrescentadas;
- comparar checksums das históricas;
- executar bootstrap do zero e upgrade em banco sintético compatível;
- conferir FKs, índices, locks e comportamento de exclusão;
- não usar `migrate dev`, `db push`, reset ou baseline artificial no banco real.

### 2.6 Revisar testes como evidência, não como contagem

Para cada teste, responder:

- ele passa pelo código real ou repete manualmente o objeto esperado?
- a asserção detectaria o defeito descrito?
- existe cenário negativo e concorrente?
- fixtures/fakes preservam as mesmas fronteiras do provider/banco?
- rerun verde está ocultando falha intermitente sem causa?

Preservar FAILs históricos. Rerun verde no mesmo SHA pode demonstrar
intermitência, mas não sua correção.

### 2.7 Revisar documentação e evidências

Conferir que:

- SHA, branch, data, ambiente e resultado pertencem à mesma execução;
- números de testes não somam subconjuntos repetidos;
- “implementado”, “validado”, “publicado”, “aprovado”, “integrado” e “homologado”
  permanecem estados distintos;
- texto histórico não é reescrito para apagar uma falha;
- política A tem origem identificada, sem transformar implementação em decisão;
- IHFR continua explicitamente experimental e sem validação científica.

### 2.8 Revisar o estado remoto no final

No GitHub, conferir para cada PR:

- base/head e SHA atual;
- `Files changed` da etapa;
- checks do HEAD, não de SHA anterior;
- reviews e threads não resolvidas;
- `CHANGES_REQUESTED` ainda vigente;
- aprovador independente do autor.

`mergeable=true` não é aprovação. Comentário, resposta, reação ou CI verde não
substitui `Review changes → Approve → Submit review`.

## Fase 3 — executar a validação proporcional

Após instalar dependências de forma limpa e gerar o Prisma Client, executar no
ambiente isolado pertinente:

```bash
npm ci
npx prisma generate
npm run typecheck
npm run lint
npm run test:unit
npm run test:contract
npm run build
```

Adicionar os testes focais do contrato de áreas e das capas. Quando PostgreSQL
isolado e marcado estiver disponível, executar integração, migrations, bootstrap,
auditoria de schema e concorrência. Executar E2E da superfície alterada; ampliar
para a regressão integral se o diff atravessar contratos compartilhados, auth,
schema, dependências ou configuração.

O CI final deve pertencer a cada novo HEAD publicado. Registrar versões do runner
e limitações; não atribuir ao commit novo o SUCCESS do pai.

## Fase 4 — propagar sem romper a cadeia

Ordem recomendada:

1. implementar e validar na `review/016-area-covers`;
2. criar merge commit dessa branch em `review/cri-audit-20261010`;
3. criar merge commit da auditoria em `release/cri-rc-20261010`;
4. sincronizar `review/cri-rc-validation-20261012` com a RC final, mantendo os
   commits independentes de revisão;
5. conferir ancestralidade, diff e CI de #4, #5, #6 e #7;
6. solicitar re-review nos HEADs finais.

Esta publicação documental também avança a RC. Portanto, o PR 7 deve incorporar
o commit documental deste guia antes do parecer final.

Se qualquer branch remota tiver avançado, não sobrescrever. Reavaliar a nova
árvore, resolver conflitos semanticamente e repetir os testes afetados.

## Fase 5 — pacote de handoff obrigatório

Publicar um registro curto e verificável com:

- tabela `achado → causa → correção → teste → SHA`;
- refs finais completos de #4/#5/#6/#7;
- links dos checks do HEAD;
- RED e GREEN de `CRI-REV-005`;
- diff/ancestralidade do PR 7;
- lista de threads/reviews ainda abertas;
- limitações e gates operacionais não executados.

Modelo:

```text
CRI-REV-005 corrigido em <SHA-origem> e propagado até <SHA-RC>.
Contrato, modelo, exemplo e DTO validados por Ajv contra saída do serializer.
Checks do HEAD: <links>. PR7: RC final ancestral, diff esperado <resumo>.
Análise completa repetida: <novos achados ou "nenhum bloqueio novo">.
Pendentes humanos: <reviews/threads>. Sem merge em development/main ou deploy.
```

## Checklist de pronto para solicitar aprovação

- [ ] `CRI-REV-005` possui RED reproduzível e GREEN no mesmo cenário.
- [ ] OpenAPI, exemplos, data model, Spec 016, DTO e serializer são equivalentes.
- [ ] Nenhum identificador privado/provider aparece nos DTOs.
- [ ] Todos os campos alterados foram rastreados de ponta a ponta.
- [ ] Autorização, feature flag, replay, quotas, transações e concorrência foram
  revistos com testes negativos pertinentes.
- [ ] Migrations e contratos compartilhados foram auditados.
- [ ] Nenhum FAIL foi apagado ou reclassificado sem causa.
- [ ] #4/#5/#6/#7 têm HEADs propagados, checks verdes e refs registradas.
- [ ] A RC final é ancestral do PR 7 e o diff restante é intencional.
- [ ] Pedro reavaliou `CHANGES_REQUESTED`/thread dos PRs 4 e 6.
- [ ] Revisor independente aprovou cada etapa aplicável no SHA final.
- [ ] Nenhum merge em `development`/`main`, deploy ou operação externa foi feito
  antes da autorização correspondente.

Somente após todas as caixas técnicas e humanas aplicáveis deve-se usar o parecer
`APROVADO PARA INTEGRACAO`. Isso ainda não equivale a GO de produção.
