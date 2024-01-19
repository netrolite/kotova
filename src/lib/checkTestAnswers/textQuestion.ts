import { Prisma } from "@prisma/client";
import checkTestAnswersGetTest from "../fetchers/checkTestAnswers/getTest";
import { TakeTestSchemaType } from "../zod/schemas/takeTest";

type Params = {
  checkedAnswers: Prisma.TestResultAnswerUncheckedCreateWithoutTestResultInput[];
  question: Exclude<
    Awaited<ReturnType<typeof checkTestAnswersGetTest>>,
    null
  >["questions"][number];
  answer: TakeTestSchemaType["answers"][number];
};

export default function checkTestAnswersTextQuestion({
  checkedAnswers,
  question,
  answer,
}: Params) {
  let isCorrect = true;
  if (
    question.correctAnswerText?.toLowerCase() !==
    answer.textAnswer?.toLowerCase()
  ) {
    isCorrect = false;
  }

  checkedAnswers.push({
    isCorrect,
    questionId: question.id,
    type: question.type,
    textAnswer: answer.textAnswer,
  });
}
