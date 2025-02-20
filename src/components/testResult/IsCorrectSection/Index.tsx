import TestResultAnswerIsCorrectSectionBadge from "./Badge";
import testResultGetCorrectAnswers from "@/lib/testResult/getCorrectAnswers";
import useTestResultAnswerContext from "@/lib/hooks/testResult/answerContext";
import testResultGetAnswers from "@/lib/testResult/getAnswers";
import { cn } from "@/lib/shadcnUtils";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import useTestResultContext from "@/lib/hooks/testResult/context";

type Props = {};

export default function TestResultAnswerIsCorrectSection({}: Props) {
  const testResult = useTestResultContext();
  const answerData = useTestResultAnswerContext();
  const answers = testResultGetAnswers(answerData);
  const correctAnswers = testResultGetCorrectAnswers(answerData);
  const isRadioOrCheckBoxQuestion =
    answerData.type === TEST_QUESTION_TYPE.RADIO ||
    answerData.type === TEST_QUESTION_TYPE.CHECKBOX;

  return (
    <div>
      <TestResultAnswerIsCorrectSectionBadge />
      <div className="flex flex-col">
        <span className="whitespace-nowrap text-muted-foreground">
          {testResult.userId === testResult.signedInUser?.id
            ? "Ваш ответ:"
            : "Ответ пользователя:"}
        </span>
        <div className="font-semibold">
          {!!answers?.length && (
            <ul
              className={cn(
                "flex flex-wrap gap-2",
                isRadioOrCheckBoxQuestion ? "flex-col" : "",
              )}
            >
              {answers.map((answer, i, arr) => {
                const isLast = arr.length - 1 === i;
                return (
                  <li key={i}>
                    {answer}
                    {!isLast && ","}
                  </li>
                );
              })}
            </ul>
          )}
          {!answers?.length && <p>Нет данных</p>}
        </div>
      </div>
      {!answerData.isCorrect && (
        <div className="mt-2 flex flex-col">
          <span className="whitespace-nowrap text-muted-foreground">
            Правильный ответ:
          </span>
          <div className="font-semibold">
            {!!correctAnswers?.length && (
              <ul
                className={cn(
                  "flex flex-wrap gap-2",
                  isRadioOrCheckBoxQuestion ? "flex-col" : "",
                )}
              >
                {correctAnswers.map((answer, i, arr) => {
                  const isLast = arr.length - 1 === i;
                  return (
                    <li key={i}>
                      {answer}
                      {!isLast && ","}
                    </li>
                  );
                })}
              </ul>
            )}
            {!correctAnswers?.length && <p>Нет данных</p>}
          </div>
        </div>
      )}
    </div>
  );
}
