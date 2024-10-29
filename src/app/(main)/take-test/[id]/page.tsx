import TakeTestQuestions from "@/components/takeTest/Questions";
import takeTestGetTest from "@/lib/fetchers/takeTest/getTest";
import { notFound } from "next/navigation";
import TakeTestMetadataTitle from "@/components/takeTest/Metadata/Title";
import TakeTestMetadataCategory from "@/components/takeTest/Metadata/Category";
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

  return (
    <TakeTestContextProvider {...test}>
      <div className="mb-8 space-y-2">
        <div>
          <TakeTestMetadataTitle />
          <TakeTestMetadataCategory />
        </div>
        <TakeTestMetadataCreatedByUser />
      </div>
      <TakeTestFiles />
      <TakeTestQuestions />
    </TakeTestContextProvider>
  );
}
