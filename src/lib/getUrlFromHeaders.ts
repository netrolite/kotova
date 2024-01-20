import { headers as getHeaders } from "next/headers";
export default function getUrlFromHeaders() {
  const headers = getHeaders();
  return headers.get("x-url") || headers.get("referer") || null;
}
