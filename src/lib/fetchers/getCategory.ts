import { cache } from "react";
import { db } from "../db";

const getCategory = cache((id: string) =>
  db.category.findFirst({ where: { id } }),
);

export default getCategory;
