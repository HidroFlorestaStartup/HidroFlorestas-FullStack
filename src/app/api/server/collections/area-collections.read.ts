import { prisma } from "@/app/api/server/lib/prisma";
import { AreaAccessError, authorizeLaboratoryAccess, validResourceId } from "@/app/api/server/areas/area.authorization";
import { projectAreaCollections } from "@/components/areas/area-collections-presentation";

/**
 * Scoped UI-036 read. Uses existing membership checks and the database's CURRENT
 * pointer, not historic diagnoses or the calculation/confirmation timestamp.
 * No shared DTO, repository, schema or scientific engine is changed.
 */
export async function readAreaCollections(actorId: string, laboratoryId: string, areaId: string) {
  return prisma.$transaction(async tx => {
    await authorizeLaboratoryAccess({ id: actorId }, laboratoryId, "READ_AREAS", tx);
    await authorizeLaboratoryAccess({ id: actorId }, laboratoryId, "READ_IHFR_DIAGNOSIS", tx);
    if (!validResourceId(areaId)) throw new AreaAccessError("NOT_FOUND");
    const area = await tx.collectionArea.findFirst({
      where: { id: areaId, laboratoryRoomId: laboratoryId },
      select: { id: true },
    });
    if (!area) throw new AreaAccessError("NOT_FOUND");
    const rows = await tx.collectionData.findMany({
      where: {
        collectionAreaId: areaId,
        laboratoryRoomId: laboratoryId,
        occurredAt: { not: null },
        occurrenceOffset: { not: null },
        confirmedAt: { not: null },
        confirmationKey: { not: null },
      },
      orderBy: [{ occurredAt: "desc" }, { id: "desc" }],
      select: {
        id: true,
        occurredAt: true,
        occurrenceOffset: true,
        confirmedAt: true,
        confirmationKey: true,
        currentExperimentalIHFRDiagnosis: {
          select: {
            diagnosis: { select: { id: true, displayScore: true, ihfrClass: true, scientificState: true } },
          },
        },
      },
    });
    return projectAreaCollections(rows);
  });
}
