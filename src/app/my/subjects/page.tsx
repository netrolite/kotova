import PageTitle from "@/components/PageTitle";
import AddSubjectBtn from "@/components/routes/my/subjects/Add/Btn";
import SubjectsList from "@/components/routes/my/subjects/SubjectsList";

export default async function Subjects() {
  return (
    <>
      <div className="mb-8">
        <PageTitle className="mb-2">Предметы</PageTitle>
        <AddSubjectBtn />
      </div>
      <SubjectsList />
    </>
  );
}
