import { db } from "../db";
import authOrRedirect from "../authOrRedirect";
import redirectToSignIn from "../redirectToSignIn";
import { Prisma } from "@prisma/client";
import { cache } from "react";

const getSignedInUserOrRedirect = cache(
  async (userSelect?: Prisma.UserSelect) => {
    const session = await authOrRedirect();
    const user = await db.user.findFirst({
      where: { id: session?.user?.id },
      select: userSelect,
    });
    if (!user) return redirectToSignIn();
    return user;
  },
);

export default getSignedInUserOrRedirect;
