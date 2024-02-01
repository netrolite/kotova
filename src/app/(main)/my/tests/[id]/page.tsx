import PageTitle from "@/components/PageTitle";

type Context = {
  params: { id: string };
};

export default async function MyTest({ params: { id: testId } }: Context) {
  return (
    <>
      <PageTitle>test page</PageTitle>
    </>
  );
}
