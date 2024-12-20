import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { useFormContext } from "react-hook-form";

export default function AddTestFormQuestionText() {
  const { control } = useFormContext<AddTestFormSchemaType>();
  const { index } = useAddTestFormQuestionContext();

  return (
    <FormItemField
      name={`questions.${index}.question`}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel>Вопрос</FormLabel>
          <FormControl>
            <Textarea {...field} value={field.value || ""} />
          </FormControl>
          <FormMessage />
        </>
      )}
    />
  );
}
