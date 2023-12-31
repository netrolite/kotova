import { Subject } from "@prisma/client";
import axios from "axios";
import { cache } from "react";

const getSubjects = cache(async (url: string) => {
  const resp = await axios.get<Subject[]>("/api/subjects");
  return resp.data;
});

export default getSubjects;
