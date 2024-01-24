import { db } from "@/lib/db";
import { cache } from "react";

const userProfileGetUser = cache(async (userId: string) => {
  return await db.user.findUnique({
    where: { id: userId },
    include: {
      _count: true,
      testResults: {
        orderBy: { createdAt: "desc" },
        include: { test: { include: { subject: true } } },
        take: 10,
      },
    },
  });
});

export type UserProfileGetRecentTestResultsReturn = Exclude<
  Awaited<ReturnType<typeof userProfileGetUser>>,
  null
>;

export default userProfileGetUser;
