import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";

type Props = {
  index: number;
};

export default function AddTestFormQuestionAnswerExplanation({ index }: Props) {
  const { control } = useFormContext<AddTestFormSchemaType>();
  return (
    <FormItemField
      name={`questions.${index}.explanation`}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel>Объяснение (необязательно)</FormLabel>
          <FormControl>
            <Textarea {...field} value={field.value || ""} />
          </FormControl>
          <FormMessage />
        </>
      )}
    />
  );
}
