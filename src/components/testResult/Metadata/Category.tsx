"use client";
import useTestResultContext from "@/lib/hooks/testResult/context";
import Link from "next/link";

export default function TestResultMetadataCategory() {
  const testResult = useTestResultContext();
  return (
    <div>
      <Link href={`/categories/${testResult.test.category?.id || "not-found"}`}>
        <h2 className="inline text-muted-foreground">
          {testResult.test.category?.title || "Категория без названия"}
        </h2>
      </Link>
    </div>
  );
}
