import BtnWithIcon from "@/components/Btns/WithIcon";
import getTestTypes from "@/lib/getTestTypes";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import { TestQuestionType } from "@/lib/types/enums/TestQuestionType";
import { PlusIcon } from "lucide-react";

type Props = {
  questionType: TestQuestionType;
};

export default function AddTestFormQuestionAddOptionBtn({
  questionType,
}: Props) {
  const { optionsFields } = useAddTestFormQuestionContext();

  function handleAppendOption() {
    const {
      isTextQuestion,
      isTableQuestion,
      isCheckboxQuestion,
      isRadioQuestion,
    } = getTestTypes(questionType);
    console.log(isTextQuestion);
    optionsFields.append({
      content: isTextQuestion ? "" : null,
      isCorrect: isCheckboxQuestion || isRadioQuestion ? false : null,
      tableColumn: isTableQuestion ? "" : null,
      tableColumnAnswer: isTableQuestion ? "" : null,
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
