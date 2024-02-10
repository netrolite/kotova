import { z } from "zod";
import AddTestFormSchema from "../addTestForm/Index";

const MyTestEditFormSchema = AddTestFormSchema.extend({});

export type MyTestEditFormSchemaInputType = z.input<
  typeof MyTestEditFormSchema
>;
export type MyTestEditFormSchemaType = z.infer<typeof MyTestEditFormSchema>;

export default MyTestEditFormSchema;
