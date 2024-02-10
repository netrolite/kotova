import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import useMyTestEditFormQuestionOptionContext from "@/lib/hooks/myTestEditForm/questionOptionContext";
import { TrashIcon } from "lucide-react";

type Props = {};

export default function MyTestEditFormTableQuestionOptionDeleteBtn({}: Props) {
  const { optionsFields } = useMyTestEditFormQuestionContext();
  const { optionIndex } = useMyTestEditFormQuestionOptionContext();
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
