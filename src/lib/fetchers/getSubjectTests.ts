import { cache } from "react";
import { SUBJECT_TESTS_TESTS_PER_PAGE } from "../constants";
import { db } from "../db";
import getPagination from "../getPagination";

export type GetSubjectsTestsParams = {
  subjectId: string;
  query: string;
  page: number;
  grades: number[];
};

const getSubjectTests = cache(
  async ({ query, subjectId, page, grades }: GetSubjectsTestsParams) => {
    return db.test.findMany({
      where: {
        subjectId,
        name: { contains: query || undefined, mode: "insensitive" },
        grades: grades.length ? { hasSome: grades } : undefined,
      },
      include: { createdBy: true, testResults: { select: { id: true } } },
      ...getPagination({ page, itemsPerPage: SUBJECT_TESTS_TESTS_PER_PAGE }),
    });
  },
);

export default getSubjectTests;
