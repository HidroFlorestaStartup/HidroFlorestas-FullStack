# Checklist de qualidade dos requisitos — scheduler sintético

Purpose: revisão independente antes do código;2026-10-25.
[Spec](../spec.md). [x] significa requisito avaliado, não teste aprovado.

- [x] CHK001 A origem estritamente local e recusa antes de efeitos estão definidas? [Scope,FR-001]
- [x] CHK002 Pausa/retomada, uma chamada em voo e teto de invocações são verificáveis? [Completeness,FR-002/SC-001]
- [x] CHK003 Guard real versus fila/aceite falsos e SMTP/inbox ausentes estão distinguidos? [Clarity,FR-003/005]
- [x] CHK004 Negativas, allowlist e ausência de segredo em recibo estão claras? [Coverage,FR-003/SC-002]
- [x] CHK005 Teardown e timeout têm limite sem tocar servidor alheio? [Edge cases,FR-004/SC-003]

Gerada por speckit-checklist; marcadores pertencem ao revisor.

Revisão independente de requisitos por `/root/fr015`, 2026-10-25, com ownership
delegado somente deste checklist. Cinco critérios satisfeitos após leitura de
spec/plan/tasks/contrato/modelo e guard real. A lacuna inicial sobre timeout e
sobreposição foi resolvida antes do código: FR-002/FR-004 e contrato exigem
fail-stop terminal em falha HTTP/transporte, recusam resume e distinguem abort
do cliente de término do callback servidor; teardown aguarda o fake conhecido.
Gate de escrita liberado. Nenhum teste ou runtime foi executado nesta revisão;
não prova worker/outbox SQL, SMTP/inbox ou os gates G3/G4/G5.
