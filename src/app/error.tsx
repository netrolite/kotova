"use client";

import BackBtn from "@/components/BackBtn";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import NextError from "@/lib/types/nextError";

export default function Error({ reset }: NextError) {
  return (
    <main className="m-auto max-w-[650px] px-4 py-8">
      <PageTitle className="mb-6">Произошла неожиданная ошибка</PageTitle>
      <div className="flex flex-col gap-2">
        <Button onClick={reset} variant="outline" className="w-min">
          Попробовать еще раз
        </Button>
        <BackBtn variant="outline" className="w-min" />
      </div>
    </main>
  );
}
