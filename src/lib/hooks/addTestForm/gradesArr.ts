import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function useAddTestFormGradesArr() {
  const { control } = useFormContext<AddTestFormSchemaType>();
  return useFieldArray({ control, name: "grades" });
}
