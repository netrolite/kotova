"use client";
import getSubjectTestsAction from "@/lib/actions/getSubjectTests";
import { SUBJECT_TESTS_TESTS_PER_PAGE } from "@/lib/constants";
import SubjectTestListCard from "../Card";
import InfiniteScroll from "@/components/InfiniteScroll";
import { SubjectTestListInfiniteScrollProps } from "./Index";

export default function SubjectTestListInfiniteScrollContent({
  grades,
  query,
  subjectId,
  tests,
}: SubjectTestListInfiniteScrollProps) {
  return (
    <InfiniteScroll
      fetchAction={getSubjectTestsAction}
      fetchActionParams={{
        page: 0,
        grades,
        query,
        subjectId,
      }}
      serverFetchResultsLength={tests.length}
      itemsPerPage={SUBJECT_TESTS_TESTS_PER_PAGE}
      render={(test) => <SubjectTestListCard {...test} />}
    />
  );
}
