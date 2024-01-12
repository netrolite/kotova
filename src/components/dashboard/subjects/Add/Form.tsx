"use client";

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
import useResponsiveDialogState from "@/lib/hooks/responsiveDialogState";
import AddSubjectSchema, {
  AddSubjectSchemaInputType,
  AddSubjectSchemaType,
} from "@/lib/zod/schemas/AddSubject";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import BtnWithLoading from "@/components/Btns/WithLoading";

export default function AddSubjectForm() {
  const [_isDialogOpen, setIsDialogOpen] = useResponsiveDialogState();
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
    setIsDialogOpen(false);

    if (result.error) {
      return toast.error("Не удалось добавить предмет");
    }
    toast.success("Предмет успешно добавлен");
    await mutate([...(subjects || []), result.data]);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <BtnWithLoading {...{ isLoading }}>Создать</BtnWithLoading>
      </form>
    </FormProvider>
  );
}
