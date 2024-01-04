import PageTitle from "@/components/PageTitle";
import AddTestSubjectsCombobox from "@/components/routes/my/tests/add/SubjectsCombobox/Index";

export default async function AddTest() {
  return (
    <>
      <PageTitle className="mb-4">Добавить новый тест</PageTitle>
      <AddTestSubjectsCombobox />
    </>
  );
}
