"use server";

import ServerActionReturn from "../types/ServerActionReturn";
import { db } from "../db";
import getSignedInUser from "../fetchers/getSignedInUser";
import { ROLE } from "../types/enums/Role";
import ChangeUserRoleSchema from "../zod/schemas/ChangeUserRole";

export default async function changeUserRoleAction(
  data: unknown,
): Promise<ServerActionReturn<boolean, string | boolean>> {
  try {
    const validationResult = ChangeUserRoleSchema.safeParse(data);
    if (!validationResult.success) return { error: "invalid data" };
    const { data: payload } = validationResult;

    const signedInUser = await getSignedInUser();
    if (signedInUser?.role !== ROLE.ADMIN) return { error: "access denied" };

    await db.user.update({
      where: { id: payload.userId },
      data: { role: payload.role },
    });

    return { data: true };
  } catch (err) {
    console.error(err);
    return { error: true };
  }
}
