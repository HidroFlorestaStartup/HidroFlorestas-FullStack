"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, History, RefreshCw, Search, ShieldCheck, UserCog, Users } from "lucide-react";
import type { AdminUserDto, AdminUserRole, AdminUserStatus, AuditEventDto } from "@/app/api/server/user-administration/user-administration.contracts";
import { adminUserQuery, mergeUniquePage } from "./user-list-state";
import { administrationChangeBody, createAdministrationReadScope, type AdministrationChange } from "./user-administration-presentation";

type UserPage = { items: AdminUserDto[]; nextCursor: string | null };
type AdministrationError = { code?: string; message?: string; recovery?: string };
type SelectionError = { message: string };
const roles: AdminUserRole[] = ["USER", "ADMIN", "DEVELOPER", "MODERATOR"];
const statuses: AdminUserStatus[] = ["ACTIVE", "PENDING", "INACTIVE", "BLOCKED"];
const labels: Record<AdminUserRole | AdminUserStatus, string> = {
  USER: "Usuário", ADMIN: "Administrador", DEVELOPER: "Desenvolvedor", MODERATOR: "Moderador",
  ACTIVE: "Ativa", PENDING: "Pendente", INACTIVE: "Inativa", BLOCKED: "Bloqueada",
};
const tones: Record<AdminUserStatus, string> = {
  ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-800", PENDING: "border-amber-200 bg-amber-50 text-amber-900",
  INACTIVE: "border-slate-200 bg-slate-100 text-slate-700", BLOCKED: "border-rose-200 bg-rose-50 text-rose-800",
};
const secondaryButton = "inline-flex min-h-11 min-w-0 max-w-full [overflow-wrap:normal] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-[12px] py-2 sm:px-3 text-sm font-semibold text-slate-700 hover:border-emerald-600 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
const inputStyle = "min-h-11 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:opacity-60";

export function UserAdministrationPage() {
  const [page, setPage] = useState<UserPage | null>(null);
  const [selected, setSelected] = useState<AdminUserDto | null>(null);
  const [audit, setAudit] = useState<AuditEventDto[]>([]);
  const [auditNext, setAuditNext] = useState<string | null>(null);
  const [auditState, setAuditState] = useState<"idle" | "loading" | "error">("idle");
  const [auditRetryCursor, setAuditRetryCursor] = useState<string>();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [cursorStack, setCursorStack] = useState<Array<string | undefined>>([undefined]);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [listError, setListError] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  // An accepted occurrence remains distinct even when its public text repeats.
  const [selectionError, setSelectionError] = useState<SelectionError | null>(null);
  const [dialog, setDialog] = useState<AdministrationChange | null>(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [conflict, setConflict] = useState<AdministrationError>();
  const [reviewMessage, setReviewMessage] = useState("");
  const [listReads] = useState(createAdministrationReadScope);
  const [detailReads] = useState(createAdministrationReadScope);
  const [auditReads] = useState(createAdministrationReadScope);
  const selectedId = useRef<string | null>(null);
  const busyRef = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const selectionErrorRef = useRef<HTMLDivElement>(null);
  const currentSelectionError = useRef<SelectionError | null>(null);
  const conflictRef = useRef<HTMLDivElement>(null);
  const detailHeadingRef = useRef<HTMLHeadingElement>(null);
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);

  const clearSelection = useCallback(() => {
    currentSelectionError.current = null;
    selectedId.current = null;
    detailReads.cancel();
    auditReads.cancel();
    setSelected(null);
    setDetailLoading(false);
    setDetailError("");
    setAudit([]);
    setAuditNext(null);
    setAuditState("idle");
    setDialog(null);
  }, [detailReads, auditReads]);

  useEffect(() => {
    // The conditional alert must be committed before its ref can receive focus.
    if (selectionError && currentSelectionError.current === selectionError) selectionErrorRef.current?.focus();
  }, [selectionError]);

  function unavailableAccount(userId: string, responseStatus: number) {
    clearSelection();
    listReads.cancel();
    setLoading(false);
    if (responseStatus === 404) {
      setPage(current => current ? { ...current, items: current.items.filter(user => user.id !== userId) } : null);
    } else {
      setPage(null);
    }
    const occurrence = { message: responseStatus === 404
      ? "Esta conta não está mais disponível. Atualize a lista para continuar."
      : "Seu acesso à administração não está mais disponível. Atualize a página para continuar." };
    currentSelectionError.current = occurrence;
    setSelectionError(occurrence);
  }

  const load = useCallback(async (cursor?: string) => {
    const query = adminUserQuery({ search, role, status, cursor });
    const ticket = listReads.begin(query.toString());
    setLoading(true);
    setListError("");
    try {
      const response = await fetch(`/api/admin/users?${query}`, { cache: "no-store", signal: ticket.signal });
      const body = await response.json();
      if (!listReads.isCurrent(ticket)) return;
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) clearSelection();
        throw new Error(body.error?.message ?? "Não foi possível carregar os usuários.");
      }
      setPage(body);
    } catch (error) {
      if (!listReads.isCurrent(ticket)) return;
      setPage(null);
      setListError(error instanceof Error ? error.message : "Não foi possível carregar os usuários.");
    } finally {
      if (listReads.isCurrent(ticket)) setLoading(false);
    }
  }, [role, search, status, listReads, clearSelection]);

  useEffect(() => {
    const timer = setTimeout(() => void load(), 250);
    return () => { clearTimeout(timer); listReads.cancel(); };
  }, [load, listReads]);

  useEffect(() => () => {
    currentSelectionError.current = null;
    listReads.cancel(); detailReads.cancel(); auditReads.cancel();
  }, [listReads, detailReads, auditReads]);

  useEffect(() => {
    const modal = dialogRef.current;
    if (!dialog || !modal) return;
    if (!modal.open) modal.showModal();
    modal.querySelector<HTMLTextAreaElement>("textarea")?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [dialog]);

  function changeFilter(setter: (value: string) => void, value: string) {
    listReads.cancel();
    setPage(null);
    setLoading(true);
    setCursorStack([undefined]);
    setCursorIndex(0);
    setter(value);
  }

  async function loadDetail(userId: string) {
    const ticket = detailReads.begin(userId);
    setDetailLoading(true);
    setDetailError("");
    try {
      const response = await fetch(`/api/admin/users/${userId}`, { cache: "no-store", signal: ticket.signal });
      const body = await response.json();
      if (!detailReads.isCurrent(ticket) || selectedId.current !== userId) return null;
      if (!response.ok) {
        if (response.status === 401 || response.status === 403 || response.status === 404) {
          unavailableAccount(userId, response.status);
          return null;
        }
        throw new Error(body.error?.message ?? "Não foi possível atualizar os dados da conta.");
      }
      setSelected(body);
      return body as AdminUserDto;
    } catch (error) {
      if (detailReads.isCurrent(ticket)) setDetailError(error instanceof Error ? error.message : "Não foi possível carregar a conta.");
      return null;
    } finally {
      if (detailReads.isCurrent(ticket)) setDetailLoading(false);
    }
  }

  async function loadAudit(userId: string, cursor?: string) {
    const ticket = auditReads.begin(userId);
    setAuditState("loading");
    setAuditRetryCursor(cursor);
    if (!cursor) { setAudit([]); setAuditNext(null); }
    try {
      const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
      const response = await fetch(`/api/admin/users/${userId}/audit${query}`, { cache: "no-store", signal: ticket.signal });
      const body = await response.json();
      if (!auditReads.isCurrent(ticket) || selectedId.current !== userId) return;
      if (!response.ok) {
        if (response.status === 401 || response.status === 403 || response.status === 404) {
          unavailableAccount(userId, response.status);
          return;
        }
        throw new Error("AUDIT_UNAVAILABLE");
      }
      setAudit(current => cursor ? mergeUniquePage(current, body.items) : body.items);
      setAuditNext(body.nextCursor);
      setAuditState("idle");
    } catch {
      if (auditReads.isCurrent(ticket) && selectedId.current === userId) setAuditState("error");
    }
  }

  function choose(user: AdminUserDto) {
    currentSelectionError.current = null;
    selectedId.current = user.id;
    setSelected(user);
    setMessage("");
    setSelectionError(null);
    setAudit([]);
    setAuditNext(null);
    void loadDetail(user.id);
    void loadAudit(user.id);
    requestAnimationFrame(() => {
      detailHeadingRef.current?.focus();
      detailHeadingRef.current?.scrollIntoView({ block: "nearest" });
    });
  }

  function open(change: AdministrationChange, event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setReason("");
    setConflict(undefined);
    setReviewMessage("");
    setDialog(change);
  }

  function close() {
    if (busyRef.current || refreshing) return;
    setDialog(null);
    setConflict(undefined);
    requestAnimationFrame(() => {
      const target = triggerRef.current?.isConnected ? triggerRef.current : detailHeadingRef.current;
      target?.focus();
    });
  }

  async function refreshTarget() {
    if (!selected || refreshing || busyRef.current) return;
    setRefreshing(true);
    const updated = await loadDetail(selected.id);
    if (updated) {
      setConflict(undefined);
      setReviewMessage("Dados atualizados. Confira o valor atual antes de confirmar novamente.");
      void loadAudit(updated.id);
      void load(cursorStack[cursorIndex]);
      requestAnimationFrame(() => reviewHeadingRef.current?.focus());
    } else if (selectedId.current === selected.id) {
      setConflict({ message: "Não foi possível atualizar a conta. Tente novamente.", recovery: "REFRESH_TARGET" });
      requestAnimationFrame(() => conflictRef.current?.focus());
    }
    setRefreshing(false);
  }

  async function submit() {
    if (!selected || !dialog || busyRef.current || refreshing || detailLoading || detailError || conflict?.recovery || !reason.trim()) return;
    if (selected[dialog.kind] === dialog.value) return;
    busyRef.current = true;
    setBusy(true);
    setConflict(undefined);
    try {
      const kind = dialog.kind;
      const body = administrationChangeBody(selected, dialog, reason);
      const response = await fetch(`/api/admin/users/${selected.id}/${kind}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) {
        setConflict(result.error ?? { message: "Não foi possível concluir a alteração." });
        requestAnimationFrame(() => conflictRef.current?.focus());
        return;
      }
      setSelected(result);
      setDialog(null);
      await Promise.all([load(cursorStack[cursorIndex]), loadAudit(result.id)]);
      setMessage(`${kind === "status" ? "Estado" : "Papel"} de ${result.firstName} atualizado com segurança.`);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setConflict({ message: "Não foi possível verificar o resultado. Atualize os dados da conta antes de tentar novamente.", recovery: "REFRESH_TARGET" });
      requestAnimationFrame(() => conflictRef.current?.focus());
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  function onDialogKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") { event.preventDefault(); close(); }
    if (event.key === "Tab" && dialogRef.current) {
      const nodes = [...dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]),textarea:not([disabled])")];
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (!first || !last) { event.preventDefault(); return; }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }

  return (
    <div className="min-w-0 space-y-6 pb-6">
      <header className="space-y-3">
        <Link href="/admin" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"><ArrowLeft size={17} aria-hidden="true" /> Voltar à administração</Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0"><p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800"><ShieldCheck size={16} aria-hidden="true" /> Administração global</p><h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Contas e acessos</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Selecione uma conta para consultar detalhes e revisar alterações de papel ou estado.</p></div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800"><History size={15} aria-hidden="true" /> Alterações auditadas</span>
        </div>
      </header>

      <section aria-label="Filtros de usuários" className="grid min-w-0 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
        <label className="min-w-0"><span className="mb-2 block text-sm font-semibold text-slate-700">Pesquisar por nome ou email</span><span className="relative block"><Search className="pointer-events-none absolute left-3 top-3 text-slate-400" size={19} aria-hidden="true" /><input value={search} onChange={event => changeFilter(setSearch, event.target.value)} maxLength={120} placeholder="Pesquisar nome ou email" className={`${inputStyle} pl-10`} /></span></label>
        <Filter label="Papel" value={role} options={roles} onChange={value => changeFilter(setRole, value)} />
        <Filter label="Estado" value={status} options={statuses} onChange={value => changeFilter(setStatus, value)} />
        <button disabled={busy} onClick={() => void load(cursorStack[cursorIndex])} className={`${secondaryButton} self-end`}><RefreshCw size={17} aria-hidden="true" /> Atualizar</button>
      </section>

      <div ref={resultRef} tabIndex={-1} role="status" aria-live="polite" className="rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700">{message && <p className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><CheckCircle2 className="shrink-0" size={19} aria-hidden="true" />{message}</p>}</div>
      {selectionError && <div ref={selectionErrorRef} tabIndex={-1} role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-700">{selectionError.message}</div>}
      <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <section aria-label="Lista de usuários" aria-busy={loading} className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="flex items-center gap-2 text-lg font-bold text-slate-900"><Users size={19} aria-hidden="true" /> Contas encontradas</h2>{!loading && page && <p role="status" className="text-xs text-slate-600">Página {cursorIndex + 1} · {page.items.length} conta(s) nesta página</p>}</div>
          {loading ? <State text="Carregando usuários…" /> : listError ? <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-900"><p>{listError}</p><button onClick={() => void load(cursorStack[cursorIndex])} className={`${secondaryButton} mt-3`}>Tentar novamente</button></div> : !page || page.items.length === 0 ? <State text="Nenhum usuário corresponde aos filtros." /> : <ul className="space-y-3">{page.items.map(user => (
            <li key={user.id}><button disabled={busy} onClick={() => choose(user)} aria-pressed={selected?.id === user.id} aria-label={`Ver conta de ${user.firstName} ${user.lastName}`} className={`grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border p-4 text-left shadow-sm transition hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:opacity-60 ${selected?.id === user.id ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"}`}>
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800">{user.firstName[0]}{user.lastName[0]}</span>
              <span className="min-w-0"><strong className="block break-words text-slate-900">{user.firstName} {user.lastName}</strong><span className="mt-1 block break-all text-sm text-slate-600">{user.email}</span><span className="mt-3 flex flex-wrap items-center gap-2"><span className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-700">{labels[user.role]} · papel global</span><StatusBadge status={user.status} /></span></span>
            </button></li>
          ))}</ul>}
          {page && <nav aria-label="Paginação de usuários" className="flex flex-wrap items-center justify-between gap-3 pt-2"><button disabled={loading || cursorIndex === 0 || busy} onClick={() => { const previous = cursorIndex - 1; setCursorIndex(previous); void load(cursorStack[previous]); }} className={secondaryButton}><ChevronLeft size={17} aria-hidden="true" /> Página anterior</button><button disabled={loading || !page.nextCursor || busy} onClick={() => { if (!page.nextCursor) return; const next = page.nextCursor; setCursorStack(current => [...current.slice(0, cursorIndex + 1), next]); setCursorIndex(current => current + 1); void load(next); }} className={secondaryButton}>Carregar próxima página <ChevronRight size={17} aria-hidden="true" /></button></nav>}
        </section>

        <aside aria-label="Detalhe da conta" className="min-w-0 rounded-2xl border border-slate-200 bg-white p-[12px] shadow-sm sm:p-5">
          {!selected ? <State icon={<UserCog size={28} aria-hidden="true" />} text="Selecione uma conta para ver detalhes e ações seguras." bare /> : <>
            <header className="border-b border-slate-100 pb-5"><p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Conta selecionada</p><h2 ref={detailHeadingRef} tabIndex={-1} className="mt-2 break-words rounded-lg text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700">{selected.firstName} {selected.lastName}</h2><p className="mt-1 break-all text-sm text-slate-600">{selected.email}</p><p className="mt-3 text-xs text-slate-500">Revisão {selected.revision}</p></header>
            {detailLoading && <p role="status" className="mt-4 text-sm text-slate-600">Atualizando dados da conta…</p>}
            {detailError && <div role="alert" className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-900">{detailError}<button onClick={() => void loadDetail(selected.id)} className={`${secondaryButton} mt-2`}>Atualizar dados da conta</button></div>}
            <Detail label="Estado" value={<StatusBadge status={selected.status} />} />
            <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 9rem), 1fr))" }}>{statuses.filter(item => item !== selected.status).map(item => <button key={item} disabled={busy || detailLoading || Boolean(detailError)} onClick={event => open({ kind: "status", value: item }, event)} className={secondaryButton}>{labels[item]}</button>)}</div>
            <Detail label="Papel global" value={labels[selected.role]} />
            <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 9rem), 1fr))" }}>{roles.filter(item => item !== selected.role).map(item => <button key={item} disabled={busy || detailLoading || Boolean(detailError)} onClick={event => open({ kind: "role", value: item }, event)} className={secondaryButton}>{labels[item]}</button>)}</div>
            <p className="mt-4 text-xs leading-5 text-slate-500">Papéis globais e vínculos de laboratório têm permissões distintas.</p>
            <section aria-labelledby="account-audit-title" className="mt-6 border-t border-slate-100 pt-5"><h3 id="account-audit-title" className="flex items-center gap-2 font-bold text-slate-900"><History size={18} aria-hidden="true" /> Histórico recente</h3>
              {auditState === "loading" && <p role="status" className="mt-3 text-sm text-slate-600">Carregando histórico…</p>}
              {auditState === "error" && <div role="alert" className="mt-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-900"><p>Não foi possível carregar o histórico.</p><button className={`${secondaryButton} mt-2`} onClick={() => void loadAudit(selected.id, auditRetryCursor)}>Tentar novamente</button></div>}
              {auditState === "idle" && audit.length === 0 && <p className="mt-3 text-sm text-slate-500">Nenhuma alteração administrativa registrada.</p>}
              {audit.length > 0 && <ol className="mt-4 space-y-3">{audit.map(item => <li key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm"><strong className="text-slate-900">{item.action === "ACCOUNT_STATUS_CHANGED" ? "Estado" : "Papel"}</strong><p className="mt-1 break-words text-slate-700">{labels[item.beforeValue]} → {labels[item.afterValue]}</p><p className="mt-2 whitespace-pre-wrap break-words text-slate-600">Justificativa: {item.reason}</p><time dateTime={item.createdAt} className="mt-2 block text-xs text-slate-500">{new Date(item.createdAt).toLocaleString("pt-BR")} · revisão {item.targetRevision}</time></li>)}</ol>}
              {auditNext && <button disabled={auditState === "loading" || busy} onClick={() => void loadAudit(selected.id, auditNext)} className={`${secondaryButton} mt-4 w-full`}>{auditState === "loading" ? "Carregando…" : "Carregar mais eventos"}</button>}
            </section>
          </>}
        </aside>
      </div>

      {dialog && selected && <dialog ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="admin-dialog-title" aria-describedby="admin-dialog-description" onCancel={event => { event.preventDefault(); close(); }} onKeyDown={onDialogKey} className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 sm:p-6">
        <div className="flex flex-col items-start gap-3 sm:flex-row"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800"><AlertTriangle size={21} aria-hidden="true" /></span><div className="min-w-0"><h2 ref={reviewHeadingRef} tabIndex={-1} id="admin-dialog-title" className="break-words rounded-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-700">Confirmar alteração de {dialog.kind === "status" ? "estado" : "papel"}</h2><p id="admin-dialog-description" className="mt-2 break-words text-sm leading-6 text-slate-600">{selected.firstName} {selected.lastName} passará de <strong>{labels[selected[dialog.kind]]}</strong> para <strong>{labels[dialog.value]}</strong>. Esta ação será auditada.</p></div></div>
        <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">Revisão consultada: {selected.revision}</p>
        {reviewMessage && <p role="status" className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900">{reviewMessage}</p>}
        {selected[dialog.kind] === dialog.value && <p role="status" className="mt-3 text-sm text-slate-700">A conta já possui esse valor. Nenhuma nova alteração é necessária.</p>}
        <label className="mt-5 block text-sm font-semibold text-slate-800">Justificativa<textarea value={reason} onChange={event => setReason(event.target.value)} disabled={busy || refreshing} maxLength={500} rows={4} className={`${inputStyle} mt-2 resize-y font-normal`} placeholder="Explique por que esta alteração é necessária" /></label>
        <p className="mt-1 text-xs text-slate-500">Até 500 caracteres. Evite incluir dados pessoais desnecessários.</p>
        {conflict && <div ref={conflictRef} role="alert" tabIndex={-1} className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-700"><strong>{conflict.message ?? "Não foi possível concluir."}</strong>{conflict.recovery === "REFRESH_TARGET" && <button disabled={refreshing || busy} onClick={() => void refreshTarget()} className={`${secondaryButton} mt-3`}>{refreshing ? "Atualizando…" : "Atualizar dados"}</button>}{conflict.recovery === "ENSURE_ANOTHER_ACTIVE_ADMIN" && <p className="mt-2">Ative ou promova outro administrador antes de repetir.</p>}</div>}
        <p role="status" aria-live="polite" className="mt-3 text-sm text-slate-600">{busy ? "Processando…" : refreshing ? "Atualizando os dados da conta…" : ""}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button disabled={busy || refreshing} onClick={close} className={secondaryButton}>Cancelar</button><button disabled={busy || refreshing || detailLoading || Boolean(detailError) || Boolean(conflict?.recovery) || !reason.trim() || selected[dialog.kind] === dialog.value} onClick={() => void submit()} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">Confirmar alteração</button></div>
      </dialog>}
    </div>
  );
}

function Filter({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  const id = useId();
  return <div className="min-w-0"><label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">Filtrar por {label.toLowerCase()}</label><select id={id} value={value} onChange={event => onChange(event.target.value)} className={inputStyle}><option value="">Todos — {label}</option>{options.map(item => <option key={item} value={item}>{labels[item as keyof typeof labels]}</option>)}</select></div>;
}
function State({ text, icon, bare }: { text: string; icon?: ReactNode; bare?: boolean }) {
  return <div role="status" className={`flex min-h-40 flex-col items-center justify-center gap-3 p-5 text-center text-sm leading-6 text-slate-600 ${bare ? "" : "rounded-2xl border border-dashed border-slate-300 bg-white"}`}>{icon}{text}</div>;
}
function StatusBadge({ status }: { status: AdminUserStatus }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[status]}`}><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />{labels[status]}</span>;
}
function Detail({ label, value }: { label: string; value: ReactNode }) {
  return <div className="mt-5 flex flex-wrap items-center justify-between gap-2"><span className="text-sm text-slate-600">{label}</span><strong className="text-sm text-slate-900">{value}</strong></div>;
}
