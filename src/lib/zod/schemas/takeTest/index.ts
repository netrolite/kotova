import { z } from "zod";
import QuestionTypeSchema from "../QuestionType";

const TakeTestSchema = z.object({
  answers: z.array(
    z.object({
      type: QuestionTypeSchema,
      id: z.string(),
      textAnswer: z
        .string()
        .min(1, { message: "Ответ не заполнен" })
        .nullable(),
    }),
  ),
});

export default TakeTestSchema;

export type TakeTestSchemaType = z.infer<typeof TakeTestSchema>;
