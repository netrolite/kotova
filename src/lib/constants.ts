export const GENERIC_ERROR_MSG =
  "Что-то пошло не так. Попробуйте еще раз позже";
export const DASHBOARD_TESTS_LIST_TESTS_PER_PAGE = 30;
export const SUBJECT_TESTS_TESTS_PER_PAGE = 30;
export const ALL_GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
export type Grade = (typeof ALL_GRADES)[number];

export const dateFormatterDefaults = {
  year: "numeric",
  month: "short",
  day: "numeric",
} satisfies Intl.DateTimeFormatOptions;
export const timeFormatterDefaults = {
  hour: "2-digit",
  minute: "2-digit",
} satisfies Intl.DateTimeFormatOptions;

export const EMAIL_MAX_LEN = 254;
export const PHONE_MIN_LEN = 7;
export const PHONE_MAX_LEN = 16;
export const NAME_MAX_LEN = 120;
export const PASSWORD_MAX_LEN = 254;
export const PASSWORD_MIN_LEN = 6;

export const errCodes = {
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  UNKNOWN: "UNKNOWN", // unknown error
} as const;

export const prismaErrs = {
  uniqueConstraintFailed: "P2002",
};

export const swrKeys = {
  myTest: "/api/test-results",
  subjects: "/api/subjects",
} as const;
