import { z } from "zod";
import { grades as allGrades } from "@/lib/constants";
import AddTestQuestionSchema, {
  AddTestSavedQuestionSchema,
} from "./AddTestQuestion";

const NAME_MAX_LEN = 300;

const AddTestSchema = z.object({
  grades: z
    .number({ required_error: "Не выбран класс или класс" })
    .array()
    .refine(
      (selectedGrades) =>
        selectedGrades.some((selectedGrade) =>
          allGrades.includes(selectedGrade),
        ),
      { message: "Выберите хотя бы один класс" },
    ),
  subject: z
    .string()
    .min(1, { message: "Не выбран предмет" })
    .cuid({ message: "Неверный формат предмета" }),
  name: z
    .string()
    .min(1, "Название не заполнено")
    .max(NAME_MAX_LEN, `Имя должно быть не длиннее ${NAME_MAX_LEN} символов`),
  questions: z.array(AddTestQuestionSchema),
});

export const AddTestSchemaSavedValues = AddTestSchema.extend({
  grades: z.number().array(),
  subject: z.string(),
  name: z.string(),
  questions: z.array(AddTestSavedQuestionSchema),
});

export type AddTestSchemaType = z.infer<typeof AddTestSchema>;
export type AddTestSchemaInputType = z.input<typeof AddTestSchema>;

export default AddTestSchema;
