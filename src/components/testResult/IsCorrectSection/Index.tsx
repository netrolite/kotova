import TestResultAnswerIsCorrectSectionBadge from "./Badge";
import testResultGetAnswerContent from "@/lib/testResult/getAnswer";
import testResultGetCorrectAnswer from "@/lib/testResult/getCorrectAnswer";
import useTestResultAnswerContext from "@/lib/hooks/testResult/answerContext";

type Props = {};

export default function TestResultAnswerIsCorrectSection({}: Props) {
  const answerData = useTestResultAnswerContext();
  const answer = testResultGetAnswerContent(answerData);

  const correctAnswer = testResultGetCorrectAnswer(answerData);

  return (
    <>
      <TestResultAnswerIsCorrectSectionBadge />
      <div className="flex gap-2">
        <span className="text-muted-foreground">Ваш ответ:</span>
        <span className="font-semibold">{answer}</span>
      </div>
      {!answerData.isCorrect && (
        <div className="flex gap-2">
          <span className="text-muted-foreground">Правильный ответ:</span>
          <span className="font-semibold">{correctAnswer}</span>
        </div>
      )}
    </>
  );
}
