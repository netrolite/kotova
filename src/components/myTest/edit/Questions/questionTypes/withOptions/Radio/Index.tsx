import FormItemField from "@/components/Form/ItemField";
import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import MyTestEditFormRadioQuestionOptionInput from "./Option/Input";
import MyTestEditFormRadioQuestionOptionActionBtns from "./Option/ActionBtns/Index";
import MyTestEditFormQuestionOptionContext from "@/lib/contexts/myTestEditForm/questionOption";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import MyTestEditFormQuestionAddOptionBtn from "../AddOptionBtn";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";

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
                <FormField
                  key={option.id}
                  control={control}
                  name={`questions.${questionIndex}.options.${optionIndex}`}
                  render={() => (
                    <MyTestEditFormQuestionOptionContext.Provider
                      value={{ option, optionIndex }}
                    >
                      <li>
                        <div className="flex gap-2">
                          <MyTestEditFormRadioQuestionOptionInput />
                          <MyTestEditFormRadioQuestionOptionActionBtns />
                        </div>
                        <FormMessage />
                      </li>
                    </MyTestEditFormQuestionOptionContext.Provider>
                  )}
                />
              ))}
            </ul>
            <FormMessage />
          </>
        )}
      />
      <MyTestEditFormQuestionAddOptionBtn
        questionType={TEST_QUESTION_TYPE.RADIO}
      />
    </>
  );
}
