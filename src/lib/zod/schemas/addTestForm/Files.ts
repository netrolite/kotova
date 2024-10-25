import { z } from "zod";

export const FileSchema = z.object({
  filename: z.string(),
  arrayBuffer: z.instanceof(ArrayBuffer),
});

export const UploadedFileSchema = z.object({
  filename: z.string(),
  byteLength: z.number(),
  key: z.string(),
  contentType: z.string(),
});

export type FileSchemaType = z.infer<typeof FileSchema>;
export type UploadedFileSchemaType = z.infer<typeof UploadedFileSchema>;
