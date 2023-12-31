export const ERROR_MSG = {
  GENERIC: "Что-то пошло не так. Попробуйте немного позже",
} as const;

export type ErrorMsg = (typeof ERROR_MSG)[keyof typeof ERROR_MSG];
