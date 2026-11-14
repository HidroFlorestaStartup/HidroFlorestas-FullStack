"use client";

import { useCallback, useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";

export type CollectionDetailSlots = {
  header: ReactNode;
  record: ReactNode;
  environmental: ReactNode;
  metadataClassName: string;
};

type ElementPosition = { block: string; path: number[] };
type PresentationSnapshot = {
  focus: ElementPosition | null;
  openDetails: ElementPosition[];
};

// Match the existing xl columns, without coupling the height of the two stacks.
const desktopQuery = "(min-width: 80rem)";
const getDesktopSnapshot = () => window.matchMedia(desktopQuery).matches;
const getServerSnapshot = () => false;

function positionInBlock(root: HTMLElement, element: Element | null): ElementPosition | null {
  const block = element?.closest<HTMLElement>("[data-collection-detail-block]");
  if (!element || !block || !root.contains(block)) return null;
  const path: number[] = [];
  let current = element;
  while (current !== block) {
    const parent = current.parentElement;
    if (!parent) return null;
    path.unshift(Array.prototype.indexOf.call(parent.children, current));
    current = parent;
  }
  return { block: block.dataset.collectionDetailBlock!, path };
}

function elementAtPosition(root: HTMLElement, position: ElementPosition): HTMLElement | null {
  let element: Element | null = Array.from(root.querySelectorAll<HTMLElement>("[data-collection-detail-block]"))
    .find((block) => block.dataset.collectionDetailBlock === position.block) ?? null;
  for (const index of position.path) element = element?.children.item(index) ?? null;
  return element instanceof HTMLElement ? element : null;
}

export function CollectionDetailLayout({ header, record, environmental, metadataClassName, reading, actions }: CollectionDetailSlots & { reading: ReactNode; actions?: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);
  const presentation = useRef<PresentationSnapshot | null>(null);
  const subscribe = useCallback((onChange: () => void) => {
    const media = window.matchMedia(desktopQuery);
    const onResize = () => {
      const root = rootRef.current;
      if (root) {
        presentation.current = {
          focus: positionInBlock(root, root.ownerDocument.activeElement),
          openDetails: Array.from(root.querySelectorAll("details[open]"))
            .map((details) => positionInBlock(root, details))
            .filter((position): position is ElementPosition => position !== null),
        };
      }
      onChange();
    };
    media.addEventListener("change", onResize);
    return () => media.removeEventListener("change", onResize);
  }, []);
  const desktop = useSyncExternalStore(subscribe, getDesktopSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const snapshot = presentation.current;
    if (!root || !snapshot) return;
    // Only presentation nodes move. The IHFR controller and dialog stay mounted.
    for (const position of snapshot.openDetails) {
      const details = elementAtPosition(root, position);
      if (details instanceof HTMLDetailsElement) details.open = true;
    }
    if (snapshot.focus) elementAtPosition(root, snapshot.focus)?.focus({ preventScroll: true });
    presentation.current = null;
  }, [desktop]);

  const diagnosisClassName = actions ? "mx-auto w-full min-w-0 max-w-4xl" : "min-w-0";
  const headerBlock = <div key="header" data-collection-detail-block="header" className={metadataClassName}>{header}</div>;
  const readingBlock = <div key="reading" data-collection-detail-block="reading" className={diagnosisClassName}>{reading}</div>;
  const recordBlock = <div key="record" data-collection-detail-block="record" className={metadataClassName}>{record}</div>;
  const environmentalBlock = <div key="environmental" data-collection-detail-block="environmental" className={metadataClassName}>{environmental}</div>;
  const actionsBlock = actions ? <div key="actions" data-collection-detail-block="actions" className={diagnosisClassName}>{actions}</div> : null;

  return <article ref={rootRef} aria-labelledby="collection-detail-title" className="min-w-0">
    {desktop ? <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] items-start gap-6">
      <div className="grid min-w-0 gap-5">{headerBlock}{environmentalBlock}{recordBlock}</div>
      <div className="grid min-w-0 gap-6">{readingBlock}{actionsBlock}</div>
    </div> : <div className="grid min-w-0 gap-6">
      {headerBlock}{readingBlock}{environmentalBlock}{recordBlock}{actionsBlock}
    </div>}
  </article>;
}
