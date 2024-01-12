import { z } from "zod";
import QuestionTypeSchema from "../QuestionType";
import getTestTypes from "@/lib/getTestTypes";

const TakeTestSchema = z.object({
  answers: z.array(
    z
      .object({
        type: QuestionTypeSchema,
        id: z.string(),
        textAnswer: z
          .string()
          .min(1, { message: "Ответ не заполнен" })
          .nullable(),
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
      })
      .refine(
        (question) => {
          const { isRadioQuestion } = getTestTypes(question.type);
          if (isRadioQuestion) {
            return question.options?.find(({ isChecked }) => isChecked);
          }
          return true;
        },
        { message: "Выберите один ответ" },
      )
      .refine(
        (question) => {
          const { isCheckboxQuestion } = getTestTypes(question.type);
          if (isCheckboxQuestion) {
            return question.options?.find(({ isChecked }) => isChecked);
          }
          return true;
        },
        { message: "Выберите хотя бы один ответ" },
      ),
  ),
});

export default TakeTestSchema;

export type TakeTestSchemaType = z.infer<typeof TakeTestSchema>;
