# PLAN-RC-001 — Preparação da Release Candidate CRI

Estado: EM_ANDAMENTO. Data: 2026-10-10, America/Sao_Paulo.
Responsável pela execução: agente; revisão e operação humanas: não especificado.

## Objetivo, autorização e fontes

DECISAO_CONFIRMADA: pedido do usuário de 2026-10-10 autoriza reconciliar Git,
publicar branches/PRs no GitHub e finalizar documentação para os estudantes.
Resultado esperado: RC revisável com sequência de integração, operação no sistema
existente, migrations seguras, checklist e evidências. Não implementar features.
São proibidos merge em development/main, deploy, migrations remotas e alterações
em credenciais/configurações/recursos existentes dos provedores.

Fontes: AGENTS, PLANS, constituição, políticas de autoridade, specs014/015/016,
código/schema/migrations/configuração e revisão focal em539f38d. Evidência técnica
não equivale a homologação. RECOMENDACAO identifica os procedimentos futuros.
Documentação externa primária somente para procedimentos operacionais.

## Estado inicial e preservação

EVIDENCIA_IMPLEMENTACAO: checkout original em main/beba96f, único não rastreado
prompt-revisao-focal-pre-homologacao-hidrofloresta.md; checkout cri-exec limpo em
audit/cri-local-20261010/539f38d. Seis branches originais e dois worktrees preservados.
Fetch/ls-remote: origin/main e development em beba96fbf6bbaac8771dbb29abea2f9f8f5b0054.
Os11 commits são lineares, com datas crescentes; não houve rebase/cherry-pick/amend.
Novo worktree: C:/projetos/ifma/HidroFlorestas-release-rc.

O remoto é fork de PedroVitor237/HidroFlorestas. Homepage declarada respondeu200;
status Vercel histórico aponta hidrofloresta-8598/hidro-florestas-full-stack, sem
provar vínculo Git atual do fork. Banco e cloud de produção não identificados
independentemente; conferência humana nos painéis é pré-requisito de operação.

## Etapas e evidências previstas

1. CONCLUIDO: registrar refs, preservar alterações, fetch e conferir ancestralidade.
2. CONCLUIDO: criar branches review e proteção vercel.json apenas para seus nomes;
   encadear com merges auxiliares sem tocar nas branches originais/principais.
3. CONCLUIDO: notas, integração, ambiente, atualização, migrations e checklist.
4. CONCLUIDO: diff/links/segredos, identidade do código e migrations, dry-run Git.
5. EM_ANDAMENTO: push explícito/atômico de seis refs protegidas; PRs encadeados.
6. NAO_INICIADO: conferir SHAs/bases/diffs/estados remotos; evidências e commit final.

Arquivos autorizados afetados: vercel.json (proposta restrita para impedir deploy
na publicação), docs/releases/2026-10-10-cri-rc/**, este plano, README,
PROJECT_CONTEXT, handoff CRI, DOCUMENT_REGISTER e PENDING_DECISIONS quando
materialmente afetados. docs/raw e artefatos científicos permanecerão intactos.

## Riscos, desvios e pontos de revisão

RECOMENDACAO: estudantes devem usar merge commit para preservar os SHAs, retarget
ordenado e não apagar branches-base antes de adaptar dependentes. GitHub CLI
ausente; usar Git para push e conector GitHub para PRs. Nenhum novo runner instalado.
Proteção publicada nas branches review; não altera settings dos provedores nem
main/development. Quatro merges auxiliares transportam essa proteção sem duplicar
commits funcionais. Verificar diferenças de árvore entre checkpoints originais
e de revisão: somente vercel.json, antes da documentação final.

Paradas humanas futuras: revisão/merge; identificação do alvo/backup testado;
autorização de migrations/deploy; GateB012, aceite013, Cloudinary e operadores.
Não solicitar nova permissão para publicação já expressamente autorizada.
Sem reproduzir PASS histórico como teste novo: conferir identidade de src/tests/
scripts/prisma/package/config, excetuando proteção Git, antes de decidir reruns.

## Histórico

- 2026-10-10: EM_ANDAMENTO; remoto reconciliado sem divergência, branches protegidas
  construídas, inventário operacional com limites de evidência identificado.
- 2026-10-10: documentação operacional concluída;113 links iniciais PASS, runtime
  Git idêntico,49 mudanças de bytes comprovadas LF/CRLF e guard restrito. Coletor
  inicial corrigido sem editar runtime.14 migrations e tasks6/18/20 conferidos;
  push dry-run aprovado. Verificações em verification-report/publication-evidence.
