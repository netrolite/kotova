import FormItemField from "@/components/Form/ItemField";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import useMyTestEditFormQuestionOptionContext from "@/lib/hooks/myTestEditForm/questionOptionContext";

type Props = {};

export default function MyTestEditFormTableQuestionOptionAnswer({}: Props) {
  const { control } = useMyTestEditFormContext();
  const { index: questionIndex } = useMyTestEditFormQuestionContext();
  const { optionIndex } = useMyTestEditFormQuestionOptionContext();

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
