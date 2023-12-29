import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { headers as getHeaders } from "next/headers";

export default async function authOrRedirect() {
  const session = await auth();

  if (!session) {
    const headers = getHeaders();
    const callbackUrl = headers.get("referer") || "/";
    const redirectTo = `/api/auth/signin?callbackUrl=${callbackUrl}`;
    redirect(redirectTo);
  }

  return session;
}
