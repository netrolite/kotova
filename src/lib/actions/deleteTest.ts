"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import ServerActionReturn from "../types/ServerActionReturn";
import DeleteTestSchema from "../zod/schemas/deleteTest";
import s3 from "../s3";
import S3 from "aws-sdk/clients/s3";
import getEnvVar from "../getEnvVar";

export default async function deleteTestAction(
  data: unknown,
): Promise<ServerActionReturn<true, string | boolean>> {
  console.log("delete test");

  const session = await auth();
  if (!session?.user?.id) return { error: "no credentials provided" };

  const validationResult = DeleteTestSchema.safeParse(data);
  if (!validationResult.success) return { error: "invalid data" };
  const {
    data: { testId },
  } = validationResult;

  try {
    const test = await db.test.delete({
      where: { id: testId },
      include: { files: true },
    });
    const params: S3.DeleteObjectsRequest = {
      Bucket: getEnvVar("S3_BUCKET_NAME"),
      Delete: {
        Objects: test.files.map((file) => ({ Key: file.key })),
      },
    };
    const filesDeletionResult = await s3.deleteObjects(params).promise();
    console.log(filesDeletionResult);

    revalidatePath("/my/tests");
    return { data: true };
  } catch (err) {
    console.log(err);
    return { error: true };
  }
}
