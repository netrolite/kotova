"use client";
import { usePathname, useRouter } from "next/navigation";

export default function useSearchParamsRouter() {
  const router = useRouter();
  const pathanme = usePathname();

  function replace(params: URLSearchParams) {
    router.replace(`${pathanme}?${params.toString()}`);
  }

  function push(params: URLSearchParams) {
    router.push(`${pathanme}?${params.toString()}`);
  }

  return { replace, push };
}
