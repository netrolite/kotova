import { User } from "@prisma/client";
import { cache } from "react";
import { db } from "../db";

const getTestsCount = cache(async (user: User) => {
  return db.test.count({ where: { createdByUserId: user.id } });
});

export default getTestsCount;
