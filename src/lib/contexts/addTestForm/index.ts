import SelectItemType from "@/lib/types/SelectItem";
import { UploadedFileSchemaType } from "@/lib/zod/schemas/addTestForm/Files";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { TestFile } from "@prisma/client";
import { RefObject, createContext } from "react";
import { UseFieldArrayReturn } from "react-hook-form";

type AddTestFormContextType = {
  questionsFields: UseFieldArrayReturn<AddTestFormSchemaType>;
  categories: SelectItemType<string>[];
  formRef: RefObject<HTMLFormElement>;
  files: UploadedFileSchemaType[];
  existingFiles: TestFile[];
};

const AddTestFormContext = createContext<AddTestFormContextType | null>(null);
export default AddTestFormContext;
