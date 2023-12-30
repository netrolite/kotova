"use server";

import { Subject } from "@prisma/client";
import { db } from "../db";
import ServerActionReturn from "../types/ServerActionReturn";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export default async function deleteSubjectAction(
  data: unknown,
): Promise<ServerActionReturn<Subject>> {
  const validationResult = z.string().safeParse(data);
  if (!validationResult.success) return { error: true };

  const id = validationResult.data;
  try {
    const deletedSubject = await db.subject.delete({ where: { id } });
    revalidatePath("/tests");
    return { data: deletedSubject };
  } catch (err) {
    return { error: true };
  }
}
