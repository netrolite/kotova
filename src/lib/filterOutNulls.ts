export default function filterOutNullishValues<T>(
  arr: T[],
): Exclude<T, null>[] {
  return arr.filter((item) => item !== null && item !== undefined) as Exclude<
    T,
    null
  >[];
}
