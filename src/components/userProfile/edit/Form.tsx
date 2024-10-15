"use client";

import { User } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserEditSchema, {
  UserEditSchemaInputType,
  UserEditSchemaType,
} from "@/lib/zod/schemas/UserEdit";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormSubmitBtn from "@/components/Btns/Submit";
import useLoading from "@/lib/hooks/loading";
import editOwnProfileAction from "@/lib/actions/editOwnProfile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GENERIC_ERROR_MSG } from "@/lib/constants";

type Props = {
  user: User;
};

export default function UserEditProfileForm({ user: initUser }: Props) {
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const form = useForm<UserEditSchemaInputType>({
    resolver: zodResolver(UserEditSchema),
    defaultValues: {
      name: initUser.name ?? "",
      email: initUser.email ?? null,
      phone: initUser.phone ?? null,
    },
  });

  async function handleSubmit(data: UserEditSchemaType) {
    setIsLoading(true);
    try {
      const result = await editOwnProfileAction(data);
      if (result.error) throw new Error();

      toast.success("Профиль успешно изменен");
      router.replace(`/users/${initUser.id}`);
    } catch (err) {
      setIsLoading(false);
      toast.error(GENERIC_ERROR_MSG);
      console.error(err);
    }
  }

  function handleSubmitError() {
    toast.error(
      "Не удалось изменить профиль. Пожалуйста, проверьте введенные данные на ошибки",
    );
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit, handleSubmitError)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя и фамилия</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>
                Электронная почта не будет показана другим пользователям
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>
                Номер телефона не будет показан другим пользователям
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSubmitBtn {...{ isLoading }}>Изменить</FormSubmitBtn>
      </form>
    </FormProvider>
  );
}
