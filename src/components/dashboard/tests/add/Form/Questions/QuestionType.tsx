import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQuestionTypeLabelByNumber } from "@/lib/getQuestionType";
import FormItemField from "@/components/Form/ItemField";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { FormControl, FormField, FormLabel } from "@/components/ui/form";
import QuestionTypesList from "@/components/QuestionTypesList";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";

type Props = {};

export default function AddTestFormQuestionType({}: Props) {
  const { control } = useFormContext<AddTestFormSchemaType>();
  const { index: questionIndex } = useAddTestFormQuestionContext();

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
