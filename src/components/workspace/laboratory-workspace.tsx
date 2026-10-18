"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, FlaskConicalIcon, RefreshCw, SettingsIcon, UsersIcon } from "lucide-react";
import {
  parseLaboratoriesEnvelope,
  type LaboratoryDetailsDto,
  type PublicLaboratoryDto,
} from "@/types/laboratory.type";

import { SettingsDialog } from "./settings-dialog";
import styles from "./workspace.module.css";

const CONNECTION_ERROR = "Não foi possível conectar ao servidor.";
const RESPONSE_ERROR = "O servidor enviou uma resposta inválida.";

export function LaboratoryWorkspace() {
  const [laboratories, setLaboratories] = useState<PublicLaboratoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<PublicLaboratoryDto | null>(null);
  const [details, setDetails] = useState<LaboratoryDetailsDto | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [riskAction, setRiskAction] = useState<"DEACTIVATE" | "DELETE" | null>(
    null,
  );
  const [confirmationName, setConfirmationName] = useState("");
  const nameInput = useRef<HTMLInputElement>(null);
  const creating = useRef(false);
  const changing = useRef(false);
  const focusAfterLoad = useRef(false);
  const confirmationInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!loading && focusAfterLoad.current) {
      focusAfterLoad.current = false;
      document.getElementById("laboratories-title")?.focus();
    }
  }, [loading]);
  useEffect(() => { if (riskAction) confirmationInput.current?.focus(); }, [riskAction]);


  const load = useCallback(async () => {
    setLoading(true);
    setLoadFailed(false);
    setError(null);
    try {
      const response = await fetch("/api/laboratories", {
        credentials: "include",
        cache: "no-store",
      });
      const result = parseLaboratoriesEnvelope(await response.json());
      if (!response.ok || !result?.success || !("laboratories" in result)) {
        setLoadFailed(true);
        setError(result && !result.success ? result.message : RESPONSE_ERROR);
        return;
      }
      setLaboratories(result.laboratories);
    } catch {
      setLoadFailed(true);
      setError(CONNECTION_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (creating.current) return;
    const trimmed = name.trim();
    if (!trimmed || trimmed.length > 100) {
      setError("Informe um nome entre 1 e 100 caracteres.");
      nameInput.current?.focus();
      return;
    }
    creating.current = true;
    setSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      const response = await fetch("/api/laboratories", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const result = parseLaboratoriesEnvelope(await response.json());
      if (!response.ok || !result?.success || !("laboratory" in result)) {
        setError(result && !result.success ? result.message : RESPONSE_ERROR);
        return;
      }
      setName("");
      setFeedback(
        `Laboratório “${result.laboratory.name}” criado com sucesso.`,
      );
      await load();
    } catch {
      setError(CONNECTION_ERROR);
    } finally {
      creating.current = false;
      setSubmitting(false);
    }
  }

  async function openSettings(laboratory: PublicLaboratoryDto) {
    setSelected(laboratory);
    setDetails(null);
    setRiskAction(null);
    setConfirmationName("");
    setError(null);
    setSettingsLoading(true);
    try {
      const response = await fetch(`/api/laboratories/${laboratory.id}`, {
        credentials: "include",
        cache: "no-store",
      });
      const result = parseLaboratoriesEnvelope(await response.json());
      if (!response.ok || !result?.success || !("details" in result))
        setError(result && !result.success ? result.message : RESPONSE_ERROR);
      else setDetails(result.details);
    } catch {
      setError(CONNECTION_ERROR);
    } finally {
      setSettingsLoading(false);
    }
  }

  function closeSettings() {
    if (!settingsLoading) {
      setSelected(null);
      setDetails(null);
      setRiskAction(null);
      setConfirmationName("");
    }
  }

  async function executeRiskAction() {
    if (
      changing.current ||
      !selected ||
      !riskAction ||
      confirmationName !== selected.name ||
      settingsLoading
    )
      return;
    changing.current = true;
    setSettingsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/laboratories/${selected.id}`, {
        method: riskAction === "DELETE" ? "DELETE" : "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmationName }),
      });
      const result = parseLaboratoriesEnvelope(await response.json());
      if (!response.ok || !result?.success || !("action" in result)) {
        setError(result && !result.success ? result.message : RESPONSE_ERROR);
        return;
      }
      setFeedback(
        riskAction === "DELETE"
          ? `Laboratório “${selected.name}” excluído.`
          : `Laboratório “${selected.name}” desativado.`,
      );
      focusAfterLoad.current = true;
      setSelected(null);
      setDetails(null);
      setRiskAction(null);
      setConfirmationName("");
      await load();
    } catch {
      setError(CONNECTION_ERROR);
    } finally {
      changing.current = false;
      setSettingsLoading(false);
    }
  }


  const atLimit = laboratories.length >= 5;
  const creationForm = <form onSubmit={submit} className={styles.creation}>
    <label htmlFor="laboratory-name">Nome do laboratório</label>
    <input ref={nameInput} id="laboratory-name" value={name} onChange={event => setName(event.target.value)}
      maxLength={100} required disabled={submitting || atLimit} placeholder="Ex.: Itapecuru-Mirim" className={styles.input} />
    <p className={styles.muted}>Até cinco laboratórios. Nomes repetidos são permitidos.</p>
    <button type="submit" disabled={submitting || atLimit} className={styles.button}><FlaskConicalIcon aria-hidden="true" size={20} />
      {submitting ? "Criando…" : atLimit ? "Limite atingido" : "Criar laboratório"}
    </button>
  </form>;
  if (loading) return <section className={styles.state}><RefreshCw aria-hidden="true" size={28} /><p role="status">Carregando laboratórios…</p></section>;
  if (loadFailed && laboratories.length === 0 && !selected) return <section className={styles.state}>
    <p role="alert" className={styles.error}>Não foi possível carregar seus laboratórios.</p>
    <p className={styles.muted}>{error}</p><button type="button" className={styles.outline} onClick={() => void load()}>Tentar novamente</button>
  </section>;
  return <section className={styles.workspace} aria-labelledby="laboratories-title">
    <header className={styles.sectionHeader}>
      <h2 id="laboratories-title" tabIndex={-1} className={styles.sectionTitle}>{laboratories.length ? "Seus laboratórios" : "Você ainda não participa de um laboratório."}</h2>
      <p className={styles.muted}>{laboratories.length ? `${laboratories.length} de 5 laboratórios utilizados` : "Um laboratório reúne a equipe e as áreas monitoradas. Crie um novo para começar."}</p>
    </header>
    <div className={styles.options}>
      <div className={`${styles.option} ${styles.unavailable}`}>
        <UsersIcon aria-hidden="true" size={24} /><h3>Entrar em um laboratório</h3>
        <p className={styles.muted}>Solicite participação em um laboratório já existente.</p>
        <p><span className={styles.badge}>Disponível em uma próxima etapa</span></p>
      </div>
      <div className={styles.option}><FlaskConicalIcon aria-hidden="true" size={24} /><h3>Criar laboratório</h3>
        <p className={styles.muted}>Seja responsável por um novo laboratório IHFR.</p>{creationForm}
      </div>
    </div>
    {atLimit && <p role="status" className={styles.notice}>Você atingiu o limite de cinco laboratórios acessíveis, incluindo participações e inativos.</p>}
    {laboratories.length > 0 && <ul className={styles.labGrid}>{laboratories.map(laboratory => <li key={laboratory.id} className={styles.labCard}>
      <div className={styles.cardTop}><FlaskConicalIcon aria-hidden="true" size={24} /><span className={`${styles.badge} ${laboratory.status === "INACTIVE" ? styles.inactive : ""}`}>{laboratory.status === "ACTIVE" ? "Ativo" : "Inativo"}</span></div>
      <h3>{laboratory.name}</h3>
      <p className={styles.muted}>Criado em {new Intl.DateTimeFormat("pt-BR").format(new Date(laboratory.createdAt))}</p>
      <p className={styles.muted}>{laboratory.isOwner ? "Você é a pessoa responsável" : "Participação"}</p>
      <div className={styles.cardActions}>
        <Link href={`/dashboard/laboratories/${laboratory.id}`} className={styles.button}>ACESSAR LABORATÓRIO<ArrowRight aria-hidden="true" size={18} /></Link>
        <button type="button" className={styles.outline} onClick={() => void openSettings(laboratory)}><SettingsIcon aria-hidden="true" size={18} />Configurações</button>
      </div>
    </li>)}</ul>}
    {feedback && <p role="status" className={styles.feedback}>{feedback}</p>}
    {error && !selected && <p role="alert" className={styles.error}>{error}</p>}
    {selected && <SettingsDialog name={selected.name} busy={settingsLoading} onClose={closeSettings}>
      {error && <div><p role="alert" className={styles.error}>{error}</p>{!details && <button type="button" disabled={settingsLoading} className={styles.outline} onClick={() => void openSettings(selected)}>Tentar novamente</button>}</div>}
      {settingsLoading && <p role="status">{details ? "Processando…" : "Carregando informações…"}</p>}
      {details && <>
        <dl className={styles.details}><div><dt>Criado em</dt><dd>{new Intl.DateTimeFormat("pt-BR").format(new Date(details.createdAt))}</dd></div><div><dt>Status</dt><dd>{details.status === "ACTIVE" ? "Ativo" : "Inativo"}</dd></div></dl>
        <div><h3 className={styles.sectionTitle}>Membros</h3><ul className={styles.members}>{details.members.map((member, index) => <li key={`${member.name}-${index}`}>{member.name}</li>)}</ul></div>
        {details.isOwner ? <div className={styles.risk}>
          <h3>Zona de perigo</h3><p className={styles.muted}>Estas ações só podem ser realizadas pela pessoa responsável.</p>
          {!riskAction ? <div className={styles.actions}>
            <button type="button" id="deactivate-laboratory" disabled={settingsLoading || details.status === "INACTIVE"} className={styles.warning} onClick={() => setRiskAction("DEACTIVATE")}>Desativar laboratório</button>
            <button type="button" id="delete-laboratory" disabled={settingsLoading} className={styles.danger} onClick={() => setRiskAction("DELETE")}>Excluir laboratório</button>
          </div> : <div className={styles.confirmation}>
            <p className={styles.muted}>Para {riskAction === "DELETE" ? "excluir permanentemente" : "desativar"}, digite <strong>{selected.name}</strong>.</p>
            <label htmlFor="confirmation-name">Nome do laboratório</label>
            <input ref={confirmationInput} id="confirmation-name" value={confirmationName} onChange={event => setConfirmationName(event.target.value)} disabled={settingsLoading} autoComplete="off" className={styles.input} />
            <div className={styles.actions}>
              <button type="button" disabled={settingsLoading} className={styles.outline} onClick={() => { const triggerId = riskAction === "DELETE" ? "delete-laboratory" : "deactivate-laboratory"; setRiskAction(null); setConfirmationName(""); requestAnimationFrame(() => document.getElementById(triggerId)?.focus()); }}>Cancelar</button>
              <button type="button" className={styles.danger} disabled={confirmationName !== selected.name || settingsLoading} onClick={() => void executeRiskAction()}>{settingsLoading ? "Processando…" : riskAction === "DELETE" ? "Excluir permanentemente" : "Desativar laboratório"}</button>
            </div>
          </div>}
        </div> : <p className={styles.notice}>Somente a pessoa responsável pode alterar ou excluir este laboratório.</p>}
      </>}
    </SettingsDialog>}
  </section>;
}
