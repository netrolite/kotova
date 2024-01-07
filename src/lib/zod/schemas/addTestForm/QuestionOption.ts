import { z } from "zod";

const AddTestFormQuestionOption = z.object({
  content: z.string().min(1, { message: "Ответ не заполнен" }),
  isCorrect: z.boolean(),
});

export default AddTestFormQuestionOption;

export type AddTestFormQuestionOptionSchemaType = z.infer<
  typeof AddTestFormQuestionOption
>;
export type AddTestFormQuestionOptionInputSchemaType = z.input<
  typeof AddTestFormQuestionOption
>;
