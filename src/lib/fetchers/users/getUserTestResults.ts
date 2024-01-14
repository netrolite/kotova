import { db } from "@/lib/db";
import { cache } from "react";

const usersGetUserTestResults = cache(async (userId: string) => {
  return await db.user.findFirst({
    where: { id: userId },
    include: {
      testResults: { include: { test: { include: { subject: true } } } },
    },
  });
});

export type UsersGetUserTestResultsReturn = Exclude<
  Awaited<ReturnType<typeof usersGetUserTestResults>>,
  null
>;

export default usersGetUserTestResults;
