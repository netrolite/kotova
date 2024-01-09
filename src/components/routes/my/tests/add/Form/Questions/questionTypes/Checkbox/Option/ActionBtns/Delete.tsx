import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAddTestFormRadioQuestionContext from "@/lib/hooks/addTestForm/radioQuestionContext";
import { TrashIcon } from "lucide-react";

type Props = {
  optionIndex: number;
};

export default function AddTestFormCheckboxQuestionOptionDeleteBtn({
  optionIndex,
}: Props) {
  const { optionsFields } = useAddTestFormRadioQuestionContext();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => optionsFields.remove(optionIndex)}
        >
          <TrashIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Удалить</TooltipContent>
    </Tooltip>
  );
}
