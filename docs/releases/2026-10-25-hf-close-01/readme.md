# HF-CLOSE-01 — plano e fechamento técnico

Plano AGUARDANDO_REVISAO no corte local anterior à publicação; autoridade: mensagem do usuário desta execução, 2026-10-25,
ratificando expressamente C-A a C-F. FATO_DOCUMENTADO: mandato limitado aos sete
HEADs congelados, composição mecânica, contenção, duas inclusões focais de CI,
documentos, testes sintéticos, reviews, merge normal condicionado e disposição
administrativa após prova. Não constitui autorização operacional ou científica.

## Objetivo e limites

Incorporar as entregas #33–#39 em uma candidata, conservar os históricos e dar
disposição às seis instruções estudantis. Sem funcionalidades novas, deploy,
main, settings, proteção, provedores, secrets, banco hospedado, SMTP real,
piloto, exclusões, transplante integral de #27/#28 ou ratificações de produto.

## Fontes e estado inicial

Base `08262dc57c1ad365244f9ec6902b1e4be39e2d7d`; main somente leitura
`beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`. As sete fontes e seus blobs estão
registrados em [manifesto-integracao.json](manifesto-integracao.json).
Constituição, AGENTS, PLANS e políticas de autoridade governam esta execução;
HF-NIGHT e C1 são evidências históricas preservadas. A autorização atual supera
somente proibições anteriores conflitantes neste recorte.

Checkout inicial: `feat/hf-night-01`, HEAD da #35, apenas `.worktrees/` não
rastreado; preservado. Worktrees anteriores não serão removidas ou reutilizadas.
Node observado `v24.19.0`; lock/dependências não serão alterados.
Preflight remoto: base/main/fontes sem drift; #29–#32 merged, #27/#28 abertas.
Nenhuma agregadora preexistente. Conector não expôs toda a política; leitura
local autenticada confirmou proteção clássica ausente, regras efetivas e
rulesets vazios e merge commit habilitado. Nenhuma configuração foi alterada.

## Responsabilidades e capacidade

Delegação real por `collaboration.spawn_agent`, worktrees exclusivas:
coordenador `/root` (Git/config/publicação e único escritor remoto),
`/root/preservacao_a` (originais, instruções e pendências),
`/root/verificacao_b` (Spec Kit, testes e fingerprints),
`/root/revisao_r` (revisão independente, sem editar objetos aceitos).
A ferramenta aceitou `reasoning_effort=ultra` para os três subagentes; modelo e
esforço efetivos do coordenador não são expostos e não são certificados aqui.

## Etapas e tarefas

- [x] T01 PLAN: registrar autoridade, estado inicial, limites e responsabilidades.
- [x] T02 Preflight: fetch, SHAs exatos, idempotência e política de merge.
- [x] T03 EXECUTE: inventariar deltas, merges normais #33/#34/#36/#38/#37/#39/#35.
- [x] T04 Unir guardas false e incluir branch própria; somente dois seletores RC.
- [x] T05 Analisar specs029–034, preservar fontes, produzir matriz e manifesto.
- [x] T06 Executar os testes novos proporcionais e converge, preservar tentativas.
- [ ] T07 REVIEW: revisar bytes/configuração/evidências de forma independente.
- [ ] T08 Publicar uma branch/PR Draft, obter CI própria e Codex do HEAD final.
- [ ] T09 INTEGRATE: somente INTEGRATION_GATE=PASS; merge normal com SHA esperado.
- [ ] T10 VERIFY: parents/tree, ancestralidade, originais, guardas, main e remoto.
- [ ] T11 CLOSE: conferir heads e dispor #33–#39/#27/#28 sem excluir branches.

## Checklist de integração

Cada item da seção 9 do mandato deve ter prova: autorização, snapshots sem drift,
sete ancestrais e conteúdo protegido, ausência de delta funcional externo,
35 guardas exatas e seletores 19→20, Spec Kit, testes novos e quinze gates CI,
revisão independente e Codex concluído no HEAD final sem finding material,
qualificações operacionais/científicas, política e preflight imediato do merge.
O gate não recebe PASS antes das provas remotas. Aprovação humana exigida pela
política, drift externo ou defeito fora do envelope interrompem o ato afetado.
Partes independentes continuam. Não há nova confirmação de rotina para C-A..F.

## Validação, riscos e acompanhamento

Verificar blobs/modos e originais, whitelist, JSON/YAML/chaves, links novos,
segredos e diff check; executar §6.2, typecheck/lint/build/typecheck serializados.
E2E completo novo prioritário na CI. Comparação com a UI combinada é reutilização
por hashes, sem importar a branch. FAIL de restore e 188 probes permanecem
separados; nenhum restore geral novo. G3–G5 e aceite assistivo humano pendentes.

Dados conhecidos antes do freeze entram nos arquivos. SHA final, CI, Codex,
merge e estados administrativos posteriores ficam na PR e recibo local
exportável, sem commits autorreferenciais. Histórico: PLAN iniciado após
preflight confirmado em 2026-10-25; composição, análise, preservação e testes
locais concluídos. Tentativas de setup e seus motivos permanecem no recibo.
T07 será comprovada pelo parecer separado; T08–T11 continuam condicionadas
às provas pós-freeze da PR. O estado final deste plano será registrado no
recibo pós-merge, conservando este corte anterior à publicação.

## Conteúdo composto e provas locais

| PR | Entrega | HEAD imutável |
|---|---|---|
| #33 | Originais estudantis e matriz RTH | `9a2b757c32f28d2bb5ab505239c175b55fab9f20` |
| #34 | Avatar FR-015 / spec029 | `daebd71fef7168d4266ea9a6bb7c928ddc295e9b` |
| #35 | Metadata operacional e handoff / spec031 | `efd0bae2a3c4339373a3100717c5fe77345c4d02` |
| #36 | Foco em leituras assíncronas / spec032 | `ddd4e82477c03507808f03a6858137d72e3ac9cb` |
| #37 | Scheduler substituto LOCAL / spec034 | `2341275eac6c60054be00ef81b0e1a84619225ca` |
| #38 | Foco do alerta administrativo / spec033 | `1dbe3d42e6c4865ce0c49021f1cf98929c5a29ed` |
| #39 | Baseline e instrumento territorial / spec030 | `6b9ed579912ee9ca1590cff41779232ade40d966` |

Somente vercel.json colidiu; a resolução conservou a união nominal das guardas.
Os 157 paths não colidentes coincidem em modo/blob com as fontes. A branch da
prova combinada não foi incorporada; os seus 15 blobs app/UI coincidem.
O fingerprint de 595 paths do manifesto é um recorte explícito; o recibo de
testes define seu próprio recorte de 598, sem os confundir com a tree integral.

Os resultados próprios constam em [validacao-local.json](validacao-local.json);
o parecer pré-push estará em [revisao-independente.md](revisao-independente.md).
A [conclusão das seis instruções](conclusao-instrucoes-alunos.md) separa
execução, disposição ratificada e [atos externos pendentes](pendencias-operacionais.md).
Analyze/converge usam as seis specs existentes; não há spec artificial de produto.
Os testes não representam aceite assistivo humano ou qualificação hospedada.

A contenção usa a guarda exata da branch antes da primeira ref remota e
`development:false`. Não há true, wildcard novo ou mudança de configuração
externa. Inspeção de deployments é somente leitura, com janela e alcance
registrados no recibo remoto; não se afirma ausência universal. A semântica
da guarda foi conferida na [documentação Vercel](https://vercel.com/docs/project-configuration/git-configuration).
O protocolo do review segue [OpenAI Docs](https://developers.openai.com/codex/integrations/github).

Rollback de código, se posteriormente necessário, exige uma nova mudança
revisável por revert do merge, sob a autoridade aplicável. Não será executado
reset, force-push ou rollback destrutivo automático; este pacote não contém
mudanças de schema/dados a reverter.

IHFR mantém `CONTRATO_EXPERIMENTAL`, `VALIDACAO_CIENTIFICA_PENDENTE`,
`SUJEITO_A_RECALIBRACAO` e
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
