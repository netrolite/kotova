import { z } from "zod";

const TITLE_MIN_LEN = 2;
const TITLE_MAX_LEN = 100;

const AddCategorySchema = z.object({
  title: z
    .string()
    .min(
      TITLE_MIN_LEN,
      `Название должно быть не короче ${TITLE_MIN_LEN} символов`,
    )
    .max(
      TITLE_MAX_LEN,
      `Название должно быть не длиннее ${TITLE_MAX_LEN} символов`,
    ),
});

export type AddCateogorySchemaType = z.infer<typeof AddCategorySchema>;
export type AddCategorySchemaInputType = z.input<typeof AddCategorySchema>;

export default AddCategorySchema;
