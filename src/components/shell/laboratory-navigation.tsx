"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map, MapPinned, Users } from "lucide-react";
import styles from "./shell.module.css";

export function LaboratoryNavigation({ laboratoryId, canManageMembers }: { laboratoryId: string; canManageMembers: boolean }) {
  const pathname = usePathname();
  const base = `/dashboard/laboratories/${laboratoryId}`;
  const links = [
    { href: base, label: "Resumo", Icon: LayoutDashboard },
    { href: `${base}/areas`, label: "Áreas", Icon: MapPinned },
    { href: `${base}/map`, label: "Mapa", Icon: Map },
    ...(canManageMembers ? [{ href: `${base}/members`, label: "Membros", Icon: Users }] : []),
  ];
  return <nav aria-label="Laboratório" className={styles.contextNav}>
    {links.map(({ href, label, Icon }) => <Link key={href} href={href} aria-current={(href === base ? pathname === href : pathname === href || pathname.startsWith(href + "/")) ? "page" : undefined}><Icon aria-hidden="true" size={18} />{label}</Link>)}
  </nav>;
}