import { TooltipProvider } from "@/components/ui/tooltip";
import { AddTestFormSavedQuestionOptionSchemaType } from "@/lib/zod/schemas/addTestForm/QuestionOption";
import AddTestFormRadioQuestionOptionMarkAsCorrectBtn from "./MarkAsCorrect";
import AddTestFormRadioQuestionOptionDeleteBtn from "./Delete";

type Props = {
  optionIndex: number;
  option: AddTestFormSavedQuestionOptionSchemaType;
};

export default function AddTestFormRadioQuestionOptionActionBtns({
  option,
  optionIndex,
}: Props) {
  return (
    <TooltipProvider>
      <AddTestFormRadioQuestionOptionMarkAsCorrectBtn
        {...{ option, optionIndex }}
      />
      <AddTestFormRadioQuestionOptionDeleteBtn {...{ optionIndex }} />
    </TooltipProvider>
  );
}
