import { z } from "zod";
import AddTestFormAddQuestionQuestionType from "./AddQuestionFormQuestionType";

const AddTestFormAddQuestionSchema = z.object({
  type: AddTestFormAddQuestionQuestionType,
});

export default AddTestFormAddQuestionSchema;

export type AddTestFormAddQuestionFormSchemaInputType = z.input<
  typeof AddTestFormAddQuestionSchema
>;

export type AddTestFormAddQuestionFormSchemaType = z.infer<
  typeof AddTestFormAddQuestionSchema
> & {
  type: Exclude<AddTestFormAddQuestionFormSchemaInputType, null>;
};
