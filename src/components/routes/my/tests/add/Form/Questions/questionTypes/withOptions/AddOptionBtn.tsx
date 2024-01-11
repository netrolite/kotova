import BtnWithIcon from "@/components/Btns/WithIcon";
import useAddTestFormQuestionWithOptionsContext from "@/lib/hooks/addTestForm/questionWithOptionsContext";
import { PlusIcon } from "lucide-react";

type Props = {};

export default function AddTestFormQuestionAddOptionBtn({}: Props) {
  const { optionsFields } = useAddTestFormQuestionWithOptionsContext();
  return (
    <BtnWithIcon
      type="button"
      variant="outline"
      icon={<PlusIcon />}
      onClick={() =>
        optionsFields.append({
          content: "",
          isCorrect: false,
          table: { answer: "", column: "" },
        })
      }
    >
      Добавить вариант ответа
    </BtnWithIcon>
  );
}
