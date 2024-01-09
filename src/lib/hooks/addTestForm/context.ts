import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { useFormContext } from "react-hook-form";
import useContextVal from "../contextVal";
import AddTestFormContext from "@/lib/contexts/addTestForm";

export default function useAddTestFormContext() {
  const val = useContextVal(AddTestFormContext);
  return {
    ...useFormContext<AddTestFormSchemaType>(),
    ...val,
  };
}
