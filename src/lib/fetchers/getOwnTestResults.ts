import { cache } from "react";
import { db } from "../db";

const getOwnTestResults = cache(async (userId: string) => {
  return db.testResult.findMany({
    where: { userId },
    include: {
      test: {
        include: {
          createdBy: { select: { image: true, id: true, name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
});

export default getOwnTestResults;
