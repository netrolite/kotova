import { TooltipProvider } from "@/components/ui/tooltip";
import AddTestFormCheckboxQuestionOptionMarkAsCorrectBtn from "./MarkAsCorrect";
import AddTestFormCheckboxQuestionOptionDeleteBtn from "./Delete";
import useAddTestFormQuestionOption from "@/lib/hooks/addTestForm/questionOption";

type Props = {};

export default function AddTestFormCheckboxQuestionOptionActionBtns({}: Props) {
  const { option, optionIndex } = useAddTestFormQuestionOption();
  return (
    <TooltipProvider>
      <AddTestFormCheckboxQuestionOptionMarkAsCorrectBtn
        {...{ option, optionIndex }}
      />
      <AddTestFormCheckboxQuestionOptionDeleteBtn {...{ optionIndex }} />
    </TooltipProvider>
  );
}
