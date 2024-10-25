import S3 from "aws-sdk/clients/s3";
import getEnvVar from "./getEnvVar";
import { z } from "zod";
import { nanoid } from "nanoid";
import mime from "mime-types";

const s3 = new S3({
  signatureVersion: "v4",
  endpoint: getEnvVar("S3_ENDPOINT"),
  credentials: {
    accessKeyId: getEnvVar("S3_ACCESS_KEY_ID"),
    secretAccessKey: getEnvVar("S3_SECRET_ACCESS_KEY"),
  },
});

export async function s3Upload(
  body: ArrayBuffer,
  filename: string,
): Promise<any> {
  const mimeType = mime.lookup(filename) || "application/octet-stream";

  const result = await s3
    .upload({
      Bucket: getEnvVar("S3_BUCKET_NAME"),
      Key: nanoid(),
      Body: body,
      ContentType: mimeType,
    })
    .promise();
  return result;
}

type S3GetSignedUrlParams = {
  objectKey: string;
  expirationSecs: number;
};

export async function s3GetSignedUrl({
  objectKey,
  expirationSecs,
}: S3GetSignedUrlParams) {
  const params: { [key: string]: unknown } = {
    Bucket: getEnvVar("S3_BUCKET_NAME"),
    Key: objectKey,
    Expires: expirationSecs, // Time in seconds until the URL expires
  };

  const url = await s3.getSignedUrlPromise("getObject", params);

  if (z.string().safeParse(url).success !== true) {
    throw new Error("could not parse signed url");
  }
  return url;
}

export default s3;
