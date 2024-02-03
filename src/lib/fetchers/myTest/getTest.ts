import { db } from "@/lib/db";
import { cache } from "react";

const myTestGetTest = cache(async (testId: string) => {
  return db.test.findUnique({ where: { id: testId } });
});

export default myTestGetTest;
