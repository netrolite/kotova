import SelectItemType from "@/lib/types/SelectItem";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { RefObject, createContext } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

type AddTestFormContextType = {
  questionsFields: UseFieldArrayReturn<AddTestFormSchemaType>;
  subjects: SelectItemType<string>[];
  formRef: RefObject<HTMLFormElement>;
};
const AddTestFormContext = createContext<AddTestFormContextType | null>(null);
export default AddTestFormContext;
