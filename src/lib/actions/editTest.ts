"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import getSignedInUserOrRedirect from "../fetchers/getSignedInUserOrRedirect";
import ServerActionReturn from "../types/ServerActionReturn";
import MyTestEditFormSchema, {
  MyTestEditFormSchemaType,
} from "../zod/schemas/myTestEditForm/Index";
import isEqual from "lodash/isEqual";
import areOverlappingPropertiesEqual from "../areOverlappingPropertiesEqual";
import { TestQuestion } from "@prisma/client";

export default async function editTestAction(
  data: unknown,
): Promise<ServerActionReturn<boolean, string | boolean>> {
  const { id: userId } = await getSignedInUserOrRedirect();
  const validationResult = MyTestEditFormSchema.safeParse(data);
  if (!validationResult.success) return { error: "invalid data" };
  const { data: newTestData } = validationResult;

  try {
    const testToUpdate = await getTestToUpdate(newTestData.testId);
    if (!testToUpdate) return { error: "test not found" };

    // purposefully not using Promise.all for parallelizing these operations
    // to decrease the load on the database
    await updateTest(newTestData, userId);

    await createQuestionsAndOptions(testToUpdate, newTestData);
    await createOptionsForExistingQuestions(testToUpdate, newTestData);

    await deleteQuestions(testToUpdate, newTestData);
    await deleteOptionsForExistingQuestions(testToUpdate, newTestData);

    await updateQuestions(testToUpdate, newTestData);
    await updateOptions(testToUpdate, newTestData);

    revalidatePath("/my/tests");
    revalidatePath(`/my/tests/${newTestData.testId}`);
    revalidatePath(`/my/tests/${newTestData.testId}/edit`);
    revalidatePath(`/take-test/${newTestData.testId}`);
    return { data: true };
  } catch (err) {
    console.error(err);
    return { error: true };
  }
}

function updateTest(newTestData: MyTestEditFormSchemaType, userId: string) {
  const { subjectId: _, questions: __, ...safeTestData } = newTestData;
  return db.test.update({
    where: { id: newTestData.testId },
    data: {
      ...safeTestData,
      subject: { connect: { id: newTestData.subjectId } },
      createdBy: { connect: { id: userId } },
    },
  });
}

function getTestToUpdate(testId: string) {
  return db.test.findFirst({
    where: { id: testId },
    include: {
      questions: {
        include: {
          options: {
            select: {
              id: true,
              content: true,
              isCorrect: true,
              tableColumn: true,
              tableColumnAnswer: true,
            },
          },
        },
      },
    },
  });
}

type GetTestToUpdateReturn = Exclude<
  Awaited<ReturnType<typeof getTestToUpdate>>,
  null
>;

function createQuestionsAndOptions(
  testToUpdate: GetTestToUpdateReturn,
  newTestData: MyTestEditFormSchemaType,
) {
  const questionsToCreate = newTestData.questions.filter((q) => q.id === null);

  const createdQuestionsPromises: Promise<TestQuestion>[] = [];
  for (const questionToCreate of questionsToCreate) {
    const optionsToCreate = questionToCreate.options.map((opt) => ({
      ...opt,
      id: undefined,
    }));
    const createdQuestionPromise = db.testQuestion.create({
      data: {
        ...questionToCreate,
        id: undefined,
        options: { create: optionsToCreate },
        test: { connect: { id: testToUpdate.id } },
      },
      include: { options: true },
    });
    createdQuestionsPromises.push(createdQuestionPromise);
  }

  return Promise.all(createdQuestionsPromises);
}

async function deleteQuestions(
  testToUpdate: GetTestToUpdateReturn,
  newTestData: MyTestEditFormSchemaType,
) {
  const questionsToDeleteIds = testToUpdate.questions
    .filter((q) => !newTestData.questions.map((q) => q.id).includes(q.id))
    .map((q) => q.id);
  return await db.testQuestion.deleteMany({
    where: { id: { in: questionsToDeleteIds } },
  });
}

async function createOptionsForExistingQuestions(
  testToUpdate: GetTestToUpdateReturn,
  newTestData: MyTestEditFormSchemaType,
) {
  const testToUpdateOptions = getOptionsFromTestToUpdate(testToUpdate);
  const newTestDataOptions = getOptionsFromNewTestData(newTestData);
  const optionsToCreate = newTestDataOptions.filter((newTestDataOption) => {
    // don't create if the question this option is assigned to is also new
    if (!newTestDataOption.testQuestionId) return false;
    const matchingTestToUpdateOption = testToUpdateOptions.find(
      (testToUpdateOption) => testToUpdateOption.id === newTestDataOption.id,
    );
    if (!matchingTestToUpdateOption) return true;
    return false;
  });
  const createdOptionsPromises: Promise<any>[] = [];
  for (const optionToCreate of optionsToCreate) {
    const createdOptionPromise = db.testQuestionOption.create({
      data: {
        ...optionToCreate,
        id: undefined,
        testQuestionId: undefined,
        testQuestion: { connect: { id: optionToCreate.testQuestionId! } },
      },
    });
    createdOptionsPromises.push(createdOptionPromise);
  }

  return Promise.all(createdOptionsPromises);
}

async function deleteOptionsForExistingQuestions(
  testToUpdate: GetTestToUpdateReturn,
  newTestData: MyTestEditFormSchemaType,
) {
  const testToUpdateOptions = getOptionsFromTestToUpdate(testToUpdate);
  const newTestDataOptions = getOptionsFromNewTestData(newTestData);
  const optionsToDelete = testToUpdateOptions.filter((testToUpdateOption) => {
    // don't delete the option if the question it's assigned to is also deleted
    // to avoid a race condition (race conditions are bad!!!)
    const newTestDataOptionQuestion = newTestData.questions.find(
      (q) => q.id === testToUpdateOption.testQuestionId,
    );
    if (!newTestDataOptionQuestion) return false;
    const matchingNewTestDataOption = newTestDataOptions.find(
      (newTestDataOption) => newTestDataOption.id === testToUpdateOption.id,
    );
    if (!matchingNewTestDataOption) return true;
    return false;
  });
  const deletedOptionsPromises: Promise<any>[] = [];
  for (const optionToDelete of optionsToDelete) {
    const deletedOptionPromise = db.testQuestionOption.delete({
      where: { id: optionToDelete.id },
    });
    deletedOptionsPromises.push(deletedOptionPromise);
  }

  return Promise.all(deletedOptionsPromises);
}

async function updateQuestions(
  testToUpdate: GetTestToUpdateReturn,
  newTestData: MyTestEditFormSchemaType,
) {
  const questionsToUpdate = newTestData.questions.filter(
    (newTestDataQuestion) => {
      const matchingTestToUpdateQuestion = testToUpdate.questions.find(
        (testToUpdateQuestion) =>
          testToUpdateQuestion.id === newTestDataQuestion.id,
      );
      if (!matchingTestToUpdateQuestion) return false;
      const { options: _, ...matchingTestToUpdateQuestionWithoutOptions } =
        matchingTestToUpdateQuestion;

      const needsToBeUpdated = !areOverlappingPropertiesEqual(
        newTestDataQuestion,
        matchingTestToUpdateQuestionWithoutOptions,
      );
      return needsToBeUpdated;
    },
  );

  const updatedQuestionsPromises: Promise<TestQuestion>[] = [];
  for (const questionToUpdate of questionsToUpdate) {
    const updatedQuestionPromise = db.testQuestion.update({
      where: { id: questionToUpdate.id! },
      data: { ...questionToUpdate, id: undefined, options: undefined },
    });
    updatedQuestionsPromises.push(updatedQuestionPromise);
  }
  return Promise.all(updatedQuestionsPromises);
}

async function updateOptions(
  testToUpdate: GetTestToUpdateReturn,
  newTestData: MyTestEditFormSchemaType,
) {
  const newTestDataOptions = getOptionsFromNewTestData(newTestData);
  const testToUpdateOptions = getOptionsFromTestToUpdate(testToUpdate);

  const optionsToUpdate = newTestDataOptions.filter((newTestDataOption) => {
    const matchingTestToUpdateOption = testToUpdateOptions.find(
      (testToUpdateOption) => testToUpdateOption.id === newTestDataOption.id,
    );
    if (!matchingTestToUpdateOption) return false;
    const needsToBeUpdated = !isEqual(
      newTestDataOption,
      matchingTestToUpdateOption,
    );
    return needsToBeUpdated;
  });

  const updatedOptionsPromises: Promise<any>[] = [];

  for (const optionToUpdate of optionsToUpdate) {
    const updatedOptionPromise = db.testQuestionOption.update({
      where: { id: optionToUpdate.id! },
      data: { ...optionToUpdate, id: undefined, testQuestionId: undefined },
    });
    updatedOptionsPromises.push(updatedOptionPromise);
  }

  return Promise.all(updatedOptionsPromises);
}

function getOptionsFromNewTestData(newTestData: MyTestEditFormSchemaType) {
  const options: (MyTestEditFormSchemaType["questions"][number]["options"][number] & {
    testQuestionId: string | null;
  })[] = [];
  for (const question of newTestData.questions) {
    for (const option of question.options) {
      options.push({ ...option, testQuestionId: question.id });
    }
  }
  return options;
}

function getOptionsFromTestToUpdate(testToUpdate: GetTestToUpdateReturn) {
  const options: (MyTestEditFormSchemaType["questions"][number]["options"][number] & {
    id: string;
    testQuestionId: string;
  })[] = [];
  for (const question of testToUpdate.questions) {
    for (const option of question.options) {
      options.push({ ...option, testQuestionId: question.id });
    }
  }
  return options;
}
