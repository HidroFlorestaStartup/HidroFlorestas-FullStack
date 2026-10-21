"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, KeyRound, LayoutDashboard, LogOut, ShieldCheck, UserRoundMinus, Users } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { href: "/admin/users", label: "Usuários", icon: Users },
  { href: "/change-password", label: "Alterar senha", icon: KeyRound },
  { href: "/delete-account", label: "Excluir minha conta", icon: UserRoundMinus },
] as const;

function isCurrentRoute(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen min-w-0 bg-[#f6f8f6] text-slate-900">
      <a href="#admin-content" className="sr-only rounded-xl bg-white p-3 font-semibold text-emerald-900 focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:outline-none focus:ring-2 focus:ring-emerald-700">Pular para o conteúdo</a>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col overflow-y-auto border-r border-emerald-950/10 bg-emerald-950 text-white lg:flex">
        <Link href="/admin" aria-label="HidroFlorestas — administração" className="flex items-center gap-3 border-b border-white/10 px-5 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200"><ShieldCheck aria-hidden="true" /></span>
          <span className="min-w-0"><span className="block text-sm font-bold">HidroFlorestas</span><span className="mt-1 block text-xs text-emerald-200">Administração global</span></span>
        </Link>
        <nav aria-label="Navegação administrativa" className="flex-1 space-y-2 px-3 py-5">
          {adminLinks.map(({ href, label, icon: Icon }) => <Link key={href} href={href} aria-current={isCurrentRoute(pathname, href) ? "page" : undefined} className={`flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${isCurrentRoute(pathname, href) ? "bg-white text-emerald-950 shadow-sm" : "text-emerald-50 hover:bg-white/10"}`}><Icon size={19} className="shrink-0" aria-hidden="true" /><span>{label}</span></Link>)}
        </nav>
        <div className="space-y-2 border-t border-white/10 p-3">
          <Link href="/workspace" className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-emerald-50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><ArrowLeft size={19} className="shrink-0" aria-hidden="true" /> Ambiente principal</Link>
          <Link href="/logout" className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-emerald-50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><LogOut size={19} className="shrink-0" aria-hidden="true" /> Sair</Link>
        </div>
      </aside>
      <div className="min-w-0 lg:pl-64">
        <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:sticky lg:top-0 lg:z-20 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3"><ShieldCheck className="shrink-0 text-emerald-800 lg:hidden" size={23} aria-hidden="true" /><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-800">HidroFlorestas</p><p className="mt-1 text-sm font-semibold text-slate-700">Administração global</p></div></div>
            <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 sm:inline-flex">Contas e permissões da plataforma</span>
          </div>
        </header>
        <nav aria-label="Navegação administrativa móvel" className="grid gap-2 border-b border-slate-200 bg-white p-3 lg:hidden" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 9rem), 1fr))" }}>
          {adminLinks.map(({ href, label, icon: Icon }) => <Link key={href} href={href} aria-current={isCurrentRoute(pathname, href) ? "page" : undefined} className={`flex min-h-11 min-w-0 items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 ${isCurrentRoute(pathname, href) ? "bg-emerald-800 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}><Icon size={17} className="shrink-0" aria-hidden="true" /><span className="min-w-0 break-words">{label}</span></Link>)}
          <Link href="/workspace" className="flex min-h-11 min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"><ArrowLeft size={17} className="shrink-0" aria-hidden="true" /><span>Ambiente principal</span></Link>
          <Link href="/logout" className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"><LogOut size={17} className="shrink-0" aria-hidden="true" /> Sair</Link>
        </nav>
        <main id="admin-content" tabIndex={-1} className="mx-auto min-w-0 max-w-7xl scroll-mt-28 p-4 focus:outline-none sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
