import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import LogoHF from "@/assets/logo/logo-hf.png";
import styles from "./account.module.css";

export function AccountShell({ title, description, children, split = false }: {
  title: string; description: string; children: ReactNode; split?: boolean;
}) {
  return <main className={`${styles.page} ${split ? styles.split : ""}`}>
    {split ? <aside className={styles.aside} aria-hidden="true">
      <Image src={LogoHF} alt="" width={256} className={styles.logo} />
      <div className={styles.asideCopy}>
        <p>Água, solo, vegetação e território em um só registro.</p>
        <p>Crie sua conta para participar de um laboratório de monitoramento.</p>
      </div>
      <span />
    </aside> : null}
    <section className={styles.card} aria-labelledby="account-title">
      <Link href="/" className={styles.brand} aria-label="HidroFlorestas, início"><Image src={LogoHF} alt="HidroFlorestas" width={210} preload className={styles.logo} /></Link>
      <h1 id="account-title" className={styles.heading}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.content}>{children}</div>
    </section>
  </main>;
}

export const accountInputClass = styles.input;
export const accountButtonClass = styles.button;
export const accountDangerButtonClass = `${styles.button} ${styles.danger}`;
