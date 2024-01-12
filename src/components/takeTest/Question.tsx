"use client";

import {
  TEST_QUESTION_TYPE,
  TestQuestionType,
} from "@/lib/types/enums/TestQuestionType";
import TakeTestTextQuestion from "./questionTypes/Text";
import TakeTestRadioQuestion from "./questionTypes/Radio";
import TakeTestCheckboxQuestion from "./questionTypes/Checkbox";
import TakeTestTableQuestion from "./questionTypes/Table";
import useTakeTestQuestionContext from "@/lib/hooks/takeTest/questionContext";
import useTakeTestFormContext from "@/lib/hooks/takeTest/formContext";

export default function TakeTestQuestion() {
  const { questionIndex, type, id } = useTakeTestQuestionContext();
  const {
    control: { register },
  } = useTakeTestFormContext();

  return (
    <>
      {getQuestionElem(type as TestQuestionType)}
      <input
        {...register(`answers.${questionIndex}.id`)}
        value={id}
        readOnly
        type="hidden"
      />
    </>
  );
}

function getQuestionElem(questionType: TestQuestionType) {
  switch (questionType) {
    case TEST_QUESTION_TYPE.TEXT:
      return <TakeTestTextQuestion />;
    case TEST_QUESTION_TYPE.RADIO:
      return <TakeTestRadioQuestion />;
    case TEST_QUESTION_TYPE.CHECKBOX:
      return <TakeTestCheckboxQuestion />;
    case TEST_QUESTION_TYPE.TABLE:
      return <TakeTestTableQuestion />;
    default:
      return <TakeTestTextQuestion />;
  }
}
