import { TestResultAnswerContextType } from "../contexts/testResult/Answer";
import filterOutNullishValues from "../filterOutNulls";
import getQuestionTypes from "../getQuestionTypes";
import { TestQuestionType } from "../types/enums/TestQuestionType";

export default function testResultGetCorrectAnswers({
  question,
  type,
}: TestResultAnswerContextType) {
  const {
    isTextQuestion,
    isTableQuestion,
    isCheckboxQuestion,
    isRadioQuestion,
  } = getQuestionTypes(type as TestQuestionType);
  let answer: string | (string | null)[] | null = null;

  if (isTextQuestion) answer = [question.correctAnswerText];
  else if (isRadioQuestion || isCheckboxQuestion) {
    const correctOptions = question.options.filter(
      (option) => option.isCorrect,
    );
    answer = correctOptions.map((option) => option.content);
  } else if (isTableQuestion) {
    answer = question.options.map((option) => option.tableColumnAnswer);
  } else answer = null;

  return answer ? filterOutNullishValues(answer) : null;
}
