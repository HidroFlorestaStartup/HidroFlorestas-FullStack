"use client";
import { useEffect, useRef, type FocusEvent } from "react";
import { usePathname } from "next/navigation";

// Per-tab positions are keyed by pathname, not by individual history entries.
// This UI cache contains only route paths and offsets, never account data.
const positions = new Map<string, number>();
const storageKey = "hidroflorestas.content-scroll.v1";
let hydrated = false;
let initialNavigationRead = false;
type RestorePosition = { path: string; top: number };
export type ContentScrollScope = "/workspace" | "/dashboard";
let popSequence = 0;
let popRestore: (RestorePosition & { sequence: number; timestamp: number; claimed: boolean }) | null = null;
let popListenerAttached = false;
const popSubscribers = new Set<() => void>();
function belongsToScope(path: string, scope: ContentScrollScope) { return path === scope || path.startsWith(scope + "/"); }
function visibleContent(content: HTMLElement) { return content.isConnected && content.getClientRects().length > 0; }
function ownScroll(content: HTMLElement) { return getComputedStyle(content).overflowY === "auto"; }
export function clearContentScrollCache() {
  positions.clear(); popRestore = null;
  try { sessionStorage.removeItem(storageKey); } catch { /* Optional UI cache. */ }
}
function persist() {
  try {
    if (positions.size === 0) sessionStorage.removeItem(storageKey);
    else sessionStorage.setItem(storageKey, JSON.stringify([...positions].slice(-50)));
  }
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
function attachPopListener() {
  hydrate();
  if (popListenerAttached) return;
  popListenerAttached = true;
  // Navigation can replace both layout instances before the POP is delivered.
  // The tab-level intent therefore outlives every individual shell effect.
  window.addEventListener("popstate", event => {
    const path = window.location.pathname;
    popRestore = { path, top: positions.get(path) ?? 0, sequence: ++popSequence, timestamp: event.timeStamp, claimed: false };
    for (const notify of popSubscribers) notify();
  }, true);
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
    const rail = document.getElementById("application-navigation");
    const bottom = rail && getComputedStyle(rail).position === "fixed"
      ? Math.min(region.bottom, rail.getBoundingClientRect().top) : region.bottom;
    if (box.top < region.top + 8 || box.bottom > bottom - 8) {
      target.scrollIntoView({ block: "nearest", behavior: "instant" });
      // scrollIntoView only knows the scrollport, not a fixed contextual rail.
      const after = target.getBoundingClientRect();
      if (after.bottom > bottom - 8) content.scrollBy({ top: after.bottom - bottom + 8, behavior: "instant" });
      else if (after.top < region.top + 8) content.scrollBy({ top: after.top - region.top - 8, behavior: "instant" });
    }
  } else if (box.top < header + 8 || box.bottom > innerHeight - 8) {
    target.scrollIntoView({ block: "center", behavior: "instant" });
  }
}
export function useContentScroll(scope: ContentScrollScope) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const currentPath = useRef<string | null>(null);
  const pendingRestore = useRef<RestorePosition | null>(null);
  const claimedSequence = useRef(0);
  useEffect(() => {
    const content = contentRef.current;
    attachPopListener();
    // usePathname can already expose the destination while its previous layout
    // is still mounted. That previous shell must not own the new route's UI.
    if (!content || !belongsToScope(pathname, scope) || !visibleContent(content) || window.location.pathname !== pathname) return;
    const active = () => visibleContent(content) && window.location.pathname === pathname && belongsToScope(pathname, scope);
    const changedPath = currentPath.current !== pathname;
    currentPath.current = pathname;
    hydrate();
    const invalidateForeignMarker = () => {
      if (active() && popRestore && popRestore.path !== pathname) {
        popRestore = null;
      }
    };
    invalidateForeignMarker();
    const claimPop = () => {
      if (!active() || !popRestore || popRestore.claimed || popRestore.path !== pathname || popRestore.sequence <= claimedSequence.current) return false;
      pendingRestore.current = { path: pathname, top: popRestore.top };
      claimedSequence.current = popRestore.sequence;
      popRestore.claimed = true;
      return true;
    };
    const claimedPop = claimPop();
    if (!initialNavigationRead) {
      initialNavigationRead = true;
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const top = positions.get(pathname);
      if (ownScroll(content) && top !== undefined && (navigation?.type === "reload" || navigation?.type === "back_forward")) {
        pendingRestore.current = { path: pathname, top };
      }
    }
    if (pendingRestore.current?.path !== pathname) pendingRestore.current = null;
    if (changedPath && ownScroll(content) && !claimedPop && !pendingRestore.current) {
      // Native Next scrolling targets the document. A new route also needs to
      // start at the top of this scrollport; leave fragment targets to Next.
      if (!window.location.hash) content.scrollTo({ top: 0, behavior: "instant" });
    }
    let frame = 0;
    let disposed = false;
    let attemptedRestore: { path: string; top: number; maximum: number } | null = null;
    const update = () => {
      if (disposed || !active()) return;
      invalidateForeignMarker();
      // A POP may arrive after this layout's effect has already mounted.
      if (claimPop()) attemptedRestore = null;
      if (pendingRestore.current) {
        if (ownScroll(content)) {
          const desired = pendingRestore.current.top;
          const maximum = Math.max(0, content.scrollHeight - content.clientHeight);
          if (!attemptedRestore || attemptedRestore.path !== pathname || attemptedRestore.top !== desired || maximum > attemptedRestore.maximum) {
            content.scrollTo({ top: desired, behavior: "instant" });
            attemptedRestore = { path: pathname, top: desired, maximum };
          }
          // Client reads can initially render a shorter loading state.
          // Retry when its available extent grows, without repeatedly forcing
          // the same clamped position on unrelated resize notifications.
          if (Math.abs(content.scrollTop - desired) <= 1) pendingRestore.current = null;
        } else pendingRestore.current = null;
      }
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && focused !== content && content.contains(focused) && !focused.closest("dialog[open]")) {
        // A shorter final page may never reach the saved offset. Restoration
        // must not suppress focus protection while waiting for more content.
        pendingRestore.current = null;
        revealFocus(focused, content);
      }
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const scrolled = () => {
      const willRemember = active() && !pendingRestore.current;
      if (willRemember) remember(pathname, content);
    };
    const intent = () => {
      if (!active()) return;
      pendingRestore.current = null;
      remember(pathname, content);
      persist();
    };
    const popNotified = () => schedule();
    const hidden = () => {
      if (active() && !pendingRestore.current) remember(pathname, content);
      persist();
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(content);
    if (content.firstElementChild) observer.observe(content.firstElementChild);
    content.addEventListener("scroll", scrolled, { passive: true });
    content.addEventListener("pointerdown", intent);
    content.addEventListener("keydown", intent);
    content.addEventListener("wheel", intent, { passive: true });
    popSubscribers.add(popNotified);
    window.addEventListener("pagehide", hidden);
    schedule();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect();
      content.removeEventListener("scroll", scrolled);
      content.removeEventListener("pointerdown", intent);
      content.removeEventListener("keydown", intent);
      content.removeEventListener("wheel", intent);
      popSubscribers.delete(popNotified);
      window.removeEventListener("pagehide", hidden);
      if (window.location.pathname !== pathname) {
        currentPath.current = null;
        pendingRestore.current = null;
      }
      // Successful deletion stays on its public confirmation page. Discard this
      // disposable view cache on entry, rather than waiting for a login redirect.
      if (["/login", "/logout", "/register", "/delete-account"].includes(window.location.pathname)) {
        clearContentScrollCache();
        pendingRestore.current = null;
      } else persist();
    };
  }, [pathname, scope]);
  function keepFocusVisible(event: FocusEvent<HTMLDivElement>) {
    const target = event.target;
    const content = event.currentTarget;
    if (!(target instanceof HTMLElement) || target.closest("dialog[open]") || !belongsToScope(pathname, scope) || window.location.pathname !== pathname || !visibleContent(content)) return;
    // Programmatic focus is also an explicit navigation intent, even without a
    // preceding key or pointer event. It takes priority over cached offsets.
    pendingRestore.current = null;
    requestAnimationFrame(() => {
      if (window.location.pathname === pathname && visibleContent(content)) revealFocus(target, content);
    });
  }
  return { contentRef, keepFocusVisible };
}
