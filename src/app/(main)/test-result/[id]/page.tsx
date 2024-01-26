import TestResultAnswers from "@/components/testResult/Answers";
import TestResultMetadata from "@/components/testResult/Metadata/Index";
import TestResultContextProvider from "@/lib/contexts/testResult/Index/Provider";
import getTestResult from "@/lib/fetchers/testResults/getTestResults";
import { notFound } from "next/navigation";

type Context = {
  params: { id: string };
};

export default async function TestResult({
  params: { id: testResultId },
}: Context) {
  const testResult = await getTestResult(testResultId);
  if (!testResult) notFound();

  return (
    <TestResultContextProvider {...testResult}>
      <TestResultMetadata />
      <TestResultAnswers />
    </TestResultContextProvider>
  );
}
