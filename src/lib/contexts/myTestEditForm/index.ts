import { MyTestEditGetTestReturn } from "@/lib/fetchers/myTest/editGetTest";
import SelectItemType from "@/lib/types/SelectItem";
import { MyTestEditFormSchemaType } from "@/lib/zod/schemas/myTestEditForm/Index";
import { RefObject, createContext } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

type MyTestEditFormContextType = {
  questionsFields: UseFieldArrayReturn<MyTestEditFormSchemaType>;
  categories: SelectItemType<string>[];
  formRef: RefObject<HTMLFormElement>;
  test: MyTestEditGetTestReturn;
};
const MyTestEditFormContext = createContext<MyTestEditFormContextType | null>(
  null,
);
export default MyTestEditFormContext;
