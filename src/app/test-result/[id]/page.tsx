import PageTitle from "@/components/PageTitle";
import TestResultAnswers from "@/components/testResult/Answers";
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
      <PageTitle className="mb-8">
        Результаты теста {testResult?.test?.name}
      </PageTitle>
      <TestResultAnswers />
    </TestResultContextProvider>
  );
}
