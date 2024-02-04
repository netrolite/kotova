"use client";

import useMyTestContext from "@/lib/contexts/myTest/useContext";
import getApiData from "@/lib/fetchers/getApiData";
import { TestResult } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { swrKeys } from "@/lib/constants";
import { MyTestGetTestResultsReturn } from "@/lib/fetchers/myTest/getTestResults";

type Props = {};

export default function MyTestSearch({}: Props) {
  const { id: testId } = useMyTestContext();
  const initSearchParams = useSearchParams();
  const [searchParams, setSearchParams] = useState(initSearchParams);
  const [query, setQuery] = useState("");

  const { mutate } = useSWR<MyTestGetTestResultsReturn>(
    [swrKeys.myTest, testId],
    () => getApiData(`/api/test-results/${testId}?${searchParams.toString()}`),
  );

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  return (
    <form
      className="relative flex items-center rounded border"
      onSubmit={handleSearch}
    >
      <Input
        placeholder="Поиск по имени и фамилии"
        className="border-none"
        onChange={({ target: { value } }) => setQuery(value)}
        value={query}
      />
      <button className="border-l p-2">
        <SearchIcon width={20} className="text-muted-foreground" />
      </button>
    </form>
  );
}
