import Link from "next/link";
import { ArrowRight, ClipboardCheck, ShieldCheck, Users } from "lucide-react";

export default function AdminOverviewPage() {
  return (
    <div className="min-w-0 space-y-7">
      <header className="space-y-3"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800"><ShieldCheck size={17} aria-hidden="true" /> Controle global</p><h1 className="break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Visão geral administrativa</h1><p className="max-w-2xl text-sm leading-6 text-slate-600">Consulte contas e revise alterações de acesso à plataforma com justificativa e histórico.</p></header>
      <section aria-labelledby="admin-capabilities" className="space-y-4">
        <h2 id="admin-capabilities" className="text-lg font-bold text-slate-900">Operações disponíveis</h2>
        <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <article className="min-w-0 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-7"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800"><Users aria-hidden="true" /></span><h3 className="mt-5 text-xl font-bold">Contas e acessos</h3><p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Pesquise uma conta existente, confira seu papel global e estado, e confirme as alterações necessárias.</p><Link href="/admin/users" className="mt-6 inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">Gerenciar usuários <ArrowRight size={18} aria-hidden="true" /></Link></article>
          <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800"><ClipboardCheck aria-hidden="true" /></span><h3 className="mt-5 text-xl font-bold">Alterações rastreáveis</h3><p className="mt-3 text-sm leading-6 text-slate-600">O detalhe de cada conta reúne sua revisão atual e o histórico de mudanças concluídas. Em caso de conflito, atualize os dados e revise a alteração antes de confirmar.</p></article>
        </div>
      </section>
      <aside className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-slate-700"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-800" size={22} aria-hidden="true" /><div><h2 className="font-bold text-slate-900">Acesso global e vínculos de laboratório</h2><p className="mt-2 text-sm leading-6">Administrar contas não concede acesso automático aos laboratórios. No ambiente principal, escolha um laboratório ao qual sua conta esteja vinculada.</p><Link href="/workspace" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">Abrir ambiente principal <ArrowRight size={17} aria-hidden="true" /></Link></div></aside>
    </div>
  );
}
