"use client";
import type { FocusEvent, ReactNode } from "react";
import TopBar from "@/components/top-bar";
import Sidebar from "@/components/sidebar";
import styles from "./shell.module.css";

export function ApplicationShell({ children, canAdmin }: { children: ReactNode; canAdmin: boolean }) {
  function keepFocusVisible(event: FocusEvent<HTMLDivElement>) {
    const target = event.target;
    const content = event.currentTarget;
    if (!(target instanceof HTMLElement) || target.closest("dialog[open]")) return;
    requestAnimationFrame(() => {
      if (document.activeElement !== target) return;
      const box = target.getBoundingClientRect();
      const header = document.getElementById("application-header")?.getBoundingClientRect().bottom ?? 0;
      if (target === content) {
        window.scrollBy({ top: box.top - header - 8, behavior: "instant" });
        return;
      }
      const footer = matchMedia("(max-width: 767px)").matches
        ? document.getElementById("application-navigation")?.getBoundingClientRect().top ?? innerHeight
        : innerHeight;
      if (box.top < header + 8 || box.bottom > footer - 8) target.scrollIntoView({ block: "center", behavior: "instant" });
    });
  }
  return <div className={styles.shell}>
    <a href="#application-content" className={styles.skip}>Pular para o conteúdo</a>
    <TopBar showProfile showLogout />
    <div className={styles.frame}>
      <Sidebar canAdmin={canAdmin} />
      <div id="application-content" tabIndex={-1} className={styles.content} onFocusCapture={keepFocusVisible}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  </div>;
}
