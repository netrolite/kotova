import PageTitle from "@/components/PageTitle";
import MyTestEditForm from "@/components/myTest/edit/Index";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import getSubjects from "@/lib/fetchers/getSubjects";
import myTestEditGetTest, {
  MyTestEditGetTestReturn,
} from "@/lib/fetchers/myTest/editGetTest";
import SelectItemType from "@/lib/types/SelectItem";
import { notFound } from "next/navigation";

export default async function MyTestEdit({
  params: { id: testId },
}: {
  params: { id: string };
}) {
  const [test, user, subjectsRaw] = await Promise.all([
    myTestEditGetTest(testId),
    getSignedInUserOrRedirect(),
    getSubjects(),
  ]);
  if (!test || test.createdByUserId !== user.id) notFound();

  const subjects: SelectItemType<string>[] = subjectsRaw.map((subject) => ({
    label: subject.title,
    value: subject.id,
  }));

  return (
    <>
      <PageTitle className="mb-10">Изменить тест {test.name}</PageTitle>
      <MyTestEditForm
        {...{ subjects, test: test as MyTestEditGetTestReturn }}
      />
    </>
  );
}
