import DynamicHeight from "@/components/DynamicHeight";
import { Button } from "@/components/ui/button";
import useTestResultAnswerContext from "@/lib/hooks/testResult/answerContext";
import { useState } from "react";

type Props = {};

export default function TestResultAnswerExplanation({}: Props) {
  const {
    question: { explanation },
  } = useTestResultAnswerContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <DynamicHeight {...{ isOpen }}>
        <p className="text-lg font-semibold">Объяснение</p>
        <p>{explanation}</p>
      </DynamicHeight>

      <Button variant="outline" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "Скрыть объяснение" : "Показать объяснение"}
      </Button>
    </div>
  );
}
