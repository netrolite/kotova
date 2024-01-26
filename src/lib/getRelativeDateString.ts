type TimeDivisions = { amount: number; name: Intl.RelativeTimeFormatUnit }[];

const DIVISIONS: TimeDivisions = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
] as const;

export default function getRelativeDateString(
  date: Date,
  locale: string = "ru",
) {
  const f = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  // the duration is in seconds initially
  let duration = (Date.now() - date.getTime()) / 1000;

  for (const division of DIVISIONS) {
    if (Math.abs(duration) < division.amount) {
      return f.format(Math.round(-duration), division.name);
    }
    duration /= division.amount;
  }

  return null;
}
