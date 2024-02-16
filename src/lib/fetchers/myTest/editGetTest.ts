import { db } from "@/lib/db";
import ExcludeNull from "@/lib/types/ExcludeNull";
import { TestQuestionType } from "@/lib/types/enums/TestQuestionType";
import { cache } from "react";

const myTestEditGetTest = cache(async (testId: string) => {
  return db.test.findUnique({
    where: { id: testId },
    include: {
      questions: {
        include: { options: { orderBy: { order: "asc" } } },
        orderBy: { order: "asc" },
      },
    },
  });
});

type _MyTestEditGetTestReturn = ExcludeNull<
  Awaited<ReturnType<typeof myTestEditGetTest>>
>;
export type MyTestEditGetTestReturn = _MyTestEditGetTestReturn & {
  questions: Array<
    _MyTestEditGetTestReturn["questions"][number] & {
      type: TestQuestionType;
    }
  >;
};
export default myTestEditGetTest;
