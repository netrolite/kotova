"use client";

import InfiniteScroll from "@/components/InfiniteScroll";
import getSubjectTestsAction from "@/lib/actions/getSubjectTests";
import { SUBJECT_TESTS_TESTS_PER_PAGE } from "@/lib/constants";
import getSubjectTests from "@/lib/fetchers/getSubjectTests";
import SubjectTestListCard from "./Card";

type Props = {
  query: string;
  grades: number[];
  subjectId: string;
  tests: Awaited<ReturnType<typeof getSubjectTests>>;
};

export default function SubjectTestListInfiniteScroll({
  grades,
  query,
  subjectId,
  tests,
}: Props) {
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
