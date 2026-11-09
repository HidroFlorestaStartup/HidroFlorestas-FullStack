# Checklist: qualidade dos requisitos de privacidade

Purpose: avaliação de requisitos pelo revisor, antes implementação.
Created: 2026-10-25. Feature: [spec.md](../spec.md).
Ownership: [x] significa requisito avaliado, não implementação concluída.

- [x] CHK001 O limite offline e ausência de operações externas estão explícitos? [Clarity, FR-005]
- [x] CHK002 Campos permitidos e recusa de valores estão definidos? [Completeness, FR-001/003]
- [x] CHK003 Target/branch e conflito de escopo possuem semântica explícita? [Consistency, FR-002]
- [x] CHK004 O tratamento de erro impede ecoar canários/paths? [Coverage, FR-003/004]
- [x] CHK005 Presença completa é distinguida dos gates e validade? [Measurability, SC-003]
- [x] CHK006 Limites de tamanho/contagens e duplicatas estão especificados? [Edge cases, FR-003/plan]

Revisão independente por `/root/students`, 2026-10-25: seis critérios satisfeitos
nos requisitos, sem avaliar implementação. O achado de CHK002 foi tratado antes
do código: spec e modelo agora separam os 18 nomes operacionais de saída dos
cinco nomes de baseline aceitos somente na entrada, recusam outros nomes e
identificam a fonte por SHA/caminho completo com limite de publicação explícito.
Delta conferido pelo revisor; nenhum override solicitado ou aplicado.

Gerado por $speckit-checklist. $speckit-implement só lê os marcadores.
