import { cache } from "react";
import { db } from "../db";

const getCategories = cache(() => db.category.findMany());

export default getCategories;
