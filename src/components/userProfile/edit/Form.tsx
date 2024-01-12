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
import { useEffect, useState } from "react";
import FormError from "@/components/Form/Error";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const [data, setData] = useState<Awaited<
    ReturnType<typeof editOwnProfileAction>
  > | null>(null);

  async function handleSubmit(data: UserEditSchemaType) {
    setIsLoading(true);
    setData(await editOwnProfileAction(data));
    setIsLoading(false);
  }

  useEffect(() => {
    if (data?.data === true) {
      toast.success("Профиль успешно изменен");
      router.replace(`/users/${user.id}`);
    }
  }, [data, user.id, router]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
        <FormError error={data?.error} />
      </form>
    </FormProvider>
  );
}
