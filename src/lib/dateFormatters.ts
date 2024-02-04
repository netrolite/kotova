import { dateFormatterDefaults, timeFormatterDefaults } from "./constants";

export function dateToLocaleString(
  date: Date,
  opts?: Intl.DateTimeFormatOptions,
) {
  date = new Date(date);
  return replaceUnnecessaryChars(
    date.toLocaleString("ru", { ...dateFormatterDefaults, ...opts }),
  );
}

export function dateToLocaleDateString(
  date: Date,
  opts?: Intl.DateTimeFormatOptions,
) {
  date = new Date(date);
  return replaceUnnecessaryChars(
    date.toLocaleDateString("ru", { ...dateFormatterDefaults, ...opts }),
  );
}

export function dateToLocaleTimeString(
  date: Date,
  opts?: Intl.DateTimeFormatOptions,
) {
  date = new Date(date);
  return replaceUnnecessaryChars(
    date.toLocaleTimeString("ru", { ...timeFormatterDefaults, ...opts }),
  );
}

function replaceUnnecessaryChars(dateString: string) {
  return dateString.replace(" г.", "");
}
