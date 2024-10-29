"use server";

import { z } from "zod";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export default async function deleteCategoryAction(data: unknown) {
  const validationResult = z.string().safeParse(data);
  if (!validationResult.success) return { error: true };

  const id = validationResult.data;
  try {
    const deletedCategoryPromise = db.category.delete({ where: { id } });
    const categoriesPromise = db.category.findMany();
    const [deletedCategory, categories] = await Promise.all([
      deletedCategoryPromise,
      categoriesPromise,
    ]);
    revalidatePath("/categories");
    return { data: categories.filter((s) => s.id !== deletedCategory?.id) };
  } catch (err) {
    return { error: true };
  }
}

export async function deleteCategoryMutation(data: unknown) {
  const result = await deleteCategoryAction(data);
  return result.data;
}
