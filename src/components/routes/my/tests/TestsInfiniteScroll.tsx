"use client";

import Loading from "@/components/Loading/Loading";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import TestListTest from "./Test";
import deepCopy from "@/lib/deepCopy";
import getTestsForMyTestsListAction from "@/lib/actions/getTestsForMyTestsList";
import { GET_TESTS_FOR_MY_TEST_LIST_TESTS_PER_PAGE } from "@/lib/constants";
import wait from "@/lib/wait";

type Props = {
  serverFetchResultsLength: number;
};

export default function TestListTestsInfiniteScroll({
  serverFetchResultsLength,
}: Props) {
  const [page, setPage] = useState(1);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [tests, setTests] = useState<
    Awaited<ReturnType<typeof getTestsForMyTestsListAction>>
  >([]);
  const { ref, inView } = useInView();
  if (serverFetchResultsLength < GET_TESTS_FOR_MY_TEST_LIST_TESTS_PER_PAGE) {
    setHasReachedEnd(true);
  }

  // useFootgun!!! DO NOT add `page` as to the dependency array!
  // if you do, it will fetch 2 pages instead of 1
  useEffect(() => {
    (async () => {
      if (!inView || hasReachedEnd) return;
      const newTests = await getTestsForMyTestsListAction(page);
      if (newTests.length < GET_TESTS_FOR_MY_TEST_LIST_TESTS_PER_PAGE) {
        setHasReachedEnd(true);
      } else {
        setPage((prev) => prev + 1);
        setTests((prev) => [...deepCopy(prev), ...newTests]);
      }
    })();
  }, [inView, hasReachedEnd]);

  return (
    <>
      {tests.map((test) => (
        <TestListTest test={test} key={test.id} />
      ))}
      {!hasReachedEnd && (
        <div ref={ref}>
          <Loading />
        </div>
      )}
    </>
  );
}
