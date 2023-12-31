import { cache } from "react";
import { db } from "../db";

const getSubjectsCount = cache(() => db.subject.count());

export default getSubjectsCount;
