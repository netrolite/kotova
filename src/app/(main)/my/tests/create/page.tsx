import AccessDenied from "@/components/AccessDenied";
import PageTitle from "@/components/PageTitle";
import AddTestForm from "@/components/dashboard/tests/add/Form/Index";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import getCategories from "@/lib/fetchers/getCategories";
import SelectItemType from "@/lib/types/SelectItem";
import { ROLE } from "@/lib/types/enums/Role";
import getFiles from "@/lib/fetchers/getFiles";

export default async function AddTest() {
  const [categoriesRaw, existingFiles, user] = await Promise.all([
    getCategories(),
    getFiles(),
    getSignedInUserOrRedirect(),
  ]);
  if (user.role !== ROLE.TEACHER && user.role !== ROLE.ADMIN) {
    return <AccessDenied />;
  }
  const categories: SelectItemType<string>[] = categoriesRaw.map(
    (category) => ({
      label: category.title,
      value: category.id,
    }),
  );

  return (
    <>
      <PageTitle className="mb-10">Создать тест</PageTitle>
      <AddTestForm {...{ categories, existingFiles }} />
    </>
  );
}
