import GetUnion from "../GetUnion";

export const ROLE = {
  STUDENT: 1,
  TEACHER: 2,
  ADMIN: 3,
} as const;

export type Role = GetUnion<typeof ROLE>;
