import { TooltipProvider } from "@/components/ui/tooltip";
import AddTestFormRadioQuestionOptionMarkAsCorrectBtn from "./MarkAsCorrect";
import AddTestFormRadioQuestionOptionDeleteBtn from "./Delete";

type Props = {};

export default function AddTestFormRadioQuestionOptionActionBtns({}: Props) {
  return (
    <TooltipProvider>
      <AddTestFormRadioQuestionOptionMarkAsCorrectBtn />
      <AddTestFormRadioQuestionOptionDeleteBtn />
    </TooltipProvider>
  );
}
