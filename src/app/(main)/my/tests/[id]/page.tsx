import MyTestActionBtns from "@/components/myTest/ActionBtns";
import MyTestFilters from "@/components/myTest/Filters";
import MyTestResults from "@/components/myTest/Results/Index";
import MyTestSearch from "@/components/myTest/Search";
import PageTitle from "@/components/PageTitle";
import SwrProvider from "@/components/SwrProvider";
import { swrKeys } from "@/lib/constants";
import MyTestContextProvider from "@/lib/contexts/myTest/provider";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import myTestGetTest from "@/lib/fetchers/myTest/getTest";
import myTestGetTestResults from "@/lib/fetchers/myTest/getTestResults";
import { notFound } from "next/navigation";
import { unstable_serialize } from "swr";

type Context = {
  params: { id: string };
};

export default async function MyTest({ params: { id: testId } }: Context) {
  const [test, user, testResults] = await Promise.all([
    myTestGetTest(testId),
    getSignedInUserOrRedirect(),
    myTestGetTestResults({ testId }),
  ]);
  if (!test || user.id !== test?.createdByUserId) notFound();

  return (
    <MyTestContextProvider {...{ test, testResults }}>
      <div className="space-y-12">
        <div className="space-y-2">
          <PageTitle>{test.name}</PageTitle>
          <MyTestActionBtns />
        </div>
        <div className="space-y-6">
          <SwrProvider
            config={{
              fallback: {
                [unstable_serialize([swrKeys.myTest, testId])]: testResults,
              },
            }}
          >
            <div className="space-y-1">
              <MyTestSearch />
              <MyTestFilters />
            </div>
            <MyTestResults />
          </SwrProvider>
        </div>
      </div>
    </MyTestContextProvider>
  );
}
