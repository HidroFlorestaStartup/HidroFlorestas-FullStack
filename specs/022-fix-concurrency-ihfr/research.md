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
