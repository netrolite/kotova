import TakeTestQuestions from "@/components/takeTest/Questions";
import takeTestGetTest from "@/lib/fetchers/takeTest/getTest";
import { notFound } from "next/navigation";
import TakeTestMetadataTitle from "@/components/takeTest/Metadata/Title";
import TakeTestMetadataSubject from "@/components/takeTest/Metadata/Subject";
import TakeTestMetadataCreatedByUser from "@/components/takeTest/Metadata/TakenByUser/Index";
import TakeTestContextProvider from "@/lib/contexts/takeTest/Index/Provider";

type Context = {
  params: { id: string };
};

export default async function TakeTest({ params: { id } }: Context) {
  const test = await takeTestGetTest(id);
  if (!test) notFound();

  return (
    <TakeTestContextProvider {...test}>
      <div className="mb-8 space-y-2">
        <div className="flex flex-col">
          <TakeTestMetadataTitle />
          <TakeTestMetadataSubject />
        </div>
        <TakeTestMetadataCreatedByUser />
      </div>
      <TakeTestQuestions />
    </TakeTestContextProvider>
  );
}
