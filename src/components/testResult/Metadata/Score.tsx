"use client";
import KeyValue from "@/components/KeyValue";
import useTestResultContext from "@/lib/hooks/testResult/context";
import roundTestScore from "@/lib/roundTestScore";

export default function TestResultMetadataScore() {
  const testResult = useTestResultContext();
  const correctAnswers = testResult.answers.filter(answer => answer.isCorrect).length
  const totalAnswers = testResult.answers.length

  return (
    <>
      <KeyValue
        label="Правильно выполнено"
        childrenContainerClassName="whitespace-nowrap"
      >
        {correctAnswers} из {totalAnswers} ({roundTestScore(testResult.score)}%)
      </KeyValue>
    </>
  );
}
