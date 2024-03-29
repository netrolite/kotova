import { z } from "zod";
import AddTestFormQuestionOptionSchema, {
  AddTestFormSavedQuestionOption,
} from "./QuestionOption";
import QuestionTypeSchema from "../QuestionType";
import {
  TEST_QUESTION_TYPE,
  TestQuestionType,
} from "@/lib/types/enums/TestQuestionType";

const AddTestFormQuestionSchema = z
  .object({
    question: z.string().trim().min(1, { message: "Вопрос не заполнен" }),
    type: QuestionTypeSchema,
    explanation: z.string().trim().nullable(),
    correctAnswerText: z.string().trim().nullable(),
    options: AddTestFormQuestionOptionSchema.array(),
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
      if (data.type !== TEST_QUESTION_TYPE.TEXT) {
        return data.options.length >= 2;
      }
      return true;
    },
    {
      message: "Добавьте хотя бы 2 варианта ответа",
      path: ["options"],
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
        return data.options.some((option) => option.isCorrect);
      }
      return true;
    },
    { message: "Выберите правильный вариант ответа", path: ["options"] },
  );

export const AddTestFormSavedQuestionSchema = z.object({
  question: z.string(),
  correctAnswerText: z.string().nullable(),
  options: AddTestFormSavedQuestionOption.array(),
  type: QuestionTypeSchema,
  explanation: z.string().nullable(),
});

export type AddTestFormSavedQuestionSchemaType = z.infer<
  typeof AddTestFormSavedQuestionSchema
>;

export type AddTestFormQuestionSchemaType = z.infer<
  typeof AddTestFormQuestionSchema
>;

export default AddTestFormQuestionSchema;
