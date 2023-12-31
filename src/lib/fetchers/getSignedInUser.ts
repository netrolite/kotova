import { auth } from "@/auth";
import { db } from "../db";
import { Prisma } from "@prisma/client";
import { cache } from "react";

const getSignedInUser = cache(async (userSelect?: Prisma.UserSelect) => {
  const session = await auth();
  if (!session) return null;
  return db.user.findFirst({
    where: { id: session?.user?.id },
    select: userSelect,
  });
});

export default getSignedInUser;
