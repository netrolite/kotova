import checkTestAnswersGetTest from "../fetchers/checkTestAnswers/getTest";
import { db } from "../db";

type Params = {
  test: Exclude<Awaited<ReturnType<typeof checkTestAnswersGetTest>>, null>;
  testResults: {}[];
  score: number;
};

export default async function checkTestAnswersCalcAvgTestScoreAndUpdate({
  test,
  testResults,
  score,
}: Params) {
  const prevScoresTotal = (test.avgScore ?? 0) * testResults.length;
  const newAvgScore = (prevScoresTotal + score) / (testResults.length + 1);

  await db.test.update({
    where: { id: test.id },
    data: { avgScore: newAvgScore },
  });
}
