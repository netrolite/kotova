import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import { z } from "zod";

const { CHECKBOX, RADIO, TABLE, TEXT } = TEST_QUESTION_TYPE;

const AddTestFormQuestionTypeSchema = z.union([
  z.literal(TEXT),
  z.literal(RADIO),
  z.literal(CHECKBOX),
  z.literal(TABLE),
]);

export type AddTestFormQuestionTypeType = z.infer<
  typeof AddTestFormQuestionTypeSchema
>;
export type AddTestFormQuestionTypeInputType = z.input<
  typeof AddTestFormQuestionTypeSchema
>;

export default AddTestFormQuestionTypeSchema;
