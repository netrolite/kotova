import { z } from "zod";

const S3UploadResultSchema = z.object({
  Location: z.string(),
  Key: z.string(),
  Bucket: z.string(),
});

export default S3UploadResultSchema;
export type S3UploadResultSchemaType = z.infer<typeof S3UploadResultSchema>;

/*
{
  ETag: '"2728fdab08aaa4acce5ecbc54c15cc5e"',
  VersionId: '4_z44200a9db0ad8af790250a1a_f416af4d414c682a5_d20241016_m112332_c002_v0001169_t0050_u01729077812449',
  Location: 'https://kotova.s3.us-west-002.backblazeb2.com/6pn-IkozbBwhtkiA-JCMN',
  key: '6pn-IkozbBwhtkiA-JCMN',
  Key: '6pn-IkozbBwhtkiA-JCMN',
  Bucket: 'kotova'
}

*/
