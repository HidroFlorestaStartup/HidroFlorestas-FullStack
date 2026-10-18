"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/auth.context";
import { AccountShell, accountButtonClass, accountInputClass } from "@/components/account/account-shell";
import { AccountControls, useAccountReady } from "@/components/account/account-controls";
import { PasswordField } from "@/components/account/password-field";
import styles from "@/components/account/account.module.css";

export default function RegisterPage() {
  const { signUp } = useAuth();
  const ready = useAccountReady();
  const submitting = useRef(false);
  const requestKey = useRef<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState({ firstName: false, lastName: false, email: false, password: false });

  function payloadChanged() {
    // Keep the existing contract: editing payload starts another attempt;
    // a network failure alone never discards this key.
    requestKey.current = null;
    setErrorMessage("");
    setInvalidFields({ firstName: false, lastName: false, email: false, password: false });
  }

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || loading || submitting.current) return;
    const empty = { firstName: !firstName.trim(), lastName: !lastName.trim(), email: !email.trim(), password: !password.trim() };
    setInvalidFields(empty);
    if (Object.values(empty).some(Boolean)) {
      setErrorMessage("Preencha seu nome, sobrenome, e-mail e senha.");
      const first = Object.keys(empty).find(key => empty[key as keyof typeof empty]);
      document.getElementById(first === "firstName" ? "first-name" : first === "lastName" ? "last-name" : first === "email" ? "register-email" : "register-password")?.focus();
      return;
    }
    submitting.current = true;
    setLoading(true); setErrorMessage("");
    requestKey.current ??= crypto.randomUUID();
    try {
      const result = await signUp({ firstName, lastName, email, password }, requestKey.current);
      if (!result.success) setErrorMessage(result.message);
    } finally { submitting.current = false; setLoading(false); }
  }

  return <AccountShell title="Criar conta" description="Preencha seus dados para começar." split>
    <form onSubmit={handleRegister} aria-busy={loading}>
      <AccountControls ready={ready} busy={loading} label="Dados para criar sua conta">
        <div className={styles.names}>
          <div>
            <label htmlFor="first-name" className={styles.label}>Nome</label>
            <input id="first-name" name="firstName" autoComplete="given-name" required value={firstName} onChange={event => { setFirstName(event.target.value); payloadChanged(); }} aria-invalid={invalidFields.firstName ? true : undefined} aria-describedby={errorMessage ? "register-error" : undefined} className={accountInputClass} />
          </div>
          <div>
            <label htmlFor="last-name" className={styles.label}>Sobrenome</label>
            <input id="last-name" name="lastName" autoComplete="family-name" required value={lastName} onChange={event => { setLastName(event.target.value); payloadChanged(); }} aria-invalid={invalidFields.lastName ? true : undefined} aria-describedby={errorMessage ? "register-error" : undefined} className={accountInputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="register-email" className={styles.label}>E-mail</label>
          <input id="register-email" name="email" type="email" autoComplete="email" required value={email} onChange={event => { setEmail(event.target.value); payloadChanged(); }} aria-invalid={invalidFields.email ? true : undefined} aria-describedby={errorMessage ? "register-error" : undefined} className={accountInputClass} />
        </div>
        <PasswordField id="register-password" label="Senha" value={password} onChange={value => { setPassword(value); payloadChanged(); }} invalid={invalidFields.password} describedBy={`register-password-help${errorMessage ? " register-error" : ""}`} />
        <p id="register-password-help" className={styles.help}>Use uma frase de pelo menos 15 caracteres. Sua senha será preservada como digitada.</p>
        {errorMessage ? <p id="register-error" role="alert" className={styles.error}>{errorMessage}</p> : null}
        <button type="submit" disabled={!ready || loading} className={accountButtonClass}>{loading ? "CRIANDO..." : "CRIAR CONTA"}</button>
      </AccountControls>
    </form>
    <p className={styles.footer}>Já tem uma conta? <Link href="/login">Entrar na minha conta</Link></p>
  </AccountShell>;
}
