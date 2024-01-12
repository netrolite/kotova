import { z } from "zod";
import getQuestionTypes from "@/lib/getQuestionTypes";
import TakeTestAnswerSchema from "./Answer";

const TakeTestSchema = z.object({
  answers: TakeTestAnswerSchema.refine(
    (question) => {
      const { isRadioQuestion } = getQuestionTypes(question.type);
      if (isRadioQuestion) {
        return question.options?.find(({ isChecked }) => isChecked);
      }
      return true;
    },
    { message: "Выберите один ответ" },
  )
    .refine(
      (question) => {
        const { isCheckboxQuestion } = getQuestionTypes(question.type);
        if (isCheckboxQuestion) {
          return question.options?.find(({ isChecked }) => isChecked);
        }
        return true;
      },
      { message: "Выберите хотя бы один ответ" },
    )
    .array(),
  testId: z.string(),
});

export default TakeTestSchema;

export type TakeTestSchemaType = z.infer<typeof TakeTestSchema>;
