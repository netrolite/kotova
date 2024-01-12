import { TakeTestQuestion } from "@/components/takeTest/Quetions";
import { TakeTestSchemaType } from "../zod/schemas/takeTest";
import { TestQuestionType } from "../types/enums/TestQuestionType";
import getTestTypes from "../getTestTypes";

export default function takeTestGetQuestionsDefaultValues(
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
