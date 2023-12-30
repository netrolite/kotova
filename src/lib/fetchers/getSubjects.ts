import { Subject } from "@prisma/client";
import axios from "axios";

export default async function getSubjects(url: string) {
  const resp = await axios.get<Subject[]>("/api/subjects");
  return resp.data;
}
