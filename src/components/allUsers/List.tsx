"use client";

import { GENERIC_ERROR_MSG } from "@/lib/constants";
import Loading from "../Loading/Loading";
import Link from "next/link";
import useAllUsersListSwr from "@/lib/hooks/swr/allUsersList";
import flatten from "lodash/flatten";
import InfiniteScroll from "react-swr-infinite-scroll";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  GetUsersReturn,
  USERS_PER_PAGE,
} from "@/lib/fetchers/allUsers/getUsers";
import KeyValue from "../KeyValue";
import getUserRoleName from "@/lib/getUserRoleName";
import formatTestScore from "@/lib/formatTestScore";
import { Button } from "../ui/button";

export default function AllUsersList() {
  const swr = useAllUsersListSwr();
  const { data, error, isLoading } = swr;
  if (error) return <p>{GENERIC_ERROR_MSG}</p>;

  const isSearching = !data && isLoading;
  if (isSearching) return <Loading />;

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    (isEmpty || (data && data.at(-1)?.length < USERS_PER_PAGE)) ?? true;

  return (
    <ul className="space-y-2">
      <InfiniteScroll<GetUsersReturn>
        swr={swr}
        loadingIndicator={<Loading />}
        isReachingEnd={isReachingEnd}
      >
        {(users) =>
          users.map((user) => (
            <li key={user.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <KeyValue label="Электронная почта">
                    {user.email ?? "Нет данных"}
                  </KeyValue>
                  <KeyValue label="Номер телефона">
                    {user.phone ?? "Нет данных"}
                  </KeyValue>
                  <KeyValue label="Средний балл">
                    {formatTestScore(user.avgTestScore) ?? "Нет данных"}
                  </KeyValue>
                  <KeyValue label="Роль">{getUserRoleName(user.role)}</KeyValue>
                </CardContent>
                <CardFooter>
                  <Link href={`/users/${user.id ?? "deleted"}`}>
                    <Button variant="outline">Просмотреть профиль</Button>
                  </Link>
                </CardFooter>
              </Card>
            </li>
          ))
        }
      </InfiniteScroll>
    </ul>
  );
}
