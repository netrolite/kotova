import { Badge } from "@/components/ui/badge";
import useTestResultAnswerContext from "@/lib/hooks/testResult/answerContext";
import { cn } from "@/lib/shadcnUtils";

type Props = {};

export default function TestResultAnswerIsCorrectSectionBadge({}: Props) {
  const { isCorrect } = useTestResultAnswerContext();
  return (
    <Badge
      className={cn("mb-1", isCorrect ? "bg-green-600" : "bg-destructive")}
    >
      {isCorrect ? "Правильно" : "Неправильно"}
    </Badge>
  );
}
