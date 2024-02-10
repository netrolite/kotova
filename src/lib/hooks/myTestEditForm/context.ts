import { useFormContext } from "react-hook-form";
import useContextVal from "../contextVal";
import MyTestEditFormContext from "@/lib/contexts/myTestEditForm";
import { MyTestEditFormSchemaType } from "@/lib/zod/schemas/myTestEditForm/Index";

export default function useMyTestEditFormContext() {
  const val = useContextVal(MyTestEditFormContext);
  return {
    ...useFormContext<MyTestEditFormSchemaType>(),
    ...val,
  };
}
