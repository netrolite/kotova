import { TestResultAnswerContextType } from "../contexts/testResult/Answer";
import getQuestionTypes from "../getQuestionTypes";
import { TestQuestionType } from "../types/enums/TestQuestionType";
import testResultFormatAnswer from "./formatAnswer";

export default function testResultGetCorrectAnswer({
  question,
  type,
}: TestResultAnswerContextType) {
  const {
    isTextQuestion,
    isTableQuestion,
    isCheckboxQuestion,
    isRadioQuestion,
  } = getQuestionTypes(type as TestQuestionType);
  let answerContent: string | (string | null)[] | null = null;

  if (isTextQuestion) answerContent = [question.correctAnswerText];
  else if (isRadioQuestion || isCheckboxQuestion) {
    const correctOptions = question.options.filter(
      (option) => option.isCorrect,
    );
    answerContent = correctOptions.map((option) => option.content);
  } else if (isTableQuestion) {
    answerContent = question.options.map((option) => option.tableColumnAnswer);
  } else answerContent = null;

  return testResultFormatAnswer(answerContent);
}
