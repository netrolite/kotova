import FormItemField from "@/components/Form/ItemField";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectItemType from "@/lib/types/SelectItem";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { useFormContext } from "react-hook-form";

type Props = {
  subjects: SelectItemType<string>[];
};

export default function AddTestFormSubject({ subjects }: Props) {
  const { control } = useFormContext<AddTestFormSchemaType>();
  return (
    <FormItemField
      control={control}
      name="subject"
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
              {subjects.map(({ label, value }) => (
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
