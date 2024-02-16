import { isEqual } from "lodash";

export default function areOverlappingPropertiesEqual(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
) {
  for (const key in obj1) {
    const prop1 = obj1[key];
    if (!obj2.hasOwnProperty(key)) continue;

    const prop2 = obj2[key];
    if (!isEqual(prop1, prop2)) return false;
  }

  return true;
}
