"use client";

import InfiniteScroll from "@/components/InfiniteScroll";
import getTestsForDashboardTestsListAction from "@/lib/actions/getTestsForDashboardTestsList";
import { DASHBOARD_TESTS_LIST_TESTS_PER_PAGE } from "@/lib/constants";
import getTestsForDashboardTestsList from "@/lib/fetchers/getTestsForDashboardTestsList";
import DashboardTestsTestListTest from "./Test";

type Props = {
  tests: Awaited<ReturnType<typeof getTestsForDashboardTestsList>>;
};

export default function DashboardTestsTestListInfiniteScroll({ tests }: Props) {
  return (
    <InfiniteScroll
      serverFetchResultsLength={tests.length}
      fetchAction={getTestsForDashboardTestsListAction}
      fetchActionParams={{ page: 0 }}
      itemsPerPage={DASHBOARD_TESTS_LIST_TESTS_PER_PAGE}
      render={(test) => <DashboardTestsTestListTest {...test} />}
    />
  );
}
