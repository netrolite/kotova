"use client";

import PageTitle from "@/components/PageTitle";
import useTakeTestContext from "@/lib/hooks/takeTest/context";

export default function TakeTestMetadataTitle() {
  const test = useTakeTestContext();
  return <PageTitle>{test.name}</PageTitle>;
}
