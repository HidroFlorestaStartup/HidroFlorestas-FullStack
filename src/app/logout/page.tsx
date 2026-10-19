"use client";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/auth.context";
import { AccountShell, accountButtonClass } from "@/components/account/account-shell";

export default function LogoutPage() {
  const { logout } = useAuth();
  const initialAttempt = useRef<ReturnType<typeof logout> | null>(null);
  const retrying = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    // React replays effects in development. Both subscriptions share the same
    // initial POST; cleanup still prevents updates after real unmount.
    initialAttempt.current ??= logout();
    void initialAttempt.current.then(result => {
      if (!cancelled && !result.success) { setErrorMessage(result.message); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, [logout]);
  async function retryLogout() {
    if (retrying.current) return;
    retrying.current = true; setLoading(true); setErrorMessage("");
    try {
      const result = await logout();
      if (!result.success) { setErrorMessage(result.message); setLoading(false); }
    } finally { retrying.current = false; }
  }
  return <AccountShell title="Saindo da sua conta" description="Encerrando sua sessão no HidroFlorestas.">
    {loading && <p role="status">Fazendo logout, aguarde...</p>}
    {errorMessage && <div role="alert"><p>{errorMessage}</p><button type="button" onClick={() => void retryLogout()} disabled={loading} className={accountButtonClass}>Tentar novamente</button></div>}
  </AccountShell>;
}