import { z } from "zod";
import AddTestQuestionTypeSchema from "./AddTestQuestionType";

const AddTestQuestionModalSchema = z.object({
  type: AddTestQuestionTypeSchema,
});

export default AddTestQuestionModalSchema;

export type AddTestQuestionModalSchemaType = z.infer<
  typeof AddTestQuestionModalSchema
>;
export type AddTestQuestionModalSchemaInputType = z.infer<
  typeof AddTestQuestionModalSchema
>;
