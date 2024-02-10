import BtnWithIcon from "@/components/Btns/WithIcon";
import getQuestionTypes from "@/lib/getQuestionTypes";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import { TestQuestionType } from "@/lib/types/enums/TestQuestionType";
import { PlusIcon } from "lucide-react";

type Props = {
  questionType: TestQuestionType;
};

export default function MyTestEditFormQuestionAddOptionBtn({
  questionType,
}: Props) {
  const { optionsFields } = useMyTestEditFormQuestionContext();

  function handleAppendOption() {
    const {
      isTextQuestion,
      isTableQuestion,
      isCheckboxQuestion,
      isRadioQuestion,
    } = getQuestionTypes(questionType);
    optionsFields.append({
      content: !isTableQuestion ? "" : null,
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
