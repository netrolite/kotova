import getTestResult from "@/lib/fetchers/testResults/getTestResults";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TestResultAnswerContextProvider from "@/lib/contexts/testResult/provider";
import TestResultAnswer from "./Answer";
import { notFound } from "next/navigation";

type Props = {
  testResultId: string;
};

export default async function TestResultAnswers({ testResultId }: Props) {
  const testResult = await getTestResult(testResultId);
  if (!testResult) notFound();

  return (
    <ul>
      {testResult.answers.map((answer, i) => (
        <li key={answer.id}>
          <TestResultAnswerContextProvider answer={answer}>
            <Card>
              <CardHeader>
                <CardTitle>{answer.question.question}</CardTitle>
              </CardHeader>
            </Card>
            <CardContent>
              <TestResultAnswer {...{ testResultId, answerId: i }} />
            </CardContent>
          </TestResultAnswerContextProvider>
        </li>
      ))}
    </ul>
  );
}
