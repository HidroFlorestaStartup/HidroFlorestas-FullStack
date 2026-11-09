import { ENVIRONMENTAL_FIELDS } from "./environmental-data.validation";

export const DRAFT_VERSION = "environmental-draft-v1" as const;
export type DraftCell = { kind: "absent" } | { kind: "editing"; raw: string } | { kind: "value"; value: string | number | boolean };
export type DraftFields = Record<string, DraftCell>;
export type EnvironmentalDraftDto = { id: string; revision: number; formVersion: typeof DRAFT_VERSION; fields: DraftFields; updatedAt: string };
export type DraftSave = { draftId: string | null; expectedRevision: number; saveKey: string; formVersion: typeof DRAFT_VERSION; fields: DraftFields };
export class DraftError extends Error {
  constructor(public readonly code: "INVALID_REQUEST" | "STALE_REVISION" | "CONFLICT" | "INTERNAL_ERROR") { super(code); }
}
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
function object(value: unknown): value is Record<string, unknown> { return value !== null && typeof value === "object" && !Array.isArray(value); }
function closed(value: unknown, keys: string[]): asserts value is Record<string, unknown> {
  if (!object(value) || Object.keys(value).length !== keys.length || keys.some(k => !Object.hasOwn(value, k))) throw new DraftError("INVALID_REQUEST");
}
export function parseDraftFields(value: unknown): DraftFields {
  if (!object(value)) throw new DraftError("INVALID_REQUEST");
  const result: DraftFields = {};
  const rules = Object.fromEntries(Object.entries(ENVIRONMENTAL_FIELDS).flatMap(([group, fields]) => Object.entries(fields).map(([key, rule]) => [`${group}.${key}`, rule])));
  if (Object.keys(value).some(key => !Object.hasOwn(rules, key))) throw new DraftError("INVALID_REQUEST");
  for (const [key, rule] of Object.entries(rules)) {
    if (!Object.hasOwn(value, key)) continue;
    const cell = value[key];
    if (!object(cell)) throw new DraftError("INVALID_REQUEST");
    if (cell.kind === "absent") { closed(cell, ["kind"]); result[key] = { kind: "absent" }; }
    else if (cell.kind === "editing") {
      closed(cell, ["kind", "raw"]);
      if (typeof cell.raw !== "string" || cell.raw.length > 1000) throw new DraftError("INVALID_REQUEST");
      result[key] = { kind: "editing", raw: cell.raw };
    } else if (cell.kind === "value") {
      closed(cell, ["kind", "value"]);
      const v = cell.value;
      const valid = rule.type === "number" ? typeof v === "number" && Number.isFinite(v) && (rule.min === undefined || v >= rule.min) && (rule.max === undefined || v <= rule.max)
        : rule.type === "boolean" ? typeof v === "boolean" : typeof v === "string" && rule.values!.includes(v);
      if (!valid) throw new DraftError("INVALID_REQUEST");
      result[key] = { kind: "value", value: Object.is(v, -0) ? 0 : v as string | number | boolean };
    } else throw new DraftError("INVALID_REQUEST");
  }
  return result;
}
export function parseDraftSave(value: unknown): DraftSave {
  closed(value, ["draftId", "expectedRevision", "saveKey", "formVersion", "fields"]);
  if ((value.draftId !== null && !uuid(value.draftId)) || !uuid(value.saveKey) || value.formVersion !== DRAFT_VERSION
    || !Number.isSafeInteger(value.expectedRevision) || Number(value.expectedRevision) < 0 || Number(value.expectedRevision) >= 2_147_483_647
    || (value.draftId === null) !== (value.expectedRevision === 0)) throw new DraftError("INVALID_REQUEST");
  return { draftId: value.draftId, expectedRevision: value.expectedRevision as number, saveKey: value.saveKey, formVersion: DRAFT_VERSION, fields: parseDraftFields(value.fields) };
}
export function parseDraftReference(value: unknown): { draftId: string; expectedRevision: number } {
  closed(value, ["draftId", "expectedRevision"]);
  if (!uuid(value.draftId) || !Number.isSafeInteger(value.expectedRevision) || Number(value.expectedRevision) < 1 || Number(value.expectedRevision) > 2_147_483_647) throw new DraftError("INVALID_REQUEST");
  return { draftId: value.draftId, expectedRevision: value.expectedRevision as number };
}
export function draftFieldsToForm(fields: DraftFields): Record<string, string> {
  const result = Object.fromEntries(Object.entries(ENVIRONMENTAL_FIELDS).flatMap(([g, rules]) => Object.keys(rules).map(k => [`${g}.${k}`, ""])));
  for (const [key, cell] of Object.entries(parseDraftFields(fields))) result[key] = cell.kind === "editing" ? cell.raw : cell.kind === "value" ? String(cell.value) : "";
  return result;
}
export function formToDraftFields(form: Record<string, string>, baseline?: DraftFields, touched?: ReadonlySet<string>): DraftFields {
  const fields:DraftFields={};
  for(const [key,raw] of Object.entries(form)) {
    const cell=baseline?.[key];
    const previous=cell?.kind==="editing"?cell.raw:cell?.kind==="value"?String(cell.value):"";
    if(baseline && !touched?.has(key) && raw===previous) {if(cell)fields[key]=cell;}
    else fields[key]={kind:"editing",raw};
  }
  return parseDraftFields(fields);
}
