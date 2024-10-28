import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
          <FormControl>
            <Textarea {...field} value={field.value || ""} />
          </FormControl>
          <FormMessage />
        </>
      )}
    />
  );
}
