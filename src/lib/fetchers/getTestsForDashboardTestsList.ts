import { User } from "@prisma/client";
import { cache } from "react";
import { db } from "../db";
import getPagination from "../getPagination";
import { DASHBOARD_TESTS_LIST_TESTS_PER_PAGE } from "../constants";

type Params = {
  user: User;
  page: number;
};

const getTestsForDashboardTestsList = cache(async ({ user, page }: Params) => {
  return db.test.findMany({
    where: { createdByUserId: user.id },
    ...getPagination({
      itemsPerPage: DASHBOARD_TESTS_LIST_TESTS_PER_PAGE,
      page,
    }),
    include: {
      subject: { select: { title: true } },
      testResults: { select: { id: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
});

export default getTestsForDashboardTestsList;
