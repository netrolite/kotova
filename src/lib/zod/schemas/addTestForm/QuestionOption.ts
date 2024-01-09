import { z } from "zod";

const AddTestFormQuestionOption = z.object({
  content: z.string().min(1, { message: "Ответ не заполнен" }),
  isCorrect: z.boolean(),
});

export const AddTestFormSavedQuestionOption = AddTestFormQuestionOption.extend({
  content: z.string(),
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
