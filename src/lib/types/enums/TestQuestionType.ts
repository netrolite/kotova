import GetEnum from "../GetEnum";

export const TEST_QUESTION_TYPE = {
  TEXT: 1,
  RADIO: 2,
  CHECKBOX: 3,
  TABLE: 4,
} as const;
const { CHECKBOX, RADIO, TABLE, TEXT } = TEST_QUESTION_TYPE;

export const TEST_QUESTION_TYPE_LABEL = {
  [CHECKBOX]: "Множественный выбор",
  [RADIO]: "Одиночный выбор",
  [TABLE]: "Таблица",
  [TEXT]: "Текст",
} as const;

export type TestQuestionType = GetEnum<typeof TEST_QUESTION_TYPE>;
