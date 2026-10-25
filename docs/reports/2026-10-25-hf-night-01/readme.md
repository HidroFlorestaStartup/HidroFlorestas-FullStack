# HF-NIGHT-01 — handoff técnico

Checkpoint em andamento, 2026-10-25 (America/Sao_Paulo). Este arquivo será
concluído após QA/instrumentação e correção de foco, com revisão independente.
Não representa encerramento antecipado da missão.

`BASE_INITIAL=08262dc57c1ad365244f9ec6902b1e4be39e2d7d`.
Última reconfirmação remota conserva development nessa base e
`main=beba96fbf6bbaac8771dbb29abea2f9f8f5b0054`; `MAIN_CHANGED=NO`.
`MERGE=NONE_OF_NEW_PRS; DEPLOY=NONE`.
Operações hospedadas mutantes de banco/SMTP/provedor: `NONE`.
Publicação Git/PR/comentários: autorizada expressamente e discriminada abaixo.

## Entregas e revisões por SHA

| Frente | Commit publicado / PR Draft | Revisão e validação |
|---|---|---|
| M01/M06 — estudantes | [9a2b757 / #33](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/33) | 4originais byte-idênticos,206docs#27 iguais na base; revisão local /root PASS; Codex completed no SHA exato sem findings observados |
| M02 — popup FR-015 | [daebd71 / #34](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/34) | Spec029;RED4FAIL/1PASS→browser6PASS;unit9/lint/typecheckPASS;revisor rerun6PASS;Codex completed no SHA exato sem findings observados |
| M05 — presença offline | [c7b1638 / #35](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/35) | Spec031;5testesPASS,revista/reexecutada independentemente;18ausências em metadados;Codex completed apenas no commit inicial |
| M03 — QA/instrumentos | Branch local test/hf-night-baseline-20261025 | Baseline e spec030 em execução; sem resultado final presumido |
| M04/M07 — foco assíncrono | [ddd4e82 / #36](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/36) | Spec032 completa;autor27PASS24.8s,revisor/root27PASS36.1s;Codex completed sem findings no SHA exato |
| M04/M07 — alerta administrativo | Branch local fix/hf-night-admin-focus-20261025 | Defeito real403 reproduzido em1/10focais;spec033/gate antes do código;sem alterar baselineQA |

O [ledger](review-ledger.json) guarda SHAs completos, IDs dos pedidos únicos,
resumos/recibos e limites. As revisões de c7b1638 não são transferidas ao
novo commit que vier a conter este handoff. Nenhum Draft será convertido em
Ready para disparar review; nenhum merge está autorizado.

## Encerramento das recomendações estudantis

Fonte preservada: `d2168c840937a6120e32467f24cb46383e8dcd29` e os quatro
originais na [PR#33](https://github.com/HidroFlorestaStartup/HidroFlorestas-FullStack/pull/33).
Identidade humana não inferida por metadata de conta/commit; títulos/crédito
original conservados, síntese atual atribuída ao agente documental.

| Item | Estado / evidência | Lacuna restante | Responsável futuro |
|---|---|---|---|
| RTH-P2-001 | INFERENCIA — RESOLVIDO_DOCUMENTALMENTE: C1/matriz40 e4apontadores em development08262dc, conferidos na PR33 | Aceites funcionais/humanos/operação/ciência continuam separados;FR015 tem PR34 própria | A_DESIGNAR para aceites |
| RTH-P2-002 | INFERENCIA — TRATADO_POR_COMPOSICAO_FOCAL: merges29–32 e206blobs#27 preservados;#28 inventariada por SHA | Três docs novos#28 ausentes e dois adendos preexistentes distintos;destino de27/28 depende decisão específica | A_DESIGNAR, mantenedor |
| RTH-P3-001 | DOCUMENTADO_SOB_DEMANDA: protocolos/seletores/limites na PR33;QA amplia prova atual em030 | Investigações não são cobertura automática;sem promoção global a CI | A_DESIGNAR para manutenção/custo |
| RTH-P3-002 | PROPOSTA_DE_LIMPEZA_FASEADA: listas19filtros/predicados e27guardas inventariadas na PR33 | Consumidores/reruns externos não comprovados;nenhuma limpeza autorizada/executada | A_DESIGNAR, mantenedor/plataforma |

Os estados inferidos são conclusões documentais delimitadas, não decisões
humanas. #27/#28 permanecem OPEN; #29–#32 não foram recriadas/reintegradas.

## Spec Kit e isolamento

`SPEC_KIT=ACTUAL_COMMANDS_USED`: skills instaladas em .agents/skills,
versão1.0.4, constituição1.0.0 sem emenda; specify/plan/checklist/tasks/analyze/
implement/converge nas features concluídas, com scripts Bash reais e artefatos
por feature;030/033 ainda estão em execução neste checkpoint.
Esclarecimento dispensado quando escopo inequívoco; extensão bug/hooks ausentes.
Documentação pura usa plano proporcional e rastreabilidade, sem feature artificial.

Agentes nativos: `/root` coordenação; `/root/fr015` autoria029/032;
`/root/qa` baseline/030; `/root/students` preservação/revisão031;
`/root/fr015/focus_review` revisão somente leitura da triagem032,0cenários
próprios, sem edição. Quatro subagentes reais ao longo das ondas e máximo
quatro participantes concorrentes incluindo coordenação, conforme ferramenta.
Três primeiros subagentes configurados gpt-6.1-sol/ultra; revisor filho herda
o autor. O esforço do coordenador não tem seletor verificável exposto.

Worktrees novas em .worktrees/fr015,qa,students,af,admin, com branches próprias da
base atual; coordenação na worktree original. Worktrees/alterações anteriores
preservadas. Nenhum reset/clean/stash/remoção. Instalações/gerados/saídas privadas
ficam ignorados; .worktrees é diretório local não staged no checkout coordenador.
Autoria exclusiva: autores não editam outros caminhos, salvo checklists revisadas
e pareceres explicitamente delegados; coordenador é única autoridade de push/PR.

## Limites e próximos passos em execução

- QA preserva falhas de ambiente, interrupção E2E97/220 e possíveis GETs de
  tiles públicos não observados integralmente; não afirma zeroegress universal.
  Reexecuções passam URL de tiles loopback, sem mudar assertions/gates.
- Reflow/teclado automatizados não equivalem a zoom real, leitor de tela ou
  aceite humano. HUMAN_ASSISTIVE_ACCEPTANCE_PENDING.
- [G3–G5](ops/runbook.md): BLOCKED; owners/destino,DBisolado/backup/restore,
  SMTP/inbox/scheduler,capas,jornadas,UX/suporte/piloto dependem autorização humana.
- IHFR: CONTRATO_EXPERIMENTAL;VALIDACAO_CIENTIFICA_PENDENTE;
  SUJEITO_A_RECALIBRACAO;NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO.

Continuar baseline, concluir instrumentos/restore sintéticos e foco033,
revisar os deltas independentemente, publicar com guarda exata e solicitar
Codex uma vez por novo SHA. Este checkpoint não concede PASS às tarefas pendentes.
