import { Button } from "@/components/ui/button";
import useTestResultAnswerContext from "@/lib/hooks/testResult/answerContext";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

export default function TestResultAnswerExplanation() {
  const {
    question: { explanation },
  } = useTestResultAnswerContext();
  const [height, setHeight] = useState<"auto" | number>(0);

  if (!explanation) return null;
  return (
    <div className="space-y-2">
      <AnimateHeight {...{ height }} duration={300}>
        <p className="text-lg font-semibold">Объяснение</p>
        <p className="whitespace-pre-line">{explanation}</p>
      </AnimateHeight>

      <Button
        variant="outline"
        onClick={() => setHeight((h) => (h === 0 ? "auto" : 0))}
      >
        {height ? "Скрыть объяснение" : "Показать объяснение"}
      </Button>
    </div>
  );
}
