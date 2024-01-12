import { TakeTestQuestion } from "@/components/takeTest/Quetions";
import { TakeTestSchemaType } from "../zod/schemas/takeTest";
import {
  TEST_QUESTION_TYPE,
  TestQuestionType,
} from "../types/enums/TestQuestionType";

export default function takeTestGetQuestionsDefaultValues(
  questions: TakeTestQuestion[],
): TakeTestSchemaType {
  return {
    answers: questions.map(({ type, id }) => {
      const isTextQuestion = type === TEST_QUESTION_TYPE.TEXT;
      return {
        id,
        textAnswer: isTextQuestion ? "" : null,
        type: type as TestQuestionType,
      };
    }),
  };
}
