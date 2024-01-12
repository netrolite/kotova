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

export default function UserEditProfileForm({ user }: Props) {
  const router = useRouter();
  const form = useForm<UserEditSchemaInputType>({
    resolver: zodResolver(UserEditSchema),
    defaultValues: {
      name: user.name ?? "",
      avatarUrl: user.image ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    },
  });
  const { isLoading, setIsLoading } = useLoading();

  async function handleSubmit(data: UserEditSchemaType) {
    setIsLoading(true);
    const result = await editOwnProfileAction(data);
    if (result.data) {
      toast.success("Профиль успешно изменен");
      router.replace(`/users/${user.id}`);
    } else toast.error(GENERIC_ERROR_MSG);

    setIsLoading(false);
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
              <FormLabel>Имя</FormLabel>
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
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Номер телефона не будет показан другим пользователям
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на аватар</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitBtn {...{ isLoading }}>Изменить</FormSubmitBtn>
      </form>
    </FormProvider>
  );
}
