import GetUnion from "../GetUnion";

export const ERROR = {
  INTERNAL: "Internal server error",
  BAD_REQUEST: "Bad request",
} as const;

export type Error = GetUnion<typeof ERROR>;
