# Evidências — frente C / Spec 037

Data: 2026-10-31. Estado: PREPARACAO_G0; produto NAO_IMPLEMENTADO nesta frente.
Base exata `07755822f5dc75fe2be1d924005d30ed99f64a0b`; development de origem `9b8595d232842d401ce81bbc92c54dd543aa2829`. Branch `feat/localizacao-endereco-opcional`; PR alvo development, dependência #45.

G0 acrescenta somente os quatro documentos deste diretório; guards herdados antes da primeira publicação. Não foi selecionado/ativado provedor, chamado serviço de geocodificação, alterado schema ou executada migration. Fonte de decisões #44 em `972f9b00189bf09117883913d8c4fa63e69f4d2f`.

| Verificação | Estado deste corte |
| --- | --- |
| Guards estáticos herdados | PASS no pacote G0 |
| Implementação/testes próprios C | NAO_IMPLEMENTADO / NOT_RUN |
| Quinze gates no HEAD C | Não observado ainda neste commit; consultar run real após publicação |
| Integração real com geocodificador | NOT_RUN |
| Revisão independente / aceite humano | NÃO REALIZADOS |
| Subagentes nativos G0 | NATIVE_SUBAGENTS_UNAVAILABLE |

Recibo de publicação registra SHA e PR sem autorreferência. Acrescentar resultados reais por SHA/run/tentativa e preservar este histórico. Mock de rede pode provar tratamento das respostas, não disponibilidade/limites de serviço real. Nenhum PASS herdado certifica UI-07.

## Implementação posterior ao G0 — checkpoint de publicação

Commits próprios:
- `391bf2e900756fd94b2e922a7bb310a464bc93eb`: estado assíncrono revisional, formulário, endpoint opt-in autenticado, testes unitários/de integração.
- `a4b523fc60687fb6a1a94827a7fb0ee0c5d1ca40`: E2E sintético de dispositivo/mapa/digitação, fallback 429, proteção de edição manual e screenshots planejados.

**Escopo observado:** somente UI/formulário C, adaptador de endereço, novo endpoint C, testes próprios e documentação da spec 037. Guards herdados; nenhuma alteração de schema, migration, contrato compartilhado, CI/Preview, main/development ou outras branches. Contrato de CEP ainda não atribuído (proposta publicada no comentário #6547701906 da #45). Provedor externo não configurado/ativado nesta entrega.

| Verificação | Resultado observado até este checkpoint | Proveniência |
| --- | --- | --- |
| Branch/PR/merge-base | PASS; HEAD G0 e guard SHA conferidos | GitHub PR #48, comparação `GUARD_SHA...a4b523fc` |
| Baseline G0, quinze gates | PASS no SHA **e1ec632**, run [41216197678](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/41216197678), tentativa 1 | Actions completed/success, job validate success |
| Testes novos no HEAD C | PUBLICADOS; resultado runtime ainda NOT_RUN neste checkpoint | GitHub diff dos commits acima |
| Provedor externo real | NOT_RUN; desabilitado por padrão | Sem chamada de rede externa/contratação |
| E2E/capturas de runtime | NOT_RUN neste checkpoint; cenários e paths no teste | Aguardar execução dos checks do HEAD funcional |
| Persistência de CEP | BLOQUEADA por ownership compartilhado; NÃO IMPLEMENTADA | Campo nullable no schema, recusa explícita no parser atual |
| Aceite humano/revisão independente | NÃO REALIZADOS | Não simular agentes ou validação humana |

Não confundir screenshots geradas por execução de Playwright futura com imagens de referência fornecidas pelo usuário; não alegar captura física ou comparação Lovable executada. A evidência final deve indicar run/tentativa/artefato real.

## Checkpoint de revisão do harness e dos testes (31/10/2026)

- `d65d55b02ae0b2ee47a03cd91b9d533d81513158`: nomes de screenshots adequados ao glob de artefatos existente, sem editar CI.
- `0b94749376ddb843673638a3dc33220d27872f82`: separação `route.ts`/handler puro para teste Node; correção de limpeza de área E2E com prefixo reservado (`AREA_FIXTURES.prefix`).
- `942a3b5c19d54b0d51771a102a91b55573ab664b`: teste de timeout com `AbortSignal` e timer sintético (5 ms), regressão de respostas obsoletas, teste de contrato que prova 0/1/2 campos opcionais já permitidos e prova explicitamente a recusa atual do CEP até writer coordenado.

Os runs de commits intermediários foram cancelados por `concurrency.cancel-in-progress`, não são falhas funcionais ou validação terminal. O run correspondente ao commit de documentação final deverá ser identificado no recibo da PR (sem inventar SHA futuro). Os quince gates e provas visuais ainda não podem ser declarados PASS neste arquivo até evidência terminal vinculada ao commit executado.
