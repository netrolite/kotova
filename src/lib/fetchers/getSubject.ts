import { cache } from "react";
import { db } from "../db";

const getSubject = cache((id: string) =>
  db.subject.findFirst({ where: { id } }),
);

export default getSubject;
