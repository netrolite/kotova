import FormItemField from "@/components/Form/ItemField";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AddTestFormQuestionContext from "@/lib/contexts/addTestForm/question";
import useAddTestFormQuestionOption from "@/lib/hooks/addTestForm/questionOptionContext";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useContextVal from "@/lib/hooks/contextVal";
import { cn } from "@/lib/shadcnUtils";

type Props = {};

export default function AddTestFormRadioQuestionOptionInput({}: Props) {
  const { control } = useAddTestFormContext();
  const { index } = useContextVal(AddTestFormQuestionContext);
  const { option, optionIndex } = useAddTestFormQuestionOption();
  return (
    <FormItemField
      control={control}
      name={`questions.${index}.options.${optionIndex}.content`}
      formItemClassName="w-full"
      render={({ field }) => (
        <>
          <Input
            {...field}
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