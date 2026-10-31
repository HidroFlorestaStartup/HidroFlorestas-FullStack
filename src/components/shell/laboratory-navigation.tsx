"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, LayoutDashboard, Map, MapPinned, Users } from "lucide-react";
import { isCurrentDestination, laboratoryNavigationItems } from "./navigation-state";
import styles from "./shell.module.css";

export function LaboratoryNavigation({ laboratoryId, canManageMembers }: { laboratoryId: string; canManageMembers: boolean }) {
  const pathname = usePathname();
  const icons = { Resumo: LayoutDashboard, Áreas: MapPinned, Mapa: Map, Membros: Users };
  const links = laboratoryNavigationItems(laboratoryId, canManageMembers);
  return <nav id="application-navigation" aria-label="Laboratório" className={styles.contextNav}>
    <Link href="/workspace" className={styles.contextReturn} aria-label="Laboratórios">
      <ArrowLeft aria-hidden="true" size={19} />
      <span className={styles.desktopLabel}>Laboratórios</span>
      <span className={styles.mobileLabel} aria-hidden="true">Trocar</span>
    </Link>
    {links.map(({ label, href, exact }) => {
      const Icon = icons[label as keyof typeof icons];
      return <Link key={href} href={href} aria-current={isCurrentDestination(pathname, href, exact) ? "page" : undefined}>
        <Icon aria-hidden="true" size={19} /><span>{label}</span>
      </Link>;
    })}
  </nav>;
}
