# Achados da revisão independente — 15/10/2026

## Identificação e conclusão

- Branch revisada: `release/cri-rc-20261010`.
- Head da revisão: `dbed6cfcb3b0d140cf26f3084e439a744a5e4542`.
- Data da inspeção: 2026-10-15, fuso America/Fortaleza.
- Escopo: prontidão para integrar a RC em `development`; nenhuma operação de
  banco, provedor, deploy ou produção foi executada.
- Parecer: **CORREÇÕES NECESSÁRIAS — NÃO INTEGRAR EM `development` ainda**.

Este documento registra problemas reproduzíveis no código e na cadeia de revisão.
Não substitui aprovação humana, homologação com Cloudinary nem autorização de
produção. O plano de solução está no
[guia de correção](guia-correcao-achados-2026-10-15.md).

## Resumo executivo

| ID | Prioridade | Natureza | Resultado esperado antes do merge |
|---|---:|---|---|
| CRI-REV-001 | P1 | Contrato/UI de capas | Estado desabilitado deve ser explícito; controles não podem parecer utilizáveis com `CLOUDINARY_IMAGE_ENABLED=0` |
| CRI-REV-002 | P2 | Quota/integração externa | Requisições inelegíveis devem ser recusadas antes de consultar a Admin API do Cloudinary |
| CRI-REV-003 | P1 | Cadeia de integração | PR 7 deve ser sincronizado com o head atual da RC e validado novamente |
| CRI-REV-004 | P1 | Aprovação | Reviews com `CHANGES_REQUESTED` precisam ser resolvidos e reaprovados |

P1, neste documento, significa bloqueio de integração. P2 é defeito relevante que
também deve ser resolvido nesta cadeia porque contradiz a proteção contra abuso
documentada e altera o custo/alcance da integração externa.

## CRI-REV-001 — rollout desabilitado não chega ao DTO nem à UI

### Classificação da evidência

EVIDENCIA_IMPLEMENTACAO:

- `src/app/api/server/images/cloudinary.ts`, função `cloudinarySettings`, recusa o
  provedor quando `CLOUDINARY_IMAGE_ENABLED` não é exatamente `1` ou quando falta
  configuração válida.
- `src/app/api/server/images/service.ts`, método `detail`, calcula `canEdit` apenas
  pela autorização contextual e pelo estado de leitura do laboratório. A função
  `project` devolve somente `image` e `canEdit`.
- `src/app/api/server/images/contracts.ts` não possui campo de disponibilidade do
  recurso no `CoverDto`.
- `src/components/areas/area-cover.tsx`, componente `AreaCoverEditor`, apresenta os
  controles de seleção/envio sempre que `canEdit` é verdadeiro.
- O [runbook de atualização](production-update-runbook.md) permite rollout parcial
  explícito com `CLOUDINARY_IMAGE_ENABLED=0`, enquanto o
  [runbook de capas](../../operations/area-covers-runbook.md) afirma que metadados e
  APIs de áreas permanecem disponíveis e que envio/conteúdo do provedor recusam.

INFERENCIA verificada pelo fluxo: um OWNER/ADMIN autorizado pode receber
`canEdit: true` e ver controles ativos quando o recurso está desabilitado. A ação
de envio alcança `configuredCoverProvider()` e termina como indisponibilidade
sanitizada. Se já existir uma capa persistida, a consulta de metadados pode indicar
`hasImage: true`, mas a rota de conteúdo também depende do provedor desabilitado.

### Como reproduzir

1. Usar ambiente isolado, sem credenciais reais, com
   `CLOUDINARY_IMAGE_ENABLED=0`.
2. Entrar como OWNER ou ADMIN contextual de um laboratório ativo.
3. Abrir o detalhe de uma área.
4. Observar que o DTO ainda permite edição e a interface oferece seleção/envio.
5. Tentar iniciar o upload; a resposta é indisponibilidade, embora a interface
   não tenha indicado que a funcionalidade estava desligada.
6. Repetir com uma fixture de `AreaCover` que possua asset e observar que o
   metadado anuncia imagem, mas o conteúdo não pode ser resolvido nesse modo.

Não usar uma área ou um Cloudinary reais para reproduzir este defeito.

### Impacto

- quebra o contrato operacional do rollout parcial já documentado;
- apresenta uma ação impossível como disponível;
- transforma uma configuração intencional em erro genérico para o usuário;
- dificulta distinguir indisponibilidade configurada de falha real do provedor;
- pode gerar tentativas e alertas evitáveis durante uma implantação parcial.

### Comportamento requerido

RECOMENDACAO:

- modelar separadamente autorização (`canEdit`) e disponibilidade do recurso;
- expor no DTO somente um estado seguro, como `featureEnabled`, sem nomes de cloud,
  chaves, secrets, preset, hash ou qualquer detalhe de configuração;
- esconder ou desabilitar upload/remoção quando a funcionalidade estiver desligada,
  com mensagem clara e não alarmista;
- definir explicitamente o comportamento de leitura para capas existentes durante
  um rollout desabilitado: fallback controlado ou leitura autorizada por capacidade
  separada. Não inferir silenciosamente uma dessas políticas;
- preservar `canEdit` como regra de autorização. O flag não pode conceder acesso.

PENDENCIA_DE_DECISAO: o produto precisa escolher se `CLOUDINARY_IMAGE_ENABLED=0`
desabilita somente mutações ou também leitura de conteúdo já existente. A correção
não deve inventar essa política sem registrá-la na Spec 016 e nos contratos.

### Critérios de aceite

- [ ] DTO diferencia permissão e disponibilidade, sem expor segredo/configuração.
- [ ] OWNER/ADMIN não recebe controles operáveis quando o recurso está desligado.
- [ ] MEMBER continua sem mutação, independentemente do flag.
- [ ] Ausência de capa e capa indisponível têm estados visuais distintos.
- [ ] A política para capa existente com flag desligado está documentada e testada.
- [ ] Testes de contrato/componente cobrem flag `0`, ausente, inválido e `1` válido.
- [ ] Testes negativos demonstram que o flag não contorna autorização contextual.

## CRI-REV-002 — quota é verificada depois da chamada externa ao provedor

### Classificação da evidência

EVIDENCIA_IMPLEMENTACAO: em `AreaCoverService.initiate`, o fluxo atual é:

1. autoriza em uma transação;
2. instancia o provedor e executa `await p.preset()`;
3. somente na transação seguinte verifica replay, expiração, revisão da capa,
   quantidade de tentativas ativas e quota horária;
4. cria a tentativa elegível e devolve o ticket.

`CloudinaryCoverProvider.preset()` consulta a Admin API com timeout de 20 segundos.
Assim, revisão obsoleta, replay incompatível e usuário já limitado ainda consomem
uma consulta externa antes da recusa. A fixture `FakeCoverProvider` não conta
chamadas a `preset()`, então os testes atuais comprovam o resultado da quota, mas
não comprovam que a quota protege a integração externa.

### Como reproduzir

1. Em teste de integração, adicionar um contador de chamadas a `preset()` na
   `FakeCoverProvider`.
2. Criar três tentativas vigentes para o mesmo usuário.
3. Fazer uma quarta chamada a `initiate` e confirmar `RATE_LIMITED`.
4. Comparar o contador antes/depois: no código atual ele aumenta, apesar da recusa.
5. Repetir com `expectedRevision` obsoleta e com chave de replay incompatível.

### Impacto

- as quotas `3 ativas / 10 por hora` não limitam chamadas à Admin API;
- um cliente autorizado, defeituoso ou comprometido pode multiplicar latência,
  consumo de API e custo antes de atingir qualquer upload;
- indisponibilidade do provedor pode mascarar o erro local correto (`RATE_LIMITED`
  ou `STALE_REVISION`);
- a documentação atual descreve proteção contra abuso mais ampla do que a
  implementação realmente oferece.

### Comportamento requerido

RECOMENDACAO: usar preflight transacional antes de I/O externo, sem abrir transação
durante a chamada ao Cloudinary:

1. primeira transação serializável: reautorizar, validar área, replay/revisão e
   quotas; devolver somente os dados mínimos necessários;
2. somente se elegível, consultar e validar o preset no provedor;
3. segunda transação serializável: reautorizar e repetir replay/revisão/quotas antes
   de criar a tentativa, pois o estado pode ter mudado durante o I/O;
4. manter idempotência determinística para a mesma chave e impedir que concorrência
   ultrapasse os limites;
5. não manter lock/transação de banco aberto durante rede externa.

Uma simples movimentação de `p.preset()` para depois da transação atual não basta
se permitir corrida entre preflight e criação. A segunda validação é obrigatória.

### Critérios de aceite

- [ ] Pedido já limitado não chama `preset()` nem emite ticket.
- [ ] Revisão obsoleta e replay incompatível são recusados sem I/O externo.
- [ ] Mesma chave válida continua idempotente e tem resultado determinístico.
- [ ] Corridas simultâneas não ultrapassam três tentativas vigentes.
- [ ] A segunda transação recusa mudança de revisão/role/laboratório ocorrida
  durante a consulta externa.
- [ ] Falha de preset não cria tentativa nem jobs órfãos.
- [ ] Testes contam chamadas ao fake provider e cobrem sucesso, replay, stale,
  quota ativa, quota horária, revogação e concorrência.

## CRI-REV-003 — PR 7 está atrás do candidato que deve revisar

EVIDENCIA_GIT na inspeção de 2026-10-15:

- RC atual: `release/cri-rc-20261010` em `dbed6cf`;
- revisão independente: PR 7, `review/cri-rc-validation-20261012`, em `59baff4`;
- o PR 7 não contém os quatro commits posteriores da RC: `bc283ad`, `981eb9d`,
  `e0358df` e `dbed6cf`.

O check aprovado no head antigo não valida esses quatro commits. O PR 7 deve ser
sincronizado a partir do head atual da RC e o check deve rodar novamente no novo
SHA. Preservar a independência da revisão: não integrar PR 7 dentro da RC apenas
para eliminar a diferença e não duplicar/cherry-pick o commit `99d8363`, que já
pertence à cadeia consolidada.

### Critérios de aceite

- [ ] PR 7 contém o head atual da RC como ancestral.
- [ ] O diff restante do PR 7 continua restrito às evidências/revisão pretendidas.
- [ ] Checks foram executados no novo head, não reaproveitados do SHA antigo.
- [ ] Revisor independente registrou o novo parecer.

## CRI-REV-004 — reviews pendentes impedem declarar prontidão

EVIDENCIA_GITHUB na inspeção de 2026-10-15: os PRs 4 e 6 mantinham review ativo com
`CHANGES_REQUESTED`. Checks verdes e testes automatizados não anulam esse estado.
Após corrigir CRI-REV-001/002 na branch de origem adequada e propagar pela pilha,
os comentários devem ser resolvidos por quem os abriu e os PRs afetados precisam
de nova aprovação no SHA efetivamente integrado.

### Critérios de aceite

- [ ] Achados possuem commit/PR rastreável e testes correspondentes.
- [ ] Correções foram propagadas pela cadeia na ordem do guia de integração.
- [ ] Não há review obrigatório pendente ou `CHANGES_REQUESTED` ativo.
- [ ] O SHA aprovado é o mesmo candidato proposto para `development`.

## O que não é bloqueio automático do merge em `development`

Os itens abaixo continuam obrigatórios para o alcance correspondente, mas não são
automaticamente defeitos de código da integração se `development` não provocar
deploy nem ativação do recurso:

- smoke com Cloudinary real, créditos, cleanup contínuo e operador designado;
- Gate B de e-mail e aceite humano de exclusão de conta;
- backup/restore, janela, migrations remotas e autorização de produção;
- validação científica do IHFR.

Eles bloqueiam ativação, homologação ou produção conforme os runbooks. Antes do
merge, confirmar se `development` dispara deploy automático; se disparar, os gates
operacionais aplicáveis voltam a ser pré-condição do merge.

## Evidências e arquivos examinados

- `src/app/api/server/images/contracts.ts`
- `src/app/api/server/images/service.ts`
- `src/app/api/server/images/cloudinary.ts`
- `src/components/areas/area-cover.tsx`
- `tests/fixtures/area-cover-provider.ts`
- `tests/integration/area-covers.test.ts`
- `docs/operations/area-covers-runbook.md`
- `docs/releases/2026-10-10-cri-rc/production-update-runbook.md`
- cadeia Git e estados de review dos PRs 4, 6 e 7 no snapshot acima
