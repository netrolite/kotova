import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import { MyTestEditFormSchemaType } from "@/lib/zod/schemas/myTestEditForm/Index";

type Props = {};

export default function MyTestEditFormQuestionAnswerExplanation({}: Props) {
  const { control } = useFormContext<MyTestEditFormSchemaType>();
  const { index } = useMyTestEditFormQuestionContext();

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
