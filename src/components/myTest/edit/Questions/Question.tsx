import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import MyTestEditFormTextQuestion from "./questionTypes/Text";
import { useFormContext } from "react-hook-form";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import MyTestEditFormRadioQuestion from "./questionTypes/withOptions/Radio/Index";
import MyTestEditFormCheckboxQuestion from "./questionTypes/withOptions/Checkbox/Index";
import MyTestEditFormTableQuestion from "./questionTypes/withOptions/Table/Index";
import { MyTestEditFormSchemaType } from "@/lib/zod/schemas/myTestEditForm/Index";

type Props = {};

export default function MyTestEditFormQuestion({}: Props) {
  const { control, watch } = useFormContext<MyTestEditFormSchemaType>();
  const { index: questionIndex } = useMyTestEditFormQuestionContext();
  const question = watch(`questions.${questionIndex}`);

  return (
    <div className="space-y-2">
      {(() => {
        switch (question.type) {
          case TEST_QUESTION_TYPE.TEXT:
            return <MyTestEditFormTextQuestion />;
          case TEST_QUESTION_TYPE.RADIO:
            return <MyTestEditFormRadioQuestion />;
          case TEST_QUESTION_TYPE.CHECKBOX:
            return <MyTestEditFormCheckboxQuestion />;
          case TEST_QUESTION_TYPE.TABLE:
            return <MyTestEditFormTableQuestion />;
          default:
            return <MyTestEditFormTextQuestion />;
        }
      })()}
    </div>
  );
}
