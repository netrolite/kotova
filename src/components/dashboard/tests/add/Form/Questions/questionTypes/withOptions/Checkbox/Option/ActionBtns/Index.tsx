import { TooltipProvider } from "@/components/ui/tooltip";
import AddTestFormCheckboxQuestionOptionMarkAsCorrectBtn from "./MarkAsCorrect";
import AddTestFormCheckboxQuestionOptionDeleteBtn from "./Delete";
import useAddTestFormQuestionOptionContext from "@/lib/hooks/addTestForm/questionOptionContext";

type Props = {};

export default function AddTestFormCheckboxQuestionOptionActionBtns({}: Props) {
  const { option, optionIndex } = useAddTestFormQuestionOptionContext();
  return (
    <TooltipProvider>
      <AddTestFormCheckboxQuestionOptionMarkAsCorrectBtn
        {...{ option, optionIndex }}
      />
      <AddTestFormCheckboxQuestionOptionDeleteBtn {...{ optionIndex }} />
    </TooltipProvider>
  );
}
