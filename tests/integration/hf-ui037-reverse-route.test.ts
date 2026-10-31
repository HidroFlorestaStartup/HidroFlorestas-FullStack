import assert from "node:assert/strict";
import { it } from "node:test";
import { createReverseGeocodingHandler } from "../../src/app/api/geocoding/reverse/route";
const request = (lat = "-2.5", lon = "-44") =>
  new Request("https://example.test/api/geocoding/reverse?latitude=" + lat + "&longitude=" + lon);
it("protects endpoint: no unauthenticated network and no provider assumed", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async () => { calls++; return Response.json({ municipality: "X" }); };
  const rejected = createReverseGeocodingHandler({ authorize: async () => { throw new Error("unauthorized"); }, endpoint: () => "https://provider.example/reverse", fetcher });
  const denied = await rejected(request());
  assert.equal(denied.status, 401);
  assert.equal(denied.headers.get("cache-control"), "no-store");
  assert.equal(calls, 0);
  const disabled = createReverseGeocodingHandler({ authorize: async () => ({}), endpoint: () => undefined, fetcher });
  assert.equal((await disabled(request())).status, 503);
  assert.equal(calls, 0);
});
it("validates coordinates and configured HTTPS without contacting a provider", async () => {
  const handler = createReverseGeocodingHandler({ authorize: async () => ({}), endpoint: () => "http://localhost/reverse", fetcher: async () => { throw new Error("must not run"); } });
  for (const params of [["91", "2"], ["", "0"], ["0", "999"], ["0x2", "0"]]) {
    assert.equal((await handler(request(params[0], params[1]))).status, 400);
  }
  assert.equal((await handler(request())).status, 503);
});
it("normalizes partial data; a provider failure/limit cannot block submission", async () => {
  let seen = "";
  const handler = createReverseGeocodingHandler({
    authorize: async () => ({}), endpoint: () => "https://approved.example/reverse?format=json",
    fetcher: async input => { seen = String(input); return Response.json({ address: { town: "Codó", state: "Maranhão" } }); },
  });
  const response = await handler(request());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual((await response.json()).address, { municipality: "Codó", state: "MA", cep: null });
  assert.match(seen, /lat=-2.5/);
  assert.match(seen, /lon=-44/);
  const limited = createReverseGeocodingHandler({ authorize: async () => ({}), endpoint: () => "https://approved.example/reverse", fetcher: async () => new Response(null, { status: 429 }) });
  assert.equal((await limited(request())).status, 503);
  const offline = createReverseGeocodingHandler({ authorize: async () => ({}), endpoint: () => "https://approved.example/reverse", fetcher: async () => { throw new Error("offline"); } });
  assert.equal((await offline(request())).status, 503);
});
