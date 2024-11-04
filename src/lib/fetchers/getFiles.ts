import { db } from "../db";

export default async function getFiles() {
  return db.testFile.findMany({ orderBy: { createdAt: "desc" } });
}
