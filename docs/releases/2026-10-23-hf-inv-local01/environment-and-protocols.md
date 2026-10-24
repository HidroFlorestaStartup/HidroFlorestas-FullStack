# Ambiente e reprodução dos protocolos

Plano único: [execução local multiagente](../../plans/active/investigacoes-intermitentes-20261023/execucao-local-multiagente.md).
Estado inicial/ferramentas: [preflight](preflight.json). Este documento indexa os
protocolos e não cria outro plano independente.

| Contexto | Ambiente e recurso | Distinção necessária |
|---|---|---|
| Histórico NAV4 | Linux, PostgreSQL16.15, IMP00655426, Next127.0.0.1:3000 | Quatro FAIL antigos; WSL indisponível nesta execução, sem simular repetição Linux |
| A atual | Windows/PowerShell5.1, PostgreSQL17.10 próprio55427; diagnóstico em porta efêmera e original em127.0.0.1:3001 | Fallback e ingresso local oficial são ensaios separados; uma origem por experimento |
| B atual | Windows, PostgreSQL17.10 próprio55426, schemas/Next efêmeros novos | Dois servidores novos com cache de build preservado; não equivalem a reinstalação fria |
| C atual | Público3200 sem DB, depois accounts próprio55427/3001 | Recursos fixos usados após A parar; sessões/jars e perfis novos |
| Oficial | Actions Windows, Node24.19.0, lockfile, runner existente e quinze gates | Versões e resultado efetivos vêm do run final; não herdar resultado local |

Node24.19.0/npm12.0.2/Next16.3.8/Prisma7.4.2/Playwright1.55.1 e PostgreSQL17.10
foram observados localmente. O binário pinado e seus hashes estão nas
[notas B](ihfr/infrastructure.md). Não se compartilhou Prisma Client gerado ou
cluster/credencial entre worktrees. Somente cache de pacotes e pacote binário
foram reaproveitados com conferência de versão/hash.

As instruções/CLI realmente executadas estão em:

- [A: protocolo e comandos](nav4/readme.md), [protocolo histórico e adendos](nav4/protocol.md)
  e `scripts/hf-inv-nav4-local.ps1`, que exige `-Phase`, raiz privada e marker da missão.
- [B: protocolo](ihfr/protocol.md), [recibos](ihfr/run-evidence.json) e
  [probe de duas chamadas](../../../tests/investigations/ihfr/two-request-quota.test.ts),
  executado no contexto PostgreSQL descartável dos helpers existentes.
- [C: protocolo](navigation/protocol.md), [resultados](navigation/report.md) e
  [fontes investigativas](../../../tests/investigations/navigation).

Não copiar env, sessão, credencial, data ou marker de outro contexto. Os wrappers
recusam dotenv preexistente sem ler seu conteúdo e montam ambiente por lista
permitida, com chaves/fixtures efêmeras. `-InitializeCiCluster` continua exclusivo
do Actions Windows. Contexto de usuário/DPAPI/ACL deve ser consistente; a
contraprova `os.userInfo` e a confiança Git por processo estão no preflight.

O usuário autorizou explicitamente encerrar processos que ocupavam as portas.
Somente o PostgreSQL local identificado em55427 foi parado pela coordenação,
ordenadamente e sem apagar dados. A/B/C pararam seus próprios clusters após
SchemaAudit zero; não se operou banco hospedado. Nenhum teste exige relaxar
CSRF, TLS, ownership, quota, timeout90s ou assertion5s.

`EVIDENCIA_IMPLEMENTACAO`: não houve defeito novo de produto ou alteração do
contrato do runner oficial. As skills Spec Kit instaladas e seus limites foram
consultados; não foi criada spec fictícia para hipóteses inconclusivas. Uma
correção funcional ou de contrato da prova continua sujeita ao fluxo instalado
specify→plan→checklist→tasks→analyze→implement e validação. Aqui a execução
transversal e os experimentos permanecem no plano/protocolos acima.
