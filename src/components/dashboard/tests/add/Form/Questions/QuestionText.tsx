import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAddTestFormQuestionContext from "@/lib/hooks/addTestForm/questionContext";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

export default function AddTestFormQuestionText() {
  const { control } = useFormContext<AddTestFormSchemaType>();
  const { index } = useAddTestFormQuestionContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  return (
    <FormItemField
      name={`questions.${index}.question`}
      control={control}
      render={({ field }) => (
        <div ref={wrapperRef} tabIndex={0}>
          <FormLabel>Вопрос</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </div>
      )}
    />
  );
}
