"use client";
import { LaboratoryWorkspace } from "@/components/workspace/laboratory-workspace";
import { useAuth } from "@/contexts/auth.context";
import styles from "@/components/workspace/workspace.module.css";
export default function Workspace() {
  const { user } = useAuth();
  return <main className={styles.workspace}>
    <header className={styles.intro}>
      <h1 className={styles.title} aria-label={`Olá, ${user?.firstName || "usuário"}! 👋 Ambiente de Análises HIDROFLORESTAS`}>
        <span className={styles.greeting}>Olá, {user?.firstName || "usuário"}! 👋</span>{" "}
        <span>Ambiente de Análises</span>{" "}
        <span><span className={styles.brandWater}>HIDRO</span><span className={styles.brandForest}>FLORESTAS</span></span>
      </h1>
      <p className={styles.muted}>Escolha explicitamente o laboratório que deseja acessar. Seus dados permanecem no contexto do laboratório escolhido.</p>
    </header>
    <LaboratoryWorkspace />
  </main>;
}
