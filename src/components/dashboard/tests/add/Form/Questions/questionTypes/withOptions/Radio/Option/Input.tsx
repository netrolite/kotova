import FormItemField from "@/components/Form/ItemField";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAddTestFormQuestionOptionContext from "@/lib/hooks/addTestForm/questionOptionContext";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import { cn } from "@/lib/shadcnUtils";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";

type Props = {};

export default function AddTestFormRadioQuestionOptionInput({}: Props) {
  const { control } = useAddTestFormContext();
  const { index: questionIndex } = useAddTestFormQuestionContext();
  const { option, optionIndex } = useAddTestFormQuestionOptionContext();

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
