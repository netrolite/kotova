"use client";

import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import useAllUsersListSwr from "@/lib/hooks/swr/allUsersList";
import useAllUsersStore from "@/lib/stores/allUsers";

export default function AllUsersSearch() {
  const setQuery = useAllUsersStore((s) => s.setQuery);
  const [inputVal, setInputVal] = useState("");
  const {} = useAllUsersListSwr();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuery(inputVal);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="search"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        name="search"
        placeholder="Поиск"
      />
    </form>
  );
}
