import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import { z } from "zod";

const { CHECKBOX, RADIO, TABLE, TEXT } = TEST_QUESTION_TYPE;

const AddTestQuestionSchema = z.object({
  type: z
    .union([
      z.literal(TEXT),
      z.literal(RADIO),
      z.literal(CHECKBOX),
      z.literal(TABLE),
      z.null(),
    ])
    .refine((data) => data !== null, { message: "Выберите тип вопроса" }),
});

export type AddTestQuestionSchemaType = z.infer<
  typeof AddTestQuestionSchema
> & {
  type: Exclude<z.infer<typeof AddTestQuestionSchema>["type"], null>;
};
export type AddTestQuestionSchemaInputType = z.input<
  typeof AddTestQuestionSchema
>;

export default AddTestQuestionSchema;
