import FormItemField from "@/components/Form/ItemField";
import { FormLabel, FormMessage } from "@/components/ui/form";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import AddTestFormRadioQuestionOptionInput from "./Option/Input";
import AddTestFormRadioQuestionOptionActionBtns from "./Option/ActionBtns/Index";
import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import AddTestFormQuestionAddOptionBtn from "../AddOptionBtn";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";

export default function AddTestFormRadioQuestion() {
  const { optionsFields } = useAddTestFormQuestionContext();

  return (
    <>
      <FormLabel htmlFor={undefined}>Варианты ответа</FormLabel>
      <ul className="space-y-1">
        {optionsFields.fields.map((option, optionIndex) => (
          <AddTestFormQuestionOptionContext.Provider
            value={{ option, optionIndex }}
            key={option.id}
          >
            <li className="flex gap-2">
              <AddTestFormRadioQuestionOptionInput />
              <AddTestFormRadioQuestionOptionActionBtns />
            </li>
          </AddTestFormQuestionOptionContext.Provider>
        ))}
      </ul>
      <AddTestFormQuestionAddOptionBtn
        questionType={TEST_QUESTION_TYPE.RADIO}
      />
    </>
  );
}
