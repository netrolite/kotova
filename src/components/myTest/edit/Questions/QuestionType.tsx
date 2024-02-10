import { getQuestionTypeLabelByNumber } from "@/lib/getQuestionType";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import useMyTestEditFormQuestionContext from "@/lib/hooks/myTestEditForm/questionContext";
import { MyTestEditFormSchemaType } from "@/lib/zod/schemas/myTestEditForm/Index";

type Props = {};

export default function MyTestEditFormQuestionType({}: Props) {
  const { control } = useFormContext<MyTestEditFormSchemaType>();
  const { index: questionIndex } = useMyTestEditFormQuestionContext();

  return (
    <FormField
      control={control}
      name={`questions.${questionIndex}`}
      render={({ field }) => (
        <p className="mb-4 text-sm text-muted-foreground">
          Тип вопроса:{" "}
          {getQuestionTypeLabelByNumber(field.value.type) || "Неизвестно"}
        </p>
      )}
    />
  );
}
