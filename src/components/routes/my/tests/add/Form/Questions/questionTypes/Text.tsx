import FormItemField from "@/components/Form/ItemField";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AddTestFormQuestionContext from "@/lib/contexts/addTestForm/question";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useContextVal from "@/lib/hooks/contextVal";
import { AddTestFormSavedQuestionSchemaType } from "@/lib/zod/schemas/addTestForm/Question";

type Props = AddTestFormSavedQuestionSchemaType & {};

export default function AddTestFormTextQuestion({
  correctAnswerText,
  explanation,
  options,
  question,
}: Props) {
  const { index } = useContextVal(AddTestFormQuestionContext);
  const { control } = useAddTestFormContext();
  return (
    <FormItemField
      name={`questions.${index}.correctAnswerText`}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel>Правильный ответ</FormLabel>
          <Input {...field} value={field.value || ""} />
          <FormMessage />
        </>
      )}
    />
  );
}
