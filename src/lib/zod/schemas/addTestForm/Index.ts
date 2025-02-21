import { z } from "zod";
import AddTestFormQuestionSchema, {
  AddTestFormSavedQuestionSchema,
} from "./Question";
import { UploadedFileSchema } from "./Files";

const NAME_MAX_LEN = 300;

export const AddTestFormGrades = z.number().array();

const AddTestFormSchema = z.object({
  grades: AddTestFormGrades.min(1, { message: "Не выбран класс" }),
  categoryId: z.string().min(1, { message: "Не выбрана категория" }),
  name: z
    .string()
    .min(1, "Название не заполнено")
    .max(
      NAME_MAX_LEN,
      `Название должно быть не длиннее ${NAME_MAX_LEN} символов`,
    ),
  files: UploadedFileSchema.array(),
  questions: AddTestFormQuestionSchema.array().refine(
    (questions) => questions.length > 0,
    {
      message: "Добавьте хотя бы один вопрос",
    },
  ),
});

export const AddTestFormSavedValuesSchema = AddTestFormSchema.extend({
  grades: AddTestFormGrades,
  categoryId: z.string(),
  name: z.string(),
  questions: AddTestFormSavedQuestionSchema.array(),
});

export type AddTestFormSchemaInputType = z.input<typeof AddTestFormSchema>;
export type AddTestFormSchemaType = z.infer<typeof AddTestFormSchema>;

export default AddTestFormSchema;
