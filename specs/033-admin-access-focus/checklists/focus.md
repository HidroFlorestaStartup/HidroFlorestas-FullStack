# Checklist: qualidade dos requisitos de foco e descarte

Purpose: gate de requisitos pelo revisor antes de implementação. Data: 2026-10-25.
Feature: [spec.md](../spec.md). Gerado por speckit-checklist.
Ownership: coordenador/revisor; [x] significa requisito avaliado, não código pronto.

- [x] CHK001 O destino do foco e a necessidade de alerta materializado estão claros para 401/403/404 de ambas as leituras? [Clarity, FR-001/004]
- [x] CHK002 Ocorrência repetida com texto igual está distinguida de re-renderização sem novo resultado? [Completeness, FR-002]
- [x] CHK003 Cancelamento/remoção de dados e ausência de foco tardio estão definidos para respostas simultâneas, superadas e desmontagem? [Coverage, FR-003/005]
- [x] CHK004 Servidor, autorização, API, sessão, schema e operações persistidas estão explicitamente fora do patch? [Scope, FR-005]
- [x] CHK005 Prova sintética e reprodução QA são separadas de causalidade universal, homologação e aceite humano? [Evidence, FR-006/SC-003]
- [x] CHK006 Assertions/timeouts/retries existentes são preservados e sucesso/ausência de efeito indevido são mensuráveis? [Measurability, SC-001/002/003]

Autor não marca esta checklist; speckit-implement deve ler o gate e aguardar revisão.

Revisão independente de requisitos por /root, 2026-10-25: seis critérios satisfeitos após leitura de spec/plan/tasks/contrato. As seis combinações status/leitura, ocorrências idênticas, cancelamento e ausência de foco tardio estão explícitos. Controle do scheduler mantém rAF nativo e será classificado como sintético; causa real ainda não foi provada. Gate liberado para implementação, sem alterar assertions existentes ou contrato de autorização.
