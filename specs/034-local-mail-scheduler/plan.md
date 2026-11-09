# Implementation Plan: ensaio local de agendamento de mail

**Branch**: `test/hf-night-local-scheduler-20261025` | **Date**:2026-10-25
**Spec**: [spec.md](spec.md)

## Summary

Instrumento de teste sob demanda, sem código de produto. Servidor HTTP efêmero
127.0.0.1 chama o guard real com bearer gerado em memória e callback de fila falsa.
Substituto periódico limitado tem pausa/retomada e execução sequencial; não é job
da plataforma. Testes provam guard, fronteira de origem e contadores falsos.
Qualquer falha HTTP/transporte torna a instância terminal e bloqueia resume;
nenhum retry pode sobrepor callback servidor após timeout do cliente. Teardown
aguarda o callback falso conhecido, sem presumir que AbortSignal o cancelou.

## Technical Context

**Language/Version**: JavaScript ESM, Node24.19.0; import de TS erasable por
`--experimental-strip-types`, sem instalar dependências.
**Primary Dependencies**: node:http/crypto/assert/test/timers e trigger.ts real.
**Storage**: fila/contadores em memória; nenhuma escrita de dados.
**Testing**: node --experimental-strip-types --test tests/investigations/mail/local-scheduler.test.mjs.
**Target Platform**: Windows/Linux Node24; loopback próprio.
**Project Type**: instrumento interno de teste.
**Performance Goals**: ensaio de segundos, até20ticks, timeout750ms por chamada,
intervalo5–1000ms; teste limitado a10s. Nenhuma meta de produção.
**Constraints**: origem literal http://127.0.0.1:porta, path fixo, env real ausente,
sem DB/SMTP/provedor/host externo, timers encerrados e servidor próprio fechado.
**Scale/Scope**: cinco tarefas falsas, duas chamadas iniciais, pausa/retomada.

## Constitution Check

PASS pré/pós design: M05 autoriza instrumento; entrega pequena; spec034 própria;
evidência real/sintética separada; segredo em memória e métricas allowlisted;
docs/raw/contratos preservados; worktree e autoria exclusivas. Sem emenda/desvio.

## Project Structure

- tests/investigations/mail/local-scheduler-harness.mjs: substituto limitado.
- tests/investigations/mail/local-scheduler.test.mjs: servidor/guard real e cenários.
- specs/034-local-mail-scheduler/: artefatos de desenho/tarefas/evidências.
- vercel.json: somente guarda exata de publicação da coordenação.

## Phases

Spec→plan→checklist→tasks→analyze→revisão requisitos→implement→revisão independente→converge.
Primeiro teste RED por harness ausente; depois negativos de origem e ensaioHTTP.
Documentar limite: callback falso não prova claim/lease/SQL/SMTP/inbox real.
