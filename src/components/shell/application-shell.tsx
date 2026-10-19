"use client";
import { useEffect, useRef, type FocusEvent, type ReactNode } from "react";
import TopBar from "@/components/top-bar";
import Sidebar from "@/components/sidebar";
import styles from "./shell.module.css";

function revealFocus(target: HTMLElement, content: HTMLDivElement) {
  if (document.activeElement !== target || target.closest("dialog[open]")) return;
  const ownScroll = getComputedStyle(content).overflowY === "auto";
  const header = document.getElementById("application-header")?.getBoundingClientRect().bottom ?? 0;
  if (target === content) {
    if (ownScroll) content.scrollTo({ top: 0, behavior: "instant" });
    else window.scrollBy({ top: content.getBoundingClientRect().top - header - 8, behavior: "instant" });
    return;
  }
  const box = target.getBoundingClientRect();
  if (ownScroll) {
    const region = content.getBoundingClientRect();
    if (box.top < region.top + 8 || box.bottom > region.bottom - 8) {
      target.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  } else if (box.top < header + 8 || box.bottom > innerHeight - 8) {
    target.scrollIntoView({ block: "center", behavior: "instant" });
  }
}
export function ApplicationShell({ children, canAdmin }: { children: ReactNode; canAdmin: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    // Header, wrapping links and safe-area can change the actual reading height.
    const observer = new ResizeObserver(() => {
      const active = document.activeElement;
      if (active instanceof HTMLElement && active !== content && content.contains(active)) {
        requestAnimationFrame(() => revealFocus(active, content));
      }
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);
  function keepFocusVisible(event: FocusEvent<HTMLDivElement>) {
    const target = event.target;
    const content = event.currentTarget;
    if (!(target instanceof HTMLElement)) return;
    requestAnimationFrame(() => revealFocus(target, content));
  }
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
