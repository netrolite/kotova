import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import { MyTestEditFormSchemaType } from "@/lib/zod/schemas/myTestEditForm/Index";
import { useFormContext } from "react-hook-form";

export default function MyTestEditFormQuestionText() {
  const { control } = useFormContext<MyTestEditFormSchemaType>();
  const { index } = useMyTestEditFormQuestionContext();

  return (
    <FormItemField
      name={`questions.${index}.question`}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel>Вопрос</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </>
      )}
    />
  );
}
