import {
  TEST_QUESTION_TYPE,
  TEST_QUESTION_TYPE_LABEL,
  TestQuestionType,
} from "./types/enums/TestQuestionType";

export function getQuestionTypeLabelByNumber(questionType: TestQuestionType) {
  for (let key in TEST_QUESTION_TYPE) {
    const val = TEST_QUESTION_TYPE[key as keyof typeof TEST_QUESTION_TYPE];
    if (questionType === val) {
      return TEST_QUESTION_TYPE_LABEL[key as keyof typeof TEST_QUESTION_TYPE];
    }
  }

  return null;
}

export function getQuestionTypeLabelByString(
  questionType: keyof typeof TEST_QUESTION_TYPE,
) {
  return TEST_QUESTION_TYPE_LABEL[questionType];
}
