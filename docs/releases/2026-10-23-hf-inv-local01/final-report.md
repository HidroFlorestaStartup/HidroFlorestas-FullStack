# Entrega investigativa para revisão do mantenedor

Missão `HF-INV-20261023-01-LOCAL01`, execução local de23/10/2026, base
`c4adfb379e5dc78f27f31b91edbd13f43228d9f9`. **Os experimentos locais foram
concluídos; a conclusão da candidata publicada depende dos recibos oficiais de
CI/review do HEAD final na conversa da PR.** Este documento foi preparado antes
desses fatos posteriores, sem antecipar PASS ou criar commit autorreferente.

NAV4 tem causa de configuração/ingresso demonstrada na reprodução atual,
jornada autenticada e original4/4PASS. O setup correto conserva CSRF e o contrato
existente. Os quatro FAIL Linux antigos não foram apagados nem receberam os
status das sondas posteriores. Os demais protocolos concluíram sem demonstrar
defeito novo de produto; causas históricas permanecem limitadas na
[matriz dos nove IDs](incident-matrix.md). Não se declara “todas as intermitências
resolvidas”. A investigação não homologa o piloto.

A revisão CLI identificou e motivou a [correção documental P2 da classificação
HTTP](review/http-classification-errata.md): os15GETs de rota200 de B não são
15documentos capturados, pois podem incluir RSC. Os recibos originais permanecem
verificáveis; a prova atual B é6casos UI PASS/rodada, enquanto C observou dois
documentos200 separadamente. O novo HEAD tem validação/revisão próprias nos
recibos da PR, sem herdar o parecer sem findings do HEAD52cdf6e anterior.

## Conteúdo e proveniência

- [Plano único](../../plans/active/investigacoes-intermitentes-20261023/execucao-local-multiagente.md),
  [preflight](preflight.json), [ambiente/protocolos](environment-and-protocols.md)
  e [ledger de quatro agentes nativos reais](agent-ledger.json).
- [NAV4/contas](nav4/readme.md), [IHFR/duas chamadas](ihfr/results.md),
  [navegação/mapa/OBS](navigation/report.md) e fontes/recibos estreitos correspondentes.
- [Validação e gates](validation.md), [revisões/limites](review.md) e
  [handoff em português](operational-handoff.md), sem envio de e-mail.

Codex CLI0.162.0-alpha.17.2; configuração local verificada gpt-6.1-sol/ultra,
sem alterar configuração global. As quatro criações nativas aceitaram esforço
ultra; a sessão comportou três subagentes simultâneos além da coordenação.
Metadados efetivos do runtime raiz não são expostos; não se afirma troca de
modelo que a ferramenta não confirmou. Cada frente teve worktree/instalação,
client gerado e recursos próprios; portas fixas foram serializadas.

Os commits de A/B/C foram integrados por cherry-pick normal na branch
`fix/investigacoes-intermitentes-20261023-local01`. O ledger mapeia SHAs locais
dos autores aos commits da candidata; não pressupõe que commits locais dos
agentes estejam publicados. Main, development, branches de Pedro, oito entradas
não rastreadas iniciais e worktrees anteriores foram preservados.

## Resultado e critérios

| Gate | Evidência deste fechamento estático |
|---|---|
| M0 | Refs/fontes/ownership reconciliados, preservação e contenção antes do push |
| M1 | Plano transversal/protocolos mantidos; skills Spec Kit consultadas; nenhuma correção funcional/contrato oficial exigiu spec fictícia |
| M2 | Nove IDs com protocolos, resultados e limites; NAV4 autenticado; fonte original INV-005 recuperada |
| M3 | Correções da preparação/instrumentação demonstradas; nenhum patch especulativo de produto ou mudança de ciência |
| M4 | Testes locais pertinentes concluídos; quinze gates oficiais do HEAD final a confirmar no recibo remoto |
| M5 | Revisão cruzada e D; CLI/Codex final a confirmar por SHA, sem fingir conclusão |
| M6 | Conteúdo estático pronto; push/PR/comentários e identidade remota a registrar depois da publicação |

Typecheck/lint/diff/JSON/links/hashes e os quinze gates são registrados com seu
alcance real em [validação](validation.md) e nos recibos posteriores. Contagens
de subconjuntos/repetições não são somadas como novos casos. Os negativos de
infraestrutura e controles deliberados permanecem separados de falha natural.
Não foram removidos retries0, timeouts, controles de origem ou ownership.

## PRs existentes, operação e decisão humana

#27 permanece em223839c9, revisão concluída sem findings às07:16:20UTC; sua CI
funcional é NOT_RUN. #28 permanece emf56f73f, preparação usada por fonte imutável;
a branch e os arquivos de seu autor não foram alterados. Os comentários factuais
de reconciliação apontam à PR nova. Não se repetiu review concluído da #27.

O mantenedor decide merge/aceites. G3–G5 continuam exigindo suas provas próprias;
nenhum banco/provedor/env hospedado foi operado. O PostgreSQL local anterior da
55427 foi parado ordenadamente sob nova autorização explícita do usuário, com
dados preservados. Clusters/servidores próprios foram encerrados; worktrees e
privados sintéticos ficam preservados. O recibo final registra o estado real
dos agentes e jobs, sem promessa de monitoramento fora da sessão.

O plano conserva `AGUARDANDO_REVISAO` quando a candidata estiver entregue ao
mantenedor. A conclusão técnica investigativa não é aprovação científica,
universalidade do IHFR ou liberação do piloto: `CONTRATO_EXPERIMENTAL`,
`VALIDACAO_CIENTIFICA_PENDENTE`, `SUJEITO_A_RECALIBRACAO`,
`NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO`.
