"use client";

import useTakeTestContext from "@/lib/hooks/takeTest/context";
import Link from "next/link";

export default function TakeTestMetadataCategory() {
  const test = useTakeTestContext();
  return (
    <div>
      <Link href={`/categories/${test.categoryId || "not-found"}`}>
        <h2 className="inline text-muted-foreground">
          {test.category?.title || "Категория без названия"}
        </h2>
      </Link>
    </div>
  );
}
