import { z } from "zod";
import AddTestFormAddQuestionSchema from "../addTestForm/AddQuestionForm";

const MyTestEditFormAddQuestionSchema = AddTestFormAddQuestionSchema.extend({});

export default MyTestEditFormAddQuestionSchema;

export type MyTestEditFormAddQuestionSchemaInputType = z.input<
  typeof MyTestEditFormAddQuestionSchema
>;

export type MyTestEditFormAddQuestionSchemaType = z.infer<
  typeof MyTestEditFormAddQuestionSchema
> & {
  type: Exclude<MyTestEditFormAddQuestionSchemaInputType, null>;
};
