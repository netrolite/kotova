import { db } from "@/lib/db";
import { cache } from "react";

const getTestResult = cache(async (id: string) => {
  return db.testResult.findFirst({
    where: { id },
    include: {
      user: { select: { name: true } },
      test: { select: { name: true } },
      answers: {
        select: {
          id: true,
          isCorrect: true,
          type: true,
          options: true,
          question: {
            select: {
              question: true,
              correctAnswerText: true,
              explanation: true,
              options: {
                select: {
                  content: true,
                },
              },
            },
          },
        },
      },
    },
  });
});

export type TestResultGetTestResultReturn = Awaited<
  ReturnType<typeof getTestResult>
>;

export default getTestResult;
