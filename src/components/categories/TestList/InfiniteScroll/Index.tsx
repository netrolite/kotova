"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import getCategoryTests from "@/lib/fetchers/getCategoryTests";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const CategoryTestListInfiniteScrollContent = dynamic(
  () => import("./Content"),
  { loading: () => <Loading /> },
);

export type CategoryTestListInfiniteScrollProps = {
  query: string;
  grades: number[];
  categoryId: string;
  tests: Awaited<ReturnType<typeof getCategoryTests>>;
};

export default function CategoryTestListInfiniteScroll(
  props: CategoryTestListInfiniteScrollProps,
) {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) setHasReachedBottom(true);
  }, [inView]);
  return (
    <>
      <div ref={ref} />
      {hasReachedBottom && <CategoryTestListInfiniteScrollContent {...props} />}
    </>
  );
}
