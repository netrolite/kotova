"use client";
import KeyValue from "@/components/KeyValue";
import formatTestScore from "@/lib/formatTestScore";
import useTestResultContext from "@/lib/hooks/testResult/context";

export default function TestResultMetadataScore() {
  const testResult = useTestResultContext();
  return (
    <KeyValue label="Баллы" childrenContainerClassName="text-xl">
      {formatTestScore(testResult.score)}
    </KeyValue>
  );
}
