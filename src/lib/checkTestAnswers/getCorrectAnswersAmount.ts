import { Prisma } from "@prisma/client";

export default function checkTestAnswersGetCorrectAnswersAmount(
  checkedAnswers: Prisma.TestResultAnswerUncheckedCreateWithoutTestResultInput[],
) {
  return checkedAnswers.reduce((prev, curr) => {
    if (curr.isCorrect) return (prev += 1);
    return prev;
  }, 0);
}
