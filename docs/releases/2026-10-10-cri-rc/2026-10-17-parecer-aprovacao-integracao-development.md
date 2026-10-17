# Parecer de aprovação da RC CRI para `development`

Data do parecer: 17/10/2026, America/Fortaleza.

Branch avaliada: `release/cri-rc-20261010`.

SHA funcional aprovado: `0f669b79a5e73a329832593229c2557d8b12bbce`.

Destino autorizado: `development`.

Classificação: `DECISAO_CONFIRMADA` para a aprovação expressa do mantenedor
solicitante nesta tarefa; `EVIDENCIA_IMPLEMENTACAO` para fatos observados em Git,
código, contratos, testes e GitHub; `PARECER_TECNICO_ASSISTIDO_POR_IA` para a
análise que subsidiou a decisão humana. Este registro não apresenta o executor de
IA como revisor humano e não substitui eventos `APPROVED` exigidos pela proteção
de branch do GitHub.

## Decisão

**APROVADO PARA INTEGRAÇÃO EM `development`.**

O mantenedor solicitante declarou expressamente sua aprovação após receber a
análise técnica das correções e autorizou a integração da branch acima em
`development`. A autorização é restrita ao candidato e ao destino identificados
neste documento.

A decisão não autoriza merge de `development` em `main`, deploy, migration em
banco hospedado, escrita em dados reais, alteração de infraestrutura, ativação de
Cloudinary, uso de credenciais ou promoção para produção.

## Escopo revisado

O parecer abrange a pilha cumulativa presente no SHA aprovado, incluindo:

- runners e checksums locais da Spec 014;
- rascunhos ambientais pessoais da Spec 015;
- capas privadas de áreas da Spec 016;
- correções de disponibilidade, autorização e existência da capa;
- preflight, revalidação pós-rede, idempotência, quotas e retry transacional;
- reconciliação entre serializer, OpenAPI e modelo documental de `AreaSummary`;
- correção dos seletores E2E do IHFR sem alteração do contrato científico;
- documentação, runbooks e evidências acumuladas na release.

Não faz parte desta aprovação a diferença exclusivamente documental do PR 7 que
permanece após a RC como branch própria de revisão independente.

## Conclusão dos achados

| Identificador | Conclusão no SHA aprovado |
|---|---|
| `CRI-REV-001` | Resolvido: disponibilidade, autorização e existência da capa possuem estados distintos e coerentes |
| `CRI-REV-002` | Resolvido: recusas locais precedem a rede e o contexto mutável é revalidado antes da persistência |
| `CRI-REV-003` | Resolvido tecnicamente: a RC é ancestral da branch de validação e seu diff adicional é documental |
| `CRI-REV-004` | Aprovação humana do mantenedor registrada neste documento; eventos antigos do GitHub permanecem históricos até tratamento pelos respectivos revisores |
| `CRI-REV-005` | Resolvido: contrato OpenAPI, exemplo, modelo, serializer e teste Ajv apresentam a mesma resposta |

Não foi encontrado defeito funcional novo de severidade P1 ou P2 que justificasse
manter o bloqueio da integração em `development`.

## Evidências consideradas

- pipeline do GitHub no SHA exato da release concluído com sucesso, incluindo os
  15 gates documentados, 72 testes E2E e 6 testes IHFR;
- typecheck sem erros;
- lint sem erros e com três avisos preexistentes;
- teste de paridade entre serializer e OpenAPI usando Ajv;
- testes do retry e dos conflitos transacionais reconhecidos;
- conferência de ancestralidade entre as branches da cadeia;
- inspeção de segredos nos artefatos novos sem credencial exposta identificada;
- comparação da árvore integrada com a árvore da release, sem alteração de
  conteúdo durante o merge.

Referências detalhadas:

- [análise pós-correções](2026-10-17-analise-pos-correcoes-thalles.md);
- [guia de correção e revisão final](2026-10-17-guia-correcao-e-revisao-final.md);
- [evidências de CRI-REV-005](../../../specs/016-area-covers/cri-rev-005-evidence.md);
- [prontidão das correções anteriores](cri-rev-readiness-20261015.md);
- [checklist da release](review-checklist.md).

## Registro Git posterior à análise

Antes da publicação deste parecer, o SHA funcional aprovado foi integrado em
`development` pelo merge commit
`118a3a8b6e0f38a3e1085aad9f43e3be7f3eabed`, com pais
`beba96fbf6bbaac8771dbb29abea2f9f8f5b0054` e
`0f669b79a5e73a329832593229c2557d8b12bbce`. Não houve conflito e a árvore do
merge ficou idêntica à árvore funcional aprovada. `main` permaneceu em
`beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`.

Esse merge ocorreu antes da criação do presente registro. Por determinação do
mantenedor, este parecer é publicado primeiro na release. Seu commit documental
deverá ser integrado posteriormente em `development`, sem promover
`development` para `main`.

## Ressalvas não bloqueantes para `development`

- `specs/016-area-covers/cri-rev-005-evidence/red.json` contém BOM UTF-8. O
  conteúdo é recuperável e documental, mas consumidores que usam `JSON.parse`
  diretamente precisam remover o BOM. Recomenda-se normalização posterior.
- Os manifests de evidência repetidos aumentam o volume do repositório. Uma
  deduplicação futura pode reduzir manutenção, preservando rastreabilidade.
- Conflitos serializáveis extremos ainda podem esgotar o limite de três tentativas
  e retornar erro sanitizado; esse limite é intencional e está documentado.

Essas ressalvas não alteram a decisão de integração em `development`.

## Gates que continuam separados

A aprovação técnica e humana deste documento não encerra:

- Gate B de contas e validações reais de e-mail;
- aceite humano do fluxo de exclusão de conta;
- homologação em navegadores adicionais;
- configuração, privacidade, custos e cleanup no Cloudinary real;
- preflight, backup restaurável, ensaio e execução de migrations hospedadas;
- autorização de deploy e acompanhamento pós-publicação;
- validação científica do IHFR.

O IHFR permanece `CONTRATO_EXPERIMENTAL`,
`VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.

## Resultado final

Parecer: **APROVADO PARA INTEGRAÇÃO EM `development`, COM RESSALVAS
OPERACIONAIS NÃO BLOQUEANTES PARA ESSA INTEGRAÇÃO**.

Qualquer promoção posterior para `main` ou produção exige autorização própria e
nova conferência do estado efetivo das branches, checks, dados e infraestrutura.
