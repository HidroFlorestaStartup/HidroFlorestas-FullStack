# PLAN-RC-SYNC-20261013 — consolidação da Release Candidate

Estado VALIDADO_TECNICAMENTE; revisão/aprovação humana pendentes. Autoridade: pedido explícito do usuário em2026-10-13.
DECISAO_CONFIRMADA: merges internos das branches de revisão autorizados para
sincronização da pilha, sem merges em main/development, deploy/migrations remotas,
remoção de recursos reais ou alteração dos bloqueios de deployment.

## Escopo e estado inicial

Corrigir hidratação da spec015 por TDD; preservar RC-UI-001; resolver conflito
documental do PR5; integrar commit original de dependências; validar código final,
avaliar CI automatizado sem segredos/provedor real e sincronizar documentação.
Fora: aprovação em nome dos estudantes, promoção produtiva, alterações científicas,
autosave, schema novo, atualização geral de pacotes e settings de provedores.

| PR | Branch existente | HEAD inicial |
|---|---|---|
| 3 | review/015-environmental-drafts | 443d20ee8b70607995320c511c36c73be00f3302 |
| 4 | review/016-area-covers | e7aebc3a2ef7a01361092bdd1bad4a148cb44c12 |
| 5 | review/cri-audit-20261010 | bbd0efccd447632497895780141b62516bc7b7bf |
| 6 | release/cri-rc-20261010 | ca80376e6e0f60aac9b94ec598e8e4a7c937d17c |
| 7 | review/cri-rc-validation-20261012 | b20143adcd5d36fbde381c28ba220881f3f2d53d |

main/development=beba96f; 11 originais até539f38d; branches/checkpoints originais
e três arquivos não rastreados no checkout principal preservados. Node24.19;
PostgreSQL próprio inicialmenteSTOPPED; nenhuma variável/credencial real copiada.
Responsáveis por aprovação: estudantes/revisores, sem nova designação operacional.

## Etapas e critérios

1. Spec015: plano/commit → RED → fix → GREEN/primeiro payload/retomada → evidências
   e push protegido da branch3. Tarefas detalhadas somente na spec015/tasks.md.
2. Merge interno3→4; testar drafts/capas na combinação. Merge4→5: preservar novos
   registros e erratas históricas na resolução explícita dos conflitos, sem ours/theirs
   sobre o documento inteiro. Merge5→6 mantém etapa documental da RC.
3. Merge do commit99d8363 original (primeiro commit do PR7) na RC6 atual; não
   cherry-pick/copiar patch. Seu parentca80376 já pertence à RC; os quatro commits
   documentais posteriores do PR7 permanecem próprios dessa etapa. Conservar a
   proteção da branch7 na configuração da RC. Merge6→7 então sincroniza código e
   mantém PR7 como revisão/evidências, sem absorver seu head inteiro em sua base.
4. Executar gates completos da árvore final em Node24/Pg próprio/fakes; sem reutilizar
   PASS histórico. Avaliar CI: runner Windows compatível com ownership/ACL atuais,
   dependências/browsers/cluster sintético, permissões mínimas, nenhuma credencial
   de produção/SMTP/Cloudinary. Não ativar deploy por CI. Registrar execução real
   ou NOT_RUN/bloqueio, sem presumir Actions disponível.
5. Sincronizar release notes, runbooks, checklist e estados de specs/tarefas/evidências;
   reconferir refs/ancestralidade/diffs/mergeability/guard e publicar só branches
   existentes protegidas. Pedir review aos estudantes preservando CHANGES_REQUESTED.

Cada push exige runtime gates aplicáveis, branch guardfalse e consulta remota do
projeto Vercel/CI. Não forçar push. Main/development e produção devem manter identidade.
Ciência segue CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

## Riscos, evidências e encerramento

Conflicto5 material confirmado pela informação do usuário e mergeablefalse na API;
resolver por comparação de cada lado e manter a trilha histórica. Integração de
dependências já revisadas não prova combo final; reexecutar gates. Bancos existentes
não serão resetados para acomodar branch antiga. Revisão humana e gates de provedores
continuam próprios: disponibilidade técnica para review não equivale a homologação.
Encerramento deverá registrar SHAs/heads/resultados reais e operadores/gates pendentes.

Atualização de design CI: workflow rc-review.yml dispara somente nos cinco nomes
existentes3–7, com permissions contents:read, actions oficiais pinadas por SHA,
Node24.19, Windows e cluster fresco privado no próprio runner. Script versionado
rc-review-validation.ps1 reutiliza guards/coletores atuais, gera somente segredos
sintéticos e recusa instalação sobre diretório existente; never deploy/SMTP/cloud.
Collector recebe aliases explícitos para os dois CLIs locais já existentes,
mantendo redaction/fingerprint. Consulta administrativa Actions403; disponibilidade
efetiva será comprovada por runs/checks ou registrada como bloqueio, sem alterar
settings. Checklist015 requirements16/16 reconferido, sem modificar seus itens.

## Encerramento técnico — 2026-10-13

EVIDENCIA_IMPLEMENTACAO: plano d6b1323 precede RED, fix/evidências fc82ecc e
GREEN; commits c65265f/bc3a751 adicionam CI e preparo privado de diretório fresco.
Push015 confirmado. Merges86c468c/e14c0a9 propagam015→016; 2186e06 resolve
três conflitos documentais da auditoria conservando erratas e fixes, seguido de
2bbab41; 5975427 sincroniza a RC. Merge9fe2bec incorpora99d8363 original uma
vez, e8fe53d1 sincroniza a revisão7 preservando seus quatro commits documentais.
Bases/estados de review e11 originais mantidos; PR5 já mergeabletrue após push.

Combo local9fe2bec, Node24.19/Next16.3.8/Pg próprio:15 gates PASS,
Unit291+Mail17, Integration187, Migration37, Contract6, R117 subconjunto,
Build/typecheck/lint, E2E70, HTTPS2, Deletion3, IHFR6, Bootstrap14, SchemaAudit0.
Fingerprint f7148613de807f0d1e6912ba67f718cd78bf4362455a61d94f6b328de914d02c.
Cluster voltou STOPPED preservando dados. Audit omit=dev0, completo5high dev.
Documentação/evidências da combinação pertencem à branch de release; consultar
o documento `docs/releases/2026-10-10-cri-rc/rc-readiness-20261013.md` naquele head.

CI efetivo: primeira run38452226442 FAIL por ACL antes dos gates; recusa não foi
relaxada. Run38452752261 do headbc3a751 concluiu SUCCESS com os15 gates.
Recibo em hydration-evidence/ci-validation.json. Workflow também verifica heads
publicados posteriores; conferir SHA/conclusão real no GitHub, sem presumir PASS.
Fechamentos e propagação documental não modificam inputs funcionais testados.
Re-review é solicitado aos estudantes no fechamento da publicação; decisões
CHANGES_REQUESTED anteriores continuam próprias dos revisores.

Nenhum merge principal, deploy, migration hospedada ou recurso real removido.
Os FAILs de admin-read ECONNRESET e revisão independente permanecem históricos,
causa daquela intermitência não é declarada resolvida. Ciência, gates humanos,
provedores reais, operadores, inventário/backup/ensaio continuam pendentes.
