# INV-001 e INV-002 — resultados locais

Missão `HF-INV-20261023-01-LOCAL01`; owner lógico
`agent-b-ihfr-concurrency`. Classificação: `EVIDENCIA_IMPLEMENTACAO` no alcance
dos experimentos abaixo. Ambos os incidentes ficam `NAO_REPRODUZIDO` no protocolo
atual, com **causa histórica `INCONCLUSIVO`**. Nenhuma correção de produto foi
demonstrada ou aplicada por esta frente.

O IHFR conserva `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e `NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
Os experimentos não concedem homologação do piloto, aceite humano ou científico.

## Fontes, bytes e código examinado

[Protocolo v1](protocol.md), registrado antes dos testes; [históricos e sua
integridade](historical-integrity.json); [recibos dos experimentos](run-evidence.json).
Os três ZIPs originais preservados localmente foram lidos sem executar seu código.
Os digests foram conferidos com a API GitHub atual; todos os 411, 413 e 4 membros,
respectivamente, passaram por validação de caminhos, tamanho e CRC antes da
extração seletiva. Os originais permanecem privados. Os `.log` publicados são
projeções por lista fechada de linhas, sem stacks, código-fonte incidental ou
caminhos absolutos; seus digests diferem dos originais quando há seleção/redação.

- [IHFR FAIL](historical-12212173104.log): seis falhas de seletores/regiões,
  incluindo Fuso da coleta e Uso predominante, sem alcançar comparação científica.
- [IHFR PASS](historical-12213157147.log): os mesmos seis cenários, mesmo SHA e
  snapshot, passam em 38,2 s. O PASS não explica o FAIL anterior.
- [Duas chamadas FAIL](historical-12192554979.log): 217/218 testes PASS;
  `INTERNAL_ERROR` recebido em vez de `RATE_LIMITED`, com três `40001` agregados.
  As asserções finais de contagem não chegaram a executar nesse FAIL.

Os `error-context.md` referidos no FAIL IHFR estão ausentes dos ZIPs originais.
Também faltam status/URL/DOM/console/Next correlacionados daquele par histórico.
As lacunas não foram preenchidas por inferência dos controles artificiais atuais.

Base `c4adfb379e5dc78f27f31b91edbd13f43228d9f9`, árvore
`24baec02321084fc1abedddd6355896a0b81eaa1`. O commit de instrumentação
`6ddb1e416fd4c14d5c1f6c788571e94c91fb21ac`, árvore
`fc4c560e87fdc95a00d4fd225aada7a5dde0c1e6`, acrescenta somente protocolo e
dois probes investigativos. Nenhum serviço, fórmula, schema, contrato HTTP,
assertion histórica ou runner oficial foi alterado.

`EVIDENCIA_IMPLEMENTACAO`: a correção Spec022 e seus controles já estavam na base.
A comparação com `6ad9098` mostrou serviço de capas, runner, controles e testes
pertinentes preservados; o logger atual contém hardening adicional já integrado.
Não houve importação da branch histórica ou repetição de seu patch.

## Execuções e resultados

| Experimento previamente definido | Resultado observado | Limite |
|---|---|---|
| Cenário original de duas chamadas/quota horária | PASS 1/1, exit 0 | Mesma assertion original de um sucesso, `RATE_LIMITED`, dez tentativas/quarenta jobs |
| Espelho A vence antes do INSERT de B | PASS | Duas chamadas, uma colisão real `P2034/40001`, retry recusa por quota, 9/36 → 10/40 |
| Espelho B vence antes do INSERT de A | PASS | Mesmas invariantes; ordem de vencedor invertida por barreiras |
| IHFR, servidor novo 1 | PASS 6/6, exit 0, 1,4 min de browser | Novo schema/contexto/servidor; build cache preservado |
| IHFR, servidor novo 2 | PASS 6/6, exit 0, 1,4 min de browser | Nova execução pré-definida, zero retries; mesmos seis cenários |
| Controles IHFR separados | 2 FAIL deliberados + 2 PASS, exit 1, 23,9 s | Resultado negativo esperado preservado; não é um gate oficial PASS |
| Regressão focal existente | PASS 45/45, exit 0, zero skip/cancelamento | Capas, OCC concorrente IHFR e recuperação idempotente; há sobreposição com o baseline |
| Auditoria somente leitura | PASS, exit 0 | Zero schemas candidatos gerenciados restantes |
| Encerramento do cluster B | PASS, exit 0 | Parada ordenada pelo script de ownership; dados/marker privados preservados |

Não se somam as duas rodadas IHFR como doze casos únicos, nem o baseline e seu
caso repetido na regressão. Os dois novos probes ficam separados da suíte oficial;
seu comando explícito está no recibo. Os quinze gates oficiais da candidata
agregada pertencem ao recibo do coordenador, não a esta tabela local.

O baseline começou sobre o código rastreado de `c4adfb3`; os novos arquivos de
investigação foram commitados enquanto o processo estava em andamento. O teste
original e suas dependências executáveis não mudaram. Os experimentos posteriores
usam `6ddb1e4`, acrescido apenas de documentação histórica não commitada. Essa
distinção consta de cada recibo; não se atribui execução a uma árvore limpa fictícia.

## INV-002: mecanismo alcançado e limite histórico

As duas operações alcançaram `before-insert` após a elegibilidade, em cada
schedule. Seus snapshots eram iguais. A barreira liberou o vencedor, aguardou
seu commit e então liberou a outra operação. O `upsert` anterior não bloqueou a
chegada à barreira. Em ambos, a transação perdedora abortou com `P2034/40001`;
a fase seguinte leu o estado confirmado e retornou `RATE_LIMITED`.

Persistiram exatamente dez tentativas e quarenta jobs. O `finally` liberou todas
as barreiras e observou as promises antes do descarte do schema. Não houve erro
fabricado ou sleep para escolher o vencedor; quotas e orçamento de retry ficaram
inalterados. O provedor fake não acessou serviço hospedado.

Essa evidência demonstra um conflito real controlado com duas chamadas na base
atual. **Não reproduz os três conflitos agregados do histórico**. Não se
acrescentaram competidores para produzir essa assinatura. O contrato de quatro
operações/três ondas da Spec022 conserva seu alcance distinto.

`RECOMENDACAO`: uma próxima falha natural deve guardar operação/fase, SQLSTATE,
commit observado e contagens finais no mesmo cenário. Sem isso, a origem dos
três conflitos históricos permanece insuficiente para atribuição causal.

## INV-001: inicialização, sessão e navegação

Cada rodada atual registrou quinze respostas 200 de documentos `/dashboard/...`,
zero 404 de página e dois 404 esperados de lookup da API. O recibo preserva os
404 de API e a ordem das respostas, com URLs em templates sem query. Os seis
cenários abrangem criação, leitura, replace/revoke, recuperação, versão
incompatível, papéis, laboratório inativo, reload e navegação no servidor aquecido.

No controle sem JavaScript, a região IHFR existe no DOM sob `DIV#S:1` com
`hidden=true`, `display:none` e retângulo 0 × 0. O controle de coleta tem zero
seletor Fuso e um indicador Preparando formulário. As duas expectativas de
visibilidade continuam FAIL. Com JavaScript, a região é visível; sessão inválida
e ator inexistente redirecionam para login sem região IHFR. Esses dois controles
positivos passam.

`INFERENCIA`: os controles discriminam mecanismos capazes de produzir sintomas
semelhantes aos seletores ausentes do histórico. Eles **não provam que JavaScript
falhou naquele CI**, nem eliminam hipóteses de sessão, navegação ou servidor.
O guia de streaming da versão instalada
(`node_modules/next/dist/docs/01-app/02-guides/streaming.md`)
foi consultado: a entrega de HTML de uma fronteira assíncrona pode depender de
scripts para trocar o fallback. Isso impede inferir visibilidade apenas pela
presença do conteúdo no HTML.

`RECOMENDACAO`: preservar status/rota, estado visível, sessão sintética e logs
estreitos no instante de uma próxima falha natural. Nesta execução nenhuma
dessas duas rodadas reproduziu o FAIL histórico; não há patch de cálculo ou
alteração de contrato científico a propor.

## Ambiente, infraestrutura e revisão

Windows/PowerShell 5.1.26100.9711, Node 24.19.0, npm 12.0.2, Next 16.3.8,
Prisma 7.4.2, Playwright 1.55.1, Chromium build 1193 e PostgreSQL 17.10.
Cluster e credencial foram novos, em diretório privado da worktree, com ACL do
executor e SYSTEM. Porta 55426 serializada com a frente A; servidores Next em
portas efêmeras suportadas. Ambiente de processo por lista explícita de variáveis
do sistema, sem carregar `.env` preexistente. Não houve banco ou provedor hospedado.

[Notas de infraestrutura](infrastructure.md) preservam instalação, rede,
ExecutionPolicy, DPAPI, ACL e caminhos longos separados dos resultados funcionais.
O PostgreSQL pinado foi copiado somente como pacote binário da missão; nenhum
cluster, dado ou credencial da frente A foi reutilizado. O cluster B foi parado
uma vez para priorizar NAV4 e novamente após concluir todos os experimentos.

Typecheck do projeto, lint do novo teste e `git diff --check` passaram; não houve
nova alteração executável depois dessas verificações. A revisão estática cruzada
do agente C, distinto do autor B, não encontrou P0–P2 no protocolo e nos probes
`6ddb1e4`. Seu ponto de verificação sobre a barreira após `upsert` foi confirmado
pelos dois traces de runtime. A revisão da composição final e o Codex remoto
permanecem sob a coordenação, com recibos próprios por SHA.

Não foi criada spec de correção porque não houve defeito novo demonstrado ou
mudança de contrato oficial. A investigação segue o plano transversal e o
protocolo autorizado; isso não dispensa Spec Kit caso uma correção material
seja posteriormente comprovada.
