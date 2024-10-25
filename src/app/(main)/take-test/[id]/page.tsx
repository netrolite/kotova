import TakeTestQuestions from "@/components/takeTest/Questions";
import takeTestGetTest from "@/lib/fetchers/takeTest/getTest";
import { notFound } from "next/navigation";
import TakeTestMetadataTitle from "@/components/takeTest/Metadata/Title";
import TakeTestMetadataSubject from "@/components/takeTest/Metadata/Subject";
import TakeTestMetadataCreatedByUser from "@/components/takeTest/Metadata/TakenByUser/Index";
import TakeTestContextProvider from "@/lib/contexts/takeTest/Index/Provider";
import authOrRedirect from "@/lib/authOrRedirect";
import TakeTestFiles from "@/components/takeTest/Files/Index";

type Context = {
  params: { id: string };
};

export default async function TakeTest({ params: { id } }: Context) {
  const [test] = await Promise.all([takeTestGetTest(id), authOrRedirect()]);
  if (!test) notFound();
  console.log(test);

  return (
    <TakeTestContextProvider {...test}>
      <div className="mb-8 space-y-2">
        <div>
          <TakeTestMetadataTitle />
          <TakeTestMetadataSubject />
        </div>
        <TakeTestMetadataCreatedByUser />
      </div>
      <TakeTestFiles />
      <TakeTestQuestions />
    </TakeTestContextProvider>
  );
}
