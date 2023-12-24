"use server";

import { signIn } from "@/auth";

export default async function signInAction() {
  return signIn();
}
