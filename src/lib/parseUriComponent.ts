import { ZodType, z } from "zod";

export default function parseUriComponent<T>(
  val: string,
  validator: ZodType<T>,
) {
  try {
    if (!val) return null;
    const decoded = JSON.parse(decodeURIComponent(val));

    const validationResult = validator.safeParse(decoded);
    if (!validationResult.success) return null;
    return validationResult.data;
  } catch (err) {
    return null;
  }
}

z.number().safeParse;
