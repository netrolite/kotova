"use server";

import {
  Prisma,
  TestResultAnswer,
  TestResultAnswerOption,
} from "@prisma/client";
import { db } from "../db";
import checkTestAnswersGetTest from "../fetchers/checkTestAnswers/getTest";
import getSignedInUser from "../fetchers/getSignedInUser";
import getQuestionTypes from "../getQuestionTypes";
import ServerActionReturn from "../types/ServerActionReturn";
import { TestQuestionType } from "../types/enums/TestQuestionType";
import TakeTestSchema from "../zod/schemas/takeTest";
import checkTestAnswersCheckboxQuestion from "../checkTestAnswers/checkboxQuestion";
import checkTestAnswersTextQuestion from "../checkTestAnswers/textQuestion";
import checkTestAnswersTableQuestion from "../checkTestAnswers/tableQuestion";
import checkTestAnswersCreateTestResult from "../checkTestAnswers/createTestResult";
import checkTestAnswersGetTestResults from "../fetchers/checkTestAnswers/getTestResults";
import checkTestAnswersCalcAvgTestScoreAndUpdate from "../checkTestAnswers/calcAvgTestScoreAndUpdate";
import getTestScore from "../getTestScore";
import checkTestAnswersGetCorrectAnswersAmount from "../checkTestAnswers/getCorrectAnswersAmount";

type Data = {
  testResultId: string;
};

type Error = string | boolean;

export default async function checkTestAnswers(
  data: unknown,
): Promise<ServerActionReturn<Data, Error>> {
  const validationResult = TakeTestSchema.safeParse(data);
  if (!validationResult.success) return { error: "invalid data" };
  const {
    data: { testId, answers },
  } = validationResult;

  const testPromise = checkTestAnswersGetTest(testId);
  const testResultsPromise = checkTestAnswersGetTestResults(testId);
  const userPromise = getSignedInUser();
  const [test, testResults, user] = await Promise.all([
    testPromise,
    testResultsPromise,
    userPromise,
  ]);

  if (!test) return { error: "test not found" };
  if (!user) return { error: "user not found" };

  const checkedAnswers: Prisma.TestResultAnswerUncheckedCreateWithoutTestResultInput[] =
    [];

  for (let i = 0, n = test.questions.length; i < n; i++) {
    const question = test.questions[i];
    const answer = answers[i];
    const {
      isCheckboxQuestion,
      isRadioQuestion,
      isTableQuestion,
      isTextQuestion,
    } = getQuestionTypes(question.type as TestQuestionType);

    if (isRadioQuestion || isCheckboxQuestion) {
      checkTestAnswersCheckboxQuestion({ answer, checkedAnswers, question });
    } else if (isTextQuestion) {
      checkTestAnswersTextQuestion({ answer, checkedAnswers, question });
    } else if (isTableQuestion) {
      checkTestAnswersTableQuestion({ answer, checkedAnswers, question });
    }
  }

  const correctAnswersAmount =
    checkTestAnswersGetCorrectAnswersAmount(checkedAnswers);
  const score = getTestScore({
    correctAnswersAmount,
    questionsAmount: test.questions.length,
  });
  const [testCreationResult] = await Promise.all([
    checkTestAnswersCreateTestResult({ checkedAnswers, test, user, score }),
    checkTestAnswersCalcAvgTestScoreAndUpdate({ test, score, testResults }),
  ]);

  return testCreationResult;
}
