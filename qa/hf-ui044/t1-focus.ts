import type { Locator, Page } from "@playwright/test";

export type KeyboardControl = {
  key: string; tag: string; label: string; href: string | null; tabIndex: number;
  visible: boolean; viewportRatio: number; centerHit: boolean;
};
export type KeyboardSnapshot = {
  active: KeyboardControl | null; target: KeyboardControl; sequence: KeyboardControl[];
  targetIndex: number; documentHasFocus: boolean; pathname: string; rootFontPx: number;
};
export type KeyboardEvent = { type: string; target: string | null; related: string | null; documentHasFocus: boolean };
export type KeyboardTraversal = {
  before: KeyboardSnapshot; afterTab: KeyboardSnapshot; afterReverse: KeyboardSnapshot;
  forwardEvents: KeyboardEvent[]; reverseEvents: KeyboardEvent[];
};

/** Serialised into the real page. The computed order remains evidence, never a focus mutation. */
export function inspectKeyboardSequence(target: Element): KeyboardSnapshot {
  const key = (node: Element) => {
    const parts: string[] = [];
    for (let current: Element | null = node; current; current = current.parentElement) {
      const siblings = current.parentElement ? [...current.parentElement.children].filter(item => item.tagName === current!.tagName) : [current];
      parts.unshift(current.tagName.toLowerCase() + ":nth-of-type(" + (siblings.indexOf(current) + 1) + ")");
    }
    return parts.join(">");
  };
  const describe = (node: Element): KeyboardControl => {
    const rect = node.getBoundingClientRect(), style = getComputedStyle(node);
    const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    const area = rect.width * rect.height;
    const visibleArea = Math.max(0, Math.min(innerWidth, rect.right) - Math.max(0, rect.left))
      * Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(0, rect.top));
    return { key: key(node), tag: node.tagName, label: (node.getAttribute("aria-label") ?? node.textContent ?? "").trim().slice(0, 100),
      href: node.getAttribute("href"), tabIndex: node instanceof HTMLElement ? node.tabIndex : -1,
      visible: node.getClientRects().length > 0 && style.visibility === "visible" && style.display !== "none" && node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }),
      viewportRatio: area > 0 ? visibleArea / area : 0, centerHit: !!hit && (hit === node || node.contains(hit)) };
  };
  const candidates = [...document.querySelectorAll("a[href],button,input,select,textarea,summary,iframe,[tabindex],[contenteditable]")]
    .filter((node): node is HTMLElement => node instanceof HTMLElement && node.tabIndex >= 0 && !node.matches(":disabled")
      && !node.closest("[inert]") && node.getClientRects().length > 0 && getComputedStyle(node).visibility === "visible")
    .map((node, index) => ({ node, index }))
    .sort((a, b) => {
      const aOrder = a.node.tabIndex > 0 ? a.node.tabIndex : Infinity;
      const bOrder = b.node.tabIndex > 0 ? b.node.tabIndex : Infinity;
      return aOrder === bOrder ? a.index - b.index : aOrder - bOrder;
    }).map(({ node }) => describe(node));
  const described = describe(target);
  return { active: document.activeElement ? describe(document.activeElement) : null, target: described,
    sequence: candidates, targetIndex: candidates.findIndex(item => item.key === described.key),
    documentHasFocus: document.hasFocus(), pathname: location.pathname,
    rootFontPx: parseFloat(getComputedStyle(document.documentElement).fontSize) };
}

export function assessKeyboardTraversal(observation: KeyboardTraversal, allowDocumentBoundary = false) {
  const { before, afterTab, afterReverse, forwardEvents, reverseEvents } = observation;
  const fail = (reason: string) => ({ pass: false, kind: "INVALID_KEYBOARD_TRAVERSAL", reason });
  const targetKey = before.target.key;
  if (before.active?.key !== targetKey || !before.documentHasFocus || before.targetIndex < 0) return fail("ACTION_NOT_FOCUSED_OR_NOT_IN_NATIVE_TAB_ORDER");
  if (!before.target.visible || before.target.viewportRatio < 0.999 || !before.target.centerHit) return fail("ACTION_INVISIBLE_OR_OBSTRUCTED");
  if (afterTab.pathname !== before.pathname || afterReverse.pathname !== before.pathname) return fail("TAB_UNEXPECTEDLY_CHANGED_ROUTE");
  if (afterReverse.active?.key !== targetKey || !afterReverse.documentHasFocus
      || !afterReverse.active.visible || afterReverse.active.viewportRatio < 0.999 || !afterReverse.active.centerHit) return fail("REVERSE_TAB_DID_NOT_RESTORE_VISIBLE_ACTION");
  const next = before.sequence[before.targetIndex + 1];
  if (next) {
    if (afterTab.active?.key !== next.key || !afterTab.documentHasFocus) return fail("TAB_DID_NOT_REACH_NEXT_NATIVE_CONTROL");
    if (!afterTab.active.visible || afterTab.active.viewportRatio <= 0 || !afterTab.active.centerHit) return fail("NEXT_NATIVE_CONTROL_INVISIBLE_OR_OBSTRUCTED");
    if (!forwardEvents.some(event => event.type === "focusin" && event.target === next.key)
        || !reverseEvents.some(event => event.type === "focusin" && event.target === targetKey)) return fail("NATIVE_FOCUS_EVENTS_MISSING");
    return { pass: true, kind: "NEXT_NATIVE_CONTROL_AND_REVERSE_CONFIRMED", reason: null };
  }
  if (!allowDocumentBoundary) return fail("DOCUMENT_BOUNDARY_NOT_ALLOWED_FOR_THIS_SOURCE");
  if (afterTab.active?.tag !== "BODY" || afterTab.documentHasFocus) return fail("LAST_CONTROL_DID_NOT_EXIT_DOCUMENT_FOCUS");
  if (!forwardEvents.some(event => event.type === "focusout" && event.target === targetKey && event.related === null)
      || !forwardEvents.some(event => event.type === "window-blur" && !event.documentHasFocus)
      || !reverseEvents.some(event => event.type === "window-focus" && event.documentHasFocus)
      || !reverseEvents.some(event => event.type === "focusin" && event.target === targetKey)) return fail("DOCUMENT_BOUNDARY_EVENT_SIGNATURE_MISSING");
  return { pass: true, kind: "NATIVE_DOCUMENT_BOUNDARY_AND_REVERSE_CONFIRMED", reason: null };
}

/** Real Tab / Shift+Tab only. No corrective focus() occurs after either key. */
export async function observeKeyboardTraversal(page: Page, action: Locator): Promise<KeyboardTraversal> {
  const recorder = await page.evaluateHandle(() => {
    const events: KeyboardEvent[] = [];
    const key = (node: EventTarget | null) => {
      if (!(node instanceof Element)) return null;
      const parts: string[] = [];
      for (let current: Element | null = node; current; current = current.parentElement) {
        const siblings = current.parentElement ? [...current.parentElement.children].filter(item => item.tagName === current!.tagName) : [current];
        parts.unshift(current.tagName.toLowerCase() + ":nth-of-type(" + (siblings.indexOf(current) + 1) + ")");
      }
      return parts.join(">");
    };
    const focus = (event: FocusEvent) => events.push({ type: event.type, target: key(event.target), related: key(event.relatedTarget), documentHasFocus: document.hasFocus() });
    const windowFocus = (event: Event) => events.push({ type: "window-" + event.type, target: null, related: null, documentHasFocus: document.hasFocus() });
    document.addEventListener("focusin", focus); document.addEventListener("focusout", focus);
    window.addEventListener("focus", windowFocus); window.addEventListener("blur", windowFocus);
    return { events, stop: () => {
      document.removeEventListener("focusin", focus); document.removeEventListener("focusout", focus);
      window.removeEventListener("focus", windowFocus); window.removeEventListener("blur", windowFocus);
    } };
  });
  try {
    const before = await action.evaluate(inspectKeyboardSequence);
    await page.keyboard.press("Tab");
    const afterTab = await action.evaluate(inspectKeyboardSequence);
    const forwardEvents = await recorder.evaluate(value => value.events.slice());
    await page.keyboard.press("Shift+Tab");
    const afterReverse = await action.evaluate(inspectKeyboardSequence);
    const allEvents = await recorder.evaluate(value => value.events.slice());
    return { before, afterTab, afterReverse, forwardEvents, reverseEvents: allEvents.slice(forwardEvents.length) };
  } finally { await recorder.evaluate(value => value.stop()); await recorder.dispose(); }
}
