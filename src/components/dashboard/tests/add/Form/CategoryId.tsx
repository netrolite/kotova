import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAddTestFormContext from "@/lib/hooks/addTestForm/context";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { useFormContext } from "react-hook-form";

export default function AddTestFormCategory() {
  const { categories } = useAddTestFormContext();
  const { control } = useFormContext<AddTestFormSchemaType>();

  return (
    <FormItemField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <>
          <FormLabel>Категория</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </>
      )}
    />
  );
}
