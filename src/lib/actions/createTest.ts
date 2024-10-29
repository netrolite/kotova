"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import getSignedInUserOrRedirect from "../fetchers/getSignedInUserOrRedirect";
import ServerActionReturn from "../types/ServerActionReturn";
import AddTestFormSchema from "../zod/schemas/addTestForm/Index";

type CreateTableActionReturn = {
  testId: string;
};

export default async function createTestAction(
  data: unknown,
): Promise<ServerActionReturn<CreateTableActionReturn>> {
  const { id: userId } = await getSignedInUserOrRedirect();
  const validationResult = AddTestFormSchema.safeParse(data);
  if (!validationResult.success) return { error: true };
  const { data: testData } = validationResult;
  const { categoryId, questions, files, ...safeTestData } = testData;

  try {
    const createdTest = await db.test.create({
      data: {
        ...safeTestData,
        category: { connect: { id: testData.categoryId } },
        createdBy: { connect: { id: userId } },
      },
    });

    await db.testFile.updateMany({
      where: { key: { in: files.map((file) => file.key) } },
      data: {
        createdByUserId: userId,
        testId: createdTest.id,
      },
    });

    await db.testQuestion.createMany({
      data: testData.questions.map(({ options, ...question }) => ({
        ...question,
        testId: createdTest.id,
      })),
    });

    const createdQuestions = await db.testQuestion.findMany({
      where: { testId: createdTest.id },
      include: { options: true },
    });

    const optionsToCreate: Prisma.TestQuestionOptionCreateManyInput[] = [];
    // this is so fucked! i hate this!
    // edit 6 months later: i don't hate this. This is fine.
    for (let i = 0; i < questions.length; i++) {
      const optionsData = questions[i].options;
      const createdQuestion = createdQuestions[i];
      const options = optionsData.map((option) => ({
        ...option,
        testQuestionId: createdQuestion.id,
      }));
      optionsToCreate.push(...options);
    }
    await db.testQuestionOption.createMany({
      data: optionsToCreate,
    });

    revalidatePath("/my/tests");
    return { data: { testId: createdTest.id } };
  } catch (err) {
    console.error(err);
    return { error: true };
  }
}
