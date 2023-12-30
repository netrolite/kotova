"use server";

import { z } from "zod";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export default async function deleteSubjectAction(data: unknown) {
  const validationResult = z.string().safeParse(data);
  if (!validationResult.success) return { error: true };
  console.log("hello");

  const id = validationResult.data;
  try {
    const deletedSubject = await db.subject.delete({ where: { id } });
    revalidatePath("/tests");
    return { data: deletedSubject };
  } catch (err) {
    return { error: true };
  }
}
