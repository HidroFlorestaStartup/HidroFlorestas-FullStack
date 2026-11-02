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
