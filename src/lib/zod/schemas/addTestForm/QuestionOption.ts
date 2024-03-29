import { z } from "zod";

const AddTestFormQuestionOptionSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Ответ не заполнен" })
    .nullable(),
  isCorrect: z.boolean().nullable(),
  tableColumn: z
    .string()
    .trim()
    .min(1, { message: "Имя столбца не заполнено" })
    .nullable(),
  tableColumnAnswer: z
    .string()
    .trim()
    .min(1, { message: "Ответ не заполнен" })
    .nullable(),
});

export const AddTestFormSavedQuestionOption =
  AddTestFormQuestionOptionSchema.extend({
    content: z.string().nullable(),
    tableColumn: z.string().nullable(),
    tableColumnAnswer: z.string().nullable(),
  });

export default AddTestFormQuestionOptionSchema;

export type AddTestFormQuestionOptionSchemaType = z.infer<
  typeof AddTestFormQuestionOptionSchema
>;
export type AddTestFormQuestionOptionInputSchemaType = z.input<
  typeof AddTestFormQuestionOptionSchema
>;

export type AddTestFormSavedQuestionOptionSchemaType = z.infer<
  typeof AddTestFormSavedQuestionOption
>;
export type AddTestFormSavedQuestionOptionSchemaInputType = z.input<
  typeof AddTestFormSavedQuestionOption
>;
