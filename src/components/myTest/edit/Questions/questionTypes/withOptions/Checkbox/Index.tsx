import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import MyTestEditFormQuestionOptionContext from "@/lib/contexts/myTestEditForm/questionOption";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import MyTestEditFormQuestionAddOptionBtn from "../AddOptionBtn";
import MyTestEditFormCheckboxQuestionOptionActionBtns from "./Option/ActionBtns/Index";
import MyTestEditFormCheckboxQuestionOptionInput from "./Option/Input";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";

export default function MyTestEditFormRadioQuestion() {
  const { optionsFields, index: questionIndex } =
    useMyTestEditFormQuestionContext();
  const { control } = useMyTestEditFormContext();

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
                <MyTestEditFormQuestionOptionContext.Provider
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
                            <MyTestEditFormCheckboxQuestionOptionInput />
                            <MyTestEditFormCheckboxQuestionOptionActionBtns />
                          </div>
                          <FormMessage />
                        </li>
                      </>
                    )}
                  />
                </MyTestEditFormQuestionOptionContext.Provider>
              ))}
            </ul>
            <FormMessage />
          </>
        )}
      />
      <MyTestEditFormQuestionAddOptionBtn
        questionType={TEST_QUESTION_TYPE.CHECKBOX}
      />
    </>
  );
}
