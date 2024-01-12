"use client";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  initQuery: string;
};
const SEARCH_DELAY = 400;

export default function TestListSearch({ initQuery }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [lastSearchAt, setLastSearchAt] = useState(0);
  const [query, setQuery] = useState(initQuery);

  function handleSearch(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (Date.now() - lastSearchAt < SEARCH_DELAY) return;
    setLastSearchAt(Date.now());

    const params = new URLSearchParams(searchParams);
    if (query) params.set("q", query);
    else params.delete("q");

    router.replace(`${pathname}?${params.toString()}`);
  }
  const debouncedSearch = useDebouncedCallback(handleSearch, SEARCH_DELAY);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    debouncedSearch();
  }

  return (
    <form
      className="relative flex items-center rounded border"
      onSubmit={handleSearch}
    >
      <Input
        placeholder="Поиск"
        className="border-none"
        onChange={handleInputChange}
        value={query}
      />
      <button className="border-l p-2">
        <SearchIcon width={20} className="text-muted-foreground" />
      </button>
    </form>
  );
}
