import styles from "./environmental.module.css";
import { formatCollectionOccurrence } from "@/lib/collection-date-time";
import Link from "next/link";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import {
  AuthBoundaryError,
  requireAuth,
} from "@/app/api/server/middlewares/auth.middleware";
import { collectionsService } from "@/app/api/server/services/collections.service";
import { environmentalDataService } from "@/app/api/server/services/environmental-data.service";
import type { EnvironmentalContext } from "@/types/environmental-data.type";
import { EnvironmentalDetail } from "./environmental-data-detail";
import { EnvironmentalForm } from "./environmental-data-form";
import { environmentalDraftService } from "@/app/api/server/environmental-data/draft.service";
import { EnvironmentalDraftActions } from "./environmental-draft-actions";

export async function EnvironmentalDataPage({
  params,
  registration = false,
}: {
  params: Promise<EnvironmentalContext>;
  registration?: boolean;
}) {
  const ids = await params;
  let collection;
  let data;
  let draft;

  try {
    const principal = await requireAuth();
    collection = (
      await collectionsService.detail(
        principal.id,
        ids.laboratoryId,
        ids.areaId,
        ids.collectionId,
      )
    ).collection;
    data = (await environmentalDataService.detail(principal.id, ids))
      .environmentalData;
    draft = await environmentalDraftService.detail(principal.id, ids);
  } catch (error) {
    if (error instanceof AuthBoundaryError && error.code === "UNAUTHORIZED") {
      redirect("/login");
    }
    const code =
      error && typeof error === "object" && "code" in error
        ? String(error.code)
        : null;
    if (code === "NOT_FOUND") notFound();
    throw new Error("Não foi possível carregar os dados ambientais.");
  }

  const collectionPath = `/dashboard/laboratories/${ids.laboratoryId}/areas/${ids.areaId}/collections/${ids.collectionId}`;
  const basePath = `${collectionPath}/environmental-data`;

  return (
    <article
      aria-labelledby="environmental-title"
      className={styles.page}
    >
      <Link
        href={collectionPath}
        className={styles.back}
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Voltar à coleta
      </Link>
      <header>
        <p className="text-sm font-semibold text-green-700">
          Monitoramento ambiental
        </p>
        <h1
          id="environmental-title"
          className={styles.title}
        >
          {registration && !data
            ? "Registrar dados ambientais"
            : "Dados ambientais da coleta"}
        </h1>
        <p className="mt-2 text-slate-600">
          Observações de campo vinculadas à sua origem.
        </p>
      </header>
      <section
        aria-label="Origem da coleta"
        className={styles.card}
      >
        <div className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
          <ClipboardList size={20} aria-hidden="true" />
          Coleta de origem
        </div>
        <dl className={styles.context}>
          <div>
            <dt className="text-slate-500">Laboratório</dt>
            <dd className="font-semibold">{collection.laboratory.name}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Área</dt>
            <dd className="font-semibold">{collection.area.name}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Coleta</dt>
            <dd className="break-all">{collection.id}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Ocorrência em campo</dt>
            <dd>{formatCollectionOccurrence(collection.occurredAt)}</dd>
          </div>
        </dl>
      </section>
      {collection.readOnly && (
        <p
          role="status"
          className={styles.notice}
        >
          Laboratório inativo — somente leitura.
        </p>
      )}
      {registration && !data && !collection.readOnly ? (
        <EnvironmentalForm
          apiPath={basePath.replace("/dashboard/", "/api/")}
          basePath={basePath}
          initialDraft={draft}
        />
      ) : (
        <EnvironmentalDetail
          data={data}
          readOnly={collection.readOnly}
          basePath={basePath}
        />
      )}
      {draft && (!registration || data || collection.readOnly) && <EnvironmentalDraftActions apiPath={basePath.replace("/dashboard/", "/api/")} initialDraft={draft} readOnly={collection.readOnly} />}
    </article>
  );
}
