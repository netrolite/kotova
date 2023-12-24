"use client";

import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <PageTitle>Страница не найдена</PageTitle>
      <p className="mb-4">Возможно, вы перешли по нерабочей ссылке.</p>
      <Button onClick={router.back}>Вернуться назад</Button>
    </>
  );
}
