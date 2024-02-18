import PageTitle from "@/components/PageTitle";
import SwrProvider from "@/components/SwrProvider";
import AllUsersList from "@/components/allUsers/List";
import AllUsersSearch from "@/components/allUsers/Search";
import { unstable_serialize as unstable_serializeInfinite } from "swr/infinite";
import getUsers from "@/lib/fetchers/allUsers/getUsers";
import allUsersGetKey from "@/lib/fetchers/allUsers/getKey";

export default async function AllUsers() {
  const users = await getUsers({ page: 0 });

  return (
    <>
      <PageTitle className="mb-6">Пользователи</PageTitle>
      <SwrProvider
        config={{
          fallback: {
            [unstable_serializeInfinite(allUsersGetKey)]: [users],
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
