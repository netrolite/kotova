import { AddTestFormSavedQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";

type Props = AddTestFormSavedQuestionSchemaType;

export default function AddTestFormCheckboxQuestion({
  correctAnswerText,
  explanation,
  options,
  question,
}: Props) {
  // console.log("checkbox question");
  return <>checkbox question</>;
}
