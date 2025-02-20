import { db } from "@/lib/db";
import { cache } from "react";

const getTestResult = cache(async (id: string) => {
  return db.testResult.findFirst({
    where: { id },
    include: {
      user: { select: { name: true, id: true } },
      test: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          category: true,
          createdBy: true,
        },
      },
      answers: {
        select: {
          id: true,
          isCorrect: true,
          type: true,
          textAnswer: true,
          options: true,
          question: {
            select: {
              question: true,
              correctAnswerText: true,
              explanation: true,
              options: {
                select: {
                  content: true,
                  isCorrect: true,
                  tableColumnAnswer: true,
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });
});

export type TestResultGetTestResultReturn = Exclude<
  Awaited<ReturnType<typeof getTestResult>>,
  null
>;

export default getTestResult;
