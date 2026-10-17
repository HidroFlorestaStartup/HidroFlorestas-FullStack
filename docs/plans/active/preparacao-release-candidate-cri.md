# PLAN-RC-001 — Preparação da Release Candidate CRI

Estado: CONCLUIDO para preparação/publicação da RC; revisão dos estudantes pendente.
Data: 2026-10-10, America/Sao_Paulo.
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
5. CONCLUIDO: push explícito/atômico de seis refs protegidas; PRs#1–6 abertos.
6. CONCLUIDO: SHAs/bases/diffs/estados remotos conferidos; evidências finais neste
   fechamento documental, cujo SHA é identificado pelo head do PR6.

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
- 2026-10-10: CONCLUIDO; push atômico PASS e PRs#1–6 abertos/encadeados. Conector
  GitHub403 resolvido por REST com autenticação Git vigente em memória.17 commits
  nos ranges dos PRs sem repetição, incluindo11 originais; files/heads/bases remotos
  correspondem ao Git. main/development intactas; zero statuses/check-runs nos heads
  observados.119 links finais válidos,14 migrations, runtime inalterado. Commit
  inicial832e7c9; fechamento acrescenta publicação, rastreabilidade e pendências.

## Encerramento e pendências externas

Documentos/arquivos e verificações estão no pacote RC e manifesto. Nenhum bloqueio
restante da preparação/publicação. GateB012, aceite013, browsers alvo, Cloudinary
real, operadores PD-CRI-004/010, destino/backup/ensaio/aprovação produtiva permanecem
pendentes para os estudantes, conforme checklist. Sem merge/deploy/migration
remota ou alteração de provedores. Manter este plano no local ativo até a revisão
humana da entrega, sem mover/renomear planos anteriores. Conclusão desta preparação
não equivale a aprovação dos PRs nem autorização produtiva.
