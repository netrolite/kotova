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
  console.log(scoreMin, scoreMax);

  const testResultsQuery = { testId, score: { gt: scoreMin, lt: scoreMax } };
  return await db.user.findMany({
    where: {
      testResults: {
        some: { id: testId, score: { gte: scoreMin, lte: scoreMax } },
      },
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
        where: { id: testId, score: { gte: scoreMin, lte: scoreMax } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
});

export type MyTestGetTestResultsReturn = Awaited<
  ReturnType<typeof myTestGetTestResults>
>;

export default myTestGetTestResults;
