import { z } from "zod";
import AddTestFormQuestionOption, {
  AddTestFormSavedQuestionOption,
} from "./QuestionOption";
import AddTestFormQuestionTypeSchema from "./QuestionType";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";

const AddTestFormQuestionSchema = z
  .object({
    question: z.string().min(1, { message: "Вопрос не заполнен" }),
    type: AddTestFormQuestionTypeSchema,
    explanation: z.string().nullable(),
    correctAnswerText: z.string().nullable(),
    options: AddTestFormQuestionOption.array().refine(
      (options) => options.some((option) => option.isCorrect),
      { message: "Выберите правильный вариант ответа", path: [""] },
    ),
  })
  .refine(
    (data) =>
      !(data.type === TEST_QUESTION_TYPE.TEXT && !data.correctAnswerText),
    {
      message: "Правильный вариант ответа не заполнен",
      path: ["correctAnswerText"],
    },
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
