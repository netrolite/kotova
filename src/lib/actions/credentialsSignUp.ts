"use server";

import ServerActionReturn from "../types/ServerActionReturn";
import SignUpSchema from "../zod/schemas/SignUp";
import bcrypt from "bcrypt";
import { errCodes, prismaErrs } from "../constants";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import credentialsSignUpCreateUser from "../credentialsSignUp/createUser";
import credentialsSignUpSignIn from "../credentialsSignUp/signIn";

type CredentialsSignUpError = true | keyof typeof errCodes;

export default async function credentialsSignUpAction(
  formData: unknown,
): Promise<ServerActionReturn<boolean, CredentialsSignUpError>> {
  const validationResult = SignUpSchema.safeParse(formData);
  if (!validationResult.success) return { error: true };
  const {
    data: { email, password: plaintextPassword, name },
  } = validationResult;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(plaintextPassword, salt);

  try {
    await credentialsSignUpCreateUser({ email, hashedPassword, name });
    await credentialsSignUpSignIn({ email, plaintextPassword });
    return { data: true };
  } catch (err) {
    console.error(err);
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === prismaErrs.uniqueConstraintFailed) {
        return { error: "USER_ALREADY_EXISTS" };
      }
    }
    return { error: true };
  }
}
