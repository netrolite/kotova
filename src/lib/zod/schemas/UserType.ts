import { ROLE } from "@/lib/types/enums/Role";
import { z } from "zod";

const { ADMIN, STUDENT, TEACHER } = ROLE;

const UserRoleSchema = z.union([
  z.literal(ADMIN),
  z.literal(STUDENT),
  z.literal(TEACHER),
]);

export type UserRoleSchemaType = z.infer<typeof UserRoleSchema>;
export type UserRoleSchemaInputType = z.input<typeof UserRoleSchema>;

export default UserRoleSchema;
