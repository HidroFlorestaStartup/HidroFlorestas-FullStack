"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { accountInputClass } from "./account-shell";
import styles from "./account.module.css";

export function PasswordField({ id, label, value, onChange, current = false, describedBy, disabled, invalid }: {
  id: string; label: string; value: string; onChange: (value: string) => void; current?: boolean; describedBy?: string; disabled?: boolean; invalid?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return <div>
    <label htmlFor={id} className={styles.label}>{label}</label>
    <div className={styles.passwordControl}>
      <input id={id} name={id} required disabled={disabled} type={visible ? "text" : "password"} value={value} onChange={event => onChange(event.target.value)} autoComplete={current ? "current-password" : "new-password"} aria-describedby={describedBy} aria-invalid={invalid ? true : undefined} className={`${accountInputClass} ${styles.passwordInput}`} />
      <button type="button" disabled={disabled} aria-label={`${visible ? "Ocultar" : "Mostrar"} ${label.toLowerCase()}`} aria-pressed={visible} onClick={() => setVisible(value => !value)} className={styles.eye}>
        {visible ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
      </button>
    </div>
  </div>;
}
