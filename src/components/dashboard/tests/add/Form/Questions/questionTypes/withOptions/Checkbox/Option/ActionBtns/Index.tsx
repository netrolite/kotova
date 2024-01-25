import { TooltipProvider } from "@/components/ui/tooltip";
import AddTestFormCheckboxQuestionOptionMarkAsCorrectBtn from "./MarkAsCorrect";
import AddTestFormCheckboxQuestionOptionDeleteBtn from "./Delete";

export default function AddTestFormCheckboxQuestionOptionActionBtns() {
  return (
    <TooltipProvider>
      <AddTestFormCheckboxQuestionOptionMarkAsCorrectBtn />
      <AddTestFormCheckboxQuestionOptionDeleteBtn />
    </TooltipProvider>
  );
}
