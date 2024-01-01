import { SUBJECT_TESTS_TESTS_PER_PAGE } from "../constants";
import { db } from "../db";
import getPagination from "../getPagination";

type Params = {
  subjectId: string;
  page: number;
};

export default async function getSubjectTests({ page, subjectId }: Params) {
  return db.test.findMany({
    where: { subjectId },
    ...getPagination({ page, itemsPerPage: SUBJECT_TESTS_TESTS_PER_PAGE }),
  });
}
