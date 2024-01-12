import FormItemField from "@/components/Form/ItemField";
import { FormLabel, FormMessage } from "@/components/ui/form";
import AddTestFormQuestionOptionContext from "@/lib/contexts/addTestForm/questionOption";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import AddTestFormTableQuestionOptionColumn from "./Column";
import AddTestFormTableQuestionOptionAnswer from "./Answer";
import AddTestFormTableQuestionOptionDeleteBtn from "./DeleteBtn";
import AddTestFormQuestionAddOptionBtn from "../AddOptionBtn";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";

type Props = {};

export default function AddTestFormTableQuestion({}: Props) {
  const { control } = useAddTestFormContext();
  const { index } = useAddTestFormQuestionContext();
  const { optionsFields } = useAddTestFormQuestionContext();

  return (
    <>
      <FormLabel htmlFor={undefined}>Столбцы и ответы</FormLabel>
      <FormItemField
        control={control}
        name={`questions.${index}.options`}
        render={() => (
          <>
            <ul className="space-y-1">
              {optionsFields.fields.map((option, i) => (
                <AddTestFormQuestionOptionContext.Provider
                  value={{ option, optionIndex: i }}
                  key={option.id}
                >
                  <div className="flex gap-2">
                    <div className="grid w-full grid-cols-2 gap-1 md:gap-2">
                      <AddTestFormTableQuestionOptionColumn />
                      <AddTestFormTableQuestionOptionAnswer />
                    </div>
                    <AddTestFormTableQuestionOptionDeleteBtn />
                  </div>
                </AddTestFormQuestionOptionContext.Provider>
              ))}
            </ul>
            <FormMessage />
          </>
        )}
      />
      <AddTestFormQuestionAddOptionBtn
        questionType={TEST_QUESTION_TYPE.TABLE}
      />
    </>
  );
}
