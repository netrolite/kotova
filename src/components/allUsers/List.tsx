"use client";

import { GENERIC_ERROR_MSG } from "@/lib/constants";
import Loading from "../Loading/Loading";
import Link from "next/link";
import useAllUsersListSwr from "@/lib/hooks/swr/allUsersList";
import InfiniteScroll from "react-swr-infinite-scroll";
import {
  Card,
  CardContent,
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
import { ROLE, Role } from "@/lib/types/enums/Role";
import changeUserRoleAction from "@/lib/actions/changeUserRole";
import { toast } from "sonner";
import flatten from "lodash/flatten";
import chunkArray from "lodash/chunk";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import deepCopy from "@/lib/deepCopy";

export default function AllUsersList() {
  const swr = useAllUsersListSwr();
  const { data: userPages, error, isLoading, mutate } = swr;
  if (error) return <p>{GENERIC_ERROR_MSG}</p>;

  const users = flatten(userPages);
  const isSearching = !userPages && isLoading;
  if (isSearching) return <Loading />;
  if (!userPages) return null;

  const lastUserPage = userPages.at(-1) ?? [];
  const isReachingEnd = lastUserPage.length < USERS_PER_PAGE;

  async function handleChangeUserRole(userId: string, role: Role) {
    const userIndexToUpdate = users.findIndex((u) => u.id === userId);
    const userToUpdate = users.find((u) => u.id === userId)!;
    const usersCopy = deepCopy(users);
    usersCopy.splice(userIndexToUpdate, 1, {
      ...userToUpdate,
      role,
    });
    const optimisticData = chunkArray(usersCopy, USERS_PER_PAGE);
    mutate(optimisticData, { revalidate: false });
    try {
      const { data, error } = await changeUserRoleAction({ userId, role });
      if (error || !data) throw new Error();
      toast.success("Роль успешно обновлена");
    } catch (err) {
      toast.error("Не удалось обновить роль. Попробуйте еще раз позже");
      console.error(err);
    }
    await mutate(); // refetch users to keep the data fresh
  }

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
                <CardFooter className="flex-col items-start gap-2">
                  <Link tabIndex={-1} href={`/users/${user.id ?? "deleted"}`}>
                    <Button>Просмотреть профиль</Button>
                  </Link>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button variant="outline">Действия</Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                      <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                        <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
                          Действия с пользователем
                          {user.name ? ` ${user.name}` : ""}
                        </Dialog.Title>

                        <div>
                          <p>Изменить роль</p>
                          <div className="flex flex-wrap gap-1">
                            <Button
                              variant={
                                user.role === ROLE.ADMIN ? "default" : "outline"
                              }
                              onClick={() =>
                                handleChangeUserRole(user.id, ROLE.ADMIN)
                              }
                            >
                              Администратор
                            </Button>
                            <Button
                              variant={
                                user.role === ROLE.TEACHER
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                handleChangeUserRole(user.id, ROLE.TEACHER)
                              }
                            >
                              Учитель
                            </Button>
                            <Button
                              variant={
                                user.role === ROLE.STUDENT
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() =>
                                handleChangeUserRole(user.id, ROLE.STUDENT)
                              }
                            >
                              Ученик
                            </Button>
                          </div>
                        </div>
                        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </Dialog.Close>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </CardFooter>
              </Card>
            </li>
          ))
        }
      </InfiniteScroll>
    </ul>
  );
}
