import { z } from "zod";
import AddTestFormQuestionOptionSchema from "../addTestForm/QuestionOption";

const MyTestEditFormQuestionOption = AddTestFormQuestionOptionSchema.extend({});

export default MyTestEditFormQuestionOption;

export type MyTestEditFormQuestionOptionSchemaType = z.infer<
  typeof MyTestEditFormQuestionOption
>;
export type MyTestEditFormQuestionOptionInputSchemaType = z.input<
  typeof MyTestEditFormQuestionOption
>;
