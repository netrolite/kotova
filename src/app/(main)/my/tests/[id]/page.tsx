import MyTestActionBtns from "@/components/myTest/ActionBtns";
import MyTestResults from "@/components/myTest/ResultsList/Index";
import MyTestSearch from "@/components/myTest/Search";
import PageTitle from "@/components/PageTitle";
import MyTestContextProvider from "@/lib/contexts/myTest/provider";
import myTestGetTest from "@/lib/fetchers/myTest/getTest";
import { notFound } from "next/navigation";

type Context = {
  params: { id: string };
};

export default async function MyTest({ params: { id: testId } }: Context) {
  const test = await myTestGetTest(testId);
  if (!test) notFound();

  return (
    <MyTestContextProvider {...test}>
      <div className="space-y-6">
        <div className="space-y-2">
          <PageTitle>{test.name}</PageTitle>
          <MyTestActionBtns />
        </div>
        <div className="space-y-2">
          <MyTestSearch />
          <MyTestResults />
        </div>
      </div>
    </MyTestContextProvider>
  );
}
