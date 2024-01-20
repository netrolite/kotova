"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeaderBackBtn() {
  const router = useRouter();

  function handleNavigate() {
    const canNavigateBack = history.length <= 1;
    if (canNavigateBack) router.push("/");
    else router.back();
  }

  return (
    <Button
      variant="ghost"
      className="aspect-square rounded-full p-1 hover:bg-slate-100 active:bg-slate-200"
      onClick={handleNavigate}
    >
      <ArrowLeft />
    </Button>
  );
}
