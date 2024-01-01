"use client";

import InfiniteScroll from "@/components/InfiniteScroll";
import getSubjectTestsAction from "@/lib/actions/getSubjectTests";
import { SUBJECT_TESTS_TESTS_PER_PAGE } from "@/lib/constants";
import TestListCard from "../../tests/[subjectId]/TestList/Card";

type Props = {
  serverFetchResultsLength: number;
  grades: number[];
  query: string;
  subjectId: string;
};

export default function TestListInfiniteScroll({
  serverFetchResultsLength,
  grades,
  query,
  subjectId,
}: Props) {
  return (
    <>
      <InfiniteScroll
        fetchAction={getSubjectTestsAction}
        fetchActionParams={{
          page: 0, // the component will just ignore this but i have to specify it cuz im not a typescript wizard
          grades,
          query,
          subjectId,
        }}
        serverFetchResultsLength={serverFetchResultsLength}
        itemsPerPage={SUBJECT_TESTS_TESTS_PER_PAGE}
        render={(data) => <TestListCard {...data} />}
      />
    </>
  );
}
