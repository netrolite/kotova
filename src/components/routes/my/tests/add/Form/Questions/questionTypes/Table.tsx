import { AddTestFormSavedQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";

type Props = AddTestFormSavedQuestionSchemaType;

export default function AddTestFormTableQuestion({
  correctAnswerText,
  explanation,
  options,
  question,
}: Props) {
  // console.log("table question");
  return <>table question</>;
}
