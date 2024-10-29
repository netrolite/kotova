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
): Promise<ServerActionReturn<UploadedFileSchemaType[], string | true>> {
  try {
    console.log("uploadFileAction");
    const session = await auth();
    const validationResult = FormDataSchema.safeParse(data);

    if (!validationResult.success || !session?.user) {
      throw new Error("invalid input data");
    }
    const { data: formData } = validationResult;

    const formDataFiles = formData.getAll("files[]");
    const filesValidationResult = z
      .instanceof(File)
      .array()
      .safeParse(formDataFiles);
    if (!filesValidationResult.success) {
      throw new Error("invalid form data");
    }
    const { data: files } = filesValidationResult;

    const uploads: UploadedFileSchemaType[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const decodedFilename = Buffer.from(file.name, "latin1").toString("utf8");

      const uint8Array = new Uint8Array(await file.arrayBuffer());

      const uploadResultRaw = await s3Upload(uint8Array, file.name);
      const uploadResultValidated =
        S3UploadResultSchema.safeParse(uploadResultRaw);
      if (!uploadResultValidated.success)
        throw new Error("invalid S3UploadResult");

      uploads.push({
        filename: decodedFilename,
        byteLength: uint8Array.byteLength,
        key: uploadResultValidated.data.Key,
        contentType: file.type,
      });
    }

    const uploadsForDb = uploads.map((upload) => ({
      ...upload,
      createdByUserId: session.user?.id,
    }));
    await db.testFile.createMany({ data: uploadsForDb });

    return { data: uploads };
  } catch (err) {
    console.log(err);
    return { error: JSON.stringify(err) };
  }
}
