import getTestResult from "@/lib/fetchers/testResults/getTestResults";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TestResultAnswerContextProvider from "@/lib/contexts/testResult/provider";
import TestResultAnswer from "./Answer";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import TestResultAnswerIsCorrectSection from "./IsCorrectSection/Index";

type Props = {
  testResultId: string;
};

export default async function TestResultAnswers({ testResultId }: Props) {
  const testResult = await getTestResult(testResultId);
  if (!testResult) notFound();

  return (
    <ul className="space-y-4">
      {testResult.answers.map((answer, i) => (
        <li key={answer.id}>
          <TestResultAnswerContextProvider answer={answer}>
            <Card className="space-y-6">
              <CardHeader className="pb-0">
                <CardTitle>{answer.question.question}</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent>
                <TestResultAnswer {...{ testResultId, answerId: i }} />
                <TestResultAnswerIsCorrectSection />
              </CardContent>
            </Card>
          </TestResultAnswerContextProvider>
        </li>
      ))}
    </ul>
  );
}
