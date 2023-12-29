import { auth } from "@/auth";
import { db } from "../db";

export default async function getSignedInUser() {
  const session = await auth();
  if (!session) return null;
  return db.user.findFirst({ where: { id: session?.user?.id } });
}
