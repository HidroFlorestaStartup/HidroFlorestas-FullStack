import assert from "node:assert/strict";
import { test } from "node:test";
import {
  globalNavigationItems, isCurrentDestination, isLaboratoryPath,
  laboratoryNavigationItems,
} from "../../src/components/shell/navigation-state";

test("UI-01: outside a selected laboratory has only contextual global destinations", () => {
  assert.deepEqual(globalNavigationItems(false), [{ label: "Laboratórios", href: "/workspace" }]);
  assert.deepEqual(globalNavigationItems(true).map(item => item.label), ["Laboratórios", "Administração"]);
  assert.ok(!globalNavigationItems(true).some(item => item.label === "Áreas"));
});
test("UI-01: scoped destinations preserve exact Next.js App Router paths", () => {
  const base = "/dashboard/laboratories/00000000-0000-4000-8000-000000000123";
  assert.deepEqual(laboratoryNavigationItems(base.split("/").at(-1)!, false), [
    { label: "Resumo", href: base, exact: true },
    { label: "Áreas", href: base + "/areas", exact: false },
    { label: "Mapa", href: base + "/map", exact: false },
  ]);
  assert.deepEqual(laboratoryNavigationItems("lab-id", true).map(item => item.label), ["Resumo", "Áreas", "Mapa", "Membros"]);
  assert.equal(laboratoryNavigationItems("lab-id", false).some(item => item.label === "Membros"), false);
});
test("UI-01: active route matches descendants but not adjacent labs or sibling modules", () => {
  const base = "/dashboard/laboratories/lab-id";
  assert.equal(isCurrentDestination(base, base, true), true);
  assert.equal(isCurrentDestination(base + "/areas/abc", base, true), false);
  assert.equal(isCurrentDestination(base + "/areas/abc", base + "/areas"), true);
  assert.equal(isCurrentDestination(base + "/areas-and-stuff", base + "/areas"), false);
  assert.equal(isCurrentDestination("/dashboard/laboratories/lab-id-2", base), false);
});
test("UI-01: no selected laboratory in generic dashboard, account or workspace paths", () => {
  for (const pathname of ["/", "/workspace", "/admin", "/dashboard", "/change-password",
    "/dashboard/laboratories", "/dashboard/laboratories/"]) {
    assert.equal(isLaboratoryPath(pathname), false, pathname);
  }
  assert.equal(isLaboratoryPath("/dashboard/laboratories/lab-id"), true);
  assert.equal(isLaboratoryPath("/dashboard/laboratories/lab-id/areas"), true);
});
