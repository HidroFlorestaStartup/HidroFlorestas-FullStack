/** Observe both operations before either callback can throw or reject. */
export async function coordinateNavigationAndResponse<Response>(
  startResponse: () => Promise<Response>,
  startNavigation: () => Promise<unknown>,
): Promise<Response> {
  const incoming = Promise.resolve().then(startResponse);
  const navigation = Promise.resolve().then(startNavigation);
  // Both handlers exist before the queued callbacks run. If either fails,
  // the other remains observed while the caller starts its own finalization.
  const [response] = await Promise.all([incoming, navigation]);
  return response;
}
