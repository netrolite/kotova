import { useSearchParams } from "next/navigation";

export default function useUrlSearchParams() {
  const searchParams = useSearchParams();

  function getSearchParams() {
    return new URLSearchParams(searchParams);
  }

  return { getSearchParams };
}
