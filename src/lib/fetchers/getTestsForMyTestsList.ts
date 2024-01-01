import { User } from "@prisma/client";
import { cache } from "react";
import { db } from "../db";
import getPagination from "../getPagination";
import { GET_TESTS_FOR_MY_TEST_LIST_TESTS_PER_PAGE } from "../constants";

type Params = {
  user: User;
  page: number;
};

const getTestsForMyTestsList = cache(async ({ user, page }: Params) => {
  return db.test.findMany({
    where: { createdByUserId: user.id },
    ...getPagination({
      itemsPerPage: GET_TESTS_FOR_MY_TEST_LIST_TESTS_PER_PAGE,
      page,
    }),
    include: {
      subject: { select: { title: true } },
      testResults: { select: { id: true } },
    },
  });
});

export default getTestsForMyTestsList;
