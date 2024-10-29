import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";

export default function MyTestEditFormCategories() {
  const { categories } = useMyTestEditFormContext();
  const { control } = useMyTestEditFormContext();

  return (
    <FormItemField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <>
          <FormLabel>Предмет</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите предмет" />
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
