import { pointReducer, type PointState } from "./area-form-state";
import type { ReverseAddress } from "./reverse-address";

export type AddressField = "municipality" | "state" | "cep";
export type AddressSource = "unset" | "suggested" | "manual";
export type LookupStatus = "idle" | "loading" | "ready" | "empty" | "unavailable";
export type AreaDraft = {
  point: PointState;
  address: Record<AddressField, string>;
  sources: Record<AddressField, AddressSource>;
  lookupStatus: LookupStatus;
};
export type DraftAction =
  | { type: "point-edit"; latitude: string; longitude: string }
  | { type: "location"; latitude: number; longitude: number; revision: number }
  | { type: "address-edit"; field: AddressField; value: string }
  | { type: "lookup-start"; revision: number }
  | { type: "lookup-success"; revision: number; address: ReverseAddress }
  | { type: "lookup-failed"; revision: number };

export const ADDRESS_FIELDS: readonly AddressField[] = ["municipality", "state", "cep"];

export function initialAreaDraft(): AreaDraft {
  return {
    point: { latitude: "", longitude: "", revision: 0 },
    address: { municipality: "", state: "", cep: "" },
    sources: { municipality: "unset", state: "unset", cep: "unset" },
    lookupStatus: "idle",
  };
}

export function areaDraftReducer(state: AreaDraft, action: DraftAction): AreaDraft {
  if (action.type === "point-edit" || action.type === "location") {
    const nextPoint = action.type === "point-edit"
      ? pointReducer(state.point, { type: "edit", latitude: action.latitude, longitude: action.longitude })
      : pointReducer(state.point, action);
    if (nextPoint === state.point) return state;
    const address = { ...state.address };
    const sources = { ...state.sources };
    for (const field of ADDRESS_FIELDS) {
      // An earlier automatic suggestion does not belong to the newly selected point.
      // Explicitly entered values remain available for review instead of being discarded.
      if (sources[field] === "suggested") {
        address[field] = "";
        sources[field] = "unset";
      }
    }
    return { point: nextPoint, address, sources, lookupStatus: "idle" };
  }
  if (action.type === "address-edit") {
    return {
      ...state,
      address: { ...state.address, [action.field]: action.value },
      sources: { ...state.sources, [action.field]: "manual" },
    };
  }
  // Revision is incremented for *every* coordinate edit, including incomplete edits.
  // Aborted or out-of-order responses cannot mutate the latest point.
  if (action.revision !== state.point.revision) return state;
  if (action.type === "lookup-start") return { ...state, lookupStatus: "loading" };
  if (action.type === "lookup-failed") return { ...state, lookupStatus: "unavailable" };
  const address = { ...state.address };
  const sources = { ...state.sources };
  let found = false;
  for (const field of ADDRESS_FIELDS) {
    const value = action.address[field];
    if (value) {
      found = true;
      if (sources[field] !== "manual") {
        address[field] = value;
        sources[field] = "suggested";
      }
    }
  }
  return { ...state, address, sources, lookupStatus: found ? "ready" : "empty" };
}
