import { cache } from "react";
import { db } from "../../db";

const takeTestGetTest = cache(async (id: string) => {
  return await db.test.findFirst({
    where: { id },
    include: { questions: { include: { options: true } } },
  });
});

export type TakeTestGetTestReturn = ReturnType<typeof takeTestGetTest>;

export default takeTestGetTest;
