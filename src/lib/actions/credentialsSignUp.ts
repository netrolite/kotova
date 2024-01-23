"use server";

import ServerActionReturn from "../types/ServerActionReturn";
import SignUpSchema from "../zod/schemas/SignUp";
import { db } from "../db";
import { ROLE } from "../types/enums/Role";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export default async function credentialsSignUpAction(
  formData: unknown,
): Promise<ServerActionReturn<User>> {
  const validationResult = SignUpSchema.safeParse(formData);
  if (!validationResult.success) return { error: true };
  const {
    data: { callbackUrl, email, password: plaintextPassword },
  } = validationResult;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

  try {
    const newUser = await db.user.create({
      data: { role: ROLE.STUDENT, email, password: hashedPassword },
    });
    return { data: newUser };
  } catch (err) {
    console.error(err);
    return { error: true };
  }
}
