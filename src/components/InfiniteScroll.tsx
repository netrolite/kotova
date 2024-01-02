import Loading from "@/components/Loading/Loading";
import { useEffect, useState, ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import deepCopy from "@/lib/deepCopy";
import { MY_TESTS_LIST_TESTS_PER_PAGE } from "@/lib/constants";

type Props<T, K> = {
  serverFetchResultsLength: number;
  fetchAction: (data: K) => Promise<T[]>;
  fetchActionParams: K;
  render: (data: T) => ReactNode;
  itemsPerPage: number;
};

const INIT_PAGE = 1;

/**
 * You need to specify the `page` property of the fetchActionParams prop,
 * but it will be ignored. I just couldn't figure out the types lol
 */
export default function InfiniteScroll<T, K>({
  serverFetchResultsLength,
  render,
  fetchAction,
  fetchActionParams,
  itemsPerPage,
}: Props<T, K>) {
  const [page, setPage] = useState(INIT_PAGE);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [data, setData] = useState<Array<T>>([]);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (serverFetchResultsLength < MY_TESTS_LIST_TESTS_PER_PAGE) {
      setHasReachedEnd(true);
    }
  }, [serverFetchResultsLength]);

  // DO NOT add `page` to the dependency array!
  // if you do, it will fetch 2 pages instead of 1!
  useEffect(() => {
    const fetchData = async () => {
      if (!inView || hasReachedEnd) return;
      const newTests = await fetchAction({ ...fetchActionParams, page });
      if (newTests.length < itemsPerPage) {
        setHasReachedEnd(true);
      } else {
        setPage((prev) => prev + 1);
      }
      setData((prev) => [...deepCopy(prev), ...newTests]);
    };

    fetchData();
  }, [inView, hasReachedEnd, fetchAction, fetchActionParams]);

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
