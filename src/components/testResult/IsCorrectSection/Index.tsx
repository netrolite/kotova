"use client";

import getQuestionTypes from "@/lib/getQuestionTypes";
import useTestResultAnswerContext from "@/lib/hooks/testResult/answerContext";
import { TestQuestionType } from "@/lib/types/enums/TestQuestionType";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/shadcnUtils";
import TestResultAnswerIsCorrectSectionBadge from "./Badge";
import { TestResultAnswerContextType } from "@/lib/contexts/testResult";

type Props = {};

export default function TestResultAnswerIsCorrectSection({}: Props) {
  const answerContext = useTestResultAnswerContext();

  const answer = getAnswer(answerContext);
  const formattedAnswer = formatAnswer(answer);

  const correctAnswer = getCorrectAnswer(answerContext);
  const correctFormattedAnswer = formatAnswer(correctAnswer);

  return (
    <>
      <TestResultAnswerIsCorrectSectionBadge />
      <div className="flex gap-2">
        <span className="text-muted-foreground">Ваш ответ:</span>
        <span className="font-semibold">{formattedAnswer}</span>
      </div>
      {!answerContext.isCorrect && (
        <div className="flex gap-2">
          <span className="text-muted-foreground">Правильный ответ:</span>
          <span className="font-semibold">{correctFormattedAnswer}</span>
        </div>
      )}
    </>
  );
}

function getAnswer({
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

  if (isTextQuestion) return [textAnswer];
  else if (isCheckboxQuestion || isRadioQuestion) {
    const checkedOptions = options.filter((option) => option.isChecked);
    console.log(checkedOptions);
    return checkedOptions.map(
      (checkedOption, i) =>
        question.options.find((option) => option.id === checkedOption.id)
          ?.content || null,
    );
  } else if (isTableQuestion) {
    return options.map((option) => option.tableAnswer);
  } else return null;
}

function getCorrectAnswer({
  id,
  isCorrect,
  options,
  question,
  textAnswer,
  type,
}: TestResultAnswerContextType) {
  const {
    isTextQuestion,
    isTableQuestion,
    isCheckboxQuestion,
    isRadioQuestion,
  } = getQuestionTypes(type as TestQuestionType);
  if (isTextQuestion) return [question.correctAnswerText];
  else if (isRadioQuestion || isCheckboxQuestion) {
    const correctOptions = question.options.filter(
      (option) => option.isCorrect,
    );
    return correctOptions.map((option) => option.content);
  } else if (isTableQuestion) {
    return question.options.map((option) => option.tableColumnAnswer);
  } else return null;
}

function formatAnswer(answer: (string | null)[] | null) {
  if (!answer) return "Нет данных";
  else {
    const answerNoNulls = answer.filter(
      (answer) => answer !== null,
    ) as string[];
    return answerNoNulls.join(", ");
  }
}
