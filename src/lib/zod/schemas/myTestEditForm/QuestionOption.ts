import { z } from "zod";
import AddTestFormQuestionOptionSchema from "../addTestForm/QuestionOption";

const MyTestEditFormQuestionOptionSchema =
  AddTestFormQuestionOptionSchema.extend({
    id: z.string().nullable(), // the id is used if the user tries to edit an existing question. Newly added questions will not have this
  });

export default MyTestEditFormQuestionOptionSchema;

export type MyTestEditFormQuestionOptionSchemaType = z.infer<
  typeof MyTestEditFormQuestionOptionSchema
>;
export type MyTestEditFormQuestionOptionInputSchemaType = z.input<
  typeof MyTestEditFormQuestionOptionSchema
>;
