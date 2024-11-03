import { headers as getHeaders } from "next/headers";

export default async function getUrlFromHeaders() {
  const headers = await getHeaders();
  return headers.get("x-url") || headers.get("referer") || null;
}
