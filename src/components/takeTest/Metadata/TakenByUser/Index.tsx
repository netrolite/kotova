"use client";

import Link from "next/link";
import TakeTestMetadataCreatedByUserPopover from "./Popover";
import useTakeTestContext from "@/lib/hooks/takeTest/context";

export default function TakeTestMetadataCreatedByUser() {
  const test = useTakeTestContext();
  return (
    <div className="text-muted-foreground">
      Создан пользователем{" "}
      <Link
        className="font-semibold text-black"
        href={`/users/${test.createdBy?.id ?? "deleteduser"}`}
      >
        {test.createdBy?.name ?? "Удаленный пользователь"}
      </Link>{" "}
      <TakeTestMetadataCreatedByUserPopover />
    </div>
  );
}
