import { getLaboratoryContext } from "@/components/workspace/laboratory-context";
import { LaboratoryNavigation } from "@/components/shell/laboratory-navigation";
import styles from "@/components/shell/shell.module.css";

export const dynamic = "force-dynamic";
export default async function LaboratoryLayout({ children, params }: { children: React.ReactNode; params: Promise<{ laboratoryId: string }> }) {
  const { laboratoryId } = await params;
  const context = await getLaboratoryContext(laboratoryId);
  return <div className={styles.laboratoryLayout}>
    <LaboratoryNavigation laboratoryId={laboratoryId} canManageMembers={context.membershipRole === "OWNER"} />
    <div className={styles.laboratoryPage}>
      <header className={styles.context}>
        <p className={styles.contextLabel}>Laboratório selecionado</p>
        <h2>{context.name}</h2>
        <p className={styles.contextRole}>{context.membershipRole} · {context.readOnly ? "Inativo · Somente leitura" : "Ativo"}</p>
      </header>
      {children}
    </div>
  </div>;
}
