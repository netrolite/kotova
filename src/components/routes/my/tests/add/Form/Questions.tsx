import FormItemField from "@/components/Form/ItemField";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddTestSchemaInputType } from "@/lib/zod/schemas/AddTest";
import { useFieldArray, useFormContext } from "react-hook-form";

type Props = {};

export default function AddTestFormQuestions({}: Props) {
  const { control } = useFormContext<AddTestSchemaInputType>();
  const { fields } = useFieldArray({
    control,
    name: "questions",
  });

  return fields.map((question, i) => {
    console.log(question.correctAnswerText);
    return (
      <FormItemField
        key={question.id}
        control={control}
        name="questions"
        render={({ field }) => (
          <>
            <FormLabel>Вопрос {i + 1}</FormLabel>
            <FormControl></FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </>
        )}
      />
    );
  });
}
