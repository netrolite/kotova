import { cache } from "react";
import { db } from "../../db";

const takeTestGetTest = cache(async (id: string) => {
  return await db.test.findFirst({
    where: { id },
    include: {
      questions: { include: { options: true } },
      subject: { select: { title: true, id: true } },
      createdBy: { select: { id: true, image: true, name: true } },
      files: { select: { filename: true, key: true, contentType: true } },
    },
  });
});

export type TakeTestGetTestReturn = ReturnType<typeof takeTestGetTest>;

export default takeTestGetTest;
