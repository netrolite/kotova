"use server";

import { Category } from "@prisma/client";
import { db } from "../db";
import ServerActionReturn from "../types/ServerActionReturn";
import AddCategorySchema from "../zod/schemas/AddCategory";

// TODO: investigate if this allows anyone to add a category, regardless of their role.
// Same thing for other potentially destructive requests!
export default async function addCategoryAction(
  data: unknown,
): Promise<ServerActionReturn<Category>> {
  const validationResult = AddCategorySchema.safeParse(data);
  if (!validationResult.success) return { error: true };

  const { title } = validationResult.data;
  try {
    const addedCategory = await db.category.create({ data: { title } });
    return { data: addedCategory };
  } catch (err) {
    return { error: true };
  }
}

export const addCategoryMutation = async (data: unknown) =>
  (await addCategoryAction(data)).data ?? undefined;
