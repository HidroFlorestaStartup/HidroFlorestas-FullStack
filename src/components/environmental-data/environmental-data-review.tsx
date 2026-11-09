import styles from "./environmental.module.css";
import type { EnvironmentalPayload } from "@/types/environmental-data.type";
import { EnvironmentalValues } from "./environmental-data-detail";
export function EnvironmentalReview({payload,busy,locked=false,onBack,onConfirm}:{payload:EnvironmentalPayload;busy:boolean;locked?:boolean;onBack:()=>void;onConfirm:()=>void}) {
 return <section aria-labelledby="review-title" className={styles.flow}><h2 id="review-title" tabIndex={-1} className={styles.sectionTitle}>Revisar dados ambientais</h2><p className="text-slate-600">Confira os quatro grupos. Após confirmar, o conjunto não poderá ser editado, complementado ou excluído.</p><EnvironmentalValues payload={payload}/><div className={styles.actions}><button type="button" disabled={busy||locked} onClick={onBack} className={styles.secondary}>Voltar ao formulário</button><button type="button" disabled={busy} onClick={onConfirm} className={styles.primary}>{busy?'Confirmando…':'Confirmar dados ambientais'}</button></div></section>;
}
