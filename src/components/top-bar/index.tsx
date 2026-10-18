"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import Logo from "@/assets/logo/logo-hf.png";
import { useAuth } from "@/contexts/auth.context";
import UserProfile from "../user-profile";
import styles from "../shell/shell.module.css";

type Props = { showProfile?: boolean; showLogout?: boolean };
export default function TopBar({ showProfile, showLogout }: Props) {
  const { user } = useAuth();
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const brand = useRef<HTMLAnchorElement>(null);
  useEffect(() => { if (menu.current) menu.current.open = false; }, [pathname]);
  useEffect(() => {
    const desktop = matchMedia("(min-width: 768px)");
    const resize = () => {
      if (desktop.matches && menu.current?.open) { menu.current.open = false; brand.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && menu.current?.open && !menu.current.contains(event.target)) menu.current.open = false;
    };
    desktop.addEventListener("change", resize); document.addEventListener("pointerdown", outside);
    return () => { desktop.removeEventListener("change", resize); document.removeEventListener("pointerdown", outside); };
  }, []);
  const accountLinks = <>
    <Link href="/change-password" className={styles.accountLink}>Alterar senha</Link>
    <Link href="/delete-account" className={`${styles.accountLink} ${styles.accountDanger}`}>Excluir conta</Link>
  </>;
  return <header id="application-header" className={styles.header}>
    <Link ref={brand} href="/workspace" className={styles.brand} aria-label="HidroFlorestas — ir ao workspace">
      <Image src={Logo} alt="HidroFlorestas" width={180} loading="eager" />
    </Link>
    <div className={styles.headerInfo}>
      {showProfile && <div className={styles.identity}><strong>{user?.firstName} {user?.lastName}</strong><small>Ambiente de Análise</small></div>}
      {showProfile && <div className={styles.identity}><UserProfile image={user?.image} lyrics={`${user?.firstName.charAt(0) ?? ""}${user?.lastName.charAt(0) ?? ""}`} /></div>}
      {showLogout && <nav aria-label="Conta" className={styles.accountLinks}>
        {accountLinks}<Link href="/logout" className={styles.accountLink}><LogOut size={18} aria-hidden="true" />Sair</Link>
      </nav>}
      {showLogout && <details ref={menu} className={styles.mobileAccount}
        onToggle={event => setMenuExpanded(event.currentTarget.open)}
        onBlur={event => { if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false; }}
        onKeyDown={event => {
          if (event.key === "Escape" && event.currentTarget.open) { event.preventDefault(); event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); }
        }}>
        <summary role="button" aria-expanded={menuExpanded} aria-controls="mobile-account-menu">Conta<ChevronDown size={18} aria-hidden="true" /></summary>
        <div id="mobile-account-menu" className={styles.accountMenu}>
          <p>{user?.firstName} {user?.lastName}</p>
          <nav aria-label="Conta no celular" onClick={event => {
            if (event.target instanceof Element && event.target.closest("a") && menu.current) menu.current.open = false;
          }}>{accountLinks}</nav>
        </div>
      </details>}
    </div>
  </header>;
}
