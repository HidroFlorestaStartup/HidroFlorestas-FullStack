/** Public labels and formatting only; never write the result back into a DTO. */
const scoreFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

export function formatIHFRNumber(value: number | string): string {
  if (typeof value === "string" && !value.trim()) return "Indisponível";
  const number = Number(value);
  return Number.isFinite(number) ? scoreFormatter.format(Object.is(number, -0) ? 0 : number) : "Indisponível";
}

export function formatUiDateTime(value: string | null | undefined, timeZone = "UTC"): string {
  if (!value) return "Não se aplica";
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Data indisponível";
  const day = new Intl.DateTimeFormat("pt-BR", { timeZone, day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  const time = new Intl.DateTimeFormat("pt-BR", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
  return `${day} às ${time}`;
}

const laboratoryRoles: Readonly<Record<string, string>> = { OWNER: "Proprietário", ADMIN: "Administrador", MEMBER: "Membro" };
export function laboratoryRoleLabel(role: string): string {
  return Object.hasOwn(laboratoryRoles, role) ? laboratoryRoles[role] : "Papel não identificado";
}

/** Browser transport/parser errors are technical messages, not interface copy. */
export function uiErrorMessage(value: unknown, fallback: string): string {
  const message = value instanceof Error ? value.message : typeof value === "string" ? value : "";
  if (!message.trim() || /^(?:[A-Z][A-Z_\d]+|Failed to fetch|fetch failed|Load failed|NetworkError.*|Network request failed.*|Unexpected (?:token|end).*|.*is not valid JSON.*|Internal Server Error|Unauthorized|Forbidden|Not Found)$/i.test(message)) return fallback;
  return message;
}
