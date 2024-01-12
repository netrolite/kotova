"use server";

import { Prisma } from "@prisma/client";
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
  const { subjectId, questions, ...safeTestData } = testData;

  try {
    const createdTest = await db.test.create({
      data: {
        ...safeTestData,
        subject: { connect: { id: testData.subjectId } },
        createdBy: { connect: { id: userId } },
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

    return { data: { testId: createdTest.id } };
  } catch (err) {
    console.error(err);
    return { error: true };
  }
}
