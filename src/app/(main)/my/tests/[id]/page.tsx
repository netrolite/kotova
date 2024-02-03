import MyTestActionBtns from "@/components/myTest/ActionBtns";
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
      <PageTitle className="mb-2">{test.name}</PageTitle>
      <MyTestActionBtns />
    </MyTestContextProvider>
  );
}
