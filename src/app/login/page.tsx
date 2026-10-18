'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import LogoHF from '@/assets/logo/logo-hf.png';
import { useAuth } from '@/contexts/auth.context';
import styles from './login.module.css';

// Same readiness pattern used by the environmental form: the SSR and first
// hydration render are inert, before React enables the interactive controls.
const subscribeToReadiness = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function LoginPage() {
  const { signIn } = useAuth();
  const hydrated = useSyncExternalStore(subscribeToReadiness, clientReady, serverReady);
  const submitting = useRef(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated || loading || submitting.current) return;

    // Preserve the existing empty-field policy without transforming the payload.
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Informe seu email e sua senha.');
      return;
    }

    submitting.current = true;
    setErrorMessage('');
    setLoading(true);

    try {
      const result = await signIn({ email, password });
      if (!result.success) setErrorMessage(result.message);
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <Image src={LogoHF} alt="HidroFlorestas" width={210} preload className={styles.logo} />
        <h1 id="login-title" className={styles.heading}>FAÇA SEU LOGIN</h1>
        <p className={styles.intro}>Acesse sua conta para gerenciar seus projetos</p>

        <p role="status" aria-live="polite" className={styles.status}>
          {!hydrated ? 'Preparando formulário…' : loading ? 'Entrando…' : ''}
        </p>

        <form onSubmit={handleLogin} aria-busy={loading}>
          <fieldset className={styles.fields} disabled={!hydrated || loading}>
            <legend className={styles.srOnly}>Credenciais de acesso</legend>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(event) => { setEmail(event.target.value); setErrorMessage(''); }}
                aria-required="true"
                aria-invalid={errorMessage ? true : undefined}
                aria-describedby={errorMessage ? 'login-error' : undefined}
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Senha</label>
              <div className={styles.passwordControl}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => { setPassword(event.target.value); setErrorMessage(''); }}
                  aria-required="true"
                  aria-invalid={errorMessage ? true : undefined}
                  aria-describedby={errorMessage ? 'login-error' : undefined}
                  className={`${styles.input} ${styles.passwordInput}`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                  className={styles.eyeButton}
                >
                  {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                </button>
              </div>
            </div>

            <div className={styles.options}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((value) => !value)}
                  className={styles.checkbox}
                />
                <span>Mostrar senha</span>
              </label>
              <Link href="/forgot-password" className={styles.link}>Esqueceu sua senha?</Link>
            </div>

            {errorMessage ? <p id="login-error" role="alert" className={styles.error}>{errorMessage}</p> : null}

            <button type="submit" disabled={!hydrated || loading} className={styles.submit}>
              {loading && <Loader2 size={20} aria-hidden="true" className={styles.spinner} />}
              {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </fieldset>
        </form>

        <p className={styles.signup}>
          Não tem uma conta?{' '}
          <Link href="/register" className={styles.link}>Cadastrar-se</Link>
        </p>
      </section>
    </main>
  );
}
