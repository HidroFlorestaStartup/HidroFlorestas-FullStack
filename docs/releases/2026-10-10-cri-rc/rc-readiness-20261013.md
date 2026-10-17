# Prontidão técnica da RC — 2026-10-13

EVIDENCIA_IMPLEMENTACAO: correções locais e sincronização da cadeia concluídas;
revisão/aprovação dos estudantes e homologação operacional continuam pendentes.
DECISAO_CONFIRMADA: pedido do usuário de2026-10-13 autorizou merges internos
das branches de revisão, preservando main/development/produção/bancos hospedados.

## Correções e preservação

Spec Kit e planejamento commitado d6b1323 precedem o RED de RC-DRAFT-001.
fc82ecc conserva seleção e primeiro salvamento após hidratação lenta. Os dois
baselines verificam primeiro PUT/resposta/GET/reload com false, 0, texto12.,
campo omitido, absent e edição vazia explícita distintos. Não mudou parser,
DTO, serviço, schema, ciência, asserts originais, retry ou timeouts.
[RED/GREEN e payloads](../../../specs/015-environmental-drafts/hydration-evidence.md).

RC-UI-001 permanece incorporada: novo GET503→200 com revision1,
naturalWidth>0 e recuperação após segunda falha, sem alterar revision no banco.
[Evidências da capa](../../../specs/016-area-covers/rc-ui-001-evidence.md).

Merges internos3→4→5→6→7 preservaram pais e os11 SHAs originais.
Conflitos de spec015/spec.md e implementation-evidence015/016 foram resolvidos
mantendo erratas da auditoria e registros recentes; nenhuma escolha global
ours/theirs apagou evidências. PR5 deixou de ser dirty após push da resolução.
O commit original99d8363 foi integrado à RC6 no merge9fe2bec, alterando somente
package.json/lockfile. Os quatro commits documentais posteriores do PR7 foram
preservados na branch7; patch não foi duplicado/cherry-picked. PR7 continua aberto.

## Nova regressão cumulativa

Árvore testada: `9fe2becccf2286da354c3f3fcc6ff9958c28b034`.
Node24.19.0/npm12.0.2, Next16.3.8, Prisma7.4.2, PostgreSQL17 sintético próprio,
Chromium, fakes existentes. Janela19:14:09.028→19:21:28.551 UTC.
Fingerprint funcional:
`f7148613de807f0d1e6912ba67f718cd78bf4362455a61d94f6b328de914d02c`.
Fechamentos documentais posteriores não alteram os inputs funcionais testados;
comparação por Git/manifesto acompanha a publicação. HEAD final é o da PR/ref
remota após o commit deste registro, evitando autorreferência.

| Gate | Resultado executado |
|---|---|
| Unit |291 Node +17 Mail PASS |
| Integration |187 PASS |
| Migration |37 PASS |
| Contract |6 PASS |
| R1 |17 PASS; subconjunto, sem somar casos novos |
| Build/typecheck/lint |PASS; lint0erros/3avisos preexistentes |
| E2E geral |70/70 PASS, incluindo duas hidratações e retry da capa |
| HTTPS |2/2 PASS |
| Exclusão própria |3/3 PASS |
| IHFR próprio |6/6 PASS técnico do contrato experimental |
| RegressionSetup/Bootstrap |14 migrations verificadas/aplicadas no alvo local próprio; zero falhas |
| SchemaAudit/teardown |zero schemas de teste; fixtures limpas; cluster voltou STOPPED, dados preservados |
| npm audit |5 high na cadeia dev; omit=dev0 vulnerabilidades |

[Registros/UTC/comandos/hashes](rc-readiness-evidence/validation-records.json),
[manifesto521 arquivos](rc-readiness-evidence/functional-manifest.json),
[audit completo](rc-readiness-evidence/npm-audit-final.json) e
[produção](rc-readiness-evidence/npm-audit-final-production.json).
As12 migrations antigas e duas aditivas mantêm os mesmos blobs Git; nenhuma
migration adicional ou aplicação em banco hospedado ocorreu.

## CI e estados de review

c65265f adicionou CI; primeira
[run38452226442](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38452226442)
FAIL na ACL inicial, antes dos gates, preservada. bc3a751 prepara ACL exata somente
no diretório fresco, mantendo guard existente. Nova
[run38452752261](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions/runs/38452752261)
da Spec015 concluiu SUCCESS. Isso comprova viabilidade efetiva de Actions,
instalação fresca e gates; não é resultado presumido de uma consulta administrativa.

Workflow protege os cinco nomes exatos, usa Windows/Node24, PostgreSQL privado,
contents:read/actions pinadas, nenhum secret de produção e nenhum deploy.
Push também documental inicia checks para o novo head. Conferir a conclusão do
SHA final em [Actions](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/actions)
e nos PRs, distinguindo execução local, histórico e checks em andamento.
[Runbook CI](../../operations/rc-review-ci-runbook.md).

As bases1→2→3→4→5→6→7 foram mantidas. CHANGES_REQUESTED de PedroVitor237 em
#4/#6 não foi dispensado, thread não foi resolvido em seu nome e nenhum PR foi
aprovado pelo agente. Solicitação de nova revisão e heads publicados devem ser
conferidos nos PRs; os estudantes decidem aceite e integração por merge commit.

## Limitações e pendências humanas

O primeiro E2E da Spec015 registrou66 PASS/1FAIL por ECONNRESET em admin-read,
com causa inconclusiva; arquivo intacto2/2 e repetição geral67/67 passaram.
O geral final70/70 também passou. FAIL foi preservado e não foi convertido
retroativamente em PASS. Os65 PASS/1FAIL/1não executado da revisão independente
do PR7 continuam históricos: a reprodução determinística atual não prova o
timing daquela falha perdida. CI inicial FAIL também continua como evidência.

RECOMENDACAO: candidato disponível para revisão técnica dos estudantes com
resultados atuais; integração depende do parecer deles. Permanecem GateB012/
T025/T028, aceite humano013, browsers alvo/teclado/mobile, Cloudinary real/preset
frozen/hash/EXIF/raw/late uploads/cleanup/custos, operadores mail/cleanup,
inventário de banco/domínio, backup restaurado/ensaio e autorização da janela.
Cinco achados dev e intermitência ECONNRESET inconclusiva seguem ressalvas.
Nenhum teste sintético fecha esses gates. [Checklist](review-checklist.md).

Main/development=beba96f, checkpoints originais, três arquivos não rastreados
do checkout principal e dados existentes foram preservados. Consulta remota
Vercel confirmou vínculo Git e ausência de deployments das branches de revisão;
bloqueios permanecem false. Nenhum deploy, merge principal ou migration remota.
IHFR mantém CONTRATO_EXPERIMENTAL, VALIDACAO_CIENTIFICA_PENDENTE,
SUJEITO_A_RECALIBRACAO e NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.
