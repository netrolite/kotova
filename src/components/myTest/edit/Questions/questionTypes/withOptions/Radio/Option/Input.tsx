import FormItemField from "@/components/Form/ItemField";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMyTestEditFormQuestionOptionContext from "@/lib/hooks/myTestEditForm/questionOptionContext";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import { cn } from "@/lib/shadcnUtils";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";

type Props = {};

export default function MyTestEditFormRadioQuestionOptionInput({}: Props) {
  const { control } = useMyTestEditFormContext();
  const { index: questionIndex } = useMyTestEditFormQuestionContext();
  const { option, optionIndex } = useMyTestEditFormQuestionOptionContext();
  return (
    <FormItemField
      control={control}
      name={`questions.${questionIndex}.options.${optionIndex}.content`}
      formItemClassName="w-full"
      render={({ field }) => (
        <>
          <Input
            {...field}
            value={field.value || ""}
            placeholder={`Ответ ${optionIndex + 1}`}
            className={cn(
              "border",
              option.isCorrect && "border-2 border-green-600",
            )}
          />
          <FormMessage />
        </>
      )}
    />
  );
}
