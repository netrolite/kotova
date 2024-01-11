import { z } from "zod";
import AddTestFormQuestionOption, {
  AddTestFormSavedQuestionOption,
} from "./QuestionOption";
import AddTestFormQuestionTypeSchema from "./QuestionType";
import {
  TEST_QUESTION_TYPE,
  TestQuestionType,
} from "@/lib/types/enums/TestQuestionType";

const AddTestFormQuestionSchema = z
  .object({
    question: z.string().min(1, { message: "Вопрос не заполнен" }),
    type: AddTestFormQuestionTypeSchema,
    explanation: z.string().nullable(),
    correctAnswerText: z.string().nullable(),
    options: AddTestFormQuestionOption.array(),
  })
  .refine(
    (data) =>
      !(data.type === TEST_QUESTION_TYPE.TEXT && !data.correctAnswerText),
    {
      message: "Правильный вариант ответа не заполнен",
      path: ["correctAnswerText"],
    },
  )
  .refine(
    (data) => {
      const isOptionsQuestion = !(
        [
          TEST_QUESTION_TYPE.TEXT,
          TEST_QUESTION_TYPE.TABLE,
        ] as TestQuestionType[]
      ).includes(data.type);
      if (isOptionsQuestion) {
        return data.options.some((option) => {
          console.log(`${data.question}:`);
          console.log(option.isCorrect);
          return option.isCorrect;
        });
      }
      return true;
    },
    { message: "Выберите правильный вариант ответа", path: ["options"] },
  );

export const AddTestFormSavedQuestionSchema = z.object({
  question: z.string(),
  correctAnswerText: z.string().nullable(),
  options: AddTestFormSavedQuestionOption.array(),
  type: AddTestFormQuestionTypeSchema,
  explanation: z.string().nullable(),
});

export type AddTestFormSavedQuestionSchemaType = z.infer<
  typeof AddTestFormSavedQuestionSchema
>;

export type AddTestFormQuestionSchemaType = z.infer<
  typeof AddTestFormQuestionSchema
>;

export default AddTestFormQuestionSchema;
