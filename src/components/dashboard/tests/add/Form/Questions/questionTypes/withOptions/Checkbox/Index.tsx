import { FormLabel, FormMessage } from "@/components/ui/form";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import AddTestFormQuestionAddOptionBtn from "../AddOptionBtn";
import AddTestFormCheckboxQuestionOptionActionBtns from "./Option/ActionBtns/Index";
import AddTestFormCheckboxQuestionOptionInput from "./Option/Input";
import FormItemField from "@/components/Form/ItemField";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";

export default function AddTestFormRadioQuestion() {
  const { index } = useAddTestFormQuestionContext();
  const { control } = useAddTestFormContext();
  const { optionsFields } = useAddTestFormQuestionContext();

  return (
    <>
      <FormLabel htmlFor={undefined}>Варианты ответа</FormLabel>
      <FormItemField
        control={control}
        name={`questions.${index}.options`}
        render={({ field }) => (
          <>
            <ul className="space-y-1">
              {field.value.map((option, i) => (
                <AddTestFormQuestionOptionContext.Provider
                  value={{ option, optionIndex: i }}
                  key={i}
                >
                  <li className="flex gap-2">
                    <AddTestFormCheckboxQuestionOptionInput />
                    <AddTestFormCheckboxQuestionOptionActionBtns />
                  </li>
                </AddTestFormQuestionOptionContext.Provider>
              ))}
            </ul>
            <FormMessage />
          </>
        )}
      />
      <AddTestFormQuestionAddOptionBtn
        questionType={TEST_QUESTION_TYPE.CHECKBOX}
      />
    </>
  );
}
