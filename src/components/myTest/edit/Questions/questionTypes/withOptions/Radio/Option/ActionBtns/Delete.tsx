import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import useMyTestEditFormQuestionOptionContext from "@/lib/hooks/myTestEditForm/questionOptionContext";
import { TrashIcon } from "lucide-react";

export default function MyTestEditFormRadioQuestionOptionDeleteBtn() {
  const { optionsFields } = useMyTestEditFormQuestionContext();
  const { optionIndex } = useMyTestEditFormQuestionOptionContext();

  function handleDeleteOption() {
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
