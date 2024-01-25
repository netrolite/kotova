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
        <span className="text-muted-foreground">Ваш ответ:</span>
        <div className="font-semibold">
          {!answers && <p>Нет данных</p>}
          {answers && (
            <ul className="flex font-semibold">
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
        </div>
      </div>
      {!answerData.isCorrect && (
        <div className="flex gap-2">
          <span className="text-muted-foreground">Правильный ответ:</span>
          {!correctAnswers && <p>Нет данных</p>}
          {correctAnswers && (
            <ul className="font-semibold">
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
        </div>
      )}
    </div>
  );
}
