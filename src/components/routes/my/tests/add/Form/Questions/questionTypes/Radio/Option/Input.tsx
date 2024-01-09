import FormItemField from "@/components/Form/ItemField";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AddTestFormQuestionContext from "@/lib/contexts/addTestForm/question";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useContextVal from "@/lib/hooks/contextVal";
import { cn } from "@/lib/shadcnUtils";
import { AddTestFormSavedQuestionOptionSchemaType } from "@/lib/zod/schemas/addTestForm/QuestionOption";

type Props = {
  optionIndex: number;
  option: AddTestFormSavedQuestionOptionSchemaType;
};

export default function AddTestFormRadioQuestionOptionInput({
  optionIndex,
  option,
}: Props) {
  const { control } = useAddTestFormContext();
  const { index } = useContextVal(AddTestFormQuestionContext);
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
