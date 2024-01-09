import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import AddTestFormTextQuestion from "./questionTypes/Text";
import AddTestFormRadioQuestion from "./questionTypes/Radio";
import AddTestFormCheckboxQuestion from "./questionTypes/Checkbox";
import AddTestFormTableQuestion from "./questionTypes/Table";
import { Controller, useFormContext } from "react-hook-form";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import AddTestFormQuestionContext from "@/lib/contexts/addTestForm/question";

type Props = {
  index: number;
};

export default function AddTestFormQuestion({ index }: Props) {
  const { control } = useFormContext<AddTestFormSchemaType>();
  return (
    <AddTestFormQuestionContext.Provider value={{ index }}>
      <Controller
        control={control}
        name={`questions.${index}`}
        render={({ field: { value: question } }) => {
          switch (question.type) {
            case TEST_QUESTION_TYPE.TEXT:
              return <AddTestFormTextQuestion {...question} />;
            case TEST_QUESTION_TYPE.RADIO:
              return <AddTestFormRadioQuestion {...question} />;
            case TEST_QUESTION_TYPE.CHECKBOX:
              return <AddTestFormCheckboxQuestion {...question} />;
            case TEST_QUESTION_TYPE.TABLE:
              return <AddTestFormTableQuestion {...question} />;
            default:
              return <AddTestFormTextQuestion {...question} />;
          }
        }}
      />
    </AddTestFormQuestionContext.Provider>
  );
}
