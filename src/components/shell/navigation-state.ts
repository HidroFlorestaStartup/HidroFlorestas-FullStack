/** Presentation-only navigation models. Authorisation remains on server routes. */
export function isLaboratoryPath(pathname: string): boolean {
  return /^\/dashboard\/laboratories\/[^/]+(?:\/|$)/.test(pathname);
}

export function globalNavigationItems(canAdmin: boolean) {
  return [
    { label: "Laboratórios", href: "/workspace" },
    ...(canAdmin ? [{ label: "Administração", href: "/admin" }] : []),
  ];
}

export function laboratoryNavigationItems(laboratoryId: string, canManageMembers: boolean) {
  const base = "/dashboard/laboratories/" + laboratoryId;
  return [
    { label: "Resumo", href: base, exact: true },
    { label: "Áreas", href: base + "/areas", exact: false },
    { label: "Mapa", href: base + "/map", exact: false },
    ...(canManageMembers ? [{ label: "Membros", href: base + "/members", exact: false }] : []),
  ];
}

export function isCurrentDestination(pathname: string, href: string, exact = false): boolean {
  return pathname === href || (!exact && pathname.startsWith(href + "/"));
}
