import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import useAddTestFormQuestionOptionContext from "@/lib/hooks/addTestForm/questionOptionContext";
import { cn } from "@/lib/shadcnUtils";
import { CheckIcon } from "lucide-react";

type Props = {};

export default function AddTestFormRadioQuestionOptionMarkAsCorrectBtn({}: Props) {
  const { optionsFields } = useAddTestFormQuestionContext();
  const { option, optionIndex } = useAddTestFormQuestionOptionContext();

  function handleMarkAnswerAsCorrect(indexToUpdate: number) {
    optionsFields.fields.forEach((option, i) => {
      optionsFields.update(i, {
        ...option,
        isCorrect: i === indexToUpdate ? !option.isCorrect : false,
      });
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          className={cn(
            "border-2 border-transparent text-muted-foreground duration-0 hover:text-green-600",
            option.isCorrect && "border-green-600 text-green-600",
          )}
          onClick={() => handleMarkAnswerAsCorrect(optionIndex)}
        >
          <CheckIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {option.isCorrect
          ? "Убрать отметку правильного ответа"
          : "Отметить как правильный ответ"}
      </TooltipContent>
    </Tooltip>
  );
}
