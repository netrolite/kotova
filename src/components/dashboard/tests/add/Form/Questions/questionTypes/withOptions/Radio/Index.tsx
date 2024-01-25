import FormItemField from "@/components/Form/ItemField";
import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import AddTestFormRadioQuestionOptionInput from "./Option/Input";
import AddTestFormRadioQuestionOptionActionBtns from "./Option/ActionBtns/Index";
import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import AddTestFormQuestionAddOptionBtn from "../AddOptionBtn";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";

export default function AddTestFormRadioQuestion() {
  const { optionsFields, index: questionIndex } =
    useAddTestFormQuestionContext();
  const { control } = useAddTestFormContext();

  return (
    <>
      <FormField
        control={control}
        name={`questions.${questionIndex}.options`}
        render={() => (
          <>
            <FormLabel htmlFor={undefined}>Варианты ответа</FormLabel>
            <ul className="space-y-1">
              {optionsFields.fields.map((option, optionIndex) => (
                <FormField
                  control={control}
                  name={`questions.${questionIndex}.options.${optionIndex}`}
                  render={() => (
                    <AddTestFormQuestionOptionContext.Provider
                      value={{ option, optionIndex }}
                      key={option.id}
                    >
                      <li>
                        <div className="flex gap-2">
                          <AddTestFormRadioQuestionOptionInput />
                          <AddTestFormRadioQuestionOptionActionBtns />
                        </div>
                        <FormMessage />
                      </li>
                    </AddTestFormQuestionOptionContext.Provider>
                  )}
                />
              ))}
            </ul>
            <FormMessage />
          </>
        )}
      />
      <AddTestFormQuestionAddOptionBtn
        questionType={TEST_QUESTION_TYPE.RADIO}
      />
    </>
  );
}
