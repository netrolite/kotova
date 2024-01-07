import { z } from "zod";
import AddTestFormAddQuestionQuestionType from "./AddQuestionFormQuestionType";

const AddTestFormAddQuestionFormSchema = z.object({
  type: AddTestFormAddQuestionQuestionType,
});

export default AddTestFormAddQuestionFormSchema;

export type AddTestFormAddQuestionFormSchemaInputType = z.input<
  typeof AddTestFormAddQuestionFormSchema
>;

export type AddTestFormAddQuestionFormSchemaType = z.infer<
  typeof AddTestFormAddQuestionFormSchema
> & {
  type: Exclude<AddTestFormAddQuestionFormSchemaInputType, null>;
};
