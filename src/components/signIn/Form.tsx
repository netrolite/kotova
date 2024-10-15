"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignInSchema, { SignInSchemaType } from "@/lib/zod/schemas/SignIn";
import { FormControl, FormLabel, FormMessage } from "../ui/form";
import FormItemField from "../Form/ItemField";
import { Input } from "../ui/input";
import SignInFormPasswordInput from "../Form/PasswordInput";
import Link from "next/link";
import FormSubmitBtn from "../Btns/Submit";
import { useState } from "react";
import FormError from "../Form/Error";
import HiddenInput from "../HiddenInput";
import { GENERIC_ERROR_MSG, errCodes } from "@/lib/constants";

type Props = {};

export default function SignInForm({}: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(formData: SignInSchemaType) {
    setIsLoading(true);
    form.setError(`root`, { message: undefined });
    const { email, password } = formData;
    try {
      const resp = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });
      if (!resp) throw new Error();
      if (!resp?.error) return location.replace(callbackUrl);

      setIsLoading(false); // only set loading to false if an error occurs
      switch (resp.error) {
        case "CredentialsSignin":
          form.setError(`root.${errCodes.INVALID_CREDENTIALS}`, {
            message: "Неверный пароль или электронная почта",
          });
          break;
        default:
          throw new Error();
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      form.setError(`root.${errCodes.UNKNOWN}`, {
        message: GENERIC_ERROR_MSG,
      });
    }
  }

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
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
            Войти
          </FormSubmitBtn>

          <FormError
            error={
              form.formState.errors.root?.[errCodes.INVALID_CREDENTIALS]
                ?.message
            }
          />
          <FormError
            error={form.formState.errors.root?.[errCodes.UNKNOWN]?.message}
          />
        </form>

        <p>
          Ещё нет аккаунта?{" "}
          <Link
            href={`/sign-up?callbackUrl=${callbackUrl}`}
            className="text-primary underline"
          >
            Создать аккаунт
          </Link>
        </p>
      </div>
    </FormProvider>
  );
}
