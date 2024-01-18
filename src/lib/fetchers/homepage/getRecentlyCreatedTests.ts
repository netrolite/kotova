import { db } from "@/lib/db";
import { cache } from "react";

const homepageGetRecentlyCreatedTests = cache(async () => {
  return db.test.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { subject: { select: { title: true } } },
  });
});

export default homepageGetRecentlyCreatedTests;
