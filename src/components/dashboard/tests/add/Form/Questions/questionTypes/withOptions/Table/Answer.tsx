import FormItemField from "@/components/Form/ItemField";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import useAddTestFormQuestionOption from "@/lib/hooks/addTestForm/questionOptionContext";

type Props = {};

export default function AddTestFormTableQuestionOptionAnswer({}: Props) {
  const { control } = useAddTestFormContext();
  const { index: questionIndex } = useAddTestFormQuestionContext();
  const { optionIndex } = useAddTestFormQuestionOption();

  return (
    <FormItemField
      control={control}
      name={`questions.${questionIndex}.options.${optionIndex}.tableColumnAnswer`}
      formItemClassName="w-full"
      render={({ field }) => (
        <>
          <Input
            {...field}
            value={field.value || ""}
            placeholder={`Ответ ${optionIndex + 1}`}
          />
          <FormMessage />
        </>
      )}
    />
  );
}
