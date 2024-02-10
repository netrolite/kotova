export default function parseSearchParamNumber(val?: string | null) {
  const parsed = Number(val);
  if (isNaN(parsed)) return undefined;
  return parsed;
}
