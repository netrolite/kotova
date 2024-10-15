"use client";

import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchemaType } from "@/lib/zod/schemas/SignIn";
import { FormControl, FormLabel, FormMessage } from "../ui/form";
import FormItemField from "../Form/ItemField";
import { Input } from "../ui/input";
import Link from "next/link";
import FormSubmitBtn from "../Btns/Submit";
import { useState } from "react";
import FormError from "../Form/Error";
import HiddenInput from "../HiddenInput";
import { GENERIC_ERROR_MSG, errCodes } from "@/lib/constants";
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
    form.setError("root", {});

    try {
      const resp = await credentialsSignUpAction(formData);
      if (!resp.error) {
        location.replace(callbackUrl);
        return;
      }

      setIsLoading(false); // only set loading to false if an error occurs
      switch (resp.error) {
        case errCodes.USER_ALREADY_EXISTS:
          form.setError(`root.${errCodes.USER_ALREADY_EXISTS}`, {
            message: "Пользователь с такой электронной почтой уже существует",
          });
          break;
        default:
          throw new Error();
      }
    } catch (err) {
      console.error(err);
      form.setError(`root.${errCodes.UNKNOWN}`, {
        message: GENERIC_ERROR_MSG,
      });
      setIsLoading(false);
    }
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
                <FormLabel>Имя и фамилия</FormLabel>
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
            error={form.formState.errors.root?.[errCodes.UNKNOWN]?.message}
          />
          <FormError
            error={
              form.formState.errors.root?.[errCodes.USER_ALREADY_EXISTS]
                ?.message
            }
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
      </div>
    </FormProvider>
  );
}
