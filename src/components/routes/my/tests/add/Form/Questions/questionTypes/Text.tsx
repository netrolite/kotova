import FormItemField from "@/components/Form/ItemField";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";

type Props = {};

export default function AddTestFormTextQuestion({}: Props) {
  const { index } = useAddTestFormQuestionContext();
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
