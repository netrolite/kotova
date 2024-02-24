import { z } from "zod";
import UserRoleSchema from "./UserType";

const ChangeUserRoleSchema = z.object({
  userId: z.string(),
  role: UserRoleSchema,
});

export default ChangeUserRoleSchema;
export type ChangeUserRoleSchemaType = z.infer<typeof ChangeUserRoleSchema>;
