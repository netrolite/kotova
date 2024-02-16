import { z } from "zod";
import AddTestFormSchema from "../addTestForm/Index";
import MyTestEditFormQuestionSchema from "./Question";

const MyTestEditFormSchema = AddTestFormSchema.extend({
  questions: MyTestEditFormQuestionSchema.array().refine(
    (questions) => questions.length > 0,
    {
      message: "Добавьте хотя бы один вопрос",
    },
  ),
  testId: z.string(),
});

export type MyTestEditFormSchemaInputType = z.input<
  typeof MyTestEditFormSchema
>;
export type MyTestEditFormSchemaType = z.infer<typeof MyTestEditFormSchema>;

export default MyTestEditFormSchema;
