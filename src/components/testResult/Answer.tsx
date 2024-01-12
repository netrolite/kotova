import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import TestResultTextAnswer from "./answersTypes/Text";
import getTestResult from "@/lib/fetchers/testResults/getTestResults";
import { notFound } from "next/navigation";

type Props = {
  testResultId: string;
  answerId: number;
};

export default async function TestResultAnswer({
  testResultId,
  answerId,
}: Props) {
  const testResult = await getTestResult(testResultId);
  if (!testResult) notFound();

  switch (testResult.answers[answerId].type) {
    case TEST_QUESTION_TYPE.TEXT:
      return <TestResultTextAnswer />;
    default:
      return <TestResultTextAnswer />;
  }
}
