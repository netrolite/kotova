import { db } from "@/lib/db";
import { cache } from "react";

type Params = {
  testId: string;
  searchParams?: {
    scoreGt: number;
    scoreLt: number;
    timesTakenGt: number;
    timesTakenLt: number;
  };
};

const myTestGetTestResults = cache(async ({ testId, searchParams }: Params) => {
  const {
    scoreGt,
    scoreLt,
    timesTakenGt = Number.NEGATIVE_INFINITY,
    timesTakenLt = Number.POSITIVE_INFINITY,
  } = searchParams ?? {};
  const query = { testId, score: { gt: scoreGt, lt: scoreLt } };
  const users = await db.user.findMany({
    where: {
      testResults: { some: query },
    },
    select: {
      id: true,
      name: true,
      image: true,
      testResults: { where: query },
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
