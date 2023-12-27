const TestQuestionTypeEnum = {
  RADIO: 1,
  CHECKBOX: 2,
  TEXT: 3,
  TABLE: 4,
} as const;

export type TestQuestionType =
  (typeof TestQuestionTypeEnum)[keyof typeof TestQuestionTypeEnum];

export default TestQuestionTypeEnum;
