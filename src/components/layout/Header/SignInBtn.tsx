"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function HeaderSignInBtn() {
  return <Button onClick={() => signIn()}>Войти</Button>;
}
