import { cache } from "react";
import { CATEGORY_TESTS_TESTS_PER_PAGE } from "../constants";
import { db } from "../db";
import getPagination from "../getPagination";

export type GetCategoriesTestsParams = {
  categoryId: string;
  query: string;
  page: number;
  grades: number[];
};

const getCategoryTests = cache(
  async ({
    query,
    categoryId: categoryId,
    page,
    grades,
  }: GetCategoriesTestsParams) => {
    return db.test.findMany({
      where: {
        categoryId: categoryId,
        name: { contains: query || undefined, mode: "insensitive" },
        grades: grades.length ? { hasSome: grades } : undefined,
      },
      include: { createdBy: true, testResults: { select: { id: true } } },
      ...getPagination({ page, itemsPerPage: CATEGORY_TESTS_TESTS_PER_PAGE }),
      orderBy: { createdAt: "desc" },
    });
  },
);

export default getCategoryTests;
