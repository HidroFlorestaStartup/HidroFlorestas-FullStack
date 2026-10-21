/** A later rejection does not establish that an earlier operation did not commit.
 * Call only on a failed HTTP response; explicit successful recovery/reload clears it.
 */
export function keepEnvironmentalUncertainty(wasUnknown: boolean, status: number): boolean {
  return wasUnknown || status >= 500;
}
