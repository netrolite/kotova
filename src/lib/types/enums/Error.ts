export const ERROR = {
  INTERNAL: "Internal server error",
  BAD_REQUEST: "Bad request",
} as const;

export type Error = (typeof ERROR)[keyof typeof ERROR];
