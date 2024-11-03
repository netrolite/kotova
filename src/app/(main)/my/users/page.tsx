import PageTitle from "@/components/PageTitle";
import AllUsersList from "@/components/allUsers/List";
import getUsers from "@/lib/fetchers/allUsers/getUsers";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import { ROLE } from "@/lib/types/enums/Role";
import AccessDenied from "@/components/AccessDenied";

export default async function AllUsers() {
  const signedInUser = await getSignedInUserOrRedirect();
  if (signedInUser.role !== ROLE.ADMIN) return <AccessDenied />;
  const users = await getUsers({});

  return (
    <>
      <PageTitle className="mb-6">Пользователи</PageTitle>
      <div className="space-y-6">
        <AllUsersList users={users} />
      </div>
    </>
  );
}
