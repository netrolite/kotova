export default function parseSearchParamNumber(val?: string | null) {
  if (val === null || val == undefined || isNaN(val as any)) {
    return undefined;
  }
  return Number(val);
}
