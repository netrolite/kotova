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

export default function AddTestFormCheckboxQuestionOptionDeleteBtn({
  optionIndex,
}: Props) {
  const { optionsFields } = useAddTestFormQuestionWithOptionsContext();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => {
            console.log("option index", optionIndex);
            optionsFields.remove(optionIndex);
          }}
        >
          <TrashIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Удалить</TooltipContent>
    </Tooltip>
  );
}
