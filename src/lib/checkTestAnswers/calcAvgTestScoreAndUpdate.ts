import checkTestAnswersGetTest from "../fetchers/checkTestAnswers/getTest";
import { db } from "../db";

type Params = {
  test: Exclude<Awaited<ReturnType<typeof checkTestAnswersGetTest>>, null>;
  testResultsAmount: number;
  score: number;
};

export default async function checkTestAnswersCalcAvgTestScoreAndUpdate({
  test,
  testResultsAmount,
  score,
}: Params) {
  const prevScoresTotal = (test.avgScore ?? 0) * testResultsAmount;
  const newAvgScore = (prevScoresTotal + score) / (testResultsAmount + 1);

  await db.test.update({
    where: { id: test.id },
    data: { avgScore: newAvgScore },
  });
}
