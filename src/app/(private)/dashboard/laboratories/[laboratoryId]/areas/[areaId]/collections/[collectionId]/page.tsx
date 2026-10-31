import { notFound, redirect } from "next/navigation";

import { AuthBoundaryError, requireAuth } from "@/app/api/server/middlewares/auth.middleware";
import { CollectionServiceError, collectionsService } from "@/app/api/server/services/collections.service";
import { CollectionDetail } from "@/components/collections/collection-detail";
import { ExperimentalDiagnosisSummary } from "@/components/ihfr-diagnosis/experimental-diagnosis-summary";
import { NoCurrentDiagnosis } from "@/components/ihfr-diagnosis/no-current-diagnosis";
import { IHFRDiagnosisManagement } from "@/components/ihfr-diagnosis/ihfr-diagnosis-management";
import { ihfrDiagnosisService } from "@/app/api/server/services/ihfr-diagnosis.service";
import { readConfirmedEnvironmentalPresence } from "@/app/api/server/collections/collection-environmental-presence.read";
import { authorizeLaboratoryAccess } from "@/app/api/server/areas/area.authorization";

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ laboratoryId: string; areaId: string; collectionId: string }>;
}) {
  let collection;
  let diagnosis;
  let environmentalConfirmed = false;
  let canManage = false;
  let diagnosisContext: { laboratoryId: string; areaId: string; collectionId: string };
  try {
    const principal = await requireAuth();
    const { laboratoryId, areaId, collectionId } = await params;
    diagnosisContext = { laboratoryId, areaId, collectionId };
    const result = await collectionsService.detail(principal.id, laboratoryId, areaId, collectionId);
    collection = result.collection;
    environmentalConfirmed = await readConfirmedEnvironmentalPresence(principal.id, { laboratoryId, areaId, collectionId });
    diagnosis = await ihfrDiagnosisService.readCurrent(principal.id, { laboratoryId, areaId, collectionId });
    const access = await authorizeLaboratoryAccess({ id: principal.id }, laboratoryId, "READ_IHFR_DIAGNOSIS");
    canManage = access.status === "ACTIVE" && access.membershipRole !== "MEMBER";
  } catch (error) {
    if (error instanceof AuthBoundaryError && error.code === "UNAUTHORIZED") redirect("/login");
    const code = error && typeof error === "object" && "code" in error ? String(error.code) : null;
    if ((error instanceof CollectionServiceError || code === "NOT_FOUND") && code === "NOT_FOUND") notFound();
    throw new Error("Não foi possível carregar a coleta.");
  }
  return (
    <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
      <CollectionDetail collection={collection} hasConfirmedEnvironmentalData={environmentalConfirmed} />
      <div className="min-w-0 space-y-6">
        {canManage
          ? <IHFRDiagnosisManagement key={diagnosisContext!.collectionId} context={diagnosisContext!} initialDiagnosis={diagnosis} />
          : diagnosis
            ? <ExperimentalDiagnosisSummary diagnosis={diagnosis} />
            : <NoCurrentDiagnosis />}
      </div>
    </div>
  );
}
