import { AddTestFormSavedQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";

type Props = AddTestFormSavedQuestionSchemaType;

export default function AddTestFormTextQuestion({
  correctAnswerText,
  explanation,
  options,
  question,
}: Props) {
  console.log("text question");
  return <></>;
}
