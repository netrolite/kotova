import { db } from "@/lib/db";
import { cache } from "react";

type Params = {
  testId: string;
  searchParams?: {
    query?: string;
    scoreGt?: number;
    scoreLt?: number;
    timesTakenGt?: number;
    timesTakenLt?: number;
  };
};

const myTestGetTestResults = cache(async ({ testId, searchParams }: Params) => {
  const {
    scoreGt,
    scoreLt,
    timesTakenGt = Number.NEGATIVE_INFINITY,
    timesTakenLt = Number.POSITIVE_INFINITY,
    query: textQuery,
  } = searchParams ?? {};

  const testResultsQuery = { testId, score: { gt: scoreGt, lt: scoreLt } };
  const users = await db.user.findMany({
    where: {
      testResults: { some: testResultsQuery },
      name: {
        contains: textQuery,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      testResults: { where: testResultsQuery, orderBy: { createdAt: "desc" } },
    },
  });
  if (!timesTakenGt && !timesTakenLt) return users;

  return users.filter((user) => {
    if (!(timesTakenGt < user.testResults.length)) return false;
    if (!(timesTakenLt > user.testResults.length)) return false;
    return true;
  });
});

export type MyTestGetTestResultsReturn = Awaited<
  ReturnType<typeof myTestGetTestResults>
>;

export default myTestGetTestResults;
