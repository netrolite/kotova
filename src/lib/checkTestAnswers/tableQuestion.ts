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

export default function checkTestAnswersTableQuestion({
  checkedAnswers,
  question,
  answer,
}: Params) {
  let isCorrect = true;
  const options: Prisma.TestResultAnswerOptionUncheckedCreateWithoutTestResultAnswerInput[] =
    [];

  for (let i = 0; i < question.options.length; i++) {
    const questionOption = question.options[i];
    const answerOption = answer.options?.[i] ?? null;
    options.push({
      isChecked: answerOption?.isChecked,
      tableAnswer: answerOption?.tableAnswer,
    });
    if (
      questionOption.tableColumnAnswer?.toLowerCase() !==
      answerOption?.tableAnswer?.toLowerCase()
    ) {
      isCorrect = false;
    }
  }

  checkedAnswers.push({
    isCorrect,
    questionId: question.id,
    type: question.type,
    textAnswer: answer.textAnswer,
    options: { create: options },
  });
}
