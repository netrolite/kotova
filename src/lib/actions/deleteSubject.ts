"use server";

import { z } from "zod";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export default async function deleteSubjectAction(data: unknown) {
  const validationResult = z.string().safeParse(data);
  if (!validationResult.success) return { error: true };

  const id = validationResult.data;
  try {
    const deletedSubjectPromise = db.subject.delete({ where: { id } });
    const subjectsPromise = db.subject.findMany();
    const [deletedSubject, subjects] = await Promise.all([
      deletedSubjectPromise,
      subjectsPromise,
    ]);
    revalidatePath("/subjects");
    return { data: subjects.filter((s) => s.id !== deletedSubject?.id) };
  } catch (err) {
    return { error: true };
  }
}

export async function deleteSubjectMutation(data: unknown) {
  const result = await deleteSubjectAction(data);
  return result.data;
}
