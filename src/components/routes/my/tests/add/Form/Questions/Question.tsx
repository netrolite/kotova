import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";
import { AddTestFormSavedQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";
import AddTestFormTextQuestion from "./questionTypes/Text";
import AddTestFormRadioQuestion from "./questionTypes/Radio";
import AddTestFormCheckboxQuestion from "./questionTypes/Checkbox";
import AddTestFormTableQuestion from "./questionTypes/Table";

type Props = AddTestFormSavedQuestionSchemaType;

export default function AddTestFormQuestion(props: Props) {
  switch (props.type) {
    case TEST_QUESTION_TYPE.TEXT:
      return <AddTestFormTextQuestion {...props} />;
    case TEST_QUESTION_TYPE.RADIO:
      return <AddTestFormRadioQuestion {...props} />;
    case TEST_QUESTION_TYPE.CHECKBOX:
      return <AddTestFormCheckboxQuestion {...props} />;
    case TEST_QUESTION_TYPE.TABLE:
      return <AddTestFormTableQuestion {...props} />;
    default:
      return <AddTestFormTextQuestion {...props} />;
  }
}
