"use server";

import { auth } from "@/auth";
import ServerActionReturn from "../types/ServerActionReturn";
import { UploadedFileSchemaType } from "../zod/schemas/addTestForm/Files";
import { s3Upload } from "../s3";
import S3UploadResultSchema from "../zod/schemas/S3UploadResult";
import { db } from "../db";
import { z } from "zod";

const FormDataSchema = z.instanceof(FormData);

export default async function uploadFileAction(
  data: unknown,
): Promise<ServerActionReturn<UploadedFileSchemaType, string | true>> {
  try {
    console.log("uploadFileAction");
    const session = await auth();
    const validationResult = FormDataSchema.safeParse(data);
    console.log("validationResult:");
    console.log(validationResult);

    if (!validationResult.success || !session?.user) {
      throw new Error("invalid input data");
    }
    const { data: formData } = validationResult;

    const formDataFile = formData.get("file");
    console.log(formDataFile);

    const fileValidationResult = z.instanceof(File).safeParse(formDataFile);
    if (!fileValidationResult.success) {
      throw new Error("invalid form data");
    }
    const { data: file } = fileValidationResult;

    const uint8Array = new Uint8Array(await file.arrayBuffer());

    const uploadResultRaw = await s3Upload(uint8Array, file.name);
    const uploadResultValidated =
      S3UploadResultSchema.safeParse(uploadResultRaw);
    if (!uploadResultValidated.success)
      throw new Error("invalid S3UploadResult");

    const upload = {
      filename: file.name,
      byteLength: uint8Array.byteLength,
      key: uploadResultValidated.data.Key,
      contentType: file.type,
    };

    await db.testFile.create({
      data: { ...upload, createdByUserId: session.user.id },
    });

    return { data: upload };
  } catch (err) {
    console.log(err);
    return { error: JSON.stringify(err) };
  }
}
