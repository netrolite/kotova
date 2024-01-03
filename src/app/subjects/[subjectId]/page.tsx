import { z } from "zod";
import PageTitle from "@/components/PageTitle";
import SubjectTestListFilter from "@/components/routes/subjects/[subjectId]/Filter/Index";
import TestListSearch from "@/components/routes/subjects/[subjectId]/Search";
import SubjectTestList from "@/components/routes/subjects/[subjectId]/TestList/Index";
import getSubject from "@/lib/fetchers/getSubject";
import getSubjectTests from "@/lib/fetchers/getSubjectTests";
import parseUriComponent from "@/lib/parseUriComponent";
import { notFound } from "next/navigation";

type Context = {
  params: { subjectId: string };
  searchParams: { q?: string; grades?: string };
};

export default async function SubjectTests({
  params: { subjectId },
  searchParams: { q: queryRaw, grades: gradesRaw },
}: Context) {
  const grades = parseUriComponent(gradesRaw || "", z.number().array()) || [];
  const query = queryRaw || "";
  getSubjectTests({ query, subjectId, page: 0, grades });
  const subject = await getSubject(subjectId);
  if (!subject) notFound();

  return (
    <>
      <section className="mb-8 space-y-4">
        <PageTitle>Тесты по предмету {subject.title}</PageTitle>
        <div className="space-y-2">
          <TestListSearch initQuery={query} />
          <SubjectTestListFilter />
        </div>
      </section>

      <SubjectTestList {...{ query, grades, subjectId }} />
    </>
  );
}
