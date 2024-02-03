import { z } from "zod";

const DeleteTestSchema = z.object({
  testId: z.string(),
});

export type DeleteTestSchemaType = z.infer<typeof DeleteTestSchema>;
export default DeleteTestSchema;
