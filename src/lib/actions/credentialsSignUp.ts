"use server";

import ServerActionReturn from "../types/ServerActionReturn";
import SignUpSchema from "../zod/schemas/SignUp";
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
    data: { email, password, name },
  } = validationResult;

  try {
    await credentialsSignUpCreateUser({ email, password, name });
    await credentialsSignUpSignIn({ email, password });
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
