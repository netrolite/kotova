"use client";

import {
  TEST_QUESTION_TYPE,
  TestQuestionType,
} from "@/lib/types/enums/TestQuestionType";
import useTakeTestQuestionContext from "@/lib/hooks/takeTest/questionContext";
import useTakeTestFormContext from "@/lib/hooks/takeTest/formContext";
import TakeTestQuestionOptionsContext from "@/lib/contexts/takeTest/question/options";
import { useFieldArray } from "react-hook-form";
import TakeTestTextQuestion from "./questionsTypes/Text";
import TakeTestRadioQuestion from "./questionsTypes/Radio";
import TakeTestCheckboxQuestion from "./questionsTypes/Checkbox";
import TakeTestTableQuestion from "./questionsTypes/Table";

export default function TakeTestQuestion() {
  const { questionIndex, type, id } = useTakeTestQuestionContext();
  const { control } = useTakeTestFormContext();
  const optionsFields = useFieldArray({
    control,
    name: `answers.${questionIndex}.options`,
  });

  return (
    <TakeTestQuestionOptionsContext.Provider value={{ optionsFields }}>
      {getQuestionElem(type as TestQuestionType)}
    </TakeTestQuestionOptionsContext.Provider>
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
