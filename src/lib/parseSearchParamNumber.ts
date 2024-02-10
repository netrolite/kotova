export default function parseSearchParamNumber(val?: string) {
  const parsed = Number(val);
  if (isNaN(parsed)) return undefined;
  return parsed;
}
