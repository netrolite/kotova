import filterOutNullishValues from "@/lib/filterOutNulls";
import { TestResultAnswerContextType } from "../../contexts/testResult/Answer";
import getQuestionTypes from "../../getQuestionTypes";
import { TestQuestionType } from "../../types/enums/TestQuestionType";
import testResultGetAnswerForCheckboxQuestion from "./checkboxQuestion";

export default function testResultGetAnswers({
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
  let answer: string | (string | null)[] | null = null;

  if (isTextQuestion) answer = [textAnswer];
  else if (isCheckboxQuestion || isRadioQuestion) {
    answer = testResultGetAnswerForCheckboxQuestion({
      options,
      question,
    });
  } else if (isTableQuestion) {
    answer = options.map((option) => option.tableAnswer);
  } else answer = null;

  return answer ? filterOutNullishValues(answer) : null;
}
