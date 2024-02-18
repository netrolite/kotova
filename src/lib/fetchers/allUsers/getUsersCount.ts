import { db } from "@/lib/db";
import { cache } from "react";

const getUsersCount = cache(async () => {
  return db.user.count();
});

export default getUsersCount;
