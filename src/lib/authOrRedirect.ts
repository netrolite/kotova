import { auth } from "@/auth";
import redirectToSignIn from "./redirectToSignIn";

export default async function authOrRedirect() {
  const session = await auth();
  if (!session) return redirectToSignIn();
  return session;
}
