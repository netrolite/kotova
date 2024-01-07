import GetUnion from "../GetUnion";

export const ERROR_MSG = {
  GENERIC: "Что-то пошло не так. Попробуйте немного позже",
} as const;

export type ErrorMsg = GetUnion<typeof ERROR_MSG>;
