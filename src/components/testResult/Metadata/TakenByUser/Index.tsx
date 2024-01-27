"use client";

import useTestResultContext from "@/lib/hooks/testResult/context";
import Link from "next/link";
import TestResultMetadataTakenByUserPopover from "./Popover";

export default function TestResultMetadataTakenByUser() {
  const testResult = useTestResultContext();
  return (
    <div className="text-muted-foreground">
      Пройден пользователем{" "}
      <Link
        className="font-semibold text-black"
        href={`/users/${testResult.userId ?? "deleteduser"}`}
      >
        {testResult.user?.name ?? "Удаленный пользователь"}
      </Link>{" "}
      <TestResultMetadataTakenByUserPopover />
    </div>
  );
}
