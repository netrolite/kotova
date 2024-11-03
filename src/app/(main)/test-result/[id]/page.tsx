import TestResultAnswers from "@/components/testResult/Answers";
import TestResultMetadata from "@/components/testResult/Metadata/Index";
import TestResultContextProvider from "@/lib/contexts/testResult/Index/Provider";
import getTestResult from "@/lib/fetchers/testResults/getTestResults";
import { notFound } from "next/navigation";

type Context = {
  params: Promise<{ id: string }>;
};

export default async function TestResult(props: Context) {
  const params = await props.params;

  const {
    id: testResultId
  } = params;

  const testResult = await getTestResult(testResultId);
  if (!testResult) notFound();

  return (
    <TestResultContextProvider {...testResult}>
      <TestResultMetadata />
      <TestResultAnswers />
    </TestResultContextProvider>
  );
}
