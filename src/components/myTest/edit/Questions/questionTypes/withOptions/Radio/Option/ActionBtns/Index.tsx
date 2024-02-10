import { TooltipProvider } from "@/components/ui/tooltip";
import MyTestEditFormRadioQuestionOptionMarkAsCorrectBtn from "./MarkAsCorrect";
import MyTestEditFormRadioQuestionOptionDeleteBtn from "./Delete";

type Props = {};

export default function MyTestEditFormRadioQuestionOptionActionBtns({}: Props) {
  return (
    <TooltipProvider>
      <MyTestEditFormRadioQuestionOptionMarkAsCorrectBtn />
      <MyTestEditFormRadioQuestionOptionDeleteBtn />
    </TooltipProvider>
  );
}
