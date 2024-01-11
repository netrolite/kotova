import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import AddTestFormTextQuestion from "./questionTypes/Text";
import { Controller, useFormContext } from "react-hook-form";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import AddTestFormRadioQuestion from "./questionTypes/withOptions/Radio/Index";
import AddTestFormCheckboxQuestion from "./questionTypes/withOptions/Checkbox/Index";
import AddTestFormTableQuestion from "./questionTypes/withOptions/Table/Index";

type Props = {};

export default function AddTestFormQuestion({}: Props) {
  const { control } = useFormContext<AddTestFormSchemaType>();
  const { index } = useAddTestFormQuestionContext();

  return (
    <div className="space-y-2">
      <Controller
        control={control}
        name={`questions.${index}`}
        render={({ field: { value: question } }) => {
          switch (question.type) {
            case TEST_QUESTION_TYPE.TEXT:
              return <AddTestFormTextQuestion />;
            case TEST_QUESTION_TYPE.RADIO:
              return <AddTestFormRadioQuestion />;
            case TEST_QUESTION_TYPE.CHECKBOX:
              return <AddTestFormCheckboxQuestion />;
            case TEST_QUESTION_TYPE.TABLE:
              return <AddTestFormTableQuestion />;
            default:
              return <AddTestFormTextQuestion />;
          }
        }}
      />
    </div>
  );
}
