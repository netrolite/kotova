import { z } from "zod";

const AddTestFormQuestionOption = z.object({
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

export const AddTestFormSavedQuestionOption = AddTestFormQuestionOption.extend({
  content: z.string().nullable(),
});

export default AddTestFormQuestionOption;

export type AddTestFormQuestionOptionSchemaType = z.infer<
  typeof AddTestFormQuestionOption
>;
export type AddTestFormQuestionOptionInputSchemaType = z.input<
  typeof AddTestFormQuestionOption
>;

export type AddTestFormSavedQuestionOptionSchemaType = z.infer<
  typeof AddTestFormSavedQuestionOption
>;
export type AddTestFormSavedQuestionOptionSchemaInputType = z.input<
  typeof AddTestFormSavedQuestionOption
>;
