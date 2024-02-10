import FormItemField from "@/components/Form/ItemField";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMyTestEditFormContext from "@/lib/hooks/myTestEditForm/context";

export default function MyTestEditFormName() {
  const { control } = useMyTestEditFormContext();
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
