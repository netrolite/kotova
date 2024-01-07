import { AddTestFormSavedQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";

type Props = AddTestFormSavedQuestionSchemaType;

export default function AddTestFormRadioQuestion({
  correctAnswerText,
  explanation,
  options,
  question,
}: Props) {
  console.log("radio question");
  return <></>;
}
