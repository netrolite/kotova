import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function useAddTestFormQuestionsArr() {
  const { control } = useFormContext<AddTestFormSchemaType>();
  return useFieldArray({ control, name: "questions" });
}
