"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import getSubjectTests from "@/lib/fetchers/getSubjectTests";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const SubjectTestListInfiniteScrollContent = dynamic(
  () => import("./Content"),
  { loading: () => <Loading /> },
);

export type SubjectTestListInfiniteScrollProps = {
  query: string;
  grades: number[];
  subjectId: string;
  tests: Awaited<ReturnType<typeof getSubjectTests>>;
};

export default function SubjectTestListInfiniteScroll(
  props: SubjectTestListInfiniteScrollProps,
) {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) setHasReachedBottom(true);
  }, [inView]);
  return (
    <>
      <div ref={ref} />
      {hasReachedBottom && <SubjectTestListInfiniteScrollContent {...props} />}
    </>
  );
}
