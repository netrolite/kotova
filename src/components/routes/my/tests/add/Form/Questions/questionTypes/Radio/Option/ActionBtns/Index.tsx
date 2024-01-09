import { TooltipProvider } from "@/components/ui/tooltip";
import AddTestFormRadioQuestionOptionMarkAsCorrectBtn from "./MarkAsCorrect";
import AddTestFormRadioQuestionOptionDeleteBtn from "./Delete";
import useAddTestFormQuestionOption from "@/lib/hooks/addTestForm/questionOption";

type Props = {};

export default function AddTestFormRadioQuestionOptionActionBtns({}: Props) {
  const { optionIndex } = useAddTestFormQuestionOption();
  return (
    <TooltipProvider>
      <AddTestFormRadioQuestionOptionMarkAsCorrectBtn />
      <AddTestFormRadioQuestionOptionDeleteBtn {...{ optionIndex }} />
    </TooltipProvider>
  );
}
