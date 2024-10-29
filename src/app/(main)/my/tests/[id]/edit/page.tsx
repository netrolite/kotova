import PageTitle from "@/components/PageTitle";
import MyTestEditForm from "@/components/myTest/edit/Index";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import getCategories from "@/lib/fetchers/getCategories";
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
  const [test, user, categoriesRaw] = await Promise.all([
    myTestEditGetTest(testId),
    getSignedInUserOrRedirect(),
    getCategories(),
  ]);
  if (!test || test.createdByUserId !== user.id) notFound();

  const categories: SelectItemType<string>[] = categoriesRaw.map(
    (category) => ({
      label: category.title,
      value: category.id,
    }),
  );

  return (
    <>
      <PageTitle className="mb-10">Изменить тест {test.name}</PageTitle>
      <MyTestEditForm
        {...{ categories, test: test as MyTestEditGetTestReturn }}
      />
    </>
  );
}
