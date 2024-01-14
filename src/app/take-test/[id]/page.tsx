import PageTitle from "@/components/PageTitle";
import TakeTestQuestions from "@/components/takeTest/Questions";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import takeTestGetTest from "@/lib/fetchers/takeTest/getTest";
import { notFound } from "next/navigation";

type Context = {
  params: { id: string };
};

export default async function TakeTest({ params: { id } }: Context) {
  const [test] = await Promise.all([
    takeTestGetTest(id),
    getSignedInUserOrRedirect(),
  ]);
  if (!test) notFound();

  return (
    <>
      <PageTitle className="mb-8">{test.name}</PageTitle>
      <TakeTestQuestions {...test} />
    </>
  );
}
