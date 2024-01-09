import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { useFormContext } from "react-hook-form";

export default function useAddTestFormContext() {
  return useFormContext<AddTestFormSchemaType>();
}
