import { z } from "zod";
import QuestionTypeSchema from "../QuestionType";

const TakeTestAnswerSchema = z.object({
  type: QuestionTypeSchema,
  questionId: z.string(),
  textAnswer: z.string().min(1, { message: "Ответ не заполнен" }).nullable(),
  options: z
    .array(
      z.object({
        id: z.string(),
        tableAnswer: z
          .string()
          .min(1, { message: "Ответ не заполнен" })
          .nullable(),
        isChecked: z.boolean().nullable(),
      }),
    )
    .nullable(),
});

export default TakeTestAnswerSchema;
export type TakeTestAnswerSchemaType = z.infer<typeof TakeTestAnswerSchema>;
