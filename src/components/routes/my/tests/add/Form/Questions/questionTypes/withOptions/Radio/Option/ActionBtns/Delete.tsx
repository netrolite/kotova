import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAddTestFormQuestionWithOptionsContext from "@/lib/hooks/addTestForm/questionWithOptionsContext";
import { TrashIcon } from "lucide-react";

type Props = {
  optionIndex: number;
};

export default function AddTestFormRadioQuestionOptionDeleteBtn({
  optionIndex,
}: Props) {
  const { optionsFields } = useAddTestFormQuestionWithOptionsContext();

  function handleDeleteOption() {
    console.log(`deleting option ${optionIndex}`);
    optionsFields.remove(optionIndex);
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          className="text-muted-foreground hover:text-destructive"
          onClick={handleDeleteOption}
        >
          <TrashIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Удалить</TooltipContent>
    </Tooltip>
  );
}
