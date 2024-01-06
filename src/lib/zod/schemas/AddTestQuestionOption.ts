import { z } from "zod";

const AddTestQuestionOption = z.object({
  content: z.string().min(1, { message: "Ответ не заполнен" }),
  isCorrect: z.boolean(),
});

export default AddTestQuestionOption;

export type AddTestQuestionOptionSchemaType = z.infer<
  typeof AddTestQuestionOption
>;
export type AddTestQuestionOptionInputSchemaType = z.input<
  typeof AddTestQuestionOption
>;
