import BtnWithIcon from "@/components/Btns/WithIcon";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import {
  TEST_QUESTION_TYPE,
  TestQuestionType,
} from "@/lib/types/enums/TestQuestionType";
import { PlusIcon } from "lucide-react";

type Props = {
  questionType: TestQuestionType;
};

export default function AddTestFormQuestionAddOptionBtn({
  questionType,
}: Props) {
  const { optionsFields } = useAddTestFormQuestionContext();

  function handleAppendOption() {
    const isTextQuestion = questionType === TEST_QUESTION_TYPE.TEXT;
    console.log(isTextQuestion);
    optionsFields.append({
      content: isTextQuestion ? null : "",
      isCorrect: false,
      tableColumn: null,
      tableColumnAnswer: null,
    });
  }
  return (
    <BtnWithIcon
      type="button"
      variant="outline"
      icon={<PlusIcon />}
      onClick={handleAppendOption}
    >
      Добавить вариант ответа
    </BtnWithIcon>
  );
}
