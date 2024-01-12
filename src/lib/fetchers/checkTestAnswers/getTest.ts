import { db } from "@/lib/db";

export default async function checkTestAnswersGetTest(testId: string) {
  return db.test.findFirst({
    where: { id: testId },
    include: { questions: { include: { options: true } } },
  });
}
