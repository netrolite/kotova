"use client";

import useMyTestContext from "@/lib/contexts/myTest/useContext";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import useMyTestResultsSwr from "@/lib/hooks/swr/myTestResults";
import { useDebouncedCallback } from "use-debounce";
import { useHotkeys } from "react-hotkeys-hook";
import updateUrlQueryString from "@/lib/updateUrlQueryString";

export default function MyTestSearch() {
  const {
    test: { id: testId },
  } = useMyTestContext();
  const initSearchParams = useSearchParams();
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(initSearchParams),
  );
  const [query, setQuery] = useState(initSearchParams.get("q") ?? "");
  const { mutate } = useMyTestResultsSwr({ testId, searchParams });
  const queryInputRef = useRef<HTMLInputElement>(null);
  useHotkeys("mod+k", () => queryInputRef.current?.focus(), [queryInputRef]);

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await mutate();
  }

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setQuery(query);
    setSearchParams((sp) => {
      sp.delete("q");
      if (query) {
        sp.append("q", query);
      }
      return sp;
    });
  }
  useEffect(() => updateUrlQueryStringDebounced(), [searchParams.toString()]);

  const updateUrlQueryStringDebounced = useDebouncedCallback(() => {
    updateUrlQueryString(searchParams);
  }, 300);

  return (
    <form
      className="relative flex items-center rounded-md border"
      onSubmit={handleSearch}
    >
      <Input
        placeholder="Поиск по имени и фамилии"
        className="border-none"
        onChange={handleQueryChange}
        value={query}
        ref={queryInputRef}
      />
      <button className="border-l p-2">
        <SearchIcon width={20} className="text-muted-foreground" />
      </button>
    </form>
  );
}
