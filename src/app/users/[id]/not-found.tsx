"use client";

import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserNotFound() {
  const router = useRouter();
  return (
    <>
      <PageTitle>Пользователь не найден</PageTitle>
      <p className="mb-4">
        Возможно, аккаунт был удален или вы перешли по нерабочей ссылке.
      </p>
      <Button onClick={router.back}>Вернуться назад</Button>
    </>
  );
}
