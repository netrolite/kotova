import PageTitle from "@/components/PageTitle";
import SwrProvider from "@/components/SwrProvider";
import AllUsersList from "@/components/allUsers/List";
import AllUsersSearch from "@/components/allUsers/Search";
import { unstable_serialize as unstable_serializeInfinite } from "swr/infinite";
import getUsers from "@/lib/fetchers/allUsers/getUsers";
import allUsersGetKey from "@/lib/fetchers/allUsers/getKey";
import getSignedInUserOrRedirect from "@/lib/fetchers/getSignedInUserOrRedirect";
import { ROLE } from "@/lib/types/enums/Role";
import AccessDenied from "@/components/AccessDenied";

export default async function AllUsers() {
  const signedInUser = await getSignedInUserOrRedirect();
  if (signedInUser.role !== ROLE.ADMIN) return <AccessDenied />;

  const usersFirstPage = await getUsers({ page: 0 });

  return (
    <>
      <PageTitle className="mb-6">Пользователи</PageTitle>
      <SwrProvider
        config={{
          fallback: {
            [unstable_serializeInfinite(allUsersGetKey)]: [usersFirstPage],
          },
        }}
      >
        <div className="space-y-6">
          <AllUsersSearch />
          <AllUsersList />
        </div>
      </SwrProvider>
    </>
  );
}
