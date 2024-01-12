import FormItemField from "@/components/Form/ItemField";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useTakeTestFormContext from "@/lib/hooks/takeTest/formContext";
import useTakeTestQuestionContext from "@/lib/hooks/takeTest/questionContext";

export default function TakeTestTextQuestion() {
  const { questionIndex } = useTakeTestQuestionContext();
  const { control } = useTakeTestFormContext();

  return (
    <FormItemField
      control={control}
      name={`answers.${questionIndex}.textAnswer`}
      render={({ field }) => (
        <>
          <Input {...field} value={field.value || ""} placeholder="Ваш ответ" />
          <FormMessage />
        </>
      )}
    />
  );
}
