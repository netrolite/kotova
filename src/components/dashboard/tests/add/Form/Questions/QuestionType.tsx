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
import { FormControl, FormLabel } from "@/components/ui/form";
import QuestionTypesList from "@/components/QuestionTypesList";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import { TEST_QUESTION_TYPE } from "@/lib/types/enums/TestQuestionType";

type Props = {};

export default function AddTestFormQuestionType({}: Props) {
  const { control } = useFormContext<AddTestFormSchemaType>();
  const { index, optionsFields } = useAddTestFormQuestionContext();

  return (
    <FormItemField
      name={`questions.${index}.type`}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel>Тип вопроса</FormLabel>
          <Select
            onValueChange={(val) => {
              const valNum = Number(val);
              if (valNum === TEST_QUESTION_TYPE.TEXT) {
                optionsFields.fields.forEach((field, i) => {
                  console.log(field);
                  optionsFields.update(i, { ...field, content: null });
                });
              } else {
                optionsFields.fields.forEach((field, i) => {
                  console.log(field.content);
                  optionsFields.update(i, {
                    ...field,
                    content: "",
                  });
                });
              }
              console.log(optionsFields.fields);
              field.onChange(valNum);
            }}
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
