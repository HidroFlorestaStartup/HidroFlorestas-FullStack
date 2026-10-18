"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseIcon, MapPinIcon, PowerIcon, UsersIcon } from "lucide-react";
import styles from "../shell/shell.module.css";

export default function Sidebar({ canAdmin = false }: { canAdmin?: boolean }) {
  const pathname = usePathname();
  const laboratoryId = pathname.match(/^\/dashboard\/laboratories\/([^/]+)/)?.[1];
  const links = [
    { title: "Laboratórios", href: "/workspace", Icon: HouseIcon, current: pathname === "/workspace" },
    { title: "Áreas", href: laboratoryId ? `/dashboard/laboratories/${laboratoryId}/areas` : "/workspace", Icon: MapPinIcon, current: Boolean(laboratoryId && pathname.startsWith(`/dashboard/laboratories/${laboratoryId}/areas`)) },
    ...(canAdmin ? [{ title: "Administração", href: "/admin", Icon: UsersIcon, current: pathname.startsWith("/admin") }] : []),
  ];
  return <nav id="application-navigation" aria-label="Navegação principal" className={styles.rail}>
    {links.map(({ title, href, Icon, current }) => <Link key={title} href={href} aria-current={current ? "page" : undefined} className={styles.railLink}><Icon size={22} aria-hidden="true" />{title}</Link>)}
    <Link href="/logout" className={`${styles.railLink} ${styles.mobileExit}`}><PowerIcon size={22} aria-hidden="true" />Sair</Link>
  </nav>;
}