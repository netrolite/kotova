import { TooltipProvider } from "@/components/ui/tooltip";
import AddTestFormRadioQuestionOptionMarkAsCorrectBtn from "./MarkAsCorrect";
import AddTestFormRadioQuestionOptionDeleteBtn from "./Delete";
import useAddTestFormQuestionOptionContext from "@/lib/hooks/addTestForm/questionOptionContext";

type Props = {};

export default function AddTestFormRadioQuestionOptionActionBtns({}: Props) {
  const { optionIndex } = useAddTestFormQuestionOptionContext();
  return (
    <TooltipProvider>
      <AddTestFormRadioQuestionOptionMarkAsCorrectBtn />
      <AddTestFormRadioQuestionOptionDeleteBtn {...{ optionIndex }} />
    </TooltipProvider>
  );
}
