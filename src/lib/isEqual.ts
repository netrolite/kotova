/**
 *
 * @param values the values to compare
 * @returns true if all provided values are the same, false otherwise
 */
export default function isEqual(...values: unknown[]) {
  const valuesSerialized = values.map((val) => JSON.stringify(val));
  const set = new Set(valuesSerialized);

  if (set.size === 1) return true;
  return false;
}
