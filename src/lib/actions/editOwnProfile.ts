"use server";

import { auth } from "@/auth";
import { db } from "../db";
import ServerActionReturn from "../types/ServerActionReturn";
import UserEditSchema from "../zod/schemas/UserEdit";
import { revalidatePath } from "next/cache";

export default async function editOwnProfileAction(
  data: unknown,
): Promise<ServerActionReturn> {
  const session = await auth();
  const validationResult = UserEditSchema.safeParse(data);
  if (!validationResult.success || !session?.user) return { error: true };
  const {
    data: { avatarUrl: image, ...profileData },
  } = validationResult;

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { ...profileData, image },
    });
  } catch (err) {
    return { error: true };
  }

  revalidatePath(`/users/${session.user.id}`);
  return { data: true };
}
