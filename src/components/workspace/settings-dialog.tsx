"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { XIcon } from "lucide-react";
import styles from "./workspace.module.css";

export function SettingsDialog({ name, busy, onClose, children }: { name: string; busy: boolean; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = ref.current!;
    const trigger = document.activeElement;
    node.showModal();
    return () => { node.close(); if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus(); };
  }, []);
  useEffect(() => {
    const node = ref.current;
    const active = document.activeElement;
    if (busy && node?.open && (!node.contains(active) || (active instanceof HTMLElement && active.matches(":disabled")))) node.focus();
  }, [busy]);
  return <dialog ref={ref} tabIndex={-1} aria-modal="true" aria-labelledby="settings-title" className={styles.dialog}
    onKeyDown={event => {
      if (event.key !== "Tab" || event.ctrlKey || event.altKey || event.metaKey) return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
        .filter(node => node.getClientRects().length > 0 && getComputedStyle(node).visibility !== "hidden");
      const first = controls[0]; const last = controls[controls.length - 1];
      if (!first) { event.preventDefault(); event.currentTarget.focus(); }
      else if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === event.currentTarget)) { event.preventDefault(); first.focus(); }
    }}
    onCancel={event => { event.preventDefault(); if (!busy) onClose(); }}
    onMouseDown={event => {
      const box = event.currentTarget.getBoundingClientRect();
      if (!busy && event.target === event.currentTarget && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) onClose();
    }}>
    <header className={styles.dialogHeader}>
      <div><p className={styles.muted}>Configurações</p><h2 id="settings-title">{name}</h2></div>
      <button type="button" disabled={busy} onClick={onClose} aria-label="Fechar configurações" className={`${styles.outline} ${styles.close}`}><XIcon size={20} aria-hidden="true" /></button>
    </header>
    <div className={styles.dialogBody}>{children}</div>
  </dialog>;
}
