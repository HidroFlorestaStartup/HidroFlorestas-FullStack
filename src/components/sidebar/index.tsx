"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseIcon, UsersIcon } from "lucide-react";
import { globalNavigationItems, isCurrentDestination, isLaboratoryPath } from "../shell/navigation-state";
import styles from "../shell/shell.module.css";

export default function Sidebar({ canAdmin = false }: { canAdmin?: boolean }) {
  const pathname = usePathname();
  // Inside an authorised laboratory, its server-scoped menu replaces this rail.
  if (isLaboratoryPath(pathname)) return null;
  const icons = { Laboratórios: HouseIcon, Administração: UsersIcon };
  return <nav id="application-navigation" aria-label="Navegação principal" className={styles.rail}>
    {globalNavigationItems(canAdmin).map(({ label, href }) => {
      const Icon = icons[label as keyof typeof icons];
      return <Link key={href} href={href} aria-current={isCurrentDestination(pathname, href) ? "page" : undefined} className={styles.railLink}>
        <Icon size={22} aria-hidden="true" />{label}
      </Link>;
    })}
  </nav>;
}
