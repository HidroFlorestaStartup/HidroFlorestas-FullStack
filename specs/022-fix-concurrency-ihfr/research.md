# Pesquisa e desenho experimental

## Autoridade

DECISAO_CONFIRMADA: pedido atual do usuário,19/10/2026, autoriza branch/testes/commits/PR, proíbe merge/deploy/produção. Specs006/016 e ADR-0001 preservam contratos. Responsável nominal não especificado.

## Frente A

EVIDENCIA_IMPLEMENTACAO: três tentativas Serializable, espera100–150/200–250ms,40001/P2034 reconhecidos e esgotamento sanitizado em INTERNAL_ERROR. Elegibilidade antes/depois do preset externo. Teste histórico sincroniza somente preset.

INFERENCIA: vítima pode repetir antes do commit vencedor; três conflitos não são explicados só por duas solicitações. Correlacionar fases/snapshots/commit em experimento com barreiras e conferir contagens finais.

RECOMENDACAO: não ampliar orçamento nem mapear conflito genericamente para RATE_LIMITED. Locks dentro de snapshot Serializable antigo exigem teste de waiters. Quota abrange usuário em áreas distintas. Alternativas: eliminar contenção comprovada, serializar escopo da quota ou manter inconclusivo; decisão depende do experimento.

Referências primárias: [PostgreSQL17 isolamento](https://www.postgresql.org/docs/17/transaction-iso.html), [tratamento40001](https://www.postgresql.org/docs/17/mvcc-serialization-failure-handling.html), [Prisma transações](https://www.prisma.io/docs/orm/fundamentals/transactions). Repetir transação inteira é necessário; orçamento fixo não garante sucesso.

## Frente B

EVIDENCIA_IMPLEMENTACAO: run39300023357 tentativa1/12212173104 tem6FAIL e tentativa2/12213157147 tem6PASS, mesmo SHA15. Falhas de DOM precedem matemática. Fixtures commitadas antes do spawn, JWT compartilhado, workers1/retries0. Runner descarta logs Next e aceita /login<500; layout privado redireciona erros de autenticação.

INFERENCIA: entrega comum/rota/autenticação/schema merece teste antes de culpar hidratação; região MEMBER é SSR.

RECOMENDACAO: observar URL/status/HTML/logs sanitizados; comparar execução isolada e sequência oficial. Controle de JS distingue hidratação/SSR. JWT inválido reproduz sintoma, não prova causa histórica. Traces brutos contêm cookies; excluir de Git/upload. Corrigir somente causa comprovada ou documentar inconclusivo.

## Isolamento

RECOMENDACAO adotada: harness IMP00655426 com LOCALAPPDATA próprio ignorado. Não acessar PG55427 da demo. Gates integrais de contas no cluster efêmero oficial Windows Actions, sem flexibilizar guards.

## Resultado dos experimentos e desenho adotado

EVIDENCIA_IMPLEMENTACAO: o cenário original de duas operações passou em 30 repetições. Um controle de commit mostrou que o snapshot novo vê a quota preenchida. Um reprodutor distinto, de quatro operações em três ondas, gerou três conflitos reais tanto no COMMIT (`DriverAdapterError/40001`) quanto no INSERT (`P2034/40001`). As transações da vítima têm snapshots novos; o terceiro concorrente completa a quota depois da última leitura permitida. O helper original transforma o conflito final em erro técnico sem observar esse estado. RED: 2 FAIL; GREEN: 2 PASS; tentativas/jobs: 10/40 em todos os casos.

RECOMENDACAO de engenharia adotada no escopo autorizado: manter as três tentativas de escrita e acrescentar uma única transação de consultas, sem retry, após o último conflito reconhecido no pós-preset. Reusar a elegibilidade e recuperar apenas replay persistido/compatível. Se a recusa não estiver comprovada, conservar `INTERNAL_ERROR`. Alternativas não adotadas: aumentar retries/backoff, locks globais, transações atravessando I/O do provedor, alteração de quotas e mapeamento incondicional de conflito para limite. Risco: latência excepcional adicional e consulta final ainda sujeita a erro técnico.

EVIDENCIA_IMPLEMENTACAO: controles IHFR separados demonstram duas assinaturas possíveis. Sem JavaScript, conteúdo entregue fica sob ancestral oculto e Fuso não hidrata; com JavaScript, o diagnóstico é visível. Sessão inválida ou ator inexistente redirecionam para login. Isso corrige a inferência inicial de independência de JavaScript por SSR. Nenhuma evidência histórica identifica qual condição ocorreu no CI falho.

RECOMENDACAO adotada na frente B: manter a falha histórica inconclusiva e acrescentar observabilidade sanitizada. Preservar os seis testes oficiais, sua ordem fria, asserções, readiness e limites. Controles artificiais são executados separadamente por flag explícita; seus REDs não são gates de aceitação. Pareceres independentes e dados em [implementation-evidence.md](implementation-evidence.md).
