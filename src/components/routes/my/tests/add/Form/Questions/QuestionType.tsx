import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQuestionTypeLabelByNumber } from "@/lib/getQuestionType";
import FormItemField from "@/components/Form/ItemField";
import { useFormContext } from "react-hook-form";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { FormControl, FormLabel } from "@/components/ui/form";
import QuestionTypesList from "@/components/QuestionTypesList";

type Props = {
  index: number;
};

export default function AddTestFormQuestionType({ index }: Props) {
  const { control } = useFormContext<AddTestFormSchemaType>();
  return (
    <FormItemField
      name={`questions.${index}.type`}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel>Тип вопроса</FormLabel>
          <Select
            onValueChange={(val) => field.onChange(Number(val))}
            value={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип вопроса" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <QuestionTypesList
                render={({ type }) => (
                  <SelectItem key={type} value={type.toString()}>
                    {getQuestionTypeLabelByNumber(type)}
                  </SelectItem>
                )}
              />
            </SelectContent>
          </Select>
        </>
      )}
    />
  );
}
