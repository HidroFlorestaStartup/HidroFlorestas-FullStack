# Análise pós-correções de Thalles — RC CRI

Data da análise: 2026-10-17. Branch analisada:
`release/cri-rc-20261010`. HEAD analisado:
`c629e749692ec54ad27b223dc344b86749b73485`.

Classificação: `EVIDENCIA_IMPLEMENTACAO` para fatos observados no código, Git,
testes e GitHub; `RECOMENDACAO` para ações propostas. Este documento não aprova
PR, não autoriza merge, deploy, migration remota nem operação em provedor.

## Parecer executivo

As correções de Thalles para `CRI-REV-001` e `CRI-REV-002` atendem aos defeitos
originais. A disponibilidade da feature de capas está separada da autorização e
da existência da imagem; as recusas anteriores à chamada externa, a revalidação
após a rede e o retry restrito de conflitos de commit foram implementados e
cobertos por testes.

O candidato ainda **não está pronto para merge em `development`**. A revisão
independente encontrou uma divergência nova entre a resposta real da listagem de
áreas e seu contrato OpenAPI fechado. O achado é identificado neste documento
como `CRI-REV-005` e deve ser corrigido antes da aprovação final. Também continuam
pendentes a sincronização do PR 7 com o HEAD atual da RC e as aprovações humanas.

## Escopo e método

A revisão examinou:

- os 16 commits posteriores ao relatório independente
  `f351373ab19eab7d4331d5d72d988f34a621e337`;
- os commits funcionais `d93124e21974c0e571ad30f28fd04010a399e757`
  e `247fe5e1b1a1864968e0c1118c651c95e288bd0b`;
- o caminho completo DTO → serializer → serviço → interface → contrato → testes;
- as evidências RED/GREEN da Spec 016 e os registros da RC;
- ancestralidade e estado dos PRs 1 a 7;
- checks do GitHub associados aos HEADs efetivos;
- testes locais independentes no mesmo SHA da RC, em clone isolado.

Foram preservados o checkout principal e sua alteração local preexistente. Não
houve alteração em `main`, `development`, banco hospedado, Vercel ou Cloudinary.

## Resultado dos achados anteriores

| Achado | Resultado desta revisão | Evidência essencial |
|---|---|---|
| `CRI-REV-001` — feature desligada ainda permitia comportamento incoerente | **RESOLVIDO TECNICAMENTE** | `settings.ts` centraliza disponibilidade; DTOs expõem `featureEnabled`; serviço bloqueia upload, confirmação, remoção e conteúdo; UI não solicita bytes quando desligada |
| `CRI-REV-002` — chamada ao provider antes de recusar stale/quota e rede acoplada à transação | **RESOLVIDO TECNICAMENTE** | preflight Serializable ocorre antes do provider; preset ocorre sem transação aberta; segunda transação reautoriza e revalida revisão/replay/quotas antes da persistência |
| Conflito de commit revelado pelo CI | **RESOLVIDO TECNICAMENTE** | retry limitado a três tentativas reconhece `P2034`, `P2002`, `40001`, `40P01` e formas estritas do adapter, sem repetir I/O externo |
| `CRI-REV-003` — sincronização do PR 7 | **REABERTO PELO AVANÇO DOCUMENTAL DA RC** | PR 7 permanece em `dc180cb`; RC avançou para `c629e74` |
| `CRI-REV-004` — aprovação humana | **PENDENTE** | PRs 4 e 6 ainda possuem `CHANGES_REQUESTED`; PRs 1, 2, 3, 5 e 7 não possuem `APPROVED` registrado |

### Por que CRI-REV-001 está resolvido

O estado da capa deixou de ser representado por um único booleano ambíguo:

- `featureEnabled` representa disponibilidade/configuração;
- `canEdit` representa somente autorização contextual;
- `hasImage` representa existência persistida da capa.

Com a política A, flag ausente, inválida, diferente de `1` ou configuração
incompleta mantém metadados e ponteiro, mas recusa upload, confirmação, remoção e
conteúdo. A interface aplica fallback e não requisita `/content` quando a feature
está desabilitada. Os testes cobrem matriz de flag, papéis, preservação de capa,
ausência de construção/chamada do provider e ausência de mutações na UI.

### Por que CRI-REV-002 está resolvido

O fluxo de criação de upload passou a ter fronteiras verificáveis:

1. transação curta verifica ator, contexto, replay, revisão e quotas;
2. a consulta de preset ocorre fora de transação;
3. nova transação reautoriza e repete as verificações mutáveis;
4. tentativa e quatro jobs são criados atomicamente;
5. conflitos serializáveis conhecidos são repetidos com teto, sem repetir a
   chamada externa.

Os testes exercitam stale, replay incompatível/expirado, quotas ativa/horária,
falha do preset sem órfãos, revogação/alteração de papel/laboratório/revisão
durante a rede, concorrência próxima aos limites e convergência da mesma chave.

## CRI-REV-005 — resposta real viola o contrato AreaSummary

Severidade recomendada: **P2 — bloqueia o merge do candidato até correção e
revalidação contratual**.

### Evidências

`src/types/area.type.ts` define:

```ts
cover?: {
  revision: number;
  hasImage: boolean;
  featureEnabled: boolean;
};
```

`src/app/api/server/areas/area.contracts.ts` inclui esse objeto quando a relação
`cover` está presente. `AreasService.list()` sempre consulta a relação e passa o
resultado de `coverFeatureEnabled()`. Portanto, a listagem real emite:

```json
{
  "cover": {
    "revision": 2,
    "hasImage": true,
    "featureEnabled": false
  }
}
```

Entretanto, `AreaSummary` em
`specs/003-area-registration-and-viewing/contracts/area-registration-api.openapi.yaml`
possui `additionalProperties: false` e declara apenas `id`, `name`, coordenadas,
`municipality` e `state`. O campo `cover` não está declarado.

O bloco `AreaSummaryDto` em
`specs/003-area-registration-and-viewing/data-model.md` também não contém `cover`.
O exemplo de `AreaListResponse` não apresenta os metadados da capa. Já o contrato
focal da Spec 016 documenta `featureEnabled` no recurso de imagem, mas não registra
explicitamente a extensão da listagem da Spec 003.

### Por que o CI não detectou

`tests/unit/area-openapi-contract.test.ts` confirma referências locais, DTOs
fechados, ausência de alguns campos proibidos e presença de exemplos. Ele não
valida uma resposta produzida pelo serializer/serviço contra o schema OpenAPI.

Assim, o teste aceita simultaneamente:

- um schema fechado sem `cover`; e
- um serializer que retorna `cover`.

Esse é um falso verde de cobertura contratual, não uma falha do runner.

### Impacto

- validadores OpenAPI devem rejeitar a resposta real por propriedade adicional;
- clientes gerados pelo contrato desconhecem `cover.featureEnabled`;
- a documentação da listagem diverge do comportamento consumido pela UI;
- mudanças futuras podem continuar ampliando DTOs sem serem detectadas pelo CI.

Nenhum `assetId`, URL do provider ou segredo foi observado na projeção pública;
o problema é de consistência contratual e prevenção de regressão, não vazamento
identificado.

### Correção exigida

1. Em `area-registration-api.openapi.yaml`, criar um schema fechado para o resumo
   da capa com `revision`, `hasImage` e `featureEnabled`.
2. Acrescentar `cover` a `AreaSummary`. Como `AreasService.list()` sempre inclui a
   relação, a recomendação é torná-lo obrigatório na resposta da listagem.
3. Atualizar o exemplo de `AreaListResponse` para mostrar os três campos.
4. Atualizar `specs/003-area-registration-and-viewing/data-model.md` e esclarecer
   que o DTO não expõe bytes, URL, `assetId` ou configuração secreta do provider.
5. Atualizar `specs/016-area-covers/contracts/images.md` para registrar que a
   listagem de áreas expõe somente esse resumo sanitizado.
6. Acrescentar teste que valide a resposta produzida pelo serializer/serviço com
   Ajv 2020 contra `AreaListResponse`, não apenas a estrutura estática do YAML.
7. Testar feature ligada e desligada, área com e sem ativo, rejeição de campo
   inesperado e ausência de `assetId`/URL.

Não remover silenciosamente `cover` da resposta: a interface usa esses metadados.
Se a equipe preferir omitir o resumo, isso exige decisão explícita, adaptação da
UI e testes correspondentes.

### Critério de aceite de CRI-REV-005

- [ ] OpenAPI, modelo de dados, contrato da Spec 016 e implementação descrevem a
  mesma forma da resposta.
- [ ] O exemplo OpenAPI é válido no schema atualizado.
- [ ] Uma resposta real do serializer/serviço passa no Ajv.
- [ ] Uma resposta com campo adicional falha no Ajv.
- [ ] Os cenários `featureEnabled=true/false` passam.
- [ ] `assetId`, public ID, URL e configuração do provider não aparecem.
- [ ] Testes unitários, contrato, typecheck, lint e regressão pertinente passam no
  mesmo SHA publicado.

## Risco residual não bloqueante

O replay válido da mesma chave consulta novamente o preset durante a janela de
validade e tem precedência sobre as quotas atuais. Esse comportamento está
documentado e testado; por isso não reabre `CRI-REV-002`.

`RECOMENDACAO`: se o modelo de ameaça exigir que quotas limitem também todas as
consultas administrativas externas, avaliar throttling local ou cache curto e
seguro da verificação do preset, sem reduzir a detecção de alteração do preset.
Essa avaliação deve ser separada da correção contratual obrigatória.

## Estado GitHub observado

Snapshot consultado em 2026-10-17:

| PR | HEAD | Check | Review |
|---|---|---|---|
| #1 | `a88d846` | sem check associado observado | sem review |
| #2 | `7180209` | sem check associado observado | sem review |
| #3 | `65516f6` | SUCCESS | sem review |
| #4 | `0b154ce` | SUCCESS | `CHANGES_REQUESTED` de Pedro; thread antiga aberta e `outdated` |
| #5 | `3a51409` | SUCCESS | sem review |
| #6 | `c629e74` | SUCCESS, run `38897619440` | `CHANGES_REQUESTED` de Pedro |
| #7 | `dc180cb` | SUCCESS | sem review; ainda não contém `c629e74` |

`mergeable=true` indica apenas que o GitHub não detecta conflito mecânico naquele
momento. Não equivale a contrato correto, review aprovado ou autorização de merge.

## Validação independente do candidato

No SHA `c629e74`, a revisão independente registrou:

- instalação limpa e geração do Prisma Client: PASS;
- typecheck: PASS;
- lint: zero erros e três avisos já conhecidos;
- testes unitários: 291 Node + 17 Mail, PASS;
- testes focais de provider/transação: PASS;
- CI oficial do mesmo SHA: SUCCESS nos 15 gates, incluindo 215 integrações e
  72 E2E.

O build local padrão não pôde ser usado como prova adicional devido a restrições
do ambiente isolado para Google Fonts e porta interna do Turbopack. O build do CI
oficial no SHA exato passou. Essa limitação não foi classificada como regressão de
Thalles.

## Condição para declarar pronto para merge

O candidato só deve receber parecer `APROVADO PARA INTEGRACAO` quando:

- `CRI-REV-005` estiver corrigido e testado;
- a análise criteriosa do guia complementar não encontrar outro bloqueio aberto;
- a correção tiver sido propagada pela cadeia sem cherry-pick ou reescrita;
- o PR 7 contiver a RC final como ancestral e mantiver apenas seu diff esperado;
- checks pertencerem aos HEADs atuais;
- `CHANGES_REQUESTED` e threads pertinentes tiverem novo parecer do revisor;
- cada PR tiver aprovação humana independente no SHA efetivamente integrado.

Homologação Cloudinary real, Gate B de contas, aceite humano de exclusão,
navegadores adicionais, banco, backup, deploy e GO de produção continuam gates
separados. O IHFR permanece `CONTRATO_EXPERIMENTAL`,
`VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
