import { ZodSchema } from "zod";
import { z } from "zod";

export default function parseJson<T extends ZodSchema = any>(
  rawData: string | null | undefined,
  schema?: T,
): null | z.infer<T> {
  if (!rawData) return null;

  try {
    const data = JSON.parse(rawData);
    if (schema) return schema.parse(data);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
