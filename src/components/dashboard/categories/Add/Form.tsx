import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import addCategoryAction from "@/lib/actions/addCategory";
import useCategoriesSwr from "@/lib/hooks/swr/categories";
import useLoading from "@/lib/hooks/loading";
import AddCategorySchema, {
  AddCategorySchemaInputType,
  AddCateogorySchemaType,
} from "@/lib/zod/schemas/AddCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import BtnWithLoading from "@/components/Btns/WithLoading";
import useAddCategoryStore from "@/lib/stores/addCategory";
import FormItemField from "@/components/Form/ItemField";

export default function AddCategoryForm() {
  const setIsAddCategoryDialogOpen = useAddCategoryStore(
    (s) => s.setIsAddCategoryDialogOpen,
  );
  const { mutate, data: categories } = useCategoriesSwr();
  const { isLoading, setIsLoading } = useLoading();
  const form = useForm<AddCategorySchemaInputType>({
    resolver: zodResolver(AddCategorySchema),
    defaultValues: {
      title: "",
    },
  });

  async function handleSubmit(data: AddCateogorySchemaType) {
    setIsLoading(true);
    const result = await addCategoryAction(data);
    setIsLoading(false);
    setIsAddCategoryDialogOpen(false);

    if (result.error) {
      return toast.error("Не удалось добавить категорию");
    }
    toast.success("Категория успешно добавлена");
    await mutate([...(categories || []), result.data]);
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
