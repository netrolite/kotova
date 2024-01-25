import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import AddTestFormQuestionAddOptionBtn from "../AddOptionBtn";
import AddTestFormCheckboxQuestionOptionActionBtns from "./Option/ActionBtns/Index";
import AddTestFormCheckboxQuestionOptionInput from "./Option/Input";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";

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
                <AddTestFormQuestionOptionContext.Provider
                  value={{ option, optionIndex }}
                  key={option.id}
                >
                  <FormField
                    control={control}
                    name={`questions.${questionIndex}.options.${optionIndex}`}
                    render={() => (
                      <>
                        <li>
                          <div className="flex gap-2">
                            <AddTestFormCheckboxQuestionOptionInput />
                            <AddTestFormCheckboxQuestionOptionActionBtns />
                          </div>
                          <FormMessage />
                        </li>
                      </>
                    )}
                  />
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
