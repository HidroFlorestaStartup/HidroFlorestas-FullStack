import { parseCollectionInput } from "@/app/api/server/collections/collection.contracts";
import { formatUiDateTime } from "./ui-presentation";

const pad = (value: number, size = 2) => String(value).padStart(size, "0");

export function deviceLocalDateTime(date: Date): string {
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
}

export function deviceUtcOffset(date: Date): string {
  const minutes = -date.getTimezoneOffset();
  const absolute = Math.abs(minutes);
  return `${minutes < 0 ? "-" : "+"}${pad(Math.floor(absolute / 60))}:${pad(absolute % 60)}`;
}

export function localOccurrenceToRfc3339(local: string, offset: string): string {
  if (!local) return "";
  // Native controls may omit zero seconds. Never attach Z to civil time.
  const withSeconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(local) ? `${local}:00` : local;
  return `${withSeconds}${offset}`;
}

export function deviceOffsetForLocal(local: string): string {
  const date = new Date(local);
  const offset = deviceUtcOffset(date);
  const value = localOccurrenceToRfc3339(local, offset);
  // Shared calendar/offset validation, with future checked separately at review.
  const parsed = parseCollectionInput({ occurredAt: value }, () => new Date(8.64e15));
  if (!Number.isFinite(date.getTime()) || deviceLocalDateTime(date) !== parsed.occurredAt.slice(0, -6)) {
    throw new Error("Esse horário não existe no fuso do dispositivo. Corrija a data/hora ou informe um fuso UTC manual.");
  }
  // A repeated civil hour needs an explicit offset instead of Date's implicit choice.
  const nearbyOffsets = new Set([-1, 1].map(day => new Date(date.getTime() + day * 86_400_000).getTimezoneOffset()));
  for (const otherOffset of nearbyOffsets) {
    const candidate = new Date(date.getTime() + (otherOffset - date.getTimezoneOffset()) * 60_000);
    if (candidate.getTime() !== date.getTime() && deviceLocalDateTime(candidate) === deviceLocalDateTime(date)) {
      throw new Error("Esse horário ocorre duas vezes no fuso do dispositivo. Selecione Fuso UTC manual e confirme o fuso da coleta.");
    }
  }
  return offset;
}

/** Present the declared civil time to the minute, without changing the stored instant. */
export function formatCollectionOccurrence(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}):\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!match || !Number.isFinite(Date.parse(value))) return "Data indisponível";
  const [, year, month, day, time] = match;
  return `${day}/${month}/${year} às ${time}`;
}

/** Show confirmation in the collection's declared zone, not the server's implicit zone. */
export function formatCollectionConfirmation(value: string, occurredAt: string): string {
  const instant = new Date(value);
  if (!Number.isFinite(instant.getTime())) return "Data indisponível";
  const offset = /(Z|[+-](?:0\d|1[0-4]):[0-5]\d)$/.exec(occurredAt)?.[1] ?? "Z";
  const minutes = offset === "Z" ? 0 : (offset.startsWith("-") ? -1 : 1) * (Number(offset.slice(1, 3)) * 60 + Number(offset.slice(4, 6)));
  return formatUiDateTime(new Date(instant.getTime() + minutes * 60_000).toISOString());
}
