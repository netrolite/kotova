"use server";

import { db } from "../db";
import checkTestAnswersGetTest from "../fetchers/checkTestAnswers/getTest";
import getSignedInUser from "../fetchers/getSignedInUser";
import getQuestionTypes from "../getQuestionTypes";
import ServerActionReturn from "../types/ServerActionReturn";
import { TestQuestionType } from "../types/enums/TestQuestionType";
import TakeTestSchema from "../zod/schemas/takeTest";

export default async function checkTestAnswers(
  data: unknown,
): Promise<ServerActionReturn<boolean, string>> {
  const validationResult = TakeTestSchema.safeParse(data);
  if (!validationResult.success) return { error: "invalid data" };
  const {
    data: { testId, answers },
  } = validationResult;

  const testPromise = checkTestAnswersGetTest(testId);
  const userPromise = getSignedInUser();
  const [test, user] = await Promise.all([testPromise, userPromise]);

  if (!test) return { error: "test not found" };
  if (!user) return { error: "user not found" };

  const wrongAnswerIds: string[] = [];

  test.questions.forEach((question, i) => {
    const answer = answers[i];
    const {
      isCheckboxQuestion,
      isRadioQuestion,
      isTableQuestion,
      isTextQuestion,
    } = getQuestionTypes(question.type as TestQuestionType);

    if (isRadioQuestion || isCheckboxQuestion) {
      for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i];
        if (option.isCorrect !== answer.options?.[i].isChecked) {
          wrongAnswerIds.push(answer.id);
          break;
        }
      }
    } else if (isTextQuestion) {
      if (question.correctAnswerText !== answer.textAnswer) {
        wrongAnswerIds.push(answer.id);
      }
    } else if (isTableQuestion) {
      for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i];
        if (option.tableColumnAnswer !== answer.options?.[i].tableAnswer) {
          wrongAnswerIds.push(answer.id);
          break;
        }
      }
    }
  });

  const correctAnswersAmount = answers.length - wrongAnswerIds.length;
  const testResult = await db.testResult.create({
    data: {
      score: (correctAnswersAmount / test.questions.length) * 100,
      testId,
      userId: user.id,
      wrongAnswerIds,
    },
  });
  console.log(testResult);

  return { data: true };
}
