"use client";
import type { ReactNode } from "react";
import TopBar from "@/components/top-bar";
import Sidebar from "@/components/sidebar";
import { useContentScroll, type ContentScrollScope } from "./use-content-scroll";
import styles from "./shell.module.css";

export function ApplicationShell({ children, canAdmin, scope }: { children: ReactNode; canAdmin: boolean; scope: ContentScrollScope }) {
  const { contentRef, keepFocusVisible } = useContentScroll(scope);
  return <div className={styles.shell}>
    <a href="#application-content" className={styles.skip}>Pular para o conteúdo</a>
    <TopBar showProfile showLogout />
    <div className={styles.frame}>
      <Sidebar canAdmin={canAdmin} />
      <div ref={contentRef} id="application-content" tabIndex={-1} className={styles.content} onFocusCapture={keepFocusVisible}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  </div>;
}
