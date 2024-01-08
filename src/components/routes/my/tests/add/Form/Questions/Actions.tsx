import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { AddTestFormQuestions } from "../Index";

type Props = {
  index: number;
  questions: AddTestFormQuestions;
};

export default function AddTestFormQuestionActions({
  index,
  questions,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

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
