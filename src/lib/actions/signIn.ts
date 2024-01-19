"use server";

import { signIn } from "@/auth";
import getUrlFromHeaders from "../getUrlFromHeaders";

export default async function signInAction() {
  const callbackUrlFromHeaders = getUrlFromHeaders();
  const callbackUrl = new URL(callbackUrlFromHeaders);
  callbackUrl.searchParams.append("hideBackBtn", "");

  return signIn(undefined, {
    redirectTo: callbackUrl.toString(),
  });
}
