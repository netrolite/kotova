import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import addSubjectAction from "@/lib/actions/addSubject";
import useSubjectsSwr from "@/lib/hooks/swr/subjects";
import useLoading from "@/lib/hooks/loading";
import AddSubjectSchema, {
  AddSubjectSchemaInputType,
  AddSubjectSchemaType,
} from "@/lib/zod/schemas/AddSubject";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import BtnWithLoading from "@/components/Btns/WithLoading";
import useAddSubjectStore from "@/lib/stores/addSubject";
import FormItemField from "@/components/Form/ItemField";

export default function AddSubjectForm() {
  const setIsAddSubjectDialogOpen = useAddSubjectStore(
    (s) => s.setIsAddSubjectDialogOpen,
  );
  const { mutate, data: subjects } = useSubjectsSwr();
  const { isLoading, setIsLoading } = useLoading();
  const form = useForm<AddSubjectSchemaInputType>({
    resolver: zodResolver(AddSubjectSchema),
    defaultValues: {
      title: "",
    },
  });

  async function handleSubmit(data: AddSubjectSchemaType) {
    setIsLoading(true);
    const result = await addSubjectAction(data);
    setIsLoading(false);
    setIsAddSubjectDialogOpen(false);

    if (result.error) {
      return toast.error("Не удалось добавить предмет");
    }
    toast.success("Предмет успешно добавлен");
    await mutate([...(subjects || []), result.data]);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormItemField
          control={form.control}
          name="title"
          render={({ field }) => (
            <>
              <FormLabel className="block text-left">Название</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </>
          )}
        />

        <BtnWithLoading {...{ isLoading }}>Создать</BtnWithLoading>
      </form>
    </FormProvider>
  );
}
