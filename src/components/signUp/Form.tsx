"use client";

import { useSearchParams } from "next/navigation";
import BtnWithIcon from "../Btns/WithIcon";
import { signIn } from "next-auth/react";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { FaYandex as YandexIcon } from "react-icons/fa";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchemaType } from "@/lib/zod/schemas/SignIn";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { FormControl, FormLabel, FormMessage } from "../ui/form";
import FormItemField from "../Form/ItemField";
import { Input } from "../ui/input";
import Link from "next/link";
import FormSubmitBtn from "../Btns/Submit";
import { useState } from "react";
import FormError from "../Form/Error";
import HiddenInput from "../HiddenInput";
import { GENERIC_ERROR_MSG, UNKNOWN_ERROR } from "@/lib/constants";
import SignUpSchema, { SignUpSchemaType } from "@/lib/zod/schemas/SignUp";
import SignInFormPasswordInput from "../Form/PasswordInput";
import credentialsSignUpAction from "@/lib/actions/credentialsSignUp";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSubmit(formData: SignInSchemaType) {
    setIsLoading(true);
    form.setError("root", { message: undefined });
    try {
      const resp = await credentialsSignUpAction(formData);
      console.log("resp:");
      console.log(resp);
      if (resp.error) throw new Error();
      else {
        toast.success(<pre>{JSON.stringify(formData)}</pre>);
      }
    } catch (err) {
      console.error(err);
      form.setError(`root.${UNKNOWN_ERROR}`, {
        message: GENERIC_ERROR_MSG,
      });
    }
    setIsLoading(false);
  }

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormItemField
            control={form.control}
            name="name"
            render={({ field }) => (
              <>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </>
            )}
          />

          <FormItemField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormLabel>Электронная почта</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </>
            )}
          />

          <SignInFormPasswordInput />
          <HiddenInput {...form.register("callbackUrl")} value={callbackUrl} />

          <FormSubmitBtn className="w-full gap-2" {...{ isLoading }}>
            Создать аккаунт
          </FormSubmitBtn>

          <FormError
            error={form.formState.errors.root?.[UNKNOWN_ERROR]?.message}
          />
        </form>

        <p>
          Уже есть аккаунт?{" "}
          <Link
            href={`/sign-in?callbackUrl=${callbackUrl}`}
            className="text-primary underline"
          >
            Войти
          </Link>
        </p>

        <div className="flex items-center gap-2">
          <Separator className="shrink" />
          <span className="text-center text-muted-foreground">Или</span>
          <Separator className="shrink" />
        </div>
        <div className="space-y-2">
          <BtnWithIcon
            className="w-full gap-2"
            variant="outline"
            onClick={() => signIn("google", { callbackUrl })}
            icon={<GoogleIcon className="h-6 w-6" />}
          >
            Продолжить с Google
          </BtnWithIcon>
          <BtnWithIcon
            className="w-full gap-2"
            variant="outline"
            onClick={() => signIn("yandex", { callbackUrl })}
            icon={<YandexIcon className="h-6 w-6 fill-red-500" />}
          >
            Продолжить с Яндекс
          </BtnWithIcon>
        </div>
      </div>
    </FormProvider>
  );
}
