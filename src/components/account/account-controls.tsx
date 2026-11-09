"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import styles from "./account.module.css";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function useAccountReady() {
  return useSyncExternalStore(subscribe, clientReady, serverReady);
}

export function AccountControls({ ready, busy, label, children }: {
  ready: boolean; busy: boolean; label: string; children: ReactNode;
}) {
  return <fieldset disabled={!ready || busy} className={styles.controls}>
    <legend className={styles.srOnly}>{label}</legend>
    {!ready || busy ? <p role="status" aria-live="polite" className={styles.status}>{!ready ? "Preparando formulário…" : "Processando solicitação…"}</p> : null}
    {children}
  </fieldset>;
}
