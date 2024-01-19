import { db } from "@/lib/db";
import { cache } from "react";

const checkTestAnswersGetTestResults = cache(async (testId: string) => {
  return db.testResult.findMany({
    select: { _count: true },
    where: { testId },
  });
});

export default checkTestAnswersGetTestResults;
