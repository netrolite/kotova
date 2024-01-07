import { z } from "zod";
import AddTestFormQuestionOption from "./QuestionOption";
import AddTestFormQuestionTypeSchema from "./QuestionType";

const AddTestFormQuestionSchema = z.object({
  question: z.string().min(1, { message: "Вопрос не заполнен" }),
  type: AddTestFormQuestionTypeSchema,
  explanation: z.string().nullable(),
  correctAnswerText: z
    .string()
    .min(1, { message: "Правильный вариант ответа не заполнен" })
    .nullable(),
  options: AddTestFormQuestionOption.array(),
});

export const AddTestFormSavedQuestionSchema = AddTestFormQuestionSchema.extend({
  question: z.string(),
  type: AddTestFormQuestionTypeSchema,
  correctAnswerText: z.string().nullable(),
});

export type AddTestFormSavedQuestionSchemaType = z.infer<
  typeof AddTestFormSavedQuestionSchema
>;

export type AddTestFormQuestionSchemaType = z.infer<
  typeof AddTestFormQuestionSchema
>;

export default AddTestFormQuestionSchema;
