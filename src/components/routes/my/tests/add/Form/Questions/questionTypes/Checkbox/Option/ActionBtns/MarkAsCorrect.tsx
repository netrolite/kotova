import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAddTestFormRadioQuestionContext from "@/lib/hooks/addTestForm/radioQuestionContext";
import { cn } from "@/lib/shadcnUtils";
import { AddTestFormSavedQuestionOptionSchemaType } from "@/lib/zod/schemas/addTestForm/QuestionOption";
import { CheckIcon } from "lucide-react";

type Props = {
  option: AddTestFormSavedQuestionOptionSchemaType;
  optionIndex: number;
};

export default function AddTestFormCheckboxQuestionOptionMarkAsCorrectBtn({
  option,
  optionIndex,
}: Props) {
  const { optionsFields } = useAddTestFormRadioQuestionContext();

  function handleMarkAnswerAsCorrect(indexToUpdate: number) {
    optionsFields.update(indexToUpdate, {
      ...option,
      isCorrect: !option.isCorrect,
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
