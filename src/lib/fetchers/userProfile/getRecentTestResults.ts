import { db } from "@/lib/db";
import { cache } from "react";

const userProfileGetRecentTestResults = cache(async (userId: string) => {
  return await db.user.findFirst({
    where: { id: userId },
    include: {
      testResults: {
        orderBy: { createdAt: "desc" },
        include: { test: { include: { subject: true } } },
      },
    },
    take: 10,
  });
});

export type UserProfileGetRecentTestResultsReturn = Exclude<
  Awaited<ReturnType<typeof userProfileGetRecentTestResults>>,
  null
>;

export default userProfileGetRecentTestResults;
