"use server";

import { z } from "zod";
import ServerActionReturn from "../types/ServerActionReturn";
import { s3GetSignedUrl } from "../s3";

const InputDataSchema = z.object({
  key: z.string(),
  filename: z.string(),
});

export default async function getTestFileUrlAction(
  data: unknown,
): Promise<ServerActionReturn<string>> {
  const validationResult = InputDataSchema.safeParse(data);
  if (!validationResult.success) return { error: true };
  const { data: inputData } = validationResult;

  const url = await s3GetSignedUrl({
    objectKey: inputData.key,
    expirationSecs: 60 * 60 * 24,
  });
  return { data: url };
}
