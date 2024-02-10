"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import getSignedInUserOrRedirect from "../fetchers/getSignedInUserOrRedirect";
import ServerActionReturn from "../types/ServerActionReturn";
import MyTestEditFormSchema from "../zod/schemas/myTestEditForm/Index";

type EditTestActionReturn = {
  testId: string;
};

export default async function editTestAction(
  data: unknown,
): Promise<ServerActionReturn<EditTestActionReturn>> {
  const { id: userId } = await getSignedInUserOrRedirect();
  const validationResult = MyTestEditFormSchema.safeParse(data);
  if (!validationResult.success) return { error: true };
  const { data: testData } = validationResult;
  const { subjectId, questions, ...safeTestData } = testData;
  console.log(testData);

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

    for (let i = 0; i < questions.length; i++) {
      const optionsRaw = questions[i].options;
      const createdQuestion = createdQuestions[i];
      const options = optionsRaw.map((option) => ({
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
