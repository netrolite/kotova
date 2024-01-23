"use client";

import { useSearchParams } from "next/navigation";
import BtnWithIcon from "../Btns/WithIcon";
import { signIn } from "next-auth/react";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { FaYandex as YandexIcon } from "react-icons/fa";

type Props = {};

export default function SingInForm({}: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <BtnWithIcon
        variant="outline"
        onClick={() => signIn("yandex", { callbackUrl })}
        icon={<YandexIcon className="h-6 w-6 fill-red-500" />}
      >
        Продолжить с Яндекс
      </BtnWithIcon>
      <BtnWithIcon
        variant="outline"
        onClick={() => signIn("google", { callbackUrl })}
        icon={<GoogleIcon className="h-6 w-6" />}
      >
        Продолжить с Google
      </BtnWithIcon>
    </form>
  );
}
