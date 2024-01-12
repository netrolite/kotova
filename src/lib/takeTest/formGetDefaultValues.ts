import { TakeTestSchemaType } from "../zod/schemas/takeTest";
import { TestQuestionType } from "../types/enums/TestQuestionType";
import getQuestionTypes from "../getQuestionTypes";
import { TakeTestQuestion } from "@/components/takeTest/Questions";

type Params = {
  questions: TakeTestQuestion[];
  testId: string;
};

export default function takeTestFormGetDefaultValues({
  questions,
  testId,
}: Params): TakeTestSchemaType {
  return {
    testId,
    answers: questions.map(({ type, id, options }) => {
      const { isTextQuestion, isTableQuestion } = getQuestionTypes(
        type as TestQuestionType,
      );
      return {
        questionId: id,
        textAnswer: isTextQuestion ? "" : null,
        type: type as TestQuestionType,
        options: isTextQuestion
          ? null
          : options.map(({ id }) => ({
              id,
              tableAnswer: isTableQuestion ? "" : null,
              isChecked: isTableQuestion ? null : false,
            })),
      };
    }),
  };
}
