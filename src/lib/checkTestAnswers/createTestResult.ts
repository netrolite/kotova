import { Prisma, User } from "@prisma/client";
import { db } from "../db";
import checkTestAnswersGetTest from "../fetchers/checkTestAnswers/getTest";

type Params = {
  checkedAnswers: Prisma.TestResultAnswerUncheckedCreateWithoutTestResultInput[];
  test: Exclude<Awaited<ReturnType<typeof checkTestAnswersGetTest>>, null>;
  user: User;
  score: number;
};

export default async function checkTestAnswersCreateTestResult({
  checkedAnswers,
  test,
  user,
  score,
}: Params) {
  try {
    const testResult = await db.testResult.create({
      data: {
        score,
        testId: test.id,
        userId: user.id,
        answers: { create: checkedAnswers },
      },
      include: {
        answers: { include: { options: true, question: true } },
      },
    });
    return { data: { testResultId: testResult.id } };
  } catch (err) {
    console.error(err);
    return { error: true };
  }
}
