import { requireAuth } from "@/app/api/server/middlewares/auth.middleware";
import { ApplicationShell } from "@/components/shell/application-shell";
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const principal = await requireAuth();
  return <ApplicationShell canAdmin={principal.role === "ADMIN"}>{children}</ApplicationShell>;
}