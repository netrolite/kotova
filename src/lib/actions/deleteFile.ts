"use server";

import { auth } from "@/auth";
import ServerActionReturn from "../types/ServerActionReturn";
import { z } from "zod";
import { db } from "../db";

const InputDataSchema = z.object({
  fileKey: z.string(),
});
// type InputDataSchemaType = z.infer<typeof InputDataSchema>;

export default async function deleteFileAction(
  data: unknown,
): Promise<ServerActionReturn<any>> {
  console.log(data);
  const session = await auth();
  const validationResult = InputDataSchema.safeParse(data);
  if (!validationResult.success || !session?.user) {
    return { error: true };
  }

  const { data: validatedData } = validationResult;

  try {
    const deletionResult = await db.testFile.delete({
      where: { key: validatedData.fileKey, createdByUserId: session?.user?.id },
    });
    console.log(deletionResult);

    return { data: deletionResult };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}
