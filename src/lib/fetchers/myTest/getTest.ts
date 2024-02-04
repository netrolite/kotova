import { db } from "@/lib/db";
import { cache } from "react";

const myTestGetTest = cache(async (testId: string) => {
  return db.test.findUnique({
    where: { id: testId },
    include: { testResults: { take: 1 } },
  });
});

export type MyTestGetTestReturn = Awaited<ReturnType<typeof myTestGetTest>>;
export default myTestGetTest;
