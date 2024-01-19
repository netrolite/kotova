"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TestResultAnswer from "./Answer";
import { Separator } from "@/components/ui/separator";
import TestResultAnswerIsCorrectSection from "./IsCorrectSection/Index";
import useTestResultContext from "@/lib/hooks/testResult/context";
import { TestResultAnswerContext } from "@/lib/contexts/testResult/Answer";
import TestResultAnswerExplanation from "./Explanation/Index";

type Props = {};

export default function TestResultAnswers({}: Props) {
  const testResult = useTestResultContext();
  return (
    <ul className="space-y-4">
      {testResult.answers?.map((answer) => {
        return (
          <li key={answer.id}>
            <TestResultAnswerContext.Provider value={answer}>
              <Card className="space-y-6">
                <CardHeader className="pb-0">
                  <CardTitle>{answer.question.question}</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="space-y-3">
                  <div>
                    <TestResultAnswer />
                    <TestResultAnswerIsCorrectSection />
                  </div>
                  <TestResultAnswerExplanation />
                </CardContent>
              </Card>
            </TestResultAnswerContext.Provider>
          </li>
        );
      })}
    </ul>
  );
}
