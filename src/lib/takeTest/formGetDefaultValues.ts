import { TakeTestSchemaType } from "../zod/schemas/takeTest";
import { TestQuestionType } from "../types/enums/TestQuestionType";
import getTestTypes from "../getTestTypes";
import { TakeTestQuestion } from "@/components/takeTest/Questions";

export default function takeTestFormGetDefaultValues(
  questions: TakeTestQuestion[],
): TakeTestSchemaType {
  return {
    answers: questions.map(({ type, id, options }) => {
      const { isTextQuestion, isTableQuestion } = getTestTypes(
        type as TestQuestionType,
      );
      return {
        id,
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
