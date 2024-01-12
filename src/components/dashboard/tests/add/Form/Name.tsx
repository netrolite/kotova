import FormItemField from "@/components/Form/ItemField";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddTestFormSchemaType } from "@/lib/zod/schemas/addTestForm/Index";
import { useFormContext } from "react-hook-form";

type Props = {};

export default function AddTestFormName({}: Props) {
  const { control } = useFormContext<AddTestFormSchemaType>();
  return (
    <FormItemField
      control={control}
      name="name"
      render={({ field }) => (
        <>
          <FormLabel>Название</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>
            Например: "Правописание безударных гласных"
          </FormDescription>
          <FormMessage />
        </>
      )}
    />
  );
}
