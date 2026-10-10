# Revisão e integração dos PRs

RECOMENDACAO operacional para os estudantes. Publicação autorizada pelo usuário
em2026-10-10; merge/deploy não foram autorizados nesta preparação.
Repositório de revisão: HidroFlorestaStartup/HidroFlorestas-FullStack.
Branch completa: `release/cri-rc-20261010`.

## Encadeamento

| Ordem | Head de revisão | Base inicial | Branch original preservada | SHA original final |
|---|---|---|---|---|
| 1 | review/cri-reconciliation-20261010 | development | docs/reconciliacao-cri-20261010 | c59a7b6eb1198e20535356934805f0b93d2e99c2 |
| 2 | review/014-account-test-runners | review/cri-reconciliation-20261010 | 014-account-test-runners | 857aeab959c32e9d4fdc8fcd9ebbabba5c5f999a |
| 3 | review/015-environmental-drafts | review/014-account-test-runners | 015-environmental-drafts | 45da350c34f873619a81bb5b3022bf97a1d1bc7c |
| 4 | review/016-area-covers | review/015-environmental-drafts | 016-area-covers | 41f33db7ca30db3f9d971999c3f8131f4fc188a0 |
| 5 | review/cri-audit-20261010 | review/016-area-covers | audit/cri-local-20261010 | 539f38d52bba207d2822528d4afd6b936aa64d9f |
| 6 | release/cri-rc-20261010 | review/cri-audit-20261010 | nova branch de documentação/integracão | consultar evidence e HEAD remoto |

Os links reais dos PRs serão registrados após a criação nesta execução.

Cada PR mostra apenas sua etapa no Files changed. O primeiro inclui reconciliação
documental e proteção de publicação; 014 contém dois commits originais;015 dois;
016 três; auditoria três; o último apenas entrega documental. Nenhum commit
funcional foi copiado/cherry-picked. Capas não exigem drafts como regra de produto;
a dependência do PR deriva do histórico Git e dos arquivos compartilhados.

## Preservação e proteção de publicação

EVIDENCIA_IMPLEMENTACAO: seis branches originais continuam nos mesmos SHAs locais.
Foram publicados nomes review separados para proteger o push sem mudar esses
checkpoints. Os11 commits originais são ancestrais da RC com SHAs/pais/datas
preservados; manifesto de publicação registra cada um e o mapa de refs.

Commit a88d846 acrescenta somente seis entradas false em vercel.json, uma por
branch publicada. Quatro merges auxiliares encadeiam essa proteção com as branches
originais014/015/016/auditoria; não são novas implementações. Seu diff final contra
cada checkpoint original é somente vercel.json. main/development e settings dos
provedores não foram alterados. Bloqueio é restrito aos nomes publicados; uma
branch nova com outro nome precisa de proteção antes do push. A configuração
segue [git.deploymentEnabled da Vercel](https://vercel.com/docs/project-configuration/git-configuration).

## Como integrar sem perder SHAs ou repetir mudanças

1. Revisar as seis etapas e cumprir o [checklist](review-checklist.md). Aprovar
   cada PR explicitamente, registrar revisores e não habilitar auto-merge da pilha.
2. Conferir development/main atuais com fetch. Se avançaram, avaliar o diff de
   origem e conflitos em branch auxiliar protegida; preservar histórico por merge.
   Mudança em schema/auth/env exige revisão e verificações proporcionais novamente.
3. Integrar o PR1 em development com **Create a merge commit**. Não usar squash,
   rebase ou cherry-pick: perderiam os SHAs e confundiriam os dependentes.
4. Confirmar o merge do PR anterior; editar a base do próximo para development
   antes de integrá-lo. Conferir que Files changed contém somente a etapa e que
   os commits anteriores já são ancestrais de development. Integrar PR2→3→4→5→6
   pela mesma regra. Não fazer merge dos dependentes nas branches-base de revisão.
5. Não apagar branches-base durante a sequência. Retarget automático do GitHub
   deve ser conferido, não presumido. Ao terminar, registrar HEAD de development
   e manter refs/checkpoints até completar homologação e recuperação.
6. Abrir/revisar promoção development→main somente após os pré-requisitos
   operacionais. Verificar se merge dispara deploy automático; coordenar backup e
   migrations ANTES do primeiro deploy que passará a atender tráfego novo.

Conferências locais de leitura (substituir RC_FINAL pelo SHA remoto aprovado):

```powershell
git fetch origin
git rev-parse origin/development origin/main origin/release/cri-rc-20261010
git merge-base --is-ancestor 539f38d52bba207d2822528d4afd6b936aa64d9f origin/release/cri-rc-20261010
git log --reverse --topo-order --format='%H %P %s' beba96f..origin/release/cri-rc-20261010
git diff --check beba96f..origin/release/cri-rc-20261010
# Após todos os merges, ambos devem retornar exit0:
git merge-base --is-ancestor RC_FINAL origin/development
git merge-base --is-ancestor 539f38d52bba207d2822528d4afd6b936aa64d9f origin/development
```

## Fork e repositório conectado à produção

EVIDENCIA_IMPLEMENTACAO por GitHub API: origin é fork de
[PedroVitor237/HidroFlorestas](https://github.com/PedroVitor237/HidroFlorestas).
No inventário atual, main desse repositório é beba96f e development é f899d8d;
no fork, ambas são beba96f. Não tratar essas development como iguais.
Homepage informada é https://hidro-florestas.vercel.app. Nenhum push no repositório
de origem foi realizado; status Vercel herdado do commit não prova qual repo está
hoje ligado ao projeto. Confirmar em Vercel Settings→Git antes da promoção.

Se produção estiver ligada ao fork, seguir o fluxo acima. Se estiver ligada ao
repositório de origem, após revisão interna e autorização da equipe, preparar PR
cross-repository do fork integrado para a branch aprovada no repositório conectado.
Conferir a base real, dependências e diff cumulativo; usar merge commit para manter
os SHAs. O estudante deve registrar o link dessa promoção, o HEAD aprovado e a
produção candidata. Não conectar outro projeto para contornar a relação Git.
Se a política do destino exigir squash, há PENDENCIA_DE_DECISAO: resolver com os
mantenedores antes de integrar, pois conflita com a preservação solicitada.

Correções futuras devem ser commits adicionais com spec/plan/tasks quando
funcionais; preservar a evidência desta RC e repetir somente gates afetados.
O [guia operacional](production-update-runbook.md) determina quando promover.
