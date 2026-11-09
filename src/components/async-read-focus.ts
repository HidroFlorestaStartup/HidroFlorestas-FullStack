/** Keep orientation before a focused read control is replaced by loading UI. */
export function focusReadRegion(trigger: HTMLElement, region: HTMLElement | null) {
  if (document.activeElement === trigger) region?.focus({ preventScroll: true });
}
