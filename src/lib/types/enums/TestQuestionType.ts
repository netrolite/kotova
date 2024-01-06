import GetUnion from "../GetEnum";

export const TEST_QUESTION_TYPE = {
  TEXT: 1,
  RADIO: 2,
  CHECKBOX: 3,
  TABLE: 4,
} as const;

export const TEST_QUESTION_TYPE_LABEL = {
  CHECKBOX: "Множественный выбор",
  RADIO: "Одиночный выбор",
  TABLE: "Таблица",
  TEXT: "Текст",
} as const;

export type TestQuestionType = GetUnion<typeof TEST_QUESTION_TYPE>;
export type TestQuestionTypeLabel = GetUnion<typeof TEST_QUESTION_TYPE_LABEL>;
