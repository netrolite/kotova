import { db } from "../db";
import authOrRedirect from "../authOrRedirect";
import redirectToSignIn from "../redirectToSignIn";

export default async function getSignedInUserOrRedirect() {
  const session = await authOrRedirect();
  const user = await db.user.findFirst({ where: { id: session?.user?.id } });
  if (!user) return redirectToSignIn();
  return user;
}
