"use client";
import { useEffect, useRef, type FocusEvent } from "react";
import { usePathname } from "next/navigation";

// Per-tab positions are keyed by pathname, not by individual history entries.
// This UI cache contains only route paths and offsets, never account data.
const positions = new Map<string, number>();
const storageKey = "hidroflorestas.content-scroll.v1";
let hydrated = false;
let initialNavigationRead = false;
let pendingRestore: { path: string; top: number } | null = null;
function ownScroll(content: HTMLElement) { return getComputedStyle(content).overflowY === "auto"; }
function persist() {
  try { sessionStorage.setItem(storageKey, JSON.stringify([...positions].slice(-50))); }
  catch { /* Scroll and focus still work when tab storage is unavailable. */ }
}
function hydrate() {
  if (hydrated) return;
  hydrated = true;
  try {
    const entries: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? "[]");
    if (Array.isArray(entries)) for (const entry of entries.slice(-50)) {
      if (Array.isArray(entry) && typeof entry[0] === "string" && entry[0].startsWith("/") &&
          entry[0].length <= 512 && !/[?#]/.test(entry[0]) &&
          typeof entry[1] === "number" && Number.isFinite(entry[1]) && entry[1] >= 0 && entry[1] <= 10_000_000) {
        positions.set(entry[0], entry[1]);
      }
    }
  } catch { /* A malformed UI cache never affects access or navigation. */ }
}
function remember(path: string, content: HTMLElement) {
  if (!content.isConnected || !content.getClientRects().length || !ownScroll(content)) return;
  positions.delete(path);
  positions.set(path, content.scrollTop);
  if (positions.size > 50) positions.delete(positions.keys().next().value!);
}
function revealFocus(target: HTMLElement, content: HTMLDivElement) {
  if (document.activeElement !== target || target.closest("dialog[open]")) return;
  const header = document.getElementById("application-header")?.getBoundingClientRect().bottom ?? 0;
  if (target === content) {
    if (ownScroll(content)) content.scrollTo({ top: 0, behavior: "instant" });
    else window.scrollBy({ top: content.getBoundingClientRect().top - header - 8, behavior: "instant" });
    return;
  }
  const box = target.getBoundingClientRect();
  if (ownScroll(content)) {
    const region = content.getBoundingClientRect();
    if (box.top < region.top + 8 || box.bottom > region.bottom - 8) target.scrollIntoView({ block: "nearest", behavior: "instant" });
  } else if (box.top < header + 8 || box.bottom > innerHeight - 8) {
    target.scrollIntoView({ block: "center", behavior: "instant" });
  }
}
export function useContentScroll() {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const currentPath = useRef<string | null>(null);
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const changedPath = currentPath.current !== pathname;
    currentPath.current = pathname;
    hydrate();
    if (!initialNavigationRead) {
      initialNavigationRead = true;
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const top = positions.get(pathname);
      if (ownScroll(content) && top !== undefined && (navigation?.type === "reload" || navigation?.type === "back_forward")) {
        pendingRestore = { path: pathname, top };
      }
    }
    if (changedPath && ownScroll(content) && pendingRestore?.path !== pathname) {
      pendingRestore = null;
      // Native Next scrolling targets the document. A new route also needs to
      // start at the top of this scrollport; leave fragment targets to Next.
      if (!window.location.hash) content.scrollTo({ top: 0, behavior: "instant" });
    }
    let frame = 0;
    let disposed = false;
    let attemptedRestore: { path: string; top: number; maximum: number } | null = null;
    const update = () => {
      if (disposed) return;
      if (pendingRestore) {
        if (pendingRestore.path !== pathname) return;
        if (ownScroll(content)) {
          const desired = pendingRestore.top;
          const maximum = Math.max(0, content.scrollHeight - content.clientHeight);
          if (!attemptedRestore || attemptedRestore.path !== pathname || attemptedRestore.top !== desired || maximum > attemptedRestore.maximum) {
            content.scrollTo({ top: desired, behavior: "instant" });
            attemptedRestore = { path: pathname, top: desired, maximum };
          }
          // Client reads can initially render a shorter loading state.
          // Retry when its available extent grows, without repeatedly forcing
          // the same clamped position on unrelated resize notifications.
          if (Math.abs(content.scrollTop - desired) <= 1) pendingRestore = null;
        } else pendingRestore = null;
      }
      const active = document.activeElement;
      if (active instanceof HTMLElement && active !== content && content.contains(active) && !active.closest("dialog[open]")) {
        // A shorter final page may never reach the saved offset. Restoration
        // must not suppress focus protection while waiting for more content.
        pendingRestore = null;
        revealFocus(active, content);
      }
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const scrolled = () => {
      if (!pendingRestore && window.location.pathname === pathname) remember(pathname, content);
    };
    const intent = () => {
      pendingRestore = null;
      remember(pathname, content);
      persist();
    };
    const popped = () => {
      if (!ownScroll(content)) { pendingRestore = null; return; }
      remember(pathname, content);
      persist();
      const path = window.location.pathname;
      const top = positions.get(path);
      pendingRestore = top === undefined ? null : { path, top };
      schedule();
    };
    const hidden = () => {
      if (!pendingRestore && window.location.pathname === pathname) remember(pathname, content);
      persist();
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(content);
    if (content.firstElementChild) observer.observe(content.firstElementChild);
    content.addEventListener("scroll", scrolled, { passive: true });
    content.addEventListener("pointerdown", intent);
    content.addEventListener("keydown", intent);
    content.addEventListener("wheel", intent, { passive: true });
    window.addEventListener("popstate", popped);
    window.addEventListener("pagehide", hidden);
    schedule();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect();
      content.removeEventListener("scroll", scrolled);
      content.removeEventListener("pointerdown", intent);
      content.removeEventListener("keydown", intent);
      content.removeEventListener("wheel", intent);
      window.removeEventListener("popstate", popped);
      window.removeEventListener("pagehide", hidden);
      if (["/login", "/logout", "/register"].includes(window.location.pathname)) {
        positions.clear(); pendingRestore = null;
        try { sessionStorage.removeItem(storageKey); } catch { /* Optional UI cache. */ }
      } else persist();
    };
  }, [pathname]);
  function keepFocusVisible(event: FocusEvent<HTMLDivElement>) {
    const target = event.target;
    const content = event.currentTarget;
    if (!(target instanceof HTMLElement) || target.closest("dialog[open]")) return;
    // Programmatic focus is also an explicit navigation intent, even without a
    // preceding key or pointer event. It takes priority over cached offsets.
    pendingRestore = null;
    requestAnimationFrame(() => revealFocus(target, content));
  }
  return { contentRef, keepFocusVisible };
}
