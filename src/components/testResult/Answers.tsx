"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "@/components/ui/separator";
import TestResultAnswerIsCorrectSection from "./IsCorrectSection/Index";
import useTestResultContext from "@/lib/hooks/testResult/context";
import { TestResultAnswerContext } from "@/lib/contexts/testResult/Answer";
import TestResultAnswerExplanation from "./Explanation";

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
                  <h3 className="whitespace-pre-line text-lg font-semibold">{answer.question.question}</h3>
                </CardHeader>
                <Separator />
                <CardContent className="space-y-3">
                  <TestResultAnswerIsCorrectSection />
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
