"use client";
import getCategoryTestsAction from "@/lib/actions/getCategoryTests";
import { CATEGORY_TESTS_TESTS_PER_PAGE } from "@/lib/constants";
import CategoryTestListCard from "../Card";
import InfiniteScroll from "@/components/InfiniteScroll";
import { CategoryTestListInfiniteScrollProps as CategoryTestListInfiniteScrollProps } from "./Index";

export default function CategoryTestListInfiniteScrollContent({
  grades,
  query,
  categoryId: categoryId,
  tests,
}: CategoryTestListInfiniteScrollProps) {
  return (
    <InfiniteScroll
      fetchAction={getCategoryTestsAction}
      fetchActionParams={{
        page: 0,
        grades,
        query,
        categoryId: categoryId,
      }}
      serverFetchResultsLength={tests.length}
      itemsPerPage={CATEGORY_TESTS_TESTS_PER_PAGE}
      render={(test) => <CategoryTestListCard {...test} />}
    />
  );
}
