"use client";

import useTakeTestContext from "@/lib/hooks/takeTest/context";
import Link from "next/link";

export default function TakeTestMetadataSubject() {
  const test = useTakeTestContext();
  return (
    <Link className="w-min" href={`/subjects/${test.subject?.id}`}>
      <h2 className="text-muted-foreground">{test.subject?.title}</h2>
    </Link>
  );
}
