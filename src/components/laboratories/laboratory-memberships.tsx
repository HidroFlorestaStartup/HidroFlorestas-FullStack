"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import type { MembershipDto } from "@/app/api/server/laboratories/laboratory-membership.contracts";
import type { LaboratoryContext } from "@/app/api/server/areas/area.authorization";
import styles from "@/components/dashboard/dashboard.module.css";

type MembershipList = { context: LaboratoryContext; memberships: MembershipDto[] };
type MutationNotice = { tone: "success" | "error"; message: string };

const roleLabels: Record<MembershipDto["role"], string> = {
  OWNER: "Proprietário",
  ADMIN: "Administrador",
  MEMBER: "Membro",
};

export function LaboratoryMemberships({ laboratoryId }: { laboratoryId: string }) {
  const [data, setData] = useState<MembershipList | null>(null);
  const [readError, setReadError] = useState<string | null>(null);
  const [notice, setNotice] = useState<MutationNotice | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const inFlight = useRef(false);

  const load = useCallback(async () => {
    // A successful retry replaces the read failure. A mutation result remains
    // visible while the current membership list is fetched after that write.
    setReadError(null);
    try {
      const response = await fetch("/api/laboratories/" + laboratoryId + "/memberships", { cache: "no-store" });
      const body = await response.json();
      if (!response.ok) {
        setData(null);
        setReadError(body.error?.message ?? "Não foi possível carregar membros.");
        return;
      }
      setData(body);
    } catch {
      setData(null);
      setReadError("Não foi possível conectar. Tente novamente.");
    }
  }, [laboratoryId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function change(member: MembershipDto) {
    if (inFlight.current || member.role === "OWNER") return;
    inFlight.current = true;
    setBusy(member.id);
    setNotice(null);
    try {
      const response = await fetch("/api/laboratories/" + laboratoryId + "/memberships/" + member.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expectedRole: member.role,
          role: member.role === "ADMIN" ? "MEMBER" : "ADMIN",
        }),
      });
      const body = await response.json();
      setNotice({
        tone: response.ok ? "success" : "error",
        message: response.ok ? "Papel atualizado." : body.error?.message ?? "Não foi possível atualizar.",
      });
      await load();
    } catch {
      setNotice({ tone: "error", message: "Não foi possível conectar. Tente novamente." });
    } finally {
      inFlight.current = false;
      setBusy(null);
    }
  }

  return (
    <section aria-labelledby="members-title" className={styles.members}>
      <div className={styles.heading}>
        <Link href={"/dashboard/laboratories/" + laboratoryId} className={styles.back}>
          <ArrowLeft size={18} aria-hidden="true" /> Voltar ao resumo
        </Link>
        <h1 id="members-title" className={styles.title}>Membros do laboratório</h1>
        <p className={styles.description}>O proprietário promove ou rebaixa vínculos existentes entre Membro e Administrador do laboratório.</p>
      </div>
      {notice && (
        <p role={notice.tone === "error" ? "alert" : "status"} className={notice.tone === "error" ? styles.error : styles.feedback}>
          {notice.message}
        </p>
      )}
      {!data ? (
        readError ? (
          <div className={styles.errorState}>
            <p role="alert">{readError}</p>
            <p className={styles.description}>Lista indisponível.</p>
            <button className={styles.outline} onClick={() => void load()}>Tentar novamente</button>
          </div>
        ) : (
          <p role="status" aria-label="Carregando membros" className={styles.loading}>
            <span className={styles.spinner} aria-hidden="true"><RefreshCw size={20} /></span>
            Carregando membros…
          </p>
        )
      ) : (
        <>
          {data.context.readOnly && <p className={styles.notice}>Laboratório inativo — somente leitura.</p>}
          <div className={styles.membersCard}>
            <ul className={styles.membersList}>
              {data.memberships.map(member => (
                <li key={member.id} className={styles.memberRow}>
                  <span className={styles.avatar} aria-hidden="true">{member.initials}</span>
                  <div className={styles.memberIdentity}>
                    <p className={styles.memberName}>{member.name}</p>
                    <span className={styles.role + " " + (member.role === "OWNER" ? styles.ownerRole : member.role === "ADMIN" ? styles.adminRole : styles.memberRole)}>
                      {roleLabels[member.role]}
                    </span>
                  </div>
                  <div className={styles.memberAction}>
                    {member.role === "OWNER" ? (
                      <span className={styles.ownerHint}>Proprietário não é alterável</span>
                    ) : !data.context.readOnly ? (
                      <button
                        disabled={busy !== null}
                        onClick={() => void change(member)}
                        className={styles.outline}
                        aria-label={(member.role === "ADMIN" ? "Rebaixar " : "Promover ") + member.name}
                      >
                        {busy === member.id ? "Salvando…" : member.role === "ADMIN" ? "Rebaixar para membro" : "Promover a administrador"}
                      </button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            {data.memberships.length === 0 && <p className={styles.empty}>Nenhum membro encontrado.</p>}
            <p className={styles.membersFootnote}>Somente o proprietário altera os papéis dos vínculos existentes.</p>
          </div>
        </>
      )}
    </section>
  );
}