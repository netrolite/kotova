import { z } from "zod";

const TITLE_MIN_LEN = 2;
const TITLE_MAX_LEN = 100;

const AddSubjectSchema = z.object({
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

export type AddSubjectSchemaType = z.infer<typeof AddSubjectSchema>;
export type AddSubjectSchemaInputType = z.input<typeof AddSubjectSchema>;

export default AddSubjectSchema;
