"use client";

import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import NextError from "@/lib/types/nextError";

export default function Error({ reset }: NextError) {
  return (
    <>
      <PageTitle className="mb-4">Произошла неожиданная ошибка</PageTitle>
      <Button onClick={reset} variant="outline">
        Попробовать еще раз
      </Button>
    </>
  );
}
