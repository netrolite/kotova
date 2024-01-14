import { db } from "@/lib/db";
import { cache } from "react";

const getUserRecentTestResults = cache(async (userId: string) => {
  return await db.user.findFirst({
    where: { id: userId },
    include: {
      testResults: { include: { test: { include: { subject: true } } } },
    },
    take: 10,
  });
});

export type UsersGetUserTestResultsReturn = Exclude<
  Awaited<ReturnType<typeof getUserRecentTestResults>>,
  null
>;

export default getUserRecentTestResults;
