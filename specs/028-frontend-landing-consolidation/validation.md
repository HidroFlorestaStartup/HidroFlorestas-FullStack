# Validação da Spec028

## Análise prévia de consistência — 2026-10-21

Scripts reais `setup-plan.sh`, `setup-tasks.sh` e `check-prerequisites.sh --require-spec --require-tasks --include-tasks` executados com sucesso para esta feature. Checklist de requisitos completo. Sem hooks configurados em `.specify/extensions.yml`.

| Cobertura | Requisitos | Tarefas |
|---|---|---|
| Acesso, conteúdo e navegação | FR-001/002/003 | T004/005 |
| Ciência e contexto institucional | FR-004/005 | T006/007 |
| Isolamento e reflow | FR-006/007 | T008/009/012 |
| CI/Preview e entrega | FR-008 | T010/013/014/015 |
| Históricos | FR-009 | T011 |

Nenhuma contradição crítica encontrada entre spec/plano/tarefas. Aceites e verificações externas estão explicitamente pendentes, não embutidos em critérios de preparação já cumpridos.

## Resultados de execução

Em andamento. Resultados serão registrados somente após execução; este arquivo não constitui aprovação científica, humana ou operacional.

### Baseline observado antes da alteração

GET real a `/` em Next local (sem banco), HTTP 200: `mainCount: 0`, âncoras ausentes `projeto` e `solucao`. A consulta ocorreu antes de substituir a página. O teste E2E foi escrito antes da implementação, mas a execução em Chromium local ficou indisponível: os downloads oficiais dos pacotes completo e headless fixados falharam (ZIP vazio/HTTP 503). Não declarar RED/GREEN Playwright a partir dessa checagem HTTP; as capturas e os cenários de navegador dependem de CI.

### Verificações locais concluídas

- Geração do Prisma Client7.4.2: PASS; somente geração de arquivos ignorados, sem conexão ou operação de banco.
- Typecheck global: PASS após corrigir uso do callback `page.evaluate(waitForMissionRender)` no novo teste. A primeira execução detectou esse erro de chamada; não foi alterado o helper.
- ESLint da página e do novo E2E: PASS.
- Checagem de whitespace: a declaração inicial `git diff --check: PASS` não cobria a árvore completa publicada. A revisão Codex do HEAD `aac59e6e6b2c60ad7b2ff7b4ca4fb5200698507e` encontrou três linhas com espaços finais em `spec.md` ao comparar com `development@1ea3cc2`. As linhas foram corrigidas; o comando completo `git diff --check 1ea3cc2552c244e1004f4f733f838e0f9ea62993` passou na árvore corrigida, sem alterar configuração ou ignorar arquivos. A comparação base–HEAD é repetida após o commit; seu recibo será publicado na PR.
- YAML/JSON interpretados: ambas as branches novas estão nos dois allowlists do CI e com Preview explicitamente falso; upload permanece restrito às famílias PNG/JSON das frentes.
- GET real da aplicação depois da alteração: HTTP200, exatamente um main, zero âncoras sem destino, quatro qualificações presentes e links `/login`/`/register`. Não equivale a E2E de navegador.
- Revisão estática independente por agente: sem outro P1/P2 de produto identificado. Lacuna de enquadramento das qualificações corrigida: teste agora rola cada item, exige viewport completa e captura início/fim do quadro.
- Checklist React aplicado: Server Component sem novo estado/fetch público, imports estáticos, imagens locais, CSS isolado, links nomeados e sem nova biblioteca.

CI oficial, capturas/inspeção, revisão Codex externa, aceite institucional/manual e homologação operacional permanecem pendentes no momento deste commit. Resultados posteriores serão recibos na PR do SHA publicado, sem transplantar verde de um ancestral.

### Inspeção da primeira execução publicada e ajuste de reflow

O run `39578752552`, attempt1, HEAD `aac59e6e6b2c60ad7b2ff7b4ca4fb5200698507e`, foi cancelado pela publicação da correção documental. Seu artefato `12335938075` foi preservado e verificado (SHA256 `44d48edfbbf38488c72dc563a531338230b28253830b5b4515dfc2d0b9c92f83`, CRC válido). O `results.jsonl` contém nove gates PASS até Lint; a interrupção não produz PASS E2E nem dos cinco gates seguintes. As 19 capturas públicas de landing pertencem a esse HEAD anterior.

A inspeção de `frontend-landing-320x812-text200-ihfr-start.png` e `...-ihfr-end.png` mostrou fragmentação excessiva das palavras dos qualificadores, embora estivessem dentro da viewport. Os paddings aninhados e o recuo da lista, definidos em rem, também duplicavam com o texto e consumiam a largura útil. A correção limita esses espaçamentos a pixels na faixa estreita, preservando integralmente o texto ampliado. O E2E passa a verificar, por Range de cada palavra, que os quatro qualificadores a200% não se fragmentam entre linhas; as verificações existentes de viewport, overflow e geometria permanecem. A prova visual corrigida e o resultado do novo HEAD dependem da nova CI.

### Ampliação da correção após revisão do HEAD04cd267

O Codex identificou no HEAD `04cd26721803ab66104a46fe7a28ce49d560205a` que o `overflow-wrap: anywhere` herdado da página ainda permitia fragmentar títulos e prosa fora dos quatro qualificadores. A regra passa a `normal`; a quebra de emergência permanece somente no endereço de e-mail. Na faixa até479px, o título científico e o título da equipe mantêm unidades rem com escala adequada às suas palavras, e o cartão das etapas usa padding fixo. O espaçamento das letras do eyebrow também é ajustado nessa faixa.

Antes da indisponibilidade do executor, as métricas da fonte Poppins real foram lidas: a palavra `experimental:` ocupa aproximadamente325,4px no título anterior a200% e244,1px com a nova escala, dentro dos262px disponíveis. Métricas tipográficas auxiliam a escolha; não substituem captura ou inspeção em navegador. A redução do título é restrita a `.science h2`, preservando a hierarquia dos demais títulos e do rodapé.

O E2E amplia o Range por palavra para cabeçalho, conteúdo e rodapé a200%, com separadores naturais de espaço/hífen e exceção somente do endereço de e-mail. Acrescenta capturas do título científico e da equipe, totalizando21 capturas planejadas. As assertions existentes de overflow, viewport, alvos44px, navegação e os timeouts permanecem.

O run `39581341332` do HEAD04cd267 terminou com conclusão `success`; esse resultado pertence à revisão anterior e não cobre este delta. O executor ficou indisponível durante as verificações locais da nova correção; não há resultado local concluído de typecheck/lint para este delta. A árvore seguinte é preparada por substituições estritas dos três arquivos remotos, com comparação dos conteúdos pela API. Novo CI oficial, revisão Codex do novo SHA e inspeção das capturas continuam pendentes.
