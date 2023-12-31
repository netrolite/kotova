import { cache } from "react";
import { db } from "../db";

const getSubjects = cache(() => db.subject.findMany());

export default getSubjects;
