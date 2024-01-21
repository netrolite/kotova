"use server";

import { signIn } from "@/auth";
import getUrlFromHeaders from "../getUrlFromHeaders";
import { BuiltInProviderType } from "@auth/core/providers";

export default async function signInAction(provider?: BuiltInProviderType) {
  const callbackUrlFromHeaders = getUrlFromHeaders() || "/";
  const callbackUrl = new URL(callbackUrlFromHeaders);
  callbackUrl.searchParams.append("hideBackBtn", "");

  signIn(provider, {
    redirectTo: callbackUrl.toString(),
  });
}
