// Presentation labels only. Codes and all scientific values remain server-owned.
const labels: Record<string, Readonly<Record<string, string>>> = {
  class: { LOW: "Baixo", MODERATE: "Moderado", HIGH: "Alto", CRITICAL: "Crítico" },
  quality: { LOW: "Baixa", MEDIUM: "Média", HIGH: "Alta" },
  lifecycle: { CURRENT: "Vigente", SUPERSEDED: "Substituído", REVOKED: "Revogado" },
  eligibility: {
    ELIGIBLE: "Dados elegíveis para solicitar o diagnóstico",
    INSUFFICIENT_DATA: "Dados insuficientes para o diagnóstico",
    INCOMPATIBLE_VERSION: "Versão de contrato incompatível",
  },
  reason: {
    MISSING_ENVIRONMENTAL_DATA: "Não há conjunto de dados ambientais confirmado para esta coleta.",
    MISSING_SLOPE_PERCENT: "A declividade não foi informada nos dados ambientais confirmados.",
    MISSING_LAND_USE_TYPE: "O uso predominante da terra não foi informado.",
    INSUFFICIENT_DIMENSION: "Uma dimensão não possui a quantidade mínima de dados exigida pelo contrato.",
  },
  scientific: {
    CONTRATO_EXPERIMENTAL: "Contrato experimental",
    VALIDACAO_CIENTIFICA_PENDENTE: "Validação científica pendente",
    SUJEITO_A_RECALIBRACAO: "Sujeito a recalibração",
    NAO_APROVADO_COMO_CONTRATO_CIENTIFICO_DEFINITIVO: "Não aprovado como contrato científico definitivo",
  },
};

export function ihfrLabel(kind: "class" | "quality" | "lifecycle" | "eligibility" | "reason" | "scientific", code: string) {
  const group = labels[kind];
  return Object.hasOwn(group, code) ? group[code] : code;
}

export const COMPONENT_LABELS = { W: "Água", S: "Solo", V: "Vegetação", T: "Território" } as const;
