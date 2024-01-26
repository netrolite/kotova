"use client";
import PageTitle from "@/components/PageTitle";
import useTestResultContext from "@/lib/hooks/testResult/context";
import Link from "next/link";

export default function TestResultMetadataTitle() {
  const testResult = useTestResultContext();

  return (
    <div>
      <Link href={`/take-test/${testResult.test.id}`}>
        <PageTitle className="inline">{testResult.test.name}</PageTitle>
      </Link>
    </div>
  );
}
