"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import ServerActionReturn from "../types/ServerActionReturn";
import DeleteTestSchema from "../zod/schemas/deleteTest";

export default async function deleteTestAction(
  data: unknown,
): Promise<ServerActionReturn<true, string>> {
  const session = await auth();
  if (!session?.user?.id) return { error: "no credentials provided" };

  const validationResult = DeleteTestSchema.safeParse(data);
  if (!validationResult.success) return { error: "invalid data" };
  const {
    data: { testId },
  } = validationResult;

  try {
    await db.test.delete({ where: { id: testId } });
    revalidatePath("/my/tests");
    return { data: true };
  } catch (err) {
    return { error: "test not found" };
  }
}
