"use client";
import useTestResultContext from "@/lib/hooks/testResult/context";
import Link from "next/link";

export default function TestResultMetadataSubject() {
  const testResult = useTestResultContext();
  return (
    <div>
      <Link href={`/subjects/${testResult.test.subject?.id}`}>
        <h2 className="inline text-muted-foreground">
          {testResult.test.subject?.title}
        </h2>
      </Link>
    </div>
  );
}
