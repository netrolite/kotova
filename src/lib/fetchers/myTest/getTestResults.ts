import { db } from "@/lib/db";
import { cache } from "react";

type Params = {
  testId: string;
  searchParams?: {
    query?: string;
    scoreMin?: number;
    scoreMax?: number;
  };
};

const myTestGetTestResults = cache(async ({ testId, searchParams }: Params) => {
  const { scoreMin, scoreMax, query: textQuery } = searchParams ?? {};

  const testResultsQuery = {
    testId,
    score: { gte: scoreMin, lte: scoreMax },
  };
  const results = await db.user.findMany({
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
      testResults: {
        where: testResultsQuery,
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return results;
});

export type MyTestGetTestResultsReturn = Awaited<
  ReturnType<typeof myTestGetTestResults>
>;

export default myTestGetTestResults;
