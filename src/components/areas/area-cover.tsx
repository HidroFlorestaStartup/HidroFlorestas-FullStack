"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, RefreshCw, Trash2, Upload } from "lucide-react";
import { createClientUuid } from "@/lib/client-uuid";
import type { CoverDto, UploadTicket } from "@/app/api/server/images/contracts";
import styles from "./cover.module.css";

export function AreaCoverPreview({ apiPath, name, hasImage, revision, featureEnabled = false, retryAttempt = 0, onLoaded, onFailed }: {
  apiPath: string; name: string; hasImage: boolean; revision: number; featureEnabled?: boolean;
  retryAttempt?: number; onLoaded?: () => void; onFailed?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  // This counter retries browser content without changing the persisted revision.
  const src = `${apiPath}/content?revision=${revision}${retryAttempt > 0 ? `&retry=${retryAttempt}` : ""}`;
  return hasImage && featureEnabled && !failed ? (
    <Image unoptimized src={src} width={1200} height={800} alt={`Capa da área ${name}`}
      onLoad={onLoaded} onError={() => { setFailed(true); onFailed?.(); }} className={styles.preview} />
  ) : (
    <div className={styles.placeholder}>
      <ImageIcon aria-hidden="true" className={styles.placeholderIcon} />
      <span>{!hasImage ? "Área sem capa." : !featureEnabled ? "Capa indisponível enquanto o recurso está desabilitado." : "Capa indisponível."}</span>
    </div>
  );
}

class CoverRequestError extends Error {
  constructor(message: string, readonly code: string) { super(message); }
}

async function jsonRequest(path: string, method: string, body?: unknown) {
  const response = await fetch(path, {
    method, cache: "no-store",
    ...(body !== undefined ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {}),
  });
  const value = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new CoverRequestError(value?.error?.message ?? "Não foi possível concluir esta operação.", value?.error?.code ?? "INTERNAL_ERROR");
  return value;
}

function directUpload(ticket: UploadTicket, file: File, onProgress: (n: number) => void) {
  const url = new URL(ticket.upload.url);
  if (url.protocol !== "https:" || url.hostname !== "api.cloudinary.com" || !/^\/v1_1\/[-\w]+\/image\/upload$/.test(url.pathname)) throw new Error("Destino de envio inválido.");
  return new Promise<void>((resolve, reject) => {
    const request = new XMLHttpRequest(), body = new FormData();
    Object.entries(ticket.upload.params).forEach(([key, value]) => body.append(key, value));
    body.append("file", file);
    request.open("POST", url.toString());
    request.timeout = 60000;
    request.upload.onprogress = event => { if (event.lengthComputable) onProgress(Math.round(event.loaded / event.total * 100)); };
    request.onload = () => request.status >= 200 && request.status < 300 ? resolve() : reject(new Error("Não foi possível verificar o envio."));
    request.onerror = () => reject(new Error("Falha de conexão durante o envio."));
    request.ontimeout = () => reject(new Error("O envio não respondeu a tempo."));
    request.send(body);
  });
}

type PendingUpload = { key: string; ticket: UploadTicket | null; expectedRevision: number | null };
type PreviewPurpose = "reload" | "save";

function newPendingUpload(): PendingUpload {
  return { key: createClientUuid(), ticket: null, expectedRevision: null };
}

export function AreaCoverEditor({ laboratoryId, areaId, name }: { laboratoryId: string; areaId: string; name: string }) {
  const apiPath = `/api/laboratories/${laboratoryId}/areas/${areaId}/image`;
  const [data, setData] = useState<CoverDto | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Carregando capa…");
  // Only a completed byte load (or confirmed removal) has positive feedback.
  const [positiveStatus, setPositiveStatus] = useState(false);
  const lock = useRef(false), pending = useRef<PendingUpload>(newPendingUpload());
  const fileInput = useRef<HTMLInputElement>(null), selection = useRef(0);
  const [previewAttempt, setPreviewAttempt] = useState(0);
  const previewSequence = useRef(0);
  const pendingPreview = useRef<{ attempt: number; purpose: PreviewPurpose } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(apiPath, { cache: "no-store", signal: controller.signal }).then(async response => {
      const value = await response.json();
      if (!response.ok) throw Error();
      if (!controller.signal.aborted) { setData(value); setMessage(""); }
    }).catch(() => {
      if (!controller.signal.aborted) { setError("Não foi possível carregar a capa."); setMessage(""); }
    });
    return () => controller.abort();
  }, [apiPath]);

  function startPreview(current: CoverDto, purpose: PreviewPurpose) {
    const attempt = ++previewSequence.current;
    pendingPreview.current = current.image.hasImage && current.featureEnabled ? { attempt, purpose } : null;
    setData(current);
    setPositiveStatus(false);
    setPreviewAttempt(attempt);
    if (purpose === "save") {
      setMessage(!current.image.hasImage ? "Envio confirmado. A área está sem capa no estado atual."
        : !current.featureEnabled ? "Envio confirmado. A visualização da capa está desabilitada neste momento."
          : "Capa confirmada. Carregando imagem…");
    } else {
      setMessage(!current.featureEnabled ? "As capas de áreas estão desabilitadas neste momento."
        : current.image.hasImage ? "Tentando recarregar a capa…" : "Área sem capa.");
    }
  }

  function finishPreview(attempt: number, loaded: boolean) {
    const operation = pendingPreview.current;
    if (!operation || operation.attempt !== attempt) return;
    pendingPreview.current = null;
    setPositiveStatus(loaded);
    setMessage(operation.purpose === "save"
      ? loaded ? "Capa salva." : "Capa confirmada, mas a imagem ainda está indisponível. Recarregue a capa."
      : loaded ? "Capa recarregada." : "Capa ainda indisponível. Tente novamente.");
  }

  async function select(selected: File | undefined) {
    const token = ++selection.current;
    pendingPreview.current = null;
    setError(""); setMessage(""); setFile(null); setPositiveStatus(false);
    pending.current = newPendingUpload();
    if (!selected) return;
    try {
      if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type) || selected.size === 0 || selected.size > 10 * 1024 * 1024) throw Error();
      const bitmap = await createImageBitmap(selected);
      const valid = bitmap.width <= 4096 && bitmap.height <= 4096;
      bitmap.close();
      if (token !== selection.current) return;
      if (!valid) throw Error();
      setFile(selected);
      setMessage("Imagem selecionada. Confirme o envio para salvar a capa.");
    } catch {
      if (token === selection.current) setError("Use JPEG, PNG ou WebP até 10 MiB e 4096 pixels por lado.");
    }
  }

  async function upload() {
    if (!file || !data?.canEdit || !data.featureEnabled || lock.current) return;
    lock.current = true;
    pendingPreview.current = null;
    setBusy(true); setError(""); setProgress(0); setPositiveStatus(false);
    try {
      // The original command survives uncertain responses and preview reloads.
      pending.current.expectedRevision ??= data.image.revision;
      if (!pending.current.ticket) pending.current.ticket = await jsonRequest(`${apiPath}/uploads`, "POST", {
        expectedRevision: pending.current.expectedRevision, key: pending.current.key,
      }) as UploadTicket;
      const ticket = pending.current.ticket;
      setMessage("Enviando imagem…");
      // A lost upload response can still have stored the expected asset. Only
      // server confirmation reconciles it; provider metadata is not authoritative.
      try { await directUpload(ticket, file, setProgress); }
      catch { setMessage("Verificando o resultado do envio…"); }
      setMessage("Validando imagem…");
      const current = await jsonRequest(`${apiPath}/uploads/${ticket.attemptId}/confirm`, "POST", {}) as CoverDto;
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      pending.current = newPendingUpload();
      // Persistence is confirmed; byte loading is a separate, current attempt.
      startPreview(current, "save");
    } catch (caught) {
      if (caught instanceof CoverRequestError && ["EXPIRED", "STALE_REVISION"].includes(caught.code)) pending.current = newPendingUpload();
      setError(caught instanceof Error ? caught.message : "Falha ao enviar imagem.");
      setMessage("O preenchimento foi preservado. Recarregue se a capa mudou em outra sessão.");
    } finally { lock.current = false; setBusy(false); }
  }

  async function reload() {
    if (lock.current) return;
    lock.current = true; setBusy(true); setPositiveStatus(false);
    pendingPreview.current = null;
    try {
      const current = await jsonRequest(apiPath, "GET") as CoverDto;
      setError("");
      // Metadata/content retries must not discard an uncertain upload attempt.
      startPreview(current, "reload");
    } catch {
      setError("Não foi possível recarregar a capa.");
      setMessage("Tente recarregar a capa novamente.");
    }
    finally { lock.current = false; setBusy(false); }
  }

  async function remove() {
    if (!data?.canEdit || !data.featureEnabled || lock.current || !window.confirm("Remover a capa desta área?")) return;
    lock.current = true; setBusy(true); setError(""); setPositiveStatus(false);
    // Accepted removal retires the earlier preview and its announcement.
    pendingPreview.current = null; setMessage("");
    let removalConfirmed = false;
    try {
      await jsonRequest(apiPath, "DELETE", { expectedRevision: data.image.revision });
      removalConfirmed = true;
      pendingPreview.current = null;
      pending.current = newPendingUpload();
      setData(await jsonRequest(apiPath, "GET") as CoverDto);
      setMessage("Capa removida."); setPositiveStatus(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível remover.");
      if (removalConfirmed) setMessage("Remoção confirmada. Recarregue para atualizar a visualização.");
    } finally { lock.current = false; setBusy(false); }
  }

  return (
    <section aria-label="Capa da área" className={styles.editor}>
      <AreaCoverPreview key={`${areaId}:${data?.image.revision ?? 0}:${data?.featureEnabled ?? false}:${previewAttempt}`}
        apiPath={apiPath} name={name} hasImage={data?.image.hasImage ?? false} revision={data?.image.revision ?? 0}
        featureEnabled={data?.featureEnabled ?? false} retryAttempt={previewAttempt}
        onLoaded={() => finishPreview(previewAttempt, true)} onFailed={() => finishPreview(previewAttempt, false)} />
      <div className={styles.body}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Capa da área</h2>
          <p className={styles.description}>Visível à equipe autorizada deste laboratório.</p>
        </div>
        {data && !data.featureEnabled && message !== "As capas de áreas estão desabilitadas neste momento." && <p className={styles.notice}>As capas de áreas estão desabilitadas neste momento.</p>}
        {error && <p role="alert" className={styles.error}>{error}</p>}
        <p role="status" aria-live="polite" className={positiveStatus ? styles.feedback : styles.neutral}>{message}</p>
        {busy && file && <progress aria-label="Progresso do envio da capa" value={progress} max={100} className={styles.progress} />}
        {data?.canEdit && data.featureEnabled && <>
          <div className={styles.field}>
            <label htmlFor={`cover-${areaId}`}>{data.image.hasImage ? "Substituir capa" : "Selecionar capa"}</label>
            <input ref={fileInput} id={`cover-${areaId}`} type="file" accept="image/jpeg,image/png,image/webp" disabled={busy}
              onChange={event => void select(event.target.files?.[0])} className={styles.file} />
            <p className={styles.hint}>JPEG, PNG ou WebP; até 10 MiB e 4096 pixels por lado. Metadados serão removidos.</p>
          </div>
          <div className={styles.actions}>
            <button type="button" disabled={busy || !file} onClick={() => void upload()} className={`${styles.button} ${styles.primary}`}>
              <Upload aria-hidden="true" size={18} />{busy ? "Aguarde…" : error && file ? "Tentar envio novamente" : "Enviar capa"}
            </button>
            {data.image.hasImage && <button type="button" disabled={busy} onClick={() => void remove()} className={`${styles.button} ${styles.danger}`}>
              <Trash2 aria-hidden="true" size={18} />Remover capa
            </button>}
          </div>
        </>}
        <div className={styles.reload}>
          <button type="button" disabled={busy} onClick={() => void reload()} className={`${styles.button} ${styles.outline}`}>
            <RefreshCw aria-hidden="true" size={18} />Recarregar capa
          </button>
        </div>
      </div>
    </section>
  );
}
