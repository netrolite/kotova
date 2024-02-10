import FormItemField from "@/components/Form/ItemField";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";

type Props = {};

export default function MyTestEditFormTextQuestion({}: Props) {
  const { index } = useMyTestEditFormQuestionContext();
  const { control } = useMyTestEditFormContext();
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
