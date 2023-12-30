import { auth } from "@/auth";
import { db } from "../db";
import { Prisma } from "@prisma/client";

export default async function getSignedInUser(userSelect?: Prisma.UserSelect) {
  const session = await auth();
  if (!session) return null;
  return db.user.findFirst({
    where: { id: session?.user?.id },
    select: userSelect,
  });
}
