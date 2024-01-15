import { cache } from "react";
import { db } from "../db";

const getTestsCount = cache(async (userId: string) => {
  return db.test.count({ where: { createdByUserId: userId } });
});

export default getTestsCount;
