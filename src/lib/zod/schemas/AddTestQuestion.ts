import { z } from "zod";
import AddTestQuestionOption from "./AddTestQuestionOption";
import AddTestQuestionTypeSchema from "./AddTestQuestionType";

const AddTestQuestionSchema = z.object({
  question: z.string().min(1, { message: "Вопрос не заполнен" }),
  type: AddTestQuestionTypeSchema,
  explanation: z.string().nullable(),
  correctAnswerText: z
    .string()
    .min(1, { message: "Правильный вариант ответа не заполнен" })
    .nullable(),
  options: AddTestQuestionOption.array(),
});

export const AddTestSavedQuestionSchema = z.object({
  question: z.string(),
  type: AddTestQuestionTypeSchema,
  explanation: z.string().nullable(),
  correctAnswerText: z.string().nullable(),
  options: AddTestQuestionOption.array(),
});

export type AddTestSavedQuestionSchemaType = z.infer<
  typeof AddTestSavedQuestionSchema
>;
export type AddTestSavedQuestionSchemaInputType = z.input<
  typeof AddTestSavedQuestionSchema
>;

export type AddTestQuestionSchemaType = z.infer<
  typeof AddTestQuestionSchema
> & {
  type: Exclude<z.infer<typeof AddTestQuestionSchema>["type"], null>;
};
export type AddTestQuestionSchemaInputType = z.input<
  typeof AddTestQuestionSchema
>;

export default AddTestQuestionSchema;
