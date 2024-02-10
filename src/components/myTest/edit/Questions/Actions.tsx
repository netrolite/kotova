import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

export default function MyTestEditFormQuestionActions() {
  const [isOpen, setIsOpen] = useState(false);
  const { index } = useMyTestEditFormQuestionContext();
  const { questionsFields } = useMyTestEditFormContext();

  function handleDeleteQuestion() {
    questionsFields.remove(index);
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
