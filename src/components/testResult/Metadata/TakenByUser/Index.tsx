"use client";

import useTestResultContext from "@/lib/hooks/testResult/context";
import Link from "next/link";
import TestResultMetadataTakenByUserTooltip from "./Tooltip";

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
      <TestResultMetadataTakenByUserTooltip />
    </div>
  );
}
