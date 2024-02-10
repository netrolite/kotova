import FormItemField from "@/components/Form/ItemField";
import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import MyTestEditFormQuestionOptionContext from "@/lib/contexts/myTestEditForm/questionOption";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import MyTestEditFormTableQuestionOptionColumn from "./Column";
import MyTestEditFormTableQuestionOptionAnswer from "./Answer";
import MyTestEditFormTableQuestionOptionDeleteBtn from "./DeleteBtn";
import MyTestEditFormQuestionAddOptionBtn from "../AddOptionBtn";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";

type Props = {};

export default function MyTestEditFormTableQuestion({}: Props) {
  const { control } = useMyTestEditFormContext();
  const { index: questionIndex } = useMyTestEditFormQuestionContext();
  const { optionsFields } = useMyTestEditFormQuestionContext();

  return (
    <>
      <FormField
        control={control}
        name={`questions.${questionIndex}.options`}
        render={() => (
          <>
            <FormLabel htmlFor={undefined}>Столбцы и ответы</FormLabel>
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
                      <div className="flex gap-2">
                        <div className="grid w-full grid-cols-2 gap-1 md:gap-2">
                          <MyTestEditFormTableQuestionOptionColumn />
                          <MyTestEditFormTableQuestionOptionAnswer />
                        </div>
                        <MyTestEditFormTableQuestionOptionDeleteBtn />
                        <FormMessage />
                      </div>
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
        questionType={TEST_QUESTION_TYPE.TABLE}
      />
    </>
  );
}
