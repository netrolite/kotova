import TestResultAnswerIsCorrectSectionBadge from "./Badge";
import testResultGetCorrectAnswers from "@/lib/testResult/getCorrectAnswers";
import useTestResultAnswerContext from "@/lib/hooks/testResult/answerContext";
import testResultGetAnswers from "@/lib/testResult/getAnswers";

type Props = {};

export default function TestResultAnswerIsCorrectSection({}: Props) {
  const answerData = useTestResultAnswerContext();
  const answers = testResultGetAnswers(answerData);
  const correctAnswers = testResultGetCorrectAnswers(answerData);

  return (
    <div>
      <TestResultAnswerIsCorrectSectionBadge />
      <div className="flex gap-2">
        <span className="whitespace-nowrap text-muted-foreground">
          Ваш ответ:
        </span>
        <div className="font-semibold">
          {!!answers?.length && (
            <ul className="flex flex-wrap gap-x-2">
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
        <div className="flex gap-2">
          <span className="whitespace-nowrap text-muted-foreground">
            Правильный ответ:
          </span>
          <div className="font-semibold">
            {!!correctAnswers?.length && (
              <ul className="flex flex-wrap gap-x-2">
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
