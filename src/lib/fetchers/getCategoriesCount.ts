import { cache } from "react";
import { db } from "../db";

const getCategoriesCount = cache(() => db.category.count());

export default getCategoriesCount;
