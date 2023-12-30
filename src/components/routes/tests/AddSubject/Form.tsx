"use client";

import FormError from "@/components/Form/Error";
import FormSubmitBtn from "@/components/Form/SubmitBtn";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import addSubjectAction from "@/lib/actions/addSubject";
import useLoading from "@/lib/hooks/useLoading";
import useResponsiveDialogState from "@/lib/hooks/useResponsiveDialogState";
import AddSubjectSchema, {
  AddSubjectSchemaInputType,
  AddSubjectSchemaType,
} from "@/lib/zod/schemas/AddSubject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddSubjectForm() {
  const [_isDialogOpen, setIsDialogOpen] = useResponsiveDialogState();
  const form = useForm<AddSubjectSchemaInputType>({
    resolver: zodResolver(AddSubjectSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isLoading, setIsLoading } = useLoading();
  const [data, setData] = useState<Awaited<
    ReturnType<typeof addSubjectAction>
  > | null>(null);

  async function handleSubmit(data: AddSubjectSchemaType) {
    setIsLoading(true);
    setData(await addSubjectAction(data));
    setIsLoading(false);
  }

  useEffect(() => {
    if (data?.data) {
      toast.success("Предмет успешно добавлен");
      setIsDialogOpen(false);
    }
  }, [data]);

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

        <FormSubmitBtn {...{ isLoading }}>Создать</FormSubmitBtn>
        <FormError error={data?.error} />
      </form>
    </FormProvider>
  );
}
