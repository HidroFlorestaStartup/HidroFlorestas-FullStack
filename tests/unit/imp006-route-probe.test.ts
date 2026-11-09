import assert from "node:assert/strict";
import { createServer } from "node:http";
import { test } from "node:test";
import { probeIHFRRouteContext } from "../e2e/support/ihfr-route-probe";

const laboratoryId = "60000000-0000-4000-8000-000000000011";
const areaId = "60000000-0000-4000-8000-000000000031";
const route = `/dashboard/laboratories/${laboratoryId}/areas/${areaId}/collections/new`;
const ownedSchema = `imp006_test_${"a".repeat(32)}`;

test("IHFR failure probes isolate cookie expiry and emit only allowed observations", async () => {
  const sentinel = "SYNTHETIC_PRIVATE_SENTINEL";
  const seen: Array<{ method: string | undefined; cookieMatches: boolean }> = [];
  const server = createServer((req, res) => {
    seen.push({ method: req.method, cookieMatches: req.headers.cookie === `auth_token=${sentinel}` });
    res.setHeader("content-type", "application/json");
    if (req.url === "/api/auth/me") {
      res.statusCode = 401;
      res.setHeader("set-cookie", "auth_token=; Path=/; Max-Age=0");
      res.end(JSON.stringify({ success: false, code: "UNAUTHENTICATED", message: sentinel }));
    } else if (req.url === "/api/laboratories") {
      res.end(JSON.stringify({ success: true, laboratories: [{ id: laboratoryId, name: sentinel }] }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: { code: sentinel, message: sentinel } }));
    }
  });
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const baseURL = `http://127.0.0.1:${address.port}`;
  const cookies = [{ name: "auth_token", value: sentinel, domain: "127.0.0.1", path: "/", expires: -1, httpOnly: true, secure: false, sameSite: "Lax" as const }];
  try {
    const result = await probeIHFRRouteContext({ baseURL, navigationURL: baseURL + route, cookies, ownedSchema });
    assert.equal(result.outcome, "RECORDED");
    assert.equal(JSON.stringify(result).includes(sentinel), false, "Private synthetic fields must not escape");
    assert.equal(seen.length, 3);
    assert.equal(seen.every(item => item.method === "GET" && item.cookieMatches), true);
    assert.equal(cookies[0].value === sentinel, true, "Input cookies must remain unchanged");
    assert.deepEqual(result.probes, [
      { probe: "authentication", status: 401, representation: "json", code: "UNAUTHENTICATED", authenticated: false },
      { probe: "laboratories", status: 200, representation: "json", code: undefined, containsExpectedLaboratory: true },
      { probe: "area", status: 404, representation: "json", code: "OTHER", containsExpectedArea: false },
    ]);
  } finally { await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); }
});

test("IHFR failure probes preserve HTML and redirect statuses without following redirects", async () => {
  let redirectedRequests = 0;
  const server = createServer((req, res) => {
    if (req.url === "/never-follow") redirectedRequests++;
    if (req.url === "/api/auth/me") { res.writeHead(302, { location: "/never-follow" }); res.end(); }
    else if (req.url === "/api/laboratories") { res.writeHead(404, { "content-type": "text/html" }); res.end("<h1>SYNTHETIC_BODY_NOT_RECORDED</h1>"); }
    else { res.writeHead(200, { "content-type": "application/json" }); res.end(JSON.stringify({ area: { id: areaId } })); }
  });
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const baseURL = `http://127.0.0.1:${address.port}`;
  try {
    const result = await probeIHFRRouteContext({ baseURL, navigationURL: baseURL + route, cookies: [], ownedSchema });
    assert.equal(result.outcome, "RECORDED");
    assert.equal(redirectedRequests, 0);
    assert.deepEqual(result.probes?.map(item => "status" in item ? [item.status, item.representation] : []), [[302, "other"], [404, "html"], [200, "json"]]);
    assert.equal(JSON.stringify(result).includes("SYNTHETIC_BODY_NOT_RECORDED"), false);
    assert.equal(result.probes?.some(item => "containsExpectedArea" in item && item.containsExpectedArea), true);
  } finally { await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); }
});

test("IHFR failure probes refuse unowned origins or schemas before making any request", async () => {
  const baseURL = "http://127.0.0.1:1";
  for (const input of [
    { baseURL: "https://synthetic.example.invalid", navigationURL: `https://synthetic.example.invalid${route}`, ownedSchema },
    { baseURL, navigationURL: baseURL + route, ownedSchema: "public" },
    { baseURL, navigationURL: `http://localhost:1${route}`, ownedSchema },
    { baseURL, navigationURL: baseURL + "/unrecognized", ownedSchema },
  ]) assert.deepEqual(await probeIHFRRouteContext({ ...input, cookies: [] }), { outcome: "SKIPPED_GUARD" });
});
