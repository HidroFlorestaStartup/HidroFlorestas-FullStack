/** Pure measurement plan for the UI06 native reading band. No DOM mutation here. */
export type ReadingScrollInput = {
  targetTop: number;
  targetHeight: number;
  readingTop: number;
  readingBottom: number;
  scrollTop: number;
  maxScrollTop: number;
};

export function planReadableScroll(input: ReadingScrollInput) {
  const values = Object.values(input);
  if (values.some(value => !Number.isFinite(value)) || input.targetHeight <= 0 ||
      input.readingBottom < input.readingTop || input.scrollTop < 0 || input.maxScrollTop < input.scrollTop) {
    throw new Error("INVALID_READING_SCROLL_GEOMETRY");
  }
  const bandHeight = input.readingBottom - input.readingTop;
  const fitsBand = input.targetHeight <= bandHeight;
  // Align to the *unobscured* reading band, not the center of a scrollport
  // whose CSS scroll-padding may reserve more space than the fixed bottom rail.
  const desiredTop = input.readingTop + Math.max(0, (bandHeight - input.targetHeight) / 2);
  const requestedDelta = input.targetTop - desiredTop;
  const delta = Math.max(-input.scrollTop, Math.min(input.maxScrollTop - input.scrollTop, requestedDelta));
  const predictedTop = input.targetTop - delta;
  const predictedBottom = predictedTop + input.targetHeight;
  return {
    delta, desiredTop, predictedTop, predictedBottom, requestedDelta,
    clamped: Math.abs(delta - requestedDelta) > 0.001,
    fitsBand,
    predictedFullExposure: fitsBand && predictedTop >= input.readingTop - 0.001 &&
      predictedBottom <= input.readingBottom + 0.001,
  };
}

export type OverflowSource = "fullstack" | "starter";
/** A broken pinned reference is a real difference, not a FullStack defect. */
export function classifyHorizontalOverflow(source: OverflowSource, documentWidth: number, viewportWidth: number) {
  if (!Number.isFinite(documentWidth) || !Number.isFinite(viewportWidth) || viewportWidth <= 0) {
    throw new Error("INVALID_OVERFLOW_GEOMETRY");
  }
  const excessPx = Math.max(0, documentWidth - viewportWidth);
  return {
    excessPx,
    nativeFailure: source === "fullstack" && excessPx > 0,
    referenceNonEquivalent: source === "starter" && excessPx > 0,
  };
}

export type ReadingScrollOwner = "content" | "document";
export type ScrollportMeasurement = {
  exists: boolean; connected: boolean; clientHeight: number; scrollHeight: number;
  scrollTop: number; maxScrollTop: number;
};
export type ReadingScrollports = {
  content: ScrollportMeasurement & { overflowY: string; containsTarget: boolean };
  document: ScrollportMeasurement & { windowScrollY: number; scrollingElementTag: string | null };
};
/** Ownership follows computed DOM state, including an auto scrollport with zero range. */
export function selectReadingScrollOwner(scrollports: ReadingScrollports) {
  const content = scrollports.content;
  const ownsContent = content.exists && content.connected && content.containsTarget &&
    content.clientHeight > 0 && /^(auto|scroll|overlay)$/.test(content.overflowY);
  const scrollOwner: ReadingScrollOwner = ownsContent ? "content" : "document";
  const port = scrollports[scrollOwner];
  const scrollTop = scrollOwner === "document" ? scrollports.document.windowScrollY : port.scrollTop;
  if (!port.exists || !port.connected || port.clientHeight <= 0 ||
      [scrollTop, port.maxScrollTop, port.clientHeight, port.scrollHeight].some(value => !Number.isFinite(value)) ||
      scrollTop < 0 || port.maxScrollTop < scrollTop) throw new Error("INVALID_SCROLL_OWNER_GEOMETRY");
  return { scrollOwner, scrollTop, maxScrollTop: port.maxScrollTop, overflowY: content.overflowY };
}

/** Browser callback: read geometry only. Kept self-contained for Playwright serialization. */
export async function measureReadingExposure(node: Element) {
  const rect = (element: Element | null) => {
    if (!element) return null;
    const r = element.getBoundingClientRect();
    return { top:r.top, bottom:r.bottom, left:r.left, right:r.right, width:r.width, height:r.height };
  };
  const content = document.getElementById("application-content");
  const mainNode = content ?? document.getElementById("conteudo");
  const documentPort = document.scrollingElement;
  const overflowY = content ? getComputedStyle(content).overflowY : "absent";
  const port = (element: Element | null) => ({
    exists: !!element, connected: !!element?.isConnected, clientHeight: element?.clientHeight ?? 0,
    scrollHeight: element?.scrollHeight ?? 0, scrollTop: element?.scrollTop ?? 0,
    maxScrollTop: element ? Math.max(0, element.scrollHeight - element.clientHeight) : 0,
  });
  const scrollports = {
    content: { ...port(content), overflowY, containsTarget: !!content?.contains(node) },
    document: { ...port(documentPort), windowScrollY: window.scrollY, scrollingElementTag: documentPort?.tagName ?? null },
  };
  const targetRect = rect(node)!;
  const header = rect(document.querySelector("#application-header,header"));
  const main = rect(mainNode);
  const rails = [...document.querySelectorAll("nav")].filter(element => {
    const r = element.getBoundingClientRect();
    return getComputedStyle(element).position === "fixed" && r.height > 0 && r.top < innerHeight &&
      r.bottom > 0 && r.left < targetRect.right && r.right > targetRect.left;
  });
  const railTop = rails.length ? Math.min(...rails.map(element => element.getBoundingClientRect().top)) : innerHeight;
  const readingTop = Math.max(0, header?.bottom ?? 0, main?.top ?? 0);
  const readingBottom = Math.min(innerHeight, railTop, main?.bottom ?? innerHeight);
  const ratio = await new Promise<number>(resolve => {
    const observer = new IntersectionObserver(entries => { observer.disconnect(); resolve(entries[0]?.intersectionRatio ?? 0); });
    observer.observe(node);
  });
  const point = { x:targetRect.left + targetRect.width/2, y:targetRect.top + targetRect.height/2 };
  const hit = document.elementFromPoint(point.x, point.y);
  const unobstructed = (element: Element | null) => !!element && (element === node || node.contains(element));
  // getBoundingClientRect() is rectangular; border-radius clips the hit region.
  // Probe INSIDE each computed corner ellipse, not its transparent 1px corner.
  // Resolve percentages and CSS radius overlap before picking the five points.
  // No retry, ancestor acceptance, CSS mutation or visibility-threshold change.
  const style = getComputedStyle(node);
  const radius = (value: string) => {
    const parts = value.trim().split(/\s+/);
    const length = (part: string, size: number) => {
      if (!/^(?:\d+\.?\d*|\.\d+)(?:px|%)?$/.test(part)) return NaN;
      return parseFloat(part) * (part.endsWith("%") ? size / 100 : 1);
    };
    const x = length(parts[0], targetRect.width);
    const y = length(parts[1] ?? parts[0], targetRect.height);
    return x === 0 || y === 0 ? {x:0,y:0} : {x,y};
  };
  const radii = [style.borderTopLeftRadius, style.borderTopRightRadius,
    style.borderBottomRightRadius, style.borderBottomLeftRadius].map(radius);
  const radiiObserved = targetRect.width > 0 && targetRect.height > 0 &&
    radii.every(r => Number.isFinite(r.x) && Number.isFinite(r.y) && r.x >= 0 && r.y >= 0);
  const fit = (size: number, sum: number) => sum > 0 ? size / sum : 1;
  const factor = radiiObserved ? Math.min(1,
    fit(targetRect.width, radii[0].x + radii[1].x),
    fit(targetRect.width, radii[3].x + radii[2].x),
    fit(targetRect.height, radii[0].y + radii[3].y),
    fit(targetRect.height, radii[1].y + radii[2].y)) : 0;
  const corner = (index: number, right: boolean, bottom: boolean) => {
    const r = radii[index];
    // Half of each used radius is inside its quarter ellipse (0.5²+0.5²<1).
    const dx = Math.min(targetRect.width / 2, Math.max(1, r.x * factor / 2));
    const dy = Math.min(targetRect.height / 2, Math.max(1, r.y * factor / 2));
    return {x:right ? targetRect.right-dx : targetRect.left+dx,
      y:bottom ? targetRect.bottom-dy : targetRect.top+dy};
  };
  const coordinates = radiiObserved ? [corner(0,false,false),corner(1,true,false),point,
    corner(3,false,true),corner(2,true,true)] : [point];
  const hitPoints = coordinates.map(p => {
    const element = document.elementFromPoint(p.x,p.y);
    return { ...p, tag:element?.tagName ?? null, unobstructed:radiiObserved && unobstructed(element) };
  });
  return { viewport:{width:innerWidth,height:innerHeight}, rootFontPx:parseFloat(getComputedStyle(document.documentElement).fontSize),
    scrollports, header, main, railTop, readingTop, readingBottom, availableReadingHeight:Math.max(0,readingBottom-readingTop),
    target:{rect:targetRect,ratio,hit:{point,tag:hit?.tagName??null,unobstructed:unobstructed(hit)},hitPoints,
      hitTestMethod:"COMPUTED_ROUNDED_BORDER_INTERIOR_FIVE_POINTS",radiiObserved,radii,radiusScale:factor},
    mainOutsideViewport:!!main&&main.top>=innerHeight };
}

/** Browser callback: exactly one gesture on the selected owner, never on both. */
export function applyReadingScroll(node: Element, request: { scrollOwner: ReadingScrollOwner; delta: number }) {
  if (!Number.isFinite(request.delta)) throw new Error("INVALID_READING_SCROLL_DELTA");
  if (request.scrollOwner === "content") {
    const content = document.getElementById("application-content");
    if (!content?.isConnected || !content.contains(node) || !/^(auto|scroll|overlay)$/.test(getComputedStyle(content).overflowY)) {
      throw new Error("READING_SCROLL_OWNER_CHANGED");
    }
    content.scrollBy({top:request.delta,behavior:"instant"});
  } else {
    if (!document.scrollingElement?.isConnected) throw new Error("DOCUMENT_SCROLL_OWNER_UNAVAILABLE");
    window.scrollBy({top:request.delta,behavior:"instant"});
  }
}

export type ReadingExposureInput = {
  targetTop: number; targetBottom: number; targetLeft: number; targetRight: number;
  readingTop: number; readingBottom: number; viewportWidth: number;
  ratio: number; centerHit: boolean; edgeHits: boolean;
};
/** 0.001px covers arithmetic noise only; it does not relax a product visibility threshold. */
export function assessReadingExposure(input: ReadingExposureInput) {
  const sufficient = [input.targetTop,input.targetBottom,input.targetLeft,input.targetRight,input.readingTop,
    input.readingBottom,input.viewportWidth,input.ratio].every(value => Number.isFinite(value)) &&
    input.targetBottom > input.targetTop && input.targetRight > input.targetLeft && input.viewportWidth > 0 && input.ratio >= 0 && input.ratio <= 1;
  const fitsReadingBand = sufficient && input.targetBottom-input.targetTop <= input.readingBottom-input.readingTop+0.001 &&
    input.targetRight-input.targetLeft <= input.viewportWidth+0.001;
  const withinReadingBand = sufficient && input.targetTop >= input.readingTop-0.001 && input.targetBottom <= input.readingBottom+0.001 &&
    input.targetLeft >= -0.001 && input.targetRight <= input.viewportWidth+0.001;
  const fullyExposed = withinReadingBand && input.ratio === 1 && input.centerHit && input.edgeHits;
  return { sufficient, fitsReadingBand, withinReadingBand, fullyExposed,
    comparability: !sufficient ? "INSUFFICIENT_EVIDENCE" as const : fullyExposed ? "COMPARABLE" as const : "NON_EQUIVALENT" as const,
    reason: !sufficient ? "REFERENCE_READING_OBSERVATION_INSUFFICIENT" : fullyExposed ? null : "REFERENCE_READING_BAND_OCCLUSION" };
}
