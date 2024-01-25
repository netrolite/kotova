import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import useAddTestFormQuestionOptionContext from "@/lib/hooks/addTestForm/questionOptionContext";
import { cn } from "@/lib/shadcnUtils";
import { CheckIcon } from "lucide-react";

type Props = {};

export default function AddTestFormRadioQuestionOptionMarkAsCorrectBtn({}: Props) {
  // DO NOT use optionsFields.fields[number].content!!! For some reason it's an empty string.
  // use watch(`questions.${questionIndex}.options`) instead (like i do below)
  const { optionsFields, index: questionIndex } =
    useAddTestFormQuestionContext();
  const { watch } = useAddTestFormContext();
  const options = watch(`questions.${questionIndex}.options`);
  const { option, optionIndex } = useAddTestFormQuestionOptionContext();

  function handleMarkAnswerAsCorrect() {
    for (let i = 0, n = options.length; i < n; i++) {
      const prevOption = options[i];
      optionsFields.update(i, {
        ...prevOption,
        isCorrect: i === optionIndex ? !prevOption.isCorrect : false,
      });
    }
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
          onClick={handleMarkAnswerAsCorrect}
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
