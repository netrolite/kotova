import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

export default function redirectToSignIn() {
  const headers = getHeaders();
  const callbackUrl = headers.get("x-url") || headers.get("referer") || "/";
  const redirectTo = `/api/auth/signin?callbackUrl=${callbackUrl}`;
  return redirect(redirectTo);
}
