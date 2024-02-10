import { TooltipProvider } from "@/components/ui/tooltip";
import MyTestEditFormCheckboxQuestionOptionMarkAsCorrectBtn from "./MarkAsCorrect";
import MyTestEditFormCheckboxQuestionOptionDeleteBtn from "./Delete";

export default function MyTestEditFormCheckboxQuestionOptionActionBtns() {
  return (
    <TooltipProvider>
      <MyTestEditFormCheckboxQuestionOptionMarkAsCorrectBtn />
      <MyTestEditFormCheckboxQuestionOptionDeleteBtn />
    </TooltipProvider>
  );
}
