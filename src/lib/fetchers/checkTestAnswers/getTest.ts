import { db } from "@/lib/db";
import { cache } from "react";

const checkTestAnswersGetTest = cache(async (testId: string) => {
  return db.test.findFirst({
    where: { id: testId },
    include: {
      questions: { include: { options: true } },
      _count: { select: { testResults: true } },
    },
  });
});

export default checkTestAnswersGetTest;
