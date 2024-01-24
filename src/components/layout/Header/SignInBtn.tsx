"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

type Props = {
  url: string;
};

export default function HeaderSignInBtn({ url }: Props) {
  const urlObj = new URL(url);
  urlObj.searchParams.append("hideBackBtn", "");
  return (
    <Button
      onClick={() => signIn(undefined, { callbackUrl: urlObj.toString() })}
    >
      Войти
    </Button>
  );
}
