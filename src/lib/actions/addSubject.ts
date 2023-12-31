"use server";

import { Subject } from "@prisma/client";
import { db } from "../db";
import ServerActionReturn from "../types/ServerActionReturn";
import AddSubjectSchema from "../zod/schemas/AddSubject";
import { revalidatePath } from "next/cache";

export default async function addSubjectAction(
  data: unknown,
): Promise<ServerActionReturn<Subject>> {
  const validationResult = AddSubjectSchema.safeParse(data);
  if (!validationResult.success) return { error: true };

  const { title } = validationResult.data;
  try {
    const addedSubject = await db.subject.create({ data: { title } });
    return { data: addedSubject };
  } catch (err) {
    return { error: true };
  }
}

export const addSubjectMutation = async (data: unknown) =>
  (await addSubjectAction(data)).data ?? undefined;
