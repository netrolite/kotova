"use client";

import Loading from "@/components/Loading/Loading";
import { useEffect, useState, ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import deepCopy from "@/lib/deepCopy";
import { MY_TESTS_LIST_TESTS_PER_PAGE } from "@/lib/constants";

type Props<T, K> = {
  serverFetchResultsLength: number;
  fetchAction: (data: K) => Promise<Array<T>>;
  fetchActionParams: K;
  render: (data: T) => ReactNode;
  itemsPerPage: number;
};

export default function InfiniteScroll<T, K>({
  serverFetchResultsLength,
  render,
  fetchAction,
  fetchActionParams,
}: Props<T, K>) {
  const [page, setPage] = useState(1);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [data, setData] = useState<Array<T>>([]);
  const { ref, inView } = useInView();

  if (serverFetchResultsLength < MY_TESTS_LIST_TESTS_PER_PAGE) {
    setHasReachedEnd(true);
  }

  // DO NOT add `page` to the dependency array!
  // if you do, it will fetch 2 pages instead of 1!
  useEffect(() => {
    const fetchData = async () => {
      if (!inView || hasReachedEnd) return;
      const newTests = await fetchAction({ ...fetchActionParams, page });
      if (newTests.length < MY_TESTS_LIST_TESTS_PER_PAGE) {
        setHasReachedEnd(true);
      } else {
        setPage((prev) => prev + 1);
        setData((prev) => [...deepCopy(prev), ...newTests]);
      }
    };

    fetchData();
  }, [inView, hasReachedEnd, fetchAction]);

  return (
    <>
      {data.map((d, index) => (
        <div key={index}>{render(d)}</div>
      ))}
      {!hasReachedEnd && (
        <div ref={ref}>
          <Loading />
        </div>
      )}
    </>
  );
}
