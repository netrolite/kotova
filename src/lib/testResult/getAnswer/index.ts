import { TestResultAnswerContextType } from "../../contexts/testResult/Answer";
import getQuestionTypes from "../../getQuestionTypes";
import { TestQuestionType } from "../../types/enums/TestQuestionType";
import testResultFormatAnswer from "../formatAnswer";
import testResultGetAnswerForCheckboxQuestion from "./checkboxQuestion";

export default function testResultGetAnswer({
  type,
  textAnswer,
  options,
  question,
}: TestResultAnswerContextType) {
  const {
    isTextQuestion,
    isTableQuestion,
    isCheckboxQuestion,
    isRadioQuestion,
  } = getQuestionTypes(type as TestQuestionType);
  let answerContent: string | (string | null)[] | null = null;

  if (isTextQuestion) answerContent = [textAnswer];
  else if (isCheckboxQuestion || isRadioQuestion) {
    answerContent = testResultGetAnswerForCheckboxQuestion({
      options,
      question,
    });
  } else if (isTableQuestion) {
    answerContent = options.map((option) => option.tableAnswer);
  } else answerContent = null;

  return testResultFormatAnswer(answerContent);
}
