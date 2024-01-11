import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useAddTestFormQuestionOption from "@/lib/hooks/addTestForm/questionOptionContext";
import useAddTestFormQuestionWithOptionsContext from "@/lib/hooks/addTestForm/questionWithOptionsContext";
import { TrashIcon } from "lucide-react";

type Props = {};

export default function AddTestFormTableQuestionOptionDeleteBtn({}: Props) {
  const { optionsFields } = useAddTestFormQuestionWithOptionsContext();
  const { optionIndex } = useAddTestFormQuestionOption();
  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
}
