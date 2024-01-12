import { TakeTestSchemaType } from "@/lib/zod/schemas/takeTest";
import { useFormContext } from "react-hook-form";

export default function useTakeTestFormContext() {
  return useFormContext<TakeTestSchemaType>();
}
