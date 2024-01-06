import GetUnion from "../GetEnum";

export const ERROR = {
  INTERNAL: "Internal server error",
  BAD_REQUEST: "Bad request",
} as const;

export type Error = GetUnion<typeof ERROR>;
