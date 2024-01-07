import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";

type Props = {
  index: number;
};

export default function AddTestFormQuestionAnswerExplanation({ index }: Props) {
  const { control } = useFormContext<AddTestFormSchemaType>();
  return (
    <Controller
      name={`questions.${index}.explanation`}
      control={control}
      render={({ field }) => <Textarea {...field} value={field.value || ""} />}
    />
  );
}
