import { db } from "../db";
import { User } from "@prisma/client";

type Params = {
  user: User;
  userTestResultsAmount: number;
  score: number;
};

export default async function checkTestAnswersCalcUserAvgTestScoreAndUpdate({
  user,
  userTestResultsAmount,
  score,
}: Params) {
  const prevScoresTotal = (user.avgTestScore ?? 0) * userTestResultsAmount;
  const newAvgScore = (prevScoresTotal + score) / (userTestResultsAmount + 1);

  await db.user.update({
    where: { id: user.id },
    data: { avgTestScore: newAvgScore },
  });
}
