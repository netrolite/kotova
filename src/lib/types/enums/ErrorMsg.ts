import GetEnum from "../GetEnum";

export const ERROR_MSG = {
  GENERIC: "Что-то пошло не так. Попробуйте немного позже",
} as const;

export type ErrorMsg = GetEnum<typeof ERROR_MSG>;
