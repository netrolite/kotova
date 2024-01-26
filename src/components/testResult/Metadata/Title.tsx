"use client";
import PageTitle from "@/components/PageTitle";
import useTestResultContext from "@/lib/hooks/testResult/context";
import Link from "next/link";

export default function TestResultMetadataTitle() {
  const testResult = useTestResultContext();

  return (
    <Link className="w-min" href={`/take-test/${testResult.test.id}`}>
      <PageTitle>{testResult.test.name}</PageTitle>
    </Link>
  );
}
