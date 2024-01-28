"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeaderBackBtn() {
  const router = useRouter();

  function handleNavigate() {
    const canNavigateBack = history.length >= 1;
    if (canNavigateBack) router.back();
    else router.push("/");
  }

  return (
    <button
      className="relative flex h-[30px] w-[30px] items-center justify-center rounded-full p-1 hover:[&_div]:bg-slate-100 active:[&_div]:bg-slate-200 "
      onClick={handleNavigate}
    >
      <div
        aria-hidden
        className="absolute -bottom-1 -left-1 -right-1 -top-1 z-10 rounded-full"
      />
      <ArrowLeft className="pointer-events-none absolute z-20" />
    </button>
  );
}
