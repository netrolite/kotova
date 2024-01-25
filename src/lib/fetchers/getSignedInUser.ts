import { auth } from "@/auth";
import { db } from "../db";
import { Prisma } from "@prisma/client";
import { cache } from "react";

const getSignedInUser = cache(
  async <T extends Prisma.UserFindFirstArgs>(
    args?: T,
  ): Promise<Prisma.UserGetPayload<T> | null> => {
    const session = await auth();
    if (!session?.user?.id) return null;

    return db.user.findFirst({
      where: { id: session.user.id },
      ...args,
    }) as Promise<Prisma.UserGetPayload<T> | null>;
  },
);

export default getSignedInUser;
