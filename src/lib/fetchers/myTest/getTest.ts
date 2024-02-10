import { db } from "@/lib/db";
import ExcludeNull from "@/lib/types/ExcludeNull";
import { cache } from "react";

const myTestGetTest = cache(async (testId: string) => {
  return db.test.findUnique({
    where: { id: testId },
  });
});

export type MyTestGetTestReturn = ExcludeNull<
  Awaited<ReturnType<typeof myTestGetTest>>
>;
export default myTestGetTest;
