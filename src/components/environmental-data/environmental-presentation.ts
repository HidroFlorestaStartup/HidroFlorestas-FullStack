/** Render the full shortest round-tripping decimal, without hiding non-zero values.
 * Draft editing strings never pass through this formatter.
 */
export function formatEnvironmentalNumber(value: number): string {
  if (!Number.isFinite(value)) throw new RangeError('NON_FINITE_ENVIRONMENTAL_VALUE');
  const text = String(Object.is(value, -0) ? 0 : value);
  const [mantissa, exponent] = text.toLowerCase().split('e');
  if (exponent === undefined) return text;
  const negative = mantissa.startsWith('-');
  const unsigned = negative ? mantissa.slice(1) : mantissa;
  const [integer, fraction = ''] = unsigned.split('.');
  const digits = integer + fraction;
  const position = integer.length + Number(exponent);
  const decimal = position <= 0 ? `0.${'0'.repeat(-position)}${digits}`
    : position >= digits.length ? digits + '0'.repeat(position - digits.length)
    : `${digits.slice(0, position)}.${digits.slice(position)}`;
  return (negative ? '-' : '') + decimal;
}

/** Expand closed ancestors before focusing; HTML IDs may contain dots. */
export function focusEnvironmentalTarget(id: string, root: Pick<Document, 'getElementById'> = document): boolean {
  const target = root.getElementById(id) ?? root.getElementById('form-title');
  if (!target) return false;
  let group = target.closest<HTMLDetailsElement>('details');
  while (group) {
    group.open = true;
    group = group.parentElement?.closest<HTMLDetailsElement>('details') ?? null;
  }
  target.focus({ preventScroll: true });
  target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  return true;
}
