import { prisma } from "@/app/api/server/lib/prisma";
import { AreaAccessError, authorizeLaboratoryAccess, validResourceId } from "@/app/api/server/areas/area.authorization";
import type { IHFRRouteContext } from "@/types/ihfr-diagnosis.type";

/**
 * Presence only: confirmed measurement rows remain present even if their
 * version differs from the active evaluator. Never parse, mutate or evaluate
 * the scientific payload in the collection metadata view.
 */
export async function readConfirmedEnvironmentalPresence(actorId: string, context: IHFRRouteContext): Promise<boolean> {
  return prisma.$transaction(async tx => {
    await authorizeLaboratoryAccess({ id: actorId }, context.laboratoryId, "READ_ENVIRONMENTAL_DATA", tx);
    if (![context.laboratoryId, context.areaId, context.collectionId].every(validResourceId)) {
      throw new AreaAccessError("NOT_FOUND");
    }
    const record = await tx.collectionData.findFirst({
      where: {
        id: context.collectionId,
        collectionAreaId: context.areaId,
        laboratoryRoomId: context.laboratoryId,
        occurredAt: { not: null },
        occurrenceOffset: { not: null },
        confirmedAt: { not: null },
        confirmationKey: { not: null },
      },
      select: { environmentalMeasurementSet: { select: { id: true } } },
    });
    if (!record) throw new AreaAccessError("NOT_FOUND");
    return record.environmentalMeasurementSet !== null;
  });
}
