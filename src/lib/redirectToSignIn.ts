import { redirect } from "next/navigation";
import getUrlFromHeaders from "./getUrlFromHeaders";

export default function redirectToSignIn() {
  const callbackUrlFromHeaders = getUrlFromHeaders();
  const callbackUrl = new URL(callbackUrlFromHeaders);
  callbackUrl.searchParams.append("hideBackBtn", "");

  const redirectTo = `/api/auth/signin?callbackUrl=${callbackUrl}`;
  return redirect(redirectTo);
}
