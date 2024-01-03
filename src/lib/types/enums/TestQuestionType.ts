import GetEnum from "../GetEnum";

export const TEST_QUESTION_TYPE = {
  RADIO: 1,
  CHECKBOX: 2,
  TEXT: 3,
  TABLE: 4,
} as const;

export type TestQuestionType = GetEnum<typeof TEST_QUESTION_TYPE>;
