import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

import { appConfig } from "@/config/app.config";

const EMPTY_DATE_LABEL = "—";

export function coerceToDate(
  value: Date | string | null | undefined,
): Date | null {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date;
}

export function formatDateTime(
  value: Date | string | null | undefined,
): string {
  const date = coerceToDate(value);
  if (!date) return EMPTY_DATE_LABEL;

  return format(date, appConfig.formatting.dateTime, { locale: idLocale });
}

export function formatDateTimeLong(
  value: Date | string | null | undefined,
): string {
  const date = coerceToDate(value);
  if (!date) return EMPTY_DATE_LABEL;

  return format(date, appConfig.formatting.dateTimeLong, { locale: idLocale });
}
