"use client";

import InfiniteScroll from "@/components/InfiniteScroll";
import getTestsForMyTestsListAction from "@/lib/actions/getTestsForMyTestsList";
import { MY_TESTS_LIST_TESTS_PER_PAGE } from "@/lib/constants";
import getTestsForMyTestsList from "@/lib/fetchers/getTestsForMyTestsList";
import MyTestsTestListTest from "./Test";

type Props = {
  tests: Awaited<ReturnType<typeof getTestsForMyTestsList>>;
};

export default function MyTestsTestListInfiniteScroll({ tests }: Props) {
  return (
    <InfiniteScroll
      serverFetchResultsLength={tests.length}
      fetchAction={getTestsForMyTestsListAction}
      fetchActionParams={{ page: 0 }}
      itemsPerPage={MY_TESTS_LIST_TESTS_PER_PAGE}
      render={(test) => <MyTestsTestListTest {...test} />}
    />
  );
}
