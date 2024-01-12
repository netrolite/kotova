import {
  TEST_QUESTION_TYPE,
  TestQuestionType,
} from "./types/enums/TestQuestionType";

export default function getTestTypes(type: TestQuestionType) {
  const { CHECKBOX, RADIO, TABLE, TEXT } = TEST_QUESTION_TYPE;
  let isCheckboxQuestion = false;
  let isRadioQuestion = false;
  let isTableQuestion = false;
  let isTextQuestion = false;

  switch (type) {
    case CHECKBOX:
      isCheckboxQuestion = true;
      break;
    case RADIO:
      isRadioQuestion = true;
      break;
    case TABLE:
      isTableQuestion = true;
      break;
    case TEXT:
      isTextQuestion = true;
      break;
  }

  return {
    isCheckboxQuestion,
    isRadioQuestion,
    isTableQuestion,
    isTextQuestion,
  };
}
