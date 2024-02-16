import { z } from "zod";
import QuestionTypeSchema from "../QuestionType";
import MyTestEditFormQuestionOptionSchema from "./QuestionOption";
import {
  TEST_QUESTION_TYPE,
  TestQuestionType,
} from "@/lib/types/enums/TestQuestionType";

const MyTestEditFormQuestionSchema = z
  .object({
    id: z.string().nullable(), // the id is used if the user tries to edit an existing question. Newly added questions will not have this
    question: z.string().trim().min(1, { message: "Вопрос не заполнен" }),
    type: QuestionTypeSchema,
    explanation: z.string().trim().nullable(),
    correctAnswerText: z.string().trim().nullable(),
    options: MyTestEditFormQuestionOptionSchema.array(),
  })
  .refine(
    (data) =>
      !(data.type === TEST_QUESTION_TYPE.TEXT && !data.correctAnswerText),
    {
      message: "Правильный вариант ответа не заполнен",
      path: ["correctAnswerText"],
    },
  )
  .refine(
    (data) => {
      if (data.type !== TEST_QUESTION_TYPE.TEXT) {
        return data.options.length >= 2;
      }
      return true;
    },
    {
      message: "Добавьте хотя бы 2 варианта ответа",
      path: ["options"],
    },
  )
  .refine(
    (data) => {
      const isOptionsQuestion = !(
        [
          TEST_QUESTION_TYPE.TEXT,
          TEST_QUESTION_TYPE.TABLE,
        ] as TestQuestionType[]
      ).includes(data.type);
      if (isOptionsQuestion) {
        return data.options.some((option) => option.isCorrect);
      }
      return true;
    },
    { message: "Выберите правильный вариант ответа", path: ["options"] },
  );

export type MyTestEditFormQuestionSchemaType = z.infer<
  typeof MyTestEditFormQuestionSchema
>;

export default MyTestEditFormQuestionSchema;
