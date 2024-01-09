import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddTestFormQuestionContext from "@/lib/contexts/addTestForm/question";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useContextVal from "@/lib/hooks/contextVal";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

export default function AddTestFormQuestionActions() {
  const [isOpen, setIsOpen] = useState(false);
  const { index } = useContextVal(AddTestFormQuestionContext);
  const { questionsFields: questions } = useAddTestFormContext();

  function handleDeleteQuestion() {
    console.log(index);
    questions.remove(index);
    setIsOpen(false);
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <MoreVerticalIcon className="text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel asChild>
          <Button
            onClick={handleDeleteQuestion}
            className="flex w-full justify-start gap-2"
            variant="ghost"
          >
            <TrashIcon width={20} />
            Удалить вопрос
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
