import { z } from "zod";
import AddTestFormQuestionSchema from "../addTestForm/Question";
import deepCopy from "@/lib/deepCopy";

const MyTestEditFormQuestionSchema = deepCopy(AddTestFormQuestionSchema);

export type MyTestEditFormQuestionSchemaType = z.infer<
  typeof MyTestEditFormQuestionSchema
>;

export default MyTestEditFormQuestionSchema;
